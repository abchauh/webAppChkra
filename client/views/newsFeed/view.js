Template.newsFeedView.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        if (confirm("Are you sure want to remove this data?")) {
            Router.current().remove(this._id);
            Router.go("newsFeedIndex")
        }
    },
};

Template.newsFeedView.helpers({
    isOwner: function() {
        return this.data.userId === Meteor.userId();
    }
});