// src/pages/api/scrapeMedium.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';

// Define the structure of your CSV data
interface ArticleData {
  'web-scraper-order': string;
  'web-scraper-start-url': string;
  links: string;
  'links-href': string;
  'Article Name': string;
  Publisher: string;
  Content: string;
  pages: string;
  'pages-href': string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const csvPath = path.resolve('./public/data/mediumScraping.csv');
  try {
    const file = fs.readFileSync(csvPath, 'utf8');
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        res.status(200).json(result.data);
      },
      error: (error) => {
        console.error('Error parsing CSV data:', error);
        res.status(500).json({ error: 'Failed to parse CSV data' });
      }
    });
  } catch (error) {
    console.error('Error reading CSV file:', error);
    res.status(500).json({ error: 'Failed to read CSV file' });
  }
};
