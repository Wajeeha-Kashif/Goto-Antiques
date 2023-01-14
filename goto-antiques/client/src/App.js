import React, { Component } from "react";
import DataContract from "./contracts/Data.json";
import getWeb3 from "./getWeb3";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Home from "./views/Home";
import TotalSales from "./views/TotalSales";
import TotalAntiqueSold from "./views/TotalAntiqueSold";
import ItemInfo from "./views/ItemInfo";


class App extends Component {
	state = {
		storageValue: 0,
		web3: null,
		accounts: null,
		contract: null,
		isLogin: false,
	};

	componentDidMount = async () => {
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();

			// Get the contract instance.
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = DataContract.networks[networkId];
			const instance = new web3.eth.Contract(
				DataContract.abi,
				deployedNetwork && deployedNetwork.address
			);

			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.setState({ web3, accounts, contract: instance });
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`
			);
			console.error(error);
		}
	};

	setLogin = () => {
		this.setState({ ...this.state, isLogin: true });
	};

	render() {
		if (!this.state.web3) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}
		return (
			<Router>
				<Routes>
					<Route
						path="/"
						element={<Login state={this.state} setLogin={this.setLogin} />}
					/>
					<Route path="/signup" element={<Signup state={this.state} />} />
					<Route
						path="/home"
						element={
							this.state.isLogin ? (
								<Home state={this.state} />
							) : (
								<Login state={this.state} setLogin={this.setLogin} />
							)
						}
					/>
					<Route
						path="/totalsales"
						element={
							this.state.isLogin ? (
								<TotalSales state={this.state} />
							) : (
								<Login state={this.state} setLogin={this.setLogin} />
							)
						}
					/>
					<Route
						path="/totalantiquesold"
						element={
							this.state.isLogin ? (
								<TotalAntiqueSold state={this.state} />
							) : (
								<Login state={this.state} setLogin={this.setLogin} />
							)
						}
					/>
					<Route
						path="/iteminfo"
						element={
							this.state.isLogin ? (
								<ItemInfo state={this.state} />
							) : (
								<Login state={this.state} setLogin={this.setLogin} />
							)
						}
					/>
					
				</Routes>
			</Router>
		);
	}
}

export default App;
