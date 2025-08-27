import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { generateSecureRandomString } from '../utils/RoomUtils';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { goal, alternatives, criteria } = req.body;
      const ROOM_CHARACTER_LIMIT = 6;
      
      // Generate a unique room code
      const roomCode = generateSecureRandomString(ROOM_CHARACTER_LIMIT);
      
      // Create the decision room
      const decisionRoom = await prisma.decisionRoom.create({
        data: {
          room_code: roomCode,
          ahp_goal: goal,
          ahp_do_cost_benefit_analysis: false, // Set your default value
          require_respondent_names: false, // Set your default value
          is_active: true,
          // Create related criteria
          criteria: {
            create: criteria.map((name: string, index: number) => ({
              name,
              order: index,
            })),
          },
          // Create related alternatives
          alternatives: {
            create: alternatives.map((name: string) => ({
              name,
            })),
          },
          // Create a placeholder aggregated summary (you might want to update this later)
          ahp_aggregated_summary: {
            create: {
              room_code: roomCode,
              ahp_aggregated_pairwise_matrix: "{}",
              ahp_aggregated_final_scoring_matrix: {},
              ahp_aggregated_pairwise_criterion_variance: {},
              ahp_aggregated_eigenvector_set: {},
              total_respondents: 0,
            },
          },
        },
        include: {
          criteria: true,
          alternatives: true,
          ahp_aggregated_summary: true,
        },
      });
      
      res.status(200).json(decisionRoom);
    } catch (error) {
      console.error('Error creating decision room:', error);
      res.status(500).json({ error: 'Failed to create decision room' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}