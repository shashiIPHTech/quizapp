- Requirements  ------------------- 
    -> Node js ( If node is not installed please download node from https://nodejs.org/en/ and install )
    -> Android studio (To run android app) 
    -> XCode (To run ios app) 
    -> React native CLI 

1.  Open Terminal And run command  "node -v" 
        -> if you get response like v10.14.1 then node is installed on your system other wise please install node  
        If node is not installed please download node from https://nodejs.org/en/ and install . and recheck "node -v" 

2.  Check you xcode and android studio working properly or not  

3.  Run command "react-native –v"to check react cli installed or not, if  you get response something like 
        "react-native-cli: 2.0.1"  

Then react cli is already installed otherwise please  install react cli by running command "npm install -g react-native-cli" 

Creating new project ------------------
    To create new project run command "react-native init YourProjectName" 
    After successfully creation of new project go in your project directory  
    "cd YourProjectName" 

Project from git -----------------
    Download project from git  
    Go in downloaded project directory (cd your_project_location) and run these two commands 
        i) npm install 
        ii) react-native link 

4.  Running project on Android and IOS 
        ->IOS: "react-native run-ios" 
        ->Android: "react-native run-android"