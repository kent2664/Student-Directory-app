# Student-Directory-app
This is a project for Assignment that involves entry students data and access to the Web API

## Features

- Save  
When the user click the save button ,It takes name and grade from form.
Check if the name exists in the records (Set Class).
If it exists in the records, show an error message; otherwise, save  it to LocalStorage as a Map object.

    To avoid errors, I used the Promise and setTimeout pattern for this saving function.
    Then, it calculates the average grades.


- Read Students Data from API  
When the page load, It calls APi to get Students data.
and Extract key information and display in the Table.
This function uses fetch to get the student data and will await the process until the API call is complete.



#### ES6 features ###
Map: Storing Students data  :L13  
Set: Checking duplicate  :L12   
Timeout: Making time delay for calculation  :L51  
Promiss: Making the function Asynchronous  :L51  
Destructuring: For displaying the students data that get from API. :L82  
Let,Const :For variables,Html elemtns :L10 ~ L15  
arrow functions: For the callback functions :L93

