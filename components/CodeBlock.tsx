'use client'
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChildrenNode {
    className: string;
    children: string | string[];
}
export const CodeBlock = ({ className, children }: ChildrenNode) => {
    let lang = 'text';

    if (className && className.startsWith('lang-')) {
        lang = className.replace('lang-', '');
    }

    return (
        <SyntaxHighlighter language={lang} style={materialDark}>
            {children}
        </SyntaxHighlighter>
    );
}

export const PreBlock = ({ children, ...rest }: any) => {
    if ('type' in children && children['type'] === 'code') {
        return CodeBlock(children['props']);
    }
    return <pre {...rest}>{children}</pre>;
};