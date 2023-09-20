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

    return posts.map((post) => ({
        year: post.year,
        month: post.month,
        slug: post.slug
    }))
}

const getPostContent = (year: any, month: string, slug: any) => {

    const file = `posts/${year}/${month}/${slug}`;
    const content = fs.readFileSync(file, 'utf-8');


    const matterResult = matter(content);

    return matterResult;
}

interface ChildrenNode {
    className: string;
    children: ReactNode;
}
const H1 = ({ children, ...props }: ChildrenNode) => {
    return <pre {...props}>{children}</pre>
};

const Code = (props: ChildrenNode) => {
    const language = props?.className.replace('lang-', '');


    return <></>;
}

const Page = (props: any) => {

    const { year, month, slug } = props.params;

    const post = getPostContent(year, month, slug);

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