"use client";
import React from "react";
import { motion } from "framer-motion";

export default function FloatingBlobsSection() {
  return (
    <section className="relative w-full py-20 overflow-hidden">
      <div className="absolute left-[-10%] top-0 w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-3xl animate-blob" />
      <div className="absolute right-[-10%] bottom-0 w-[600px] h-[600px] rounded-full bg-blue-400/15 blur-3xl animate-blob animation-delay-2000" />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
          <div className="bg-white/5 rounded-3xl p-8 md:p-12 shadow-xl border border-white/10 backdrop-blur-lg">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <img src="/assets/logos/g20-mg-logo.png" alt="G20" className="h-16 object-contain" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Innovation Bridge — Local Edition</h3>
                <p className="mt-2 text-gray-300">A modern, animated module for the landing page with floating visuals and soft motion to draw attention while remaining professional. Explore more at <a href="https://innovationbridge.info/ibportal/g20-open-innovation-platform" className="underline">Innovation Bridge Portal</a>.</p>
                <div className="mt-4 flex gap-4">
                  <button className="rounded-full px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white">Apply</button>
                  <a href="#resources" className="underline text-gray-300">View partners</a>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <img src="/assets/logos/anglo.png" alt="Anglo" className="h-12 object-contain" />
              <img src="/assets/logos/implats.png" alt="Implats" className="h-12 object-contain" />
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        @keyframes blob {
          0% { transform: translateY(0) scale(1); }
          33% { transform: translateY(-20px) scale(1.06); }
          66% { transform: translateY(10px) scale(0.98); }
          100% { transform: translateY(0) scale(1); }
        }
      `}</style>
    </section>
  );
}