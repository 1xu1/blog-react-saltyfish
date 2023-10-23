"use client"
import { useEffect } from "react"
import { useRouter } from 'next/navigation'
import { loginByGithub } from "@/service/user"
import message from "@/components/Notifications/Message";

const PLAT_LOGIN_URL = {
  github: loginByGithub
}

export default function BlogEditor(props) {
  const router = useRouter()

  const {
    searchParams
  } = props
  const { code, plat } = searchParams

  useEffect(() => {
    if (code) {
      login(code, plat)
    }
    else {
      message.err('失败，请稍后重试---')
    }
  }, [])

  const login = (code, plat) => {
    PLAT_LOGIN_URL[plat](`?code=${code}`).then((res) => {
      console.log('res---', res)
      sessionStorage.setItem('token', JSON.stringify(res.data.token))
      sessionStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
      router.push('/')
    })
    .catch(err=>{
      console.log('err---', err)
      message.err('失败，请稍后重试---' + err)
    })
  }



  return <div>
    登录中...
  </div>
}
