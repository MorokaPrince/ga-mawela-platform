import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { fetchAndStoreG20Feeds, G20Feed } from '@/lib/feeds';

const MONGODB_URI = process.env.MONGODB_URI!;

export async function GET(request: NextRequest) {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(MONGODB_URI);
    }

    // Fetch and store latest feeds (cache for 1 hour)
    await fetchAndStoreG20Feeds();

    const feeds = await G20Feed.find({}).sort({ pubDate: -1 }).limit(10);
    return NextResponse.json(feeds);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch feeds' }, { status: 500 });
  }
}