import { faqs } from "@/content/site";

export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="font-display text-4xl">Questions, answered</h2>
      <dl className="mt-10 space-y-6">
        {faqs.map((f) => (
          <div key={f.q} className="rounded-brand bg-white p-5 shadow-soft">
            <dt><h3 className="font-display text-xl">{f.q}</h3></dt>
            <dd className="mt-2 leading-relaxed text-bark-muted">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
