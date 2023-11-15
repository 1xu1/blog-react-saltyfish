'use client'
import { useEffect, useState } from 'react'
import Button from "@/components/Button/Button";
import { getGithubLoginUrl } from '@/lib/authorize'
import { getBlogComment, addComment } from '@/service/comment'
import Comment from './Comment';
import message from "@/components/Notifications/Message";


export default async function CommentBlock(props) {
  const {
    blogId
  } = props

  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')

  useEffect(() => {
    getBlogComment({ id: blogId })
      .then(res => {
        setComments(res)
      })
  }, [])


  const handleAddComment = () => {
    addComment({
      content: content,
      blogId: blogId
    })
      .then(res => {
        message.success('评论成功')
      })
      .catch(err => {
        message.error('评论失败:' + err)
      })
  }


  return <div className='mx-auto w-full max-w-3xl bg-white p-8 my-4'>
    <textarea onChange={setContent} className=' w-full bg-slate-100 border rounded-sm h-24 p-2 focus:bg-slate-50 focus:border-cyan-500'></textarea>
    <p className='flex flex-row-reverse items-center'>
      <Button onClick={handleAddComment}>评论</Button>
      <a className=' mx-2' href={getGithubLoginUrl()}>Github登录</a>
    </p>

    {comments.map((comment) => {
      return <Comment key={comment.id} {...comment}></Comment>
    })}
  </div>
}