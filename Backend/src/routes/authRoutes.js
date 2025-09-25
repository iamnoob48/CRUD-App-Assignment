import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js';
import {body, validationResult} from 'express-validator'

const router = express.Router();

const registerValidation = [
    body("email").isEmail().withMessage("Enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")

]

//For registering the user
router.post('/register',registerValidation, async (req,res)=>{
     //We will check for validation if its matching the criteria
     const errors = validationResult(req);

     //If there are any errors then we can send errors to the frontend or we can debug ourselves
     if(!errors.isEmpty()){ return res.status(404).json({errors : errors.array().map(err.msg)})}



    const {email,password} = req.body;
   

    //hash this password
    const hashedPass = bcrypt.hashSync(password,8);

    try{
        //Insert these valuse inside the database
        const user = await prisma.user.create({
            data : {
                email,
                password : hashedPass
            }
        })
    //Generate jwt token
    const token = jwt.sign({id : user.id}, process.env.JWT_KEY, {expiresIn: "24h"});
    res.json({token})

    }catch(err){
        console.log(err.message);
        res.status(401).json(err.message);
    }


})

//For login route
router.post('/login', async (req,res)=>{
    const {email , password} = req.body;
    //We need to check if the user name is present in the data base or not
    const user = await prisma.user.findUnique({
        where : {
            email : email
        }
    })
    //If user is not there return response
    if(!user){return res.status(401).json({message : "This user does not exist"})}
    //check with the hashed pass
    const checkPass = bcrypt.compareSync(password,user.password);
    if(!checkPass){return res.status(401).json({message: "Password is incorrect"})}
    const token = jwt.sign({id : user.id}, process.env.JWT_KEY, {expiresIn : '24h'});
    res.json({token})
})



export default router;