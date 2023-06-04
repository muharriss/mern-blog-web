import React, { useState } from "react";
import { BlogImg } from "../../../assets";
import './blogItem.css'
import { BrowserRouter as Router, Link, Route, Routes, useParams } from 'react-router-dom';


const BlogItem = (props) => {
    const margin = {
        margin: 100
    }

    const [toggle, setToggle] = useState(false)

    const handleToggle = () => {
        setToggle(!toggle)
        console.log('toggle', toggle)

    }

    return (
        <div className="blogItem-container">
            <div>
                <div className="blogItem-ellipsis-wrapper">
                    <div className="blogItem-ellipsis-title">
                        <p className="blogItem-title-component">title</p>
                    </div>
                    <div className={toggle ? 'margin2' : 'margin1'} >
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
                <div className="dsc-wrapper">
                    <div className="dcs-author-wrapper">
                        <p className="blogItem-author">By : {props.name} - {props.date}</p>
                    </div>
                    <div className="ellipsis-2">
                        <div className={toggle ? 'margin2' : 'margin1'} >
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