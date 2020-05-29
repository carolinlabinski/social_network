import React from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { Input, Button } from "antd";
import Cookies from "js-cookie";

import { createPost } from "../../redux"


const PostFrom = () => {
	const dispatch = useDispatch();

	
	const sendTweet = () => {

		let tweet = document.getElementById("tweet").value;
		console.log(tweet);

		let jwt = Cookies.get("token");
		const data = {
			text: tweet,
			id: jwt_decode(jwt).id,
		};
		console.log(jwt_decode(jwt).id);

		fetch("https://api-minireseausocial.mathis-dyk.fr/posts", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
			body: JSON.stringify(data),
		})

		.then((res) => res.json())
		.then((response) => {
			dispatch(createPost(response))
		});
	};

	return (
		<div>
			<h3 style={{ marginLeft: "50px" }}>Let's tweet</h3>
			<Input
				id="tweet"
				type="text"
				style={{ width: "500px", marginLeft: "50px" }}
				placeholder="What's on your mind?"
			/>
			<Button onClick={sendTweet} type="primary">
				Send tweet
			</Button>
		</div>
	);
};
export default PostFrom;
