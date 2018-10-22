(function () {
    'use strict';

    var app = angular.module('ShoppingListCheckOff', [])
            .controller('ToBuyController', ToBuyController)
            .controller('AlreadyBoughtController', AlreadyBoughtController)
            .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    // LIST #1 - controller
    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var list = this;
        list.errorMessage = "";
        list.toBuy = ShoppingListCheckOffService.toBuy;
        list.quantity = [];

        list.buyItem = function (index) {
            if(isNaN(list.quantity[index])) {
                list.errorMessage = "Enter quantity";
                return;
            }
            ShoppingListCheckOffService.buyItem(index,list.quantity);
            if (list.toBuy.length == 0) {
                list.errorMessage = "Nothing to buy";
            } else {
                list.errorMessage = "";
            }
        }

        if (list.toBuy.length == 0) {
            list.errorMessage = "Nothing to buy";
        } else {
            list.errorMessage = "";
        }


    }


// LIST #2 - controller
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var list = this;
        list.bought = ShoppingListCheckOffService.bought;

        list.errorMessage = "";
        
        list.getBought = function ( ) {

            
            if (list.bought.length == 0) {
                list.errorMessage = "Nothing bought yet";
            } else {
                list.errorMessage = "";
            }
            return list.bought;
        }
        
        if (list.bought.length == 0) {
            list.errorMessage = "Nothing bought yet";
        } else {
            list.errorMessage = "";
        }
    }

    function ShoppingListCheckOffService() {
        var service = this;
        //store 2 separate arrays in the service: one to hold "to buy" items and one to hold "bought" items
        service.toBuy = ["  cookies", " candies", " pies"];
        service.pricePerItem=[2,3,5];
        service.bought = [];
        service.quantity = [];
        service.price = [];

        service.buyItem = function (itemIndex, quantity) {

            service.bought.push(quantity +" "+service.toBuy[itemIndex]+" for $"+(quantity[itemIndex]*service.pricePerItem[itemIndex]));
            service.price.push(service.pricePerItem[itemIndex]);
            service.quantity.push(quantity[itemIndex]);
            //quantity[itemIndex]=0;
            quantity.splice(itemIndex, 1);
            service.toBuy.splice(itemIndex, 1);
            service.pricePerItem.splice(itemIndex, 1);


        }
    }

})();