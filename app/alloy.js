// setting up database for the first time
Alloy.Globals.dbsetting = function() {
	// connect to database
	var db = Ti.Database.open("people");
	// create table
	var sql = "";
	var ins = "";
	var del = "";

	sql += "CREATE TABLE IF NOT EXISTS tbl_dish (d_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, d_name VARCHAR, d_image VARCHAR, cdate VARCHAR DEFAULT CURRENT_DATE, mdate VARCHAR DEFAULT CURRENT_DATE, del INTEGER DEFAULT 0);\n";
	sql += "CREATE TABLE IF NOT EXISTS tbl_recipe (r_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, r_name VARCHAR,r_image VARCHAR, r_descp TEXT, r_duration VARCHAR, r_d_id INTEGER, cdate VARCHAR DEFAULT CURRENT_DATE, mdate VARCHAR DEFAULT CURRENT_DATE, del INTEGER DEFAULT 0);\n";
	sql += "CREATE TABLE IF NOT EXISTS tbl_direction (dr_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, dr_descp TEXT, dr_sort INTEGER, dr_r_id INTEGER, cdate VARCHAR DEFAULT CURRENT_DATE, mdate VARCHAR DEFAULT CURRENT_DATE, del INTEGER DEFAULT 0);\n";
	sql += "CREATE TABLE IF NOT EXISTS tbl_ingredient (i_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, i_name VARCHAR, i_sort INTEGER, i_r_id INTEGER, cdate VARCHAR DEFAULT CURRENT_DATE, mdate VARCHAR DEFAULT CURRENT_DATE, del INTEGER DEFAULT 0);";

	var sqlLines = sql.split("\n");
	for (var a = 0; a < sqlLines.length; a++) {
		db.execute(sqlLines[a]);
	}

	// select
	var dish = db.execute("SELECT * FROM tbl_dish");
	var dish_rs = [];

	// get data row by row from table
	while (dish.isValidRow()) {
		dish_rs.push({
			d_id : dish.fieldByName("d_id")
		});

		dish.next();
	}
	// close resultset
	dish.close();

	// if no row or data was found, create one
	// this block only once as long as tbl_rs contain at least one data row
	if (dish_rs.length <= 0) {
		del += "DELETE FROM tbl_dish;\n";
		del += "DELETE FROM tbl_recipe;\n";
		del += "DELETE FROM tbl_ingredient;\n";
		del += "DELETE FROM tbl_direction;\n";

		// remove all datas
		var delLines = del.split("\n");
		for (var i = 0; i < delLines.length; i++) {
			db.execute(delLines[i]);
		}

		ins += "INSERT INTO tbl_dish (d_id, d_name,d_image) VALUES (1, 'MainDish','images/mainmenu/baked-cornflake-crusted-chicken-strips.jpg'), (2, 'Soup','images/mainmenu/minestrone-soup.jpg'), (3, 'Salad','images/mainmenu/avocado-orange-salad_mainimage2.jpg'), (4, 'Desert','images/mainmenu/695185566IMG_7903detail3.jpg');\n";

		ins += "INSERT INTO tbl_recipe (r_id, r_name,r_image, r_descp, r_duration, r_d_id) ";
		ins += "VALUES (1, 'Baked Cornflake Crusted Chicken Strips','images/mainmenu/baked-cornflake-crusted-chicken-strips.jpg', 'Dip the chicken strips in your favorite sauce, I would recommend which is a perfect addition to this chicken as it is a a bit sweet and spicy...mmm - what a great combination', '40 mins', 1),";
		ins += "(2, 'Sticky Chicken Drumsticks','images/mainDish/sticky_chicken_drumsticks_main2.jpg', 'I used drumsticks this time but it works as well with chicken wings or chicken thighs. Served alongside a fresh salad, sticky chicken drumsticks make one perfect lunch or dinner.', '40 mins', 1),";
		ins += "(3, 'Minestrone Soup','images/mainmenu/minestrone-soup.jpg', 'Minstrone Soup is one of the best known Italian soups. It is a thick soup made with beans, a lot of fresh vegetables and pasta. It is probably one of the most flavorful soups. It is served with pasta and Parmesan which makes it just wonderful.', '2 hr 20 mins', 2),";
		ins += "(4, 'Cabbage Soup', 'images/mainDish/cabbage-soup.jpg','This cabbage soup reminds me a lot of childhood. My mother used to make it a lot, and with time turned to be one of my favorite soup recipe. Healthy, spicy flavorful, the combination of cabbage with dill and thyme is simply perfect.', '50 mins', 2),";
		ins += "(5, 'Chicken, Avocado and Orange Salad','images/mainmenu/avocado-orange-salad_mainimage2.jpg', 'I didnt expect that much from this avocado and chicken salad, but it was beyond my expectations. I ate it all by myself and didnt share it with anybody after finishing the photo shoot:)  I highly recommend it. It is nutritious, healthy and amazingly tasty.', '20 mins', 3),";
		ins += "(6, 'Broccoli and Sweet Potato Salad','images/mainmenu/broccoli-and-sweet-potato-salad.jpg', 'I really love fresh salads. But only few time ago I discovered that I can use fresh broccoli and uncooked sweet potato into a salad, which is great as in this way all those good vitamins dont get lost in the cooking process.Broccoli and sweet potato salad is tasty and perfect for lunch or dinner. One of the best salads weve tried so far.', '15 mins', 3);\n";

		ins += "INSERT INTO tbl_ingredient (i_name, i_sort, i_r_id) VALUES ('2 boneless, skinless chicken breast halves', 101, 1),('1 large egg or 2 smaller ones', 102, 1),('3 cups cornflakes', 103, 1),('1/2 tsp salt', 104, 1),('1 tbsp fresh parsley, chopped', 105, 1),('1 tbsp olive oil', 106, 1),('4 tbsp flour', 107, 1),('Freshly ground black pepper', 108, 1),";
		ins += "('Makes about 2-4 servings', 201, 2),('4 chicken drumsticks', 202, 2),('1 tbsp honey', 203, 2),('1 inch fresh root ginger, grated', 201, 2),('1 tbsp light soy sauce', 204, 2),('1 tbsp chili paste', 205, 2),('1 tsp balsamic vinegar', 206, 2),('oil for greasing the pan', 207, 2),";
		ins += "('Makes about 2-3 servings', 301, 3),('1 cup (about 120 g) broccoli florets', 302, 3),('2.5 oz (70 g) prosciutto cotto', 303, 3),('7 oz (200 g) your favorite pasta (spaghetti, linguini, Fettuccine..)', 304, 3),('2/3 cup (200g) cream', 305, 3),('2 tbsp olive oil', 306, 3),('Salt and freshly ground black pepper', 307, 3),('Parmesan cheese', 308, 3),";
		ins += "('1/2 cup cannellini beans', 401, 4),('3 tbsp oil', 402, 4),('2 onions, chopped', 403, 4),('2 bacon slices, chopped, optional', 404, 4),('3 garlic cloves, minced', 405, 4),('2 carrots, diced', 406, 4),('2 celery sticks or 1/2 cup diced celery root', 407, 4),('3 tomatoes (about 15 oz) skinned, seeded, choppped', 408, 4),('1 can (15 oz) diced tomatoes', 409, 4),('1/2 tsp fresh thyme', 410, 4),('1/2 tsp oregano', 411, 4),('1/2 tsp basil', 412, 4),('2 potatoes, diced', 413, 4),('1 small turnip, diced', 414, 4),('2 cups shredded cabbage', 415, 4),('1 cup small pasta shapes (macaroni, ditalini, shells)', 416, 4),('2 quarts vegetable stock or water', 417, 4),('1 can (15 oz) red kidney beans, rinsed and drained, optional', 418, 4),('salt and freshly ground black pepper', 419, 4),('To garnish', 420, 4),('Parmesan cheese', 421, 4),('Fresh parsley', 422, 4),";
		ins += "('Makes about 8 servings', 501, 5),('2 pounds (800-1000 g) cabbage, finely sliced', 502, 5),('2 tbsp olive oil', 503, 5),('1 large onion, sliced', 504, 5),('2 carrots, sliced', 505, 5),('1 parsley root, diced', 506, 5),('1 cup celery root, diced', 507, 5),('1 red pepper, diced', 508, 5),('1 tsp paprika', 509, 5),('3 tomatoes, puree', 510, 5),('2 quarts (2 liters) vegetable stock or chicken stock or water', 512, 5),('1 chili pepper', 513, 5),('1/2 cup fresh dill, chopped', 514, 5),('1 tsp fresh thyme, chopped', 515, 5),('salt and freshly ground black pepper', 516, 5),";
		ins += "('Makes 5-6 servings', 601, 6),('10 oz (300 g) trout fillet, skinned & boned, cut in 1 inch pieces', 602, 6),('2 onions, diced', 603, 6),('5-6 medium potatoes, cut into 1 inch pieces', 604, 6),('1 tsp fennel seed', 605, 6),('4 cloves garlic, minced', 606, 6),('2 tbsp olive oil', 607, 6),('1/2 tsp paprika', 608, 6),('14 oz (400 g) can pelati tomatoes', 609, 6),('1 quart (1 liter) water', 610, 6),('fresh juice of 1 orange', 611, 6),('1 tsp dried thyme', 612, 6),('3 tbsp fresh celery leaves, chopped', 613, 6),('1/4 cup light soy sauce', 614, 6),('salt and freshly ground black pepper', 615, 6);\n";

		ins += "INSERT INTO tbl_direction (dr_descp, dr_sort, dr_r_id) ";
		ins += "VALUES ('Preheat oven to 400F (200C) and line a baking sheet with parchment paper. Rinse chicken under cold water and pat dry. Cut the chicken in long strips about 1/2 inch thick. Season with salt and pepper.', 101, 1),";
		ins += "('Beat the eggs with oil and set aside. Place the flour on a plate and set aside.', 102, 1),";
		ins += "('Place the cornflakes into a Ziploc bag, seal it and using o rolling pin or simply your hands crush the cornflakes into small pieces.', 103, 1),";
		ins += "('Put the crushed cornflakes into a flat bowl and stir in salt, pepper and parsley.', 104, 1),";
		ins += "('Taking one piece at a time coat chicken strips in flour, then dip in egg mixture and finally coat with seasoned cornflakes, pressing flakes with a fork to help them stick better.Transfer each piece into the prepared baking sheet. Discard remaining flour, egg and cornflakes.', 105, 1),";
		ins += "('Bake for about 30 minutes until golden brown and crisp, flipping them on the other side after the first 15 minutes.', 106, 1),";
		ins += "('Serve with your favourite dipping.', 107, 1),";

		ins += "('Preheat the oven to 400 F (200 C).', 201, 2),";
		ins += "('Score the surface of the drumsticks with a sharp knife in 3 or 4 places, to help the flavor penetrate, and set aside.', 202, 2),";
		ins += "('In a small bowl mix together  honey, ginger, soy sauce, chili paste and vinegar.', 203, 2),";
		ins += "('Coat the drumsticks with the marinade and place on a greased baking dish. If you are not in a hurry you may want to put the drumsticks with the marinade in a plastic bag for at least 30 minutes to let the flavors combine better.', 204, 2),";
		ins += "('Place the drumsticks in the preheated oven, and after 30 minutes of baking start basting the drumsticks with reserved marinade, for few times while baking,  until sticky, caramelized and nicely browned, for another 10 or 15 minutes more.', 205, 2),";
		ins += "('Remove, sprinkle chopped spring onion or chives on top and serve alongside a fresh salad.', 206, 2),";

		ins += "('Place the cannellini beans in a large bowl and cover with water. Leave them to soak overnight.Drain the beans and then rinse under cold water.', 301, 3),";
		ins += "('In a stock pot heat oil over medium-low heat. Add onion, bacon (if used) and garlic and saute for about 5 minutes until soft.', 302, 3),";
		ins += "('Add carrots, celery and salt and cook for another 5 minutes stirring from time to time.', 303, 3),";
		ins += "('Add diced tomatoes, water and vegetable stock, white beans and herbs and bring to boil. Reduce heat, cover the pot and simmer gently for about 1 hr or until beans are tender.', 304, 3),";
		ins += "('Add cabbage, potatoes and turnip and cook for 15 minutes or until all vegetables are tender. Add the red kidney beans, season to taste and is ready to be served.', 305, 3),";
		ins += "('Meanwhile cook pasta in a different pot of boiling water until al dente. Drain and set aside until soup is ready to serve. (You can also choose to cook the pasta directly on the pot of soup if you serve it immediatly, but if you plan to refrigerate the soup is better to keep the pasta outside so they want soak too much liquid.) Refrigerating soup improves the flavors.', 306, 3),";
		ins += "('Serve the soup sprinkled with Parmesan Cheese and garnish with fresh parsley along crusty or toasted bread.', 307, 3),";

		ins += "('In a stock pot heat oil over medium-low heat. Cook onion, carrots, celery, parsley, red pepper and saute  for about 5minutes. Add paprika, tomato puree and stir.', 401, 4),";
		ins += "('Add the vegetable stock and cabbage and bring to boil. Reduce heat, add chili pepper,cover and simmer until vegetables are tender to bite.', 402, 4),";
		ins += "('Add dill, thyme salt and pepper if still needed, simmer 2 more minutes and remove from heat.', 403, 4),";
		ins += "('Serve with sour cream and freshly baked bread.', 404, 4),";

		ins += "('Season chicken fillets with salt and pepper or your favorite spices. Brush with some olive oil. Preheat your grill pan over medium-high heat until its very hot.  Place the fillets on the pan and cook for 3 to 4 minutes on each side until cooked.', 501, 5),";
		ins += "('Roughly chop the lettuce leaves and place in a serving plate.', 502, 5),";
		ins += "('Peel and segment the orange. Juice another half of orange for the dressing.', 503, 5),";
		ins += "('Cut the avocado and chicken in slices.', 504, 5),";
		ins += "('Arrange the oranges, avocado and chicken slices over the lettuce. Sprinkle with almonds and season with salt and pepper.', 505, 5),";
		ins += "('In a small bowl prepare the dressing whisking the orange juice with mustard, oil and honey. Drizzle over the salad and serve.', 506, 5),";

		ins += "('Cut washed broccoli flowerets into small pieces. Cut sweet potato and apple into very thin strips. Combine them in a medium bowl. Add the onion, garlic and walnuts and mix well.', 601, 6),";
		ins += "('Mix the soy sauce olive oil and pepper. Stir into the salad, let chill and serve with crackers.', 601, 6);";

		var insLines = ins.split("\n");
		for (var y = 0; y < insLines.length; y++) {
			db.execute(insLines[y]);
		}
	}
	// close database
	db.close();
};

// database functions
Alloy.Globals.db = ( function() {
		var api = {};

		var conn = Ti.Database.open("people");

		api.getAll = function(table) {
			// get from table
			var rs = conn.execute("SELECT * FROM " + table);
			// columns count
			var ct = rs.fieldCount;
			var results = [];
			while (rs.isValidRow()) {
				var temp = {};
				for (var i = 0; i < ct; i++) {
					var col = rs.fieldName(i);
					temp[col] = rs.fieldByName(col);
				}
				results.push(temp);
				rs.next();
			}
			return results;
		};

		api.getRowCount = function(table) {
			// get from table
			var rs = conn.execute("SELECT * FROM " + table);
			// columns count
			var ct = rs.fieldCount;

			return ct;
		};

		api.getAllDishes = function() {
			// get from table
			var rs = conn.execute("SELECT * FROM tbl_dish");
			// columns count
			var ct = rs.fieldCount;
			var results = [];
			while (rs.isValidRow()) {
				var temp = {};
				for (var i = 0; i < ct; i++) {
					var col = rs.fieldName(i);
					temp[col] = rs.fieldByName(col);
				}
				results.push(temp);
				rs.next();
			}
			return results;
		};
		
		api.getRecipes = function(dishId) {
			var rs = conn.execute("SELECT * FROM tbl_recipe WHERE r_d_id = ?", dishId);
			// columns count
			var ct = rs.fieldCount;
			var results = [];
			while (rs.isValidRow()) {
				var temp = {};
				for (var i = 0; i < ct; i++) {
					var col = rs.fieldName(i);
					temp[col] = rs.fieldByName(col);
				}
				results.push(temp);
				rs.next();
			}
			return results;
		};
		//
	api.getRecipe = function(dishId) {
			var rs = conn.execute("SELECT * FROM tbl_recipe WHERE r_id = ?", dishId);
			// columns count
			var ct = rs.fieldCount;
			var results = [];
			while (rs.isValidRow()) {
				var temp = {};
				for (var i = 0; i < ct; i++) {
					var col = rs.fieldName(i);
					temp[col] = rs.fieldByName(col);
				}
				results.push(temp);
				rs.next();
			}
			return results;
		};
		//
		api.getReci = function(dishId) {
			var rs = conn.execute("SELECT * FROM tbl_recipe WHERE r_id = ?", dishId);
			// columns count
			var ct = rs.fieldCount;
			var results = [];
			while (rs.isValidRow()) {
				var temp = {};
				for (var i = 0; i < ct; i++) {
					var col = rs.fieldName(i);
					temp[col] = rs.fieldByName(col);
				}
				results.push(temp);
				rs.next();
			}
			return results;
		};
        //
        api.getIngredient = function(dishId) {
			var rs = conn.execute("SELECT * FROM tbl_ingredient WHERE i_r_id = ?", dishId);
			// columns count
			var ct = rs.fieldCount;
			var results = [];
			while (rs.isValidRow()) {
				var temp = {};
				for (var i = 0; i < ct; i++) {
					var col = rs.fieldName(i);
					temp[col] = rs.fieldByName(col);
				}
				results.push(temp);
				rs.next();
			}
			return results;
		};
			api.getDirection = function(dishId) {
			var rs = conn.execute("SELECT * FROM tbl_direction WHERE dr_r_id = ?", dishId);
			// columns count
			var ct = rs.fieldCount;
			var results = [];
			while (rs.isValidRow()) {
				var temp = {};
				for (var i = 0; i < ct; i++) {
					var col = rs.fieldName(i);
					temp[col] = rs.fieldByName(col);
				}
				results.push(temp);
				rs.next();
			}
			return results;
		};
		return api;
	}());

// initialization
Alloy.Globals.dbsetting();
