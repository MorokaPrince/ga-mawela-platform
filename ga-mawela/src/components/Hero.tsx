'use client';

import Link from "next/link";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface CTA {
  label: string;
  href: string;
}

interface HeroProps {
  title: string;
  subtitle: string;
  ctas: CTA[];
}

export default function Hero({ title, subtitle, ctas }: HeroProps) {
  const titleRef = useScrollAnimation({ threshold: 0.3 });
  const subtitleRef = useScrollAnimation({ threshold: 0.3 });
  const ctaRef = useScrollAnimation({ threshold: 0.3 });

  return (
    <section
      className="hero-section hero-bg relative py-24 px-4 sm:py-32 lg:py-48 overflow-hidden"
      role="banner"
      aria-labelledby="hero-title"
    >
      {/* Background Image with overlay */}
      <Image
        src="/Images/Backrounds/landing.jpg"
        alt="Ga Mawela landscape background"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Enhanced dark overlay for text readability with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>

      {/* Animated background elements with amber accents */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-amber-300 to-amber-500 rounded-full blur-3xl animate-float animation-delay-2s"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1
          ref={titleRef as React.RefObject<HTMLHeadingElement>}
          id="hero-title"
          className="scroll-animate text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl animate-slide-up-reveal text-shadow-lg"
        >
          {title}
        </h1>
        <p
          ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
          className="scroll-animate text-lg sm:text-xl lg:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto stagger-2 drop-shadow-lg font-light tracking-wide text-shadow-md"
          aria-describedby="hero-subtitle"
        >
          {subtitle}
        </p>
        <nav aria-label="Primary actions">
          <div
            ref={ctaRef as React.RefObject<HTMLDivElement>}
            className="scroll-animate flex flex-col sm:flex-row gap-4 justify-center stagger-3"
          >
            {ctas.map((cta, index) => (
              <Link
                key={index}
                href={cta.href}
                className="btn btn-primary px-8 sm:px-10 py-4 hover:shadow-2xl transition-all duration-300 transform hover:scale-110 font-bold text-lg hover-lift hover-glow"
                aria-describedby={`cta-${index}-desc`}
              >
                {cta.label}
                <span id={`cta-${index}-desc`} className="sr-only">
                  {cta.label} - Call to action button
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
}