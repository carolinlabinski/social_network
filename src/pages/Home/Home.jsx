import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import PostForm from "../../components/PostForm/PostForm.jsx";
import { useSelector } from "react-redux";

const Home = () => {
	const pastas = useSelector((state) => state.pastas);
	console.log("Check cookies on home:" + Cookies.get("token"));
	console.log("Check cookies still home:" + Cookies.get("token"));
	const [dataPost, setDataPost] = useState([]);

	useEffect(() => {
		fetch(
			"https://api-minireseausocial.mathis-dyk.fr/posts?_limit=50&_sort=created_at:desc"
		)
			.then((res) => res.json())
			.then((post) => {
				console.log(post);
				console.log("hello");
				setDataPost(post);
			});
	}, []);

	return (
		<div>
			<br />
			<h1 style={{ marginLeft: "50px" }}>Welcome to THP's Social Network</h1>
			<p style={{ marginLeft: "50px" }}>
				This website is a training to Redux and React. We use auth and routing to
				create a small social media website.
			</p>
			{pastas === "authenticated" && <PostForm />}
			<br />
			<h3 style={{ marginLeft: "50px" }}>Latest posts of the THP community:</h3>
			{dataPost.map((post, key) => (
				<div key={key}>
					<h5 style={{ marginLeft: "50px" }}>{post.text}</h5>
					<h3 style={{ marginLeft: "50px", color: "red" }}>{post.id}</h3>
					{/* <h3 style={{ marginLeft: "50px", color: "red" }}>{post[0].user.id}</h3> */}
					{/* <h3 style={{ marginLeft: "50px", color: "red" }}>{post}</h3> */}
				</div>
			))}
		</div>
	);
};
export default Home;
