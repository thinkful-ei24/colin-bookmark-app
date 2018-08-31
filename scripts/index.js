

$(document).ready(function () {
	api.getItems(function (items) {
		store.setItems(items); 
		render()
	})
	handleAddBookmark();
	handleDeleteBookmark();
	handleShowFormButton();
	
});

const generateFormElement = function () {
	return `
    <form id="js-add-new"> 
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
      </select>                                      <br>
      
      <label for="js-add-form-desc"></label>
      <input type="text" name="desc" id="desc" placeholder="Describe this website ...">
      <button type="submit">Submit</button>
    </form>
  </div>`
};

function generateItemElement (item) {
	return `
	<li class="bookmark" id='${item.id}'>
      <h2>${item.title}</h2>
      <p class="rating">rating: ${item.rating}</p>
      
      <!-- dynamic -->
      <div class=${item.state}>
        <p>${item.desc}</p>
        <button type="button" class="js-visit-url">Visit</button>
        <button type="button" class="js-delete-bookmark">Delete</button>
        <button type="button" class="js-edit">Edit</button>
      </div>
    </li>`
}

function generateBookmarkDisplay (items) {
	const bookmarkHtml = items.map(item => generateItemElement(item));
	return bookmarkHtml.join('');

}

function render () {


const bookmarkItemsString = generateBookmarkDisplay(store.items);
	$('.js-bookmark-display').html(bookmarkItemsString);
}

const handleAddBookmark = () => {
	$('#js-add-new').submit( event => {	
		event.preventDefault();
		let formData = {
			title: $('#title').val(),
			url: $('#url').val(),
			desc: $('#desc').val(), //@TODO make option
			rating: $('#rating').find(":selected").val() //@TODO makeoptional
		};
		formData = JSON.stringify(formData);
		api.createItem(formData, (item) => {
			store.addItem(item);	
			render();
		});
	});
}

const handleDeleteBookmark = () => {
	$('ul').on('click', '.js-delete-bookmark', (event) => {
		console.log('foo');
		const targetID = $(event.currentTarget).closest('.bookmark').attr('id');

		api.deleteItem(targetID, () => {
			store.deleteItem(targetID); 
			render();
		});
	});
}

const handleAddBookmarksForm = () => {
	$('')
}

const handleShowFormButton = () => {
	if (store.showForm === false) {
		$('#show-add-form').on('click', (event) => {
			console.log(store.showForm);
			if (store.showForm === false) {
				$('.bookmark-creation').html(generateFormElement());
			}
			else {
				$('.bookmark-creation').html('');
			} 
			store.showHideForm();
			render();
		});
	}
}