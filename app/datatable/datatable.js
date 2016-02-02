'use strict';

angular.module('myApp.datatable', ['ngRoute','ui.utils'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/datatable', {
            templateUrl: 'datatable/datatable.html',
            controller: 'View1Ctrl'
        });
    }])


    .controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {

        $scope.select = {};
        // Set intervels for reload dataTable every 30 seconds.

        setInterval( function () {
            $('#ajaxExample').DataTable().ajax.reload();
        }, 30000 );

        // AJAX method for dataTables.

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

                $(nRow).attr("id",'row_' + aData.id);

                return nRow;
            },
            "fnInitComplete": function (oSettings, json) {
                $scope.$apply(function() {
                    $scope.total = json.total_persons;
                });
            },
            "fnDrawCallback": function (oSettings, json){
                alert("DataTables has redrawn the table");
                $scope.$apply(function() {
                    $scope.total = json.total_persons;
                });
            },

            "fnPreDrawCallback": function (oSettings, json){
                if ($scope.select.data) {
                    return false;
                }
            }
        };


    }]);