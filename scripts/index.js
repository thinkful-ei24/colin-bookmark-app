

$(document).ready(function () {
	api.getItems(function (items) {
		store.setItems(items); 
		render()
		//@TODO make a render method
	})
	
	$('form').submit(event => {
		event.preventDefault();
		//@TODO: actually get the data from the inputs
		api.createItem(/*JSONobject*/, (item) => {
			store.addItem(item);	
			render();
		});
	})
});


