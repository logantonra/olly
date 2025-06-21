"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

type Step = "username" | "message" | "sent";

export default function SendMessagePage() {
  const [step, setStep] = useState<Step>("username");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleUsernameSubmit = async () => {
    if (!/^[a-zA-Z]{1,32}$/.test(username)) {
      setError(
        "Username must be 1-32 characters, no spaces or special characters.",
      );
      return;
    }

    // TODO: validate username
    const isValidUser = true;

    if (!isValidUser) {
      setError("That username doesn't exist.");
      return;
    }

    setError("");
    setStep("message");
  };

  const handleSend = () => {
    if (message.length > 140) {
      alert("Message must be 140 characters or fewer.");
      return;
    }

    // TODO: Send message to backend
    console.log({ username, message });

    setStep("sent");
  };

  const resetForm = () => {
    setUsername("");
    setMessage("");
    setStep("username");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-400 to-blue-300 text-white">
      <div className="relative z-10 flex w-full max-w-xl flex-col items-center overflow-hidden rounded-3xl bg-white/20 px-6 py-10 shadow-xl backdrop-blur-md sm:px-10 md:px-12">
        <h2 className="mb-8 text-center text-3xl font-semibold text-white">
          Send a Message
        </h2>

        <AnimatePresence mode="wait">
          {step === "username" && (
            <motion.div
              key="username"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex w-full flex-col items-center"
            >
              <div className="mb-4 w-full">
                <label
                  htmlFor="username"
                  className="mb-1 block text-sm text-white/90"
                >
                  Enter recipient's username
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="e.g. johndoe"
                  value={username}
                  maxLength={32}
                  pattern="[a-z][A-Z]*"
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-none bg-white/90 text-sm text-black shadow-sm"
                />
                {error && <p className="mt-2 text-xs text-red-200">{error}</p>}
              </div>

              <Button
                onClick={handleUsernameSubmit}
                className="bg-white font-semibold text-blue-600 hover:bg-blue-100"
              >
                Next
              </Button>
            </motion.div>
          )}

          {step === "message" && (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <div className="mb-6 w-full">
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm text-white/90"
                >
                  Message for @{username}
                </label>
                <Textarea
                  id="message"
                  value={message}
                  placeholder="Type your message here..."
                  maxLength={140}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[120px] border-none bg-white/90 text-black shadow-sm"
                />
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleSend}
                  className="flex items-center gap-2 bg-white font-semibold text-blue-600 hover:bg-blue-100"
                >
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </motion.div>
          )}

          {step === "sent" && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex w-full flex-col items-center text-center"
            >
              <CheckCircle2 className="mb-4 h-16 w-16 text-green-300" />
              <h3 className="mb-2 text-2xl font-semibold">Message Sent!</h3>
              <p className="mb-6 text-white/80">
                Your message to @{username} has been delivered.
              </p>

              <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
                <Button
                  variant="secondary"
                  onClick={() => router.push("/home")}
                  className="bg-white/90 text-blue-600 hover:bg-blue-100"
                >
                  Return to Home
                </Button>
                <Button
                  onClick={resetForm}
                  className="bg-white text-blue-600 hover:bg-blue-100"
                >
                  Send Another
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {step == "message" && (
          <p className="mt-6 text-center text-xs text-white/70">
            This message is not anonymous — Be nice 😊
          </p>
        )}
        {step == "username" && (
          <p className="mt-6 text-center text-xs text-white/70">
            Usernames are all lowercase with no special characters or spaces.
          </p>
        )}
      </div>
    </div>
  );
}
