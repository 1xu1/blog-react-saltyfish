import { CustomMDX } from '@/components/mdx-remote'

// 替换换行符
function transBlogContent(text){
  const regex = /\\n/ig;
  return text.replaceAll(regex,'\n')
}

export default async function BlogContent(props) {

  const {
    blogContent
  } = props

  return (
    <div>
      <CustomMDX
      source={transBlogContent(blogContent)}
    />
    </div>
  );
}

