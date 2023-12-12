import { pgTable, text, varchar, integer, timestamp, bigint } from "drizzle-orm/pg-core";
 
export const m_blog = pgTable('m_blog', {
    id: integer('blog_id').primaryKey(),
    blogContent: text('blog_content'),
    blogLike: integer('blog_like'),
    blogRead: integer('blog_read'),
    blogVisibility: integer('blog_visibility'),
    blogType: integer('blog_type'),
    blogTitle: varchar('blog_title'),
    blogLabel: varchar('blog_label'),
    blogWriter: varchar('blog_writer'),
    blogTime: timestamp('blog_time').defaultNow(),
    blogCreateTime: timestamp('blog_create_time').defaultNow(),
    blogWriterId: integer('blog_writer_id')
});

export const m_user = pgTable('m_user', {
    id: integer('user_id').primaryKey(),
    userName: varchar('user_name'),
    userPassword: varchar('user_pwd'),
    userEmail: varchar('user_email'),
    userLink: varchar('user_link'),
    userRole: varchar('user_role'),
    userRegisterTime: timestamp('register_time').defaultNow(),
    avaterUrl: varchar('avater_url'),
    userGender: varchar('user_gender'),
    githubUid: integer('github_uid')
});

export const m_comment = pgTable('m_comment', {
    id: integer('id').primaryKey(),
    like: integer('like'),
    blogId: bigint('blog_id', { mode: 'number' }),
    content: varchar('content'),
    createTime: timestamp('create_time').defaultNow(),
    userId: bigint('user_id', { mode: 'number' }),
    replyId: bigint('reply_id', { mode: 'number' }),
});

export const m_share = pgTable('m_comment', {
    id: integer('id').primaryKey(),
    like: integer('like'),
    title: varchar('title'),
    description: varchar('description'),
    url: varchar('url'),
    icon: varchar('icon'),
    label: varchar('label'),
    createTime: timestamp('create_time').defaultNow(),
});