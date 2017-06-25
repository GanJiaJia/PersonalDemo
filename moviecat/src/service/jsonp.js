(function (angular) {

    var app = angular.module("hm", []);
    app.service("hmjsonp", ["$window", function ($window) {
        this.jsonp = function (opts) {

            var url = opts.url + "?";

            for (var k in opts.params) {
                url += (k + "=" + opts.params[k] + "&");
            };

            var callbackName = "jsonp_" + Math.random().toString().slice(2);
            $window[callbackName] = opts.callback;
            var script = $window.document.createElement("script");
            script.src = url + "callback=" + callbackName;
            $window.document.body.appendChild(script);
        };


    }]

    );

    app.directive("myActive",function(){

        return {

            restrict : "A",
            // replace : false
            // templateUrl : "../"
            // template : "<><>"
            link : function(scope,element,attrs){

                element.on('click',function(){

                    element.parent().children().removeClass("active");
                    element.addClass("active");
                })
            }
        };
    });

})(angular)