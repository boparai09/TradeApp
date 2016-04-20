'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /login when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/login");
  });


  describe('login', function() {

    beforeEach(function() {
      browser.get('index.html#/login');
    });


    it('should render view1 when user navigates to /login', function() {
      expect(element.all(by.css('[ng-view] div')).first().getText()).
        toMatch(/partial for login/);
    });

  });


  describe('Home', function() {

    beforeEach(function() {
      browser.get('index.html#/home');
    });


    it('should render view2 when user navigates to /home', function() {
      expect(element.all(by.css('[ng-view] div')).first().getText()).
        toMatch(/partial for Trading/);
    });

  });
});
