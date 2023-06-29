import getPostMetaData from './utils/getPostMetaData';
import Link from 'next/link';
import PostPreview from '@/components/PostPreview';
// import Nav from './layout/Nav';
import PostPreviewList from '@/components/PostPreviewList';

export default function Home() {
  const postMetaData = getPostMetaData();
  const postPreviews = postMetaData.map((post) => (
        <PostPreview {...post} key={post.slug} />
    ));

  return (
    <div className='columns'>      
      <PostPreviewList 
        // nav={<Nav />}
        list={postPreviews}
      />
    </div>
  )
}