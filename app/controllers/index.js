var navi = Alloy.Globals.naviWindow = $.naviWindow;
$.main.title = "Main";

// UI setups
var sv = Ti.UI.createScrollView({
	//showVerticalScrollIndicator: true,
	height: "100%",
	width: "100%",
	//layout: "vertical"
});
var titleImage=Ti.UI.createImageView({
	top:"0dp",
	width:Ti.UI.FILL,
	height:"100dp",
	image:"images/mainview/images-20.jpeg"
});
sv.add(titleImage);

var foodImage=Ti.UI.createImageView({
	top:"100dp",
	width:Ti.UI.FILL,
	height:"200dp",
	image:"images/mainview/images-19.jpeg"
});
sv.add(foodImage);

var buttonImage=Ti.UI.createImageView({
	top:"300dp",
	width:Ti.UI.FILL,
	height:"100dp",
	image:"images/mainview/images-21.jpeg",
	
	
});
sv.add(buttonImage);

buttonImage.addEventListener('click', function() {
	var dish = Alloy.createController('dish', {}).getView();
	navi.openWindow(dish, {animated: true});
});

// events
$.btnDishList.addEventListener('click', function() {
	var dish = Alloy.createController('dish', {}).getView();
	navi.openWindow(dish, {animated: true});
});



$.main.add(sv);

if(OS_IOS) {
	navi.open();
}
if(OS_ANDROID) {
	$.index.open();
}
