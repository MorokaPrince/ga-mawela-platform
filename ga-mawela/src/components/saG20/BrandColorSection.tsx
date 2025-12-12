"use client";
import React from "react";
import { motion } from "framer-motion";

export default function BrandColorSection() {
  return (
    <section className="py-24" style={{ background: "linear-gradient(180deg,#0b1220 0%, #071026 100%)" }}>
      <div className="mx-auto max-w-6xl px-6 text-white">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} className="text-center">
          <h2 className="text-4xl font-bold">Limpopo — Local Opportunities</h2>
          <p className="mt-3 text-gray-300">Tailored programmes, local partners and heritage-led development — all surfaced on your main landing page. Discover more via <a href="https://innovationbridge.info/ibportal/g20-open-innovation-platform" className="underline">Innovation Bridge</a>.</p>
        </motion.div>

        <div className="mt-10 grid md:grid-cols-4 gap-6">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <img src="/assets/logos/g20-mg-logo.png" alt="G20" className="h-12 mb-3" />
            <p className="text-sm text-gray-300">G20 (M&G)</p>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <img src="/assets/logos/anglo.png" alt="Anglo" className="h-12 mb-3" />
            <p className="text-sm text-gray-300">Anglo / CSI</p>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <img src="/assets/logos/implats.png" alt="Implats" className="h-12 mb-3" />
            <p className="text-sm text-gray-300">Implats</p>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <img src="/assets/logos/nyda.png" alt="NYDA" className="h-12 mb-3" />
            <p className="text-sm text-gray-300">NYDA</p>
          </div>
        </div>
      </div>
    </section>
  );
}