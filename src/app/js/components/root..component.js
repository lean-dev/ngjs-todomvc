(function () {

    var appRoor = {
        templateUrl: '/js/components/root.component.html',
        controller: RootController
    };

    RootController.$inject = [];
    function RootController() {
        var vm = this;
        vm.todos = [{id: 0, txt: 'Initial Todo', done: true}];
    };

    angular.module('todoApp')
        .component('appRoot', appRoor);

})();
