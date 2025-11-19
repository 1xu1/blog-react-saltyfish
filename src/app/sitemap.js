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
  
  try {
    const posts = await getBlogList(99)
    const postRoutes = posts.map((post) => ({
      url: `https://saltyfish542.top/blog/${post.id}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))
    
    return [...staticRoutes, ...postRoutes]
  } catch (error) {
    // 如果无法连接数据库，只返回静态路由
    console.warn('无法连接数据库，sitemap只包含静态路由:', error)
    return staticRoutes
  }
}