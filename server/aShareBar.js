counter = 0;
Meteor.methods({
    'causePromotes': function(item_id, itemTypeVar, itemCollection){
    //Inserting into Promoted Collection
        itemCollectionn = itemCollection;   //console.log(itemCollectionn);

        promtedVar = Promoted.findOne({itemType:itemTypeVar, itemId:item_id, createdUserId:Meteor.user()._id});
        if (promtedVar != undefined) {
            console.log(promtedVar._id+" : "+ promtedVar.itemId+" : "+promtedVar.itemType+" : "+promtedVar.createdUserId+ Meteor.user()._id) ;
        }else{
            Promoted.insert({itemType:itemTypeVar,  itemId:item_id}); //Updating Causes  promote Counter -- promoteCount

                itemPromoteCount = Causes.findOne({_id: item_id}, {fields: {'promoteCount':1}});

                if (itemPromoteCount.promoteCount != undefined) {
                    itemPromoteCount = itemPromoteCount.promoteCount + 1;   //console.log("pCount: "+itemPromoteCount);
                } else {
                     console.log("pCount NaN: "+itemPromoteCount.promoteCount);
                    itemPromoteCount = 1;
                }

            Causes.update({_id: item_id}, {$set: {promoteCount:itemPromoteCount}}, function(err) {
                    if (err) {throw new Meteor.Error(err);} }); //console.log("No record found for promoted... Inserted ")
        }
    },
    'flagBtn': function(item_id, itemTypeVar, itemCollection){
        Causes.update({_id: item_id}, {$set: {status:"flagged"}}, function(err) {if (err) {throw new Meteor.Error(err);} });
    }

});