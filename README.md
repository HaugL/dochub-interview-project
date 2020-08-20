[Live Demo](https://dochub-weather-app.herokuapp.com/)

Project Requirements
======================================
**1.  The site is built using a modern javascript framework (eg, ember, angular, react, vue, etc...)**
This site is built with React and Redux with Jest and Enzyme for testing

**2. The site contains multiple pages (and transitioning between them can be done without reloading the entire page).**
This site contains two main pages: a weekly forecast and a daily forecast. Transitions between the two are done without reloading the page, using react router. This is important because it reduces the need for duplicative network requests to load the pages and to fetch the API data.

**3. The site demonstrates reusable components and or other types of refactoring.**
I improved upon this existing project to show both the daily forecast in addition to the existing weekly forecast. I did this by refactoring the existing components to be more generic and resuable. This included a few name changes for the components as well as some classes along with making the input data type agnostic. This way the same components could be used with a simple splitting of logic at the top of the component tree.

**4. The website is responsive**
This site was designed to be mobile first. It naturally works on all device widths without any grid specifics or media queries.

**5. The site uses and correctly deploys javascript packages**
This uses the normal React build script with a specific production wepback configuration. [Please see the hosted version here](https://dochub-weather-app.herokuapp.com/ "Please see the hosted version here") for confirmation of correct deployment. Please not that this is hosted on a free Heroku instance and may take a few seconds to load up if the instance is asleep.

**6. The site's loading performance and SEO is optimized**
I have done the following items to improve SEO
- Codesplit the various components at the router level to prevent the whole app being loaded vs a single page
- The production build chunks and compresses via Gzip
- Images below a certain size are embedded to avoid additional blocking network requests

It is definately not perfect in terms of SEO, though no app usually is. Additional improvements could include further code splitting and reducing the number of dependencies used. If SEO was a high priority item (like for a marketing or content site) for this application, I would not use a client side rendered application like what I've built here. I would either use a server side rendered solution or build a very simple HTML and vanilla JS site to increase speed.

===============

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
