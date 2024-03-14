# Weather Application Backend Readme
This readme provides instructions on setting up and running the backend of the Weather Application. 

## Backend Description
The backend is built using Express.js as the server framework, MongoDB as the database, and GraphQL for querying and manipulating data.

## Prerequisites
Before you proceed, ensure you have the following installed:

**Node.js:** Download and install the latest version of Node.js
**MongoDB:** Install the latest version of MongoDB

## Setup Instructions
Clone the Repository:

```
git clone git@github.com:EmilSaji/weather-app-backend.git
```
### Install Dependencies:


```
cd weather-app-backend
npm install
```
## Environment Configuration

By default, the MongoDB connection URI is configured in the **server.js** file. If your MongoDB connection string differs, update it directly in the server.js file.


### Start the Server:

```
node server.js
```
**Access the GraphQL Playground:**

Once the server is up and running, open your browser and you can use this for GraphQL playground where you can test the queries and mutations:

```
http://localhost:4000/graphql
```


## Project Structure

**models/**: Contains MongoDB schema models.

**schemas/**: Contains GraphQL schema definitions.

**server.js:** Entry point of the application.

## Additional Notes
**Running the Frontend:**


After successfully launching the backend server, you can proceed with the frontend setup. 

**Link of frontend project**

https://github.com/EmilSaji/weather-app-frontend


## Support
If you encounter any issues or have questions, feel free to contact [emilsaji123@gmail.com].

