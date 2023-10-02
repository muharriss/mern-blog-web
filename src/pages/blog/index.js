import React, { useEffect, useState } from "react";
import { BlogItem, BtnDanger, Button, CommentItem, Footer, Header, Loading } from "../../components";
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './blog.css'
import { Gap } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { setDataBlog, setDataBlogUser } from "../../config/redux/action";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from "axios";
import { UseBodyScrollLock } from "../../config";

const Blog = () => {
    const { dataBlog, page } = useSelector(state => state.blogReducer)
    const { dataBlogUser, pageUser } = useSelector(state => state.blogUserReducer)
    const dispatch = useDispatch()
    const [counter, setCounter] = useState(page.currentPage)
    const [counter2, setCounter2] = useState(pageUser.currentPage)
    const [trigger, setTrigger] = useState(false)


    useEffect(() => {
        dispatch(setDataBlog(counter, setLoading))
        dispatch(setDataBlogUser(counter2, setLoading))
    }, [dispatch, counter, counter2])

    const previous = () => {
        setCounter(counter <= 1 ? 1 : counter - 1)
        // if(counter <= 1 ) {
        //     setCounter(1)
        // }
        setLoading(counter <= 1 ? true : false)
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
                        axios.delete(`https://mern-blog-api.cyclic.cloud/v1/blog/post/${id}`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            })
                            .then(res => {
                                console.log('delete success: ', res.data)
                                dispatch(setDataBlog(counter))
                                dispatch(setDataBlogUser(counter2))
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

    const previous2 = () => {
        setCounter2(counter2 <= 1 ? 1 : counter2 - 1)
        setLoading(counter2 <= 1 ? true : false)
    }

    const next2 = () => {
        setCounter2(counter2 !== pageUser.totalPage && pageUser.totalPage !== 0 ? counter2 + 1 : pageUser.totalPage)
        setLoading(counter2 !== pageUser.totalPage && pageUser.totalPage !== 0 ? false : true)
    }

    const [isLocked, scrollToggle] = UseBodyScrollLock()

    return (
        <div className="blog-co" >
            <div className={isLocked ? 'comment-action2' : 'comment-action'}>
                <CommentItem onClick={scrollToggle} />
            </div>
            <div>
                <Header />
                <div className='Parallax blog-intro'>
                    <p className='blog-title animate__animated animate__fadeIn animate__slow'>welcome to Our Blog</p>
                    {/* <div className='intro-line-wrapper'>
                        <p className='intro-line  animate__animated animate__bounce animate__slow'>|</p>
                    </div> */}
                </div>
                <div className="Parallax-c Bg-content">
                    <div className="gap-blog" />
                    <div className="button-filter-wrapper">
                        <button className={trigger ? "button-filter" : "button-filter2"} onClick={() => {
                            setTrigger(false)
                        }}>ALL</button>
                        <button className={trigger ? "button-filter2" : "button-filter"} onClick={() => {
                            setTrigger(true)
                        }} >YOUR BLOG</button>
                    </div>
                    {/* <Gap height={150} /> */}
                    {/* <div className="gap-blog" /> */}
                    <div className="blogLink-wrapper">
                        <div className={trigger && pageUser.totalPage === 0 ? "no-blog" : "no-blog2"}>Create your first Blog  <Link to='/blog/create-blog'>here!</Link></div>
                        {/* {loading ? dataBlog.map(blog => {
                            return <BlogItem key={blog._id}
                                img={`https://mern-api.up.railway.app/${blog.image}`}
                                title={blog.title}
                                body={blog.body}
                                name={blog.author.name}
                                date={blog.createdAt}
                                _id={blog._id}
                                onDelate={confirmDelate}
                            />
                        }) : <div className="loading-blog"><Loading /></div>} */}
                        {
                            loading ? trigger ? dataBlogUser.map(blog => {
                                return <BlogItem key={blog._id}
                                    // img={`http://localhost:4000/${blog.image}`}
                                    img={blog.image}
                                    title={blog.title}
                                    body={blog.body}
                                    name={blog.author.name}
                                    date={blog.createdAt}
                                    _id={blog._id}
                                    onDelate={confirmDelate}
                                    onClick={scrollToggle}
                                    totalComment={blog.comment}
                                />
                            }) : dataBlog.map(blog => {
                                return <BlogItem key={blog._id}
                                    // img={`http://localhost:4000/${blog.image}`}
                                    img={blog.image}
                                    title={blog.title}
                                    body={blog.body}
                                    name={blog.author.name}
                                    date={blog.createdAt}
                                    _id={blog._id}
                                    onDelate={confirmDelate}
                                    onClick={scrollToggle}
                                    totalComment={blog.comment}
                                />
                            }) : <div className="loading-blog"><Loading /></div>
                        }

                    </div>
                    <div className="pagination-co">
                        <div className="pagination-wrapper">
                            <div className="button-modified2">
                                <Link to='/blog/create-blog'>
                                    <Button onClick={() => {
                                        window.location.replace("/blog/create-blog")
                                    }} title='Create Blog' />
                                </Link>
                                <Link>
                                    <BtnDanger title='Logout' onClick={logout} />
                                </Link>
                            </div>

                            <div >
                                <Button title='<' onClick={trigger ? previous2 : previous} />
                                {/* <Button title='<' onClick={previous} /> */}
                            </div>
                            {/* <p className="pagination-page">{page.currentPage} / {page.totalPage}</p> */}
                            <p className="pagination-page">{trigger ? pageUser.currentPage : page.currentPage} / {trigger ? pageUser.totalPage : page.totalPage}</p>
                            <div >
                                {/* <Button title='>' onClick={next} /> */}
                                <Button title='>' onClick={trigger ? next2 : next} />
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