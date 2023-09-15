import getPostMetaData from '@/app/utils/getPostMetaData';
import fs from 'fs';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';
import * as gtag from 'lib/gtag'
import Script from "next/script"
import { ReactNode } from 'react';
import Tags from '@/app/layout/Tags';
import Nav from '@/app/layout/Nav';

export const generateStaticParams = async () => {
    const posts = getPostMetaData();
    console.log('===========')
    console.log(posts);
    console.log('===========')

    return posts.map((post) => ({
        year: post.year,
        month: post.month,
        day: post.day,
        slug: post.slug
    }))
}

const getPostContent = (year: any, month: string, day: string, slug: any) => {

    const file = `posts/${year}/${month}/${day}/${slug}.md`;
    console.log(file);
    const content = fs.readFileSync(file, 'utf-8');
    const matterResult = matter(content);

    return matterResult;
}

interface ChildrenNode {
    children: ReactNode;
}
const H1 = ({ children, ...props }: ChildrenNode) => {
    return <pre {...props}>{children}</pre>
};

const Page = (props: any) => {

    const { year, month, day, slug } = props.params;
    // const year = props.params.year;
    // const month = props.params.month;
    // const day = props.params.day;
    // const slug = props.params.slug;

    const post = getPostContent(year, month, day, slug);

    return <div className='prose min-h-screen max-w-full mx-4'>
        <h1 className='flex justify-center py-3 font-bold'>{post.data.title}</h1>
        <Tags />
        <article className="">
            <Markdown
                options={{
                    forceBlock: true,
                    overrides: {
                        h1: {
                            component: H1,
                            props: {
                                className: "foo",
                            }
                        },
                        pre: {
                            component: H1,
                            props: {
                                className: "foo",
                            }
                        }
                    }
                }}
            >
                {post.content}
            </Markdown>
        </article>
    </div>
}
export default Page;