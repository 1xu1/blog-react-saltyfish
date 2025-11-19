// components/mdx-remote.js
import { MDXRemote } from 'next-mdx-remote/rsc'
import CodeBlock from './CodeBlock'

const components = {
  h1: (props) => (
    <h1 {...props} className="text-5xl my-6">
      {props.children}
    </h1>
  ),
  h2: (props) => (
    <h2 {...props} className="text-4xl my-6">
      {props.children}
    </h2>
  ),
  h3: (props) => (
    <h3 {...props} className="text-3xl my-6">
      {props.children}
    </h3>
  ),
  h4: (props) => (
    <h4 {...props} className="text-2xl my-6">
      {props.children}
    </h4>
  ),
  h5: (props) => (
    <h5 {...props} className="text-xl my-6">
      {props.children}
    </h5>
  ),
  h6: (props) => (
    <h6 {...props} className="text-lg my-6">
      {props.children}
    </h6>
  ),
  code: (props) => {
    // 处理内联代码
    if (!props.className) {
      return (
        <code {...props} className="text-base text-sky-600 rounded-sm p-1 bg-sky-100">
          {props.children}
        </code>
      )
    }
    // 代码块中的code元素，由pre组件处理
    return <code {...props}>{props.children}</code>
  },
  pre: (props) => {
    // 处理代码块，使用客户端CodeBlock组件
    const codeElement = props.children.props
    if (!codeElement) return <pre {...props}>{props.children}</pre>
    
    return (
      <CodeBlock className={codeElement.className}>
        {codeElement.children}
      </CodeBlock>
    )
  },
  li: (props) => (
    <li {...props} className=" ml-4 leading-7 list-disc">
      {props.children}
    </li>
  ),
  p: (props) => (
    <p {...props} className=" my-5 leading-8">
      {props.children}
    </p>
  ),
  img: (props) => (
    <img {...props} loading="lazy" referrerPolicy="no-referrer">
      {props.children}
    </img>
  ),
  a: (props) => (
    <a {...props} className=' text-sky-600 hover:text-lime-600'>
      {props.children}
    </a>
  ),
}

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}