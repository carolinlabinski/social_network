import React from "react";
import jwt_decode from "jwt-decode";
import { Input } from "antd";
import { Button } from "antd";
import Cookies from "js-cookie";

const PostFrom = () => {
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
		}).then(console.log("post sent"));
	};

	const deleteTweet = () => {
		let tweet = document.getElementById("tweet").value;
		console.log(tweet);

		let jwt = Cookies.get("token");
		const data = {
			text: tweet,
			id: jwt_decode(jwt).id,
		};
		console.log(jwt_decode(jwt).id);

		const postId = "125";
		const url = "https://api-minireseausocial.mathis-dyk.fr/posts/" + postId;
		fetch(url, {
			method: "delete",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
			body: JSON.stringify(data),
		}).then(console.log("post 125 deleted"));
	};

	const modifyTweet = () => {
		let tweet = "THP finally tweetin (updated)";
		console.log(tweet);

		let jwt = Cookies.get("token");
		const data = {
			text: tweet,
			id: jwt_decode(jwt).id,
		};
		console.log(jwt_decode(jwt).id);

		const postId = "124";
		const url = "https://api-minireseausocial.mathis-dyk.fr/posts/" + postId;
		fetch(url, {
			method: "put",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
			body: JSON.stringify(data),
		}).then(console.log("post 125 deleted"));
	};

	return (
		<div>
			{/* <button onClick={deleteTweet}>test</button> */}
			<button onClick={modifyTweet}>modify tweet</button>
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
