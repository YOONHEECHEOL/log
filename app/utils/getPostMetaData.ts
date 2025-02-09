import fs from 'fs';
import os from 'os';
import matter from 'gray-matter';
import path from 'path';
import { PostMetaData } from "./PostMetaData";

/**
 * 게시글 데이터 조회
 */
const getPostMetaData = (): PostMetaData[] => {
    // 게시글 root 위치
    const folder = "posts/";
    const splitStr = getIsWindows() ? '\\' : '/';

    // 모든 게시글 조회
    // @todo 페이지네이션 필요
    const posts = getAllFiles(folder);

    // 게시글 Object 형태로 변환
    const postsObjList = posts.reduce((acc: any, fileName: string) => {
        const fileContents = fs.readFileSync(`${fileName}`, 'utf8');
        const matterResult = matter(fileContents);
        const { title, date, subtitle, tag } = matterResult.data;

        // year, month, day, slug 분리
        const [root, year, month, slug] = fileName.split(splitStr);

        if (title && date && subtitle && tag && year && month && slug) {
            acc.push({
                title,
                date,
                subtitle,
                tag,
                year,
                month,
                slug
            });
        }

        return acc;
    }, []);

    // 게시글 정렬(최신글 순서대로)
    // @todo 정렬 기능 추가 필요
    postsObjList.sort((a: any, b: any) => {
        const aDate = new Date(a?.date).getTime();
        const bDate = new Date(b?.date).getTime();

        // 최신글 위로
        return bDate - aDate;
    });

    return postsObjList;
}

export default getPostMetaData;


/**
 * 모든 게시글 배열로 반환
 * @param dir : string
 */
export const getAllFiles: (dir: string) => string[] = (dir) =>
    fs.readdirSync(dir).reduce((files: any, file) => {
        const name: fs.PathLike = path.join(dir, file);

        if (!getIsWindows()) {
            if (name === dir + '.DS_Store') return files;
        }

        const isDirectory = fs.statSync(name).isDirectory();
        return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
    }, []);

/**
 * Windows OS 확인
 */
const getIsWindows: () => boolean = () => {
    return os.type().toLowerCase().indexOf('windows') > -1;
}