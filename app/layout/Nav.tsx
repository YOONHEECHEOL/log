"use client";

import { useEffect, useState } from "react";

const Nav = (props: any) => {
    const printMonthList = (thisMonth: string) => {
        let leftSide = [];
        let rightSide = [];

        // 총 13개
        let left = Number(thisMonth);
        let leftCnt = 0;
        let right = Number(thisMonth);
        let rightCnt = 0;

        for (let i = 1; i < 7; i++) {
            if (left - i > 0) {
                leftSide.unshift(left - i);
            } else {
                leftSide.unshift(12 - leftCnt);
                leftCnt++;
            }

            if (right + i <= 12) {
                rightSide.push(right + i);
            } else {
                rightSide.push(1 + rightCnt);
                rightCnt++;
            }
        }

        return [...leftSide, Number(thisMonth), ...rightSide];
    };

    return (
        <div className="pb-2 sm:pb-2">
            <div className="flex justify-between content-center px-4 py-1 border-b bg-slate-200">
                <button
                    className="block cursor-pointer p-1 text-slate-500"
                    onClick={() =>
                        props.setSelectedYear(
                            String(Number(props.selectedYear) - 1)
                        )
                    }
                >
                    {String(Number(props.selectedYear) - 1)}
                </button>
                <div className="p-1 cursor-pointer font-bold">
                    {props.selectedYear}
                </div>
                <button
                    className="p-1 cursor-pointer text-slate-500"
                    onClick={() =>
                        props.setSelectedYear(
                            String(Number(props.selectedYear) + 1)
                        )
                    }
                >
                    {String(Number(props.selectedYear) + 1)}
                </button>
            </div>
            <div className="flex justify-between px-4 py-1 border-b bg-slate-50">
                {printMonthList(props.selectedMonth).map((x, idx) => {
                    const key = x + "_" + idx;
                    const monthStr =
                        String(x).length >= 2 ? String(x) : "0" + x;

                    const isCenter = idx === 6;
                    let far = `text-slate-100 px-4`;
                    if (idx === 0 || idx === 12)
                        far = `cursor-pointer text-slate-100 text-center sm:hidden`;
                    if (idx === 1 || idx === 11)
                        far = `cursor-pointer text-slate-200 text-center sm:hidden`;
                    if (idx === 2 || idx === 10)
                        far = `cursor-pointer text-slate-300 text-center sm:hidden`;
                    if (idx === 3 || idx === 9)
                        far = `cursor-pointer text-slate-400 text-center sm:hidden`;
                    if (idx === 4 || idx === 8)
                        far = `cursor-pointer text-slate-500 text-center`;
                    if (idx === 5 || idx === 7)
                        far = `cursor-pointer text-slate-600 text-center`;

                    const textStyle = !isCenter
                        ? far
                        : `cursor-pointer text-center text-orange-500 font-bold`;

                    return (
                        <div
                            key={key}
                            className={textStyle}
                            onClick={() => props.setSelectedMonth(monthStr)}
                        >
                            {monthStr}(
                            {
                                props.monthArticleCnt[
                                    props.selectedYear + "-" + monthStr
                                ]
                            }
                            )
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Nav;
