"use client";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ChildrenNode {
    className: string;
    children: string | string[];
}
export const CodeBlock = ({ className, children }: ChildrenNode) => {
    let lang = "text";

    // console.log(className);
    if (className && className.startsWith("lang-")) {
        lang = className.replace("lang-", "");
    }
    // console.log(lang);

    return (
        <>
            <SyntaxHighlighter
                language={lang.toLowerCase()}
                style={materialDark}
            >
                {children}
            </SyntaxHighlighter>
        </>
    );
};

export const PreBlock = ({ children, ...rest }: any) => {
    if ("type" in children && children["type"] === "code") {
        // console.log(children["props"]?.className);

        return (
            <CodeBlock
                className={"language-javascript"}
                children={children["props"]?.children}
            />
        );
    }
    return <pre {...rest}>{children}</pre>;

    // return CodeBlock(children["props"]);
};
