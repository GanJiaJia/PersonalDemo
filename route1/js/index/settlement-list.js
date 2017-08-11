$(window).load(function() {
	centerMiddle();
});
$(window).resize(function() {
 centerMiddle();
});
var currentDate = Date.parse(new Date());  

var preDate = $('.accontlist tr').last().find('td').first().text();
var preDates = Date.parse(new Date(preDate));
var myDate = new Date();    

if (currentDate - preDates > 0) {
	var num = parseInt(Math.random()*3904+2354);
	var html = '<tr><td>'+myDate.toLocaleDateString()+'</td><td>'+num+'</td><td>'+num/2+'</td></tr>';
	$('.accontlist').append(html);
}