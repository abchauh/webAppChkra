/* Owners */
Router.route('owners', function() {
    Router.go('ownersIndex');
});
Router.route('owners/index/:limit?/', {
    name: 'ownersIndex',
    controller: OwnersController,
    action: 'index',
});
Router.route('owners/insert/', {
    name: 'ownersInsert',
    controller: OwnersController,
    action: 'insert',
});
Router.route('owners/update/:_id?', {
    name: 'ownersUpdate',
    controller: OwnersController,
    action: 'update',
});
Router.route('owners/view/:_id?', {
    name: 'ownersView',
    controller: OwnersController,
    action: 'view',
});
/* EOF Owners */