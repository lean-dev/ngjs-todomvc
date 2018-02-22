
angular.module('todoApp')
    .config(function($routeProvider) {

        var routeCfg = {
            template: '<app-root todos="$resolve.todos"></app-root>',
            resolve: {
                todos: function(socketStore) { return socketStore.getAll(); }
            }
        }
        $routeProvider
            .when('/', routeCfg)
            .when('/:state', routeCfg)
            .otherwise('/');

    });