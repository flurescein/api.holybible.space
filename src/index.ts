import 'reflect-metadata'

import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { createConnection } from 'typeorm'
import { buildSchema } from 'type-graphql'
import helmet from 'helmet'
import cors from 'cors'

import { Resolvers } from './resolvers'

async function main() {
  await createConnection()

  const schema = await buildSchema({ resolvers: [Resolvers] })

  const apolloServer = new ApolloServer({ schema })
  const app = express()

  apolloServer.applyMiddleware({ app })

  app.use(helmet())
  app.use(cors())

  app.listen(4000, () =>
    console.log(
      `GraphQL server started on http://localhost:4000${apolloServer.graphqlPath}`
    )
  )
}

main()
