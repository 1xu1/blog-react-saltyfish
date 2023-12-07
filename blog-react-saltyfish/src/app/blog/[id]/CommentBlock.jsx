'use client'
import React, { useEffect, useState } from 'react'
import Button from "@/components/Button/Button";
import { getGithubLoginUrl } from '@/lib/authorize'
import { getBlogComment, addComment } from '@/service/comment'
import Comment from './Comment';
import message from "@/components/Notifications/Message";
import LoadingBlock from '@/components/LoadingBlock'

export default function CommentBlock(props) {
  const {
    blogId
  } = props

  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    refersh()
  }, [])

  const refersh = () => {
    getBlogComment({ id: blogId })
      .then(res => {
        console.log('res---', res)
        setComments(res.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleAddComment = () => {
    if (content.length > 255) {
      message.error('评论内容不能超过255个字符')
      return
    }
    if (!content || content.length === 0) {
      message.error('评论内容不能为空')
      return
    }
    setLoading(true)
    addComment({
      content: content,
      blogId: blogId
    })
      .then(() => {
        message.success('评论成功')
        setContent('')
        refersh()
      })
      .catch(err => {
        message.error('评论失败:' + err)
        setLoading(false)
      })
  }


  return <div>
    <textarea
      placeholder='评论内容'
      value={content}
      onChange={e => setContent(e.target.value)}
      type='text'
      className=' resize-none w-full bg-slate-100 border rounded-sm h-24 p-2 focus:bg-slate-50 focus:border focus:border-cyan-700 outline-none	'></textarea>
    <p className='flex flex-row-reverse items-center mb-4'>
      <Button loading={loading} onClick={handleAddComment}>评论</Button>
      <a className=' mx-2' href={getGithubLoginUrl()}>Github登录</a>
    </p>

    <LoadingBlock loading={loading}>
      {comments.map((comment) => {
        return <Comment key={comment.id} {...comment}></Comment>
      })}
    </LoadingBlock>
  </div>
}