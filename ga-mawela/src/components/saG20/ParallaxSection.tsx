"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { G20Feed } from "@/lib/feeds";

export default function ParallaxSection() {
  const [feeds, setFeeds] = useState<G20Feed[]>([]);

  useEffect(() => {
    fetch('/api/g20-feeds').then(res => res.json()).then(setFeeds).catch(console.error);
  }, []);

  return (
    <section className="relative w-full py-24 bg-gradient-to-b from-slate-900 via-gray-900 to-black text-white overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-600/40 to-blue-400/30 rounded-full transform translate-y-0 blur-3xl animate-slow-pulse" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-sky-300">
            South Africa — G20 · Mining · Youth · Heritage
          </h2>
          <p className="mt-4 text-gray-300 max-w-3xl mx-auto">A Limpopo-focused landing module integrating partners, programmes and heritage resources, with parallax depth and professional animations. Featuring content from <a href="https://innovationbridge.info/ibportal/g20-open-innovation-platform" className="underline">Innovation Bridge Portal</a>.</p>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <motion.div whileHover={{ y: -8 }} className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur">
            <img src="/assets/logos/g20-mg-logo.png" alt="G20 Mail & Guardian" className="h-14 object-contain mb-4" />
            <h3 className="font-semibold text-lg">G20 (Mail & Guardian)</h3>
            <p className="text-sm text-gray-300 mt-2">Local coverage and event images for South Africa, including Limpopo highlights.</p>
            {feeds.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium">Latest:</h4>
                <a href={feeds[0].link} className="text-xs text-purple-300 underline">{feeds[0].title}</a>
              </div>
            )}
          </motion.div>

          <motion.div whileHover={{ y: -8 }} className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur">
            <div className="flex items-center gap-4 mb-4">
              <img src="/assets/logos/anglo.png" alt="Anglo American" className="h-10 object-contain" />
              <img src="/assets/logos/amplats.png" alt="Amplats" className="h-10 object-contain" />
            </div>
            <h3 className="font-semibold text-lg">Mining Partners</h3>
            <p className="text-sm text-gray-300 mt-2">Anglo, Amplats, Implats — logos, CSI links and contact for high-res images.</p>
          </motion.div>

          <motion.div whileHover={{ y: -8 }} className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur">
            <img src="/assets/logos/nyda.png" alt="NYDA" className="h-12 object-contain mb-4" />
            <h3 className="font-semibold text-lg">Youth Programmes</h3>
            <p className="text-sm text-gray-300 mt-2">NYDA, YES4Youth and local Limpopo initiatives.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}