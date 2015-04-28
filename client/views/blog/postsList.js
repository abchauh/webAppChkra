Template.postsList.helpers({
    posts: function() {
        //return Posts.find({blogId:blogIdVar});
        return Posts.find({blogId:blogIdVar});
        //console.log("id: "+ this._id);
    },
});