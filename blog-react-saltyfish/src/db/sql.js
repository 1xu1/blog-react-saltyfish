import { db } from '@/db/index.js'
import { m_user, m_blog } from '@/db/schema.js'
import { eq, and } from "drizzle-orm";

export async function getUserSql(name, password) {
  const data = (await db.select({
    id: m_user.id,
    userName: m_user.userName,
    userEmail: m_user.userEmail,
    userLink: m_user.userLink,
    userRole: m_user.userRole,
    userRegisterTime: m_user.userRegisterTime,
    userHead: m_user.userHead,
    userGender: m_user.userGender,
  })
    .from(m_user)
    .where(
      and(
        eq(m_user.userName, name),
        eq(m_user.userPassword, password)
      )
    ))
  return data?.[0] ?? null
}

export async function getBlogWriterId(blogId) {
  const data = (await db.select({
    blogWriterId: m_blog.blogWriterId
  })
    .from(m_blog)
    .where(
      and(
        eq(m_blog.id, blogId)
      )
    ))
  return data?.[0]['blogWriterId'] ?? null
}