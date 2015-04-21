Template.projUpdates_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(ProjUpdates, field);
    },
    CurrentUserID: function(){
        return Meteor.userId();
    },

});
Template.projUpdates_form.events({
    "autocompleteselect textarea": function(e, t, doc) {
        console.log("selected ", doc);
    }
});