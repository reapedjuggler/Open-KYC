![image](https://user-images.githubusercontent.com/45710269/135753913-71af9e2d-3b6c-4a27-aaa9-b4c2b406f1a9.png) **OPen KYC**

[![CI](https://github.com/fastify/fastify/workflows/ci/badge.svg)](https://github.com/fastify/fastify/actions/workflows/ci.yml)
[![Web SIte](https://github.com/fastify/fastify/workflows/website/badge.svg)](https://github.com/fastify/fastify/actions/workflows/website.yml)
[![Coverage Status](https://coveralls.io/repos/github/fastify/fastify/badge.svg?branch=main)](https://coveralls.io/github/fastify/fastify?branch=main)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)

* **Title:**
   Open-KYC provides a solution for redudant kyc requests, all you need to do is sign-up once on the platform and get verified by any one of the Banks and 
   then save yourself from filling those troublesome forms again, simply apply for KYC with click of a button.Open-Kyc is an Open-Source decentralized application running on r3Corda
   running on a Nodejs server in the Back-end and Reactjs in the front-end, It can be easily integrated with your kyc portals.

</br>

* **Pre-Requisites**
----
  `Node.js`
  `Express.js`
  `MongoDb`
  `JavaScript`
  `Reactjs`

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
        --> We will use the concept of Load Balancing for handling a large number of request
        
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
  * **Download the essential node modules**</br>
    <pre>npm install</pre></br>
     **Download and setup MongoDB**</br>
     [MongoDB](https://www.mongodb.com/)</br>
     
     <br>`Setup .env file` </br>
     </br>**Start the Server**</br>
    <pre>npm start server.js </pre>
  
