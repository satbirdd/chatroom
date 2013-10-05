/**
*  Room
*
* Description
*/
angular.module('chartroom').controller("Room", Room);

function Room($scope, $routeParams, $timeout, roomList, socket) {
	// $scope.userList = userList.collection;
	// $scope.counter = 100;

	$scope.messageList = [/*{
		email: "Jodan@email.com",
		content: "hello everybody!"
	}, {
		email: "Hainen@gmail.com",
		content: "hello, chees"
	}*/]

	var roomId = $routeParams.roomId;
	roomList.collection.forEach(function(room){
		if (room.id == roomId) {
			$scope.room = room;
			return;
		}
	})

	socket.emit("subscribe", { room: $scope.room.name });

	socket.on("chart", function(data) {
		$scope.$apply(function(){
			$scope.messageList.push(data);

			$timeout(function() {
				var div = document.getElementsByClassName("chart-show")[0];
				var scrollTop = div.scrollTop;
				while (div.scrollTop == scrollTop) {
					scrollTop += 500;
					div.scrollTop = scrollTop;
				}
			})
		});
	});

	$scope.sendMessage = function () {
		var message = angular.copy($scope.message);
		message.email = $scope.email;

		socket.emit("chart", { room: $scope.room.name, message: message });
		$scope.message = {};
	}

	$scope.$on('$locationChangeStart', function (event, next, current) {
        // event.preventDefault();
        // var answer = confirm("Are you sure you want to leave this page?")
        // if (answer) {
        //     $location.url($location.url(next).hash());
        //     $rootScope.$apply();
        // }
        socket.emit("unsubscribe", { room: $scope.room.name });
    });
}