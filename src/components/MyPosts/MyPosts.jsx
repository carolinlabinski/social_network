import Cookies from "js-cookie";
import React, { useEffect } from "react";

const MyPosts = () => {
	//getMyPosts
	useEffect(() => {
		let jwt = Cookies.get("token");
		const myUsername = "jean-paul";
		const url = "https://api-minireseausocial.mathis-dyk.fr/user/" + myUsername;
		console.log("jwt decoded" + myUsername);

		fetch(url, {
			method: "get",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((post) => {
				console.log("test" + post);
				console.log("Cookies get:" + Cookies.get("token"));
			})
			.then((posts) => {
				console.log(posts);
			});
	}, []);

	return <div>{/* <h1>My tweets:</h1> */}</div>;
};

export default MyPosts;
