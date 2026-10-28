"use client";

import { useState, type FormEvent } from "react";

const field =
  "min-h-[54px] rounded-2xl border-2 border-transparent bg-card px-[18px] text-[17px] text-cream outline-none focus:border-lime";
const lbl = "text-sm font-bold text-mute";

type Status = { kind: "idle" | "sending" | "ok" | "error"; msg?: string };

export function ContactForm({ types, budgets }: { types: string[]; budgets: string[] }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Gửi không thành công");
      form.reset();
      setStatus({ kind: "ok", msg: "Đã nhận! Mình sẽ phản hồi trong 24 giờ." });
    } catch (err) {
      setStatus({ kind: "error", msg: err instanceof Error ? err.message : "Có lỗi xảy ra" });
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Form liên hệ"
      className="rv col-span-7 col-start-6 grid grid-cols-2 gap-[18px] rounded-[32px] bg-ink p-9 text-cream shadow-[10px_10px_0_var(--color-pink)] max-md:col-span-1 max-md:col-start-1 max-md:grid-cols-1 max-md:p-[22px]"
    >
      {/* Honeypot: bots fill it, humans never see it */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex flex-col gap-2">
        <label htmlFor="c-name" className={lbl}>Tên của bạn</label>
        <input id="c-name" name="name" type="text" autoComplete="name" required maxLength={100} className={field} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="c-mail" className={lbl}>Email</label>
        <input id="c-mail" name="email" type="email" autoComplete="email" required maxLength={200} className={field} />
      </div>
      <div className="col-span-full flex flex-col gap-2">
        <label htmlFor="c-type" className={lbl}>Loại dự án</label>
        <select id="c-type" name="projectType" className={field}>
          {types.map((t) => (
            <option key={t} className="text-ink">{t}</option>
          ))}
        </select>
      </div>
      <fieldset className="col-span-full m-0 flex flex-col gap-2 border-0 p-0">
        <legend className={`${lbl} mb-2.5`}>Ngân sách</legend>
        <div className="flex flex-wrap gap-2">
          {budgets.map((b, i) => (
            <label key={b} className="relative">
              <input type="radio" name="budget" value={b} defaultChecked={i === 0} className="peer absolute size-px opacity-0" />
              <span className="inline-flex min-h-11 cursor-pointer items-center rounded-full bg-card px-[18px] text-[15px] font-semibold text-cream peer-checked:bg-pink peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-lime">
                {b}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="col-span-full flex flex-col gap-2">
        <label htmlFor="c-msg" className={lbl}>Lời nhắn (tuỳ chọn)</label>
        <textarea id="c-msg" name="message" rows={3} maxLength={2000} className={`${field} resize-y py-3.5`} />
      </div>

      <button type="submit" data-magnetic disabled={status.kind === "sending"} className="btn btn-lime col-span-full justify-center disabled:opacity-60">
        {status.kind === "sending" ? "Đang gửi…" : "Gửi yêu cầu ✶"}
      </button>
      <p role="status" aria-live="polite" className={`col-span-full m-0 min-h-6 text-[15px] font-semibold ${status.kind === "error" ? "text-pink" : "text-lime"}`}>
        {status.msg}
      </p>
    </form>
  );
}
