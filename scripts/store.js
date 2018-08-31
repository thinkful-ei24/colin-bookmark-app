

const store = (function () {

	const items = [];

	const addItem = function(item) {
		this.items.push(item);
	};

	const findById = function (id) {
		return this.items.find(item => item.id === id)
	};  //when a unique id is passed into this fn it will return the store object with that ID

	const setItems = function(items) {
		this.items = items;
	}

	const updateItem = function (id, item) {
		const target = findById(id)
		return target = item;
	}

	const deleteItem = function (id) {
		console.log(id);
		this.items = this.items.filter(item => item.id !==id);
		console.log(store.items);
	}

	return {
		items,
		addItem,
		findById,
		setItems,
		updateItem,
		deleteItem
	}

}());
	

	