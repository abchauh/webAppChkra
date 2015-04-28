Template.suggestsInsert.events = {
    'click #btnSave': function(e, t) {
        e.preventDefault();
        Router.current()._post = true;
        Router.current().insert(t);   
        Router.current()._post = false;
    },
    'click #sugPostsAdd': function(e) {
        var doc = {
            itemID: this._id,
            itemType: "posts"
        };
        //e.preventDefault();
        //if (confirm("Are you sure want to remove this data?"))
        //    Router.current().remove(this._id);
        console.log(this.title);
        Suggests.insert(doc, function(err, _id) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Inserting CampUpdates");
        });
    },
    'click #sugCampsAdd': function(e) {
    var doc = {
        itemID: this._id,
        itemType: "campaigns"
    };
    console.log(this.title);
    Suggests.insert(doc, function(err, _id) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Inserting CampUpdates");
        });
    },
    'click #sugProjsAdd': function(e) {
        var doc = {
            itemID: this._id,
            itemType: "projects"
        };
        console.log(this.title);
        Suggests.insert(doc, function(err, _id) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Inserting CampUpdates");
        });
    },
};

Template.suggestsInsert.helpers({
    sugPosts: function () {
        var item = Posts.find().fetch();
        //console.log(item);
        return item; //return this.itemId;
    },
    sugCampaigns: function () {
        var item = Campaigns.find().fetch();
        //console.log(item);
        return item; //return this.itemId;
    },
    sugProjects: function () {
        var item = Projects.find().fetch();
        //console.log(item);
        return item; //return this.itemId;
    }
});