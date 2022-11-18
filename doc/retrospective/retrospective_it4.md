#### Iteration 4 User Stories Completed (original)
- [x] As a user, I want to have a secure way of logging into my account
- [x] As a user, I want to be notified about the progress of other members in the group

#### Iteration 4 User Stories Completed (more specific)
- [X] As developers, we want to have a backend codebase that is easily navigable with functions refactored into specific files (not all in `index.js`)
- [x] Google Login
- [x] Facebook Login
- [x] DoIt Login
- [x] Move display of personal tasks to profile page
- [X] Seperate Backend into different files
- [X] Deployed to Heroku
- [X] Update Tasks to have a list of users relating to the task. For Group Tasks, its a list of users who have "confirmed" they did the task while for individual group tasks its a list of users who have checked off the task for the other user.
- [X] Users can tell who has been checked off or confirmed for the other tasks.
- [X] Tasks now have the username for the task it was assigned to
- [X] Owners can now confirm tasks are done then mark them finished - paying out the task funds for each user.

## Reflection

Our groups' goals this iteration were login, deployment, and additional gamification of the app. We achieved all three goals. There were some difficulties in getting Facebook Login to work, but as described below, it eventually worked for most devices in most cases.

### Successes
Our team delivered all the user stories outlined above in both sections, the 'general' and the "(more specific)" section. Specifically, the team did a great job on DoIt Login, Google Login, Heroku deployment, cleaning up backend files, and updating the notification and gamification of users joining tasks and getting paid for completing tasks in groups.

### Challenges we encountered
- At first, we did not know how the User Schema would incorporate information about a user's Google ID or Facebook ID, to 'link up' the a user's DoIt account with their Google or Facebook account.
  - The solution to this was for us to store a user's `googleID` and `facebookID` in our database to act as a common 'handle' or 'tunnel' to link up the social media accounts with DoIt accounts.
  - Jonathan created a function, `userDAO.login()`, which contacted the backend and did exactly the logic above (using a `googleID` or `facebookID` to search for an existing user or creating a new one).
  - This allowed for a seamless flow of a user logging in via Google or Facebook and then being logged into their DoIt account.

- Facebook Login (and particularly logout) was not initially working, but after extensive debugging it worked on most computers in most cases.
  - First, the challenge was that login worked fine, but logout was not available. We tried to use two React Facebook Login libraries simultaneously to solve this issue, but the problem persisted.
  - After finding a solution online that helped with logout, we realized that our Facebook login code had compatibility issues with the rest of the codebase.
  - This took a while to track down, eventually making a few changes on the backend to get the `/createUser/` endpoint working okay for Facebook login.
  - The lesson learned from this is to try to use better documented libraries when designing features, and to try to stick to soft deadline when possible to make sure that features can be merged and tested early. Overall the team did a great job with all other features, and there were no other problems. It was just this Facebook Login part that needed some help merging.

### What we will do differently for Iteration 5
For iteration 5, we plan to discuss what kinds of features we will add next, possibly related to further frontend improvement (i.e. updating the UI/UX appearance of the app).

If we use external APIs again, our team hopes to stick more with APIs that have good documentation for our tech stack so that they are easier to work with.

Finally, we are considering trying to stick to a better soft deadline again, especially to help with merging certain features (like Facebook Login this time) which took some time.
