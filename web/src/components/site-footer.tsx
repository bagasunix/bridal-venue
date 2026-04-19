export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[color:var(--surface-strong)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-[var(--muted)] lg:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand)]">Aurevia Wedding</p>
          <p>Venue, dekorasi, foto, jamuan, dan halaman tanggal yang tersusun rapi untuk membantu Anda memilih dengan lebih tenang.</p>
        </div>
        <div className="space-y-2 text-left lg:text-right">
          <p className="font-medium text-[var(--text)]">Kontak presentasi</p>
          <p>hello@atelierresepsi.id · +62 812 3456 7890</p>
        </div>
      </div>
    </footer>
  );
}
