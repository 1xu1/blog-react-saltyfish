// components/mdx-remote.js
import { MDXRemote } from 'next-mdx-remote/rsc'

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
  code: (props) => (
    <code {...props} className="text-base text-sky-600 rounded-sm p-1 -z-10 bg-sky-100">
      {props.children}
    </code>
  ),
  pre: (props) => {
    return <pre {...props} className="text-base text-white rounded-sm my-4 p-2 bg-sky-100 overflow-x-auto">
      {props.children}
    </pre>
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