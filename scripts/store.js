console.log('store.js')

const store = (function () {

	const items = [];

	const addItem = function(item) {
		this.items.push(item);
	};

	const findById = function (id) {
		return this.items.find(item => item.id === id)
	};  //when a unique id is passed into this fn it will return the store object with that ID


	return {
		items,
		addItem,
		findById,
	}

}());
	
	
	