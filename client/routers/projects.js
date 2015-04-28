/* Blocks */
Router.route('projects', function() {
    Router.go('projectsIndex');
});
Router.route('projects/index/:limit?/', {
    name: 'projectsIndex',
    controller: ProjectsController,
    action: 'index',
});
Router.route('projects/insert/', {
    name: 'projectsInsert',
    controller: ProjectsController,
    action: 'insert',
});
Router.route('projects/update/:_id?', {
    name: 'projectsUpdate',
    controller: ProjectsController,
    action: 'update',
});
Router.route('projects/view/:_id?', {
    name: 'projectsView',
    controller: ProjectsController,
    action: 'view',
    data: function () {
        _id  = this.params._id;
        blogIdVar = _id;

    }
});
/* EOF Blocks */