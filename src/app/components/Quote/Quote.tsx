import quotes from './quotes.json';
import styles from './index.module.scss';
import {Typography} from "antd";
import {useEffect, useState} from "react";
import {renderMapGraph} from "@/app/block/Map/util";

const { Link } = Typography

const Quote: React.FC = () => {

    const [text, setText] = useState<string>();
    const [avatarImg, setAvatarImg] = useState<string>()

    useEffect(() => {
        const index = Math.floor(Math.random() * quotes.length);
        setText(quotes[index]);
        setAvatarImg(`./${Math.ceil(Math.random() * 4)}.png`)
    }, []);

    return (
       <>
           {
               text && (
                   <p className={styles.tips}>
                       <img src={avatarImg} alt="people" />
                       <div className={styles.content}>
                           { text }
                           <span> — <Link href="https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md" target="_blank">CKB Whitepaper, 2018</Link></span>
                       </div>
                   </p>
               )
           }
       </>
    )
}

export default Quote