"use client";
import { useEffect, useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ChildrenNode {
    className: string;
    children: string | string[];
}
export const CodeBlock = ({ className, children }: ChildrenNode) => {
    const [style, setStyle] = useState(vscDarkPlus);

    useEffect(() => {
        setStyle(vscDarkPlus);
    }, []);

    return (
        <SyntaxHighlighter language={className} style={style}>
            {children}
        </SyntaxHighlighter>
    );
};

export const PreBlock = ({ children, ...rest }: any) => {
    const [classValue, setClassValue] = useState(children["props"]?.className);

    // https://nextjs.org/docs/messages/react-hydration-error
    useEffect(() => {
        let lang = "text";
        if (classValue && classValue.startsWith("lang-")) {
            lang = classValue.replace("lang-", "");
            setClassValue(lang.toLowerCase());
        }
    }, [children["props"]?.className]);

    if ("type" in children && children["type"] === "code") {
        return (
            <CodeBlock
                className={classValue}
                children={children["props"]?.children}
            />
        );
    }
    return <div {...rest}>{children}</div>;
};
