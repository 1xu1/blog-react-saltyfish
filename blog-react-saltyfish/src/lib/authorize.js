import request from "@/service/request.js";
import axios from "axios";

const authorize_uri = 'https://github.com/login/oauth/authorize'
const client_id = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
const redirect_url = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL
const client_secret = process.env.GITHUB_CLIENT_SECRET

// github第三方认证登录相关
export function getGithubLoginUrl() {
  return `${authorize_uri}?client_id=${client_id}&redirect_url=${redirect_url}`
}

// github获取code之后，再去请求token
export async function getGithubToken(code) {
  const tokenUrl = `https://github.com/login/oauth/access_token?client_id=${client_id}&code=${code}&client_secret=${client_secret}`

  const tokenResponse = await request.post(tokenUrl) ?? ''
  const token = tokenResponse.split('=')[1].split('&')[0]

  return token
}

// 获取github用户信息
export async function getGithubUserInfoByToken(token) {
  const userUrl = `https://api.github.com/user`
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json, text/plain, */*',
  }
  const userInfo = await axios.get(
    userUrl,
    {
      headers: headers
    }
  )

  return userInfo.data
}
