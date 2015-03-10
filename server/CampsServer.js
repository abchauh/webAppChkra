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
        var _id = Camps.insert(doc);
       
        return {
            _id: _id,
        }
    },
    'sayHello': function(name) {
        
        //var campp = Camps.findOne({_id: "FgNfLTqjbiZX6gPSS"}, {title: 1}).title;
        return 'Hello, ';
    },
    //Moved_Update_to_server
    'campsUpdateServer': function(_id, doc){
        var campp_title = Camps.findOne({_id: _id}, {title: 1}).title;
        var campp_cityChanged = Camps.findOne({_id: _id}, {cityChanged: 1}).cityChanged;
        if (campp_cityChanged == "100") {
            doc.title = campp_title;
        }
        doc.cityChanged = 1; //only just before update
        Camps.update(_id, {$set: doc})
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
//permissionsServer
Camps.allow({
    insert: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'camps', 'insert');
        return result;
    },
    update: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'camps', 'update');
        return result;
    },
    remove: function(userId, doc) {
        var result = Meteor.call('MugenRoleActions.getRoles', 'camps', 'remove');
        return result;
    },
});