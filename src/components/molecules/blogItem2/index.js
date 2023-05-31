import React from "react";
import { BlogImg } from "../../../assets";
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';


const BlogItem2 = (props) => {

    return (
        <div className="blogItem-co">
            <div className="blogItem-wrapper">
                <div>
                    <p className="blogItem-title">{props.title}</p>
                    <p className="blogItem-dsc">{props.body}</p>
                    <p className="blogItem-author">By: {props.name} - {props.date}</p>
                </div>
                <img className="blog-img" src={props.img} />
            </div>
        </div>
    );
}

export default BlogItem2;