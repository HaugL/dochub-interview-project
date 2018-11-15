Running The App
===============
#### Install Node
Download the latest Node.js and NPM here: https://nodejs.org/en/download/
This app was developed using Node v10.13.0

#### Install dependencies
Run ```npm install```

#### Start the app
Run ```npm start```
Navigate to [http://localhost:3000/](http://localhost:3000/)

Building The App
================
#### Run the build script
Run ```npm run-script build```

#### Start the server
Run ```node server.js```
Navigate to [http://localhost:8080/](http://localhost:8080/)

Testing the App
===============
Pushing a commit to master automatically runs the linter, all of the tests and then deploys to Heroku

#### Run the linter
Run ```npm run eslint```
You cannot deploy when there are linting errors. The current error threshold is set at 0

#### Run tests
Run ```npm test```
You may need to press the letter a to run all tests after the jest runner loads, depending on the current state of changes

Thought Process While Building The App
======================================
I wanted to app to be visually appealing, with enough features to show off my understanding of the platform/language, while maintaining the integrity of a production level app all under a time crunch. Understanding the forecast should only take a few seconds and should require a fraction of the users attention. To achieve this goal, I made the interface very simple. The eye is drawn to the day and an enlarged icon, as pictures can tell a bigger story with less attention from the user. I tried to make the application as production ready as possible in the time I had. There is a 404 page, the code is chunked/compressed, there is a loading spinner when data is loading, there are integration tests and the project is hooked up to CI/CD through Codeship and Heroku.

Tradeoffs + Future Implementations
======================================
The main tradeoff was time for X (features, imperfections, test coverage, etc.). There are a lot of other things I would like to implement, but there are only so many hours in the day, I'm working a full time job and I have a few other interview coding projects in flight. Here's a list of a few things that fell off the bandwagon:

1. Test coverage: there are only two integration tests implemented and I didn't integration test the two main components (the forecast and address search) working together. Since this was time limited, I wanted to show a demonstration of both feature ability and testing.

2. Loading spinner interaction: The loading spinner has a few issues. It isn't smart or patient. It just renders whenever there isn't a forecast to show without thought to the exact interaction that is occurring (loading for the first time vs searching). It also doesn't delay itself so that it only shows when there are longer running queries. This can cause it to flash if you have fast wifi.

3. Pre-population of the address: the ideal interaction with the starting address would be for it to automatically pull your address given your browsers location. I chose searching multiple addresses over this as I felt that would make the app more interactive

4. More information about the current days weather. The information that is most important when looking at the weather is what's going on right now and for the rest of the day. I'd love to do a temperature graph or something above the forecast that gives a little more information about the next 12 hours. Something similar to google's weather interface in the search product
