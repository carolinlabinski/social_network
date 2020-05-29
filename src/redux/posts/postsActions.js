import { GET_POSTS } from "./postsType";
import { CREATE_POST } from "./postsType";


export const getPosts = (data) => {
	return {
		type: GET_POSTS,
		posts: data,
	};
};

export const createPost = (newPost) => {
	
	return {
		type: CREATE_POST,
		newPost,
	};
};
