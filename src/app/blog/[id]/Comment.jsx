import { getFormatTime } from '@/lib/time.js'
export default function Comment(props) {
  const {
    avaterUrl,
    content,
    name,
    time,
  } = props
  return <div className=' w-full p-2 flex flex-col border-t'>
    <div className=' flex flex-row items-center gap-4'>
      {avaterUrl && <img alt="头像" className="w-8 h-8 rounded-full" referrerpolicy="no-referrer" loading="lazy" src={avaterUrl} />}
      <span>{name ?? '游客'}</span>
      <span>{getFormatTime(time)}</span>
    </div>
    <span>{content}</span>
  </div>
}