# Project: Lifehouse ![logo](https://raw.githubusercontent.com/logolica99/lifehouse/master/frontend/src/components/img/icons/around-the-world.png)
**Lifehouse** is a **social media**  platform created using django as backend API and React as front-end.


## [Link to the project](https://lifehousegg.netlify.com)
## File description
Two important folders in this directory is **api** and **frontend** folder

1. **Api Folder**
    In this directory the main files are included in the **socials** folder. In this folder **Views.py** file  has all the views defined for 
    the API. The file **models.py** holds all the models required for the api.**Serializers.py** file serializes all the data for the api. 
    Finally the **urls.py** file deals with routing.

2. **Frontend folder**
    In this folder the main files are in the **src** folder. The App.js file in this folder can be used to set the API URL if your api server is running in another machine. while defining the state **apiURL** you can change it to the api url that runs.
    The scss folder contains all the styling files and the component folder holds all the react compnent for different parts of the website.



## How to run the application
1. **To run the API**
    Navigate into the **api** folder with a terminal or cmd and type
    `pip install -r requirements.txt`
    to install all the dependencies. Now run the commands
    `python manage.py makemigrations`
    `python manage.py migrate`
    `python manage.py runserver`
    and this will run the API server
2. **To run the front-end server**
    Navigate into the **frontend** folder and run the command 
    `npm install` 
    to install the dependencies and then run
    `npm start`
    to start the server. After running the server you have to go to the **/src/App.js** file and change the api url (the url in which django server is running).





## Distinctiveness and Complexity

This project is inspired from the social media project but with higher complexity and features.
This project required Django REST framework to run as backend API and React as frontend. This project required two different frameworks to work.
The previous social media project didn't have any form of styling (custom UI) in the frontend which this project provides.
There was  no **Comments**,**Comment likes**, **Search**  or **Notifications** features in the previous project which also this project has. This project required **SASS** for styling.



