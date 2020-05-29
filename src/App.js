import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import "./App.css";
import "antd/dist/antd.css";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Login from "./pages/Login/";

const App = () => {

	return (
		<Provider store={store}>
			<Router>
				<div>
					<Navbar />

					<Switch>
						<Route path="/register" component={Register} />

						<Route path="/login" component={Login}/>

						<Route exact path="/" component={Home}/>

						<PrivateRoute exact path="/profile" component={Profile} />
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
