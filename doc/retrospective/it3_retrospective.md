## User stories we finished in iteration3
- [x] As a user, I want to be able to create or join private groups with my friends so we can have fun while holding each other accountable for the tasks
- [x] As a user, I want to be able to send messages and post pictures in the group chat so I can talk with my friends and verify I have completed tasks
- [x] As a user, I want to be able to invite a user to a group so they can join the group using the invite

#### Iteration 3 User Stories Completed (more specific)
- [x] As a user, I want to be able to send messages to others in the group chat so that we can discuss each others' progress
- [x] As a user, I want to be able to see chat history when I log in so that we can see what happened
- [x] As a user, I want to be able to upload pictures to group chat so that we can share progress
- [x] As a user, I want to be able to have a separate chat when I create group or join group
- [x] As a user, a random invitation code will be generate when I try to create a group and my friend can use that code to join the group as well.
- [x] As a user, we hope to have the option of a group invitation code for joining groups so that friends can join the group through invitation code.
- [x] As a user, I want to set my profile picture (with scaling and rotating image options) so that other users can identify me easily
- [x] As a user, I want to set the picture of the group so that the group is easily identifiable in the sidebar of groups
- [x] As a user, I want to be able to create private groups that are password-protected so that only my friends who know the password can join
- [x] As a user, I want to be able to create private groups that are cost-protected, meaning only users with above a certain threshold of coins can join, so that I can form a group with experienced members with more coins
- [x] As a user, I want to be able to leave a group so that I am not in the group anymore
- [x] As a user, I want to be able to interact with task cards so that coin values can be redeemed upon task completion and checkboxes for “Task Done” or "Submit" can be selected by users
- [x] Refactor all class components into function components

## Reflection
In Iteration 3, we successfully used GetStream to include a chat in our group so that users can chat with each other. Additionally, Jonathan added many new features with tasks, such as being able to mark tasks as submitted. We accomplished all of our goals for iteration 3.

One of the challenges we faced in iteration 3 was particularly with getting the chat set up. Working with any external API requires time reading documentation, and our first few days were just us getting oriented with the GetStream docs and how to render a chat. After Taiming used example code to get a chat displaying correctly on our DoIt web app, we were then able to break up tasks into pieces for each member to complete.

Another challenge we faced was with the chat API. We had to use a global moderator to have the correct permissions to create chats and add users to groups, and there were many refactorings of code by our team members to get the chat to render correctly and without any errors in the frontend or backend.

We combined each person's work together by merging all branches around Monday (since our soft deadline was Sunday), and overall we were able to finish the README and finishing touches of the iteration by Wednesday. The soft deadline seemed to work again for this iteration.

For iteration 4, we are looking to implement login functionality (Google, Facebook, our own DoIt hashed password login) and to deploy on Heroku. Additionally, there are some changes to tasks we would like to implement, like being able to join particular tasks and view the group's total progress on group tasks. Our approach will be similar to last iteration; we hope to get our individual parts done early by a soft deadline and then combine our components by merging.