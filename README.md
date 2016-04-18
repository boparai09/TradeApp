# Trade App — Initial version of apps

This project is an basic application skeleton using [AngularJS](http://angularjs.org/).
You can use it to quickly bootstrap your angular webapp projects and dev environment for these
projects.

This AngularJS application is preconfigured to install the Angular framework and a bunch of development 
and testing tools for instant web development gratification.

The app doesn't do much, just shows how to wire two views together. One is login screen and other is trade screen

### Prerequisites

You need git to install some dependencies. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test application. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Create Repo

Download and Unzip the folder

### Run the Application

Application have been preconfigured with a simple development web server.  The simplest way to start
this server is:

```
npm start
```
This command will automatically install dependencies and run application on local.

Now browse to the app at `http://localhost:8080/app/index.html`.

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

## Documentation

We have used ng-docs to write documentation below are dependencies if you need to check docs

* install [grunt-cli](https://github.com/gruntjs/grunt-cli) `npm install -g grunt-cli`
* Then install dependencies with: `npm install`

####Build and run

Run `grunt` and open http://localhost:8000/docs in your Browser.

## Directory Layout

```
app/                    --> all of the source files for the application
  app.css               --> default stylesheet
  components/           --> all app specific modules
    version/              --> version related components
      version.js                 --> version module declaration and basic "version" value service
      version_test.js            --> "version" value service tests
      version-directive.js       --> custom directive that returns the current app version
      version-directive_test.js  --> version directive tests
      interpolate-filter.js      --> custom interpolation filter
      interpolate-filter_test.js --> interpolate filter tests
  view1/                --> the view1 view template and logic
    view1.html            --> the partial template
    view1.js              --> the controller logic
    view1_test.js         --> tests of the controller
  view2/                --> the view2 view template and logic
    view2.html            --> the partial template
    view2.js              --> the controller logic
    view2_test.js         --> tests of the controller
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
  index-async.html      --> just like index.html, but loads js files asynchronously
karma.conf.js         --> config file for running unit tests with Karma
e2e-tests/            --> end-to-end tests
  protractor-conf.js    --> Protractor config file
  scenarios.js          --> end-to-end scenarios to be run by Protractor
```

## Testing

There are two kinds of tests in this application: Unit tests and End to End tests.

### Running Unit Tests

The app comes preconfigured with unit tests. These are written in
[Jasmine][jasmine], which we run with the [Karma Test Runner][karma]. We provide a Karma
configuration file to run them.

* the configuration is found at `karma.conf.js`
* the unit tests are found next to the code they are testing and are named as `..._test.js`.

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will sit and
watch the source and test files for changes and then re-run the tests whenever any of them change.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit.  This is useful if you want to
check that a particular version of the code is operating as expected.  The project contains a
predefined script to do this:

```
npm run test-single-run
```


### End to end testing

The app comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] End-to-End test runner.  It uses native events and has
special features for Angular applications.

* the configuration is found at `e2e-tests/protractor-conf.js`
* the end-to-end tests are found in `e2e-tests/scenarios.js`

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor
can interact with it.

```
npm start
```

In addition, since Protractor is built upon WebDriver we need to install this.  
This project comes with a predefined script to do this:

```
npm run update-webdriver
```

This will download and install the latest version of the stand-alone WebDriver tool.

Once you have ensured that the development web server hosting our application is up and running
and WebDriver is updated, you can run the end-to-end tests using the supplied npm script:

```
npm run protractor
```

This script will execute the end-to-end tests against the application being hosted on the
development server.

### Running the App during Development

The project comes preconfigured with a local development webserver.  It is a node.js
tool called [http-server][http-server].  You can start this webserver with `npm start` but you may choose to
install the tool globally:

```
sudo npm install -g http-server
```

Then you can start your own development web server to serve static files from a folder by
running:

```
http-server -a localhost -p 8080
```

Alternatively, you can choose to configure your own webserver, such as apache or nginx. Just
configure your server to serve the files under the `app/` directory.


## Important Notes

### Assumptions

1) This is first MVP, backend is still pending. So the configuration has been done keeping only UI into mind.
2) User of application already been trained about basic flow of app.
3) Login/ password is already been shared with user.
4) We have covered the technical features on trading screen with wireframe structure. Final CSS changes are still pending.
5) Service layer will be implemented once rest api structure has been discussed.
6) This project has all the tools to be ready and test on local systems. Build related tasks like Minification, Concatination, AMD are pending.

### Approach

First screen is login screen. Type username/ password and go to trading screen. This screen has trading form
as well as previously done tradings. user can add new entry. All validation needs to be correct to go through. We have used
HTML5 validation as well as Regular expressions to validate and show proper error message to user. Below are validation list:
1)	Symbol should be alphanumeric character, with no special character. And length should be inclusive 1 to 10 character
2)	Quantity should be positive number with no decimal point allowed
3)	Price/Target/Stop Loss should be non-zero positive number
4)	Price/Target/Stop Loss should have exactly 2 decimal point
5)	Price/Target/Stop Loss should be a formatted number string, using ‘,’ for the thousands separator and ‘.’ for the decimal separator
6)	Target value must be greater or equal to price.
7)	Stop loss value must be less or equal to price
8)	Transaction Date should be a valid date string in the format DD/MM/YYYY.
9)	Transaction Date should not allow invalid dates i.e. 31st February, 32nd December etc.
10)	 Transaction Date should not be older than present date and should not be greater than 31/12/2025 inclusive

## Contact

For more information on AngularJS please check out http://angularjs.org/

[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[http-server]: https://github.com/nodeapps/http-server
