const {src,dest,watch}=require('gulp');
const cssnano=require('gulp-cssnano');
const htmlmin=require('gulp-htmlmin');
const imagemin=require('gulp-imagemin');
const rename=require('gulp-rename');
const sass=require('gulp-sass');
const uglify=require('gulp-uglify');
const babel=require('gulp-babel');
function fnCopyIndex(){
    return src('./src/index.html')
    .pipe(htmlmin())
    .pipe(dest('./dist'))
}
function fnPages(){
    return src('./src/pages/*.html')
    .pipe(htmlmin())
    .pipe(dest('./dist/pages'))
}
function fnCss(){
    return src('./src/sass/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    // .pipe(cssnano())
    .pipe(rename({suffix:'.min'}))
    .pipe(dest('./dist/css'))
}
function fnJs(){
    return src('./src/js/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({suffix:'min'}))
    .pipe(dest('./dist/js'))
}
function fnImg(){
    return src('./src/img/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'))
}
function fnWatch(){
  watch('./src/index.html',fnCopyIndex);
  watch('./src/pages/*.html',fnPages);
  watch('./src/sass/*.scss', fnCss);
  watch('./src/js/*.js',fnJs);
  watch('./src/img/*',fnImg);
}
exports.copyindex=fnCopyIndex;
exports.pages=fnPages;
exports.css=fnCss;
exports.js=fnJs;
exports.img=fnImg;
exports.default=fnWatch;