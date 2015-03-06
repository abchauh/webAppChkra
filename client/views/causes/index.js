Template.causesIndex.helpers({

});

Template.causesIndex.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        if (confirm("Are you sure want to remove this data?"))
            Router.current().remove(this._id);
    },
    /* sorting by parameter */
'click #btnSorttitle': function(e) {
MeteorisGridView.sort('title');
},
/* sorting by parameter */
'click #btnSorttag': function(e) {
MeteorisGridView.sort('tag');
},
/* sorting by parameter */
'click #btnSorttype': function(e) {
MeteorisGridView.sort('type');
},
/* sorting by parameter */
'click #btnSortshortDesc': function(e) {
MeteorisGridView.sort('shortDesc');
},
/* sorting by parameter */
'click #btnSortlongDesc': function(e) {
MeteorisGridView.sort('longDesc');
},
/* sorting by parameter */
'click #btnSortimgThumb': function(e) {
MeteorisGridView.sort('imgThumb');
},
/* sorting by parameter */
'click #btnSortimgLarge': function(e) {
MeteorisGridView.sort('imgLarge');
},
/* sorting by parameter */
'click #btnSortgalleries': function(e) {
MeteorisGridView.sort('galleries');
},
/* sorting by parameter */
'click #btnSortcauseStart': function(e) {
MeteorisGridView.sort('causeStart');
},
/* sorting by parameter */
'click #btnSortcauseEnd': function(e) {
MeteorisGridView.sort('causeEnd');
},
/* sorting by parameter */
'click #btnSortcauseStatus': function(e) {
MeteorisGridView.sort('causeStatus');
},
/* sorting by parameter */
'click #btnSortcauseUpdated': function(e) {
MeteorisGridView.sort('causeUpdated');
},
/* sorting by parameter */
'click #btnSortcauseWeb': function(e) {
MeteorisGridView.sort('causeWeb');
},
/* sorting by parameter */
'click #btnSortcauseSocialMedia': function(e) {
MeteorisGridView.sort('causeSocialMedia');
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