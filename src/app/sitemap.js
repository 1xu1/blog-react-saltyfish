import { getBlogList } from "@/db/sql";

export default async function sitemap() {
  const staticRoutes = [
    {
      url: `https://saltyfish542.top`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `https://saltyfish542.top/blog`,
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  ]
  const posts = await getBlogList(99)
  const postRoutes = posts.map((post) => ({
    url: `https://saltyfish542.top/blog/${post.id}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...postRoutes]
}