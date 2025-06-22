"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
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
    const t = setInterval(
      () => setIdx((i) => (i + 1) % messages.length),
      8_000, // TODO: make this configurable?
    );
    return () => clearInterval(t);
  }, [messages]);

  const current = messages[idx];

  return (
    <div className="flex-shrink-0">
      <Card className="border-white/20 bg-white/10 text-white backdrop-blur-md">
        <CardContent className="h-[180px] min-w-[300px] p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4 opacity-80" />
              <h2 className="text-sm font-medium opacity-80">Messages</h2>
            </div>
            {messages.length > 0 && (
              <Badge className="bg-pink-500 px-1.5 py-0.5 text-[10px]">
                {messages.length}
              </Badge>
            )}
          </div>

          <div className="relative h-[108px] overflow-hidden">
            <AnimatePresence mode="wait">
              {current ? (
                <motion.div
                  key={current.id}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium opacity-90">
                        From: {current.from}
                      </span>
                      {messages.length > 1 && (
                        <span className="text-[10px] opacity-60">
                          {idx + 1}/{messages.length}
                        </span>
                      )}
                    </div>

                    <p className="text-sm leading-relaxed opacity-95">
                      {current.text}
                    </p>

                    <span className="text-[10px] opacity-60">
                      Expires&nbsp;
                      {current.ttl
                        ? `in ${formatExpires(
                            current.ttl - Math.floor(Date.now() / 1000),
                          )}`
                        : "—"}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center text-sm opacity-60"
                >
                  No messages for now – enjoy your day ✨
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
