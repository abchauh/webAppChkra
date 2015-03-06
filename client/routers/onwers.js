/* Onwers */
Router.route('onwers', function() {
    Router.go('onwersIndex');
});
Router.route('onwers/index/:limit?/', {
    name: 'onwersIndex',
    controller: OnwersController,
    action: 'index',
});
Router.route('onwers/insert/', {
    name: 'onwersInsert',
    controller: OnwersController,
    action: 'insert',
});
Router.route('onwers/update/:_id?', {
    name: 'onwersUpdate',
    controller: OnwersController,
    action: 'update',
});
Router.route('onwers/view/:_id?', {
    name: 'onwersView',
    controller: OnwersController,
    action: 'view',
});
/* EOF Onwers */