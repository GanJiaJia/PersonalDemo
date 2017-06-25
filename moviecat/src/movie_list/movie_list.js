(function (angular) {

    // 创建正在上映模块

    var movie_list = angular.module("movie_list", ["hm", "ngRoute"])
    movie_list.config(["$routeProvider", function ($routeProvider) {

        $routeProvider.when("/:movieType/:page?", {
            templateUrl: "./movie_list/movie_list.html",
            controller: "movie_listCtrl"
        });

    }]);
    movie_list.controller("movie_listCtrl", ["$scope", "$http", "$routeParams", "$route", "$window", "hmjsonp",

        function ($scope, $http, $routeParams, $route, $window, hmjsonp) {

            $scope.isShow = true;
            $scope.pageIndex = ($routeParams.page || "1") - 0;
            $scope.pageSize = 10;
            hmjsonp.jsonp({

                // url:"http://api.douban.com/v2/movie/in_theaters",
                url: "http://api.douban.com/v2/movie/" + $routeParams.movieType,
                params: {

                    count: $scope.pageSize,
                    start: ($scope.pageIndex - 1) * $scope.pageSize,
                    q: $routeParams.q
                },
                callback: function (data) {

                    console.log(data);
                    $scope.movies = data;
                    $scope.pageCount = $window.Math.ceil(data.total / $scope.pageSize);
                    $scope.isShow = false;
                    //告诉视图,$scope中的数据更新了.
                    //你赶紧刷新你的dom
                    $scope.$apply();
                }
            })


            $scope.getPage = function (pageIndex) {

                if (pageIndex < 1 || pageIndex > $scope.pageCount) { return };
                $route.updateParams({

                    page: pageIndex
                })

            }


        }])

})(angular) 