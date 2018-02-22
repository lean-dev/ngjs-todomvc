describe('Todo Actions Component', function() {

    var $componentController;

    var bindings = {todos: JSON.parse('[{"id":1,"txt":"Demo 1","done":false},{"id":2,"txt":"Demo 2","done":false},{"id":3,"txt":"Demo 3","done":true},{"id":4,"txt":"Demo 4","done":true},{"id":5,"txt":"Demo 5","done":false}]')};

    beforeEach(module('todoApp'));
    beforeEach(inject(function(_$componentController_) {
        $componentController = _$componentController_;

        
    }));
    
    
    it('has an remaining count property', function() {

        var ctrl = $componentController('todoActions', null, bindings);
        
        expect(ctrl.remainingCount).toBeDefined();
        expect(ctrl.remainingCount).toBe(3);

    })

    it('has an hasDoneItems property', function() {

        var ctrl = $componentController('todoActions', null, bindings);
        
        expect(ctrl.hasDoneItems).toBeDefined();
        expect(ctrl.hasDoneItems).toBe(true);
        
    })

    it('can remove completed todos', function() {

        var mockStore = {
            remove: function(id) {}
        };

        spyOn(mockStore, 'remove');

        var ctrl = $componentController('todoActions', { localStore: mockStore }, bindings);

        ctrl.removeCompleted();

        expect(mockStore.remove).toHaveBeenCalledWith(3);
        expect(mockStore.remove).toHaveBeenCalledWith(4);
        expect(mockStore.remove).toHaveBeenCalledTimes(2);
        
    });

});
