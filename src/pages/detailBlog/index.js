import React, { useEffect, useState } from "react";
import './detailBlog.css'
import { BlogImg } from "../../assets";
import { DetailBlogItem, Footer, Header, Loading } from "../../components";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailBlog = () => {
    const token = localStorage.getItem('token');
    const params = useParams()
    const [data, setData] = useState({})
    useEffect(() => {
        const id = params.id
        axios.get(`https://mern-blog-api-server.vercel.app/v1/blog/post/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                console.log('success:', res)
                setData(res.data.data)
            })
            .catch(err => {
                console.log('err:', err)
            })
    }, [params])
    // const image = `http://localhost:4000/${data.image}`
    const image = data.image
    // const image = data.image ? encodeURI(`http://localhost:4000/${data.image.replace("\\", "/")}`) : '';
    // const image = data.image ? encodeURI(data.image.replace("\\", "/")) : '';
    if (data.author) {
        return (
            <div  >
                <Header />
                <div className="Parallax" style={{ backgroundImage: `url(${image})` }} >
                    <p className="blog-title animate__animated animate__fadeIn animate__slow">{data.title}</p>
                </div>
                <div className="detailBlog-co">
                    <div className="detailBlog-wrapper">
                        {/* <p className="detailBlog-dsc">{data.body}</p>                    */}
                        <p className="detailBlog-dsc">
                            {data.body.split("\n").map((item, key) => {
                                return (
                                    <React.Fragment key={key}>
                                        {item}
                                        <br />
                                    </React.Fragment>
                                );
                            })}
                        </p>
                        <p className="detailBlog-author">By: {data.author.name}</p>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    return <div className="loading-detailBlog"><Loading/></div>
}

export default DetailBlog