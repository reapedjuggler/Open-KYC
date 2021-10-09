import React, { useState, useEffect } from "react";
import { Form, Select } from "semantic-ui-react";
import { url } from "../util/data";
import { useHistory } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Loading from "../shared/Loading";

export default function Userconsent() {
	const history = useHistory();

	const [isloading, setisloading] = useState(false);
	const [data, setdata] = useState({ aadhar: "", pan: "" });
	const [bankdata, setbankdata] = useState([]);
	const [clicked, setclicked] = useState(false);
	const [isapply, setisapply] = useState(false);
	const [checkbox, setcheckbox] = useState(false);
	const [bank, setbank] = useState("");
	const [email] = useState(localStorage.getItem("email") || "");
	const [iserror, setiserror] = useState(false);
	const [msg, setmsg] = useState("");

	const [bankoptions] = useState([
		{ key: "m", text: "Bank of America", value: "B" },
		{ key: "f", text: "HDFC", value: "A" },
	]);

	useEffect(() => {
		if (!email) return;
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
					setbankdata(data.message);
					setisloading(false);
				} else {
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
		if (!email || !bank) return;
		fetch(`${url}/kyc/getdetails2`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
				bank: bank,
			}),
		})
			.then(response => response.json())
			.then(res => {
				if (res.success) {
					setdata(res.message[0]);
				} else {
					setiserror(true);
				}
			})
			.catch(() => setiserror(true));
	}, [email, bank]);

	useEffect(() => {
		if (!isapply || !bank) return;
		if (!clicked) {
			setcheckbox(true);
			setmsg("Please check the checkbox to apply for KYC!");
			setTimeout(() => {
				setcheckbox(false);
				setclicked(false);
				setisapply(false);
				setmsg("");
			}, 3000);
			return;
		}
		let res = bankdata.filter(
			val => val.bank.split(",")[0].split("Bank")[1] === bank
		);
		if (res.length >= 1) {
			setcheckbox(true);
			setmsg(`Already Applied for ${bank}`);
			setTimeout(() => {
				setcheckbox(false);
				setisapply(false);
				setmsg("");
			}, 3000);
			return;
		}
		fetch(`${url}/kyc/apply`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				bank: bank,
				email: email,
				aadhar: data.aadhar,
				pan: data.pan,
			}),
		})
			.then(response => response.json())
			.then(data => {
				if (data.success) {
					history.push("/");
				} else {
					setiserror(true);
				}
			})
			.catch(() => setiserror(true));
	}, [isapply, history, bank, email, clicked, data, bankdata]);

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

	if (isloading) {
		return (
			<React.Fragment>
				<div className="flex items-center justify-center bg-white ma3 br2 vh-75">
					<Loading text="Loading Dashboard" />
				</div>
			</React.Fragment>
		);
	}

	return (
		<div className="rounded-md bg-white p-5 m-12 w-11/12 lg:w-1/2 mx-auto text-center">
			<h2 className="text-gray-700">Let's get you verified</h2>
			<p>
				I give my consent to use my documents which includes Aadhar Card, Pan
				Card, Biometrics and Photograph to be used by the bank to verify my
				documents and approve me as a valid user by checking on the box below i
				hereby accept my consent to utilize my documents by the bank.
			</p>
			<p className="text-gray-600 font-bold">Select Bank to apply for</p>
			<Form.Field
				control={Select}
				options={bankoptions}
				label={{ htmlFor: "form-select-bank" }}
				placeholder="Banks"
				search
				onChange={(e, d) => setbank(d.value)}
				searchInput={{ id: "form-select-bank" }}
			/>
			<Form.Checkbox
				onChange={e => {
					setclicked(true);
				}}
				value={clicked}
				className="my-4"
				name="istrue"
				label="I agree to share my KYC details"
			/>
			{checkbox && <Alert severity="error">{msg}</Alert>}
			<button
				onClick={() => {
					setisapply(true);
				}}
				className="ui primary button"
			>
				Apply
			</button>
		</div>
	);
}
