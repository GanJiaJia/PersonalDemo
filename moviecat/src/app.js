/*
1. 我们按照功能进行模块划分.
   1.1 首页
   1.2 正在上映
   1.3 即将上映
   1.4 top250
   1.5 电影详情.


2. 我们单独的为每一个功能模块建立1个文件夹.
   每一个文件夹中存储这个模块相关的资源
   2.1 视图. .html文件
   2.2 和这个视图相关的js代码.
   

3. 完成主模块.
   在app.js中创建1个模块.模块和index.html的ng-app相关联.
   这个模块是直接用来管理Index页面的.
   所以我们将其叫做主模块.


4. 再完成首页模块.
   home.js中.
   我们创建1个模块,这个模块是用来管理首页的.
   但是这个页面没有和index.html关联起来.
   所以,就算你将其引入到index.html 它也不会运行.
   '
   我们就让主模块依赖于我们的首页模块.
   这个时候,首页模块就会被执行.

----------------------------------------------
npm: node package manager
     node包管理工具.

     下载1个第三方库:
     1. 去它的官方网站.

npm是一个超市,专门存储第三方库 框架


npm是1个工具, 依赖于node。

1. 安装node。
   http://nodejs.org
   node -v 查看node版本

2. npm工具自然就有了.
   npm -v  查看npm的版本   version

3. 如何在项目中使用npm下载库.
   
   3.1 使用cmd工具进入到我们的项目目录
   3.2 使用 npm init 命令先对项目进行初始化.
   3.3 使用npm下载插件.
       npm install 库名称
       会在项目目录中创建1个 node_modules 文件夹.
       将下载的库以文件夹的形式存储在其中.


       删除. 
       npm uninstall 库名称


       下载指定版本的库.
       npm install 库名称@x.y.z
       查询指定的库有哪些版本.


       --save参数.
       
-------------------------------

1. 豆瓣api的地址
   


*/


(function (angular) {
    //1.创建模块.
    var moviecat = angular.module("moviecat", [
        "moviecat.home",
        "moviecat.detail",
        "movie_list",
        "ngRoute"]);
    //2.进行配置.
    moviecat.config(["$locationProvider", function ($locationProvider) {
        //1.配置锚链接的前置符号.
        $locationProvider.hashPrefix("");
    }]);

   

    moviecat.controller("searchCtrl",["$scope","$window",function($scope,$window){

        $scope.query = function(){
            ///v2/movie/search?q={text}
            alert(0);
            $window.location.hash = "#/search?q=" + $scope.keyWords
        }

    }])

})(angular);