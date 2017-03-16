# CMS (content management system).
[![Build Status](https://travis-ci.org/ten-weeks/CMS.svg?branch=master)](https://travis-ci.org/ten-weeks/CMS)
[![Code Climate](https://codeclimate.com/github/Alaa-Khattab/myCMS/badges/gpa.svg)](https://codeclimate.com/github/Alaa-Khattab/myCMS)
[![Test Coverage](https://codeclimate.com/github/Alaa-Khattab/myCMS/badges/coverage.svg)](https://codeclimate.com/github/Alaa-Khattab/myCMS/coverage)
[![Issue Count](https://codeclimate.com/github/codeclimate/codeclimate/badges/issue_count.svg)](https://codeclimate.com/github/codeclimate/codeclimate)

## our project is a blog with Content Management System that allows the admin to manage the website.

#### Phase 1 : Create login page for admin
 - The admin can open an admin page by enter (the website link)/admin => https://blog-website.herokuapp.com/admin
 - The admin can login by your email and password
 - The system check if this user is an admin for control panel or not

#### Phase 2 : Create control panel page, that allows the admin to add title, content and image into a blog page, this data will be inserted into database

![alt text](https://scontent-frt3-1.xx.fbcdn.net/v/t34.0-12/17354676_10208597150105810_1139201974_n.jpg?oh=8d2b2a1b5e44d0ff8cbd9a33e73014cc&oe=58CC77D1)

#### Phase 3 : Create a blog page where the content is available for the site visitors to read.

##### The blog's home page is where admin posts are retrieved from database to be dispalyed.

 ![alt text](https://scontent-frt3-1.xx.fbcdn.net/v/t34.0-12/17352743_10208597149905805_403457084_n.jpg?oh=51e98a7e19b97a4845f48cc4cc73a714&oe=58CC4B5D)
 
 

### Setup and install 
##### For anyone wants to use the website locally :
- You should install this library 
```js
$ npm clone https://github.com/ten-weeks/CMS.git
```
- Make sure to install all the indepandaceies
```js
$ npm i
```
- You should download the data base on your device like postgres data base
  (https://tecadmin.net/install-postgresql-server-on-ubuntu/)
- You should add data base config (username, database name, and password)
- Then you should Execute the code by ( npm start ) command
```js
$ npm start
```

##### If you want to use the website globally, you need to create global database like create data base on heroku website, then add the data base config ( username, data base name, password, host ,port ..) in the code.
 
 

##### We use backend  TDD
##### We use postgres database to insert,select and delete data
##### We use validation and authentication for admin information

#### Our website : https://blog-website.herokuapp.com
