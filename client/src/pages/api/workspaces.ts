import type { NextApiRequest, NextApiResponse } from 'next';

const workspaces: string[] = [
  'Workspace 1',
  'Workspace 2',
  'Workspace 3',
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const newWorkspace = req.body.workspace;
    if (typeof newWorkspace === 'string' && newWorkspace.trim() !== '') {
      workspaces.push(newWorkspace);
      res.status(200).json({ workspaces });
    } else {
      res.status(400).json({ error: 'Invalid workspace name' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
