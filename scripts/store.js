

const store = (function () {

	const items = [];
	const error = null;
	const showForm = true;

	const addItem = function(item) {
		if (!item.state) item.state = 'collapsed';
		this.items.push(item);
	};

	const findById = function (id) {
		console.log(id);
	
		return this.items.find(item => item.id === id)
	};  //when a unique id is passed into this fn it will return the store object with that ID

	const setItems = function(items) {
		items.forEach(item => item.state = 'collapsed');
		this.items = items;
	}

	const updateItem = function (id, item) {
		const target = findById(id)
		Object.assign(item, target);
		//target = item; //merge Object.assign
	}

	const deleteItem = function (id) {
		console.log(id);
		this.items = this.items.filter(item => item.id !==id);
		console.log(store.items);
	}

	const showHideForm = function() {
		this.showForm = !this.showForm;
	}

	const changeCollapsedState = (item) => {
		if (item.state === 'collapsed') {
			item.state = 'expanded';
		}
		else if (item.state === 'expanded') {
			item.state = 'collapsed';
		}
	};

	const getError = () => this.error;

	const setError = (error) => {
		this.error = error;
	}





	return {
		items,
		error,
		setError,
		getError,
		changeCollapsedState,
		showForm,
		showHideForm,
		addItem,
		findById,
		setItems,
		updateItem,
		deleteItem
	}

}());
	

	