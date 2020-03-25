const domain = 'http://127.0.0.1:5000'

const loadRandomRecipe = () => {
	fetch(domain + '/api/recipe/random')
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
				if (recipe.title.length > 25) {
					modifiedTitle = recipe.title.substring(0, 25) + '...';
				}
				else {
					modifiedTitle = recipe.title;
				}

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
								<div class="rating_days d-flex justify-content-between">
									<span class="d-flex justify-content-center align-items-center">
										<i class="fa fa-user"></i>
										<a href="#">${recipe.servings} Servings</a>
									</span>
									<div class="days">
										<i class="fa fa-clock-o"></i>
										<a href="#">${recipe.readyInMinutes} Minutes</a>
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
}


const loadRecipeInformation = (recipeId) => {
	fetch(domain + `/api/recipe/information?recipeId=${recipeId}`)
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
}