"use client"

import Nav from "@/app/layout/Nav";
import { useEffect, useState } from "react";

const PostPreviewList = (props: any) => {

    let [selectedYear, setSelectedYear] = useState('2023');
    let [selectedMonth, setSelectedMonth] = useState('06');

    useEffect(() => {
        let date = String(new Date().getMonth() + 1);
        if (date.length < 2) date = '0' + date;
        setSelectedMonth(date);
    }, [])

    const printList = (list: any) => {

        let result = list;

        result = result.filter((x: { props: { href: any; }; }) => {
            const date = x.props.href.split('/');
            const year = String(date[1]);
            const month = String(date[2]);

            if (year !== selectedYear || year?.length !== 4) return false;
            if (month !== selectedMonth) return false;

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