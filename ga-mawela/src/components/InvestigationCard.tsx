'use client';

import Link from "next/link";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface InvestigationCardProps {
  title: string;
  description: string;
  link: string;
  backgroundImage?: string;
}

export default function InvestigationCard({ title, description, link, backgroundImage }: InvestigationCardProps) {
  const cardRef = useScrollAnimation({ threshold: 0.2 });

  return (
    <article
      ref={cardRef as React.RefObject<HTMLElement>}
      className={`scroll-animate investigation-card card-bg bg-slate-700 rounded-xl p-4 sm:p-6 border border-slate-600 hover:shadow-2xl hover:border-amber-400 transition-all duration-300 focus-within:ring-2 focus-within:ring-amber-400 focus-within:ring-offset-2 relative overflow-hidden group transform hover:scale-105`}
    >
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt={`${title} background`}
            fill
            className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700/50 to-transparent group-hover:from-slate-600/50 transition-colors duration-300"></div>
        </>
      )}
      <div className="relative z-10">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors duration-300">{title}</h3>
        <p className="text-gray-100 mb-6 text-sm sm:text-base">{description}</p>
        <Link
          href={link}
          className="inline-flex items-center text-amber-400 hover:text-amber-300 focus:text-amber-300 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 rounded px-2 py-1 transition-all duration-200 group-hover:translate-x-1"
          aria-describedby={`${title.replace(/\s+/g, '-').toLowerCase()}-link-desc`}
        >
          Learn More
          <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          <span id={`${title.replace(/\s+/g, '-').toLowerCase()}-link-desc`} className="sr-only">
            Learn more about {title}
          </span>
        </Link>
      </div>
    </article>
  );
}