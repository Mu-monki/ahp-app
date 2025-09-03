"use server"
import { prisma } from "@/lib/prisma"
import { generateSecureRandomString } from "@/app/utils/RoomUtils"
import { CriterionInterface } from "@/types/types"
// import { PrismaClient } from "@prisma/client"
// import { PrismaClient } from "@/generated/prisma";

// const prisma = new PrismaClient();

export async function processAHPForm() {
    console.log('PROCESSING AHP FORM')
    
}

export async function createAHPRoom() {
    console.log('CREATING AHP ROOM:')
    const ROOM_CODE_CHAR_LIMIT = 7
    try {
        const res = await prisma.decisionRoom.create({
            data: {
                room_code: generateSecureRandomString(ROOM_CODE_CHAR_LIMIT),
                ahp_goal: 'asf',
                ahp_do_cost_benefit_analysis: false,
                require_respondent_names: false,
                is_active: true,
                ahp_aggregated_summary_id: 'TEST',
            }
        })
        console.log('RESULT: ', res)
    } catch(e) {
        console.log('Error: ', e)
        throw e;
    }
    // await prisma.createAHPRoom({
    //     data: {
    //         room_code: 'TEST R',
    //         ahp_goal: 'asf',
    //         ahp_do_cost_benefit_analysis: false,
    //         require_respondent_names: false,
    //         is_active: true,
    //     }
    // })
}

export async function createMultiCriteria(data: CriterionInterface[]) {
    console.log('CREATING CRITERIA SET:')
    await prisma.criterion.createManyAndReturn({
        data: {
            room_id: 'TEST C',
            name: 'asdfghj',
            desc: 'asdfghjhjk',
            order: 1
        }
    })
    // await prisma.createCriterion({
    //     data: {
    //         room_id: 'TEST C',
    //         name: 'asdfghj',
    //         desc: 'asdfghjhjk',
    //         order: 1
    //     }
    // })
}

export async function createAlternative() {
    await prisma.alternative.create({
        data: {
            room_id: 'aesrtnmj',
            name: 'fergth',
            desc: 'efrgtgn',
        }
    })
    // await prisma.createAlternative({
    //     data: {
    //         room_id: 'aesrtnmj',
    //         name: 'fergth',
    //         desc: 'efrgtgn',
    //     }
    // })
}