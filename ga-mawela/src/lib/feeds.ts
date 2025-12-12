import mongoose, { Schema, Document } from 'mongoose';
import Parser from 'rss-parser';
import ogs from 'open-graph-scraper';

export interface IG20Feed extends Document {
  title: string;
  link: string;
  description: string;
  pubDate: Date;
  ogImage?: string;
  ogDescription?: string;
  tags: string[];
  fetchedAt: Date;
}

const G20FeedSchema = new Schema<IG20Feed>({
  title: { type: String, required: true },
  link: { type: String, required: true, unique: true },
  description: { type: String },
  pubDate: { type: Date, required: true },
  ogImage: { type: String },
  ogDescription: { type: String },
  tags: [{ type: String }],
  fetchedAt: { type: Date, default: Date.now },
});

export const G20Feed = mongoose.models.G20Feed || mongoose.model<IG20Feed>('G20Feed', G20FeedSchema);

export async function fetchAndStoreG20Feeds() {
  const parser = new Parser();
  const rssUrls = [
    'https://g20.mg.co.za/feed/', // Mail & Guardian G20
    'https://innovationbridge.info/ibportal/feed/' // Innovation Bridge (if RSS exists, fallback to scraping)
  ];
  for (const rssUrl of rssUrls) {
    try {
      const feed = await parser.parseURL(rssUrl);
      for (const item of feed.items) {
        const existing = await G20Feed.findOne({ link: item.link });
        if (!existing) {
          let ogData;
          try {
            const { result } = await ogs({ url: item.link! });
            ogData = { ogImage: result.ogImage?.[0]?.url, ogDescription: result.ogDescription };
          } catch {
            console.log('OG scrape failed for', item.link);
          }
          await G20Feed.create({
            title: item.title,
            link: item.link,
            description: item.contentSnippet,
            pubDate: new Date(item.pubDate!),
            ...ogData,
            tags: ['G20', 'South Africa', 'Limpopo', 'Innovation Bridge'], // Add custom tags
          });
        }
      }
    } catch (error) {
      console.error('Error fetching feeds from', rssUrl, error);
    }
  }
}