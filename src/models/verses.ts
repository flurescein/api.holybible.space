import { ObjectType, Field, ID } from 'type-graphql'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('verses')
@ObjectType()
export class Verse extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(type => String)
  @Column()
  testament: string

  @Field(type => String)
  @Column()
  book: string

  @Field(type => Number)
  @Column()
  chapter: number

  @Field(type => Number)
  @Column()
  verse: number

  @Field(type => String)
  @Column()
  text: string

  @Field(type => String)
  @Column()
  language: string
}
