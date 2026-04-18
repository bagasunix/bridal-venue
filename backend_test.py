#!/usr/bin/env python3
"""
Backend API Regression Tests for Wedding Rental Demo
Tests the FastAPI backend endpoints to ensure they work correctly with the new Next.js web app.
"""

import asyncio
import json
import sys
from datetime import date, datetime, timedelta
from typing import Any, Dict

import requests


class BackendTester:
    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip('/')
        self.api_base = f"{self.base_url}/api"
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'User-Agent': 'Backend-Regression-Test/1.0'
        })
        
    def log(self, message: str, level: str = "INFO"):
        """Log test messages with timestamp"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        print(f"[{timestamp}] {level}: {message}")
        
    def test_health_endpoint(self) -> Dict[str, Any]:
        """Test GET /api/health endpoint"""
        self.log("Testing GET /api/health")
        
        try:
            response = self.session.get(f"{self.api_base}/health", timeout=10)
            
            result = {
                "endpoint": "GET /api/health",
                "status_code": response.status_code,
                "success": False,
                "response_data": None,
                "error": None
            }
            
            if response.status_code == 200:
                data = response.json()
                result["response_data"] = data
                
                # Validate response structure
                if "status" in data and data["status"] == "ok":
                    result["success"] = True
                    self.log(f"✅ Health check passed: {data}")
                else:
                    result["error"] = f"Invalid response structure: {data}"
                    self.log(f"❌ Health check failed: Invalid response structure")
            else:
                result["error"] = f"HTTP {response.status_code}: {response.text}"
                self.log(f"❌ Health check failed: HTTP {response.status_code}")
                
        except Exception as e:
            result = {
                "endpoint": "GET /api/health",
                "status_code": None,
                "success": False,
                "response_data": None,
                "error": str(e)
            }
            self.log(f"❌ Health check failed with exception: {e}")
            
        return result
    
    def test_availability_endpoint(self, vendor_slug: str = "rosewood-manor") -> Dict[str, Any]:
        """Test GET /api/availability/{vendor_slug} endpoint"""
        self.log(f"Testing GET /api/availability/{vendor_slug}")
        
        try:
            response = self.session.get(f"{self.api_base}/availability/{vendor_slug}", timeout=10)
            
            result = {
                "endpoint": f"GET /api/availability/{vendor_slug}",
                "status_code": response.status_code,
                "success": False,
                "response_data": None,
                "error": None
            }
            
            if response.status_code == 200:
                data = response.json()
                result["response_data"] = data
                
                # Validate response structure
                required_fields = ["vendor_slug", "booked_dates", "source", "live_configured"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    if isinstance(data["booked_dates"], list):
                        result["success"] = True
                        self.log(f"✅ Availability check passed: {len(data['booked_dates'])} booked dates found")
                    else:
                        result["error"] = "booked_dates is not a list"
                        self.log(f"❌ Availability check failed: booked_dates is not a list")
                else:
                    result["error"] = f"Missing required fields: {missing_fields}"
                    self.log(f"❌ Availability check failed: Missing fields {missing_fields}")
            else:
                result["error"] = f"HTTP {response.status_code}: {response.text}"
                self.log(f"❌ Availability check failed: HTTP {response.status_code}")
                
        except Exception as e:
            result = {
                "endpoint": f"GET /api/availability/{vendor_slug}",
                "status_code": None,
                "success": False,
                "response_data": None,
                "error": str(e)
            }
            self.log(f"❌ Availability check failed with exception: {e}")
            
        return result
    
    def test_booking_creation_success(self, vendor_slug: str = "rosewood-manor") -> Dict[str, Any]:
        """Test POST /api/bookings with a valid future date"""
        # Get a future date that's not booked
        future_date = (date.today() + timedelta(days=30)).isoformat()
        
        booking_data = {
            "name": "Sari Dewi",
            "phone": "+62812345678",
            "vendor": vendor_slug,
            "date": future_date,
            "package": "Premium Wedding Package"
        }
        
        self.log(f"Testing POST /api/bookings with valid date: {future_date}")
        
        try:
            response = self.session.post(
                f"{self.api_base}/bookings",
                json=booking_data,
                timeout=15
            )
            
            result = {
                "endpoint": "POST /api/bookings (success case)",
                "status_code": response.status_code,
                "success": False,
                "response_data": None,
                "error": None,
                "booking_data": booking_data
            }
            
            if response.status_code == 201:
                data = response.json()
                result["response_data"] = data
                
                # Validate response structure
                required_fields = ["booking_id", "vendor", "date", "package", "source", "submitted_to_n8n", "message", "created_at"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    if data["vendor"] == vendor_slug and data["date"] == future_date:
                        result["success"] = True
                        self.log(f"✅ Booking creation passed: ID {data['booking_id']}")
                    else:
                        result["error"] = "Response data doesn't match request"
                        self.log(f"❌ Booking creation failed: Data mismatch")
                else:
                    result["error"] = f"Missing required fields: {missing_fields}"
                    self.log(f"❌ Booking creation failed: Missing fields {missing_fields}")
            else:
                result["error"] = f"HTTP {response.status_code}: {response.text}"
                self.log(f"❌ Booking creation failed: HTTP {response.status_code}")
                
        except Exception as e:
            result = {
                "endpoint": "POST /api/bookings (success case)",
                "status_code": None,
                "success": False,
                "response_data": None,
                "error": str(e),
                "booking_data": booking_data
            }
            self.log(f"❌ Booking creation failed with exception: {e}")
            
        return result
    
    def test_booking_conflict(self, vendor_slug: str = "rosewood-manor") -> Dict[str, Any]:
        """Test POST /api/bookings with an already-booked date"""
        # First, get the availability to find a booked date
        availability_result = self.test_availability_endpoint(vendor_slug)
        
        if not availability_result["success"]:
            return {
                "endpoint": "POST /api/bookings (conflict case)",
                "status_code": None,
                "success": False,
                "response_data": None,
                "error": "Could not get availability data for conflict test",
                "booking_data": None
            }
        
        booked_dates = availability_result["response_data"]["booked_dates"]
        if not booked_dates:
            # Create a booking first to have a conflict
            self.log("No booked dates found, creating one first for conflict test")
            conflict_date = (date.today() + timedelta(days=25)).isoformat()
            
            # Create initial booking
            initial_booking = {
                "name": "Test User",
                "phone": "+62812345679",
                "vendor": vendor_slug,
                "date": conflict_date,
                "package": "Basic Package"
            }
            
            try:
                self.session.post(f"{self.api_base}/bookings", json=initial_booking, timeout=15)
            except:
                pass  # Ignore errors, we just want to create a conflict
        else:
            conflict_date = booked_dates[0]
        
        # Now try to book the same date
        booking_data = {
            "name": "Andi Pratama",
            "phone": "+62812345680",
            "vendor": vendor_slug,
            "date": conflict_date,
            "package": "Deluxe Wedding Package"
        }
        
        self.log(f"Testing POST /api/bookings with conflicting date: {conflict_date}")
        
        try:
            response = self.session.post(
                f"{self.api_base}/bookings",
                json=booking_data,
                timeout=15
            )
            
            result = {
                "endpoint": "POST /api/bookings (conflict case)",
                "status_code": response.status_code,
                "success": False,
                "response_data": None,
                "error": None,
                "booking_data": booking_data
            }
            
            if response.status_code == 409:
                # This is the expected behavior for a conflict
                try:
                    error_data = response.json()
                    result["response_data"] = error_data
                    if "detail" in error_data and "not available" in error_data["detail"].lower():
                        result["success"] = True
                        self.log(f"✅ Booking conflict handled correctly: {error_data['detail']}")
                    else:
                        result["error"] = f"Unexpected conflict response: {error_data}"
                        self.log(f"❌ Booking conflict failed: Unexpected response")
                except:
                    result["success"] = True  # 409 status is correct even without JSON
                    self.log(f"✅ Booking conflict handled correctly: HTTP 409")
            else:
                result["error"] = f"Expected HTTP 409, got {response.status_code}: {response.text}"
                self.log(f"❌ Booking conflict failed: Expected 409, got {response.status_code}")
                
        except Exception as e:
            result = {
                "endpoint": "POST /api/bookings (conflict case)",
                "status_code": None,
                "success": False,
                "response_data": None,
                "error": str(e),
                "booking_data": booking_data
            }
            self.log(f"❌ Booking conflict test failed with exception: {e}")
            
        return result
    
    def run_all_tests(self) -> Dict[str, Any]:
        """Run all backend regression tests"""
        self.log("Starting backend regression tests")
        self.log(f"Testing backend at: {self.api_base}")
        
        results = {
            "test_summary": {
                "total_tests": 4,
                "passed": 0,
                "failed": 0
            },
            "tests": []
        }
        
        # Test 1: Health endpoint
        health_result = self.test_health_endpoint()
        results["tests"].append(health_result)
        
        # Test 2: Availability endpoint
        availability_result = self.test_availability_endpoint()
        results["tests"].append(availability_result)
        
        # Test 3: Successful booking creation
        booking_success_result = self.test_booking_creation_success()
        results["tests"].append(booking_success_result)
        
        # Test 4: Booking conflict handling
        booking_conflict_result = self.test_booking_conflict()
        results["tests"].append(booking_conflict_result)
        
        # Calculate summary
        for test in results["tests"]:
            if test["success"]:
                results["test_summary"]["passed"] += 1
            else:
                results["test_summary"]["failed"] += 1
        
        self.log(f"Tests completed: {results['test_summary']['passed']}/{results['test_summary']['total_tests']} passed")
        
        return results


def main():
    """Main test runner"""
    # Use the frontend's backend URL
    backend_url = "https://next-ui-demo.preview.emergentagent.com"
    
    print("=" * 60)
    print("Backend API Regression Tests")
    print("=" * 60)
    print(f"Backend URL: {backend_url}")
    print()
    
    tester = BackendTester(backend_url)
    results = tester.run_all_tests()
    
    print("\n" + "=" * 60)
    print("TEST RESULTS SUMMARY")
    print("=" * 60)
    
    for test in results["tests"]:
        status = "✅ PASS" if test["success"] else "❌ FAIL"
        print(f"{status} - {test['endpoint']}")
        if not test["success"] and test["error"]:
            print(f"    Error: {test['error']}")
    
    print(f"\nOverall: {results['test_summary']['passed']}/{results['test_summary']['total_tests']} tests passed")
    
    # Save detailed results to file
    with open("/app/backend_test_results.json", "w") as f:
        json.dump(results, f, indent=2)
    
    print(f"Detailed results saved to: /app/backend_test_results.json")
    
    # Exit with error code if any tests failed
    if results["test_summary"]["failed"] > 0:
        sys.exit(1)
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()