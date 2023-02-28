import getPostMetaData from '@/components/getPostMetaData';
import fs from 'fs';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';
import * as gtag from 'lib/gtag'
import Script from "next/script"

const getPostContent = (slug: any) => {
    const folder = 'posts/';
    const file = `${folder}/${slug}.md`;
    const content = fs.readFileSync(file, 'utf8');
    const matterResult = matter(content);
    
    return matterResult;
}

export const generateStaticParams = async () => {
    const posts = getPostMetaData();

    return posts.map((post) => ({
        slug: post.slug
    }))
}

const Page = (props: any) => {
    const slug = props.params.slug;
    const post = getPostContent(slug);

    return <div>
            <h1>{post.data.title}</h1>
            <article className="prose lg:prose-xl">
                <Markdown>{post.content}</Markdown>
            </article>
        </div>
}
export default Page;