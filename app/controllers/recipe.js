// page setup
var navi = Alloy.Globals.naviWindow;
var args = arguments[0] || {};
$.recipeList.title = "Dishes";
// get database connection from global variables
var db = Alloy.Globals.db;

// get recipe list according to dishId
var recipes = db.getRecipes(args.dishId);
var data = [];

for(var i = 0; i < recipes.length; i++) {
	// recipe name
	var row = Ti.UI.createTableViewRow({
		//title: recipes[i]["r_name"],
		backgroundImage:recipes[i]["r_image"],
		height : '300dp',
		width:"50dp",
		
		rId : recipes[i]['r_id'] // custom attribute to pass data
	});
	var title = Ti.UI.createLabel({
		text: recipes[i]["r_name"],
		left : '0dp',
		top : '0dp',
		color: "#000",
	shadowColor: '#fff',
    shadowOffset: {x:2, y:2},
    shadowRadius: 2,
		font : {
			fontSize : '20dp',
			fontWeight  : 'bold',
		      },
		rId : recipes[i]['r_id'] // this is custom attribute to pass data to next page
	});
	var Image=Ti.UI.createImageView({
	image:"images/mainmenu/images-18.jpeg",
	opacity:"0.3",
	width: Ti.UI.FILL,
	top:"0dp",
	left:"0dp",
	height:"50dp",
	rId : recipes[i]['r_id']
	});
	// recipe duration
	var label = Ti.UI.createLabel({
		text : recipes[i]['r_duration'],
		color:"#fff",
		left : '15dp',
		bottom : '10dp',
		font : {
			fontSize : '20dp'
		},
		rId : recipes[i]['r_id'] // custom attribute to pass data
	});
	
	
	row.addEventListener('click', function(e) {
		var args = { rId: e.source.rId };
		var detail = Alloy.createController('detail', args).getView();
		navi.openWindow(detail, {animated: true});
	});
	
	
	row.add(Image);
	row.add(title);
	row.add(label);
	data.push(row);
}

var rTable = Ti.UI.createTableView({
	data: data,
	editable: true
});

$.recipeList.add(rTable);