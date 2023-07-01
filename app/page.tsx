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
    <div className='columns 2xl:max-w-6xl lg:max-w-4xl sm:max-w-full mx-auto'>      
      <PostPreviewList 
        // nav={<Nav />}
        list={postPreviews}
      />
    </div>
  )
}