Template.notificationsIndex.helpers({

});

Template.notificationsIndex.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        if (confirm("Are you sure want to remove this data?"))
            Router.current().remove(this._id);
    },
    /* sorting by parameter */
'click #btnSortuserID': function(e) {
MeteorisGridView.sort('userId');
},
/* sorting by parameter */
'click #btnSortownerID': function(e) {
MeteorisGridView.sort('ownerID');
},
/* sorting by parameter */
'click #btnSortseenAt': function(e) {
MeteorisGridView.sort('seenAt');
},
/* sorting by parameter */
'click #btnSortreadAt': function(e) {
MeteorisGridView.sort('readAt');
},
/* sorting by parameter */
'click #btnSortsentAt': function(e) {
MeteorisGridView.sort('sentAt');
},
/* sorting by parameter */
'click #btnSortsubject': function(e) {
MeteorisGridView.sort('subject');
},
/* sorting by parameter */
'click #btnSortdetail': function(e) {
MeteorisGridView.sort('detail');
},
/* sorting by parameter */
'click #btnSortfilesAtt': function(e) {
MeteorisGridView.sort('filesAtt');
},
/* sorting by parameter */
'click #btnSortnotType': function(e) {
MeteorisGridView.sort('notType');
},

    'keyup #search': function(e, t) {
        e.preventDefault();
        Router.current().search(t);        
    },
    /* check all checkbox */
    'change #checkAll': function(e) {
        e.preventDefault();
        var checkboxes = $('.checkAll');
        for (var i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = e.target.checked;
        }
    },
    /* remove all selected item */
    'click #btnRemoveAll': function(e) {
        e.preventDefault();
        var checkboxes = $('.checkAll');
        var checkedLength = 0;
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkedLength++;
            }
        }

        if (checkedLength > 0) {
            if (confirm("Are you sure want to remove? (total " + checkedLength + " data will be removed)")) {
                // loop over them all
                for (var i = 0; i < checkboxes.length; i++) {
                    // And stick the checked ones onto an array...
                    if (checkboxes[i].checked) {
                        Router.current().remove($(checkboxes[i]).val());
                    }
                }
            }
        } else {
            MeteorisFlash.set('danger', 'Please Select Some data which You Want to Remove');
        }

        //set checkAll header to uncheck
        $('#checkAll').attr("checked", false);
    },
};