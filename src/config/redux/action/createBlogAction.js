import axios from "axios"

export const setForm = (formType, formValue) => {
    return { type: 'SET_FORM_DATA', formType, formValue }
}

export const setImgPreview = (payload) => {
    return { type: 'SET_IMG_PREVIEW', payload }
}

export const postToAPI = (form) => {
    const token = localStorage.getItem('token');
    
    const data = new FormData()
    data.append('title', form.title)
    data.append('body', form.body)
    data.append('image', form.image)

    axios.post('https://mern-api.up.railway.app/v1/blog/post', data, {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            console.log('post success', res)
            alert('Create BLog Post Success')
            window.location.replace('/blog')
        })
        .catch(err => {
            console.log('err', err)
            alert(err.response.data.message)
        })
}

export const updateToAPI = (form, id) => {
    const token = localStorage.getItem('token');

    const data = new FormData()
    data.append('title', form.title)
    data.append('body', form.body)
    data.append('image', form.image)

    axios.put(`https://mern-api.up.railway.app/v1/blog/post/${id}`, data, {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            console.log('Update success', res)
            alert('Update Success')
            window.location.replace('/blog')
        })
        .catch(err => {
            console.log('err', err)
            alert(err.response.data.message)
        })
}