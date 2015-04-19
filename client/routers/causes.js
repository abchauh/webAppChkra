/* Blocks */
Router.route('causes', function() {
    Router.go('causesIndex');
});
Router.route('causes/index/:limit?/', {
    name: 'causesIndex',
    controller: CausesController,
    action: 'index',
});
Router.route('causes/insert/', {
    name: 'causesInsert',
    controller: CausesController,
    action: 'insert',
});
Router.route('causes/update/:_id?', {
    name: 'causesUpdate',
    controller: CausesController,
    action: 'update',
});
Router.route('causes/view/:_id?', {
    name: 'causesView',
    controller: CausesController,
    action: 'view',
    data: function () {
        _id  = this.params._id;
        blogIdVar = _id;

    }
});
/* EOF Causes */