/* Blocks */
Router.route('campaigns', function() {
    Router.go('campaignsIndex');
});
Router.route('campaigns/index/:limit?/', {
    name: 'campaignsIndex',
    controller: CampaignsController,
    action: 'index',
});
Router.route('campaigns/insert/', {
    name: 'campaignsInsert',
    controller: CampaignsController,
    action: 'insert',
});
Router.route('campaigns/update/:_id?', {
    name: 'campaignsUpdate',
    controller: CampaignsController,
    action: 'update',
});
Router.route('campaigns/view/:_id?', {
    name: 'campaignsView',
    controller: CampaignsController,
    action: 'view',
    data: function () {
        _id  = this.params._id;
        blogIdVar = _id;

        //templateData = {
        //    posts: function() {
        //        return Posts.find({blogId:"rSDgPY73JBdkmAdMc"})
        //    },
        //    _id: _id,
        //    blogIdVar: _id,
        //};
        //return templateData;
    }
});
/* EOF Blocks */