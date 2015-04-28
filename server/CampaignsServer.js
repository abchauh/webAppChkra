Meteor.publishComposite('campaigns', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some Campaigns with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return Campaigns.find({createdUserId: this.userId }, doc, sort);
        },
        children: [
            /* return all related Images */
            {
                find: function(collection) {
                    return Images.find({_id: collection.headerImg});
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
                    return CampUpdates.find(collection.campUpdates);
                }
            },
            
        ],
    }
});

Meteor.methods({
    "Campaigns.insert": function(doc) {
        var _id = Campaigns.insert(doc);
        return {
            _id: _id,
        }
    },
});

/* observing collection */
 var query = Campaigns.find({});
 var handle = query.observe({
 removed: function(model) {
     //removing related image, when post removed
     Images.remove(model.headerImg);
 }
 });