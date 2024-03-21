import express from "express";

import cookieParser from "cookie-parser";
import likeRoute from "./routes/like";
import loginRoute from "./routes/login";
import tweetRoute from "./routes/tweet";
import userRoute from "./routes/user";
const app=express();
const PORT=4000;


app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.set("view engine","hbs");

app.get("/",(req,res)=>{
   res.send("twitter clone");
})

app.use("/user", userRoute);
app.use("/login", loginRoute);
app.use("/tweet",tweetRoute);
app.use("/likes",likeRoute);

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})