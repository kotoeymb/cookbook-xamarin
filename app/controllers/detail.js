// page setup
var navi = Alloy.Globals.naviWindow;
var args = arguments[0] || {};
$.detail.title = "MainDishDetails";
// get database connection from global variables
var db = Alloy.Globals.db;

var sv = Ti.UI.createScrollView({
	showVerticalScrollIndicator : true,
	height : "100%",
	width : "100%",
	//layout: "vertical"
});
$.detail.add(sv);
// get recipe list according to dishId
var recipes = db.getIngredient(args.rId);
var data = [];

for (var i = 0; i < recipes.length; i++) {
	// recipe name
	var row = Ti.UI.createTableViewRow({
		title : recipes[i]["i_name"],
		font : {
			fontSize : '10dp',
		},
		height : '25dp',
		rId : recipes[i]['i_id'] // custom attribute to pass data
	});

	row.addEventListener('click', function(e) {
		Ti.API.info(e.source.title);

		var baseUrl = "https://www.google.com/search?q=";
		var searchItem = e.source.title;
		var queryUrl = baseUrl + searchItem;

		var params = {
			"urlQuery" : queryUrl, //https://www.google.com/search?q=%E3%81%84%E3%81%8B
		};
		var webView = Alloy.createController('webView', params).getView();
        navi.openWindow(webView, {animated: true});
		// set the position to outside of display
		//webView.left = Ti.Platform.displayCaps.platformWidth;

		
		

	});

	data.push(row);
}

// Create an ImageView.

var recipes = db.getRecipe(args.rId);

for (var i = 0; i < recipes.length; i++) {
	var ImageView = Ti.UI.createImageView({
		image : recipes[i]["r_image"],
		width : Ti.UI.FILL,
		height : "150dp",
		top : "0dp",
		rId : recipes[i]['d_id']
	});

}
sv.add(ImageView);

var recipes = db.getReci(args.rId);

for (var i = 0; i < recipes.length; i++) {
	var label = Ti.UI.createLabel({
		text : recipes[i]["r_descp"],
		left : "8dp",
		right : "8dp",

		font : {
			fontSize : '12dp',
		},

		top : "155dp",
		rId : recipes[i]['d_id']
	});

}
sv.add(label);

// Add to the parent view.
var IngredientTitle = Ti.UI.createLabel({
	text : " Ingredient ",
	top : "230dp",
	width : Ti.UI.FILL,
	height : "25dp",
	font : {
		fontSize : '20dp',
	},
	backgroundColor : "#ADDFFF",
});
sv.add(IngredientTitle);

var rTable = Ti.UI.createTableView({
	height : "200dp",
	top : "255dp",
	data : data,
	editable : true
});

sv.add(rTable);

var DirectionTitle = Ti.UI.createLabel({
	text : " Direction ",
	top : "455dp",
	width : Ti.UI.FILL,
	height : "25dp",
	font : {
		fontSize : '20dp',
	},
	backgroundColor : "#ADDFFF",
});
sv.add(DirectionTitle);
// get direction list according to dishId
var recipes = db.getDirection(args.rId);
var data = [];

for (var i = 0; i < recipes.length; i++) {
	// recipe name
	var row = Ti.UI.createTableViewRow({
		//title : recipes[i]["dr_descp"],

		height : "60dp",
		rId : recipes[i]['d_id'] // custom attribute to pass data
	});

	var directionLabel = Ti.UI.createLabel({
		text : recipes[i]["dr_descp"],
		left : "10dp",
		right : "10dp",
		font : {
			fontSize : '12dp',
		},
		rId : recipes[i]['d_id']
	});
	row.add(directionLabel);
	data.push(row);
}

var dirTable = Ti.UI.createTableView({

	top : "480dp",
	data : data,
	editable : true
});

sv.add(dirTable);

