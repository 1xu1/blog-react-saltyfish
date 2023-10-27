import { getFormatTime } from '@/lib/time.js'

export default async function BlogHeader(props) {
  const {
    blogTitle,
    blogTime,
    blogLabel,
    blogRead,
    blogLike
  } = props.blog

  const blogLabelArr = blogLabel.split("#").filter(i => i)

  return (
    <div >
      <p className=' text-4xl font-extrabold my-4'>{blogTitle}</p>
      <p className='text-sm text-slate-600'>{getFormatTime(blogTime)}</p>
      <p className='flex flex-row leading-6 text-slate-700'>
        {blogLabelArr.map((item, index) => {
          return <a key={index} className=' slate me-2 p-2 hover:bg-cyan-50 rounded-md border-solid border-inherit transition duration-300 ease-in-out' href={`/blog?label=${item}`}>
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
        <span className='my-2 flex flex-row items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
          </svg>
          <span>
            {blogLike}
          </span>
        </span>
      </p>

    </div>
  );
}

