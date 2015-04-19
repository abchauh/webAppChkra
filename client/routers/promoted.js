/* Promoted */
Router.route('promoted', function() {
    Router.go('promotedIndex');
});
Router.route('promoted/index/:limit?/', {
    name: 'promotedIndex',
    controller: PromotedController,
    action: 'index',
});
Router.route('promoted/insert/', {
    name: 'promotedInsert',
    controller: PromotedController,
    action: 'insert',
});
Router.route('promoted/update/:_id?', {
    name: 'promotedUpdate',
    controller: PromotedController,
    action: 'update',
});
Router.route('promoted/view/:_id?', {
    name: 'promotedView',
    controller: PromotedController,
    action: 'view',
});
/* EOF Promoted */