import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public lang: string;
    @Column()
    public country: string;
    @Column()
    public category: string;

    @Column({ type: 'timestamp' })
    public articleDate: Date;

    @Column()
    public title: string;

    @Column()
    public heroURL: string;

    @Column({nullable: true})
    public content: string;

    @Column({nullable: true})
    public richcontent: string;

    @Column()
    public source: string;

    @Column()
    public author: string;

    @Column()
    public sourceURL: string;

    @Column({ type: 'boolean', default: false })
    public isDeleted: boolean;

    /*
     * Create and Update Date Columns
     */

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;
}