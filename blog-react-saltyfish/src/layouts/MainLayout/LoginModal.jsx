import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { login } from '@/service/user.js'
import { getGithubLoginUrl } from '@/lib/authorize'

export default function LoginModal(props) {

  const {
    visible,
    onClose,
    loginCallBack
  } = props

  const [loginForm, setLoginForm] = useState({})

  const setLoginFormState = (state) => {
    setLoginForm({
      ...loginForm,
      ...state,
    })
  }

  const closeModal = () => {
    onClose(false)
  }

  const handleLogin = () => {
    login(loginForm)
    .then(res=>{
      sessionStorage.setItem('token',res.data?.token)
      loginCallBack(res?.data ?? {})
      onClose(false)
    })
  }

  return (
    <>
      <Transition appear show={visible} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                  <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">登录你的账号</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                      <form className="space-y-6" action="#" method="POST">
                        <div>
                          <label className="block text-sm font-medium leading-6 text-gray-900">用户名</label>
                          <div className="mt-2">
                            <input onChange={(e)=>setLoginFormState({name:e.target.value})} id="name" name="name" type="name" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium leading-6 text-gray-900">密码</label>
                            <div className="text-sm">
                              {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">忘记密码?</a> */}
                            </div>
                          </div>
                          <div className="mt-2">
                            <input onChange={(e)=>setLoginFormState({password:e.target.value})} id="password" name="password" type="password" autoComplete="new-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                          </div>
                        </div>

                        <div>
                          <button onClick={handleLogin} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">登录</button>
                        </div>

                        <div>
                          <a href={getGithubLoginUrl()}>Github登录</a>
                        </div>

                      </form>

                    </div>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
