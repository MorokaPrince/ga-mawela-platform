"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IG20Feed } from "@/lib/feeds";

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function ScrollRevealSection() {
  const [feeds, setFeeds] = useState<IG20Feed[]>([]);

  useEffect(() => {
    fetch('/api/g20-feeds').then(res => res.json()).then(setFeeds).catch(console.error);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ staggerChildren: 0.15 }} className="grid md:grid-cols-3 gap-8">
          <motion.div variants={item} className="p-6 bg-white rounded-xl shadow">
            <img src="/assets/logos/sahra.png" alt="SAHRA" className="h-12 object-contain mb-4" />
            <h4 className="font-semibold">Heritage Projects</h4>
            <p className="text-sm text-gray-600">Site registries and heritage support for Limpopo communities.</p>
          </motion.div>

          <motion.div variants={item} className="p-6 bg-white rounded-xl shadow">
            <img src="/assets/logos/nyda.png" alt="NYDA" className="h-12 object-contain mb-4" />
            <h4 className="font-semibold">Youth Programmes</h4>
            <p className="text-sm text-gray-600">Funding, training and employment pathways for youth.</p>
          </motion.div>

          <motion.div variants={item} className="p-6 bg-white rounded-xl shadow">
            <img src="/assets/logos/dalrrd.png" alt="DALRRD" className="h-12 object-contain mb-4" />
            <h4 className="font-semibold">Land & Agriculture</h4>
            <p className="text-sm text-gray-600">Provincial contacts & land reform resources for Limpopo.</p>
          </motion.div>
        </motion.div>

        {feeds.length > 0 && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-4">Latest G20 Updates</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {feeds.slice(0, 4).map((feed, i) => (
                <a key={i} href={feed.link} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <h4 className="font-medium">{feed.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{feed.description?.substring(0, 100)}...</p>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}