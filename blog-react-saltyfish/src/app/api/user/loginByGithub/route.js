import { NextResponse } from 'next/server';
import { getGithubToken, getGithubUserInfoByToken } from '@/lib/authorize.js'
import { selectUserByGithubId, insertUserByGithubUserInfo } from '@/db/sql.js'
import { getToken } from '@/lib/jwt.js'

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const code = searchParams.get('code')

  try {
    const token = await getGithubToken(code)
    const githubUserInfo = await getGithubUserInfoByToken(token)

    if (githubUserInfo?.id) {
      const user = await selectUserByGithubId(githubUserInfo.id)
      if (user) {
        const myToken = getToken(user)
        return NextResponse.json({
          data: {
            token: myToken,
            userInfo: user
          }
        })
      }
      else {
        // 无账户，则根据创建一个新账户
        const userInfo = await insertUserByGithubUserInfo(githubUserInfo)
        const myToken = getToken(userInfo)
        return NextResponse.json({
          data: {
            token: myToken,
            userInfo: userInfo
          },
        })
      }
    }

    return NextResponse.json({ data: token })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error?.message ?? error }, { status: 500 })
  }
}