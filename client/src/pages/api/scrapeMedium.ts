import { NextApiRequest, NextApiResponse } from 'next';
import * as admin from 'firebase-admin';
import { parse } from 'csv-parse/sync';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://quicknotez.firebaseio.com', // Ensure this is correct
  });
}

const db = admin.firestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Your CSV data as a string (or you can read from a file or other source)
      const csvData = `
        web-scraper-order,web-scraper-start-url,links,links-href,Article Name,Article Content ,Article Publisher ,Pages,Pages-href
        "1724254635-1","https://medium.com/tag/technology","An AI Company Offered $73 to Scan My EyesCan you put a price on the unique biometric data in your iris?","https://medium.com/the-generator/an-ai-company-offered-73-to-scan-my-eyes-130d9c0473d4?source=topic_portal_recommended_stories---------7-107----------cryptocurrency----------ea2124fc_3886_4932_99be_f5798a0c458b-------","An AI Company Offered $73 to Scan My Eyes","","","Cryptocurrency","https://medium.com/tag/cryptocurrency?source=topic_portal--------------------cryptocurrency-----------------"
        "1724254642-2","https://medium.com/tag/technology","Binance To List DOGS Coin—What’s The Next Big Airdrop?DOGS Coin expected price, and my secret strategy to double your airdrop.","https://medium.com/@Jamilcryptonotes/binance-to-list-dogs-coin-whats-the-next-big-airdrop-c5d5ea7ecd28?source=topic_portal_recommended_stories---------6-84----------cryptocurrency----------ea2124fc_3886_4932_99be_f5798a0c458b-------","Binance To List DOGS Coin—What’s The Next Big Airdrop?","","","Cryptocurrency","https://medium.com/tag/cryptocurrency?source=topic_portal--------------------cryptocurrency-----------------"
        "1724254649-3","https://medium.com/tag/technology","The Bitcoin End Game is Here","https://medium.com/coinmonks/the-bitcoin-end-game-is-here-79909321322f?source=topic_portal_recommended_stories---------5-85----------cryptocurrency----------ea2124fc_3886_4932_99be_f5798a0c458b-------","The Bitcoin End Game is Here","","","Cryptocurrency","https://medium.com/tag/cryptocurrency?source=topic_portal--------------------cryptocurrency-----------------"
        "1724254657-4","https://medium.com/tag/technology","Bankman-Fried will have plenty of time to consider his crimesSam Bankman-Fried, founder and CEO of FTX, has been handed down a 25-year prison sentence for what has been considered one of the biggest…","https://medium.com/enrique-dans/bankman-fried-will-have-plenty-of-time-to-consider-his-crimes-53fb4d047e3d?source=topic_portal_recommended_stories---------4-107----------cryptocurrency----------ea2124fc_3886_4932_99be_f5798a0c458b-------","Bankman-Fried will have plenty of time to consider his crimes","","","Cryptocurrency","https://medium.com/tag/cryptocurrency?source=topic_portal--------------------cryptocurrency-----------------"
        "1724254664-5","https://medium.com/tag/technology","Unveiling the “Crescendo” Hard-Fork roadmap — 10BPS and moreThis post was written with the help of coderofstuff, Shai Wyborski and others","https://medium.com/@michaelsuttonil/unveiling-the-crescendo-hard-fork-roadmap-10bps-and-more-6072329e177f?source=topic_portal_recommended_stories---------3-84----------cryptocurrency----------ea2124fc_3886_4932_99be_f5798a0c458b-------","Unveiling the “Crescendo” Hard-Fork roadmap — 10BPS and more","","","Cryptocurrency","https://medium.com/tag/cryptocurrency?source=topic_portal--------------------cryptocurrency-----------------"
        "1724254671-6","https://medium.com/tag/technology","All current codes in TapSwap and an update is outNow we have a city and a lot of different buildings that we have to pump 🤔","https://medium.com/@romankinas52/all-current-codes-in-tapswap-and-an-update-is-out-97ce0a135d56?source=topic_portal_recommended_stories---------2-85----------cryptocurrency----------ea2124fc_3886_4932_99be_f5798a0c458b-------","All current codes in TapSwap and an update is out","","","Cryptocurrency","https://medium.com/tag/cryptocurrency?source=topic_portal--------------------cryptocurrency-----------------"
        "1724254679-7","https://medium.com/tag/technology","How to tokenize real-world assets (RWAs) | With ExamplesWe take a developer's perspective on how to tokenize RWAs, what the challenges are, where we currently stand, and the future of building…","https://medium.com/cyfrin/how-to-tokenize-real-world-assets-rwas-with-examples-41635a4f9645?source=topic_portal_recommended_stories---------1-107----------cryptocurrency----------ea2124fc_3886_4932_99be_f5798a0c458b-------","How to tokenize real-world assets (RWAs) | With Examples","","","Cryptocurrency","https://medium.com/tag/cryptocurrency?source=topic_portal--------------------cryptocurrency-----------------"
        "1724254686-8","https://medium.com/tag/technology","Gamic Roadmap: UpdatedExciting update, GNG$tars! 🍊","https://medium.com/@gamicHQ/gamic-roadmap-updated-daa622ff94c4?source=topic_portal_recommended_stories---------0-84----------cryptocurrency----------ea2124fc_3886_4932_99be_f5798a0c458b-------","Gamic Roadmap: Updated","","","Cryptocurrency","https://medium.com/tag/cryptocurrency?source=topic_portal--------------------cryptocurrency-----------------"
        "1724254701-9","https://medium.com/tag/technology","Towards Mamba State Space Models  for Images, Videos and Time SeriesPart 1","https://medium.com/towards-data-science/towards-mamba-state-space-models-for-images-videos-and-time-series-1e0bfdb5933a?source=topic_portal_recommended_stories---------7-107----------deep_learning----------30207f41_b18d_4e53_9dcd_ee7dd39e17c4-------","Towards Mamba State Space Models for Images, Videos and Time Series","","","Deep Learning","https://medium.com/tag/deep_learning?source=topic_portal--------------------deep_learning-----------------"
        "1724254709-10","https://medium.com/tag/technology","Graph RAG: The Promising Yet Nascent Future of Language Model AugmentationCompanies will need AI assistant that can truly understand the intricate web of relationships in your data.","https://medium.com/@alcarazanthony1/graph-rag-the-promising-yet-nascent-future-of-language-model-augmentation-419ef7e0002f?source=topic_portal_recommended_stories---------6-84----------deep_learning----------30207f41_b18d_4e53_9dcd_ee7dd39e17c4-------","Graph RAG: The Promising Yet Nascent Future of Language Model Augmentation","","","Deep Learning","https://medium.com/tag/deep_learning?source=topic_portal--------------------deep_learning-----------------"
        "1724254716-11","https://medium.com/tag/technology","A Fresh Look at Nonlinearity in Deep LearningThe traditional reasoning behind why we need nonlinear activation functions is only one dimension of this story.","https://medium.com/towards-data-science/a-fresh-look-at-nonlinearity-in-deep-learning-a79b6955d2ad?source=topic_portal_recommended_stories---------5-85----------deep_learning----------30207f41_b18d_4e53_9dcd_ee7dd39e17c4-------","A Fresh Look at Nonlinearity in Deep Learning","","","Deep Learning","https://medium.com/tag/deep_learning?source=topic_portal--------------------deep_learning-----------------"
      `;

      
      const records = parse(csvData, {
        columns: true,
        skip_empty_lines: true,
        delimiter: ',',
      });

      console.log('Parsed Records:', records);
  
      for (const record of records) {
        console.log('Record:', record);
    
        const docRef = db.collection('your-collection').doc(record['web-scraper-order']);
        await docRef.set(record, { merge: true });
        console.log(`Document with ID ${record['web-scraper-order']} added/updated successfully.`);
      }
    
      res.status(200).json({ message: 'CSV data processed and saved successfully' });
    } catch (error) {
      console.error('Error processing CSV data:', error);
      res.status(500).json({ error: 'Failed to process CSV data' });
    }}
}
