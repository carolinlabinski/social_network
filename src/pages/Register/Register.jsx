//import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { buyPastas } from "../../redux";
import { eatPastas } from "../../redux";
import { logIn } from "../../redux";
// import React from "react";
import React, { useEffect } from "react";

const layout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 8 },
};
const tailLayout = {
	wrapperCol: { offset: 4, span: 8 },
};

const Register = () => {
	const pastas = useSelector((state) => state.pastas);
	const dispatch = useDispatch();

	const onFinish = (values, authenticated) => {
		dispatch(buyPastas());
		console.log("Success:", values);
		console.log(values.username);
		console.log(values.password);

		const data = {
			username: values.username,
			email: values.email,
			password: values.password,
		};

		console.log("test:" + data);
		fetch("https://api-minireseausocial.mathis-dyk.fr/auth/local/register", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((post) => {
				console.log(post);
				console.log(post.jwt);
				console.log(post.user);
				Cookies.set("token", post.jwt);
				console.log("Cookies get:" + Cookies.get("token"));

				console.log("testss" + authenticated);
				if (authenticated === true) {
					return <Redirect to="/" />;
				}
			})
			.then((posts) => {
				console.log(posts);
			});

		console.log("test:" + data);
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
				// onClick={() => dispatch(buyPastas())}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label="Username"
					name="username"
					rules={[{ required: true, message: "Please input your username!" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Email"
					name="email"
					rules={[{ required: true, message: "Please input your mail!" }]}
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

			{/* <Button
				// onClick={redirect}
				type="primary"
				htmlType="submit"
				style={{ height: "30px", marginTop: "10px" }}
			>
				redirect
			</Button> */}
			{/* <button onClick={() => dispatch(logIn())}>Login</button> */}
		</div>
	);
};
export default Register;
