Meteor.publishComposite('causes', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some Causes with it's relation in App Id = " + App.id);
    return{
        find: function() {
            //return Causes.find({createdUserId: this.userId }, doc, sort);
            return Causes.find({}, doc, sort);
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
                    return CausesUpdates.find(collection.causesUpdates);
                }
            },
            
        ],
    }
});


Meteor.methods({
    "Causes.insert": function(doc) {
        //console.log("sdsdssdsd");
        var _id = Causes.insert(doc);
        return {
            _id: _id,
        }
    },

});

/* observing collection */
/* uncomment to use
 var query = Causes.find({});
 var handle = query.observe({
 removed: function(model) {
 //removing related image, when post removed
 Images.remove(model.imageId);
 }
 });
 */