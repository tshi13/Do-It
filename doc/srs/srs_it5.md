# *Software Requirement Specification*

## Problem Statement: 
People often feel unmotivated and discouraged to do academic, professional, and personal tasks. There currently are only to-do list applications that allow you to list and plan the tasks that you need to complete. The market is lacking a solution that focuses on actually pushing users to actually do the tasks!

The Dolt app will help people stay focused with their tasks and be present by connecting with your close friends. People are more motivated by losses rather then gains, so we want to motivate people by introducing consequences. We also allow them to be motivated by recognition and followers across our social platform.

## Potential Clients：
- Anyone who needs help with staying focused and beating their procrastination on academic, professional, and personal goals. College students who are learning and living in group environments may particularly benefit from this app. 
- People who want to acquire new skills, complete tasks, and/or achieve consistency by having groupmates hold each other accountable.
- People who want to gain influence and share their good progress of doing something meaningful with others.

## Proposed Solution: 
Through the betting system in DoIt, users need a certain amount of DoIt coins to play the game. Users can set private tasks for themselves or set tasks for everyone in a group. For group tasks, other people will keep track of them by verifying their progress in the group chat with texts and pictures. The user who fails to do their tasks will lose coins and the rest of the users will spilt the coins evenly. Successful users will be able to help friends gain better habits, get tasks done, earn more coins along the way, and have the opportunity to upload content to the general public. 

Two types of coins exist: free coins and paid coins. Only the paid coins correspond to real money. The free coins exist in order to allow groups to complete tasks even if they choose not to use real money.

In addition to group tasks, individual tasks also exist, for users to complete their own goals outside of groups.

Also, users can search for groups by name and invite code, meaning groups are easy to find and access.

This solution allows users to complete tasks under the supervision of others (and face possible consequences) while enjoying the fun of gaining community recognition and rewards when friends fail to do tasks.  


## Functional Requirements: 

### Must have：
- As a user, I want to be able to create tasks for myself to complete  
- As a user, I want to be able to see tasks that other people have created  
- As a user, I want to be able to create or join private groups with my friends so we can have fun while holding each other accountable for the tasks  
- As a user, I want to be able to create and assign tasks that multiple people can join so that groups of friends can participate on a common, shared task, have friendly competition, and have mutual encouragement
- As a user, I want to be able to enter a certain number of coins to the pool when setting up a task  
- As a user, I want to be able to gain/lose coins when I finish tasks or do not finish tasks (according to a regular timer)
- As a user, I want to be able to search for existing groups and users


### Nice to have
#### Chat
- As a user, I want to be able to send messages and post pictures in the group chat so I can talk with my friends and verify I have completed tasks  
- As a user, I want to be able to see chat history when I log in so that we can see what happened

#### Tasks and Coins:
- As a user, I want to be able to enter a due date or time for when the task is due so that I can be held accountable by others to complete tasks on time 
- As a user, I want to be able to enter the amount of coins I lose when I fail to complete a task
- As a user, I want to be able to interact with task cards so that coin values can be redeemed upon task completion and checkboxes for “Task Done” can be selected by users
- As a user, I want to be able to see "Task Stats" for each task to see who has completed the task so that I can see the group's progress in a task
- As a user, I want to be able to join tasks so that I can opt-in to any tasks
- As a user, I want to be able to click "Submit" on a task card so that I can signal to the rest of the group that I have completed this task
- As a group owner, I want to be able to "finish" a task meaning that users are paid out their share of coins for completing that task up to that point in time
- As a user, I want to be able to resize the tasks bar on the right hand side so that it is scrollable

#### Login    
- As a user, I want to have a secure way of logging into my account
- As a user, I want to be able to login with my social media accounts (Google, Facebook, and DoIt login with hashed password) so I can easily invite and connect my existing friends

#### Social Media Aspect
- As a user, I want to set my profile picture (with scaling and rotating image options) so that other users can identify me easily
- As a user, I want to set the picture of the group so that the group is easily identifiable in the sidebar of groups
- As a user, I want to be notified about the progress of other members in the group

#### Joining Groups (invitations, etc.)
- As a user, I want to be able to invite a user to a group so they can join the group using the invite
- As a user, a random invitation code will be generate when I try to create a group and my friend can use that code to join the group as well.
- As a user, I want to be able to create private groups that are password-protected so that only my friends who know the password can join
- As a user, I want to be able to create private groups that are cost-protected, meaning only users with above a certain threshold of coins can join, so that I can form a group with experienced members with more coins
- As a user, I want to be able to leave a group so that I am not in the group anymore
- As a user, I want to have a group of buttons that includes groups and personal tasks, grouped together in the corner of the page
- As a user, I want the createGroup UI to be easily navigable and user-friendly

#### Logos and landing page
- As a user, I want to see a user-friendly landing page with good UI and the apperance of the DoIt logo on the website, possible as a watermark or picture

### Non-functional Requirements:
- As a user, I want the DoIt website to be accessible on many different screen sizes and browsers
- As a user, I want the DoIt website and server to be available 24/7 so that tasks can be updated anytime
- As a user, I want the UI to be user-friendly and easily navigable in the program

## Software Architecture & Technology Stack: 
In addition to CRUD functionality, the DoIt web application will include user interaction in a group chat with texts and pictures, users' voting on each others' completion of tasks, the ability to search and join groups by invite code or name, the ability to mark shared/group tasks as completed, and the ability to trade and earn coins. For the tech stack, we will use the MongoDB, Express, React, and Node.js. More technologies may be introduced if needed, programming languages could be Javascript and Python.

Specifically, we used MaterialUI to style the front end, and we used Axios in our DAOs (Data Access Objects) to communicate with the database backend. Lastly, for the chat, we used the Stream API to include a functional and quality chat in the app.

GetStream acts a self-contained application with its own database, meaning that it is modularized and separate from the rest of our program. GetStream has its own database which stores all users, groups, and chat messages. MongoDB also stores users and groups, but not chat messages. This point is relevant for our software architecture because our application simulataneously maintains identical records in MongoDB and the GetStream database for users and groups (similar to a foreign key linked across two tables), so that the correct chat messages can be retrieved and rendered for any group in MongoDB.

For our login options, which include DoIt hashed password login, Google login, and Facebook login, we used external libraries. For example, to hash the password, we used an external library. Also, for Google and Facebook logins, we used APIs to handle communicating with those external services for us.

### Built With

Here are major frameworks/libraries we used to build our project.

* [![Node.js][Node.js.com]][Node.js-url]
* [![React][React.js]][React-url]
* [![Express][Express.com]][Express-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![MongoDB][MongoDB.com]][MongoDB-url]
* [![MaterialUI][mui.com]][mui-url]
* [![Axios][axios-http.com]][axios-http-url]
* [![getstream][getstream-http.com]][getstream-http-url]


## Similar Apps:
Forest. Forest users can earn points and plant a tree by not using their cell phones. If they use their cell phone during that period their tree will die. However, the app lacks interaction with other users and customizability. For our app, users will feel more excited with the "betting system" and be more engaged with the community.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/jhu-oose-f22/team-doit-project-repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/jhu-oose-f22/team-doit-project-repo/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/jhu-oose-f22/team-doit-project-repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/jhu-oose-f22/team-doit-project-repo/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[MongoDB.com]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/ 
[Express.com]: https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[Node.js.com]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node.js-url]: https://nodejs.org/en/
[mui.com]: https://img.shields.io/badge/MaterialUI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[mui-url]: https://mui.com
[axios-http.com]: https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white
[axios-http-url]: https://axios-http.com/docs/intro
[getstream-http.com]: https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white
[getstream-http-url]: https://getstream.io/
