import type { NextApiRequest, NextApiResponse } from 'next';



const getWorkspaces = () => {
  if (typeof window !== 'undefined') {
    const workspaces = localStorage.getItem('workspaces');
    return workspaces ? JSON.parse(workspaces) : [];
  }
  return [];
};


const saveWorkspaces = (workspaces: string[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('workspaces', JSON.stringify(workspaces));
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let workspaces = getWorkspaces();

  if (req.method === 'POST') {
    const newWorkspace = req.body.workspace;
    if (typeof newWorkspace === 'string' && newWorkspace.trim() !== '') {
      workspaces.push(newWorkspace);
      saveWorkspaces(workspaces);
      res.status(200).json({ workspaces });
    } else {
      res.status(400).json({ error: 'Invalid workspace name' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
