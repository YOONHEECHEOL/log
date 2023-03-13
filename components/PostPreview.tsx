import Link from "next/link";
import { PostMetaData } from "../app/utils/PostMetaData";

const PostPreview = (props: PostMetaData) => {
    
    return (
            <Link href={`posts/${props.year}/${props.slug}`}>                
                <div key={props.slug} className='border rounded p-4 m-4'>
                    <h2 className="text-cyan-700 font-bold">{props.title}</h2>
                    <p className="text-[0.8rem]">{props.subtitle}</p>
                    <p className="text-[0.6rem]">{props.date}</p>
                </div>
            </Link>
        )
}

export default PostPreview;