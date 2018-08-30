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
		$.ajax({
			type: "POST",
			url: BASE_URL,
			data: item,
			success: function(data) {
				callback(data)
			}


		})
	}

	
	return {
		getItems,
	}



}());