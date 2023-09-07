import { db } from '@/db/index.js'
import { m_user, m_blog, m_comment } from '@/db/schema.js'
import { eq, and, desc, sql } from "drizzle-orm";

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

export async function addBlogRead(blogId) {
  await db
    .update(m_blog)
    .set({
      blogRead: sql`${m_blog.blogRead} + 1`
    })
    .where(eq(m_blog.id, blogId))
  return true
}

export async function addBlogLike(blogId) {
  await db
    .update(m_blog)
    .set({
      blogLike: sql`${m_blog.blogLike} + 1`
    })
    .where(eq(m_blog.id, blogId))
  return true
}

export async function getBlogLabels() {
  const labels = await db
    .select({
      label: m_blog.blogLabel
    })
    .from(m_blog)
    .where(eq(m_blog.blogVisibility, 1))
  return labels
}

export async function getBlogComment(blogId) {
  const comments = await db
    .select(m_comment)
    .from(m_comment)
    .where(eq(m_comment.blogId, blogId))
  return comments
}

export async function addComment(comment) {
  const maxFloor = await getCommentMaxFloor(comment.blogId)
  const data = await db.insert(m_blog)
    .values({
      content: comment.content,
      userName: comment.userName,
      link: comment.link,
      userId: comment.userId,
      blogId: comment.blogId,
      floor: maxFloor,
      like: 0
    })
    .returning(m_comment);
  return data
}

export async function getCommentMaxFloor(blogId) {
  const maxFloor = await db
    .select({
      floor
    })
    .from(m_comment)
    .where(eq(m_comment.blogId, blogId))
    .orderBy(desc)
    .limit(1)
  return maxFloor[0].floor
}

export async function addWebSiteRead() {
  return addBlogRead(0)
}