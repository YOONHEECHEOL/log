import getPostMetaData from '@/app/utils/getPostMetaData';
import fs from 'fs';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';
import * as gtag from 'lib/gtag'
import Script from "next/script"
import { ReactNode } from 'react';
import Tags from '@/app/layout/Tags';

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

interface ChildrenNode {
    children: ReactNode;
}
const H1 = ({children, ...props}:ChildrenNode) => {
    return <pre {...props}>{children}</pre>
};

const Page = (props: any) => {

    const year = props.params.year;
    const slug = props.params.slug;

    const post = getPostContent(year, slug);

    return <div>
            <h1 className='page__title'>{post.data.title}</h1>
            <Tags />
            <article className="prose lg:prose-xl">
                <Markdown
                    options={{
                        forceBlock: true,
                        overrides: {
                            h1: {
                                component: H1,
                                props: {
                                    className:"foo",
                                }
                            },
                            pre: {
                                component: H1,
                                props: {
                                    className:"foo",
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