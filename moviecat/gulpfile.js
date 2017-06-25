

    var gulp = require("gulp");
    var cssmin = require("gulp-cssmin");
    var uglify = require("gulp-uglify");
    var concat = require("gulp-concat");
    var htmlmin = require("gulp-htmlmin");
    //    1.压缩css

    gulp.task("yscss", function () {

        gulp.src('./src/assets/css/*.css', { base: "./src" })
            .pipe(cssmin())
            .pipe(gulp.dest("./dist"))
    });

    // 2.压缩合并js

    gulp.task("ysjs", function () {

        gulp.src(["./src/**/*.js", "!./src/assets/js/*.js", "!./src/gulp*.js"])
            .pipe(uglify())
            .pipe(concat("all.js"))
            .pipe(gulp.dest("./dist/assets/js"));
    });

    gulp.task("yshtml", function () {

        gulp.src("./src/**/*.html", { base: "./src" })
            .pipe(htmlmin({
                collapseWhitespace: true, //去空格
                removeComments: true//去注释
            }))
            .pipe(gulp.dest("./dist"))
    })


