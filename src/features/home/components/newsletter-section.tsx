"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { NewsletterData } from "@/types/home";

interface NewsletterSectionProps {
  data: NewsletterData;
}

export function NewsletterSection({ data }: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    // Simulate brief luxury registration
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="newsletter"
      aria-label="Invitation"
      className="py-20 lg:py-28 bg-[#FAF7F2] border-t border-[#E8E1D5]/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Heading */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-[11px] sm:text-xs font-medium tracking-[0.25em] text-[#78716C] uppercase">
              {data.badge}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#1C1917] tracking-tight">
              <span>{data.titlePart1}</span>{" "}
              <span className="font-serif italic font-normal text-[#3E1C27]">
                {data.titleItalic}
              </span>
            </h2>
          </div>

          {/* Right: Description & Input Form */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed font-light max-w-lg">
              {data.description}
            </p>

            {submitted ? (
              <div className="p-4 bg-[#F2ECE4] border border-[#E5DDD1] flex items-center gap-3 text-xs tracking-wider text-[#3E1C27] animate-subtle-fade">
                <Check className="w-4 h-4 text-[#3E1C27]" />
                <span>
                  You are now on the private guestbook. You will receive private
                  olfactory dispatches soon.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex max-w-md">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={data.placeholder}
                    aria-label="Email address for private invitation"
                    className="w-full bg-transparent border-b border-[#1C1917] py-3 pr-10 text-xs sm:text-sm text-[#1C1917] placeholder-[#A8A29E] tracking-wider focus:outline-hidden focus:border-[#3E1C27] transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#1C1917] hover:text-[#3E1C27] disabled:opacity-50 transition-colors focus:outline-hidden"
                    aria-label={data.buttonLabel}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
