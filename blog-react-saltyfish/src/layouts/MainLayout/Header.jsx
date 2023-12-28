'use client'
import { useEffect, useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import LoginModal from './LoginModal'
import Image from 'next/image'

const routeMenu = [
  {
    title: '首页',
    url: '/'
  },
  {
    title: '博文',
    url: '/blog'
  },
  {
    title: '更新日志',
    url: '/blog?label=更新日志'
  },
  {
    title: '站点留言',
    url: '/siteMessage'
  },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  const openLoginModal = () => {
    setLoginModalOpen(true)
  }

  useEffect(() => {
    sessionStorage.getItem('userInfo') && setUserInfo(JSON.parse(sessionStorage.getItem('userInfo') ?? '{}'))
    sessionStorage.getItem('token') && setLoginStatus(true)
  }, [])

  const loginCallBack = (data) => {
    const {
      userInfo,
      token
    } = data

    setUserInfo(userInfo)
    window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    window.sessionStorage.setItem('token', JSON.stringify(token))

    setLoginStatus(true)
  }

  return (
    <header className="border-y" style={{background: 'rgba(255,255,255,0.5)'}}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">盐巴鱼的博客</span>
            <Image width={36} height={36} className="h-9 w-auto rounded-full" src="/favicon.ico" alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">打开主菜单</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          {
            routeMenu.map(item => {
              return (<Link key={item.url} href={item.url} className="text-lg font-medium leading-6 text-gray-900">
                {item.title}
              </Link>)
            })
          }
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!loginStatus && <a href="#" className="text-sm font-semibold leading-6 text-gray-900" onClick={openLoginModal}>
            登录 <span aria-hidden="true">&rarr;</span>
          </a>}
          {
            loginStatus && <span className='flex flex-row justify-center items-center space-x-1'>
              <Image width={32} height={32} className="h-8 w-auto rounded-full" src={userInfo?.avaterUrl} alt="" />
              <Link href="/manager/blog">{userInfo?.userName}</Link>
            </span>
          }
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                width={32}
                height={32}
                className="h-8 w-auto"
                src="/favicon.ico"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">关闭菜单</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {
                  routeMenu.map(item => {
                    return (<Link key={`${item.url}1`} href={item.url} className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 text-gray-900 hover:bg-gray-50">
                      {item.title}
                    </Link>)
                  })
                }
              </div>
              <div className="py-6">
                {!loginStatus && <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={openLoginModal}
                >
                  登录
                </a>}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
      <LoginModal
        visible={loginModalOpen}
        onClose={() => setLoginModalOpen(false)} 
        loginCallBack={loginCallBack}/>
    </header>
  )
}