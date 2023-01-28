import React, { useState } from "react"
import Headerr from "../components/Header";
import '../style/style.css'

function Home({ state }) {
	const [stock, setStock] = useState({
		name: "",
		number: "",
		price: "",
		date: "",
		creationDate: new Date(),
	});

	const handleChange = (e) => {
		setStock({
			...stock,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { accounts, contract } = state;


		const check2 = await contract.methods.checksameitemnumberin(stock.number).call();

		if(check2){
			alert("Item already exist with same number")
		}else{
			await contract.methods
			.dataenter(
				stock.creationDate,
				stock.name,
				stock.number,
				new Date(stock.date).toString(),
				stock.price
			)
			.send({ from: accounts[0] });

		//assuming Antique added successfully
		alert("Added successfully");
		setStock({
			name: "",
			number: "",
			price: "",
			date: "",
			creationDate: "",
		});
		}

		
	};

	return (
	<Headerr>
		<div>
			<h2 className="mb-6 text-center text-5xl font-extrabold">Add Antiques</h2>
			<div className="w-full sm:max-w-md p-5 mx-auto">
				
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block mb-1">Name</label>
						<input
							id="name"
							type="text"
							name="name"
							required
							value={stock.name}
							autoComplete="off"
							onChange={handleChange}
							className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-1">Antique Id</label>
						<input
							id="number"
							type="text"
							name="number"
							required
							value={stock.number}
							autoComplete="off"
							onChange={handleChange}
							className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-1">Date of Sale</label>
						<input
							id="date"
							type="date"
							name="date"
							value={stock.date}
							required
							autoComplete="off"
							onChange={handleChange}
							className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
						/>
					</div>
					<div className="mb-4">
						<label className="block mb-1">Price</label>
						<input
							id="price"
							type="number"
							name="price"
							value={stock.price}
							required
							autoComplete="off"
							onChange={handleChange}
							className="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"
						/>
					</div>

					<div className="mt-6">
						<button
							type="submit"
							className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition"
						>
							Add
						</button>
					</div>
				</form>
			</div>
			
		</div>
		</Headerr>
	);
}

export default Home;
