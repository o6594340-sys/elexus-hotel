"use client";

import { useEffect, useState } from "react";
import { supabase, type HotelRequest, type RequestStatus } from "../../lib/supabase";

const HOTEL_ID = "elexus";

const STATUS_META: Record<RequestStatus, { label: string; color: string; bg: string; next: RequestStatus | null }> = {
  new:         { label: "New",         color: "#c9a96e", bg: "#c9a96e18", next: "in_progress" },
  in_progress: { label: "In progress", color: "#3b82f6", bg: "#3b82f615", next: "done" },
  done:        { label: "Done",        color: "#10b981", bg: "#10b98115", next: null },
};

export default function AdminPage() {
  const [requests, setRequests] = useState<HotelRequest[]>([]);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("requests")
      .select("*")
      .eq("hotel_id", HOTEL_ID)
      .order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setRequests(data); });

    const channel = supabase
      .channel("requests-admin")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "requests", filter: `hotel_id=eq.${HOTEL_ID}` },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setRequests((prev) => [payload.new as HotelRequest, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setRequests((prev) =>
              prev.map((r) => r.id === (payload.new as HotelRequest).id ? payload.new as HotelRequest : r)
            );
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  async function advance(req: HotelRequest) {
    const next = STATUS_META[req.status].next;
    if (!next) return;
    setUpdating(req.id);
    try {
      await supabase.from("requests").update({ status: next }).eq("id", req.id);
    } finally {
      setUpdating(null);
    }
  }

  const pending = requests.filter((r) => r.status !== "done");
  const done    = requests.filter((r) => r.status === "done");

  return (
    <div className="min-h-screen bg-[#0c1824] text-white">
      <div className="px-6 pt-8 pb-5 border-b border-white/10">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#c9a96e] mb-1">Elexus Hotel</p>
            <h1 className="text-[24px] font-semibold">Staff Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[12px] text-white/60">Live</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto">
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "New",         value: requests.filter((r) => r.status === "new").length,         color: "#c9a96e" },
            { label: "In Progress", value: requests.filter((r) => r.status === "in_progress").length, color: "#3b82f6" },
            { label: "Completed",   value: requests.filter((r) => r.status === "done").length,         color: "#10b981" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
              <p className="text-[28px] font-semibold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[11px] text-white/50 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {pending.length > 0 && (
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-3">Active · {pending.length}</p>
            <div className="flex flex-col gap-2.5">
              {pending.map((r) => {
                const meta = STATUS_META[r.status];
                return (
                  <div key={r.id} className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[12px] font-semibold text-[#c9a96e]">Room {r.room}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ color: meta.color, background: meta.bg }}>
                          {meta.label}
                        </span>
                      </div>
                      <p className="text-[15px] font-medium text-white">{r.type}</p>
                      {r.detail !== "Quick request" && (
                        <p className="text-[12px] text-white/50 mt-0.5">{r.detail}</p>
                      )}
                      <p className="text-[11px] text-white/30 mt-1">
                        {new Date(r.created_at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    {meta.next && (
                      <button
                        onClick={() => advance(r)}
                        disabled={updating === r.id}
                        className="shrink-0 px-4 py-2 rounded-xl bg-white/10 text-white text-[12px] font-medium active:bg-white/20 disabled:opacity-40 cursor-pointer transition-colors"
                      >
                        {updating === r.id ? "…" : r.status === "new" ? "Accept" : "Complete"}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {pending.length === 0 && (
          <div className="text-center py-12 text-white/30 text-[14px]">No active requests</div>
        )}

        {done.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-3">Completed today · {done.length}</p>
            <div className="flex flex-col gap-2">
              {done.map((r) => (
                <div key={r.id} className="bg-white/5 rounded-xl px-4 py-3 border border-white/5 flex items-center justify-between gap-3 opacity-60">
                  <div>
                    <span className="text-[12px] font-medium text-white/50">Room {r.room} · </span>
                    <span className="text-[13px] text-white/50">{r.type}</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
