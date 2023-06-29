"use client"

import Nav from "@/app/layout/Nav";
import { useState } from "react";

const PostPreviewList = (props: any) => {

    let [selectedYear, setSelectedYear] = useState('2023');
    let [selectedMonth, setSelectedMonth] = useState('06');

    const printList = (list:any) => {

        let result = list;

        result = result.filter((x: { props: { href: any; }; }) => {
            const date = x.props.href.split('/');
            const year = String(date[1]);
            const month = String(date[2]).slice(0, 2);

            if(year !== selectedYear) return false;
            if(month !== selectedMonth) return false;

            return true;
        })

        return result;
    }

    return (
            <>
                <Nav
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                />
                {printList(props.list)}
            </>
        )
}

export default PostPreviewList;