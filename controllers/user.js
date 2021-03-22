const { v4: uuidv4 } = require('uuid')

const User  = require('../models/user')

// let users = [
// 	{id: 1, name:'utinchindy', email: 'utincindyselvira16@gmail.com'},
// 	{id: 2, name: 'doraemon', email: 'doraemon@gmail.com'}
// ]
module.exports = {
	index : function(request, response){
		let keyword = {}

		if (request.query.keyword) {
			keyword = {name: {$regex: request.query.keyword}}
		}

		User.find(keyword, "name email", function(error, users){ 
			if (error) console.log(error)
			// console.log(users)
		response.render('pages/user/index', {users})
		})

	},
	show: function(request, response){
		const id = request.params.id
		/*const data = users.filter(user => {
			return user.id ==id
		})*/
		User.findById(id, function(error, data){
			if(error) console.log(error)
				console.log(data)
			response.render('pages/user/show', {user: data})
		})
		
	},
	create: function(request, response) {
		response.render('pages/user/create')
	},
	store: function(request, response){
		// carapertama
		/*const user = new User({
			name: request.body.name,
			email: request.body.email,
			password: request.body.password,
		})

		user.save(function(error, data){
			if(error) console.log(error)

				console.log(data)
			response.send(users)
		})*/
		// carakedua 
		User.create({
			name: request.body.name,
			email: request.body.email,
			password: request.body.password,
		}, function(error, data){
			if(error) console.log(error)

				console.log(data)
			response.redirect('/users')
		})
		/*users.push({
			id: uuidv4() ,
			name: 
			email:  request.body.email,

		})*/



	},

	edit: function(request, response) {
		const id = request.params.id
		/*const data = users.filter(user => {
			return user.id ==id
		})*/
		User.findById(id, function(error, data){
			if(error) console.log(error)
				console.log(data)
			response.render('pages/user/edit', {user: data})
		})

	},
	update: function(request, response){
	const id = request.params.id
	users.filter(user => {
		if(user.id == id) {
			user.id = id
			user.name = request.body.name
			user.email = request.body.email

			return user
		}
	})
	response.json({
	status: true,
	data: users,
	message: 'Data users berhasil diedit',
	method: request.method,
	url: request.url
	})
},
	delete: function(request, response){
	let id = request.params.userId
	user = user.filter(user => user.id != id)
	response.send({
	status: true,
	data: users,
	message: 'Data users berhasil dihapus',
	method: request.method,
	url: request.url	
	})
	}
}