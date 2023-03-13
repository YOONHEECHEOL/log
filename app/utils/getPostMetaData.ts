import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { PostMetaData } from "./PostMetaData";

const getPostMetaData = (): PostMetaData[] => {
    // 게시글 root 위치
    const folder = "posts/";

    // 모든 게시글
    let result = getAllFiles(folder);
  
    const posts = result.map((fileName: string) => {
        const fileContents = fs.readFileSync(`${fileName}`, 'utf8');
        const matterResult = matter(fileContents);

        // year, slug 분리
        const YEAR = fileName.slice(6, 10);
        const SLUG = fileName.slice(11, 15);

        return {
            title: matterResult?.data?.title,
            date: matterResult?.data?.date,
            subtitle: matterResult?.data?.subtitle,
            tag: matterResult?.data.tag,
            year: YEAR,
            slug: SLUG
        }
    })

    return posts;
  }

export default getPostMetaData;

// 모든 게시글 배열로 반환
export const getAllFiles:any = (dir:any) =>
fs.readdirSync(dir).reduce((files: any, file) => {
    const name:fs.PathLike = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
}, []);