"use client";

import { useEffect, useState } from "react";
import {
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle,
  CircleX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UserMessage } from "@/lib/db/userMessages";
import clsx from "clsx";

//──────────────────────── helpers ────────────────────────
function ttlToString(ttlSec: number) {
  const mins = Math.max(0, Math.round((ttlSec * 1000 - Date.now()) / 60000));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h ? `${h}h ` : ""}${m}m left`;
}

//──────────────────────── main component ─────────────────
type Status = "loading" | "ready" | "error" | "deleting";

export function MessageInbox() {
  const [messages, setMessages] = useState<UserMessage[]>([]);
  const [idx, setIdx] = useState(0);
  const [status, setStatus] = useState<Status>("loading");
  const [toast, setToast] = useState<string | null>(null);
  const [pending, setPending] = useState<UserMessage | null>(null); // for modal

  const pageSize = 5;
  const page = messages.slice(idx, idx + pageSize);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/messages/poll", {
          cache: "no-store",
          credentials: "same-origin",
        });
        if (!r.ok) throw new Error(await r.text());
        const { messages } = await r.json();
        setMessages(
          messages.sort((a: UserMessage, b: UserMessage) => a.ttl - b.ttl),
        );
        setStatus("ready");
      } catch (err) {
        console.error(err);
        setStatus("error");
        setToast("❌ Failed to load messages");
      }
    })();
  }, []);

  const next = () => setIdx((i) => i + pageSize);
  const prev = () => setIdx((i) => Math.max(i - pageSize, 0));

  const deleteMessage = async () => {
    if (!pending) return;
    setStatus("deleting");
    try {
      const res = await fetch(`/api/messages/delete/${pending.messageId}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      if (!res.ok) throw new Error(await res.text());
      setMessages((all) =>
        all.filter((x) => x.messageId !== pending.messageId),
      );
      setToast("Message deleted");
    } catch (err) {
      console.error(err);
      setToast("❌ Could not delete");
    } finally {
      setPending(null);
      setStatus("ready");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center py-16 text-white/90">
        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
        Loading messages…
      </div>
    );
  }
  if (status === "error") {
    return (
      <p className="text-center text-sm text-red-300">Could not load inbox.</p>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg space-y-6">
      {/* message list */}
      <ul className="space-y-4">
        {page.length === 0 ? (
          <li className="text-center text-sm text-white/70">Inbox empty ✨</li>
        ) : (
          page.map((m) => (
            <li
              key={m.messageId}
              className="relative rounded-xl bg-white/20 p-6 shadow-lg
                         ring-1 ring-white/30 backdrop-blur-md"
            >
              <p
                className={clsx(
                  "flex flex-1 items-center rounded-xl bg-white px-6 py-4 text-sm font-medium leading-relaxed text-blue-400",
                )}
              >
                {m.content}
              </p>

              <div className="mt-4 flex items-center justify-between text-xs opacity-70">
                <span>{m.senderName}</span>
                <span>{ttlToString(m.ttl)}</span>
              </div>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                <Button
                  aria-label="Delete message"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-transparent p-0 transition hover:bg-white/20"
                  disabled={status === "deleting"}
                  onClick={() => setPending(m)}
                >
                  <CircleX className="h-5 w-5 text-rose-300 hover:text-rose-500" />
                </Button>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* pagination */}
      {messages.length > pageSize && (
        <div className="flex justify-between">
          <Button
            onClick={prev}
            disabled={idx === 0}
            variant="secondary"
            className="flex items-center gap-1 bg-blue-700/40 px-4 py-1.5 text-sm
                       hover:bg-blue-700/60 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>

          <Button
            onClick={next}
            disabled={idx + pageSize >= messages.length}
            variant="secondary"
            className="flex items-center gap-1 bg-blue-700/40 px-4 py-1.5 text-sm
                       hover:bg-blue-700/60 disabled:opacity-40"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* toast */}
      {toast && (
        <div
          role="status"
          className="animate-fade-out mx-auto flex max-w-xs items-center gap-2
                     rounded-lg bg-white/30 px-4 py-2 text-sm font-medium
                     text-white/90 shadow backdrop-blur-md"
          onAnimationEnd={() => setToast(null)}
        >
          <CheckCircle className="h-4 w-4 flex-none text-green-300" />
          <span>{toast}</span>
        </div>
      )}

      {/* modal confirm */}
      {pending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* overlay */}
          <div className="absolute inset-0" onClick={() => setPending(null)} />
          {/* sheet */}
          <div
            className="relative w-full max-w-md rounded-2xl bg-white/90 p-6
                          text-center shadow-xl"
          >
            <button
              onClick={() => setPending(null)}
              className="absolute right-4 top-4 text-gray-500 hover:text-black"
            >
              <CircleX className="h-4 w-4" />
            </button>
            <Trash2 className="mx-auto mb-3 h-8 w-8 text-red-500" />
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Delete message?
            </h3>
            <p className="mb-6 text-sm text-gray-600">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="secondary"
                className="bg-gray-200 px-5 text-sm text-gray-700 hover:bg-gray-300"
                onClick={() => setPending(null)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 px-5 text-sm hover:bg-red-700"
                onClick={deleteMessage}
                disabled={status === "deleting"}
              >
                {status === "deleting" ? "Deleting…" : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
