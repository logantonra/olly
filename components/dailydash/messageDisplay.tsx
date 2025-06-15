"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, ChevronLeft, ChevronRight } from "lucide-react";

const mockMessages = [
  {
    id: 1,
    from: "Mom",
    text: "You forgot your lunch",
    read: false,
  },
  {
    id: 2,
    from: "Greg",
    text: "Auto slims tonight is a lock",
    read: false,
  },
  {
    id: 3,
    from: "Swinch",
    text: "My air conditioner is so moldy",
    read: false,
  },
  {
    id: 4,
    from: "Dad",
    text: "Do you have any beer in the fridge",
    read: false,
  },
  {
    id: 5,
    from: "Colin",
    text: "oy bruv",
    read: false,
  },
];

export function MessagesDisplay({ email }: { email: string }) {
  const [messages, setMessages] = useState(mockMessages);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const unreadMessages = messages.filter((m) => !m.read);
  const currentMessage = unreadMessages[currentMessageIndex];

  // Auto-cycle through messages
  useEffect(() => {
    if (!isAutoPlaying || unreadMessages.length === 0) return;

    const timer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % unreadMessages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [unreadMessages.length, isAutoPlaying]);

  const markMessageAsRead = (messageId: number) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg)),
    );
    // Adjust current index if needed
    if (currentMessageIndex >= unreadMessages.length - 1) {
      setCurrentMessageIndex(0);
    }
  };

  const goToNextMessage = () => {
    setIsAutoPlaying(false);
    setCurrentMessageIndex((prev) => (prev + 1) % unreadMessages.length);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevMessage = () => {
    setIsAutoPlaying(false);
    setCurrentMessageIndex(
      (prev) => (prev - 1 + unreadMessages.length) % unreadMessages.length,
    );
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && unreadMessages.length > 1) {
      goToNextMessage();
    }
    if (isRightSwipe && unreadMessages.length > 1) {
      goToPrevMessage();
    }
  };

  return (
    <div className="flex-shrink-0">
      <Card className="border-white/20 bg-white/10 text-white backdrop-blur-md">
        <CardContent className="h-[200px] min-w-[320px] p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <h2 className="text-lg font-medium">Messages</h2>
            </div>
            {unreadMessages.length > 0 && (
              <div className="flex items-center gap-2">
                <Badge className="bg-pink-500 text-xs text-white">
                  {unreadMessages.length}
                </Badge>
                {unreadMessages.length > 1 && (
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={goToPrevMessage}
                      className="h-6 w-6 p-1 text-white hover:bg-white/20"
                    >
                      <ChevronLeft className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={goToNextMessage}
                      className="h-6 w-6 p-1 text-white hover:bg-white/20"
                    >
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {currentMessage ? (
            <div
              className="flex h-32 cursor-pointer select-none flex-col justify-center"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium opacity-90">
                    From: {currentMessage.from}
                  </div>
                  {unreadMessages.length > 1 && (
                    <div className="text-xs opacity-70">
                      {currentMessageIndex + 1} of {unreadMessages.length}
                    </div>
                  )}
                </div>
                <div className="text-sm leading-relaxed opacity-95">
                  {currentMessage.text}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => markMessageAsRead(currentMessage.id)}
                  className="mt-2 self-start text-white hover:bg-white/20"
                >
                  <X className="mr-1 h-3 w-3" />
                  Mark Read
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center text-sm opacity-60">
              All caught up! ✨
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
