export const colors = {
  background: "#FDFBF7",
  card: "#FFFFFF",
  textPrimary: "#221E1C",
  textSecondary: "#6D6863",
  blush: "#F4C2C2",
  gold: "#D4AF37",
  border: "#EAE3D9",
  roseTint: "#F5E6E6",
  success: "#81C784",
  error: "#E57373",
  overlay: "rgba(34, 30, 28, 0.52)",
} as const;

export const layout = {
  screenPadding: 24,
  sectionGap: 24,
  cardRadius: 28,
  imageRadius: 24,
  buttonRadius: 999,
  maxContentWidth: 720,
} as const;

export const typography = {
  hero: 32,
  title: 24,
  section: 20,
  body: 16,
  small: 13,
} as const;

export const shadows = {
  soft: {
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
} as const;