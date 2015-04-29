Meteor.publishComposite('mugenRoleCollections', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some MugenRoleCollections with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return MugenRoleCollections.find(doc, sort);
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
    "MugenRoleCollections.insert": function(doc) {
        var _id = MugenRoleCollections.insert(doc);
        return {
            _id: _id,
        }
    },
    "MugenRoleCollections.autoInsert": function(doc) {
        //check whether collection already there or not, if yes don't reinsert, else insert
        var mugenRoleCollection = MugenRoleCollections.findOne({name: doc.name});
        var _id = null;
        if (!mugenRoleCollection)
            _id = MugenRoleCollections.insert(doc);
        else
            _id = mugenRoleCollection._id;

        //check whether mugenRoleActions already there or not, if yes don't reinsert, else auto insert
        if (!MugenRoleActions.findOne({mugenRoleCollectionId: _id, name: "index"}))
            MugenRoleActions.insert({mugenRoleCollectionId: _id, name: "index"});
        if (!MugenRoleActions.findOne({mugenRoleCollectionId: _id, name: "view"}))
            MugenRoleActions.insert({mugenRoleCollectionId: _id, name: "view"});
        if (!MugenRoleActions.findOne({mugenRoleCollectionId: _id, name: "insert", mugenRoleGroupId: "1"}))
            MugenRoleActions.insert({mugenRoleCollectionId: _id, name: "insert", mugenRoleGroupId: "1"});
        if (!MugenRoleActions.findOne({mugenRoleCollectionId: _id, name: "update", mugenRoleGroupId: "1"}))
            MugenRoleActions.insert({mugenRoleCollectionId: _id, name: "update", mugenRoleGroupId: "1"});
        if (!MugenRoleActions.findOne({mugenRoleCollectionId: _id, name: "remove", mugenRoleGroupId: "1"}))
            MugenRoleActions.insert({mugenRoleCollectionId: _id, name: "remove", mugenRoleGroupId: "1"});

        return {
            _id: _id,
        }
    },
});

/* auto insert into mugenRoleCollections "posts" and "meteor.users" when collection still empty */
Meteor.startup(function() {
    var mugenRoleCollections = MugenRoleCollections.find();
    if (mugenRoleCollections.count() == 0) {
        MugenRoleCollections.insert({_id: "1", name: "users"});
        MugenRoleCollections.insert({_id: "2", name: "posts"});
        MugenRoleCollections.insert({_id: "3", name: "newsFeed"});
        MugenRoleCollections.insert({_id: "4", name: "campaigns"});
        MugenRoleCollections.insert({_id: "5", name: "campUpdates"});
        MugenRoleCollections.insert({_id: "6", name: "causes"});
        MugenRoleCollections.insert({_id: "7", name: "causesUpdates"});
        MugenRoleCollections.insert({_id: "8", name: "feeds"});
        MugenRoleCollections.insert({_id: "9", name: "followLists"});
        MugenRoleCollections.insert({_id: "10", name: "images"});
        MugenRoleCollections.insert({_id: "11", name: "likeProj"});
        MugenRoleCollections.insert({_id: "12", name: "messages"});
        MugenRoleCollections.insert({_id: "13", name: "meteorSkills"});
        MugenRoleCollections.insert({_id: "14", name: "notifications"});
        MugenRoleCollections.insert({_id: "15", name: "owners"});
        MugenRoleCollections.insert({_id: "16", name: "likePosts"});
        MugenRoleCollections.insert({_id: "17", name: "projects"});
        MugenRoleCollections.insert({_id: "18", name: "projUpdates"});
        MugenRoleCollections.insert({_id: "19", name: "promoted"});
        MugenRoleCollections.insert({_id: "20", name: "suggests"});
        MugenRoleCollections.insert({_id: "21", name: "votes"});
        MugenRoleCollections.insert({_id: "22", name: "blog"});
    }
});

/* observing collection */
/* uncomment to use
 var query = MugenRoleCollections.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
 */