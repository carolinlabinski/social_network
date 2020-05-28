import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Login from "./pages/Login/";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
//import store from "./redux/store";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
//import { logIn } from "./redux";
import PostForm from "./components/PostForm/PostForm.jsx";
import { createStore } from "redux";
import pastasReducer from "./redux/pastas/pastasReducer";

const store = createStore(pastasReducer);

function App() {
	const PrivateRoute = ({ component: Component, ...rest }) => {
		//const authenticated = useSelector((state) => state.authenticated);
		const pastas = useSelector((state) => state.pastas);
		//const authenticated = true;

		return (
			<Route
				{...rest}
				render={(props) =>
					pastas === "authenticated" ? (
						<Component {...props} />
					) : (
						<Redirect to={{ pathname: "/login" }} />
					)
				}
			/>
		);
	};

	return (
		<Provider store={store}>
			<Router>
				<div>
					<Navbar />

					<Switch>
						<Route path="/register" component={Register} />
						{/* <Redirect from="/register/" to="/" /> */}
						{/* <Register />
						</Route> */}
						<Route path="/login">
							<Login />
						</Route>
						<Route exact path="/">
							<Home />
						</Route>
						{/* <Route exact path="/profile">
							<Profile />
						</Route> */}
						<PrivateRoute exact path="/profile" component={Profile} />>
						{/* <Profile />
						</PrivateRoute> */}
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
