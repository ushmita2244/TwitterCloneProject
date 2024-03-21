import { PrismaClient } from '@prisma/client';
import express from "express";
// import verifyToken from "../middleware/verifyToken";
const prisma = new PrismaClient()
const router=express.Router();


router.post("/",async(req,res)=>{
    const {firstName, lastName, email, password}= req.body;
    let response = await prisma.user.create({
        data: {
        firstName, lastName, email, password
        }
      })
      console.log(response);
      res.send({response})
})

router.get("/",async (req,res)=>{
  const allUser = await prisma.user.findMany();
  res.json(allUser);
})
router.get("/:id",async(req,res)=>{
  const userId=parseInt(req.params.id);
  const user = await prisma.user.findUnique({
      where:{
          id:userId
      }
  })
  if(!user){
      return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
})
router.delete("/:id",async (req,res)=>{
  const userId = parseInt(req.params.id);
  const deleteUser = await prisma.user.delete({
      where:{
          id:userId,
      }
  })
  res.redirect("/user/");
})
router.put("/:id",(req,res)=>{
  const userId = parseInt(req.params.id);
  // const (firstName,LastName,email,password)=req.body

})

router.get("/tweets",async(req,res)=>{
  try{
    const tweets=await prisma.tweet.findMany({
      include:{
        user:true
      }
    });
    res.json(tweets);
  }
  catch(error){
    res.status(500).json({error:"error occured"});
  }
})

router.get("/tweets/:tweetId", async(req,res)=>{
  try{
    const {tweetId} =req.params;
    const tweet= await prisma.tweet.findUnique({
      where:{
        id: parseInt(tweetId)
      },
      include:{
        user:true
      }
    });
    if(!tweet){
      return res.status(404).json({error:"tweet not found"});
    }
    res.json(tweet);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error:"error occured"});
  }
})

router.get("/profile/:userId", async(req,res)=>{
  try{
    const {userId} =req.params;

    const user= await prisma.user.findUnique({
      where:{
        id: parseInt(userId)
      }
    });
    if(!user){
      return res.status(404).json({error:"user not found"});
    }

    const tweets= await prisma.tweet.findMany({
      where:{
        userId: parseInt(userId)
      },
      include:{
        user: true
      }
    });

    const userProfile ={
      user,
      tweets
    };
    res.json(userProfile);
  }
  catch(error){
    console.error(error);
    res.status(500).json({error:"error occured"});
  }
})


export default router;
