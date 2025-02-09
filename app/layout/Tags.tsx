"use client";

import { ReactNode } from "react";

interface TagsProps {
    tags: string;
}

/**
 * 태그 영역
 * @param tags : TagsProps
 * @returns
 */
const Tags = ({ tags }: TagsProps) => {
    let tagList: string[] = [];

    return (
        <div className="tags flex justify-center flex-wrap text-center py-2 sm:text-sm">
            {tags?.split(" ")?.map((el: string, idx: number) => {
                if (tagList.includes(el)) return;
                else tagList.push(el);

                return (
                    <span
                        key={el + idx}
                        className="
                                border p-2  bg-slate-800 text-cyan-50 border-slate-800 mr-1
                                sm:p-1 rounded sm:text-xs"
                    >
                        {el}
                    </span>
                );
            })}
        </div>
    );
};

export default Tags;
