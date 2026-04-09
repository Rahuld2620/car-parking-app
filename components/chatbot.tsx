"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
}

const FAQ_RESPONSES: Record<string, string> = {
  availability:
    "You can check real-time parking availability on your dashboard. Spots marked in green are available, orange means filling fast, and red means full.",
  price:
    "Parking prices vary by location. Most spots range from Rs 30 to Rs 60 per hour. You can see the exact price on each spot's card.",
  payment:
    "We support UPI payments directly to the parking owner. After booking, you'll see the owner's UPI ID to complete the payment.",
  cancel:
    "You can cancel a booking up to 15 minutes before your reserved time. Go to your active bookings and tap Cancel. Full refund is processed within 24 hours.",
  safety:
    "All parking owners are verified with Aadhar. Each spot is GPS-tagged and reviewed by other users. Your vehicle details are shared only with the confirmed owner.",
  book: "To book a spot: 1) Search for available spots nearby, 2) Select a spot and check its details, 3) Confirm the booking and pay via UPI.",
  ticket:
    "To raise a support ticket, describe your issue here and I'll help you. Common issues: billing disputes, unauthorized charges, spot not available, or safety concerns.",
  help: "I can help you with: availability, pricing, payment, cancellation, booking, safety, and raising tickets. Just type your question!",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("available") || lower.includes("availability") || lower.includes("slot") || lower.includes("free"))
    return FAQ_RESPONSES.availability;
  if (lower.includes("price") || lower.includes("cost") || lower.includes("rate") || lower.includes("rs") || lower.includes("charge"))
    return FAQ_RESPONSES.price;
  if (lower.includes("pay") || lower.includes("upi") || lower.includes("money"))
    return FAQ_RESPONSES.payment;
  if (lower.includes("cancel") || lower.includes("refund"))
    return FAQ_RESPONSES.cancel;
  if (lower.includes("safe") || lower.includes("security") || lower.includes("verified"))
    return FAQ_RESPONSES.safety;
  if (lower.includes("book") || lower.includes("reserve") || lower.includes("how to"))
    return FAQ_RESPONSES.book;
  if (lower.includes("ticket") || lower.includes("issue") || lower.includes("problem") || lower.includes("complaint"))
    return FAQ_RESPONSES.ticket;
  if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey"))
    return "Hello! Welcome to SPS Space support. How can I help you today? Ask me about availability, pricing, booking, payments, or raise a ticket.";

  return FAQ_RESPONSES.help;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hi there! I'm your SPS Space assistant. I can help you with parking availability, pricing, booking, payments, and more. What do you need help with?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate bot thinking delay
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: getBotResponse(userMsg.text),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  }

  return (
    <>
      {/* Floating chat button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors z-50"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-4rem)] rounded-2xl bg-card border border-border shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold text-sm">SPS Assistant</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick actions */}
          <div className="flex gap-2 px-4 py-2 overflow-x-auto border-b border-border">
            {["Availability", "Pricing", "How to Book", "Raise Ticket"].map(
              (q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => {
                    setInput(q);
                    const userMsg: ChatMessage = {
                      id: Date.now().toString(),
                      sender: "user",
                      text: q,
                    };
                    setMessages((prev) => [...prev, userMsg]);
                    setTimeout(() => {
                      const botMsg: ChatMessage = {
                        id: (Date.now() + 1).toString(),
                        sender: "bot",
                        text: getBotResponse(q),
                      };
                      setMessages((prev) => [...prev, botMsg]);
                    }, 600);
                    setInput("");
                  }}
                  className="shrink-0 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {q}
                </button>
              )
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your question..."
              className="h-10 text-sm"
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="h-10 w-10 shrink-0 bg-primary text-primary-foreground"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
