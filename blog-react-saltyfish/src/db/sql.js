import { db } from '@/db/index.js'
import { m_user } from '@/db/schema.js'
import { eq, and } from "drizzle-orm";

export async function getUserSql(name, password) {
  const data = (await db.select()
    .from(m_user)
    .where(
      and(
        eq(m_user.userName, name),
        eq(m_user.userPassword, password)
      )
    ))
  return data?.[0] ?? null
}