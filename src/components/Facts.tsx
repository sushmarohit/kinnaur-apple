import { facts } from "@/content/site";

export function Facts() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <h2 className="font-display text-3xl">Citable facts</h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li className="rounded-brand bg-white p-5 shadow-soft">
          <p className="text-xs uppercase tracking-wide text-accent">Altitude</p>
          <p className="mt-2 font-display text-2xl">{facts.altitude}</p>
        </li>
        <li className="rounded-brand bg-white p-5 shadow-soft">
          <p className="text-xs uppercase tracking-wide text-accent">On-tree cycle</p>
          <p className="mt-2 font-display text-2xl">{facts.hangTime}</p>
        </li>
        <li className="rounded-brand bg-white p-5 shadow-soft">
          <p className="text-xs uppercase tracking-wide text-accent">Indication of origin</p>
          <p className="mt-2 font-display text-2xl">{facts.gi}</p>
        </li>
        <li className="rounded-brand bg-white p-5 shadow-soft">
          <p className="text-xs uppercase tracking-wide text-accent">Harvest window</p>
          <p className="mt-2 font-display text-2xl">Late August–October</p>
        </li>
        <li className="rounded-brand bg-white p-5 shadow-soft">
          <p className="text-xs uppercase tracking-wide text-accent">Crate sizes</p>
          <p className="mt-2 font-display text-2xl">{facts.packs.join(" · ")}</p>
        </li>
        <li className="rounded-brand bg-white p-5 shadow-soft">
          <p className="text-xs uppercase tracking-wide text-accent">Price anchor</p>
          <p className="mt-2 font-display text-2xl">{facts.priceAnchor}</p>
        </li>
      </ul>
    </section>
  );
}
