/* POSTS */
Router.route('campUpdates', function(){
    Router.go('campUpdatesIndex');
});
Router.route('campUpdates/index/:limit?/', {
    name: 'campUpdatesIndex',
    controller: CampUpdatesController,
    action: 'index',
});
Router.route('campUpdates/insert/', {
    name: 'campUpdatesInsert',
    controller: CampUpdatesController,
    action: 'insert',
});
Router.route('campUpdates/insert/:_id?', {
    name: 'CampUpdateInsertCampUpdatesBlogId',
    controller: CampUpdatesController,
    action: 'InsertCampUpdatesBlogId',
});
Router.route('campUpdates/update/:_id?', {
    name: 'campUpdatesUpdate',
    controller: CampUpdatesController,
    action: 'update',
});
Router.route('campUpdates/view/:_id?', {
    name: 'campUpdatesView',
    controller: CampUpdatesController,
    action: 'view',
});
/* EOF POSTS */
