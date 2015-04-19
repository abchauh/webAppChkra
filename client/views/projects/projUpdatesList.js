Template.projUpdatesList.helpers({
    projUpdate: function() {
        return ProjUpdates.find({blogId:blogIdVar});
    },
});