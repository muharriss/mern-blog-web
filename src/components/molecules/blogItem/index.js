import React, { useState } from "react";
import { BlogImg } from "../../../assets";
import './blogItem.css'
import { BrowserRouter as Router, Link, Route, Routes, useParams } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from "react-redux";


const BlogItem = (props) => {
    const dispatch = useDispatch()
    const margin = {
        margin: 100
    }

    const [toggle, setToggle] = useState(false)

    const handleToggle = () => {
        setToggle(!toggle)
        console.log('toggle', toggle)

    }

    const [commentToggle, setCommentToggle] = useState(false)
    const [likeToggle, setLikeToggle] = useState(false)

    const handleCommentToggle = () => {
        setCommentToggle(!commentToggle)
        console.log('comment toggle', commentToggle)
    }
    const handleLikeToggle = () => {
        setLikeToggle(!likeToggle)
        console.log('like toggle', likeToggle)
    }

    const token = localStorage.getItem('token');
    const handleHidden = () => {
        axios.put(`https://mern-blog-api.cyclic.cloud/v1/blog/post/${props._id}/status`, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                console.log('success', res)
                dispatch(props.refresh)
            })
            .catch(err => {
                console.log("err", err)
            })
    }

    if (!Array.isArray(props.totalComment)) {
        return <p className="invalid">Data tidak valid</p>;
    }

    let totalCount = 0;
    for (const comment of props.totalComment) {
        totalCount++;
        if (comment.reply) {
            totalCount += comment.reply.length;
        }
    }

    return (
        <div className="blogItem-container">
            <div>
                <div className="blogItem-ellipsis-wrapper">
                    <div className="blogItem-ellipsis-title">
                        <p className="blogItem-title-component">title</p>
                    </div>
                    <div className={toggle ? 'margin2' : 'margin1'} >
                        <span onClick={handleHidden} className="material-symbols-outlined">
                            {props.hidden == true ? toggle ? "public_off" : "" : toggle ? "public" : ""}
                        </span>
                        <p><Link to={`/blog/create-blog/${props._id}`} className="update">{toggle ? "Update" : ''}</Link></p>
                        <p className="line" >{toggle ? '|' : ''}</p>
                        <p className="delate" onClick={() => props.onDelate(props._id)}>{toggle ? 'Delate' : ''}</p>
                        <p onClick={handleToggle} className="ellipsis">︙</p>
                    </div>
                </div>
                <Link to={`/blog/detail/${props._id}`} >
                    <div className="blogItem-wrapper">
                        <img className="blog-img" src={props.img} />
                        <div className="blogItem-content">
                            <p className="blogItem-title">{props.title}</p>
                            <div className="blogItemDsc-wrapper">
                                <p className="blogItem-dsc">{props.body}</p>
                            </div>
                            <p className="view-detail">..view detail</p>
                            <div className="blogitem-author-wrapper">
                                <p className="blogItem-author">By : {props.name} - {props.date}</p>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="comment-wrapper">
                    <div className="mLeft-7">
                        <Link to={`${props._id}`} >
                            <span onClick={props.onClick} className="material-symbols-outlined">
                                comment
                            </span>
                        </Link>
                    </div>
                    <p className="count-comment">{totalCount}</p>
                    {/* <span onClick={handleLikeToggle} className="material-symbols-outlined">
                        favorite
                    </span>
                    <p className="count-comment">2</p> */}
                </div>
                <div className="dsc-wrapper">
                    <div className="dcs-author-wrapper">
                        <p className="blogItem-author">By : {props.name} - {props.date}</p>
                    </div>
                    <div className="blogItem-more">
                        <div className="comment-wrapper2">
                            <div className="mLeft-7">
                                <Link to={`${props._id}`} >
                                    <span onClick={props.onClick} className="material-symbols-outlined">
                                        comment
                                    </span>
                                </Link>
                            </div>
                            <p className="count-comment">{totalCount}</p>
                            {/* <span onClick={handleLikeToggle} className="material-symbols-outlined">
                                favorite
                            </span>
                            <p className="count-comment">2</p> */}
                        </div>
                        <div className={toggle ? 'margin2' : 'margin1'} >
                            <span onClick={handleHidden} className="material-symbols-outlined">
                                {props.hidden == true ? toggle ? "public_off" : "" : toggle ? "public" : ""}
                            </span>
                            <p><Link to={`/blog/create-blog/${props._id}`} className="update">{toggle ? "Update" : ''}</Link></p>
                            <p className="line" >{toggle ? '|' : ''}</p>
                            <p className="delate" onClick={() => props.onDelate(props._id)}>{toggle ? 'Delate' : ''}</p>
                            <p onClick={handleToggle} className="ellipsis">︙</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default BlogItem;