import express from 'express'
import prisma from '../prismaClient.js';

const router = express.Router();

//Get req
router.get('/', async (req,res)=>{
    
    const creds = await prisma.user.findUnique({
        where : {
            id : req.userId
        },
        select : {
            completedTask : true,
            streak : true



        }
    })
    res.json(creds);
})

export default router;