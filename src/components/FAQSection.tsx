import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, AlertTriangle, ShieldCheck, Scale } from 'lucide-react';

const FAQS = [
  {
    question: "What happens if I hit the loss limit?",
    answer: "Our system monitors accounts in real-time. If your account equity falls below the specified loss limit (e.g., $505 for a $2000 account), the account will be automatically breached and credentials will be disabled. We promote responsible risk management.",
    icon: <AlertTriangle className="text-rose-500" />
  },
  {
    question: "How do withdrawals work?",
    answer: "For Instant accounts, you are eligible for withdrawals every week. We provide a massive 92% profit split. Challenge accounts move to live funding after passing both evaluation phases.",
    icon: <ShieldCheck className="text-emerald-500" />
  },
  {
    question: "Can I use any broker?",
    answer: "We support major binary options brokers: Quotex, Pocket Option, Tradeowix, Binomo, and Olymp Trade. You must specify your choice during checkout so we can set up the correct platform for you.",
    icon: <Scale className="text-slate-400" />
  },
  {
    question: "Is there a time limit for the challenge?",
    answer: "No! We believe in stress-free trading. There are no time limits to pass your challenge. Take your time to find high-probability setups.",
    icon: <Scale className="text-slate-400" />
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight">Frequently Asked <span className="text-cyan-400">Questions</span></h2>
        <p className="text-zinc-500 mt-2">Everything you need to know about our binary prop firm.</p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => (
          <div key={idx} className="glass-morphism rounded-2xl overflow-hidden border border-zinc-800/50">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-6 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-zinc-900 rounded-lg shadow-inner">
                  {faq.icon}
                </div>
                <span className="font-bold text-lg">{faq.question}</span>
              </div>
              <ChevronDown className={`w-6 h-6 transition-transform text-zinc-600 ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-zinc-400 leading-relaxed font-medium">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* T&C Highlight */}
      <div className="mt-16 p-8 bg-zinc-900/40 rounded-3xl border border-zinc-800 text-center backdrop-blur-md">
        <h4 className="font-bold flex items-center justify-center gap-2 mb-2">
          <ShieldCheck className="text-cyan-500 w-5 h-5" /> Terms & Conditions
        </h4>
        <p className="text-sm text-zinc-500">
          By purchasing any account, you agree to our trading rules: No arbitrage, no high-frequency bot abuse, and adherence to drawdown limits. Violation of rules results in instant account termination without refund.
        </p>
      </div>
    </section>
  );
};
