const domain = 'http://127.0.0.1:5000';
// const domain = 'http://www.hexameal.com';

let searchOffset = 0;
let typeOffset = 0;
let fridgeOffset = 0;

const loadRandomRecipe = () => {
	// Clear seach box vaue
	if (document.getElementById('index-search-box')) {
		document.getElementById('index-search-box').value = "";
	}

	document.getElementById('recipe-placeholder').style.display = 'block';

	fetch(`${domain}/api/recipe/random`)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			const container = document.getElementById('recommended-container');

			for (let i = 0; i < data.recipes.length; i++) {
				recipe = data.recipes[i];

				// Format dish types
				if (recipe.dishTypes.length == 0) {
					dishTypes = 'Not Available';
				}
				else {
					dishTypes = '';

					for (let j = 0; j < recipe.dishTypes.length; j++) {
						if (j == recipe.dishTypes.length - 1) {
							dishTypes += (recipe.dishTypes[j].charAt(0).toUpperCase() + recipe.dishTypes[j].slice(1));
						}
						else {
							dishTypes += (recipe.dishTypes[j].charAt(0).toUpperCase() + recipe.dishTypes[j].slice(1)) + ' / ';
						}
					}
				}

				if (dishTypes.length > 25) {
					modifiedDishTypes = dishTypes.substring(0, 25) + '...';
				}
				else {
					modifiedDishTypes = dishTypes;
				}

				// Format recipe title
				if (recipe.title.length > 23) {
					modifiedTitle = recipe.title.substring(0, 23) + '...';
				}
				else {
					modifiedTitle = recipe.title;
				}

				document.getElementById('recipe-placeholder').style.display = 'none';

				let image = recipe.image.replace('556x370', '636x393');

				// let isImageNotFound = compareImage(image);

				// // if result.passed = true means no image
				// if (isImageNotFound) {
				// 	const extension = image.slice(image.length - 3);
				// 	if (extension == 'jpg') {
				// 		image = image.replace('jpg', 'png');
				// 	}
				// 	else if (extension == 'png') {
				// 		image = image.replace('png', 'jpg');
				// 	}
				// }
				// else {
				// 	image = recipe.image;
				// }

				container.innerHTML += `
					<div class="col-lg-4 col-md-6">
						<a href="/details?recipeId=${recipe.id}">
							<div class="single_place" style="cursor: pointer;">
								<div hidden class="recipe-id">${recipe.id}</div>
								<div class="thumb">
									<img src="${image}" alt="Image not found">
								</div>
								<div class="place_info">
									<h3 title="${recipe.title}">${modifiedTitle}</h3>
									<p title="${dishTypes}">${modifiedDishTypes}</p>
									<div class="d-flex">
										<div class="days">
											<p class="pr-4"><i class="fa fa-user pr-1"></i> ${recipe.servings} Servings</p>
										</div>
										<div class="days">
											<p><i class="fa fa-clock-o pr-1"></i> ${recipe.readyInMinutes} Minutes</p>
										</div>
									</div>
								</div>
							</div>
						</a>
					</div>
				`
			}
		})
		.catch(function (err) {
			console.log("Something went wrong!", err);
		});
}


const onLoadDetails = () => {
	const url = new URL(window.location.href);
	const recipeId = url.searchParams.get("recipeId");

	loadRecipeInformation(recipeId);
	loadSimilarRecipe(recipeId);
}


const loadRecipeInformation = (recipeId) => {
	fetch(`${domain}/api/recipe/information?recipeId=${recipeId}`)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {

			const name = data.title;
			let dishTypes = '';
			const servings = data.servings;
			const time = data.readyInMinutes;
			const equipments = [];
			const ingredients = [];
			const ingredientNames = [];

			const equipmentContainer = document.getElementById('equipment-container');
			const ingredientContainer = document.getElementById('ingredient-container');
			const instructionContainer = document.getElementById('instruction-container');

			let image = data.image.replace('556x370', '636x393');

			// let isImageNotFound = compareImage(image);

			// // if result.passed = true means no image
			// if (isImageNotFound) {
			// 	const extension = image.slice(image.length - 3);
			// 	if (extension == 'jpg') {
			// 		image = image.replace('jpg', 'png');
			// 	}
			// 	else if (extension == 'png') {
			// 		image = image.replace('png', 'jpg');
			// 	}
			// }
			// else {
			// 	image = data.image;
			// }


			// Format dish types
			if (data.dishTypes.length == 0) {
				dishTypes = 'Not Available';
			}
			else {
				dishTypes = '';

				for (let j = 0; j < data.dishTypes.length; j++) {
					if (j == data.dishTypes.length - 1) {
						dishTypes += (data.dishTypes[j].charAt(0).toUpperCase() + data.dishTypes[j].slice(1));
					}
					else {
						dishTypes += (data.dishTypes[j].charAt(0).toUpperCase() + data.dishTypes[j].slice(1)) + ' / ';
					}
				}
			}

			console.log(data);

			// Scraping equipments
			for (let i = 0; i < data.extendedIngredients.length; i++) {
				currentIngredient = data.extendedIngredients[i];

				if (!ingredientNames.includes(currentIngredient.name)) {
					ingredientNames.push(currentIngredient.name);
					ingredientName = currentIngredient.name.charAt(0).toUpperCase() + currentIngredient.name.slice(1);

					if (currentIngredient.measures.us.unitShort == "") {
						ingredient = `${ingredientName} (${currentIngredient.measures.us.amount})`;
					}
					else {
						ingredient = `${ingredientName} (${currentIngredient.measures.us.amount} ${currentIngredient.measures.us.unitShort})`;
					}

				}

				if (!ingredients.includes(ingredient)) {
					ingredients.push(ingredient);
				}
			}


			for (let i = 0; i < ingredients.length; i++) {
				ingredientContainer.innerHTML += `<li><span>${ingredients[i]}</span></li>`;
			}


			// Scraping instructions and equipments
			for (let i = 0; i < data.analyzedInstructions[0].steps.length; i++) {
				steps = data.analyzedInstructions[0].steps;

				currentInstruction = steps[i];

				instructionContainer.innerHTML += `
					<div class="single_destination">
						<h4>Step ${currentInstruction.number}</h4>
						<p>${currentInstruction.step}</p>
					</div>
					`;

				for (let k = 0; k < currentInstruction.equipment.length; k++) {
					if (!equipments.includes(currentInstruction.equipment[k].name)) {
						equipments.push(currentInstruction.equipment[k].name);
					}
				}
			}

			for (let i = 0; i < equipments.length; i++) {
				equipmentName = equipments[i].charAt(0).toUpperCase() + equipments[i].slice(1);

				equipmentContainer.innerHTML += `<li><span>${equipmentName}</span></li>`;
			}


			document.getElementById('recipeName').innerHTML = name;
			document.getElementById('recipeDishTypes').innerHTML = dishTypes;
			document.getElementById('recipeServing').innerHTML = servings;
			document.getElementById('recipeTime').innerHTML = time;
			document.getElementById('recipeImage').src = image;
		})
		.catch(function (err) {
			console.log("Something went wrong!", err);
		});
}


const loadSimilarRecipe = (recipeId) => {
	fetch(`${domain}/api/recipe/similar?recipeId=${recipeId}`)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);

			similarContainer = document.getElementById('similar-container');

			for (let i = 0; i < data.length; i++) {
				recipe = data[i];

				// Format recipe title
				if (recipe.title.length > 23) {
					modifiedTitle = recipe.title.substring(0, 23) + '...';
				}
				else {
					modifiedTitle = recipe.title;
				}

				let image = `https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`;

				// let isImageNotFound = compareImage(image);

				// // if result.passed = true means no image
				// if (isImageNotFound) {
				// 	const extension = image.slice(image.length - 3);
				// 	if (extension == 'jpg') {
				// 		image = image.replace('jpg', 'png');
				// 	}
				// 	else if (extension == 'png') {
				// 		image = image.replace('png', 'jpg');
				// 	}
				// }
				// else {
				// 	image = recipe.image;
				// }

				similarContainer.innerHTML += `
					<div class="col-lg-4 col-md-6">
						<a href="/details?recipeId=${recipe.id}">
							<div class="single_place" style="cursor: pointer;">
								<div hidden class="recipe-id">${recipe.id}</div>
								<div class="thumb">
									<img src="${image}">
								</div>
								<div class="place_info">
									<h3 class="pb-2">${modifiedTitle}</h3>
									<div class="d-flex">
										<div class="days">
											<p class="pr-4"><i class="fa fa-user pr-1"></i> ${recipe.servings} Servings</p>
										</div>
										<div class="days">
											<p><i class="fa fa-clock-o pr-1"></i> ${recipe.readyInMinutes} Minutes</p>
										</div>
									</div>
								</div>
							</div>
						</a>
					</div>
				`;
			}
		})
		.catch(function (err) {
			console.log("Something went wrong!", err);
		});
};


const onIndexSearchRecipe = () => {
	searchTerm = document.getElementById('index-search-box').value;

	window.location.href = `/search?searchTerm=${searchTerm}`;
};


const loadSearchRecipe = (searchOffset) => {
	const url = new URL(window.location.href);
	const searchTerm = url.searchParams.get("searchTerm");

	document.getElementById('recipe-placeholder').style.display = 'block';


	// Skip the recipe that are already loaded
	if (searchOffset == 0) {
		searchOffset = 0;
	}
	else if (searchOffset == null) {
		searchOffset += 6;
	}


	fetch(`${domain}/api/recipe/search?q=${searchTerm}&offset=${searchOffset}`)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			container = document.getElementById('search-result-container');

			for (let i = 0; i < data.results.length; i++) {
				recipe = data.results[i];

				// Format recipe title
				if (recipe.title.length > 23) {
					modifiedTitle = recipe.title.substring(0, 23) + '...';
				}
				else {
					modifiedTitle = recipe.title;
				}


				let image = `https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`;

				// let isImageNotFound = compareImage(image);

				// // if result.passed = true means no image
				// if (isImageNotFound) {
				// 	const extension = image.slice(image.length - 3);
				// 	if (extension == 'jpg') {
				// 		image = image.replace('jpg', 'png');
				// 	}
				// 	else if (extension == 'png') {
				// 		image = image.replace('png', 'jpg');
				// 	}
				// }
				// else {
				// 	image = recipe.image;
				// }

				document.getElementById('recipe-placeholder').style.display = 'none';

				container.innerHTML += `
					<div class="col-lg-4 col-md-6">
						<a href="/details?recipeId=${recipe.id}">
							<div class="single_place" style="cursor: pointer;">
								<div hidden class="recipe-id">${recipe.id}</div>
								<div class="thumb">
									<img src="${image}" alt="Image not found">
								</div>
								<div class="place_info">
									<h3 class="pb-1" title="${recipe.title}">${modifiedTitle}</h3>
									<div class="d-flex">
										<div class="days">
											<p class="pr-4"><i class="fa fa-user pr-1"></i> ${recipe.servings} Servings</p>
										</div>
										<div class="days">
											<p><i class="fa fa-clock-o pr-1"></i> ${recipe.readyInMinutes} Minutes</p>
										</div>
									</div>
								</div>
							</div>
						</a>
					</div>
				`;
			}
		})
		.catch(function (err) {
			console.log("Something went wrong!", err);
		});
};


const onLoadSearchRecipe = (searchOffset) => {
	const url = new URL(window.location.href);
	const searchTerm = url.searchParams.get("searchTerm");

	document.getElementById('search-title').innerHTML = searchTerm;
	loadSearchRecipe(searchOffset);
};


const onExploreRecipe = (type) => {
	sessionStorage.setItem('exploreType', type);

	window.location.href = `/explore`;
};


const onLoadExplore = () => {
	let type;

	typeOffset = 0;

	if (sessionStorage.getItem('exploreType')) {
		type = sessionStorage.getItem('exploreType');
		document.getElementsByClassName('current')[0].innerHTML = type;
		let options = document.getElementsByClassName('option');

		for (let i = 0; i < options.length; i++) {
			if (options[i].innerHTML == type) {
				options[i].classList.add('selected');
			}
			else {
				options[i].classList.remove('selected');
			}
		}

		sessionStorage.removeItem('exploreType');
	}
	else {
		type = document.getElementById('select-recipe-type').value;
		const container = document.getElementById('explore-result-container');
		while (container.firstChild) {
			container.removeChild(container.lastChild);
		}
	}

	loadExploreRecipe(type);
};


const loadExploreRecipe = (type) => {
	if (!type) {
		type = document.getElementById('select-recipe-type').value;
	}

	document.getElementById('recipe-placeholder').style.display = 'block';

	typeOffset += 6;

	fetch(`${domain}/api/recipe/search?q=${type}&offset=${typeOffset}`)
		.then(function (response) {
			return response.json();
		})
		.then(async function (data) {

			const container = document.getElementById('explore-result-container');

			for (let i = 0; i < data.results.length; i++) {
				recipe = data.results[i];

				// Format recipe title
				if (recipe.title.length > 23) {
					modifiedTitle = recipe.title.substring(0, 23) + '...';
				}
				else {
					modifiedTitle = recipe.title;
				}

				document.getElementById('recipe-placeholder').style.display = 'none';


				let image = `https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`;

				// let isImageNotFound = await compareImage(image);

				// // if result.passed = true means no image
				// if (isImageNotFound) {
				// 	const extension = image.slice(image.length - 3);
				// 	if (extension == 'jpg') {
				// 		image = image.replace('jpg', 'png');
				// 	}
				// 	else if (extension == 'png') {
				// 		image = image.replace('png', 'jpg');
				// 	}
				// }
				// else {
				// 	image = `https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`;
				// }


				container.innerHTML += `
				<div class="col-lg-4 col-md-6">
					<a href="/details?recipeId=${recipe.id}">
						<div class="single_place" style="cursor: pointer;">
							<div hidden class="recipe-id">${recipe.id}</div>
							<div class="thumb">
								<img src="${image}" alt="Image not found">
							</div>
							<div class="place_info">
								<h3 title="${recipe.title}">${modifiedTitle}</h3>
								<div class="d-flex">
									<div class="days">
										<p class="pr-4"><i class="fa fa-user pr-1"></i> ${recipe.servings} Servings</p>
									</div>
									<div class="days">
										<p><i class="fa fa-clock-o pr-1"></i> ${recipe.readyInMinutes} Minutes</p>
									</div>
								</div>
							</div>
						</div>
					</a>
				</div>
			`;
			}
		})
		.catch(function (err) {
			console.log("Something went wrong!", err);
		})
};


const compareImage = (imageUrl) => {
	const rembrandt = new Rembrandt({
		// `imageA` and `imageB` can be either Strings (file path on node.js,
		// public url on Browsers) or Buffers
		// https://spoonacular.com/recipeImages/715381-556x370.jpg'
		imageA: imageUrl,
		imageB: 'static/img/no-image.jpg',

		// Needs to be one of Rembrandt.THRESHOLD_PERCENT or Rembrandt.THRESHOLD_PIXELS
		thresholdType: Rembrandt.THRESHOLD_PERCENT,

		// The maximum threshold (0...1 for THRESHOLD_PERCENT, pixel count for THRESHOLD_PIXELS
		maxThreshold: 0.01,

		// Maximum color delta (0...255):
		maxDelta: 20,

		// Maximum surrounding pixel offset
		maxOffset: 0,

		compositionMaskColor: Rembrandt.Color.RED // Color of unmatched pixels
	})

	// Run the comparison
	rembrandt.compare()
		.then(async function (result) {
			console.log('Passed:', result.passed)
			console.log('Difference:', (result.threshold * 100).toFixed(2), '%')

			return result.passed;
		})
		.catch((e) => {
			console.error(e)
		})
};


const onAddIngredient = () => {
	const chipContainer = document.getElementById('ingredients-chip-group');
	const item = document.getElementById('ingredient-box').value;
	document.getElementById('ingredient-box').value = '';

	document.getElementById('recipe-placeholder').style.display = 'block';

	document.getElementById('fridge-result-container').innerHTML = '';

	document.getElementById('add-ingredient-btn').classList.add('disabled-button');
	document.getElementById('add-ingredient-btn').disabled = true;

	chipContainer.innerHTML += `
		<div class="chip mt-2">
			<span class="ingredient-item">${item}</span>
			<span class="closebtn" onclick="onRemoveIngredient(this)">&times;</span>
		</div>
	`;

	getRecipeByIngredients(0);
};


const onRemoveIngredient = (context) => {
	context.parentNode.parentNode.removeChild(context.parentNode);

	document.getElementById('recipe-placeholder').style.display = 'block';
	document.getElementById('fridge-result-container').innerHTML = '';

	getRecipeByIngredients(0);
}


const getRecipeByIngredients = async (offset) => {
	const ingredients = document.getElementsByClassName('ingredient-item');
	let query = '';

	for (let i = 0; i < ingredients.length; i++) {
		if (i < ingredients.length - 1) {
			query += (ingredients[i].innerHTML + ',');
		}
		else {
			query += ingredients[i].innerHTML;
		}
	}

	if (offset == 0) {
		fridgeOffset = 0;
	}
	else {
		fridgeOffset += 6;
	}

	let response = await fetch(`${domain}/api/recipe/fridge?offset=${fridgeOffset}&ingredients=${query}`);
	let data = await response.json();

	const container = document.getElementById('fridge-result-container');


	for (let i = 0; i < data.length; i++) {
		recipe = data[i];

		let missedIngredients;
		let missingIngredients;

		if (recipe.missedIngredients.length > 0) {
			missedIngredients = recipe.missedIngredients.map(ingredient => ingredient.name);
		}
		else {
			missedIngredients = [];
		}

		// format missing ingredients;
		if (missedIngredients.length > 0) {
			missingIngredients = missedIngredients.reduce((prev, item, index, ingredients) => {
				if (index < ingredients.length - 1) {
					return prev += (item + ', ');
				}
				else {
					return prev += item;
				}
			}, '');
		}
		else {
			missingIngredients = 'None';
		}



		// Format recipe title
		if (recipe.title.length > 23) {
			modifiedTitle = recipe.title.substring(0, 23) + '...';
		}
		else {
			modifiedTitle = recipe.title;
		}

		let image = `https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`;



		// let isImageNotFound = compareImage(image);

		// // if result.passed = true means no image
		// if (isImageNotFound) {
		// 	const extension = image.slice(image.length - 3);
		// 	if (extension == 'jpg') {
		// 		image = image.replace('jpg', 'png');
		// 	}
		// 	else if (extension == 'png') {
		// 		image = image.replace('png', 'jpg');
		// 	}
		// }
		// else {
		// 	image = recipe.image;
		// }

		document.getElementById('recipe-placeholder').style.display = 'none';

		container.innerHTML += `
			<div class="col-lg-4 col-md-6">
				<a href="/details?recipeId=${recipe.id}">
					<div class="single_place" style="cursor: pointer;">
						<div hidden class="recipe-id">${recipe.id}</div>
						<div class="thumb">
							<img src="${image}" alt="Image not found">
						</div>
						<div class="place_info">
							<h3 class="pb-1" title="${recipe.title}">${modifiedTitle}</h3>
							<p><span style="font-weight: bold;">Missing ingredients:</span> ${missingIngredients}</p>
						</div>
					</div>
				</a>
			</div>
		`;
	}
};

const delay = (callback, ms) => {
	var timer = 0;

	return function () {
		var context = this, args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			callback.apply(context, args);
		}, ms || 0);
	};
};


const onLoadFridgePage = () => {
	$('#ingredient-box').keyup(delay(async function (e) {
		let response = await fetch(`${domain}/api/ingredient/autocomplete?query=${this.value}`);
		let data = await response.json();

		const ingredients = data.map(ingredient => ingredient.name);
		autocomplete(document.getElementById("ingredient-box"), ingredients);
	}, 500));
};


function autocomplete(inp, arr) {
	const ingredientInput = document.getElementById('ingredient-box');

	/*the autocomplete function takes two arguments,
	the text field element and an array of possible autocompleted values:*/
	var currentFocus;
	/*execute a function when someone writes in the text field:*/
	var a, b, i, val = ingredientInput.value;
	/*close any already open lists of autocompleted values*/
	closeAllLists();
	if (!val) { return false; }
	currentFocus = -1;
	/*create a DIV element that will contain the items (values):*/
	a = document.createElement("DIV");
	a.setAttribute("id", this.id + "autocomplete-list");
	a.setAttribute("class", "autocomplete-items");
	/*append the DIV element as a child of the autocomplete container:*/
	ingredientInput.parentNode.appendChild(a);
	/*for each item in the array...*/
	for (i = 0; i < arr.length; i++) {
		/*check if the item starts with the same letters as the text field value:*/
		if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
			/*create a DIV element for each matching element:*/
			b = document.createElement("DIV");
			/*make the matching letters bold:*/
			b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
			b.innerHTML += arr[i].substr(val.length);
			/*insert a input field that will hold the current array item's value:*/
			b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
			/*execute a function when someone clicks on the item value (DIV element):*/
			b.addEventListener("click", function (e) {
				/*insert the value for the autocomplete text field:*/
				inp.value = this.getElementsByTagName("input")[0].value;
				document.getElementById('add-ingredient-btn').classList.remove('disabled-button');
				document.getElementById('add-ingredient-btn').disabled = false;
				/*close the list of autocompleted values,
				(or any other open lists of autocompleted values:*/
				closeAllLists();
			});
			a.appendChild(b);
		}
	};


	inp.addEventListener("input", function(e) {
		var a, b, i, val = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) { return false;}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode.appendChild(a);
		/*for each item in the array...*/
		for (i = 0; i < arr.length; i++) {
		  /*check if the item starts with the same letters as the text field value:*/
		  if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
			/*create a DIV element for each matching element:*/
			b = document.createElement("DIV");
			/*make the matching letters bold:*/
			b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
			b.innerHTML += arr[i].substr(val.length);
			/*insert a input field that will hold the current array item's value:*/
			b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
			/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function(e) {
				/*insert the value for the autocomplete text field:*/
				inp.value = this.getElementsByTagName("input")[0].value;
				document.getElementById('add-ingredient-btn').classList.remove('disabled-button');
				document.getElementById('add-ingredient-btn').disabled = false;
				/*close the list of autocompleted values,
				(or any other open lists of autocompleted values:*/
				closeAllLists();
			});
			a.appendChild(b);
		  }
		}
	});


	inp.addEventListener("focus", function(e) {
		var a, b, i, val = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) { return false;}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode.appendChild(a);
		/*for each item in the array...*/
		for (i = 0; i < arr.length; i++) {
		  /*check if the item starts with the same letters as the text field value:*/
		  if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
			/*create a DIV element for each matching element:*/
			b = document.createElement("DIV");
			/*make the matching letters bold:*/
			b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
			b.innerHTML += arr[i].substr(val.length);
			/*insert a input field that will hold the current array item's value:*/
			b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
			/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener("click", function(e) {
				/*insert the value for the autocomplete text field:*/
				inp.value = this.getElementsByTagName("input")[0].value;
				document.getElementById('add-ingredient-btn').classList.remove('disabled-button');
				document.getElementById('add-ingredient-btn').disabled = false;
				/*close the list of autocompleted values,
				(or any other open lists of autocompleted values:*/
				closeAllLists();
			});
			a.appendChild(b);
		  }
		}
	});

	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener("keydown", function (e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			/*If the arrow DOWN key is pressed,
			increase the currentFocus variable:*/
			currentFocus++;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 38) { //up
			/*If the arrow UP key is pressed,
			decrease the currentFocus variable:*/
			currentFocus--;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 13) {
			/*If the ENTER key is pressed, prevent the form from being submitted,*/
			e.preventDefault();
			if (currentFocus > -1) {
				/*and simulate a click on the "active" item:*/
				if (x) x[currentFocus].click();
			}
		}
	});
	
	function addActive(x) {
		/*a function to classify an item as "active":*/
		if (!x) return false;
		/*start by removing the "active" class on all items:*/
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (x.length - 1);
		/*add class "autocomplete-active":*/
		x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
		/*a function to remove the "active" class from all autocomplete items:*/
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}
	}
	function closeAllLists(elmnt) {
		/*close all autocomplete lists in the document,
		except the one passed as an argument:*/
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}
	/*execute a function when someone clicks in the document:*/
	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
	});
}
