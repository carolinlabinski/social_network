import { GET_POSTS } from "./postsType";
import { CREATE_POST } from "./postsType";


const initialState = {
	posts: [],
};

const allPostsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_POSTS:
			return {
				...state,
				posts: action.posts,
			};

		case CREATE_POST:
			return {
				...state,
				posts: [action.newPost, ...state.posts]
			}

			
		default:
			return state;
	}
};

export default allPostsReducer;