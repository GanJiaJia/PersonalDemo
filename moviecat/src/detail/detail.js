(function (angular) {


    var app = angular.module("moviecat.detail", ["ngRoute", "hm"]);
    app.config(["$routeProvider", function ($routeProvider) {

        $routeProvider.when("/detail/:id", {

            templateUrl: "./detail/detail.html",
            controller : "detailCtrl"

        });
    }])

    app.controller("detailCtrl", ["$scope", "$routeParams", "hmjsonp",
        function ($scope, $routeParams, hmjsonp) {
            $scope.isShow = true;
            var id = $routeParams.id;
            // console.log(id);
            hmjsonp.jsonp({

                url: "http://api.douban.com/v2/movie/subject/" + id,
                params: {},
                callback: function (data) {
                    $scope.movie = data;
                    // console.log(data);
                    $scope.isShow = false;
                    $scope.$apply();
                    
                }
            })

        }])



})(angular)