Template.posts_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Posts, field);
    },
    CurrentUserID: function(){
        return Meteor.userId();
    },

});
Template.posts_form.events({
    "autocompleteselect textarea": function(e, t, doc) {
        console.log("selected ", doc);
    }
});