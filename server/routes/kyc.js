const router = require("express").Router();

// Models
const userModel = require("../models/userModel");

// Services
const userService = require("../service/userServices");

router.post("/apply", async (req, res, next) => {
	try {
		const { bank, email, aadhar, pan } = req.body;

		// whether this email exists or not in mongo

		let resp = await userModel.find({ email: email });

		if (Object.keys(resp).length == 0) {
			res.send({ success: false, message: "Already applied for KYC" });
		}

		// whether this email already exists in corda
		const cordaData = {
			aadhar: aadhar,
			pan: pan,
			email: email,
			bank: bank == "A" ? 50006 : 50033,
			partyName: "",
		};

		console.log(req.body);

		let partyName = await userService.getPartyNameFromCorda(bank);
		console.info(partyName);

		cordaData.partyName = partyName.message.me;

		let respFromCord = await userService.sendUserDataToCorda(cordaData);
		console.log("bsdk ye le", respFromCord);
		if (respFromCord.success == false) throw new Error(respFromCord.message);

		// console.log(respFromCord, "Iam the corda data\n");

		res.send({ success: true, message: "Requested for Kyc" });
	} catch (err) {
		res.send({ success: false, message: err.message });
	}
});

//   "state" : {
//     "data" : {
//       "@class" : "net.corda.samples.example.states.IOUState",
//       "value" : 17,
//       "lender" : "O=PartyB, L=New York, C=US",
//       "borrower" : "O=PartyC, L=Mumbai, C=IN",
//       "linearId" : {
//         "externalId" : null,
//         "id" : "42f26b4c-2d84-445d-bdca-71df5968c3f1"
//       },
//       "aadhar" : "623232323232",
//       "pan" : "agg33336",
//       "email" : "addddaag",
//       "approval" : "false",
//       "timestamp" : "2021-09-29"
//     },
//     "contract" : "net.corda.samples.example.contracts.IOUContract",
//     "notary" : "O=Notary, L=London, C=GB",
//     "encumbrance" : null,
//     "constraint" : {
//       "@class" : "net.corda.core.contracts.SignatureAttachmentConstraint",
//       "key" : "aSq9DsNNvGhYxYyqA9wd2eduEAZ5AXWgJTbTEw3G5d2maAq8vtLE4kZHgCs5jcB1N31cx1hpsLeqG2ngSysVHqcXhbNts6SkRWDaV7xNcr6MtcbufGUchxredBb6"
//     }
//   },
//   "ref" : {
//     "txhash" : "54CA975981A8C5027B715F8835D26ACB2B24D5970EE289EC4391A22EF5A10C92",
//     "index" : 0
//   }

router.post("/pendinglist", async (req, res) => {
	try {
		// pranav dega bank --> A, B   ==> port
		// bank: bank == "A" ? 50006 : 50033,
		// data = {}
		let data = bank == "A" ? 50006 : 50033;

		let respFromCorda = await userService.getUserDatafromCorda(data);

		let pendingArray = respFromCorda.message.filter(
			ele => ele.state.approval == "false"
		);

		for (let i = 0; i < pendingArray.length; i++) {
			let prevEle = pendingArray[i];

			let newEle = { aadhar: "", pan: "", email: "", timestamp: "" };

			pendingArray[i] = newEle;
		}
	} catch (err) {
		console.log(err);
		res.send({ success: false, message: err });
	}
});

router.post("/approvedlist", async (req, res) => {
	try {
	} catch (err) {}
});

module.exports = exports = router;

// [ {
//   "state" : {
//     "data" : {
//       "@class" : "net.corda.samples.example.states.IOUState",
//       "value" : 79,
//       "lender" : "O=PartyB, L=New York, C=US",
//       "borrower" : "O=PartyC, L=Mumbai, C=IN",
//       "linearId" : {
//         "externalId" : null,
//         "id" : "3063c49f-59e7-41e9-a45d-35704db9f4de"
//       },
//       "aadhar" : "9657555",
//       "pan" : "75875d",
//       "email" : "7575757",
//       "approval" : "false×tamp=sshhs",
//       "timestamp" : "2021-09-28"
//     },
//     "contract" : "net.corda.samples.example.contracts.IOUContract",
//     "notary" : "O=Notary, L=London, C=GB",
//     "encumbrance" : null,
//     "constraint" : {
//       "@class" : "net.corda.core.contracts.SignatureAttachmentConstraint",
//       "key" : "aSq9DsNNvGhYxYyqA9wd2eduEAZ5AXWgJTbTEw3G5d2maAq8vtLE4kZHgCs5jcB1N31cx1hpsLeqG2ngSysVHqcXhbNts6SkRWDaV7xNcr6MtcbufGUchxredBb6"
//     }
//   },
//   "ref" : {
//     "txhash" : "4CEFCCB4DFBF74CE4817EA69DDCD93860EC4858052B8862B4C3C7BFB498C20BD",
//     "index" : 0
//   }
// }, {
//   "state" : {
//     "data" : {
//       "@class" : "net.corda.samples.example.states.IOUState",
//       "value" : 79,
//       "lender" : "O=PartyB, L=New York, C=US",
//       "borrower" : "O=PartyC, L=Mumbai, C=IN",
//       "linearId" : {
//         "externalId" : null,
//         "id" : "5ee04563-c3db-4ad1-9c7c-a42bab154db5"
//       },
//       "aadhar" : "9657555",
//       "pan" : "75875d",
//       "email" : "7575757",
//       "approval" : "false×tamp=sshhs",
//       "timestamp" : "2021-09-28"
//     },
//     "contract" : "net.corda.samples.example.contracts.IOUContract",
//     "notary" : "O=Notary, L=London, C=GB",
//     "encumbrance" : null,
//     "constraint" : {
//       "@class" : "net.corda.core.contracts.SignatureAttachmentConstraint",
//       "key" : "aSq9DsNNvGhYxYyqA9wd2eduEAZ5AXWgJTbTEw3G5d2maAq8vtLE4kZHgCs5jcB1N31cx1hpsLeqG2ngSysVHqcXhbNts6SkRWDaV7xNcr6MtcbufGUchxredBb6"
//     }
//   },
//   "ref" : {
//     "txhash" : "BDB4E87AFD44D26B2A4D4C99BEA812B0985E6D0305CF637EE7259C1C08640610",
//     "index" : 0
//   }
// }, {
//   "state" : {
//     "data" : {
//       "@class" : "net.corda.samples.example.states.IOUState",
//       "value" : 79,
//       "lender" : "O=PartyB, L=New York, C=US",
//       "borrower" : "O=PartyC, L=Mumbai, C=IN",
//       "linearId" : {
//         "externalId" : null,
//         "id" : "2bd4a090-0019-4ef5-b080-4d53e0696e15"
//       },
//       "aadhar" : "9657555",
//       "pan" : "75875d",
//       "email" : "7575757",
//       "approval" : "false",
//       "timestamp" : "2021-09-28"
//     },
//     "contract" : "net.corda.samples.example.contracts.IOUContract",
//     "notary" : "O=Notary, L=London, C=GB",
//     "encumbrance" : null,
//     "constraint" : {
//       "@class" : "net.corda.core.contracts.SignatureAttachmentConstraint",
//       "key" : "aSq9DsNNvGhYxYyqA9wd2eduEAZ5AXWgJTbTEw3G5d2maAq8vtLE4kZHgCs5jcB1N31cx1hpsLeqG2ngSysVHqcXhbNts6SkRWDaV7xNcr6MtcbufGUchxredBb6"
//     }
//   },
//   "ref" : {
//     "txhash" : "6C64017444D589912BCB8E58FA85DD5DCB300BFEB23FDAE075E0BCE1CFFCBA62",
//     "index" : 0
//   }
// }, {
//   "state" : {
//     "data" : {
//       "@class" : "net.corda.samples.example.states.IOUState",
//       "value" : 79,
//       "lender" : "O=PartyB, L=New York, C=US",
//       "borrower" : "O=PartyC, L=Mumbai, C=IN",
//       "linearId" : {
//         "externalId" : null,
//         "id" : "c1fb231b-f6e4-42a3-a5c5-66446f00c128"
//       },
//       "aadhar" : "9657555",
//       "pan" : "75875d",
//       "email" : "7575757",
//       "approval" : "false",
//       "timestamp" : "2021-09-29"
//     },
//     "contract" : "net.corda.samples.example.contracts.IOUContract",
//     "notary" : "O=Notary, L=London, C=GB",
//     "encumbrance" : null,
//     "constraint" : {
//       "@class" : "net.corda.core.contracts.SignatureAttachmentConstraint",
//       "key" : "aSq9DsNNvGhYxYyqA9wd2eduEAZ5AXWgJTbTEw3G5d2maAq8vtLE4kZHgCs5jcB1N31cx1hpsLeqG2ngSysVHqcXhbNts6SkRWDaV7xNcr6MtcbufGUchxredBb6"
//     }
//   },
//   "ref" : {
//     "txhash" : "1A1D572ED96A14316BCD5A4DFCF413BFA3253693D1A23E9BED1DAA5E9DC02D98",
//     "index" : 0
//   }
// }, {
//   "state" : {
//     "data" : {
//       "@class" : "net.corda.samples.example.states.IOUState",
//       "value" : 79,
//       "lender" : "O=PartyB, L=New York, C=US",
//       "borrower" : "O=PartyC, L=Mumbai, C=IN",
//       "linearId" : {
//         "externalId" : null,
//         "id" : "76666365-904b-4e4c-847b-d22233a9200e"
//       },
//       "aadhar" : "9657555",
//       "pan" : "75875d",
//       "email" : "7575757",
//       "approval" : "false",
//       "timestamp" : "2021-09-29"
//     },
//     "contract" : "net.corda.samples.example.contracts.IOUContract",
//     "notary" : "O=Notary, L=London, C=GB",
//     "encumbrance" : null,
//     "constraint" : {
//       "@class" : "net.corda.core.contracts.SignatureAttachmentConstraint",
//       "key" : "aSq9DsNNvGhYxYyqA9wd2eduEAZ5AXWgJTbTEw3G5d2maAq8vtLE4kZHgCs5jcB1N31cx1hpsLeqG2ngSysVHqcXhbNts6SkRWDaV7xNcr6MtcbufGUchxredBb6"
//     }
//   },
//   "ref" : {
//     "txhash" : "0F833741F3648CB9031570F5F827DBAC9310A79B88391BB21A259B9E61B22144",
//     "index" : 0
//   }
// }, {
//   "state" : {
//     "data" : {
//       "@class" : "net.corda.samples.example.states.IOUState",
//       "value" : 79,
//       "lender" : "O=PartyB, L=New York, C=US",
//       "borrower" : "O=PartyC, L=Mumbai, C=IN",
//       "linearId" : {
//         "externalId" : null,
//         "id" : "bce4f38b-572b-4b47-9da6-f73827a7ba5b"
//       },
//       "aadhar" : "9657555",
//       "pan" : "75875d",
//       "email" : "7575757",
//       "approval" : "true",
//       "timestamp" : "2021-09-29"
//     },
//     "contract" : "net.corda.samples.example.contracts.IOUContract",
//     "notary" : "O=Notary, L=London, C=GB",
//     "encumbrance" : null,
//     "constraint" : {
//       "@class" : "net.corda.core.contracts.SignatureAttachmentConstraint",
//       "key" : "aSq9DsNNvGhYxYyqA9wd2eduEAZ5AXWgJTbTEw3G5d2maAq8vtLE4kZHgCs5jcB1N31cx1hpsLeqG2ngSysVHqcXhbNts6SkRWDaV7xNcr6MtcbufGUchxredBb6"
//     }
//   },
//   "ref" : {
//     "txhash" : "215E058C7309F37A4F5FBED1AAA6E16095349C96C8299FCA3C0340582C36414D",
//     "index" : 0
//   }
// }, {
//   "state" : {
//     "data" : {
//       "@class" : "net.corda.samples.example.states.IOUState",
//       "value" : 79,
//       "lender" : "O=PartyB, L=New York, C=US",
//       "borrower" : "O=PartyC, L=Mumbai, C=IN",
//       "linearId" : {
//         "externalId" : null,
//         "id" : "50a38f40-9a7d-45c5-b446-6918046f7b3b"
//       },
//       "aadhar" : "agag",
//       "pan" : "dgdgdg",
//       "email" : "dgdg",
//       "approval" : "false",
//       "timestamp" : "2021-09-29"
//     },
//     "contract" : "net.corda.samples.example.contracts.IOUContract",
//     "notary" : "O=Notary, L=London, C=GB",
//     "encumbrance" : null,
//     "constraint" : {
//       "@class" : "net.corda.core.contracts.SignatureAttachmentConstraint",
//       "key" : "aSq9DsNNvGhYxYyqA9wd2eduEAZ5AXWgJTbTEw3G5d2maAq8vtLE4kZHgCs5jcB1N31cx1hpsLeqG2ngSysVHqcXhbNts6SkRWDaV7xNcr6MtcbufGUchxredBb6"
//     }
//   },
//   "ref" : {
//     "txhash" : "D62A7D5BD17EB9A754CDC02FAC56861970BAB4722694F4FFFE961FEAF0C1A086",
//     "index" : 0
//   }
// }, {
//   "state" : {
//     "data" : {
//       "@class" : "net.corda.samples.example.states.IOUState",
//       "value" : 17,
//       "lender" : "O=PartyA, L=London, C=GB",
//       "borrower" : "O=PartyB, L=New York, C=US",
//       "linearId" : {
//         "externalId" : null,
//         "id" : "4efe4d7d-4c59-46fc-835d-2cc2cb45647a"
//       },
//       "aadhar" : "223232323232",
//       "pan" : "agg33336",
//       "email" : "addddaag",
//       "approval" : "false",
//       "timestamp" : "2021-09-29"
//     },
//     "contract" : "net.corda.samples.example.contracts.IOUContract",
//     "notary" : "O=Notary, L=London, C=GB",
//     "encumbrance" : null,
//     "constraint" : {
//       "@class" : "net.corda.core.contracts.SignatureAttachmentConstraint",
//       "key" : "aSq9DsNNvGhYxYyqA9wd2eduEAZ5AXWgJTbTEw3G5d2maAq8vtLE4kZHgCs5jcB1N31cx1hpsLeqG2ngSysVHqcXhbNts6SkRWDaV7xNcr6MtcbufGUchxredBb6"
//     }
//   },
//   "ref" : {
//     "txhash" : "322BB0C7D8DFA017AF52916C63D1108DE8E79D0A7A0DF95136DF0F27E65ED364",
//     "index" : 0
//   }
// }, {
//   "state" : {
//     "data" : {
//       "@class" : "net.corda.samples.example.states.IOUState",
//       "value" : 17,
//       "lender" : "O=PartyB, L=New York, C=US",
//       "borrower" : "O=PartyC, L=Mumbai, C=IN",
//       "linearId" : {
//         "externalId" : null,
//         "id" : "42f26b4c-2d84-445d-bdca-71df5968c3f1"
//       },
//       "aadhar" : "623232323232",
//       "pan" : "agg33336",
//       "email" : "addddaag",
//       "approval" : "false",
//       "timestamp" : "2021-09-29"
//     },
//     "contract" : "net.corda.samples.example.contracts.IOUContract",
//     "notary" : "O=Notary, L=London, C=GB",
//     "encumbrance" : null,
//     "constraint" : {
//       "@class" : "net.corda.core.contracts.SignatureAttachmentConstraint",
//       "key" : "aSq9DsNNvGhYxYyqA9wd2eduEAZ5AXWgJTbTEw3G5d2maAq8vtLE4kZHgCs5jcB1N31cx1hpsLeqG2ngSysVHqcXhbNts6SkRWDaV7xNcr6MtcbufGUchxredBb6"
//     }
//   },
//   "ref" : {
//     "txhash" : "54CA975981A8C5027B715F8835D26ACB2B24D5970EE289EC4391A22EF5A10C92",
//     "index" : 0
//   }
// } ]
