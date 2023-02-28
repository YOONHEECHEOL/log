import Link from "next/link";
import { PostMetaData } from "./PostMetaData";

const PostPreview = (props: PostMetaData) => {
    return (
            <div key={props.slug} className='border rounded p-4 m-4'>
                <Link href={`/posts/${props.slug}`}>
                    <h2 className="text-cyan-700 font-bold">{props.title}</h2>
                </Link>
                <p className="text-[0.8rem]">{props.subtitle}</p>
                <p className="text-[0.6rem]">{props.date}</p>
            </div>
        )
}

export default PostPreview;