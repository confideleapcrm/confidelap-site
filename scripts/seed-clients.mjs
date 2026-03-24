import { createClient } from 'next-sanity'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const client = createClient({
  projectId: 'zcprlk2a',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const clients = JSON.parse(
  readFileSync(join(__dirname, '../content/clients.json'), 'utf-8')
)

async function seed() {
  console.log(`Seeding ${clients.length} clients into Sanity...`)

  for (const c of clients) {
    const doc = {
      _type: 'client',
      _id: `client-${c.slug}`,
      name: c.name,
      slug: { _type: 'slug', current: c.slug },
      industry: c.industry,
      description: c.description,
      featured: false,
      order: clients.indexOf(c),
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ ${c.name}`)
  }

  console.log('\nDone! All clients seeded.')
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
