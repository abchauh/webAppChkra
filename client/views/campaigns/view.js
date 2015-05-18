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
    },
    'click #btnFinish': function(e) {
        Router.current().finish(this._id);
        return false;
    },
    'click #btnRepublish': function(e) {
        Router.current().republish(this._id);
        return false;
    }
};

Template.campaignsView.helpers({
    campPublish: function(pubstatus) {
        if (pubstatus === "Published") {
            return true;
        }
    },
    campFinish: function(pubstatus) {
        if (pubstatus === "Finished") {
            return true;
        }
    },
    campType: function(ctype) {
        if (ctype === '1')
            return 'Spread awareness for a cause';
        if (ctype === '2')
            return 'Raise my voice with an open letter';
        if (ctype === '3')
            return 'Help using my project';
        if (ctype === '4')
            return 'Start a petition';
        if (ctype === '5')
            return 'Promote my cause';
    }
});