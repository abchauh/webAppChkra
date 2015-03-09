Meteor.publishComposite('camps', function(doc, sort) {
    doc.appId = App.id;
    console.log("subscribing some Camps with it's relation in App Id = " + App.id);
    return{
        find: function() {
            return Camps.find(doc, sort);
        },
        children: [
            /* return all related Users */
           {
                find: function(collection) {
                    return Images.find({_id: collection.coverImg});
                }
            },
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
    insertingCamp: function(){
         chkName = "inserted the camps";
    },
    
    "Camps.insert": function(doc) {
        chkName = "inserted s";
        var _id = Camps.insert(doc);
        return {
            _id: _id,
        }
    },
    'sayHello': function(name) {
        
        var campp = Camps.findOne({_id: "FgNfLTqjbiZX6gPSS"}, {title: 1}).title;
        return 'Hello, ' + campp;
    }

});

/* observing collection */
 var query = Camps.find({});
 var handle = query.observe({
     removed: function(model) {
         //removing related image, when post removed
         Images.remove(model.coverImg);
    }
 });
