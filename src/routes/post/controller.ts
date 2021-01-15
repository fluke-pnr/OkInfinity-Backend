import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import { Post } from "../../entity/Post";
const toEmoji = require("emoji-name-map");
const fromEmoji = require("emoji-unicode-map");

const PostCrudRoute = Router();

const get = (req: Request, res: Response) => {
    res.json({message: "hi"})
    
}
PostCrudRoute.get("/", get)

const insert = async (req: Request, res: Response) => {
    // console.log(req.body);
    // let e = fromEmoji.get("🔥")
    // let ee = toEmoji.get(e)
    // res.json(ee)
    let fb = req.body
    let query = []
    for(const each of Object.keys(fb)){
        fb[each].posts.forEach(item=>{
            query.push({
                id:item.id,
                content:item.message ? item.message.replace(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g, "") : "",
                date:item.created_time,
                likes:item.likes.summary.total_count,
                comments:item.comments.summary.total_count,
                reaction:item.reactions.summary.total_count,
                shares:item.shares ? item.shares.count : 0,
                page:{id:fb[each].id}
            })})}
    try{
        const repo = getRepository(Post)
        await repo.save(query)
        res.json({msg:"done."})
    }catch(error){
        res.json({msg:error})
    }



    // let data = req.body['546671448731035']
    // let query = data.posts.map(item=>{
    //     return {
    //         id:item.id,
    //         content:item.message ? item.message : "",
    //         date:item.created_time,
    //         likes:item.likes.summary.total_count,
    //         comments:item.comments.summary.total_count,
    //         reaction:item.reactions.summary.total_count,
    //         shares:item.shares ? item.shares.count : 0
    //     }})
    // let data = Object.keys(fb).map(each => {
    //     return fb[each];
    // });
    // res.json({data:query});
    // try{
    //     const repo = getRepository(Post)
    //     await repo.save(query)
    //     res.json({msg:"done."})
    // }catch(error){
    //     res.json({msg:error})
    // }
    
}
PostCrudRoute.post("/", insert)

export default PostCrudRoute