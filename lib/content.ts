import siteData from '../content/site.json';
import servicesData from '../content/services.json';
import { sanityClient } from './sanity';

// ─── Types ───────────────────────────────────────────────────────────────────

export type SiteData = typeof siteData;
export type NavItem = SiteData['nav'][number];

export interface ClientDocument {
  title: string;
  type: string;
  fileUrl: string;
  date?: string;
  description?: string;
}

export interface Client {
  name: string;
  slug: string;
  description: string;
  industry: string;
  logo?: { asset: { _ref: string }; alt?: string };
  website?: string;
  featured?: boolean;
  services?: string[];
  testimonial?: { quote: string; personName: string; personRole: string };
  order?: number;
  documents?: ClientDocument[];
}

export interface Post {
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  categoryColor: string;
  categoryRgb: string;
  date: string;
  excerpt: string;
  featured: boolean;
  coverImage?: { asset: { _ref: string }; alt?: string };
  author?: string;
  tags?: string[];
  body?: unknown[];
}

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  features: ServiceFeature[];
  highlights: ServiceFeature[];
  process?: Array<{ step: string; title: string; description: string }>;
}

// ─── Site ─────────────────────────────────────────────────────────────────────

export async function getSiteData(): Promise<SiteData> {
  // Future: return await fetch('/api/site').then(r => r.json())
  return siteData;
}

// ─── Services ─────────────────────────────────────────────────────────────────

export async function getAllServices(): Promise<Service[]> {
  return servicesData as Service[];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const services = await getAllServices();
  return services.find((s) => s.slug === slug) ?? null;
}

// ─── Posts (Sanity) ───────────────────────────────────────────────────────────

const allPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    excerpt,
    "date": publishedAt,
    featured,
    "category": category->slug.current,
    "categoryLabel": category->title,
    "categoryColor": category->color,
    "categoryRgb": category->rgb,
    coverImage,
    "author": author->name,
    tags
  }
`

const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    excerpt,
    "date": publishedAt,
    featured,
    "category": category->slug.current,
    "categoryLabel": category->title,
    "categoryColor": category->color,
    "categoryRgb": category->rgb,
    coverImage,
    "author": author->{ name, photo, role },
    tags,
    body,
    seo
  }
`

export async function getAllPosts(): Promise<Post[]> {
  return sanityClient.fetch(allPostsQuery, {}, { next: { revalidate: 60 } });
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.featured);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityClient.fetch(postBySlugQuery, { slug }, { next: { revalidate: 60 } });
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.category === category);
}

// ─── Clients (Sanity) ─────────────────────────────────────────────────────────

const clientFields = `
  name,
  "slug": slug.current,
  industry,
  description,
  logo,
  website,
  featured,
  services,
  testimonial,
  order,
  documents[] {
    title,
    type,
    "fileUrl": file.asset->url,
    date,
    description
  }
`

const allClientsQuery = `*[_type == "client"] | order(order asc, name asc) { ${clientFields} }`

const clientBySlugQuery = `*[_type == "client" && slug.current == $slug][0] { ${clientFields} }`

export async function getAllClients(): Promise<Client[]> {
  return sanityClient.fetch(allClientsQuery, {}, { next: { revalidate: 60 } });
}

export async function getClientBySlug(slug: string): Promise<Client | null> {
  return sanityClient.fetch(clientBySlugQuery, { slug }, { next: { revalidate: 60 } });
}

export async function getClientsByIndustry(industry: string): Promise<Client[]> {
  const clients = await getAllClients();
  return clients.filter((c) => c.industry === industry);
}
