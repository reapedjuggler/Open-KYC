![image](https://user-images.githubusercontent.com/45710269/135753913-71af9e2d-3b6c-4a27-aaa9-b4c2b406f1a9.png) **OPen KYC**

[![CI](https://github.com/fastify/fastify/workflows/ci/badge.svg)](https://github.com/fastify/fastify/actions/workflows/ci.yml)
[![Web SIte](https://github.com/fastify/fastify/workflows/website/badge.svg)](https://github.com/fastify/fastify/actions/workflows/website.yml)
[![Coverage Status](https://coveralls.io/repos/github/fastify/fastify/badge.svg?branch=main)](https://coveralls.io/github/fastify/fastify?branch=main)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)

## Contributors of Open-Kyc
Open-Kyc comprises of two parts a REST layer and a r3Corda app, **OPEN-Kyc** is solely developed by [Vibhav Tomar](https://github.com/reapedjuggler) [Purnashish Hazra](https://github.com/LobRockyl) [Pranav Agarwal](https://github.com/pranav2012)

## Some Information on 15 Contributors
In addition our project Open-Kyc consist of two parts in which one of the component relies upon r3Corda an **Open Source app for private blockchain** while submitting this application we were asked to push the source code to the repository so we had to push r3Corda's code and due to the this fact their are some **contributors other than us (who made r3Corda app**) being listed in our repository so please consider this fact that **Open-Kyc app is strictly developed** **by us** (**Contributors of Open-Kyc**) but due to the above reason there are some other r3Corda's contributors who are being listed, nevertheless this can be also verified by checking the Open-Kyc's commits array. 
   
<br> </br>   

* **Title:**
   Open-KYC provides a solution for redudant kyc requests, all you need to do is sign-up once on the platform and get verified by any one of the Banks and 
   then save yourself from filling those troublesome forms again, simply apply for KYC with click of a button.Open-Kyc is an Open-Source decentralized application running on r3Corda and a Nodejs server in the Back-end and Reactjs in the front-end, It can be easily integrated with your kyc portals too.

</br>

* **Pre-Requisites**
----
  `Node.js`
  `Express.js`
  `MongoDb`
  `JavaScript`
  `Reactjs`
  `r3Corda`

</br>

* **Implemenation of the REST API**

----
  `/user` 
  <p>
  Inserts the data provided by the user in the Data Base and takes care of login and signup activities.
  </p>

  `/kyc`
  <p>
  Provides the user with applying, checking status, getting details of their KYC's
  </p>
  
  `/utilroutes`
  <p>
  Provides the user with some additional functionalities of forgot-password, account-verification etc.
  </p>
 
  `/trackingroutes`
  <p>
  Provides the bank with the functionality of logging their transactions.
  </p>
 
 
----- 
* **Sample URL**

  /user/register:

* **Method:**

  `POST`
  
* **Data Params**

   **Required:**
 
   `Name=[String]`
   `email=[Email]`
   `aadharno=[integer]`
   `panno=[integer]`
   `usertype (Bank or Client)=[String]`
   `phone=[integer]`




* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{sucess: "true", message: "Your Requested has been accepted" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{success: "false", message : "Could not process the request, Try again" }`

* **Handling a large number of Requests**
    * **Load Balancing**
        --> We will deploy the app on a kubernetes cluster and manage the load and traffic from there.
        
</br>

* **Sample Call**

  ```javascript</br>
  route.post("/", (req, res, next) => {

      try {
        res.send({sucess: true, message: resp.message})
      } catch (err) {
        res.send({success: false, message: "Error in sample route"
      }

  })
  ```
  </br>
* **Setting Up**
----  
  
## Setup

- Install and setup [`Nodejs`](https://nodejs.org/en/)
- Install and setup [`Mongodb`](https://www.mongodb.com/)
- Install ans setup [`r3Corda`](https://www.r3.com/corda-platform/)
- Fork and Clone the repository

```sh
https://github.com/reapedjuggler/AmexHack
```

- Start the r3Corda server and deploy the nodes

- Move into the project folder

```sh
cd server
```

- Setup `.env` file

- Start the server

```sh
npm start server.js
```

The output should be

```sh
Server connected on Port 8000
```
  
