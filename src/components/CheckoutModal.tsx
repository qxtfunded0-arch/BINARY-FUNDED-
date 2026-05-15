import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, CreditCard, User, Globe, AlertCircle, Copy, Wallet, ChevronRight, ChevronLeft, Shield } from 'lucide-react';
import { AccountPlan, CheckoutState, Broker, PaymentMethod, Order } from '../types';
import { BROKERS, PAYMENT_DETAILS } from '../constants';

interface CheckoutModalProps {
  plan: AccountPlan;
  onClose: () => void;
  onSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ plan, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<CheckoutState>({
    plan: plan,
    broker: null,
    userDetails: {
      name: '',
      address: '',
      country: '',
      email: '',
    },
    paymentMethod: null,
    proofUploaded: false,
  });

  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const updateUserDetails = (field: string, value: string) => {
    setState(prev => ({
      ...prev,
      userDetails: { ...prev.userDetails, [field]: value }
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Globe className="text-cyan-500" /> Select your Broker
            </h3>
            <p className="text-zinc-400 text-sm">Choose the platform where you want your funded account to be managed.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BROKERS.map((broker) => (
                <button
                  key={broker}
                  onClick={() => setState(s => ({ ...s, broker: broker as Broker }))}
                  className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between ${
                    state.broker === broker 
                      ? 'border-cyan-500 bg-cyan-500/10' 
                      : 'border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800'
                  }`}
                >
                  <span className="font-semibold">{broker}</span>
                  {state.broker === broker && <CheckCircle2 className="w-5 h-5 text-cyan-500" />}
                </button>
              ))}
            </div>
            <div className="flex justify-end pt-4">
              <button
                disabled={!state.broker}
                onClick={handleNext}
                className="btn-primary disabled:opacity-50 flex items-center gap-2"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <User className="text-cyan-500" /> Account Details
            </h3>
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex gap-3 text-sm text-amber-200">
              <AlertCircle className="shrink-0 w-5 h-5" />
              <p>IMPORTANT: Provide a <span className="font-bold underline">NEW EMAIL</span> address that has never been used to create an account with your selected broker ({state.broker}). Details will be sent here.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-500 uppercase tracking-tighter">Full Name</label>
                <input 
                  type="text" 
                  value={state.userDetails.name}
                  onChange={(e) => updateUserDetails('name', e.target.value)}
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none transition-colors" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-500 uppercase tracking-tighter">New Email Address</label>
                <input 
                  type="email" 
                  value={state.userDetails.email}
                  onChange={(e) => updateUserDetails('email', e.target.value)}
                  className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none transition-colors" 
                  placeholder="newemail@example.com" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-500 uppercase tracking-tighter">Country</label>
                  <input 
                    type="text" 
                    value={state.userDetails.country}
                    onChange={(e) => updateUserDetails('country', e.target.value)}
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none transition-colors" 
                    placeholder="e.g. USA, UK" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-500 uppercase tracking-tighter">Full Address</label>
                  <input 
                    type="text" 
                    value={state.userDetails.address}
                    onChange={(e) => updateUserDetails('address', e.target.value)}
                    className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none transition-colors" 
                    placeholder="Street, City, Zip" 
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <button onClick={handleBack} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                disabled={!state.userDetails.name || !state.userDetails.email || !state.userDetails.country}
                onClick={handleNext}
                className="btn-primary disabled:opacity-50 flex items-center gap-2 text-sm"
              >
                Select Payment <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CreditCard className="text-cyan-500" /> Payment Method
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {(['Binance Pay', 'Crypto (BEP20)', 'SadaPay', 'PayPal'] as PaymentMethod[]).map((method) => {
                const details = method === 'Binance Pay' ? PAYMENT_DETAILS.binancePay : 
                               method === 'SadaPay' ? PAYMENT_DETAILS.sadapay :
                               method === 'PayPal' ? PAYMENT_DETAILS.paypal :
                               PAYMENT_DETAILS.crypto;
                return (
                  <button
                    key={method}
                    onClick={() => setState(s => ({ ...s, paymentMethod: method }))}
                    className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between group ${
                      state.paymentMethod === method 
                        ? 'border-cyan-500 bg-cyan-500/10' 
                        : 'border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center p-2 group-hover:scale-110 transition-transform bg-black/40 border border-white/5">
                        {method === 'Binance Pay' && <span className="text-yellow-500 font-black text-xl">B</span>}
                        {method === 'Crypto (BEP20)' && <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] font-bold">$</div>}
                        {method === 'SadaPay' && <span className="text-cyan-400 font-black text-xl">S</span>}
                        {method === 'PayPal' && <span className="text-blue-500 font-black text-xl">P</span>}
                      </div>
                      <span className="font-semibold">{method}</span>
                    </div>
                    {state.paymentMethod === method && <CheckCircle2 className="w-5 h-5 text-cyan-500" />}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between pt-4">
              <button onClick={handleBack} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                disabled={!state.paymentMethod}
                onClick={handleNext}
                className="btn-primary disabled:opacity-50 flex items-center gap-2 text-sm"
              >
                Confirm Payment <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Wallet className="text-cyan-500" /> Complete Transaction
            </h3>
            <div className="bg-zinc-950/40 border border-zinc-800 p-6 rounded-2xl space-y-4 shadow-inner">
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800/50">
                <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Amount Due</span>
                <span className="text-2xl font-black">${plan.price}</span>
              </div>
              
              {state.paymentMethod === 'Crypto (BEP20)' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] font-bold">$</div>
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-500">BEP20 (BSC) Network</span>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.2em]">Recipient Address</label>
                    <div className="flex gap-2">
                      <code className="flex-1 bg-black/40 p-3 rounded-lg text-xs break-all font-mono text-cyan-200 border border-white/5 shadow-inner">
                        {PAYMENT_DETAILS.crypto.address}
                      </code>
                      <button 
                        onClick={() => copyToClipboard(PAYMENT_DETAILS.crypto.address)}
                        className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all border border-cyan-500/20"
                      >
                        {isCopied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {state.paymentMethod === 'SadaPay' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-cyan-400 font-bold text-xs border border-white/5">S</div>
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-500">SadaPay Transfer</span>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.2em]">Account Name</label>
                    <p className="font-bold text-lg text-cyan-400">{PAYMENT_DETAILS.sadapay.name}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.2em]">Account Number</label>
                    <div className="flex gap-2">
                      <p className="flex-1 bg-black/40 p-3 rounded-lg text-xl font-mono text-cyan-400">
                        {PAYMENT_DETAILS.sadapay.number}
                      </p>
                      <button 
                        onClick={() => copyToClipboard(PAYMENT_DETAILS.sadapay.number)}
                        className="p-3 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all border border-cyan-500/20"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {state.paymentMethod === 'Binance Pay' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-yellow-500 font-bold text-xs border border-white/5">B</div>
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Binance Pay</span>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.2em]">Recipient Name</label>
                    <p className="font-bold text-lg text-cyan-400">{PAYMENT_DETAILS.binancePay.name}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.2em]">Binance Pay ID</label>
                    <div className="flex gap-2">
                      <p className="flex-1 bg-black/40 p-3 rounded-lg text-2xl font-mono text-cyan-400 tracking-widest">
                        {PAYMENT_DETAILS.binancePay.id}
                      </p>
                      <button 
                        onClick={() => copyToClipboard(PAYMENT_DETAILS.binancePay.id)}
                        className="p-3 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all border border-cyan-500/20"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {state.paymentMethod === 'PayPal' && (
                <div className="space-y-4 text-center py-4">
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-500 font-black text-2xl shadow-xl">P</div>
                  </div>
                  <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                    <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">PayPal Email</p>
                    <p className="text-xl font-bold text-cyan-400">{PAYMENT_DETAILS.paypal.email}</p>
                  </div>
                  <p className="text-xs text-zinc-500 italic">Please send as "Friends & Family" to avoid additional fees.</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold uppercase tracking-widest text-[10px] text-zinc-500">Upload Payment Screenshot</label>
              <div className="relative border-2 border-dashed border-zinc-800 rounded-2xl p-8 transition-colors hover:border-cyan-500/50 flex flex-col items-center justify-center gap-3 bg-zinc-950/20">
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  onChange={() => setState(s => ({ ...s, proofUploaded: true }))}
                />
                <div className={`p-4 rounded-full transition-all ${state.proofUploaded ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'bg-zinc-800 text-zinc-500'}`}>
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium text-zinc-500">
                  {state.proofUploaded ? 'Screenshot selected!' : 'Browse files or drag screenshot here'}
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={handleBack} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                disabled={!state.proofUploaded}
                onClick={handleNext}
                className="px-8 py-3 rounded-xl bg-cyan-500 text-black font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
              >
                Submit Application
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6 py-8">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center animate-bounce shadow-2xl shadow-cyan-500/40">
                  <CheckCircle2 className="w-12 h-12 text-black" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black tracking-tight">Application Sent!</h3>
                <p className="text-zinc-400 font-medium leading-relaxed">Our team will verify your payment and details. You will receive your {state.broker} account credentials on <span className="text-cyan-400 underline decoration-cyan-500/50">{state.userDetails.email}</span> within 1-6 hours.</p>
              </div>
              <button
                onClick={() => {
                  if (state.broker && state.paymentMethod) {
                    onSuccess({
                      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
                      plan: state.plan!,
                      broker: state.broker,
                      status: 'pending',
                      date: new Date().toLocaleDateString(),
                      email: state.userDetails.email
                    });
                  }
                  onClose();
                }}
                className="btn-secondary w-full"
              >
                Go to Dashboard
              </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800/50 bg-zinc-900/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 font-black border border-cyan-500/30">
              {step < 5 ? step : <CheckCircle2 />}
            </div>
            <div>
              <p className="text-[10px] text-cyan-500 font-black uppercase tracking-[0.2em]">Funding Checkout</p>
              <h2 className="text-lg font-bold">Step {step}: {step < 5 ? 'Processing' : 'Success'}</h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
            <X className="w-6 h-6 text-zinc-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          {renderStep()}
        </div>

        {/* Footer info (only if not success) */}
        {step < 5 && (
          <div className="p-4 bg-zinc-950 flex items-center gap-2 justify-center text-[10px] text-zinc-600 font-bold uppercase tracking-widest border-t border-zinc-900">
            <Shield className="w-4 h-4 text-cyan-500/50" /> Secure SSL Encrypted Checkout | Binary Funded Official
          </div>
        )}
      </motion.div>
    </div>
  );
};
