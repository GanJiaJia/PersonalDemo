/*
  这是负责首页模块的代码.

*/

(function(angular){
    //1.创建首页模块
    var moviecat_home = angular.module("moviecat.home",["ngRoute"]);
    //2.配置和首页相关的路由.
    moviecat_home.config(["$routeProvider",function($routeProvider){
        $routeProvider.when("/home",{
            templateUrl:"./home/home.html"//
        }).when("/",{
            redirectTo:"/in_theaters"
        })
    }]);
})(angular);