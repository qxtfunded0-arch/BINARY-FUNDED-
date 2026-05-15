import React from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDashboard }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-morphism border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center font-black text-black text-sm shadow-lg shadow-cyan-500/20">B</div>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase whitespace-nowrap">
              BINARY <span className="text-cyan-400">FUNDED</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <a href="#accounts" className="text-xs font-black uppercase tracking-widest hover:text-cyan-400 transition-colors">Challenges</a>
            <a href="#how-it-works" className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Brokers</a>
            <a href="#faq" className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Support</a>
            <button 
              onClick={onDashboard}
              className="px-6 py-2.5 rounded-xl bg-zinc-900 text-xs font-black uppercase tracking-widest hover:bg-zinc-800 transition-all border border-zinc-800 text-cyan-400 shadow-xl"
            >
              Dashboard
            </button>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-zinc-400 hover:text-white transition-colors">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-zinc-950 border-b border-zinc-900 px-6 pt-2 pb-8 space-y-6 overflow-hidden"
          >
            <div className="space-y-4 pt-4">
              <a href="#accounts" className="block text-sm font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-cyan-400" onClick={() => setIsOpen(false)}>Challenges</a>
              <a href="#how-it-works" className="block text-sm font-black uppercase tracking-[0.2em] text-zinc-500" onClick={() => setIsOpen(false)}>Supported Brokers</a>
              <a href="#faq" className="block text-sm font-black uppercase tracking-[0.2em] text-zinc-500" onClick={() => setIsOpen(false)}>Help Center</a>
            </div>
            <button 
              onClick={() => { onDashboard(); setIsOpen(false); }}
              className="w-full px-5 py-4 rounded-xl bg-cyan-500 text-black font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
            >
              Access Trader Dashboard
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
