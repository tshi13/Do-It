# *Software Requirement Specification*

## Problem Statement: 
People often feel unmotivated and discouraged to do academic, professional, and personal tasks. There currently are only to-do list applications that allow you to list and plan the tasks that you need to complete. The market is lacking a solution that focuses on actually pushing users to actually do the tasks!

The Dolt app will help people stay focused with their tasks and be present by connecting with your close friends. People are more motivated by losses rather then gains, so we want to motivate people by introducing consequences. We also allow them to be motivated by recognition and followers across our social platform.

## Potential Clients：
- Anyone who needs help with staying focused and beating their procrastination on academic, professional, and personal goals. College students who are learning and living in group environments may particularly benefit from this app. 
- People who want to acquire new skills, complete tasks, and/or achieve consistency by having groupmates hold each other accountable.
- People who want to gain influence and share their good progress of doing something meaningful with others.

## Proposed Solution: 
Through the betting system in Dolt, users need a certain amount of Dolt coins to play the game. Users in a group will set tasks for themselves and other people will keep track of them by verifying their public social media posts or private group posts. The user who fails to do their tasks will lose coins and the rest of the users will spilt the coins evenly. Successful users will be able to help friends gain better habits, get tasks done, earn more coins along the way, and have the opportunity to upload content to the general public. 

Two types of coins exist: free coins and paid coins. Only the paid coins correspond to real money. The free coins exist in order to allow groups to complete tasks even if they choose not to use real money.

This solution allows users to complete tasks under the supervision of others (and face possible consequences) while enjoying the fun of gaining community recognition and rewards when friends fail to do tasks.  


## Functional Requirements: 

### Must have：
- As a user, I want to be able to create tasks for myself to complete  
- As a user, I want to be able to see tasks that other people have created  
- As a user, I want to be able to create or join private groups with my friends so we can have fun while holding each other accountable for the tasks  
- As a user, I want to be able to create and assign tasks for multiple people at once so that groups of friends can participate on a common, shared task, have friendly competition, and have and mutual encouragement
- As a user, I want to be able to enter a certain number of coins to the pool with my friends when setting up a task  
- As a user, I want to be able to enter the percentage of coins I lose when I fail to complete a task
- As a user, I want to be able to enter a due date or time for when the task is due so that I can be held accountable by others to complete tasks on time
- As a user, I want to be able to send messages and post pictures in the group chat so I can talk with my friends and verify I have completed tasks  
- As a user, I want to be able to vote on whether a group member has finished their tasks  
- As a user, I want to be able to gain/lose coins when someone fails to finish tasks 
- As a user, I want to be able to search for existing groups and users
- As a developer, I want to be able to ban certain users if necessary


### Nice to have：
- As a user, I want to be able to purchase DoIt coins with real money  
- As a user, I want to be able to withdraw the coins in my account and receive real money    
- As a user, I want to have a secure way of logging into my account
- As a user, I want to be able to adjust the percentage of votes required to be considered that a task is completed  
- As a user, I want to be able to join a variety of public rooms sorted by interests/task category  
- As a user, I want to be able to post my progress to the public  
- As a user, I want to be able to gain followers and also follow others  
- As a user, I want to be notified about the progress of other members in the group
- As a user, I want to be able to report application bugs, suggestions, inappropriate behavior from other users
- As a user, I want to be able to login with my social media accounts so I can easily invite and connect my existing friends
- As a developer, I want to have a backend dashboard to gain insight and data about the status of the app/number of users etc.


### Non-functional Requirements:
- As a user, I want the DoIt website to be accessible on many different screen sizes and browsers
- As a user, I want the DoIt website and server to be available 24/7 so that tasks can be updated anytime
- As a user, I want the DoIt website and coin system to be accurate and precise with the way coins are exchanged and traded

## Software Architecture & Technology Stack: 
In addition to CRUD functionality, the DoIt web application will include user interaction in a group chat, users' voting on each others' completion of tasks, and the ability to trade and earn coins. For the tech stack, we will use the MongoDB, Express, React, and Node.js. More technologies may be introduced if needed, programming languages could be Javascript and Python.


## Similar Apps:
Forest. Forest users can earn points and plant a tree by not using their cell phones. If they use their cell phone during that period their tree will die. However, the app lacks interaction with other users and customizability. For our app, users will feel more excited with the "betting system" and be more engaged with the community.