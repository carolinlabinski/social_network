//import React from "react";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import jwt_decode from "jwt-decode";
import MyPosts from "../../components/MyPosts/MyPosts.jsx";

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 8 },
};
const tailLayout = {
	wrapperCol: { offset: 4, span: 8 },
};

const Profile = () => {
	const [dataUser, setDataUser] = useState("");
	const [dataMail, setDataMail] = useState("");
	const [dataDescription, setDataDescription] = useState("");

	//getProfile
	useEffect(() => {
		let jwt = Cookies.get("token");

		fetch("https://api-minireseausocial.mathis-dyk.fr/users/me", {
			method: "get",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((post) => {
				console.log(post);
				console.log(post.username);
				console.log(post.user);
				console.log(post.email);
				setDataUser(post.username);
				setDataMail(post.email);
				setDataDescription(post.description);
				console.log("Cookies get:" + Cookies.get("token"));
			})
			.then((posts) => {
				console.log(posts);
			});
	}, []);

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const onFinish = (values) => {
		console.log("Success:", values);
		setDataUser(values.username);
		setDataDescription(values.description);

		const data = {
			username: values.username,
			description: values.description,
		};
		console.log("data" + data.username);
		let jwt = Cookies.get("token");
		const userId = jwt_decode(jwt).id;
		const profileUrl =
			"https://api-minireseausocial.mathis-dyk.fr/users/" + userId;
		console.log(profileUrl);

		fetch(profileUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`,
			},
			body: JSON.stringify(data),
		}).then((res) => res.json());
	};

	return (
		<div>
			<h1>My Profile</h1>
			<p>Username: {dataUser}</p>
			<p>Mail address: {dataMail}</p>
			<p>Profile description: {dataDescription}</p>
			<Form
				{...layout}
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label="Username"
					name="username"
					// rules={[{ required: true, message: "Please input your username!" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Description"
					name="description"
					// rules={[{ required: true, message: "Please input your email!" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					{...tailLayout}
					name="remember"
					valuePropName="checked"
				></Form.Item>

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
			<MyPosts />
		</div>
	);
};

export default Profile;
