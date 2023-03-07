import getPostMetaData from '@/app/interface/getPostMetaData';
import fs from 'fs';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';
import * as gtag from 'lib/gtag'
import Script from "next/script"

const getPostContent = (slug: any, slug2: any) => {   

    // const folder = 'posts/';
    const file = `posts/${slug}/${slug2}.md`;
    const content = fs.readFileSync(file, 'utf-8');

    const matterResult = matter(content);
    
    return matterResult;
}

export const generateStaticParams = async () => {
    const posts = getPostMetaData();

    return posts.map((post) => ({
        slug: post.slug,
        slug2: post.slug
    }))
}

const Page = (props: any) => {

    console.log('///////')
    console.log(props)
    console.log('///////')    

    const slug = props.params.slug;
    const slug2 = props.params.slug2;

    // console.log('-----')
    // console.log(slug)
    // console.log('-----')

    const post = getPostContent(slug, slug2);

    // console.log('>>>>')
    // console.log(post)
    // console.log('>>>>')

    return <div>
            <h1>{post.data.title}</h1>
            <article className="prose lg:prose-xl">
                <Markdown>{post.content}</Markdown>
            </article>
        </div>
}
export default Page;