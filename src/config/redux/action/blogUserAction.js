import axios from "axios"

export const setDataBlogUser = (pageUser, setLoading) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        axios.get(`https://mern-api.up.railway.app/v1/blog/posts/user?page=${pageUser}&perPage=3&sort_by=createdAt&sort_order=desc`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(result => {
                const responseAPI = result.data
                console.log('data API user', responseAPI)
                dispatch({ type: 'UPDATE_DATA_BLOG_USER', payload: responseAPI.data })
                dispatch({
                    type: 'UPDATE_PAGE_USER',
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