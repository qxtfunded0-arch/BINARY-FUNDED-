import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, TrendingUp, Zap, HelpCircle, ArrowRight, Shield } from 'lucide-react';
import { CHALLENGE_ACCOUNTS, INSTANT_ACCOUNTS } from '../constants';
import { AccountPlan } from '../types';

interface PricingSectionProps {
  onSelectPlan: (plan: AccountPlan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [tab, setTab] = useState<'challenge' | 'instant'>('challenge');

  const activeAccounts = tab === 'challenge' ? CHALLENGE_ACCOUNTS : INSTANT_ACCOUNTS;

  return (
    <section id="accounts" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Choose Your <span className="gradient-text">Funded Account</span></h2>
        <p className="text-slate-400 max-w-2xl mx-auto">Select a challenge to prove your skills or get instant funding to start trading live immediately.</p>
        
        {/* Toggle */}
        <div className="flex justify-center pt-8">
          <div className="bg-zinc-900/50 p-1 rounded-xl border border-zinc-800 flex shadow-2xl">
            <button 
              onClick={() => setTab('challenge')}
              className={`px-6 py-2 rounded-lg font-bold transition-all text-sm ${tab === 'challenge' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/10' : 'text-zinc-500 hover:text-white'}`}
            >
              Challenge
            </button>
            <button 
              onClick={() => setTab('instant')}
              className={`px-6 py-2 rounded-lg font-bold transition-all text-sm ${tab === 'instant' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/10' : 'text-zinc-500 hover:text-white'}`}
            >
              Instant Funding
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {activeAccounts.map((account, idx) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-morphism rounded-3xl p-8 flex flex-col transition-all hover:shadow-2xl relative ${account.id === 'in-2000' ? 'border-2 border-cyan-500/30' : 'border border-zinc-800'}`}
            >
              {account.id === 'in-2000' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-[10px] font-black px-4 py-1 rounded-full uppercase z-10">Most Popular</div>
              )}
              
              <div className="space-y-4 flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{tab === 'challenge' ? 'Step Phase' : 'No Evaluation'}</span>
                    <h2 className="text-2xl font-bold">{tab === 'challenge' ? 'Challenge' : 'Instant Funded'}</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">${account.price}</div>
                    <div className="text-xs text-zinc-500">{tab === 'challenge' ? 'One-time Fee' : 'Account Price'}</div>
                  </div>
                </div>

                <div className="bg-zinc-950/30 p-4 rounded-xl text-center border border-white/5 mb-6">
                  <p className="text-3xl font-black">${(account.fundingAmount/1000)}K</p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Funding Limit</p>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  <li className="flex justify-between text-sm border-b border-zinc-800/50 pb-2">
                    <span className="text-zinc-400">Profit Split</span>
                    <span className="font-medium text-cyan-400">{account.profitSplit}% Payout</span>
                  </li>
                  <li className="flex justify-between text-sm border-b border-zinc-800/50 pb-2">
                    <span className="text-zinc-400">Max Overall Loss</span>
                    <span className="font-medium text-rose-400">${account.lossLimit} Limit</span>
                  </li>
                  <li className="flex justify-between text-sm border-b border-zinc-800/50 pb-2">
                    <span className="text-zinc-400">Profit Target</span>
                    <span className="font-medium">{tab === 'challenge' ? '10% / 8%' : 'No Limit'}</span>
                  </li>
                   <li className="flex justify-between text-sm">
                    <span className="text-zinc-400">Withdrawal Speed</span>
                    <span className={`font-medium ${tab === 'instant' ? 'text-green-400' : 'text-zinc-300'}`}>{tab === 'instant' ? 'Instant' : 'Verified'}</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => onSelectPlan(account)}
                className={`mt-4 w-full py-4 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group/btn ${account.id === 'in-2000' ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/20' : 'bg-zinc-100 text-black hover:bg-white'}`}
              >
                {tab === 'challenge' ? 'Buy Challenge' : 'Get Funded Now'} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Trust Info */}
      <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 border-t border-zinc-800 pt-10 md:pt-12">
        <div className="space-y-4">
          <h3 className="text-[9px] md:text-[10px] uppercase font-black text-zinc-600 tracking-[0.2em]">Supported Binary Brokers</h3>
          <div className="flex flex-wrap gap-4 md:gap-8 items-center opacity-70">
             <div className="flex items-center gap-2 group cursor-default">
               <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center text-[10px] font-black text-black group-hover:scale-110 transition-transform">Q</div>
               <span className="text-[10px] md:text-xs font-black uppercase tracking-tighter">Quotex</span>
             </div>
             <div className="flex items-center gap-2 group cursor-default">
               <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-[10px] font-black text-white group-hover:scale-110 transition-transform">P</div>
               <span className="text-[10px] md:text-xs font-black uppercase tracking-tighter">Pocket Option</span>
             </div>
             <div className="flex items-center gap-2 group cursor-default">
               <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-[10px] font-black text-white group-hover:scale-110 transition-transform">B</div>
               <span className="text-[10px] md:text-xs font-black uppercase tracking-tighter">Binomo</span>
             </div>
             <div className="flex items-center gap-2 group cursor-default">
               <div className="w-6 h-6 bg-zinc-800 border border-zinc-700 rounded flex items-center justify-center text-[10px] font-black text-cyan-400 group-hover:scale-110 transition-transform">T</div>
               <span className="text-[10px] md:text-xs font-black uppercase tracking-tighter">Tradeowix</span>
             </div>
          </div>
        </div>
        <div className="md:col-span-2 space-y-4 md:text-right">
          <h3 className="text-[9px] md:text-[10px] uppercase font-black text-zinc-600 tracking-[0.2em]">Secure Payment Infrastructure</h3>
          <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 md:justify-end items-center text-[10px] md:text-xs text-zinc-400 font-bold uppercase tracking-widest">
             <span className="hover:text-cyan-400 transition-colors">Crypto (BEP20)</span>
             <span className="hidden md:inline text-zinc-800">•</span>
             <span className="hover:text-cyan-400 transition-colors">Binance Pay</span>
             <span className="hidden md:inline text-zinc-800">•</span>
             <span className="hover:text-cyan-400 transition-colors">SadaPay</span>
             <span className="hidden md:inline text-zinc-800">•</span>
             <span className="hover:text-cyan-400 transition-colors">PayPal</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
