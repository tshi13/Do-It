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

