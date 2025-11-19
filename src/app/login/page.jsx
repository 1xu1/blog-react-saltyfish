"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { loginByGithub } from "@/service/user"

const PLAT_LOGIN_URL = {
  github: loginByGithub
}

export default function BlogEditor(props) {
  const router = useRouter()

  const {
    searchParams
  } = props
  const { code, plat } = React.use(searchParams)

  const [msg, setMsg] = useState('稍等，正在为您的登陆跳转中')

  useEffect(() => {
    if (code) {
      login(code, plat)
    }
    else {
      setMsg('哎呀，看起来登陆失败了')
    }
  }, [])

  const login = (code, plat) => {
    PLAT_LOGIN_URL[plat](`?code=${code}`).then((res) => {
      localStorage.setItem('token', JSON.stringify(res.data.token))
      localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
      router.push('/')
    })
      .catch(err => {
        setMsg('哎呀，看起来登陆失败了' + err)
      })
  }



  return <body>
    <div className=" w-full h-full flex items-center justify-center absolute">
      <div className=" items-center justify-center flex flex-col">
          <svg className=" w-12 h-16" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="24px" height="30px" viewBox="0 0 24 30" style={{enableBackground:'new 0 0 50 50'}} xmlSpace="preserve">
            <rect className="fill-cyan-400" x="0" y="13" width="4" height="5" fill="#333">
              <animate attributeName="height" attributeType="XML"
                values="5;21;5"
                begin="0s" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="y" attributeType="XML"
                values="13; 5; 13"
                begin="0s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect className="fill-cyan-400" x="10" y="13" width="4" height="5" fill="#333">
              <animate attributeName="height" attributeType="XML"
                values="5;21;5"
                begin="0.15s" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="y" attributeType="XML"
                values="13; 5; 13"
                begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect className="fill-cyan-400" x="20" y="13" width="4" height="5" fill="#333">
              <animate attributeName="height" attributeType="XML"
                values="5;21;5"
                begin="0.3s" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="y" attributeType="XML"
                values="13; 5; 13"
                begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            </rect>
          </svg>
        <span>{msg}</span>
      </div>
    </div>
  </body>
}
