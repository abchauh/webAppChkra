
Template.likedOrNot.helpers({
    LikedId:function(){
        var likedStr =  "Like It";
        var likedAlready = LikePost.findOne({itemId: this._id})._id;
        if (likedAlready != undefined){
            likedStr = "Liked";
        } else likedStr ="Like It";
        return likedStr;
    },
    LikedIdOrNot:function(){
        var likedAlready = LikePost.findOne({itemId: this._id})._id;
        if (likedAlready != undefined){
            return true;
        } else return false;
    },
});

Template.posts_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Posts, field);
    },
    CurrentUserID: function(){
        return Meteor.userId();
    },

});
Template.posts_form.events({
    "autocompleteselect textarea": function(e, t, doc) {
        console.log("selected ", doc);
    },
    'click .btnLiked': function (event) {
        var item_id = this._id;
        var itemType = "posts"
        Meteor.call('postLikePost', item_id,  itemType);
    }
});