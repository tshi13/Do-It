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
