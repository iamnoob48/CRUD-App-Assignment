import express from 'express'
import prisma from '../prismaClient.js'
import {body, validationResult} from 'express-validator'

const router = express.Router();

const todoValidatation = [
    body('task').notEmpty().withMessage('Task name is required'),
    body('dueDate').notEmpty().withMessage('Due date is required')
]

//For get req
router.get('/',async (req,res)=>{
    const getTasks = await prisma.todo.findMany({
        where : {
            user_id : req.userId,
            isDeleted : false
        }
    })
    res.json(getTasks);
})
//For creating a todo
router.post('/', todoValidatation, async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){return res.status(404).json({ errors: errors.array().map(err => err.msg) })}
    const {task, description, priority, dueDate, category} = req.body
    //Send a error response if the task already exits
    const checkDuplicate = await prisma.todo.findFirst({
        where : {
            user_id : req.userId,
            task : task,
            completed : false,
            isDeleted : false
        
        }
    })
    if(checkDuplicate){return res.status(409).json({error : "This task already exists"})}

    //Then create new task
    const setTasks = await prisma.todo.create({
        data: {
            user_id : req.userId,
            task : task,
            description : description,
            priority : priority.toUpperCase(),
            dueDate : new Date(dueDate),
            category : category

        }
    })
    res.json(setTasks);
})

//For updating task which are completed
router.put('/:id', async (req,res)=>{

    const {id,completed} = req.body;
    await prisma.todo.update({
        where : {
            id : parseInt(id),
        },
        data: {
            completed : completed
        }


    })
    if (completed){
        await prisma.user.update({
            where : {
                id : req.userId,

            },
            data : {
                completedTask : {increment : 1}
    
            }
    
        })
    }
    res.json({message : "Task updated"});
    console.log("Yes it has updated")

})

router.put('/:id/undo', async (req,res)=>{
    const {id,completed} = req.body;
    await prisma.todo.update({
        where:{
            user_id : req.userId,
            id : parseInt(id)

        },
        data : {
            completed : completed
        }

    });
    const user = await prisma.user.findUnique({
        where : {
            id : req.userId
        },
        select : {
            completedTask : true
        }
    })
    if(user.completedTask > 0) {
        await prisma.user.update({
            where : {
                id : req.userId
            },
            data : {
                
                completedTask : {decrement : 1}
    
            }
    
        })

    }
    
    res.json({message:"Task undo"})
    console.log("This is undoed")


})

router.delete('/:id', async (req,res)=>{
    const {id, isDeleted} = req.body;
    await prisma.todo.update({
        where : {
            user_id : req.userId,
            id : parseInt(id)
        },
        data : {
           isDeleted
        }
    })
    res.json({message : "Task deleted"})
})



export default router;