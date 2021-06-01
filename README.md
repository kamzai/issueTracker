ISSUE TARCKER

Projects consist of Issues/Tickets. This Might be a feature or a bug.
Issue Tracker is a software that used to effectively manage the issues related to a project

1.  WEB STACK used : NODE.js REACT.js MONGOdb EXPRESS.js

2.  Folder Structure

```bash
    CLIENT 
        |---------public :- Contain the html file
        |
        |---------src :- source folder of the front end
                |
                |-------action
                |
                |-------api
                |
                |-------components
                |        |
                |        |------auth
                |        |------dashboard
                |        |------issue
                |        |       |------isssueDetail
                |        |       |------allIssues
                |        |------profile
                |        |------project
                |        |       |------projectDetail
                |        |       |------allProject
                |        |------sidebar
                |
                |-------reducer
                |
                |-------APP
                |
                |-------routes
                | 
                |-------indes.js (entry point)




    SERVER 
        |---------controllers 
        |           |
        |           |------issue
        |           |
        |           |------project
        |           |
        |           |------user
        |
        |---------middleware 
        |
        |---------models
        |           |
        |           |------issue
        |           |
        |           |------project
        |           |
        |           |------user
        |
        |---------routes
        |           |
        |           |------issue
        |           |
        |           |------project
        |           |
        |           |------user
        |
        |---------index.js
        |        
```

3.  SETUP
    
    Server:-
            a.  Set up a .env file like the provided sample
            b.  setup mongodb cloud
            c.  run "npm install" without qoutes for installing all the dependencies
            d.  run npm start to start the server
            
    Client:-
            a.  run "npm install" without qoutes for installing all the dependencies
            b.  run npm start to start the client side application

4.  ERROR
    
    In case you are facing any error in setting up the project feel free to raise an issue 
