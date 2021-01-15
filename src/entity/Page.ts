import {Entity, Column, PrimaryColumn, CreateDateColumn, JoinTable, OneToMany} from "typeorm";
import { Post } from "../entity/Post";
@Entity({ name: "PAGE" })
export class Page {

    @PrimaryColumn()
    id: string;

    @Column()
    pageName: string;

    @CreateDateColumn()
    create_date: Date;

    @OneToMany(type =>Post, (p) => p.page)
    @JoinTable({name:"post"})
    post: Post

}