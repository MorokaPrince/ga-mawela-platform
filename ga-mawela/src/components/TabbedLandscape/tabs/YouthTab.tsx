'use client';

import { useState } from 'react';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

export default function YouthTab() {
  const [signedPetition, setSignedPetition] = useState(false);

  const youthPrograms = [
    {
      title: 'Land Rights Education',
      description: 'Comprehensive education on land restitution, property rights, and legal frameworks affecting indigenous communities.',
      link: 'https://www.lrc.org.za',
    },
    {
      title: 'Skills Development',
      description: 'Training programs in agriculture, sustainable mining practices, and community development.',
      link: 'https://www.zimele.co.za',
    },
    {
      title: 'Leadership Training',
      description: 'Develop future leaders through mentorship, public speaking, and community organizing.',
      link: 'https://www.sahistory.org.za',
    },
    {
      title: 'Economic Empowerment',
      description: 'Business development, entrepreneurship, and access to funding for youth-led initiatives.',
      link: 'https://www.dbe.gov.za',
    },
  ];

  const resources = [
    {
      title: 'Department of Youth Development',
      url: 'https://www.dsd.gov.za/index.php/youth-development',
      description: 'Government programs for youth empowerment and development',
    },
    {
      title: 'Land and Accountability Research Centre',
      url: 'https://www.lrc.org.za',
      description: 'Research and advocacy on land rights and restitution',
    },
    {
      title: 'Zimele - Community Development',
      url: 'https://www.zimele.co.za',
      description: 'Community-based development and empowerment programs',
    },
    {
      title: 'South African History Online',
      url: 'https://www.sahistory.org.za',
      description: 'Educational resources on South African history and heritage',
    },
  ];

  return (
    <div className="w-full bg-metallic-blue-gradient-vertical relative py-16 px-6 md:px-12 bg-youth-tab">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-lighter mb-4 font-merriweather">
            Youth Empowerment & Future
          </h2>
        </ScrollRevealWrapper>

        {/* Impact Statement */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.1}>
          <div className="card-interactive bg-white/15 backdrop-blur-md border-l-4 border-yellow p-8 mb-12 rounded-lg hover:bg-white/20">
            <p className="text-base md:text-lg text-white font-inter leading-relaxed mb-4">
              <strong>The propaganda and corruption surrounding the Mankge family&apos;s fraudulent land claim has never benefited the people of Ga-Mawela.</strong>
              Instead, it has robbed our youth of their rightful inheritance and opportunities. This generation deserves the truth, justice, and the resources to build a prosperous future on our ancestral lands.
            </p>
            <p className="text-white font-inter text-sm">
              We are committed to empowering Ga-Mawela youth with education, skills, and opportunities to reclaim our heritage and build a sustainable future.
            </p>
          </div>
        </ScrollRevealWrapper>

        {/* Youth Programs */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.2}>
          <h3 className="text-3xl font-bold text-yellow mb-8 font-merriweather">
            Empowerment Programs
          </h3>
        </ScrollRevealWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {youthPrograms.map((program, index) => (
            <ScrollRevealWrapper key={index} type="fadeUp" duration={0.8} delay={index * 0.1}>
              <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-6 hover:border-yellow/60 rounded-lg hover:bg-white/20">
                <h4 className="text-base font-bold text-yellow mb-3 font-merriweather">
                  {program.title}
                </h4>
                <p className="text-white mb-4 font-inter text-xs">
                  {program.description}
                </p>
                <a
                  href={program.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-yellow text-black font-semibold hover:bg-yellow/90 transition-all inline-block font-inter text-xs rounded"
                  title={`Learn more about ${program.title}`}
                >
                  Learn More →
                </a>
              </div>
            </ScrollRevealWrapper>
          ))}
        </div>

        {/* Petition Section */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-8 mb-12 bg-gradient-to-r from-yellow/15 to-yellow/10 rounded-lg hover:bg-white/20">
            <h3 className="text-2xl font-bold text-yellow mb-4 font-merriweather">
              Sign the Petition
            </h3>
            <p className="text-white mb-6 font-inter text-sm">
              Join thousands of Ga-Mawela youth and community members demanding justice, land restitution, and proper recognition of our true lineage. Your voice matters.
            </p>
            <button
              type="button"
              onClick={async () => {
                try {
                  const response = await fetch('/api/petitions', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: 'Anonymous Youth Supporter',
                      petitionType: 'youth-empowerment',
                      message: 'I support Ga-Mawela youth empowerment and land restitution',
                    }),
                  });

                  if (response.ok) {
                    setSignedPetition(true);
                  } else {
                    alert('Failed to sign petition. Please try again.');
                  }
                } catch (error) {
                  console.error('Error signing petition:', error);
                  alert('Failed to sign petition. Please try again.');
                }
              }}
              className={`px-6 py-3 bg-yellow text-black font-semibold hover:bg-yellow/90 transition-all font-inter text-sm rounded ${signedPetition ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={signedPetition}
              title={signedPetition ? 'You have already signed the petition' : 'Sign the petition'}
            >
              {signedPetition ? '✓ Petition Signed' : 'Sign Petition'}
            </button>
            {signedPetition && (
              <p className="text-yellow font-semibold mt-4 font-inter text-sm">
                Thank you for your support! Your voice has been recorded.
              </p>
            )}
          </div>
        </ScrollRevealWrapper>

        {/* Resources */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.1}>
          <h3 className="text-3xl font-bold text-yellow mb-8 font-merriweather">
            Youth Resources & Support
          </h3>
        </ScrollRevealWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, index) => (
            <ScrollRevealWrapper key={index} type="fadeUp" duration={0.8} delay={index * 0.1}>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-6 hover:border-yellow/60 rounded-lg hover:bg-white/20"
                title={`Visit ${resource.title}`}
              >
                <h4 className="text-base font-bold text-white mb-2 font-merriweather">
                  {resource.title}
                </h4>
                <p className="text-white text-xs font-inter">
                  {resource.description}
                </p>
                <p className="text-yellow text-xs font-semibold mt-3 font-inter">
                  Visit Website →
                </p>
              </a>
            </ScrollRevealWrapper>
          ))}
        </div>
      </div>
    </div>
  );
}

