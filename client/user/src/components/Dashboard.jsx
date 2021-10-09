import React, { useEffect, useState } from "react";
import Apply from "../assets/apply";
import Inprogress from "../assets/inprogress";
import Completed from "../assets/completed";
import Reject from "../assets/reject";
import Consent from "../assets/consent";
import { useHistory } from "react-router-dom";
import { url } from "../util/data";
import Loading from "../shared/Loading";

export default function Dashboard() {
	const history = useHistory();

	const [email] = useState(localStorage.getItem("email"));
	const [isloading, setisloading] = useState(false);
	const [iserror, setiserror] = useState(false);
	const [bank, setbank] = useState("");

	const [data, setdata] = useState([]);

	useEffect(() => {
		if (!email) return;
		setisloading(true);
		fetch(`${url}/util/getuserdetails`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
			}),
		})
			.then(response => response.json())
			.then(res => {
				if (res.success) {
					setbank(res.message.name);
				} else {
					setdata([]);
					setisloading(false);
					setiserror(true);
				}
			})
			.catch(() => {
				setisloading(false);
				setiserror(true);
			});
	}, [email]);

	useEffect(() => {
		setisloading(true);
		fetch(`${url}/kyc/status`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
			}),
		})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					setdata(data.message);
					setisloading(false);
				} else {
					setisloading(false);
					// setiserror(true);
				}
			})
			.catch(() => {
				setisloading(false);
				setiserror(true);
			});
	}, [email]);

	if (isloading) {
		return (
			<React.Fragment>
				<div className="flex items-center justify-center bg-white ma3 br2 vh-75">
					<Loading text="Loading Dashboard" />
				</div>
			</React.Fragment>
		);
	}

	if (iserror) {
		return (
			<React.Fragment>
				<div className="flex flex-column items-center justify-center bg-white ma3 br2 vh-75">
					<p className="f3 gray">Something Went Wrong!</p>
					<button
						className="mt4 fw6 f6 bn dim br1 ph3 pointer pv2 dib white"
						style={{ background: "#6EB6FF" }}
						onClick={() => history.push("/")}
					>
						Go Back
					</button>
				</div>
			</React.Fragment>
		);
	}

	return (
		<div>
			<h2 className="text-center text-gray-700">{`Welcome ${
				bank === "A" ? "Alice" : "Bob"
			} to your Dashboard`}</h2>
			{data.length <= 0 ? (
				<div className="rounded-xl py-20 w-11/12 mx-auto mt-10 drop-shadow-md bg-white">
					<div>
						<h1 className="text-gray-800 text-center p-4">KYC</h1>
						<div>
							{
								<div className="h-2/3 w-2/3 md:h-1/4 md:w-1/4 mx-auto">
									<Apply />
								</div>
							}
							<div className="mt-12 flex justify-center">
								{
									<button
										onClick={() => history.push("/kyc")}
										className="ui primary button"
									>
										Complete your KYC now!
									</button>
								}
							</div>
						</div>
					</div>
				</div>
			) : (
				<>
					{
						<button
							onClick={() => history.push("/consent")}
							className="fixed bottom-4 right-4 ui primary button"
						>
							Apply for KYC!
						</button>
					}
					<div className="grid grid-cols-1 md:grid-cols-2">
						{data.map((val, idx) => {
							return (
								<div className="rounded-xl m-4 drop-shadow-md bg-white w-10/12 mx-auto">
									<div>
										<h1 className="text-gray-800 text-center text-2xl md:text-3xl p-4">{`${
											val.bank.split(",")[0] === "BankA"
												? "HDFC"
												: "Bank of America"
										}, ${val.bank.split(",")[1].split("=")[1]}, ${
											val.bank.split(",")[2].split("=")[1]
										}`}</h1>
										<div>
											{val.approval === "false" && (
												<div className="h-1/2 w-1/2 md:h-1/4 md:w-1/4 mx-auto">
													<Inprogress />
												</div>
											)}
											{val.approval === "true" && (
												<div className="h-1/2 w-1/2 md:h-1/4 md:w-1/4 mx-auto">
													<Completed />
												</div>
											)}
											{val.approval === "reject" && (
												<div className="h-1/2 w-1/2 md:h-1/4 md:w-1/4 mx-auto">
													<Reject />
												</div>
											)}
											{val.approval === "request" && (
												<div className="h-1/2 w-1/2 md:h-1/4 md:w-1/4 mx-auto">
													<Consent />
												</div>
											)}
											<div className="mt-12 flex justify-center">
												{val.approval === "false" && (
													<h3 className="text-gray-800 pb-6 text-md md:text-lg lg:text-xl text-center">
														{
															"Your KYC details is being Verified. (Please wait for 2-3 buisness days)"
														}
													</h3>
												)}
												{val.approval === "true" && (
													<h3 className="text-green-600 pb-6 text-md md:text-lg lg:text-xl text-center">
														{"KYC Completed!"}
													</h3>
												)}
												{val.approval === "reject" && (
													<div className="my-4 flex justify-center">
														<button
															onClick={() => history.push("/kyc")}
															className="ui primary button"
														>
															Apply for KYC again!
														</button>
													</div>
												)}
												{val.approval === "request" && (
													<div className="my-4 flex justify-center">
														<button
															onClick={() => history.push("/request")}
															className="ui primary button"
														>
															Give consent for KYC
														</button>
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}
