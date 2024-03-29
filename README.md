# image-thumbnil
## it consist of
- login 
- validating user
- create image thumnail
- test suite using mocha
- istanbul (code coverage)
- swagger
- logging
- dockerize

## install
```
npm install
```
## run test
```
npm test
```
## run
```
npm start
```
**for check api install <a href="https://www.getpostman.com/">postman</a>**

- login 

  first open this url in postman 
  http://localhost:3000/login
  and select post request and select body and send username and password in json format 

 ```
  {
    "username":"mocha",
    "password":"mocah@12345"
  }
 ```
  ![alt text](https://github.com/avsingh999/image-thumbnil/blob/master/screenshots/login.png)
  
 if you send only password then error shown
 ```
  {
    "username":"mocha",
    "password":""
  }
 ```
 ![alt text](https://github.com/avsingh999/image-thumbnil/blob/master/screenshots/login_err.png)
 - validating user
 
  first open this url in postman 
  http://localhost:3000/login
  and select get request and click on send button.you will get auth token
  
  ![alt text](https://github.com/avsingh999/image-thumbnil/blob/master/screenshots/login_get.png)
  
  
- create image thumbnail

  open this url in postman 
  http://localhost:3000/image
  and select post request and click on send button.the original image will save in images directory and thumbnail saved in     thumbanil/images directory
  
  ```
    "url":"http://dailyvocab.com/wp-content/uploads/2014/07/matrimony.jpg"
    
  ```
  ![alt text](https://github.com/avsingh999/image-thumbnil/blob/master/screenshots/image_post.png)
  
  ```
    url:""
  ```
  
  ![alt text](https://github.com/avsingh999/image-thumbnil/blob/master/screenshots/image_err.png)
  
- test suite using mocha & istanbul (code coverage)
   
  **run this command in terminal**
  test suite will run and  generate code test coverage reports in coverage directory.terminal will also show
   
  ```
    npm test
  ```
  
 ![alt text](https://github.com/avsingh999/image-thumbnil/blob/master/screenshots/terminal.png)
 
- logging

  ```
  log file created in log directory
  ```
- swagger

  **run this command in terminal**
  ```
  swagger project edit
  ```
  open link in browser http://127.0.0.1:33513/#/edit here you can check api

  
- dockerize

  **run this command in terminal**
  ```
  sudo docker build -t image-thumbnil
  sudo docker run -p 8080:3000 image-thumbnil
  ```
  conatiner will run on localhost:8080

