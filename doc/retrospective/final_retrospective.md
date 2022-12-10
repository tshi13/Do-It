## Iteration 5 User Stories Completed
- [x] As a user, I want a better looking landing page, with same sized buttons, doit logo
- [x] As a user, I want better looking task cards UI
- [x] As a user, I want to see a doit logo
- [x] As a user, I want a better looking create group UI
- [x] As a user, I want a group of useful buttons on home page
- [x] As a user, I want the UI to be user-friendly and easily navigable in the program
- [x] As a user, I want a pie chart to show private task progress
- [x] As a user, I want a slideshow with data for my groups
- [x] As a user, I want a quickstart interactive guide popup window

## Reflection

Our groups' goals this iteration were to improve the frontend and UI interface of the DoIt app.
We achieved this goal, and our successes and challenges are below.

### Successes
Our team completed the above user stories.   Specifically, we focused on designed an appealing logo, landing page, and login page. Furthermore, we included buttons, personal tasks, a pie chart, and a slideshow to fill up some space on the home page, which also greatly contributed to the frontend design.

### Challenges we encountered
- We worked on the pie chart, and sometimes a message like "Negative values not allowed in pie chart" arose. Jonathan and Taiming fixed this issue. 
- Margins, spacing, and page height on the webpage were somewhat challenging to work with sometimes.
- Our group sometimes forgot to change the backend Axios base URL between localhost:5000 and https://backend-oose-doit.herokuapp.com. This caused some minor deployment issues from time to time.

### Reflection on the last five iterations as a whole

#### Revisiting our original project proposal (SRS Iteration 1), noting changes, and noting what we have and haven't delivered

Accomplished:
- All must have and nice to have features in SRS 1, along with others added along the way up to and including SRS 5. The exceptions are listed below, mostly resulting from changes in plan with voting, using real money, and social media functionality:

Didn't accomplish (modified our original plan along the way):
- As a user, I want to be able to enter the percentage of coins I lose when I fail to complete a task 
- As a user, I want to be able to vote on whether a group member has finished their tasks  
- As a developer, I want to be able to ban certain users if necessary
- As a user, I want to be able to purchase DoIt coins with real money
- As a user, I want to be able to withdraw the coins in my account and receive real money
- As a user, I want to be able to adjust the percentage of votes required to be considered that a task is completed  
- As a user, I want to be able to join a variety of public rooms sorted by interests/task category  
- As a user, I want to be able to post my progress to the public  
- As a user, I want to be able to gain followers and also follow others  
- As a user, I want to be able to report application bugs, suggestions, inappropriate behavior from other users

#### Challenges we have had throughout the last five iterations
- An initial challenge was getting off the ground in iteration 1. That is, it was a challenge to set up the backend and frontend from scratch and get groups and tasks to render.
- It was also challenging to design the User, Group, and Task schemas in Mongoose to show exactly what fields they had. In fact, over time we updated them to better reflect the information that was necessary for each.
- Finally, we faced a challenge in figuring out  how to have an anti-setup strategy for not having users set up each other purposely. In the end, we decided to have group members redeem their own coins for completing a task, and we eventually implemented a voting system.

### What we will do differently for Iteration 1 of the next software project we do
For Iteration 1 of the next software project we do, we plan to discuss what kinds of features we will add next, possibly related to further frontend improvement (i.e. updating the UI/UX appearance of the app).

If we do frontend work again, it would be great to look into more external libraries to use, since this time our experience working with external libraries (CSS styling, pie charts, group slideshow, MUI task cards) turned out pretty well.

Finally, the strategy of using a soft deadline throughout iterations was really helpful. Whenever we used a soft deadline, our team finished individual parts early, allowing for ample time to combine together our individual files into a working version for the whole group.