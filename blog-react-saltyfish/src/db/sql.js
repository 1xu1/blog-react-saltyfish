import { db } from '@/db/index.js'
import { m_user, m_blog, m_comment, m_share } from '@/db/schema.js'
import { eq, and, desc, asc, sql, like } from "drizzle-orm";
import { randomString } from '@/lib/utils.js'

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

export async function addBlogLike(blogId, num) {
  await db
    .update(m_blog)
    .set({
      blogLike: sql`${m_blog.blogLike} + ${num}`
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

export async function getBlogComment(blogId, limit = 20, offset = 0) {
  const comments = await db
    .select({
      ...m_comment,
      avaterUrl: m_user.avaterUrl,
      name: m_user.userName,
      userId: m_user.id
    })
    .from(m_comment)
    .leftJoin(m_user, eq(m_comment.userId, m_user.id))
    .where(
      eq(m_comment.blogId, blogId)
    )
    .orderBy(asc(m_comment.createTime))
    .limit(limit)
    .offset(offset)
  return comments
}

export async function addComment(comment) {
  const data = await db.insert(m_comment)
    .values({
      content: comment.content,
      userId: comment.userId,
      blogId: comment.blogId,
      like: 0,
    })
    .returning(m_comment);
  return data[0]
}

export async function addWebSiteRead(id) {
  return addBlogRead(id)
}

// 根据github的用户id查找用户信息
export async function selectUserByGithubId(id) {
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
        eq(m_user.githubUid, id)
      )
    ))
  return data?.[0] ?? null
}

// 根据github信息创建账户
export async function insertUserByGithubUserInfo(userInfo) {
  const pwd = randomString()
  const data = await db.insert(m_user)
    .values({
      userName: userInfo.name,
      userEmail: userInfo.email,
      userLink: userInfo.blog,
      userRole: 'User',
      userHead: userInfo.avatar_url,
      userPassword: pwd,
      githubUid: userInfo.id
    })
    .returning({
      id: m_user.id,
      userName: m_user.userName,
      userEmail: m_user.userEmail,
      userLink: m_user.userLink,
      userRole: m_user.userRole,
      userRegisterTime: m_user.userRegisterTime,
      userHead: m_user.userHead,
      userGender: m_user.userGender,
    });
  return data[0]
}

// 查找
export async function getBlogList(limit = 10, offset = 0) {
  const {
    // eslint-disable-next-line no-unused-vars
    blogContent,
    ...rest
  } = m_blog
  const data = await db.select({
    ...rest
  }).from(m_blog)
    .orderBy(desc(m_blog.blogTime))
    .limit(limit)
    .offset(offset)

  return data
}

export async function addShare(share) {
  const data = await db.insert(m_share)
    .values({
      like: 0,
      title: share.title,
      description: share.description,
      url: share.url,
      icon: share.icon,
      label: share.label,
    })
    .returning(m_share);
  return data[0]
}

export async function selectShare(limit = 10, offset = 0, label = '') {
  const data = await db.select()
    .from(m_share)
    .where(
      like(m_share.blogLabel, `%${label}%`))
    .orderBy(desc(m_share.createTime))
    .limit(limit)
    .offset(offset)
  return data
}

export async function updateShare(share) {
  const data = await db.update()
    .set({
      title: share.title,
      description: share.description,
      url: share.url,
      icon: share.icon,
      label: share.label,
    })
    .where(eq(m_share.id, share.id))
    .returning()
  return data
}
