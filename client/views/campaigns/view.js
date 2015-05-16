Template.campaignsView.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        if (confirm("Are you sure want to remove this data?")) {
            Router.current().remove(this._id);
            Router.go("campaignsIndex")
        }
    },
    'click #btnPublish': function(e) {
        Router.current().publish(this._id);
        return false;
    }
};

Template.campaignsView.helpers({
});