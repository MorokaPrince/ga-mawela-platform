"use client";
import React from "react";
import { motion } from "framer-motion";

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website?: string;
  description: string;
  category: "primary" | "partner" | "supporter";
}

const sponsors: Sponsor[] = [
  {
    id: "g20",
    name: "G20 South Africa",
    logo: "/assets/logos/g20-mg-logo.png",
    website: "https://g20.mg.co.za",
    description: "Official G20 South Africa hub for news, events and updates",
    category: "primary"
  },
  {
    id: "innovation-bridge",
    name: "Innovation Bridge",
    logo: "/assets/images/innovation-bridge-logo.png",
    website: "https://innovationbridge.info/ibportal",
    description: "Connecting innovation ecosystems across Africa and beyond",
    category: "primary"
  },
  {
    id: "anglo-american",
    name: "Anglo American",
    logo: "/assets/logos/anglo.png",
    website: "https://angloamerican.com",
    description: "Global mining leader committed to sustainable development",
    category: "partner"
  },
  {
    id: "implats",
    name: "Implats",
    logo: "/assets/logos/implats.png",
    website: "https://implats.co.za",
    description: "Leading platinum producer with heritage in Limpopo",
    category: "partner"
  },
  {
    id: "amplats",
    name: "Anglo American Platinum",
    logo: "/assets/logos/amplats.png",
    website: "https://angloamericanplatinum.com",
    description: "World's leading primary producer of platinum group metals",
    category: "partner"
  },
  {
    id: "nyda",
    name: "National Youth Development Agency",
    logo: "/assets/logos/nyda.png",
    website: "https://nyda.gov.za",
    description: "Empowering South African youth through education and employment",
    category: "supporter"
  },
  {
    id: "sahra",
    name: "South African Heritage Resources Agency",
    logo: "/assets/logos/sahra.png",
    website: "https://sahra.org.za",
    description: "Protecting and promoting South Africa's cultural heritage",
    category: "supporter"
  },
  {
    id: "dalrrd",
    name: "Department of Agriculture, Land Reform and Rural Development",
    logo: "/assets/logos/dalrrd.png",
    website: "https://dalrrd.gov.za",
    description: "Advancing sustainable agriculture and rural development",
    category: "supporter"
  }
];

export default function SponsorsShowcase() {
  const primarySponsors = sponsors.filter(s => s.category === "primary");
  const partners = sponsors.filter(s => s.category === "partner");
  const supporters = sponsors.filter(s => s.category === "supporter");

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Partners & Sponsors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Collaborating with leading organizations to preserve heritage, 
            empower communities, and drive sustainable development in Limpopo
          </p>
        </motion.div>

        {/* Primary Sponsors - Featured Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">Primary Partners</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {primarySponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="h-16 w-auto object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "/assets/logos/g20-mg-logo.png";
                        }}
                      />
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">{sponsor.name}</h4>
                        <p className="text-sm text-gray-500">{sponsor.description}</p>
                      </div>
                    </div>
                  </div>
                  {sponsor.website && (
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Visit Website
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Corporate Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">Corporate Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((sponsor, index) => (
              <motion.div
                key={sponsor.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 text-center">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="h-12 w-auto mx-auto mb-3 object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/logos/g20-mg-logo.png";
                    }}
                  />
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{sponsor.name}</h4>
                  <p className="text-xs text-gray-500">{sponsor.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Government & Supporters */}
        <div>
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">Government & Supporters</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {supporters.map((sponsor, index) => (
              <motion.div
                key={sponsor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 text-center">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="h-10 w-auto mx-auto mb-3 object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/logos/g20-mg-logo.png";
                    }}
                  />
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{sponsor.name}</h4>
                  <p className="text-xs text-gray-500">{sponsor.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Partner With Us</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join our mission to preserve heritage, empower communities, and drive sustainable development. 
              Together, we can make a lasting impact in Limpopo and beyond.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300">
              Become a Partner
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}