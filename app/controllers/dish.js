// page setup
var navi = Alloy.Globals.naviWindow;
$.dishList.title = "Dish";
// get database connection from global variables
var db = Alloy.Globals.db;
// get data from table
var dt = db.getAll("tbl_dish");
// data
var data = [];

// create table rows and labels
for (var i = 0; i < dt.length; i++) {
	// table row
	var row = Ti.UI.createTableViewRow({
		
		//title : dt[i]['d_name'],
		backgroundImage:dt[i]['d_image'],
		
		height : '200dp',
		width:"50dp",
		dishId : dt[i]['d_id'] // this is custom attribute to pass data to next page
	});

	// label for create date (optional)
	var label = Ti.UI.createLabel({
		text : dt[i]['d_name'],
		left : '0dp',
		top : '0dp',
		//color:"#25383C",
		color: "#000",
	shadowColor: '#fff',
    shadowOffset: {x:2, y:2},
    shadowRadius: 2,
		font : {
			fontSize : '30dp',
			fontWeight  : 'bold',
		      },
		dishId : dt[i]['d_id'] // this is custom attribute to pass data to next page
	});
	var Image=Ti.UI.createImageView({
	image:"images/mainmenu/images-18.jpeg",
	opacity:"0.3",
	width: Ti.UI.FILL,
	top:"0dp",
	left:"0dp",
	height:"50dp",
	dishId : dt[i]['d_id']
	});
	
	// add event 'click' for every row
	row.addEventListener('click', function(e) {
		var args = { dishId: e.source.dishId };
		var recipe = Alloy.createController('recipe', args).getView();
		navi.openWindow(recipe, {animated: true});
	});
	
　　
	
    row.add(label);
	row.add(Image);
	
	data.push(row);
	
}

// create tableview, assign data, editable (optional)
var tbl = Ti.UI.createTableView({
	data : data,
	editable : false
	
});

// add table to window
$.dishList.add(tbl);