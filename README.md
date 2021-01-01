# shawn-F-W-A
## How To Run
To download the application from github
```
git clone https://github.com/ziozine/shawn-F-W-A.git
```
To start using this application, go to your terminal, in the root directory of this project, and type
```
npm install package.json
```
This will install all the packages needed to successfully start up the application using.
```
npm start
```
This will successfully run the server side application on **http://localhost:3000/data**
if you are using above url then use this in the body
```
{  
"key":"shawnpp22",
     "data":"kjf;lsdjflkdjslkfjdsf",
     "TimeToLive":"12"
}
 TimeToLive is option in body
```
This will successfully run the server side application on **http://localhost:3000/data/:key**
if you are using above url then use this in the body
```
{  
     "data":"kjf;lsdjflkdjslkfjdsf",
     "TimeToLive":"12"
}
 TimeToLive is option in body
```
