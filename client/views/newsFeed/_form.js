Template.newsFeed_form.rendered = function() {
    $('#dateCreated').datepicker();$('#dateStatusChanged').datepicker();
};

Template.newsFeed_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(NewsFeed, field);
    },
    /* get current selected dropdown */
    selected: function(_id) {
        if (this._id === _id)
            return "selected";
    },
    CurrentUserID: function(){
        return Meteor.userId();
    },

    
});