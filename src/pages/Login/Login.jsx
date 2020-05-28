import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import Cookies from "js-cookie";
import { buyPastas } from "../../redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { eatPastas } from "../../redux";
// import { logIn } from "../../redux";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import React, { useEffect } from "react";

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 8 },
};
const tailLayout = {
	wrapperCol: { offset: 4, span: 8 },
};
// const authenticated = useSelector((state) => state.authenticated);
// const dispatch = useDispatch();
// useEffect(() => {
// 	console.log(authenticated);
// }, []);

const Login = () => {
	const pastas = useSelector((state) => state.pastas);
	const dispatch = useDispatch();
	// const authenticated = useSelector((state) => state.authenticated);
	// const dispatch = useDispatch();
	// console.log("status" + authenticated);

	const onFinish = (values) => {
		dispatch(buyPastas());
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
			<h2>Hook: number of pastas kg : {pastas} </h2>
			<button onClick={() => dispatch(buyPastas())}>buy pastas</button>
			<button onClick={() => dispatch(eatPastas())}>eat pastas</button>
			<Link to="/login">Already registerd? Login here</Link>
			<Form
				{...layout}
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				// onSubmit={login}
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
