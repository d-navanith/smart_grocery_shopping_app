import React, { useState } from 'react';
import { 
  Mail, 
  PhoneCall, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  Truck, 
  Globe
} from 'lucide-react';
import { AppPage } from './HeaderNav';
import { TranslationDictionary } from '../translations';

interface ContactViewProps {
  onNavigatePage: (page: AppPage) => void;
  isDarkMode?: boolean;
  t: TranslationDictionary;
}

export const ContactView: React.FC<ContactViewProps> = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Order Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: 'Order Inquiry',
        message: ''
      });
    }, 700);
  };

  return (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-[#0B0F0D] text-white' : 'bg-[#F6F8F7] text-slate-900'} select-none pb-20`}>
      {/* 1. HERO HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#064F41] via-[#0A5F4F] to-[#15875D] text-white py-14 sm:py-20 px-4 sm:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F8C519_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F8C519] text-xs sm:text-sm font-bold shadow-md">
            <img src="/sri_lanka_flag.svg" alt="Sri Lanka Flag" className="w-5 h-3.5 object-cover rounded-xs" />
            <span>Ceylon Foods • Customer Support & Orders Desk</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            We’d Love to Hear from You
          </h1>

          <p className="text-sm sm:text-lg text-emerald-100/90 max-w-xl mx-auto font-normal">
            Have questions about Sri Lankan grocery delivery, wholesale inquiries, or need assistance with your order? Our team in Bucharest is here to help 7 days a week.
          </p>
        </div>
      </section>

      {/* 2. CONTACT DETAILS & INTERACTIVE FORM */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Information Cards */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl bg-white dark:bg-[#141C18] border border-slate-200 dark:border-zinc-800 p-6 sm:p-7 shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-zinc-800">
                <div className="w-12 h-12 rounded-xl bg-[#064F41]/10 text-[#064F41] dark:text-[#78F9B8] flex items-center justify-center shrink-0">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-base text-[#064F41] dark:text-white">Customer Support</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">Sinhala, Tamil, Romanian & English</p>
                </div>
              </div>

              <div className="space-y-4 text-sm font-medium">
                {/* Phone Romania */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-[#15875D] flex items-center justify-center shrink-0 mt-0.5">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase font-bold text-slate-400 block">Bucharest Hotline</span>
                    <a href="tel:+40722456789" className="text-sm font-bold text-[#064F41] dark:text-[#78F9B8] hover:underline">
                      +40 722 456 789
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 dark:bg-orange-950/50 text-[#FF632B] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase font-bold text-slate-400 block">Email Us</span>
                    <a href="mailto:orders@ceylonfoods.ro" className="text-sm font-bold text-[#064F41] dark:text-[#78F9B8] hover:underline">
                      orders@ceylonfoods.ro
                    </a>
                    <span className="text-xs text-slate-400 block">contact@ceylonfoods.ro</span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#15875D] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase font-bold text-slate-400 block">Bucharest Distribution Store</span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-200 font-semibold leading-snug">
                      Strada Mihai Eminescu nr. 42, Sector 1, București, Romania
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-[#664E00] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase font-bold text-slate-400 block">Operating Hours</span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-200 font-semibold">
                      Monday – Sunday: 09:00 – 20:00
                    </p>
                    <span className="text-[11px] text-[#15875D] font-bold">Courier dispatches 7 days a week</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Guarantee Pill */}
            <div className="rounded-2xl p-5 bg-gradient-to-r from-[#064F41] to-[#15875D] text-white space-y-2 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-[#F8C519]">
                <Truck className="w-4 h-4" />
                <span>Cash on Delivery in Romania</span>
              </div>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Pay in cash or contactless mobile card when the courier arrives at your door. No advance online payments required.
              </p>
            </div>
          </div>

          {/* Right Column: Send Us a Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white dark:bg-[#141C18] border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xl space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[#FF632B]">
                  <MessageSquare className="w-4 h-4" />
                  <span>Send a Direct Message</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#064F41] dark:text-white">
                  Get in Touch with Our Team
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Fill out the form below and our Bucharest support team will respond within 2–4 hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-3 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-[#15875D] text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-[#064F41] dark:text-[#78F9B8]">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 max-w-md mx-auto">
                    Thank you for reaching out to Ceylon Foods. One of our customer coordinators will review your message and contact you promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-2 px-5 py-2 rounded-xl bg-[#064F41] text-white text-xs font-bold hover:bg-[#0A5F4F] transition cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-zinc-200">
                        Full Name <span className="text-[#FF632B]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priyantha Silva"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#15875D] focus:ring-1 focus:ring-[#15875D]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-zinc-200">
                        Email Address <span className="text-[#FF632B]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. priyantha@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#15875D] focus:ring-1 focus:ring-[#15875D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-zinc-200">
                        Contact Phone <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+40 7..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#15875D] focus:ring-1 focus:ring-[#15875D]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-zinc-200">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#15875D] focus:ring-1 focus:ring-[#15875D]"
                      >
                        <option value="Order Inquiry">Order Inquiry & Tracking</option>
                        <option value="Product Request">Product Request / Specific Brand</option>
                        <option value="Wholesale">Wholesale & Restaurant Supply</option>
                        <option value="Delivery Help">Bucharest & Ilfov Delivery Help</option>
                        <option value="Other">Other Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-zinc-200">
                      Your Message <span className="text-[#FF632B]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please let us know how we can assist you..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#15875D] focus:ring-1 focus:ring-[#15875D] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#064F41] hover:bg-[#0A5F4F] active:scale-98 text-white font-black text-sm shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message to Ceylon Foods</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCATION & STORE INFO */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-16">
        <div className="rounded-3xl bg-white dark:bg-[#141C18] border border-slate-200 dark:border-zinc-800 p-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2 p-4">
              <div className="w-10 h-10 rounded-full bg-[#15875D]/10 text-[#15875D] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#064F41] dark:text-white">Authentic Certified</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                100% genuine Sri Lankan groceries imported under direct food standards.
              </p>
            </div>

            <div className="space-y-2 p-4">
              <div className="w-10 h-10 rounded-full bg-[#FF632B]/10 text-[#FF632B] flex items-center justify-center mx-auto">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#064F41] dark:text-white">Same-Day In Bucharest</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Orders in Bucharest & Ilfov can be delivered same-day with real-time updates.
              </p>
            </div>

            <div className="space-y-2 p-4">
              <div className="w-10 h-10 rounded-full bg-[#F8C519]/20 text-[#664E00] flex items-center justify-center mx-auto">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-[#064F41] dark:text-white">Direct Support</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Call or email us anytime. We speak your language.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
