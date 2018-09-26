'use strict';

var userControllerModule = angular.module('myApp');
userControllerModule.controller('UserController', ['$scope', 'UserService', '$log', function ($scope, UserService, $log) {
        var self = this;
        self.user = {id: null, username: '', address: '', email: ''};
        self.users = [];

        self.submit = submit;
        self.edit = edit;
        self.remove = remove;
        self.reset = reset;


        fetchAllUsers();

        function fetchAllUsers() {
            UserService.fetchAllUsers().then(
                    function (d) {
                        self.users = d;
                    },
                    function (errResponse) {
                        console.error('Error while fetching Users');
                    }
            );
        }

        function createUser(user) {
            UserService.createUser(user).then(
                    fetchAllUsers,
                    function (errResponse) {
                        console.error('Error while creating User');
                    }
            );
        }

        function updateUser(user, id) {
            UserService.updateUser(user, id).then(
                    fetchAllUsers,
                    function (errResponse) {
                        console.error('Error while updating User');
                    }
            );
        }

        function deleteUser(id) {
            UserService.deleteUser(id)
                    .then(
                            fetchAllUsers,
                            function (errResponse) {
                                console.error('Error while deleting User');
                            }
                    );
        }

        function submit() {
            if (self.user.id === null) {
                $log.info('Saving New User', self.user);
                createUser(self.user);
            } else {
                updateUser(self.user, self.user.id);
                $log.info('User updated with id ', self.user.id);
            }
            reset();
        }

        function edit(id) {
            $log.info('id to be edited', id);
            for (var i = 0; i < self.users.length; i++) {
                if (self.users[i].id === id) {
                    self.user = angular.copy(self.users[i]);
                    $("#userform").dialog({autoopen: true, modal: true, width: ($('.content').innerWidth()), height: ($('.content').innerHeight()),
                        position: {my: "left top", at: "left top", of: '.content'}

                    });
                    break;
                }
            }
        }

        function remove(id) {
            $log.info('id to be deleted', id);
            if (self.user.id === id) {//clean form if the user to be deleted is shown there.
                reset();
            }
            deleteUser(id);
        }


        function reset() {
            self.user = {id: null, username: '', address: '', email: ''};
            $scope.myForm.$setPristine(); //reset Form
        }

    }]);
