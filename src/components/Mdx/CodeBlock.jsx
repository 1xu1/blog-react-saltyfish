'use client'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function CodeBlock({ children, className }) {
  // 提取语言信息
  const language = className?.replace(/language-/, '') || 'text'
  
  return (
    <SyntaxHighlighter
      language={language}
      style={tomorrow}
      className="text-base rounded-lg my-4 p-4 overflow-x-auto"
    >
      {children}
    </SyntaxHighlighter>
  )
}