const domain = 'http://127.0.0.1:5000';
// const domain = 'https://ultimate-cookbook.herokuapp.com';

let searchOffset = 0;
let typeOffset = 0

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

				container.innerHTML += `
					<div class="col-lg-4 col-md-6">
						<a href="/details?recipeId=${recipe.id}">
							<div class="single_place" style="cursor: pointer;">
								<div hidden class="recipe-id">${recipe.id}</div>
								<div class="thumb">
									<img src="${recipe.image}" alt="Image not found">
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
			const image = data.image.replace('556x370', '636x393'); // convert to bigger size
			const equipments = [];
			const ingredients = [];
			const ingredientNames = [];

			const equipmentContainer = document.getElementById('equipment-container');
			const ingredientContainer = document.getElementById('ingredient-container');
			const instructionContainer = document.getElementById('instruction-container');


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

				image = `https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`

				// Format recipe title
				if (recipe.title.length > 23) {
					modifiedTitle = recipe.title.substring(0, 23) + '...';
				}
				else {
					modifiedTitle = recipe.title;
				}

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

			console.log(data);

			for (let i = 0; i < data.results.length; i++) {
				recipe = data.results[i];

				// Format recipe title
				if (recipe.title.length > 23) {
					modifiedTitle = recipe.title.substring(0, 23) + '...';
				}
				else {
					modifiedTitle = recipe.title;
				}

				image = `https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`

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
		.then(function (data) {

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

				image = `https://spoonacular.com/recipeImages/${recipe.id}-636x393.jpg`

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
			`
			}
		})
		.catch(function (err) {
			console.log("Something went wrong!", err);
		})
};