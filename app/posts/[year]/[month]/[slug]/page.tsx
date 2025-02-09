import getPostMetaData from "@/app/utils/getPostMetaData";
import fs from "fs";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";
import Tags from "@/app/layout/Tags";
import { CodeBlock, PreBlock } from "@/components/CodeBlock";
import Link from "next/link";

/**
 * 게시글 상세조회
 * @returns
 */
export const generateStaticParams = async () => {
    const posts = getPostMetaData();

    return posts.map(({ year, month, slug }) => ({ year, month, slug }));
};

const getPostContent = (year: any, month: string, slug: any) => {
    const file = `posts/${year}/${month}/${slug}`;
    const content = fs.readFileSync(file, "utf-8");
    const matterResult = matter(content);

    return matterResult;
};

/**
 * 커스텀 HTML 태그
 */
interface ChildrenNode {
    className: string;
    children: string | string[];
}
const H1 = ({ children, ...props }: ChildrenNode) => {
    return <pre {...props}>{children}</pre>;
};

const Page = (props: any) => {
    const { year, month, slug } = props.params;

    const post = getPostContent(year, month, slug);
    const { title, date, tag } = post.data;

    return (
        <div className="prose min-h-screen max-w-full mx-4">
            <h1
                className="text-center py-2 mb-0
                    md:text-3xl
                    sm:text-2xl
                "
            >
                {title}
            </h1>
            <div className="text-center text-sm sm:text-xs">{date}</div>
            <Tags tags={tag} />
            <article className="">
                <Markdown
                    options={{
                        overrides: {
                            h1: {
                                component: H1,
                                props: {
                                    className: "foo",
                                },
                            },
                            // Code Block 처리를 위한 커스텀 컴포넌트로 감싸서 출력
                            pre: {
                                component: PreBlock,
                            },
                        },
                    }}
                >
                    {post.content}
                </Markdown>
            </article>
            <div>
                <Link href={"/"}>목록</Link>
            </div>
        </div>
    );
};

export default Page;
