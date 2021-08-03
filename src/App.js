import React from 'react';
import Editor from './editor';
import Survey from './survey';
import {
	BrowserRouter as Router,
	Switch,
	Route
  } from "react-router-dom";
const App = () => {

	return (
		<div className="container">
			<Router>
				<Switch>
					<Route path="/survey">
						<Survey/>
					</Route>
					<Route path="/">
						<Editor/>
					</Route>
				</Switch>
			</Router>
		</div>

	)
}

export default App
