(function() {
  'use strict';
  angular
    .module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .factory('MenuSearchFactory', MenuSearchFactory);


  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;

    list.isEmpty = function() {
      return list.found != undefined && list.found.length === 0;
    }
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var list = this;

    list.searchTerm = "";

    list.narrowItDown = function() {
      if (list.searchTerm === "") {
        list.items = [];
        return;
      }
      var dataPromise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
      dataPromise.then(function(response) {
        list.items = response;
      })
      .catch(function(error) {
        console.log("Error:", error);
      });
    };

    list.removeItem = function(index) {
      list.items.splice(index, 1);
    };
  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
        return $http({
          method: 'GET',
          url: ('https://davids-restaurant.herokuapp.com/menu_items.json')
        }).then(function (result) {
       
        var items = result.data.menu_items;

        var foundItems = [];

        for (var i = 0; i < items.length; i++) {
          if (items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
            foundItems.push(items[i]);
          }
        }

        // return processed items
        return foundItems;
      });
    };
  }


  function MenuSearchFactory() {
    var factory = function () {
      return new MenuSearchService();
    };

    return factory;
  }

})();
