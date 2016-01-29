'use strict';

angular.module('myApp.datatable', ['ngRoute','ui.utils'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/datatable', {
            templateUrl: 'datatable/datatable.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
        $scope.ajaxOptions = {
            "ajax": {
                "url": "http://datatable.getsandbox.com/datatable",
                "dataSrc": "users",
                "headers": "Content-Type: application/json"
            },
            "columns": [
                {
                    "mRender": function () {
                        return "";
                    }
                },
                { "data": "name" },
                { "data": "age" },
                { "data": "position" },
                { "data": "office" }
            ],
            "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                var oSettings = $('#ajaxExample').dataTable().fnSettings();
                $("td:first", nRow).html(oSettings._iDisplayStart+iDisplayIndex +1);

                //console.log(aData);
                $(nRow).attr("id",'row_' + aData.id);
                //$compile(nRow)($scope);

                return nRow;
            },
            "fnInitComplete": function (oSettings, json) {
                $scope.$apply(function() {
                    $scope.total = json.total_persons;
                });
            }
        };

        var data = {
            "key": 1
        };

        $http({
            method: 'POST',
            url: "http://datatable.getsandbox.com/users",
            headers:
            {"Content-Type": "application/json"},

            data: data
        }).success(function(data, status) {
            console.log("post data");
        })
        
    }]);