

$(document).ready(function () {
	api.getItems(function (items) {
		store.setItems(items); 
		render()
		//@TODO make a render method
	})
	
	
});

function generateFormElement() {
	return `
	<form> 
      <label for='js-add-form-title'>Title</label>
      <input type="text" name="title" id="js-add-form-title" placeholder="Wikipedia">
      <label for="js-add-form-url">URL</label>
      <input type="text" name="url" id="js-add-form-url" placeholder="https://www.wikipedia.org/">
      <label for="js-add-form-rating">Rating</label>
      <select>
        <option></option>
        <option value="1">1 star</option>
        <option value="2">2 stars</option>
        <option value="3">3 stars</option>
        <option value="4">4 stars</option>
        <option value="5">5 stars</option>
      </select>                                      <br>
      <label for="js-add-form-desc"></label>
      <input type="text" name="desc" id="js-add-form-desc" placeholder="Describe this website ...">
      <button type="submit">Submit</button>
    </form>`
}

function generateItemElement (item) {
	return `
	<div class="bookmark" id='${store.items.id}'>
      <h2>${store.items.title}</h2>
      <p class="rating">rating: ${store.item.rating}</p>
      
      <!-- dynamic -->
      <div class=${store.items.state}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id malesuada sem. Aenean mi odio, maximus quis libero in, euismod faucibus est. Donec facilisis laoreet cursus. Vestibulum aliquam risus nisl, at accumsan nibh laoreet sit amet. Aliquam commodo nec massa vel imperdiet. Donec placerat luctus urna ut viverra. Nunc faucibus ligula non posuere sollicitudin. Phasellus mollis elit ut ex rutrum, in fermentum sem volutpat. Fusce iaculis venenatis aliquam. Sed ul</p>
        <button type="button" class="js-visit-url">Visit</button>
        <button type="button" class="js-delete-bookmark">Delete</button>
        <button type="button" class="js-edit">Edit</button>
      </div>
    </div>`
}




const handleAddBookmark = () => {
	$('form').submit(event => {
		event.preventDefault();
		//@TODO: actually get the data from the inputs
		api.createItem(/*JSONobject*/json, (item) => {
			store.addItem(item);	
			render();
		});
	});
}

const handleDeleteBookmark = () => {
	$('.bookmark').on('click', (event) => {
		const targetID = $(event.currentTarget).closest('.js-item-id');
		api.deleteItem(targetId, store.deleteItem(targetID)) {
			render();
		}
	});
}