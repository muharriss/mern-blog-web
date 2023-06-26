const initialStateBlog = {
    dataBlogUser: [],
    pageUser: {
        currentPage: 1,
        totalPage: 1
    }
}

const blogUserReducer = (state = initialStateBlog, action) => {
    if(action.type === 'UPDATE_DATA_BLOG_USER') {
        return {
            ...state,
            dataBlogUser: action.payload
        }
    }

    if(action.type === 'UPDATE_PAGE_USER') {
        return {
            ...state,
            pageUser: action.payload
        }
    }

    return state
}

export default blogUserReducer