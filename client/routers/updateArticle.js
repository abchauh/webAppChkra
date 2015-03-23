/* UpdateArticle */
Router.route('updateArticle', function() {
    Router.go('updateArticleIndex');
});
Router.route('updateArticle/index/:limit?/', {
    name: 'updateArticleIndex',
    controller: UpdateArticleController,
    action: 'index',
});
Router.route('updateArticle/insert/', {
    name: 'updateArticleInsert',
    controller: UpdateArticleController,
    action: 'insert',
});
Router.route('updateArticle/update/:_id?', {
    name: 'updateArticleUpdate',
    controller: UpdateArticleController,
    action: 'update',
});
Router.route('updateArticle/view/:_id?', {
    name: 'updateArticleView',
    controller: UpdateArticleController,
    action: 'view',
});
/* EOF UpdateArticle */