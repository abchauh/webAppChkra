Template.campUpdates_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(CampUpdates, field);
    },
    CurrentUserID: function(){
        return Meteor.userId();
    },

});
Template.campUpdates_form.events({
    "autocompleteselect textarea": function(e, t, doc) {
        console.log("selected ", doc);
    }
});