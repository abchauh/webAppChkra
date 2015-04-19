Template.causesUpdates_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(CausesUpdates, field);
    },
    CurrentUserID: function(){
        return Meteor.userId();
    },

});
Template.causesUpdates_form.events({
    "autocompleteselect textarea": function(e, t, doc) {
        console.log("selected ", doc);
    }
});