import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { workspace } = req.body;

    if (typeof workspace === 'string' && workspace.trim() !== '') {
      const workspaceDir = path.join(process.cwd(), 'dashboard', workspace);

      try {
        // Create the workspace directory
        await fs.mkdir(workspaceDir, { recursive: true });

        // Create a sample file in the workspace
        const sampleFilePath = path.join(workspaceDir, 'notes.txt');
        await fs.writeFile(sampleFilePath, 'Your notes go here...', 'utf8');

        res.status(200).json({ message: 'Workspace folder and file created successfully' });
      } catch (error) {
        console.error('Error creating workspace folder and file:', error);
        res.status(500).json({ error: 'Error creating workspace folder and file' });
      }
    } else {
      res.status(400).json({ error: 'Invalid workspace name' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
