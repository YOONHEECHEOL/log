import getPostMetaData from '@/app/interface/getPostMetaData';
import fs from 'fs';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';
import * as gtag from 'lib/gtag'
import Script from "next/script"

export const generateStaticParams = async () => {
    const posts = getPostMetaData();

    return posts.map((post) => ({
        year: post.year,
        slug: post.slug
    }))
}

const getPostContent = (year: any, slug: any) => {   

    const file = `posts/${year}/${slug}.md`;
    const content = fs.readFileSync(file, 'utf-8');
    const matterResult = matter(content);
    
    return matterResult;
}

const Page = (props: any) => {

    const year = props.params.year;
    const slug = props.params.slug;

    const post = getPostContent(year, slug);

    return <div>
            <h1>{post.data.title}</h1>
            <article className="prose lg:prose-xl">
                <Markdown>{post.content}</Markdown>
            </article>
        </div>
}
export default Page;