import { getFormatTime } from '@/lib/time.js'

export default async function BlogHeader(props) {
  const {
    blogTitle,
    blogTime,
    blogLabel = '',
    blogRead,
  } = props.blog

  const blogLabelArr = blogLabel.split("#").filter(i => i)

  return (
    <div >
      <p className=' text-4xl font-extrabold my-4'>{blogTitle}</p>
      <p className='text-sm text-slate-600'>{getFormatTime(blogTime)}</p>
      <p className='flex flex-row leading-6 text-slate-700 my-2'>
        {blogLabelArr.map((item, index) => {
          return <a key={index} className='slate me-2 px-2 py-1 border hover:bg-cyan-50 hover:rounded-md border-inherit transition duration-300 ease-in-out' href={`/blog?label=${item}`}>
            <span className=' text-cyan-400'>#</span>
            {`${item}`}
          </a>
        })}
      </p>
      <p className='text-sm text-slate-600 flex flex-row leading-6'>
        <span className=' flex flex-row items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          <span>
            {blogRead}
          </span>
        </span>
      </p>

    </div>
  );
}

