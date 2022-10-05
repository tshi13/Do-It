# Welcome to the Team DOIT Repository !
## Getting Started

### Installation

1. Navigate to the ```server``` folder and run ```npm i``` to install all dependencies. 

2. Next run the following code to start the server
```sh
node index.js
```
3. Navigate to the ```frontend``` folder and run ```npm i``` to install all dependencies. 
   
4. Run the following code to start the frontend
  ```sh
  npm run start
  ```
5. You should be directed to ```http://localhost:3000/```



## Iteration 1 

### Usage
1. Use the Register button to create a new account (password is optional, not implemented for this iteration yet)
2. Use the Login button to login to your account
3. Once you login, click on the home button on your screen
4. You can click a plus button on the right side of the screen to add a task for yourself
5. Enter the fields for the task then click confirm (may have to double click)

### User Stories (original) Completed on Iteration 1
- As a user, I want to be able to create tasks for myself to complete  
- As a user, I want to be able to enter a certain number of coins to the pool with my friends when setting up a task  
- As a user, I want to be able to enter a due date or time for when the task is due so that I can be held accountable by others to complete tasks on time

### More specific User Stories Completed on Iteration 1
- As developers, we want to setup mongodb and backend express
- As a developer and as a user, I want to be able to differentiate users from each other so I know who has which tasks.
- As developers, we want to create mongoose Schema for Task
- As devs, we want to setup react frontend
- As developers, we want to connect to the MongoDB database
- As a user, will help Taiming with linking up backend server express js logic with the mongodb database using postman
- As a user, will link up express js logic with posting the createUser to the backend and storing users in db with CRUD logic
- As developers, we want to create mongoose Schema for User
- As a user, users should see a chatbox
- As a user, will have a login functionality with username
- As a user, I want to be able to set the coin value of a task so I can say how much a task is worth.

Note: if you refresh you will be logged out and will need to login again. Currently you need to create a new task to be able to see your previous task cards (will implement next iteration)

