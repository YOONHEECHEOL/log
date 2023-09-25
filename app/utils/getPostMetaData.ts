import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { PostMetaData } from "./PostMetaData";

const getPostMetaData = (): PostMetaData[] => {
    // 게시글 root 위치
    const folder = "posts/";

    // 모든 게시글
    let posts = getAllFiles(folder);
  
    posts = posts.reduce((acc:any, fileName: string) => {
        const fileContents = fs.readFileSync(`${fileName}`, 'utf8');
        const matterResult = matter(fileContents);

        // year, month, day, slug 분리
        const [root, year, month, slug] = fileName.split('/');

        acc.push({
            title: matterResult?.data?.title,
            date: matterResult?.data?.date,
            subtitle: matterResult?.data?.subtitle,
            tag: matterResult?.data.tag,
            year: year,
            month: month,
            slug: slug
        });

        acc.sort((a:any, b:any) => {
            const aDate = new Date(a?.date).getTime();
            const bDate = new Date(b?.date).getTime();

            return bDate - aDate;
        });
        
        return acc;
    }, [])

    return posts;
  }

export default getPostMetaData;

// 모든 게시글 배열로 반환
export const getAllFiles:any = (dir:any) =>
fs.readdirSync(dir).reduce((files: any, file) => {
    const name:fs.PathLike = path.join(dir, file);

    if(name === dir + '.DS_Store') return files;

    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
}, []);