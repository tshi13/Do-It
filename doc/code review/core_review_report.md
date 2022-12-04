Jonathan Code Review:

Design:

The design of the code is well-designed. Most classes are short and concise and focus on one element of the code. We do lack a lot of the Design Principles though, as a lot of our code is interwined as data is shared between each class. We may be breaking Dependency Inversion Principle however I don't believe its something we can fix as that's due to the callback functions created. If we need to change the functionality of that callback for a sub-object then the parent object function may have to change.

Complexity: 

Most classes are rather simple in nature and are pretty clear on their functionality. Home and our server index.js are the only two files that are rather large and complex. However, the code is easy to follow and understand.
 
Tests: 

We don't have any "automated tests", however we do have a couple of error-corrections built in the code to prevent errors from breaking our system. 

Naming:

Variable names are clear. Some class names needed to be updated to be more clear on their purpose. Otherwise, the code names make sense or are clear on their purpose once you read the code.

Comments:

Comments are clear and useful for a quick understanding of the code. We do lack comments in some areas, but that's due to the fact that the code is pretty clear on its purpose. 


Style: 

Code is well formatted for the most part. We likely do have some formatting issues and we definetly have some issues with indentation. 


Documentation: 

There is some documentation on how to clone the code for private use. That being said, I added in some more direct insturctions on how to run the code as well as new package.json scripts to make it easier to run the code.

Updates: 
-- Created an "Unused" folder to store unused code that we may need to reference later on.
-- Added a "How to Run" section to the README.md file.
-- Created a install script in package.json to make it easier to install the code.
-- renamed some classes to be more clear on their purpose and their scope. 
-- removed some unneeded spaces and indents.
-- Created an "axios-settings.js" file to store the axios settings for the code.


Shaopeng Code Review:

Design:
I would consider our code base well-designed. Classes follow the single responsibility principle as most of them are targeted towards one purpose and are largely isolated from each other.
Interface segregation principle is also shown in how we refactor all the api functions used in the frontend in the util folders. Changes to the relevant backend fields are called in the relevant useXXX class.
However, dependecy inversion principle may be violated due to a lot of bi-directional flow from parent and child class using callbacks, but I think that's inevitable due to the nature of React.

Complexity: 
I think our team did great in writing concise and understandable code. When we create a new feature, we use concise naming and code to make sure other members can easily keep working on it.
In addition, the structure of our design makes sure that all components are singular so it is very straightforward to understand what others are doing based on the context. There are some 
situations where multiples if-else are used, which may make the code confusing.
 
Tests: 
Unfortunately, we don't have any structured or automatic testing framework, like JEST, to rigourously testing our app. And therefore, sometimes, an edge case may break our app.

Naming:
Naming is really straightforward both in terms of our file/class naming and our variable naming. I can easily get a sense of the structure of our app just from viewing the file directory.
The naming also allows us to find where the bug is easily.

Comments:
Comments are really clear and straightforward. We do have a lot of commented out codes that may be seem as a bad practive. May need some more comments in the backend API functions.

Style: 
The style is very consistent and apart from issues I may have pointed out above (long if-else, commented out code), the coding style is upheld.

Documentation: 
Yes, the documentation is really clear in setting up and running our app. However, detailed instructions / tutorial on how to use or run our app is lacking, which may be confusing to a lot of players
and we are working on that in our final iteration. 

Updates: 
-- Add / Refine the documentations and comments in server/GroupRoutes
-- Add / Refine the documentations and comments in server/TaskRoutes
-- Remove commented out code in server/UserRoutes
-- Add / Refine the documentations and comments in server/UserRoutes

Yujian Code Review:

Design: 
The code is well designed and compatible to our system. We follow to open-closed principle, most of the functions and class are free to extend without further modificaiton. Also, we follow the interface segregation principle as we do not have a very fat interface so far. However, we failed to follow the dependency inversion principle due to the overall interconnection of the project, which some functions are being used in multiple class.

Complexity:
I dont think so. The code is pretty clear and easy to follow right now; We always do refactoring on specific iterations to make sure our code logic is reasonable.

Tests:
Since it is a web application, we have tested with all the functions on our own. Sadly, We do not have automated tests.

Names:
Yes. I think so. The name is pretty clear and straight forward;

Comments:
We do not include a lot of comment cause the code is very clear and straight forward; We have comment on the area that may easy to confused reader.

Style:
Yes. And we also did refactoring after some iterations to make sure the overall style is good and not lengthy.

Documentations:
Yes, we include the steps to deploy our project locally. All the required package will be installed after follow the steps on readme. In the meantime, we are working on the tutorial for the application itself for the new users. New users can read through the tutorial before using the app.

Updates: 
- change the file "GetStream2.js" to "GetStream.js" since we removed the first version of GetStream.js
- remove the file "ChatBoxv2.js", "chatBox.css" because we are no longer using this version of chat API.
- add documentations and comments to "GroupModal.js"
- delete unused and commented code in the file "GroupModal.js" and "LoginForm.js" 


Ian code review:

My code review focused on the server code in our project. Overall, I found that our design can be refactored and there are limited testing on existing codebase.

1.	Refactoring
In previous iterations, we found that all our routes are clustered together in the index.js file, which is suboptimal as it adds complexity in development. To improve the structure, I created three files: GroupRoutes, TaskRoutes, UserRoutes, each corresponding to DAO we have in the frontend and our UML diagram. In addition, I changed all routes to a more structured way with user routes begin with users/, task routes begin with task, and group routes begin with group/.

With this improvement, the complexity is reduced, design is improved, and future development is made a lot more easier.

2.	Tests
In our backend, there was limited testing to the codes we have. I created end point tests for all get,put and post routes, using supertest and jest. 

Connected to mongoDB database with supertest, I first tested get methods with an existing test user with username ‘test’. Subsequently, I randomly generated a username and password and tested the created the user in the backend in the testing, and then tested update(put) routes that we have.

Fortunately, all tests passed. Due to the time constraint, I did not add tests for tasks routes and group routes. They should definitely be added to validate the robustness of our server code in the future.


Taiming code review:
Design: Our code follows our UML diagram design and is divided into different folders with different functionality. Moreover, we follow a good OOP design where all core functionality is divided into their respective DAO objects (chatDAO, groupDAO, taskDAO, userDAO). This makes our code more maintainable and we can easily make changes to the structure of our database by only modifying a very small number of core files.

Complexity: For frontend files, everything is separated into separated small components, which make it easier to understand, maintain, and update. Our backend is also organized into separate Route files which makes it a lot easier to navigate. 

Tests: We currently do not have automated tests for our code. However, we have done rigorous testing for our backend APIs before they were pushed to production.

Naming: Yes, filenames, classes, and important variables have clear naming, as well as supporting comments for complex procedures.

Comments: We have good comments for non-intuitive code, such as how to use our backend APIs, and other complex situations, e.g. Chat integration, calling specific APIs to fetch/post data.

Style: Yes, code is well formatted, with no unused commented out code/ unused imports.

Documentation: Yes, we have good documentation on how to install and step by step instructions on how to use our application in the README.

Updates:
- Deprecate and remove UseClient.js
- Remove useFBLoginScript.js
- Remove Footer.js
- Remove all unused lines of code/ unused imports from all files
- Refactored all cron operations from index.js backend into separate cronScheduler.js file

Christopher Code Review:

Design: The codebase is well-designed. Each class has a single responsibility, and object inheritance and composition allow for clear relationships between classes. Files like groupDAO.js and userDAO.js follow the Data Access Object model, which is a kind of Dependency Inversion Principle where we use a high-level interface to access the underlying, low-level data in the database.

Complexity: The code could be made somewhat more simple, specifically, in GroupComponent.js functions and variables could be organized better. I just gropued together related functions, and no new functionality was added (link here). Because of the organized filetree and filenames, our use of the Single Responsibility Principle, and our organized and commented code, the code should be relatively easy for other developers to understand in the future.

Tests: We do not have an autograder or autochecker for our tests, but our group has taken care to test thoroughly in the web browser with the console open, carefully check edge cases, and have resilient code that will not crash even if a function call doesn't work (e.g. using Javascript Promises). An example is in TaskModal.js under the handleSubmit() function, where many edge cases are checked first for invalid values entered by the user before they are passed to the database (i.e. data cleaning or checking user input data).

Naming: We did choose very clear and useful variable names, such as "groupID", "taskID", "message", and "createdBy" (in the TaskModal.js class in particular). Our class names are very clear and define the single, focused responsibility of a single file. For example, in the Group folder, we have multiple different files: "GroupList.js", "GroupSettings.js", and "GroupTaskBar.js", to name a few. Each file is named clearly for the single React component it is supposed to render.

Comments: Frequently, our code is clear enough on its own and comments are not needed. In some cases, we could improve our commenting by organizing the code better and removing commented out code. In GroupComponent.js, I added one-line comments which describe each function's purpose.

Style: Yes, the code follows good programming practices such as using interfaces and Data Access Objects (groupDAO, taskDAO, etc.), making each class have a single purpose (Single Responsibility Principle), and making classes open to extension but closed for modification. The Open-Closed principle is seen in the Group object: We can add more React components and features to groups, but the overall concept of the Group (list of users and list of tasks) is set in place.
- Our project does not allow for nested groups, so the Composite design pattern is not something we chose to implement here (we only have one level of groups, no 'groups within groups').
- We follow the Factory Design Pattern with CreateGroupButton.js and groupDAO.js, where these two files are responsible for instantiating as many groups as the user would like.

Documentation: Yes, our README.md is periodically updated with local installation instructions and how to access the deployed website (doit-oose.herokuapp.com).

Total list of updates:
- Reorganized variables and functions in GroupComponent.js and GroupTaskBar.js to group together related variables and functions, improving readability
- Added one-line comments in GroupComponent.js and GroupTaskBar.js to explain functions
