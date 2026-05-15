import React from 'react';
import { motion } from 'motion/react';
import { Shield, Clock, CheckCircle2, ChevronRight, LayoutDashboard, Wallet, CreditCard, ChevronLeft } from 'lucide-react';
import { Order } from '../types';

interface DashboardProps {
  orders: Order[];
  onBack: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ orders, onBack }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 sm:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 w-full md:w-auto">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors text-[10px] font-black uppercase tracking-[0.2em] mb-2"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Home
            </button>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase flex items-center gap-3">
              <LayoutDashboard className="text-cyan-500 w-8 h-8 md:w-12 md:h-12" /> 
              Trader <span className="text-cyan-400">Dashboard</span>
            </h1>
            <p className="text-zinc-500 text-sm md:text-base font-medium">Manage your funded accounts and track application status.</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
             <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4 w-full md:w-auto">
               <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 shrink-0">
                 <Wallet className="w-5 h-5 md:w-6 md:h-6" />
               </div>
               <div>
                 <p className="text-[9px] md:text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Total Funding</p>
                 <p className="text-lg md:text-xl font-black">${orders.filter(o => o.status !== 'failed').reduce((acc, o) => acc + o.plan.fundingAmount, 0).toLocaleString()}</p>
               </div>
             </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="space-y-6">
          <h2 className="text-base md:text-xl font-bold flex items-center gap-2 text-zinc-400 uppercase tracking-widest">
            <Clock className="text-cyan-500 w-4 h-4 md:w-5 md:h-5" /> Recent Applications
          </h2>

          {orders.length === 0 ? (
            <div className="bg-zinc-900/50 border border-zinc-800 border-dashed rounded-[32px] p-12 md:p-20 text-center space-y-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-600">
                <CreditCard className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div className="space-y-2">
                <p className="text-xl md:text-2xl font-bold tracking-tight">No Applications Found</p>
                <p className="text-zinc-500 text-sm font-medium">You haven't purchased any funding challenge yet.</p>
              </div>
              <button 
                onClick={onBack}
                className="btn-primary"
              >
                Browse Challenges
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {orders.map((order, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={order.id}
                  className="bg-zinc-900/40 border border-zinc-800 p-5 md:p-6 rounded-[24px] md:rounded-3xl flex flex-col md:flex-row justify-between items-center gap-5 hover:border-zinc-700 transition-all group"
                >
                  <div className="flex items-center gap-4 md:gap-6 w-full">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-zinc-800 rounded-2xl flex flex-col items-center justify-center border border-white/5 shrink-0">
                      <span className="text-[8px] md:text-[10px] font-black text-zinc-500 uppercase">{order.plan.type}</span>
                      <span className="text-base md:text-lg font-black text-cyan-400 tracking-tighter">${order.plan.fundingAmount / 1000}K</span>
                    </div>
                    <div className="space-y-1 min-w-0">
                      <h3 className="font-bold text-base md:text-lg uppercase tracking-tight truncate">{order.plan.fundingAmount.toLocaleString()} USD Challenge</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1 shrink-0"><Shield className="w-3 h-3" /> {order.broker}</span>
                        <span className="flex items-center gap-1 shrink-0"><Clock className="w-3 h-3" /> {order.date}</span>
                        <span className="text-zinc-600 truncate max-w-[150px] md:max-w-[200px]">{order.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end border-t border-zinc-800 md:border-none pt-4 md:pt-0">
                    <div className={`px-4 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 border shadow-inner ${
                      order.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      order.status === 'verified' ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' :
                      'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      {order.status === 'pending' && <Clock className="w-3 h-3 animate-pulse" />}
                      {order.status === 'verified' && <CheckCircle2 className="w-3 h-3" />}
                      {order.status}
                    </div>
                    <button className="p-2 md:p-3 bg-zinc-800 rounded-xl group-hover:bg-cyan-500 group-hover:text-black transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Support Banner */}
        <div className="bg-cyan-500 rounded-[32px] p-8 md:p-12 text-black flex flex-col md:flex-row justify-between items-center gap-8 overflow-hidden relative">
          <div className="relative z-10 space-y-4 md:space-y-6 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none">Need Help with <br className="hidden md:block"/> Your Account?</h2>
            <p className="font-bold opacity-70 max-w-md text-sm md:text-base">Our support team is available 24/7 to assist with your credentials or any trading rules inquiry.</p>
            <a 
              href="mailto:binaryfunded01@gmail.com"
              className="bg-black text-white px-8 py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm hover:scale-105 transition-transform shadow-xl w-full md:w-auto inline-block text-center"
            >
              Contact Support
            </a>
          </div>
          <div className="relative z-10 hidden md:block">
             <div className="w-48 h-48 bg-black/10 rounded-full flex items-center justify-center text-black/20">
               <Shield className="w-32 h-32" />
             </div>
          </div>
          {/* Abstract decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
      </div>
    </div>
  );
};
