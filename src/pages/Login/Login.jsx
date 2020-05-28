import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import Cookies from "js-cookie";
//import React, { useState, useEffect } from "react";

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 8 },
};
const tailLayout = {
	wrapperCol: { offset: 4, span: 8 },
};

const Login = () => {
	const onFinish = (values) => {
		console.log("Success:", values);
		console.log(values.identifier);
		console.log(values.password);

		const data = {
			identifier: values.identifier,
			password: values.password,
		};

		// let jwt = Cookies.get("token");
		// console.log("test token" + jwt);
		fetch("https://api-minireseausocial.mathis-dyk.fr/auth/local/", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((post) => {
				console.log(post);
				console.log("I am connected.");
				console.log(post.jwt);
				Cookies.set("token", post.jwt);
				console.log("Cookies get:" + Cookies.get("token"));
			});
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div>
			<br />
			<Link to="/login">Already registerd? Login here</Link>
			<Form
				{...layout}
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item label="Email or username" name="identifier">
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: "Please input your password!" }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item {...tailLayout} name="remember" valuePropName="checked">
					<Checkbox>Remember me</Checkbox>
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};
export default Login;
