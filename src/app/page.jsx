import MainLayout from '@/layouts/MainLayout/MainLayout.jsx'
import Link from 'next/link'
import Image from 'next/image'
import NeonLight from '@/components/NeonLight/NeonLight.jsx'

export default function Home() {
  return (
    <MainLayout>
      <main className="flex min-h-[calc(100vh-120px)] flex-col items-center justify-center p-8 md:p-24">
        <div className="mb-12 mt-16">
          <NeonLight></NeonLight>
        </div>
        <div className='mx-auto w-full max-w-3xl bg-white p-8 md:p-10 indent-8 grid-background-img tracking-wide leading-8 rounded-lg shadow-md'>
          <p>大家好啊，这里是盐巴鱼的个人博客。</p>
          <p>本站主要用于记录一些乱七八糟的技术笔记，以及写一些乱七八糟的杂记，或者是尝试在这个网站上尝试一些新的技术。</p>
          <p>本站现以nextjs框架进行全栈开发，部署在vercel服务器上，使用Postgres作为数据库，博文以markdown文档的形式保存。</p>
          <p>源码可见我的<Link className='text-sky-600 hover:text-lime-600' href="https://github.com/1xu1/blog-react-saltyfish" target='_blank'>github仓库。</Link></p>
          <p>可以点击下面的链接来查看我的博文。</p>
          <p className='text-end'>
            <Link className='text-sky-600 hover:text-lime-600' href="/blog">博文列表---&gt;</Link>
          </p>
          <p className=' flex justify-center items-center space-x-4'>
            <a href='https://github.com/1xu1' target='_blank'>
              <Image src="/icons/github.svg" alt="我的github" width={30} height={30} />
            </a>
            <a href='https://space.bilibili.com/11725175' target='_blank'>
              <Image src="/icons/bilibili.svg" alt="我的github" width={30} height={30} />
            </a>
          </p>
        </div>
      </main>
    </MainLayout>
  )
}
