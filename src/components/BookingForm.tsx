"use client";

import { FormEvent, useState } from "react";
import type { PackSize } from "@/lib/types";

const packs: { id: PackSize | "custom"; label: string; kg?: number }[] = [
  { id: "FIVE_KG", label: "5kg crate", kg: 5 },
  { id: "TEN_KG", label: "10kg crate", kg: 10 },
  { id: "FIFTEEN_KG", label: "15kg crate", kg: 15 },
  { id: "custom", label: "Custom quantity" },
];

export function BookingForm() {
  const [pack, setPack] = useState<(typeof packs)[number]["id"]>("TEN_KG");
  const [customKg, setCustomKg] = useState(20);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = new FormData(e.currentTarget);
    const fullName = String(form.get("fullName") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const pincode = String(form.get("pincode") ?? "").trim();
    const city = String(form.get("city") ?? "").trim();
    const notes = String(form.get("notes") ?? "").trim();
    if (fullName.length < 2) return setMessage("Please enter your full name.");
    if (!/^[6-9]\d{9}$/.test(phone)) return setMessage("Enter a valid 10-digit Indian mobile number.");
    if (!/^\d{6}$/.test(pincode)) return setMessage("Pincode must be 6 digits.");
    const packSize: PackSize = pack === "custom" ? "CUSTOM" : pack;
    const quantityKg = pack === "custom" ? customKg : packs.find((p) => p.id === pack)?.kg ?? 10;
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          email: email || undefined,
          pincode,
          city: city || undefined,
          quantityKg,
          packSize,
          notes: notes || undefined,
          source: "landing_page",
        }),
      });
      const json = await res.json();
      if (!res.ok || json.success === false) throw new Error(json.message ?? "Could not submit");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Network error. Please try again.");
    }
  }

  return (
    <section id="prebook" className="scroll-mt-8 bg-cream-alt px-5 py-20">
      <div className="mx-auto max-w-xl rounded-brand bg-white p-8 shadow-soft">
        <p className="text-xs uppercase tracking-[0.25em] text-accent">Pre-booking</p>
        <h2 className="mt-2 font-display text-4xl">Reserve your crate</h2>
        <p className="mt-3 text-bark-muted">
          No payment on this form. We confirm harvest allocation, logistics and payment on a follow-up call or WhatsApp.
        </p>
        {status === "success" ? (
          <div className="mt-8 rounded-brand bg-secondary/10 p-5">
            <p className="font-display text-2xl">Request received.</p>
            <p className="mt-2 text-sm text-bark-muted">Our orchard desk will contact you on WhatsApp or phone.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
            <Field name="fullName" label="Full name" required />
            <Field name="phone" label="Phone number" required inputMode="tel" />
            <Field name="email" label="Email (optional)" type="email" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="pincode" label="Pincode" required inputMode="numeric" />
              <Field name="city" label="City (optional)" />
            </div>
            <div>
              <label className="text-sm font-medium">Quantity</label>
              <select
                className="mt-1 w-full rounded-brand bg-cream px-3 py-2.5 outline-none ring-1 ring-bark/10"
                value={pack}
                onChange={(e) => setPack(e.target.value as typeof pack)}
              >
                {packs.map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
              {pack === "custom" && (
                <input
                  type="number"
                  min={1}
                  value={customKg}
                  onChange={(e) => setCustomKg(Number(e.target.value))}
                  className="mt-2 w-full rounded-brand bg-cream px-3 py-2.5 tabular-nums"
                />
              )}
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="notes">Notes (optional)</label>
              <textarea id="notes" name="notes" rows={4} className="mt-1 w-full rounded-brand bg-cream px-3 py-2.5" />
            </div>
            {message && <p className="text-sm text-primary">{message}</p>}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-brand bg-primary py-3 text-white hover:bg-primary-hover disabled:opacity-60"
            >
              {status === "submitting" ? "Submitting…" : "Submit Pre-Booking Request"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  name, label, required, type = "text", inputMode,
}: {
  name: string; label: string; required?: boolean; type?: string; inputMode?: "tel" | "numeric" | "email" | "text";
}) {
  return (
    <div>
      <label className="text-sm font-medium" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        inputMode={inputMode}
        className="mt-1 w-full rounded-brand bg-cream px-3 py-2.5 outline-none ring-1 ring-bark/10 focus:ring-primary"
      />
    </div>
  );
}
