import React, { useEffect, useState, useContext } from "react";
import { Button, Footer, Gap, Header, Input, Loading, TextArea, Upload } from "../../components";
import './createBlog.css'
import { useDispatch, useSelector } from "react-redux";
import { postToAPI, setForm, setImgPreview, updateToAPI } from "../../config/redux/action";
import { useParams } from "react-router-dom";
import axios from "axios";


const CreateBlog = () => {
    const { form, imgPreview } = useSelector(state => state.createBlogReducer)
    const { title, body, image } = form
    const dispatch = useDispatch()

    const [isUpdate, setIsUpdate] = useState(false)

    const params = useParams()
    const id = params.id
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (params.id) {
            setIsUpdate(true)
            axios.get(`https://mern-api.up.railway.app/v1/blog/post/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    const data = res.data.data
                    dispatch(setForm('title', data.title))
                    dispatch(setForm('body', data.body))
                    dispatch(setImgPreview(`https://mern-api.up.railway.app/${data.image}`))
                    console.log('res:', data)
                })
                .catch(err => {
                    console.log('err:', err)
                })
        }
    }, [params])

    const [loading, setLoading] = useState(false)
    const onSubmit = () => {
                
        if (isUpdate) {
            console.log('update data')
            updateToAPI(form, id, setLoading)
        } else {
            console.log('create data')
            postToAPI(form, setLoading)
        }
    }

    const onImageUpload = (e) => {
        const file = e.target.files[0]
        dispatch(setForm('image', file))
        dispatch(setImgPreview(URL.createObjectURL(file)))
    }

    return (
        <div>
            <div className={loading ? 'edit-component' : 'edit-component2'}></div>
            <Header />
            <div className="createBlog-co">
                <div className="createBlog-wrapper">
                    <Gap height={70} />
                    <p className="title">{isUpdate ? 'Update BLog Post' : 'Create New Blog Post'}</p>
                    <Gap height={20} />
                    <Input label='Post Title' value={title} onChange={(e) => dispatch(setForm('title', e.target.value))} />
                    <Gap height={20} />
                    <Upload onChange={(e) => onImageUpload(e)} img={imgPreview} />
                    <Gap height={20} />
                    <TextArea value={body} onChange={(e) => dispatch(setForm('body', e.target.value))} />
                    <Gap height={20} />
                    <div className="button-modified">
                        <Button title={isUpdate ? 'UPDATE' : 'SAVE'} onClick={onSubmit} />
                    </div>
                    <Gap height={100} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CreateBlog