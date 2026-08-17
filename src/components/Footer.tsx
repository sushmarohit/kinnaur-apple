"use client";

import { useI18n } from "@/i18n/LanguageProvider";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer id="contact" className="scroll-mt-28 border-t border-bark/10 bg-cream-alt px-5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:justify-between">
        <div>
          <p className="font-display text-2xl text-primary">{t.header.brand}</p>
          <p className="mt-2 max-w-sm text-sm text-bark-muted">{t.footer.blurb}</p>
        </div>
        <div className="text-sm">
          <p>{t.footer.email}</p>
          <p className="mt-1">{t.footer.whatsapp}</p>
        </div>
      </div>
    </footer>
  );
}
