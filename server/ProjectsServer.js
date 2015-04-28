Meteor.publishComposite('projects', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some Projects with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return Projects.find({createdUserId: this.userId }, doc, sort);
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
                },
                find: function(collection) {
                    return ProjUpdates.find(collection.projUpdates);
                }
            },
        ],
    }
});

Meteor.methods({
    "Projects.insert": function(doc) {
        var _id = Projects.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */
/* uncomment to use
 var query = Projects.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
 */