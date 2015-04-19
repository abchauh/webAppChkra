Template.causesUpdatesList.helpers({
    causesUpdates: function() {
        return CausesUpdates.find({blogId:blogIdVar});
    },
});