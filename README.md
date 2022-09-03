# Get This App up And Running
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
But we don't have to do it. Just clone this repo and follow the guidelines.

## Steps to get started:
1. Simply clone this repo.
2. Run "npm install"
3. Create a .env file and add "REACT_APP_API_BASE_URL" 
4. Initialize it to the base url of the server. For locally running it might be like "http://localhost:3001/api/v1" 
5. Run npm start, wait for development server to start and we are good to go!

## Guide for developers:
"Every developer has his/her own set of ideas to solve a given problem."
That being said every code that solves a problem should be maintainable and understandable.
Here are some of the few points that will help developer who is maintaining or improving the codebase of this react-app:
* Asyncronous codes are not directly embeded to the components. Instead they are handled using ***createAsyncThunk*** which is a function provided by "@reduxjs/toolkit". ***createAsyncThunk*** also provides three  different states of the asunc request; pending, fulfilled, and rejected; which are handled using extraReducers.

* Next step after the completion of the async requests are also passed as an object to the handlers.

## Available Scripts
In the project directory, we can run:
1. start (for development in and when specified **production** environment it is used for starting the app in the server)
2. build (for building the project)

***Note: 'npm build' must be run before  running the app to the server by 'npm start'***


Enjoy ✌️