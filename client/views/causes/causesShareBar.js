
promotedVar = 1;

Template.causesShareBar.helpers({

    causesUpdates: function() {
        return CausesUpdates.find({blogId:blogIdVar});
    },

});
Template.causesShareBar.events({
    // Fires when promote element is clicked
    'click .promote': function (event) {
        causes_id = _id;
        itemTypeVar = "causes"
        itemCollection = "Causes"
        Meteor.call('causePromotes', causes_id, itemTypeVar, itemCollection);
    },
    // Fires when promote element is clicked
    'click .flagbtn': function (event) {
        causes_id = _id;
        itemTypeVar = "causes"
        itemCollection = "Causes"
        Meteor.call('flagBtn', causes_id, itemTypeVar, itemCollection);

        $(".flagbtn").fadeOut();
        $(".flagbtn").fadeIn();
    },

});