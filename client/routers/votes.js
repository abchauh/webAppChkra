/* Votes */
Router.route('votes', function() {
    Router.go('votesIndex');
});
Router.route('votes/index/:limit?/', {
    name: 'votesIndex',
    controller: VotesController,
    action: 'index',
});
Router.route('votes/insert/', {
    name: 'votesInsert',
    controller: VotesController,
    action: 'insert',
});
Router.route('votes/update/:_id?', {
    name: 'votesUpdate',
    controller: VotesController,
    action: 'update',
});
Router.route('votes/view/:_id?', {
    name: 'votesView',
    controller: VotesController,
    action: 'view',
});
/* EOF Votes */