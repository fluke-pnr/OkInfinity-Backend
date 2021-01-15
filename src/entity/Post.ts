import {Entity, Column, PrimaryColumn, CreateDateColumn,JoinTable,ManyToOne} from "typeorm";
import {Page} from "./Page"
@Entity({ name: "POST" })
export class Post {
    @PrimaryColumn()
    id: string;

    @Column({type:"longtext"})
    content: string;

    @Column()
    date: Date;

    @CreateDateColumn()
    create_date: Date

    @Column()
    likes: number;

    @Column()
    comments: number;

    @Column()
    shares: number

    @Column()
    reaction: number

    @ManyToOne(type =>Page, (p) => p.id)
    @JoinTable({name:"page"})
    page: Page
}