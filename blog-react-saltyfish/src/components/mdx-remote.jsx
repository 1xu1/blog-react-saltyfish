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
    <h2 {...props} className="text-3xl my-6">
      {props.children}
    </h2>
  ),
  h4: (props) => (
    <h2 {...props} className="text-2xl my-6">
      {props.children}
    </h2>
  ),
  h5: (props) => (
    <h2 {...props} className="text-xl my-6">
      {props.children}
    </h2>
  ),
  h6: (props) => (
    <h2 {...props} className="text-lg my-6">
      {props.children}
    </h2>
  ),
  inlineCode: (props) => (
    <code {...props} className="text-base bg-slate-900 text-white rounded-sm">
      {props.children}
    </code>
  ),
  pre: (props) => (
    <pre {...props} className="text-base bg-slate-800 text-white rounded-sm my-4 p-2">
      {props.children}
    </pre>
  ),
  // code: (props) => (
  //   <code {...props} className="text-base bg-slate-900 text-white rounded-sm my-4 p-2">
  //     {props.children}
  //   </code>
  // ),
  li: (props) => (
    <li {...props} className=" ml-4 leading-7">
      <span className=' mr-2 text-xl'>·</span>{props.children}
    </li>
  ),
  p: (props) => (
    <p {...props} className=" my-5">
      {props.children}
    </p>
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