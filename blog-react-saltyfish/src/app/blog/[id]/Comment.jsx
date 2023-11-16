import { getFormatTime } from '@/lib/time.js'
export default async function Comment(props) {
  const {
    avaterUrl,
    content,
    name,
    time
  } = props
  return <div className=' w-full p-2'>
    <img alt="头像" className=" h-8 rounded-full" referrerpolicy="no-referrer" loading="lazy" src={avaterUrl} />
    <span>{name}</span>
    <span>{getFormatTime(time)}</span>
    <span>{content}</span>
  </div>
}