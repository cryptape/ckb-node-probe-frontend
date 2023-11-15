import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import H1 from '../app/components/H1/H1'
import CodeBlock from '@/app/components/CodeBlock/CodeBlock'
import BreadCrumbs from "@/app/components/BreadCrumbs/BreadCrumbs";
import Tips from '@/app/components/Tips/Tips'
import '../styles/findNode.scss'
import TipsArea from "@/app/components/TipsArea/TipsArea";
import MarginContainer from "@/app/components/MarignContainer/MarginContainer";
import GetRequestInfo from '@/app/components/GetRequestInfo/GetRequestInfo';

const components = {
    h1: H1,
    pre: CodeBlock,
    Tips:Tips,
    TipsArea: TipsArea,
    MarginContainer: MarginContainer,
    GetRequestInfo: GetRequestInfo
}

interface PostPageProps {
    mdxSource: MDXRemoteSerializeResult;
}

const getConnectedInstruction: React.FC<PostPageProps> = ({ mdxSource }) => {

    return (
        <div className="markdown-wrapper">
            <BreadCrumbs />
            {/*@ts-ignore*/}
            <MDXRemote {...mdxSource} components={components} />
        </div>
    )
}

export async function getStaticProps() {
    const mdxSource = await serialize(fs.readFileSync(path.join(process.cwd(), 'src', 'docs', 'getConnectedInstruction.mdx'), 'utf8'))
    return { props: { mdxSource } }
}

export default getConnectedInstruction
