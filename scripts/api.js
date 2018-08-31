const api = (function () {

	const BASE_URL = 'https://thinkful-list-api.herokuapp.com/colin/bookmarks';

	const getItems = function (callback) {
		$.ajax({
		url: BASE_URL,
		success: function(data) {
			callback(data)
		}
	}) 
	}

	const createItem = (item, callback) => {
		console.log(item);
		$.ajax({
			type: "POST",
			url: BASE_URL,
			data: item,
			contentType: 'application/json',
			success: function(data) {
				callback(data)
			}
		}) 
	} //makes an item in remote server, and calls a function on that item

	const updateItem = (item, id, callback) => {
		$.ajax({
			type: "PATCH",
			url: `${BASE_URL}/id`,
			data: JSON.stringify(item),
			success: function(data) {
				callback(data);
			}
		});
	}

	const deleteItem = (id, callback) => {
		$.ajax({
			type: "DELETE",
			url: BASE_URL + '/' + id,
			success: function () { //may need to pass id in as a parameter
				callback()
			}
		});
	}
	
	return {
		getItems,
		createItem,
		updateItem,
		deleteItem,	
	}



}());