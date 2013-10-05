app = angular.module("chartroom", [])

app.factory("roomList", ["$http", function($http){
	var roomList = {
		collection : [{
			id : 1,
			name : "javascript",
			inline_number: 125485
		}, {
			id : 2,
			name : "php",
			inline_number: 4589
		}, {
			id : 3,
			name : ".NET",
			inline_number: 1231
		}, {
			id : 4,
			name : "Ruby on Rails",
			inline_number: 2501
		}],
		// fetch : function() {}
	}

	return roomList;
}])

// app.factory("userList", ["$http", function($http) {
// 	var userList = {
// 		collection : [{
// 			id : 1,
// 			name : "anxi"
// 		}, {
// 			id : 2,
// 			name : "juju"
// 		}, {
// 			id : 3,
// 			name : "suly"
// 		}]
// 	}

// 	return userList;
// }]);

app.factory("socket", function($rootScope) {
	return io.connect("http://localhost");
	// return {
	// 	on: function(eventName, callback) {
	// 		socket.on(eventName, callback);
	// 	},
	// 	emit: function(room, eventName, data) {
	// 		socket.broadcast.to(room).emit(eventName, data);
	// 	},
	// 	join: function(room) {
	// 		socket.emit("subscribe", { room: room })
	// 	}
	// }
});

app.config(function($routeProvider) {
	$routeProvider.
		when('/', { templateUrl: "javascripts/templates/room_list.html", controller: 'RoomList' }).
		when("/room/:roomId", { templateUrl: "javascripts/templates/room.html", controller: "Room" })
})