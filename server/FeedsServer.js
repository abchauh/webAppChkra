Meteor.publishComposite('feeds', function(doc, sort) {
    doc.appId = App.id;
    doc.createdUserId = this.userId;
    console.log("subscribing some Feeds with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return Feeds.find(doc, sort);
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
    "Feeds.insert": function(doc) {
        var _id = Feeds.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */
/* uncomment to use
 var query = Feeds.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
 */