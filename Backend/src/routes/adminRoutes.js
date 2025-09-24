import express from 'express'
import prisma from '../prismaClient.js';
import bcrypt from 'bcrypt'
import {body, validationResult} from 'express-validator'

const router = express.Router();
//For validating the user credentials the admin creates
const createUserValidation = [

        body("email").isEmail().withMessage("Enter a valid email address"),
        body("password")
          .isLength({ min: 6 })
          .withMessage("Password must be at least 6 characters")
    
    


]

//get all the users data 
router.get('/', async(req,res)=>{
    try {
        const users = await prisma.user.findMany({
        })
        res.json(users);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Wrong"})
        
    }
})

//Creating or Adding a new user by admin

router.post('/',createUserValidation, async(req,res)=>{

    const {email, password, role} = req.body;
    const hashedPass = bcrypt.hashSync(password, 8);
    const errors = validationResult(req);
    if(!errors.isEmpty()){ return res.status(404).json({errors : errors.array().map(err => err.msg)})}


    try {
        await prisma.user.create({
            data : {
                email,
                password : hashedPass,
                role : role
            }
        })

        res.json({message : `User created`})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Wrong"})

        
    }
})

//For making that user an admin
router.put('/:id', async (req,res)=>{
    const {id} = req.params;
    const {role} = req.body;
    if (!["ADMIN", "USER"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
    try {
        const updatedUser = await prisma.user.update({
            where : {
                id : parseInt(id)
            },
            data: {
                role : role
            }
        })
       
        res.json({message : `User has been changed to ${updatedUser.role}`}); 

        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Wrong"})
    }
})

//Remove any user by the admin
router.delete('/:id', async (req,res)=>{
    const {id} = req.params
    
    try {
        await prisma.user.delete({
            where : {
                id : parseInt(id)
            }

        })
        
        res.json({message : "User has been deleted"}); 

        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Wrong"})

        
    }
    
})






export default router