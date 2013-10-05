angular.module("chartroom").controller("RoomList", RoomList)

function RoomList($scope, roomList) {
	$scope.roomList = roomList.collection;
}