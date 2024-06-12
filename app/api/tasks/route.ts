import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@clerk/nextjs/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = auth();
  return res.status(200).json({ userId });
}

// export async function POST(req: Request) {
//   try {
//     const { userId } = auth();

//     if (!userId) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const { title, description, date, completed, important } = await req.json();

//     if (!title || !description || !date) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     if (title.length < 3) {
//       return NextResponse.json(
//         { error: 'Title must be at least 3 characters' },
//         { status: 400 }
//       );
//     }
//   } catch (error) {
//     console.log('ERROR CREATING TASK: ', error);
//     return NextResponse.json({ error: 'Error creating task' }, { status: 500 });
//   }
// }
