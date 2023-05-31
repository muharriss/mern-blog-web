import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { About, Blog, CreateBlog, DetailBlog, Home, Login, Register } from '../../pages';
import { DetailBlogItem, DetailBlogItem2, DetailBlogItem3  } from '../../components';

const Navigation = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about/*" element={<About/>} />
                <Route path="blog/*" element={<Blog/>} />
                <Route path="blog/login/*" element={<Login />} />
                <Route path="blog/register/*" element={<Register />} />
                <Route path="blog/create-blog/:id/*" element={<CreateBlog />} />
                <Route path="blog/create-blog/*" element={<CreateBlog />} />
                <Route path="blog/detail/:id/*" element={<DetailBlog />} />
                {/* <Route path="blog/detail-2/*" element={<DetailBlogItem2 />} />
                <Route path="blog/detail-3/*" element={<DetailBlogItem3 />} /> */}
            </Routes>
        </Router>
    )
}

export default Navigation;