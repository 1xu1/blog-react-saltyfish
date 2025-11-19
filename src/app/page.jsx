import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'
import Link from 'next/link'
import Image from 'next/image'
import NeonLight from '@/components/NeonLight/NeonLight.jsx'
import TechBadge from '@/components/Badge/TechBadge.jsx'

export default function Home() {
  return (
    <MainLayout>
      <main className="flex min-h-[calc(100vh-120px)] flex-col items-center justify-center p-4 md:p-12 lg:p-24 bg-cover bg-center bg-no-repeat bg-fixed">
        <div className="mb-16 mt-8 flex w-full justify-center overflow-visible">
           <div className="relative flex justify-center min-w-[80%] md:min-w-[600px]">
              <div className="absolute inset-0 -z-10 bg-white/20 blur-3xl rounded-full mix-blend-overlay"></div>
              <NeonLight />
           </div>
        </div>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
          
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-xl md:p-12">
            
            <div className="space-y-6">
              <h1 className="text-3xl font-black tracking-wide text-slate-900 md:text-5xl drop-shadow-sm">
                你好，这里是<br/>
                <span className="text-[#fee] text-shadow-neon">跋鱼寻盐</span> 的博客网站。
              </h1>
              
              <div className="space-y-4 text-lg font-medium text-slate-700 leading-relaxed">
                <p>
                  前端工程师一枚，在雨夜的十字路口，记录乱七八糟的技术笔记。
                </p>
                <p className="text-base text-slate-600">
                  本站现以 <span className="font-bold text-slate-800">Next.js</span> 驱动，
                  部署于 Vercel，旨在记录技术知识与随笔。
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <TechBadge text="Next.js 14" />
                <TechBadge text="React" />
                <TechBadge text="Tailwind" />
                <TechBadge text="PostgreSQL" />
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/blog" className="rounded-full bg-slate-900 px-8 py-3 font-bold text-white transition hover:bg-slate-800 hover:shadow-lg hover:-translate-y-1">
                阅读博文 &rarr;
              </Link>
              <Link href="https://github.com/1xu1/blog-react-saltyfish" target='_blank' className="text-sm font-semibold text-slate-600 hover:text-indigo-600 underline decoration-slate-400/50 underline-offset-4">
                查看 Github 源码
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="h-full rounded-3xl border border-white/40 bg-white/70 p-8 shadow-xl backdrop-blur-xl flex flex-col justify-center items-center space-y-8 transition-colors">
              <p className="text-center text-slate-600 font-medium">关注我的动态</p>
              
              <div className="flex space-x-8">
                <a href='https://github.com/1xu1' target='_blank' className="group relative flex flex-col items-center">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <Image src="/icons/github.svg" alt="Github" width={32} height={32} />
                  </div>
                  {/* 悬浮时的发光底座 */}
                  <div className="absolute inset-0 bg-indigo-400 blur-xl opacity-0 transition-opacity group-hover:opacity-40"></div>
                </a>

                <a href='https://space.bilibili.com/11725175' target='_blank' className="group relative flex flex-col items-center">
                   <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md transition-transform group-hover:scale-110 group-hover:-rotate-3">
                    <Image src="/icons/bilibili.svg" alt="Bilibili" width={32} height={32} />
                  </div>
                  <div className="absolute inset-0 bg-pink-400 blur-xl opacity-0 transition-opacity group-hover:opacity-40"></div>
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-br from-white/40 to-white/10 p-6 shadow-lg backdrop-blur-md text-center">
               <p className="text-xs font-mono text-slate-200 drop-shadow-md">
                  SYSTEM STATUS: ONLINE <br/>
                  LOCATION: NEON CROSSROAD
               </p>
            </div>

          </div>

        </div>
      </main>
    </MainLayout>
  )
}