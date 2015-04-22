Template.TplShowPost.helpers({
    postItem: function () {
        var post = Posts.find({_id:this.itemId}).fetch();
        return post[0]; //return this.itemId;
    }
});
Template.TplShowProject.helpers({
    item: function () {
        var item = Projects.find({_id:this.itemId}).fetch();
        return item[0]; //return this.itemId;
    }
});
Template.TplShowCampaign.helpers({
    item: function () {
        var item = Campaigns.find({_id:this.itemId}).fetch();
        //console.log(item);
        return item[0]; //return this.itemId;
    }
});