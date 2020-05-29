import React from 'react'

import { Route, useHistory } from "react-router-dom";
import Cookies from "js-cookie";





const PrivateRoute = ({ component: Component, ...rest }) => {
	const history = useHistory();


		// useEffect blabla fetch fetch

		return (
			<Route{...rest} render={(props) =>
					
					Cookies.get('token') ? 

					(<Component {...props} />) 

					: 

					(history.push("/login"))}
			/>
		);
};

export default PrivateRoute