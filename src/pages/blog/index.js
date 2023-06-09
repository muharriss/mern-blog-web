import React, { useEffect, useState } from "react";
import { BlogItem, BtnDanger, Button, Footer, Header, Loading } from "../../components";
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './blog.css'
import { Gap } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { setDataBlog } from "../../config/redux/action";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from "axios";

const Blog = () => {
    const [counter, setCounter] = useState(1)
    const { dataBlog, page } = useSelector(state => state.blogReducer)
    const dispatch = useDispatch()

    console.log('page,', page)

    useEffect(() => {
        dispatch(setDataBlog(counter, setLoading))
    }, [dispatch, counter])
    console.log('current page', counter);

    const previous = () => {
        setCounter(counter <= 1 ? 1 : counter - 1)
        // if(counter <= 1 ) {
        //     setCounter(1)
        // }
        setLoading(counter <= 1 ? true : false )
    }

    const next = () => {
        setCounter(counter !== page.totalPage ? counter + 1 : page.totalPage)
        // if(counter === page.totalPage) {
        //     setCounter(page.totalPage)
        // }
        setLoading(counter !== page.totalPage ? false : true)
    }

    const confirmDelate = (id) => {
        confirmAlert({
            title: 'Confirm to Delate',
            message: 'Apakah Anda Yakin Ingin Menghapus post ini? ',
            buttons: [
                {
                    label: 'Ya',
                    onClick: () => {
                        const token = localStorage.getItem('token');
                        axios.delete(`https://mern-api.up.railway.app/v1/blog/post/${id}`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            })
                            .then(res => {
                                console.log('delete success: ', res.data)
                                dispatch(setDataBlog(counter))
                            })
                            .catch(err => {
                                console.log('err: ', err)
                                alert(err.response.data.message)

                            })
                    }
                },
                {
                    label: 'Tidak',
                    onClick: () => console.log('user tidak setuju')
                }
            ]
        });
    }

    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }

    const token = localStorage.getItem('token')
    if (!token) {
        window.location.replace('/blog/login')

    }

    const [loading, setLoading] = useState(false)

    return (
        <div>
            <div>
                <Header />
                <div className='Parallax blog-intro'>
                    <p className='blog-title animate__animated animate__fadeIn animate__slow'>welcome to Our Blog</p>
                    {/* <div className='intro-line-wrapper'>
                        <p className='intro-line  animate__animated animate__bounce animate__slow'>|</p>
                    </div> */}
                </div>
                <div className="Parallax-c Bg-content">
                    {/* <Gap height={150} /> */}
                    <div className="gap-blog"/>
                    <div className="blogLink-wrapper">
                        {loading ? dataBlog.map(blog => {
                            return <BlogItem key={blog._id}
                                img={`https://mern-api.up.railway.app/${blog.image}`}
                                title={blog.title}
                                body={blog.body}
                                name={blog.author.name}
                                date={blog.createdAt}
                                _id={blog._id}
                                onDelate={confirmDelate}
                            />
                        }) : <div className="loading-blog"><Loading/></div> }
                    </div>
                    <div className="pagination-co">
                        <div className="pagination-wrapper">
                            <div className="button-modified2">
                                <Link to='/blog/create-blog'>
                                    <Button title='Create Blog' />
                                </Link>
                                <Link>
                                    <BtnDanger title='Logout' onClick={logout} />
                                </Link>
                            </div>

                            <div >
                                <Button title='<' onClick={previous} />
                            </div>
                            <p className="pagination-page">{page.currentPage} / {page.totalPage}</p>
                            <div >
                                <Button title='>' onClick={next} />
                            </div>


                        </div>
                    </div>
                    {/* <Gap height={100} /> */}
                    <div className="gap-blog2"></div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Blog;