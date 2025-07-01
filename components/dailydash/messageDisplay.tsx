"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface ApiMessage {
  messageId: string;
  senderName: string;
  content: string;
  ttl?: number;
}
interface UiMessage {
  id: string;
  from: string;
  text: string;
  ttl?: number;
}

const formatExpires = (s: number) =>
  s <= 0
    ? "expired"
    : s < 60
    ? `${s}s`
    : s < 3600
    ? `${Math.round(s / 60)} min`
    : s < 86400
    ? `${Math.round(s / 3600)} h`
    : `${Math.round(s / 86400)} d`;

export function MessagesDisplay() {
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [idx, setIdx] = useState(0);

  const fetchMessages = useCallback(async () => {
    try {
      const r = await fetch("/api/messages/poll", { credentials: "include" });
      if (!r.ok) throw new Error("fetch failed");
      const { messages: rows }: { messages: ApiMessage[] } = await r.json();

      const now = Math.floor(Date.now() / 1000);
      setMessages(
        rows.map((m) => ({
          id: m.messageId,
          from: m.senderName,
          text: m.content,
          ttl: m.ttl,
        })),
      );
      setIdx(0);
    } catch (e) {
      console.error("messages fetch:", e);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
    const t = setInterval(fetchMessages, 120_000);
    return () => clearInterval(t);
  }, [fetchMessages]);

  useEffect(() => {
    if (messages.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % messages.length), 8000);
    return () => clearInterval(t);
  }, [messages]);

  const current = messages[idx];

  return (
    <div className="flex-grow">
      <Card className="h-full border-white/20 bg-white/10 text-white backdrop-blur-md">
        <CardContent className="relative h-full p-8">
          <AnimatePresence mode="wait">
            {current ? (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col justify-center px-4"
              >
                <div className="mb-4 text-4xl font-semibold">
                  From: {current.from}
                </div>

                <div className="mb-6 break-words text-5xl font-light leading-snug">
                  {current.text}
                </div>

                <div className="text-2xl opacity-70">
                  {current.ttl
                    ? `Expires in ${formatExpires(
                        current.ttl - Math.floor(Date.now() / 1000),
                      )}`
                    : "No expiration"}
                </div>

                {messages.length > 1 && (
                  <div className="absolute right-6 top-6 text-[3rem] opacity-50">
                    {idx + 1}/{messages.length}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center text-3xl font-light opacity-60"
              >
                No messages for now – enjoy your day ✨
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
