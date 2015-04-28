Meteor.publishComposite('promoted', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some Promoted with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return Promoted.find(doc, sort);
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

function changeUsername(username) {
  return Meteor.users.update({_id: Meteor.userId(), usernameEdited: { $exists: false }}, {$set: {'profile.name': username, usernameEdited: true}});
}

Meteor.methods({
    "Promoted.insert": function(doc) {
        var _id = Promoted.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */
/* uncomment to use
 var query = Promoted.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
 */