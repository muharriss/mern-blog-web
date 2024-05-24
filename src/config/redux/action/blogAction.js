import axios from "axios"

export const setDataBlog = (page, setLoading) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        axios.get(`https://mern-blog-api-server.vercel.app/v1/blog/posts?page=${page}&perPage=3&sort_by=createdAt&sort_order=desc`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(result => {
                const responseAPI = result.data
                console.log('data API', responseAPI)
                dispatch({ type: 'UPDATE_DATA_BLOG', payload: responseAPI.data })
                dispatch({
                    type: 'UPDATE_PAGE',
                    payload: {
                        currentPage: responseAPI.current_page,
                        totalPage: Math.ceil(responseAPI.total_data / responseAPI.per_page)
                    }
                })
            })
            .catch(err => {
                console.log('error', err)
            })
            .finally(() => {
                setLoading(true);
            });
    }
}

