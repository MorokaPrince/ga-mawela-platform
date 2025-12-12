/**
 * Seed Script: Populate database with initial documents and sources
 * This script creates sample documents and sources for the Ga Mawela platform
 */

import { connectToDatabase, getCollection } from '../src/lib/mongodb';
import { COLLECTIONS } from '../src/lib/mongodb-schemas';
import { ObjectId } from 'mongodb';

interface Document {
  title: string;
  description: string;
  category: 'legal' | 'historical' | 'evidence' | 'testimony' | 'archaeological' | 'other';
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedBy: string;
  uploadedAt: Date;
  isPublic: boolean;
  requiresAuthentication: boolean;
  tags: string[];
  downloadCount: number;
  metadata?: {
    author?: string;
    date?: Date;
    source?: string;
    relevance?: string;
  };
}

interface Source {
  title: string;
  url: string;
  type: 'primary_historical' | 'government_legal' | 'corporate_mining' | 'additional_evidence' | 'planned_future';
  description: string;
  category: string;
  reliability: 'high' | 'medium' | 'low';
  lastVerified: Date;
  isActive: boolean;
}

async function seedDocuments() {
  try {
    console.log('🌱 Starting document seeding process...');

    const documentsCollection = await getCollection<Document>(COLLECTIONS.DOCUMENTS);
    const sourcesCollection = await getCollection<Source>(COLLECTIONS.SOURCES);

    // Check if documents already exist
    const existingDocs = await documentsCollection.countDocuments();
    const existingSources = await sourcesCollection.countDocuments();

    if (existingDocs > 0 || existingSources > 0) {
      console.log(`⚠️  Database already contains ${existingDocs} documents and ${existingSources} sources. Skipping seeding.`);
      return;
    }

    console.log('📁 Seeding documents...');

    // Sample documents related to Ga Mawela
    const sampleDocuments: Document[] = [
      {
        title: 'Ga-Mawela Land Claim Documentation',
        description: 'Official government documentation of the Ga-Mawela land claim process and historical records from the Department of Land Affairs.',
        category: 'legal',
        fileUrl: 'https://www.dlapsa.gov.za/documents/ga-mawela-land-claim.pdf',
        fileName: 'ga-mawela-land-claim.pdf',
        fileSize: 2520000,
        fileType: 'application/pdf',
        uploadedBy: 'system',
        uploadedAt: new Date('2023-10-15'),
        isPublic: true,
        requiresAuthentication: false,
        tags: ['land claim', 'government', 'legal', 'historical'],
        downloadCount: 0,
        metadata: {
          author: 'Department of Land Affairs',
          date: new Date('2023-09-20'),
          source: 'https://www.dlapsa.gov.za',
          relevance: 'Primary legal documentation for land restitution claim'
        }
      },
      {
        title: 'Historical Records of Ga-Mawela Community',
        description: 'Comprehensive historical account of the Ga-Mawela community from colonial times to present, including settlement patterns and cultural practices.',
        category: 'historical',
        fileUrl: 'https://www.sahistory.org.za/documents/ga-mawela-history.pdf',
        fileName: 'ga-mawela-history.pdf',
        fileSize: 3150000,
        fileType: 'application/pdf',
        uploadedBy: 'system',
        uploadedAt: new Date('2023-11-05'),
        isPublic: true,
        requiresAuthentication: false,
        tags: ['history', 'community', 'cultural', 'settlement'],
        downloadCount: 0,
        metadata: {
          author: 'South African History Online',
          date: new Date('2022-03-10'),
          source: 'https://www.sahistory.org.za',
          relevance: 'Comprehensive historical context for the community'
        }
      },
      {
        title: 'SAHRA Heritage Certification',
        description: 'South African Heritage Resources Agency certification of Ga-Mawela cultural and archaeological significance, including site documentation.',
        category: 'archaeological',
        fileUrl: 'https://www.sahra.org.za/documents/ga-mawela-heritage-cert.pdf',
        fileName: 'ga-mawela-heritage-cert.pdf',
        fileSize: 1890000,
        fileType: 'application/pdf',
        uploadedBy: 'system',
        uploadedAt: new Date('2023-08-22'),
        isPublic: true,
        requiresAuthentication: false,
        tags: ['heritage', 'archaeology', 'cultural', 'SAHRA'],
        downloadCount: 0,
        metadata: {
          author: 'South African Heritage Resources Agency',
          date: new Date('2023-07-15'),
          source: 'https://www.sahra.org.za',
          relevance: 'Official heritage certification for preservation claims'
        }
      },
      {
        title: 'Mining Impact Assessment Report',
        description: 'Environmental and social impact assessment of mining activities on Ga-Mawela land, including community displacement analysis.',
        category: 'evidence',
        fileUrl: 'https://www.dmr.gov.za/documents/ga-mawela-mining-impact.pdf',
        fileName: 'ga-mawela-mining-impact.pdf',
        fileSize: 4200000,
        fileType: 'application/pdf',
        uploadedBy: 'system',
        uploadedAt: new Date('2024-01-10'),
        isPublic: true,
        requiresAuthentication: false,
        tags: ['mining', 'environmental', 'impact', 'displacement'],
        downloadCount: 0,
        metadata: {
          author: 'Department of Mineral Resources',
          date: new Date('2023-12-05'),
          source: 'https://www.dmr.gov.za',
          relevance: 'Evidence of mining impact on community lands'
        }
      },
      {
        title: 'Genealogical Records of Masetu Lineage',
        description: 'Family trees and genealogical records linking current Ga-Mawela residents to the original Masetu lineage and traditional leadership.',
        category: 'testimony',
        fileUrl: 'https://www.familysearch.org/documents/masetu-genealogy.pdf',
        fileName: 'masetu-genealogy.pdf',
        fileSize: 2800000,
        fileType: 'application/pdf',
        uploadedBy: 'system',
        uploadedAt: new Date('2023-09-30'),
        isPublic: true,
        requiresAuthentication: false,
        tags: ['genealogy', 'lineage', 'Masetu', 'family records'],
        downloadCount: 0,
        metadata: {
          author: 'FamilySearch International',
          date: new Date('2021-05-18'),
          source: 'https://www.familysearch.org',
          relevance: 'Proof of continuous lineage and community connection'
        }
      }
    ];

    // Insert documents
    const insertDocsResult = await documentsCollection.insertMany(sampleDocuments);
    console.log(`✅ Inserted ${insertDocsResult.insertedCount} documents`);

    console.log('🔗 Seeding sources...');

    // Sample sources related to Ga Mawela
    const sampleSources: Source[] = [
      {
        title: 'Department of Land Affairs - Land Claims',
        url: 'https://www.dlapsa.gov.za/land-claims',
        type: 'government_legal',
        description: 'Official government portal for land restitution claims and historical land records.',
        category: 'government',
        reliability: 'high',
        lastVerified: new Date('2024-05-15'),
        isActive: true
      },
      {
        title: 'South African History Online - Ga-Mawela',
        url: 'https://www.sahistory.org.za/ga-mawela',
        type: 'primary_historical',
        description: 'Comprehensive historical resources and archives about the Ga-Mawela community.',
        category: 'academic',
        reliability: 'high',
        lastVerified: new Date('2024-06-01'),
        isActive: true
      },
      {
        title: 'SAHRA Heritage Resources',
        url: 'https://www.sahra.org.za/heritage-resources',
        type: 'primary_historical',
        description: 'South African Heritage Resources Agency documentation and certification of cultural sites.',
        category: 'heritage',
        reliability: 'high',
        lastVerified: new Date('2024-04-20'),
        isActive: true
      },
      {
        title: 'Department of Mineral Resources - Mining Impact',
        url: 'https://www.dmr.gov.za/mining-impact',
        type: 'government_legal',
        description: 'Government reports and assessments on mining activities and their social/environmental impacts.',
        category: 'government',
        reliability: 'high',
        lastVerified: new Date('2024-05-25'),
        isActive: true
      },
      {
        title: 'FamilySearch Genealogical Records',
        url: 'https://www.familysearch.org/africa',
        type: 'additional_evidence',
        description: 'International genealogical database with records of South African families and lineages.',
        category: 'genealogy',
        reliability: 'medium',
        lastVerified: new Date('2024-03-10'),
        isActive: true
      },
      {
        title: 'Land and Accountability Research Centre',
        url: 'https://www.lrc.org.za',
        type: 'additional_evidence',
        description: 'NGO providing research and legal support for land rights and community claims.',
        category: 'NGO',
        reliability: 'medium',
        lastVerified: new Date('2024-06-10'),
        isActive: true
      },
      {
        title: 'Constitutional Court Land Rights Cases',
        url: 'https://www.concourt.org.za/land-rights',
        type: 'government_legal',
        description: 'Legal precedents and court rulings related to land restitution and indigenous rights.',
        category: 'legal',
        reliability: 'high',
        lastVerified: new Date('2024-07-01'),
        isActive: true
      }
    ];

    // Insert sources
    const insertSourcesResult = await sourcesCollection.insertMany(sampleSources);
    console.log(`✅ Inserted ${insertSourcesResult.insertedCount} sources`);

    console.log('🎉 Document seeding completed successfully!');
    console.log(`📊 Total: ${sampleDocuments.length} documents, ${sampleSources.length} sources`);

  } catch (error) {
    console.error('❌ Error during document seeding:', error);
    throw error;
  }
}

// Run the seeding process
seedDocuments()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });