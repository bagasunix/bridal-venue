export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-12 lg:px-10 lg:py-16">
      <div className="space-y-8 animate-pulse">
        <div className="h-12 w-44 rounded-full bg-[var(--brand-soft)]" />
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-5">
            <div className="h-8 w-40 rounded-full bg-[var(--surface-strong)]" />
            <div className="h-20 max-w-3xl rounded-[2rem] bg-[var(--surface-strong)]" />
            <div className="h-32 max-w-2xl rounded-[2rem] bg-[var(--surface-strong)]" />
            <div className="flex gap-3">
              <div className="h-12 w-40 rounded-full bg-[var(--brand-soft)]" />
              <div className="h-12 w-40 rounded-full bg-[var(--surface-strong)]" />
            </div>
          </div>
          <div className="min-h-[320px] rounded-[2.25rem] bg-[var(--surface-strong)]" />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-6" key={index}>
              <div className="h-44 rounded-[1.5rem] bg-[var(--surface-strong)]" />
              <div className="mt-5 h-6 w-2/3 rounded-full bg-[var(--surface-strong)]" />
              <div className="mt-3 h-20 rounded-[1.5rem] bg-[var(--surface-strong)]" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
