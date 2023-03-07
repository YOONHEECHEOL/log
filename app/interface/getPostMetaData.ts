import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { PostMetaData } from "./PostMetaData";

const getPostMetaData = (): PostMetaData[] => {
    // dir, file 탐색
    const folder = "posts/";
    // const files = fs.readdirSync(folder);

    const getAllFiles:any = (dir:any) =>
    fs.readdirSync(dir).reduce((files: any, file) => {
        const name:fs.PathLike = path.join(dir, file);
        const isDirectory = fs.statSync(name).isDirectory();
        return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
    }, []);

    let result = getAllFiles(folder);
    console.log(result)

    // const markdownPosts = files.filter((file, idx) => {
    //     return true;
    // });
  
    const posts = result.map((fileName: string) => {
        const fileContents = fs.readFileSync(`${fileName}`, 'utf8');
        const matterResult = matter(fileContents);

        return {
            title: matterResult?.data?.title,
            date: matterResult?.data?.date,
            subtitle: matterResult?.data?.subtitle,
            slug: fileName.replace('.md', '')
        }
    })

    console.log(posts)

    return posts;
  }

  export default getPostMetaData;