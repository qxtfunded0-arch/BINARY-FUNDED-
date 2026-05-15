import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { PricingSection } from './components/PricingSection';
import { CheckoutModal } from './components/CheckoutModal';
import { FAQSection } from './components/FAQSection';
import { Dashboard } from './components/Dashboard';
import { AccountPlan, Order } from './types';
import { Shield, Target, Award, Globe, Wallet, ChevronRight, PlayCircle } from 'lucide-react';

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState<AccountPlan | null>(null);
  const [view, setView] = useState<'home' | 'dashboard'>('home');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Force direct scroll to top on view change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [view]);

  const handleOrderSuccess = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  if (view === 'dashboard') {
    return <Dashboard orders={orders} onBack={() => setView('home')} />;
  }

  return (
    <div className="min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Navbar onDashboard={() => setView('dashboard')} />
            <main>
              {/* Hero Section */}
              <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 px-4 overflow-hidden">
                {/* Background Ambient Glow */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

                <div className="max-w-7xl mx-auto text-center space-y-6 md:space-y-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]"
                  >
                    <Target className="w-4 h-4" /> Professional Binary Funding
                  </motion.div>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]"
                  >
                    Trade with <br />
                    <span className="gradient-text tracking-tighter">Our Capital.</span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-zinc-400 text-base md:text-xl max-w-2xl mx-auto font-medium px-4"
                  >
                    Access $100K+ in institutional funding for binary options. Prove your skills, hit your targets, and keep 92% of your profits.
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 px-6"
                  >
                    <a href="#accounts" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 text-base md:text-lg py-4 px-8 md:px-12">
                      Start Challenge <ChevronRight className="w-5 h-5" />
                    </a>
                    <button className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2 text-base md:text-lg py-4 px-8 md:px-12">
                      <PlayCircle className="w-5 h-5 text-cyan-400" /> Platform Tour
                    </button>
                  </motion.div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 md:mt-24 pt-8 md:pt-12 border-t border-zinc-800/50">
                    {[
                      { label: 'Funds Managed', val: '$8.5M+' },
                      { label: 'Active Traders', val: '4,200+' },
                      { label: 'Payout Split', val: '92%' },
                      { label: 'Audit Score', val: 'AA+' }
                    ].map((item, idx) => (
                      <div key={idx} className="text-center">
                        <p className="text-xl md:text-3xl font-black text-white tracking-tight">{item.val}</p>
                        <p className="text-[9px] md:text-[10px] text-zinc-500 uppercase font-bold tracking-[0.2em] mt-1">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Features / How it works */}
              <section id="how-it-works" className="py-16 md:py-24 bg-zinc-950/20 px-4 border-y border-zinc-900">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div className="space-y-6 md:space-y-8">
                    <div className="inline-block px-4 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400 text-xs font-bold uppercase tracking-widest">
                      Professional Workflow
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Simple Steps to <span className="text-cyan-400">Success</span></h2>
                    <div className="space-y-2">
                      {[
                        { title: 'Selection', desc: 'Pick the account size that fits your strategy.', icon: <Wallet className="text-cyan-500" /> },
                        { title: 'Configuration', desc: 'Choose your broker and platform in seconds.', icon: <Globe className="text-cyan-500" /> },
                        { title: 'Execution', desc: 'Execute your binary trades with discipline.', icon: <Award className="text-cyan-500" /> },
                        { title: 'Payout', desc: 'Request your profits directly to your wallet.', icon: <Shield className="text-cyan-500" /> }
                      ].map((step, idx) => (
                        <div key={idx} className="flex gap-4 md:gap-6 p-4 rounded-2xl hover:bg-zinc-900/40 transition-colors border border-transparent hover:border-zinc-800">
                          <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-zinc-900 flex items-center justify-center font-bold text-base md:text-lg shadow-inner">
                            {step.icon}
                          </div>
                          <div>
                            <h4 className="text-base md:text-lg font-bold mb-0.5 md:mb-1">{step.title}</h4>
                            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -inset-4 bg-cyan-500/5 rounded-[40px] blur-3xl" />
                    <div className="relative glass-morphism rounded-[32px] md:rounded-[40px] p-2 border border-zinc-800 shadow-2xl">
                       <div className="w-full h-full bg-zinc-950/60 rounded-[28px] md:rounded-[34px] flex flex-col items-center justify-center p-8 md:p-12 text-center space-y-4 md:space-y-6">
                         <div className="w-16 h-16 md:w-24 md:h-24 bg-cyan-500/10 rounded-2xl md:rounded-3xl flex items-center justify-center border border-cyan-500/20">
                           <Shield className="w-8 h-8 md:w-12 md:h-12 text-cyan-500" />
                         </div>
                         <h3 className="text-2xl md:text-3xl font-black tracking-tight">Verified Trust</h3>
                         <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-medium">Binary Funded is the world's most trusted provider of binary options capital. We empower traders to escape the limitation of their personal balances.</p>
                         <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-8 gap-y-3 pt-6 border-t border-zinc-800 w-full opacity-40">
                           <span className="font-bold text-[10px] md:text-xs uppercase tracking-tighter">Quotex</span>
                           <span className="font-bold text-[10px] md:text-xs uppercase tracking-tighter">Pocket</span>
                           <span className="font-bold text-[10px] md:text-xs uppercase tracking-tighter">Binomo</span>
                           <span className="font-bold text-[10px] md:text-xs uppercase tracking-tighter">Tradeowix</span>
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
              </section>

              <PricingSection onSelectPlan={(plan) => setSelectedPlan(plan)} />
              
              <FAQSection />

              {/* Footer */}
              <footer className="py-12 md:py-20 border-t border-zinc-800 bg-zinc-950 mt-12 md:mt-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 text-zinc-100">
                  <div className="col-span-1 md:col-span-2 space-y-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center font-bold text-black text-sm">B</div>
                      <span className="text-xl md:text-2xl font-black tracking-tighter uppercase">BINARY <span className="text-cyan-400">FUNDED</span></span>
                    </div>
                    <p className="text-zinc-500 max-w-sm font-medium text-sm">Empowering binary traders with institutional capital and professional risk management since 2024.</p>
                    <div className="flex gap-4">
                       <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all cursor-pointer shadow-lg">𝕏</div>
                       <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all cursor-pointer shadow-lg">📸</div>
                       <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all cursor-pointer shadow-lg">✈️</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 md:space-y-6">
                    <h5 className="font-bold uppercase text-[10px] tracking-[0.2em] text-cyan-500">Navigation</h5>
                    <ul className="space-y-2 md:space-y-4 text-zinc-400 text-sm font-medium">
                      <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                      <li><a href="#accounts" className="hover:text-white transition-colors">Challenges</a></li>
                      <li><a href="#how-it-works" className="hover:text-white transition-colors">Rules</a></li>
                      <li><a href="#faq" className="hover:text-white transition-colors">Support</a></li>
                    </ul>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <h5 className="font-bold uppercase text-[10px] tracking-[0.2em] text-cyan-500">Contact</h5>
                    <ul className="space-y-2 md:space-y-4 text-zinc-400 text-sm font-medium">
                      <li><a href="mailto:binaryfunded01@gmail.com" className="hover:text-cyan-400 transition-colors">binaryfunded01@gmail.com</a></li>
                      <li>Partnership Inquiries</li>
                      <li>Dubai Silicon Oasis, UAE</li>
                    </ul>
                  </div>
                </div>
                
                <div className="max-w-7xl mx-auto border-t border-zinc-900 mt-12 md:mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] md:text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em] text-center">
                  <p>© 2024 Binary Funded Limited. All Rights Reserved.</p>
                  <div className="flex gap-4 md:gap-8">
                    <span className="hover:text-zinc-400 cursor-pointer transition-colors">Risk Disclosure</span>
                    <span className="hover:text-zinc-400 cursor-pointer transition-colors">Terms of Service</span>
                    <span className="hover:text-zinc-400 cursor-pointer transition-colors">Privacy Policy</span>
                  </div>
                </div>
              </footer>
            </main>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Dashboard orders={orders} onBack={() => setView('home')} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPlan && (
          <CheckoutModal 
            plan={selectedPlan} 
            onClose={() => setSelectedPlan(null)} 
            onSuccess={handleOrderSuccess}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
