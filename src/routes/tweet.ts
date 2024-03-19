import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from "express";
import verifyToken from "../utils/auth";
const prisma = new PrismaClient()
const router = express.Router();
router.post("/", verifyToken, async (req:Request, res:Response) => {
    const { title, content } = req.body;
    const userId = req.user.id;
    let result = await prisma.tweet.create({
        data: {
            title,
            content,
            userId,
        }
    })
    console.log(result);
    res.send({ result: result });
})

router.delete("/tweets/:tweetId", verifyToken, async(req,res)=>{
    try{
      const {tweetId} =req.params;
  
      const tweet= await prisma.tweet.findUnique({
        where:{
          id: parseInt(tweetId)
        }
      });
      if(!tweet){
        return res.status(404).json({error:"tweet not found"});
      }
  
      await prisma.tweet.delete({
        where:{
          id: parseInt(tweetId)
        }
      });
  
      res.json({message:"tweet deleted successfully"});
    }
    catch(error){
      console.error(error);
      res.status(500).json({error:"error occured"});
    }
  })

  router.put("/tweets/:tweetId", async(req,res)=>{
    try{
      const {tweetId} =req.params;
      const {content}= req.body;
  
      const updatedTweet= await prisma.tweet.update({
        where:{
          id: parseInt(tweetId)
        },
        data:{
          content
        }
      });
      res.json(updatedTweet);
    }
    catch(error){
      console.error(error);
      res.status(500).json({error:"error occured"});
    }
  })
  
export default router;