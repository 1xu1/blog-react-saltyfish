import { CustomMDX } from '@/components/mdx-remote'
import { transBlogContent } from '@/lib/utils'


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

