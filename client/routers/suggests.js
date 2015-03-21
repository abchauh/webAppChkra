/* Suggests */
Router.route('suggests', function() {
    Router.go('suggestsIndex');
});
Router.route('suggests/index/:limit?/', {
    name: 'suggestsIndex',
    controller: SuggestsController,
    action: 'index',
});
Router.route('suggests/insert/', {
    name: 'suggestsInsert',
    controller: SuggestsController,
    action: 'insert',
});
Router.route('suggests/update/:_id?', {
    name: 'suggestsUpdate',
    controller: SuggestsController,
    action: 'update',
});
Router.route('suggests/view/:_id?', {
    name: 'suggestsView',
    controller: SuggestsController,
    action: 'view',
});
/* EOF Suggests */