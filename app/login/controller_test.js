'use strict';

describe('myApp.login module', function() {

  beforeEach(module('myApp.login'));

  describe('LoginCtrl controller', function(){
      var MainCtrl,
          scope,
          location={
              path: function(path){
                  this.newPath = path;
              }
          };

      // Initialize the controller and a mock scope
      beforeEach(inject(function ($controller, $rootScope) {
          scope = $rootScope.$new();
          MainCtrl = $controller('LoginCtrl', {
              $scope: scope,
              $location:location
          });
      }));

      it('Credential check function should be there', function () {
          expect(scope.checkCred).toBeDefined();
      });
      it('Should navigate to first page', function () {
          scope.checkCred();
          expect(location.newPath).toBe('/home');
      });
  });
});