/* Camps */
Router.route('camps', function() {
    Router.go('campsIndex');
});
Router.route('camps/index/:limit?/', {
    name: 'campsIndex',
    controller: CampsController,
    action: 'index',
});
Router.route('camps/insert/', {
    name: 'campsInsert',
    controller: CampsController,
    action: 'insert',
});
Router.route('camps/update/:_id?', {
    name: 'campsUpdate',
    controller: CampsController,
    action: 'update',
});
Router.route('camps/view/:_id?', {
    name: 'campsView',
    controller: CampsController,
    action: 'view',
});
/* EOF Camps */