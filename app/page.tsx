import getPostMetaData from '../components/getPostMetaData';
import Link from 'next/link';
import PostPreview from '@/components/PostPreview';


export default function Home() {

  const postMetaData = getPostMetaData();
  const postPreviews = postMetaData.map((post) => (
        <PostPreview {...post} key={post.slug} />
    ));

  return (
    <main>
      {postPreviews}
    </main>
  )
}
