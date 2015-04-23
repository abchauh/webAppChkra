Template.nFlikedOrNot.helpers({
    nFLikedIdOrNot:function(){
        var likedAlready;
        if (this._id != undefined){
            var likedAlready = NewsFeedsLiked.findOne({itemId: this._id});
            if (likedAlready != undefined){
                return true;
            } else return false;

        }
        return false;
    },
});
Template.nFlikedOrNot.events = {
    'click .btnnFLiked': function (event) {
        var item_id = this._id;
        var itemType = "posts";
        //Meteor.call('nFLikePost', item_id,  itemType);
        console.log("btnnFLiked" + this._id);
    },
}

Template.TplShowPost.helpers({
    postItem: function () {
        var post = Posts.findOne({_id:this.itemId});
        return post; //return this.itemId;
    }
});
Template.TplShowProject.helpers({
    projItem: function () {
        var item = Projects.findOne({_id:this.itemId});
        return item;
    }
});
Template.TplShowCampaign.helpers({
    campItem: function () {
        var item = Campaigns.findOne({_id:this.itemId});
        return item;
    }
});

Template.tplSuggestPosts.helpers({
    sugPosts: function () {
        var item = Suggests.find({itemType:"posts"}).fetch();
        var count = 0;
        var sugPosts = [];
        item.forEach(function (item) {
            var itemID= item.itemID;
            posts = Posts.find({_id:itemID}).fetch();
            count += 1;
            sugPosts.push(posts[0]);
        });
        return sugPosts;
    },
    image: function() {
        return Images.findOne(this.imageId);
    }
});
Template.tplSuggestCamps.helpers({
    sugCamps: function () {
        var item = Suggests.find({itemType:"campaigns"}).fetch();
        var count = 0;
        var sugPosts = [];
        item.forEach(function (item) {
            var itemID= item.itemID;
            blocks = Campaigns.find({_id:itemID}).fetch();
            count += 1;
            sugPosts.push(blocks[0]);
        });
        return sugPosts;
    },
    image: function() {
        return Images.findOne(this.headerImg);
    }
});
Template.tplSuggestProjs.helpers({
    sugProjs: function () {
        var item = Suggests.find({itemType:"projects"}).fetch();
        var count = 0;
        var sugPosts = [];
        item.forEach(function (item) {
            var itemID= item.itemID;
            blocks = Projects.find({_id:itemID}).fetch();
            count += 1;
            sugPosts.push(blocks[0]);
        });
        //console.log(sugPosts);
        return sugPosts;
    },
    image: function() {
        return Images.findOne(this.headerImg);
    }
});
