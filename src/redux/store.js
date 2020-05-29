import { createStore, combineReducers } from "redux";

import pastasReducer from "./pastas/pastasReducer";
import allPostsReducer from "./posts/postsReducer";

const rootReducer = combineReducers({
  pastas: pastasReducer,
  posts: allPostsReducer,
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;