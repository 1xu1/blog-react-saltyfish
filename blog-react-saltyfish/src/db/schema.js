import { pgTable, serial, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
 
export const m_blog = pgTable('m_blog', {
    id: serial('blog_id').primaryKey(),
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