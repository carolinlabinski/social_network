import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
//import { Redirect } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { eatPastas } from "../../redux";
// import { logOut } from "../../redux";

const Navbar = () => {
	const authenticated = useSelector((state) => state.authenticated);
	const dispatch = useDispatch();
	// console.log(authenticated);

	const logout = () => {
		Cookies.remove("token");
		console.log("Check cookies:" + Cookies.get("token"));
		// dispatch(logOut()
	};

	// const redirect = () => {
	// 	if (Cookies.get("token") === undefined) {
	// 		return <Redirect to="/login" />;
	// 	}
	// };

	return (
		<div className="topnav">
			<Link to="/">Home</Link>
			<Link to="/register">Register</Link>
			<Link to="/login">Login</Link>
			<Link to="/profile">Profile</Link>
			<p style={{ color: "white" }}> status{authenticated}</p>
			<Button
				onClick={() => dispatch(eatPastas())}
				// onClick={logout}
				// onClick={redirect}
				type="primary"
				htmlType="submit"
				style={{ height: "30px", marginTop: "10px" }}
			>
				Logout
			</Button>
			{/* <button onClick={() => dispatch(logOut())}>Logouttt</button> */}
		</div>
	);
};
export default Navbar;
