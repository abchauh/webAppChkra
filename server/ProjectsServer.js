Meteor.publishComposite('projects', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some Projects with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return Projects.find(doc, sort);
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
    "Projects.insert": function(doc) {
        console.log("Hello world");
        var _id = Projects.insert(doc);
        return {
            _id: _id,
        }
    },
    //console.log(Projects.title);
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