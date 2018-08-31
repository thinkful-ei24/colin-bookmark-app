

$(document).ready(function () {
	api.getItems(function (items) {
		store.setItems(items); 
		render()
	})
	handleDeleteBookmark();
	handleShowFormButton();
	handleBookmarkExpansion();

	// TODO - This isn't being initiallized if the 
	//        page is loaded and this isn't in the DOM
	//        e.g. If you have store.showForm = false
	//             on page load, then this will fail.
	handleAddBookmark();
	filterByRating();

	
});

const generateFormElement = function () {
	
	let errorText = store.getError() ? `<p aria-label="${store.getError()}">${store.getError()}</p>` : '';

	console.log(errorText);
	return `
    <form aria-label="Add a new bookmark" id="js-add-new"> 
      <label for='js-add-form-title'>Title</label>
      <input type="text" name="title" id="title" placeholder="Wikipedia">
      
      <label for="js-add-form-url">URL</label>
      <input type="text" name="url" id="url" placeholder="https://www.wikipedia.org/">
      


      <label for="js-add-form-rating">Rating</label>
      <select name="rating" id="rating">
        <option></option>
        <option value="1">1 star</option>
        <option value="2">2 stars</option>
        <option value="3">3 stars</option>
        <option value="4">4 stars</option>
        <option value="5">5 stars</option>
      </select>                               
      
      <label for="js-add-form-desc">Description</label>
      <input type="text" name="desc" id="desc" placeholder="Describe this website ...">
      <button type="submit">Submit</button>
      ${errorText}
    </form>`
};

function generateItemElement (item) {
	
	
	let ratingDiv = '';
	let descDiv = ' ';
	if (item.rating) ratingDiv = `<p class="rating">rating: ${item.rating}</p>`;
	if (item.desc) descDiv = `<p>${item.desc}</p>`;

	if (item.rating >= getFilterRating()) {
	return `
	<li class="bookmark" id='${item.id}'>
      <div class="bookmark-heading">
      	<h2 class="bookmark-title">${item.title}</h2>
      	${ratingDiv}
      </div>
      
      <div class="${item.state}">
     	${descDiv}
        <button type="button" class="js-visit-url"><a href="${item.url}" target="_blank">Visit</a></button>
        <button type="button" class="js-delete-bookmark">Delete</button>
        <button type="button" class="js-edit">Coming soon!</button>
      </div>
    </li>`
	};
}

function generateBookmarkDisplay (items) {
	const bookmarkHtml = items.map(item => generateItemElement(item));
	return bookmarkHtml.join('');

}

function render () {
	if (store.showForm === true) {
		$('.bookmark-creation').html('');
	}
	else {
		$('.bookmark-creation').html(generateFormElement());
		handleAddBookmark();
	}


	const bookmarkItemsString = generateBookmarkDisplay(store.items);
	$('.js-bookmark-display').html(bookmarkItemsString);
}


const onSuccess = function (item) {
	store.addItem(item);
	store.setError(null);
	render();
};

const onError = function (error) {
	error = JSON.parse(error.responseText);
	store.setError(error.message);
	render();
};


const handleAddBookmark = () => {
	$('#js-add-new').submit( (event) => {	
		event.preventDefault();
		let formData = {
			title: $('#title').val(),
			url: $('#url').val(),
		};

		if ($('#desc').val()) formData.desc = $('#desc').val(); 
		if ($('#rating').find(":selected").val()) formData.rating = $('#rating').find(":selected").val();
	
		formData = JSON.stringify(formData);
		api.createItem(formData, onSuccess, onError);
	});
}

const handleDeleteBookmark = () => {
	$('ul').on('click', '.js-delete-bookmark', (event) => {
		const targetID = $(event.currentTarget).closest('.bookmark').attr('id');

		api.deleteItem(targetID, () => {
			store.deleteItem(targetID); 
			render();
		});
	});
}


const handleShowFormButton = () => {
	$('#show-add-form').on('click', (event) => {
		store.showHideForm();
		render();
	});	
}

const handleBookmarkExpansion = () => {
	$('.js-bookmark-display').on('click', '.bookmark-heading', (event) => {
		const targetItem = store.findById($(event.currentTarget).parent().attr('id')); 
		store.changeCollapsedState(targetItem); 
		render();
	});
}

const getFilterRating = function () {
	const filterValue = $('#rating-filter').val();
	return filterValue;
}

const filterByRating = function () {
	$('#rating-filter').change(event => {
		render()
	});
}
