Meteor.publishComposite('teams', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some Teams with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return Teams.find(doc, sort);
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
                /* return all related Employees */
            {
                find: function(collection) {
                return Employees.find(collection.employeeid);}
            },
                /* return all related Jobs */
            {
                find: function(collection) {
                return Posts.find(collection.post);
                }
            },
        ],
    }
});


Meteor.methods({
    "Teams.insert": function(doc) {
        var _id = Teams.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */
/* uncomment to use
 var query = Teams.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
 */