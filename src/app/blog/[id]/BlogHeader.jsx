import { getFormatTime } from '@/lib/time.js'

export default async function BlogHeader(props) {
  const {
    blogTitle,
    blogTime,
    blogLabel = '',
    blogRead,
  } = props.blog

  const blogLabelArr = blogLabel.split("#").filter(i => i)

  // 定义标签颜色数组
  const labelColors = [
    'text-red-400',
    'text-orange-400',
    'text-yellow-400',
    'text-green-400',
    'text-teal-400',
    'text-blue-400',
    'text-indigo-400',
    'text-purple-400',
    'text-pink-400'
  ]

  // 随机选择颜色
  const getRandomColor = (index) => {
    const randomIndex = (index + Math.floor(Math.random() * 100)) % labelColors.length;
    return labelColors[randomIndex];
  }

  return (
    <>
      <h1 className=' text-4xl font-extrabold my-4'>{blogTitle}</h1>
      <div className='flex flex-wrap items-center gap-6 text-sm text-slate-600'>
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008z" />
          </svg>
          {getFormatTime(blogTime)}
        </span>
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          {blogRead} 阅读
        </span>
      </div>

      <p className='flex flex-row leading-6 text-slate-700 my-2'>
        {blogLabelArr.map((item, index) => {
          const randomColor = getRandomColor(index);
          return <a key={index} className='slate me-2 px-2 py-1 border hover:bg-slate-50 rounded-md border-inherit transition duration-300 ease-in-out' href={`/blog?label=${item}`}>
            <span className={randomColor}>#</span>
            {`${item}`}
          </a>
        })}
      </p>


    </>
  );
}

