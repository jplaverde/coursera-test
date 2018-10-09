(function () {
'use strict';

var app = angular.module('LunchCheck', []);
 
 
 app.controller('LunchCheckController', function ($scope) {
     
             $scope.showMsg = function (items) {
                 //If the textbox is empty and the user clicks the "Check If Too Much" button
                 if(!items ||  items.length==0) {
                     //If the message is "Please enter data first", make the font color red.
                      $scope.myStyle = {'color':'red'};
                      $scope.boxStyle = {'border-color':'red'};
                     $scope.message = "Please enter data first";  
                     return;
                 }
                 //utilize the split method
                 var lunchItems = items.split(',');
                 var count = 0;
                 //loop over values
                 for (var index in lunchItems){
                     //trim()
                     lunchItems[index] = lunchItems[index].trim();
                     //count if not empty
                     if(lunchItems[index] &&  lunchItems[index].length>0) {
                         
                         count ++;
                     }
                      
                   }
                   //If the message is "Enjoy!" or "Too much!", make the font color green
                   $scope.myStyle = {'color':'green'};
                   $scope.boxStyle = {'border-color':'green'};
               //If the number of items in the textbox is less than or equal to 3 (e.g., 1, 2, or 3)
               
               if(count<=3) {
                   //a message should show up under to the textbox saying
                   
                    $scope.message = "Enjoy!";  
                    
               }else {
                   //the message "Too much!" should show up under the textbox
                    
                   $scope.message = "Too much!";  
               }
                
            };   
           
        });



})();