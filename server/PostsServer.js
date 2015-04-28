Meteor.publishComposite('posts', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some Posts with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return Posts.find(doc, sort);
        },
        children: [
            /* return all related Images */
            {
                find: function(collection) {
                    return Images.find({_id: collection.imageId});
                }
            },
            /* return all related Users */
            {
                find: function(collection) {
                    return Meteor.users.find({
                        $or: [
                            {_id: collection.createdUserId},
                            {_id: collection.updatedUserId},
                        ]
                    });
                }
            },
            {
                find: function(collection) {
                    return LikePost.find();
                }
            },
        ],
    }
});

Meteor.methods({
    "Posts.insert": function(doc) {
        var _id = Posts.insert(doc);
        return {
            _id: _id,
        }
    },
    'postLikePost': function(item_id, itemType){
        console.log("dddddd: "+ item_id);
        var likeD = LikePost.findOne({itemId:item_id,  createdUserId:Meteor.user()._id});
        if (likeD != undefined) {
            //console.log(likeD);
            console.log("Liked Already ... removing");
            LikePost.remove({itemId:item_id, createdUserId:Meteor.user()._id});
            Feeds.remove({itemId: item_id, createdUserId:Meteor.user()._id});
        }else{
            console.log("Liked unDefined ... Adding now!");
            LikePost.insert({itemId:item_id}); //Inserting liked item -- likePost
            Feeds.insert({itemId: item_id, itemType:itemType});
        }
    }
});

/* observing collection */
var query = Posts.find({});
var handle = query.observe({
    removed: function(model) {
        //removing related image, when post removed
        Images.remove(model.imageId);
    }
});

// ------------------
//LikePost Server code
Meteor.publishComposite('likePost', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some LikePost with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return LikePost.find(doc, sort);
        },
        children: [
            /* return all related Users */
            {
                find: function(collection) {
                    return Meteor.users.find({
                        $or: [
                            {_id: collection.createdUserId},
                            {_id: collection.updatedUserId},
                        ]
                    });
                }
            },

        ],
    }
});


Meteor.methods({
    "LikePost.insert": function(doc) {
        var _id = LikePost.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */
/* uncomment to use
 var query = LikePost.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
 */
