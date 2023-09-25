"use client"

import Nav from "@/app/layout/Nav";
import { useEffect, useRef, useState } from "react";
import ToggleButton from "./Toggle/Toggle";

const PostPreviewList = (props: any) => {

    // 년/월 필터
    const [isFilterDate, setIsFilterDate] = useState(true);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    // 검색
    const [searchFilter, setSearchFilter] = useState('');

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

        if (searchFilter && searchFilter.length > 0) {
            result = result.filter((el: any) => {
                const { subtitle, tag, title } = el.props['data-info'];

                if (subtitle?.indexOf(searchFilter) > -1) return true;
                if (tag?.indexOf(searchFilter) > -1) return true;
                if (title?.indexOf(searchFilter) > -1) return true;

                return false;
            })
        }

        return result;
    }

    let yearPrintValList: string[] = [];
    let monthPrintValList: string[] = [];

    return (
        <>
            <div className="flex align-middle justify-between border-b pt-1 px-2">
                <div>
                    <ToggleButton label={'년/월'} onClick={(e: any) => setIsFilterDate(!isFilterDate)} />
                </div>
                <form>
                    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                    <div className="relative mb-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input onChange={(e) => { setSearchFilter(e.target.value) }} type="search" id="search" className="block w-full p-4 sm:p-4 sm:pl-8 pl-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50" placeholder="Search" required />
                        {/* <button type="submit" className="text-white absolute right-2 bottom-2.5 bg-blue-700 font-medium rounded text-sm px-2 py-2"
                            onClick={() => setSearchFilter(inputValue)}
                        >Search</button> */}
                    </div>
                </form>
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
                        <div key={el?.props?.href + idx}>
                            {
                                isFilterDate && !isYearInclude &&
                                <span className="md:hidden lg:hidden text-slate-500 text-xl text-center pt-4 sm:block sm:pt-2">
                                    <span>{year}</span>
                                    <span className="text-slate-300 text-sm">
                                        ({yearArticleCnt[year]})
                                    </span>
                                </span>
                            }
                            <div className={isFilterDate ?
                                `flex justify-between p-4 pb-0 pl-0
                                    sm:p-2 sm:pb-0 sm:pl-0
                                ` : "block p-4 pb-0 pl-0 sm:p-2 sm:pb-0"}
                            >
                                {
                                    isFilterDate && <div className="
                                        w-1/5 flex flex-col justify-center px-4
                                        lg:text-2xl
                                        md:text-base
                                        sm:sm:text-sm sm:px-0
                                    ">
                                        {!isYearInclude ?
                                            <>
                                                <div className="
                                                    flex justify-between text-right
                                                    sm:flex-col sm:text-center
                                                ">
                                                    <span className="text-slate-500 text-center sm:hidden">
                                                        <span>{year}</span><br className="sm:hidden" />
                                                        <span className="text-slate-300 text-sm sm:text-xs">
                                                            ({yearArticleCnt[year]})
                                                        </span>
                                                    </span>
                                                    {
                                                        !isMonthInclude && (
                                                            <span className="text-orange-500">
                                                                <span>{month}</span><br className="sm:hidden" />
                                                                <span className="text-slate-300 text-sm sm:text-xs">({monthArticleCnt[year + '-' + month]})</span>
                                                            </span>
                                                        )
                                                    }
                                                </div>
                                            </>
                                            : <div className="text-slate-500 flex justify-end text-right sm:justify-center">
                                                {
                                                    !isMonthInclude && (
                                                        <span className="text-slate-500">
                                                            <span>{month}</span><br className="sm:hidden" />
                                                            <span className="text-slate-300 text-sm sm:text-xs">({monthArticleCnt[year + '-' + month]})</span>
                                                        </span>
                                                    )
                                                }
                                            </div>
                                        }
                                    </div>
                                }
                                <div className={isFilterDate ? "w-4/5" : ""}>
                                    {el}
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </>
    )
}

export default PostPreviewList;