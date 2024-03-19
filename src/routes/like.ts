import { PrismaClient } from '@prisma/client';
import express from "express";
import verifyToken from "../utils/auth";
const prisma = new PrismaClient()
const router = express.Router();

router.post("/:id",verifyToken,async(req,res)=>{
    let {id} = req.params;
    const userId= req.user.id;
    let like= await prisma.like.findFirst({
        where:{
            tweetId: parseInt(id),
            userid:userId
        }
    })
    if(like!=null){
        await prisma.like.delete({
            where:{
                id:like.id
            }
        })
        await prisma.tweet.update({
            where:{
                id: parseInt(id)
            },
            data:{
                likeCount:{
                    decrement:1
                }
            }
        })
        return res.send("tweet unliked");
    }
    let newlike = await prisma.like.create({
        data:{
            tweetId:parseInt(id),
            userid:userId
        }
    })
    await prisma.tweet.update({
        where:{
            id:Number(id)
        },
        data:{
            likeCount:{increment:1}
        }
    })
    res.send({newlike});
})

router.get("/:id", async(req,res)=>{
    const {id}= req.params
    let like= await prisma.like.findMany({
        where:{
            tweetId:Number(id)
        },
        select:{
            user:true
        }
    })
    res.send({like});
})

export default router;