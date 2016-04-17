'use strict';

describe('myApp.view1 module', function() {

  beforeEach(module('myApp.view1'));

  describe('view1 controller', function(){
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
          MainCtrl = $controller('View1Ctrl', {
              $scope: scope,
              $location:location
          });
      }));

      it('Credential check function should be there', function () {
          expect(scope.checkCred).toBeDefined();
      });
      it('Should navigate to first page', function () {
          scope.checkCred();
          expect(location.newPath).toBe('/view2');
      });
  });
});