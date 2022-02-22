export const postReduer = (state, action) => {
    const {type, payload} = action

    switch(type) {
        case 'GET_POSTS':
            return {...state, post: payload, postLoading: false}
        case 'POST_LOADED_FAIL':
            return {...state, post: [], postLoading: false}
        case 'ADD_POST':
            return {...state, post: [...state.post, payload], postLoading: false}
        case 'DELETE_POST':
            return {
                ...state, 
                post: state.post.filter(post => post._id !== payload)
            }
        case 'UPDATE_POST':
            const newPost = state.post.map(post => post._id === payload._id ? payload : post)
            return {
                ...state, 
                post: newPost, 
                postLoading: false}
        case 'FIND_POST':
            return {...state, postFinded: payload}
        default:
            return state
    }
}