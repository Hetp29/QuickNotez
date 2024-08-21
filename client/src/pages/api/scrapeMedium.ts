import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { db, collection, doc, writeBatch } from '../../../firebaseConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    try {
      const filePath = path.resolve('./public/data/mediumScraping.csv');
      const results: any[] = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async() => {
          const batch = writeBatch(db);

          results.forEach((row) => {
            const orderId = row['web-scraper-order'];

            // Ensure orderId is valid
            if (orderId) {
              const docRef = doc(collection(db, 'articles_firebase'), orderId);

              // Create a clean document object to store in Firebase
              const documentData = {
                articleContent: row['Article Content'] || "",
                articleName: row['Article Name'] || "",
                articlePublisher: row['Article Publisher'] || "",
                pages: row['Pages'] || "",
                pagesHref: row['Pages-href'] || "",
                links: row['links'] || "",
                linksHref: row['links-href'] || "",
                webScraperOrder: row['web-scraper-order'] || "",
                webScraperStartUrl: row['web-scraper-start-url'] || ""
              };

              batch.set(docRef, documentData);
            }
          });

          try {
            await batch.commit();
            res.status(200).json({ message: "Data successfully written to Firebase!" });
          } catch (error) {
            res.status(500).json({ error: "Failed to write data to Firebase!" });
          }

        })
        .on('error', (error) => {
          res.status(500).json({ error: 'Failed to read CSV file' });
        });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
