import { ArgsType, Field, Int } from 'type-graphql'
import { Min, Max } from 'class-validator'

@ArgsType()
export class VerseArgs {
  @Field({ nullable: true })
  testament?: string

  @Field({ nullable: true })
  book?: string

  @Field({ nullable: true })
  chapter?: number

  @Field({ nullable: true })
  verse?: number

  @Field({ nullable: true })
  text?: string

  @Field({ nullable: true })
  language?: string
}

@ArgsType()
export class SkipAndTakeArgs {
  @Field(type => Int, { defaultValue: 0 })
  @Min(0)
  skip: number

  @Field(type => Int, { defaultValue: 200 })
  @Min(1)
  @Max(200)
  take: number
}

@ArgsType()
export class BooksListArgs {
  @Field({ nullable: true })
  testament?: string

  @Field({ nullable: true })
  language?: string
}
