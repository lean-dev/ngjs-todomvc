
angular.module('todoApp')
    .config(function($stateProvider,$urlRouterProvider) {

        var homeState = {
            name: 'home',
            url: '/',
            component: 'appRoot',
            resolve: {
                todos: function(socketStore) {
                  return socketStore.getAll();
                }
            }
          }
        
          var filteredState = {
            name: 'filtered',
            url: '/{state}',
            component: 'appRoot',
            resolve: {
                todos: function(socketStore) {
                  return socketStore.getAll();
                },
                state: function($transition$) {
                    return $transition$.params().state;
                }
            }
          }
        
          $stateProvider.state(homeState);
          $stateProvider.state(filteredState);
          $urlRouterProvider.otherwise('/');
    });