import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import Cookies from "js-cookie";
import { buyPastas } from "../../redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { eatPastas } from "../../redux";
// import { logIn } from "../../redux";

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 8 },
};
const tailLayout = {
	wrapperCol: { offset: 4, span: 8 },
};

const Login = () => {
	const pastas = useSelector((state) => state.pastas);
	const dispatch = useDispatch();

	const onFinish = (values) => {
		// dispatch(buyPastas());
		console.log("Success:", values);
		console.log(values.identifier);
		console.log(values.password);

		const data = {
			identifier: values.identifier,
			password: values.password,
		};

		fetch("https://api-minireseausocial.mathis-dyk.fr/auth/local/", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((post) => {
				dispatch(buyPastas());
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
			<h2>Your are : {pastas} </h2>
			<Form
				{...layout}
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label="Email or username"
					name="identifier"
					rules={[{ required: true, message: "Please input your password!" }]}
				>
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
			<button onClick={() => dispatch(buyPastas())}>redux login_action</button>
			<br />
			<br />
			<button onClick={() => dispatch(eatPastas())}>redux logout_action</button>
			<br />
		</div>
	);
};
export default Login;
