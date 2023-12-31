import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

// Collections
import Users from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Accommodation } from './collections/Accomodation'

// Globals
import Header from './globals/Header'
import Hero from './globals/Hero'

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Lagalag'
    },
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users, Pages, Media, Accommodation],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  globals: [Header, Hero],
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: '*',
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    connectOptions: {
      dbName: process.env.ENVIRONMENT,
    },
    url: process.env.DATABASE_URI,
  }),
})
