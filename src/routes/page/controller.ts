import { NextFunction, Request, Response, Router } from "express";
import { nextTick } from "process";
import { getRepository } from "typeorm";
import { Page } from "../../entity/Page";

const PageCrudRoute = Router();

const get = async (req: Request, res: Response) => {
    const repo = getRepository(Page)
    let query = await repo.find({relations:["post"]})
    res.json({data:query})
    
}
PageCrudRoute.get("/", get)

const insert = async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body);
    // let e = fromEmoji.get("🔥")
    // let ee = toEmoji.get(e)
    // res.json(ee)
    let fb = req.body
    let query = Object.keys(fb).map(each=>{
        return {id:fb[each].id,pageName:fb[each].name}
    })
    try{
        const repo = getRepository(Page)
        await repo.save(query)
        // res.json({msg:"done."})
        next()
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
PageCrudRoute.post("/", insert)

export default PageCrudRoute