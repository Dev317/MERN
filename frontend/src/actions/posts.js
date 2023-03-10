import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../api';

// action creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (err) {
        console.log(err.message);
    }
}

export const createPost = (newPost) => async (dispatch) => {
    try {
        const { data } = await api.createPost(newPost);
        dispatch({ type: CREATE, payload: data });
    } catch (err) {
        console.log(err.message);
    }
}

export const updatePost = (id, updatePost) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, updatePost);
        dispatch({ type: UPDATE, payload: data });
    } catch (err) {
        console.log(err.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (err) {
        console.log(err.message);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKE, payload: data });
    } catch (err) {
        console.log(err.message);
    }
}
