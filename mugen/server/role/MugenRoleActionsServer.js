Meteor.publishComposite('mugenRoleActions', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some MugenRoleActions with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return MugenRoleActions.find(doc, sort);
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
            /* return all related MugenRoleGroups */
            {
                find: function(collection) {
                    return MugenRoleGroups.find(collection.mugenRoleGroupId);
                }
            },
            /* return all related MugenRoleCollections */
            {
                find: function(collection) {
                    return MugenRoleGroups.find(collection.mugenRoleCollectionId);
                }
            },
        ],
    }
});


Meteor.methods({
    "MugenRoleActions.insert": function(doc) {
        var _id = MugenRoleActions.insert(doc);
        return {
            _id: _id,
        }
    },
    "MugenRoleActions.getRoles": function(collection, action) {
        var mugenRoleCollection = MugenRoleCollections.findOne({name: collection});
        var mugenRoleCollectionId = null;
        if (mugenRoleCollection)
            mugenRoleCollectionId = mugenRoleCollection._id;
        var mugenRoleGroupId = Meteor.user() ? Meteor.user().profile.mugenRoleGroupId : null;

        var isAuthenticated = false;
        //if current path is "/" or "mugen" or "user/login | user/register" then make it true
        if (collection == "" || collection == "mugenRoleActions" || collection == "mugenRoleCollections" || collection == "mugenRoleGroups" || collection == 'users' && action == 'login' || collection == 'users' && action == 'register' || collection == 'users' && action == 'forgetPassword' || collection == 'users' && action == 'resetPassword') {
            isAuthenticated = true;
        } else if (mugenRoleCollectionId) {
            var orArray = [
                {mugenRoleGroupId: {$exists: false}},
                {mugenRoleGroupId: null},
                {mugenRoleGroupId: ""},
            ];
            if (mugenRoleGroupId)
                orArray.push({mugenRoleGroupId: mugenRoleGroupId});
            var mugenRoleAction = MugenRoleActions.findOne({mugenRoleCollectionId: mugenRoleCollectionId, name: action,
                $or: orArray
            });
            if (mugenRoleAction)
                isAuthenticated = true;
        }

        return isAuthenticated;
    },
});

/* auto insert into mugenRoleActions "posts" and "meteor.users" when collection still empty */
Meteor.startup(function() {
    var mugenRoleActions = MugenRoleActions.find();
    if (mugenRoleActions.count() == 0) {
        //meteor.users
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "1", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "1", mugenRoleGroupId:"1"});        
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "1", mugenRoleGroupId:"1"});        
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "1", mugenRoleGroupId:"1"});        
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "1", mugenRoleGroupId:"1"});
        //posts
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "2"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "2"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "2", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "2", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "2", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "2", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "2", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "2", mugenRoleGroupId:"2"});
          //campaigns
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "4"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "4"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "4", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "4", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "4", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "4", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "4", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "4", mugenRoleGroupId:"2"});
        //campUpdates
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "5"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "5"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "5", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "5", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "5", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "5", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "5", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "5", mugenRoleGroupId:"2"});
        //causes
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "6"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "6"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "6", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "6", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "6", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "6", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "6", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "6", mugenRoleGroupId:"2"});
        //causesUpdates
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "7"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "7"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "7", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "7", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "7", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "7", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "7", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "7", mugenRoleGroupId:"2"});
        //feeds
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "8"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "8"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "8", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "8", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "8", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "8", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "8", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "8", mugenRoleGroupId:"2"});
        //followLists
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "9"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "9"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "9", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "9", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "9", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "9", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "9", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "9", mugenRoleGroupId:"2"});
        //images
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "10"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "10"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "10", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "10", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "10", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "10", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "10", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "10", mugenRoleGroupId:"2"});
        //likeProj
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "11"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "11"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "11", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "11", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "11", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "11", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "11", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "11", mugenRoleGroupId:"2"});
        //messages
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "12"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "12"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "12", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "12", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "12", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "12", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "12", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "12", mugenRoleGroupId:"2"});
        //meteorSkills
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "13"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "13"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "13", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "13", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "13", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "13", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "13", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "13", mugenRoleGroupId:"2"});
        //notifications
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "14"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "14"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "14", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "14", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "14", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "14", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "14", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "14", mugenRoleGroupId:"2"});
        //owners
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "15"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "15"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "15", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "15", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "15", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "15", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "15", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "15", mugenRoleGroupId:"2"});
        //likePosts
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "16"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "16"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "16", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "16", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "16", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "16", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "16", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "16", mugenRoleGroupId:"2"});
        //projects
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "17"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "17"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "17", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "17", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "17", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "17", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "17", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "17", mugenRoleGroupId:"2"});
        //projUpdates
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "18"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "18"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "18", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "18", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "18", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "18", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "18", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "18", mugenRoleGroupId:"2"});
        //promoted
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "19"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "19"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "19", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "19", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "19", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "19", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "19", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "19", mugenRoleGroupId:"2"});
        //suggests
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "20"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "20"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "20", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "20", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "20", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "20", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "20", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "20", mugenRoleGroupId:"2"});
        //votes
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "21"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "21"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "21", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "21", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "21", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "21", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "21", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "21", mugenRoleGroupId:"2"});
        //blog
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "22"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "22"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "22", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "22", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "22", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "22", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "22", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "22", mugenRoleGroupId:"2"});
        //newsFeed
        MugenRoleActions.insert({name: "index", mugenRoleCollectionId: "3"});
        MugenRoleActions.insert({name: "view", mugenRoleCollectionId: "3"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "3", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "3", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "3", mugenRoleGroupId:"1"});
        MugenRoleActions.insert({name: "insert", mugenRoleCollectionId: "3", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "update", mugenRoleCollectionId: "3", mugenRoleGroupId:"2"});
        MugenRoleActions.insert({name: "remove", mugenRoleCollectionId: "3", mugenRoleGroupId:"2"});
    }
});

/* observing collection */
/* uncomment to use
 var query = MugenRoleActions.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
 */