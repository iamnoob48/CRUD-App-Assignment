import express from 'express'
import prisma from '../prismaClient.js';

const router = express.Router();

//To get user details
router.get('/', async (req,res)=>{
    try {
        const user = await prisma.user.findUnique({
            where : {
                id : req.userId
                
            }
        })
        res.json(user)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Something went wrong"})
        
    }
})





export default router