import { Resolver, Query, Args, Arg } from 'type-graphql'
import { Verse } from '../models'

import { VerseArgs, SkipAndTakeArgs, BooksListArgs } from './args'
import { applyMultipleWhere } from '../util'

@Resolver()
export class Resolvers {
  @Query(type => [Verse])
  async verses(
    @Args() verseArgs: VerseArgs,
    @Args() { skip, take }: SkipAndTakeArgs
  ) {
    const query = Verse.createQueryBuilder()

    applyMultipleWhere(query, verseArgs)

    query.offset(skip)
    query.limit(take)

    return await query.getMany()
  }

  @Query(type => Verse, { nullable: true })
  async randomVerse(@Args() verseArgs: VerseArgs) {
    const query = Verse.createQueryBuilder().orderBy('RANDOM()').limit(1)

    applyMultipleWhere(query, verseArgs)

    return await query.getOne()
  }

  @Query(type => [String])
  async booksList(@Args() booksListArgs: BooksListArgs) {
    const query = Verse.createQueryBuilder().select('Verse.book').distinct(true)

    applyMultipleWhere(query, booksListArgs)

    const rawBooksList = await query.getRawMany()
    return rawBooksList.map(book => book['Verse_book'])
  }

  @Query(type => [String])
  async testamentsList(@Arg('language', { nullable: true }) language?: string) {
    const query = Verse.createQueryBuilder()
      .select('Verse.testament')
      .distinct(true)

    if (language !== undefined) {
      query.andWhere('Verse.language = :language', { language })
    }

    const rawTestamentsList = await query.getRawMany()
    return rawTestamentsList.map(testament => testament['Verse_testament'])
  }
}
