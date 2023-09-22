"use client"

import Nav from "@/app/layout/Nav";
import { useEffect, useState } from "react";
import ToggleButton from "./Toggle/Toggle";

const PostPreviewList = (props: any) => {

    let [isFilterDate, setIsFilterDate] = useState(true);

    let [selectedYear, setSelectedYear] = useState('');
    let [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        let year = String(new Date().getFullYear());
        setSelectedYear(year);

        let date = String(new Date().getMonth() + 1);
        if (date.length < 2) date = '0' + date;
        setSelectedMonth(date);
    }, [])

    let yearArticleCnt: any = {};
    let monthArticleCnt: any = {};

    const printList = (list: any) => {

        let result = list;

        // 년,월별 작성글 카운트
        list.forEach((el: any) => {
            const year = el?.props?.href?.split('/')[1];
            const month = el?.props?.href?.split('/')[2];

            if (!yearArticleCnt[year]) yearArticleCnt[year] = 1;
            else yearArticleCnt[year] += 1;

            if (!monthArticleCnt[year + '-' + month]) monthArticleCnt[year + '-' + month] = 1;
            else monthArticleCnt[year + '-' + month] += 1;
        })

        // 년,월 필터 사용 시
        if (!isFilterDate) {
            result = result.filter((x: { props: { href: any; }; }) => {
                const date = x.props.href.split('/');
                const year = String(date[1]);
                const month = String(date[2]);

                if (year !== selectedYear || year?.length !== 4) return false;
                if (month !== selectedMonth) return false;

                return true;
            })
        }

        return result;
    }

    let yearPrintValList: string[] = [];
    let monthPrintValList: string[] = [];

    return (
        <>
            <div className="border-b pt-1 px-3">
                <ToggleButton label={'년/월 필터'} onClick={(e: any) => setIsFilterDate(!isFilterDate)} />
            </div>
            {
                !isFilterDate && <Nav
                    // 작성글 카운트
                    yearArticleCnt={yearArticleCnt}
                    monthArticleCnt={monthArticleCnt}

                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                />
            }
            {
                printList(props.list).map((el: any, idx: number) => {
                    const year = el?.props?.href?.split('/')[1];
                    const month = el?.props?.href?.split('/')[2];

                    const isYearInclude = yearPrintValList.includes(year);
                    const isMonthInclude = monthPrintValList.includes(month);

                    if (!isYearInclude) {
                        yearPrintValList.push(year);
                    }
                    if (!isMonthInclude) {
                        monthPrintValList.push(month);
                    }

                    return (
                        <div className="flex justify-between" key={el?.props?.href}>
                            <div className="w-1/5 flex flex-col justify-center  px-3">
                                {!isYearInclude ?
                                    <div className="flex justify-between text-right">
                                        <span className="text-slate-500 text-2xl text-center">{year}<br /><span className="text-slate-300 text-sm">({yearArticleCnt[year]})</span></span>
                                        {
                                            !isMonthInclude && (
                                                <span className="text-orange-500 text-2xl">
                                                    <span>{month}</span><br />
                                                    <span className="text-slate-300 text-sm">({monthArticleCnt[year + '-' + month]})</span>
                                                </span>
                                            )
                                        }
                                    </div>
                                    : <div className="text-2xl text-slate-500 flex justify-end text-right">
                                        {
                                            !isMonthInclude && (
                                                <span className="text-slate-500 text-2xl">
                                                    <span>{month}</span><br />
                                                    <span className="text-slate-300 text-sm">({monthArticleCnt[year + '-' + month]})</span>
                                                </span>
                                            )
                                        }
                                    </div>
                                }
                            </div>
                            <div className="w-4/5">
                                {el}
                            </div>
                        </div>
                    );
                })
            }
        </>
    )
}

export default PostPreviewList;