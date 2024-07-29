import {GetServerSideProps, NextPage} from "next";
import { type } from "os";
import { useEffect, useState } from "react";
import styles from "./index.module.css"

type Props = {
    initialImageURL: string;
}

const IndexPage: NextPage<Props> = ({initialImageURL}) => {
    const [imageUrl,setImageUrl] = useState(initialImageURL);
    const [loading,setLoading] = useState(false);

    // useEffect(() => {
    //     fetchImage().then((newImage) =>{
    //         setImageUrl(newImage.url);
    //         setLoading(false);
    //     });
    // }, []);

    const handleClick = async () => {
        setLoading(true);
        const newImage = await fetchImage();
        setImageUrl(newImage.url);
        setLoading(false);
    };
    return (
        <div className={styles.page}>
            <button onClick={handleClick} className={styles.button}>他の猫も見る</button>
            <div className={styles.frame}>{loading || <img src={imageUrl} className={styles.img} />}</div>
        </div>
    );
};
    export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
        const image = await fetchImage();
        return{
            props: {
                initialImageURL: image.url,
            },
        };
    };




type Image = {
    url:string;
};

const fetchImage = async (): Promise<Image> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await res.json();
    console.log(images);
    return images[0];
};


