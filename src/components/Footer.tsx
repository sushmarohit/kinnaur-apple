export function Footer() {
  return (
    <footer className="border-t border-bark/10 bg-cream-alt px-5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:justify-between">
        <div>
          <p className="font-display text-2xl text-primary">Kinnaur Apple</p>
          <p className="mt-2 max-w-sm text-sm text-bark-muted">
            GI-tagged Kinnauri apples from Kinnaur, Himachal Pradesh. Grown at 6,000–9,000 ft, hand-graded, packed orchard-direct.
          </p>
        </div>
        <div className="text-sm">
          <p>xena.w@example.org</p>
          <p className="mt-1">WhatsApp: +91 98765 43210</p>
        </div>
      </div>
    </footer>
  );
}
