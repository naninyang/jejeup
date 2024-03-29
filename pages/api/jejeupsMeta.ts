import { VercelRequest, VercelResponse } from '@vercel/node';
import metascraper from 'metascraper';
import metascraperAuthor from 'metascraper-author';
import metascraperDate from 'metascraper-date';
import metascraperDescription from 'metascraper-description';
import metascraperImage from 'metascraper-image';
import metascraperTitle from 'metascraper-title';
import metascraperUrl from 'metascraper-url';
import metascraperYoutube from 'metascraper-youtube';

const scraper = metascraper([
  metascraperAuthor(),
  metascraperDate(),
  metascraperDescription(),
  metascraperImage(),
  metascraperTitle(),
  metascraperUrl(),
  metascraperYoutube(),
]);

async function fetchMetaData(url: string) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const metadata = await scraper({ html, url });
    return metadata;
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url } = req.query;
  try {
    const metaData = await fetchMetaData(url as string);
    if (metaData) {
      const filteredData = {
        ownerName: metaData.author,
        datePublished: metaData.date,
        ogDescription: metaData.description,
        ogImage: metaData.image,
        ogTitle: metaData.title,
        ogUrl: metaData.url,
      };
      return res.status(200).json(filteredData);
    } else {
      return res.status(404).json({ error: 'Metadata not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
}
