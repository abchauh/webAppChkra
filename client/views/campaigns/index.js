Template.campaignsIndex.helpers({
    campStatus: function(pubstatus) {
        if (pubstatus === "Published" || pubstatus === "Finished" ) {
            return true;
        }
    },
});

Template.campaignsIndex.events = {
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
    'click #btnSortheaderImg': function(e) {
        MeteorisGridView.sort('headerImg');
    },
    /* sorting by parameter */
    'click #btnSortabout': function(e) {
        MeteorisGridView.sort('about');
    },
    /* sorting by parameter */
    'click #btnSortsupporters': function(e) {
        MeteorisGridView.sort('supporters');
    },
    /* sorting by parameter */
    'click #btnSortpromoteCount': function(e) {
        MeteorisGridView.sort('promoteCount');
    },
    /* sorting by parameter */
    'click #btnSortsharedCount': function(e) {
        MeteorisGridView.sort('sharedCount');
    },
    /* sorting by parameter */
    'click #btnSortcountry': function(e) {
        MeteorisGridView.sort('country');
    },
    /* sorting by parameter */
    'click #btnSortcity': function(e) {
        MeteorisGridView.sort('city');
    },
    /* sorting by parameter */
    'click #btnSortownerid': function(e) {
        MeteorisGridView.sort('ownerid');
    },
    /* sorting by parameter */
    'click #btnSortownernickname': function(e) {
        MeteorisGridView.sort('ownernickname');
    },
    /* sorting by parameter */
    'click #btnSorttype': function(e) {
        MeteorisGridView.sort('type');
    },
    /* sorting by parameter */
    'click #btnSortlinkedToBlocks': function(e) {
        MeteorisGridView.sort('linkedToBlocks');
    },
    /* sorting by parameter */
    'click #btnSortstatus': function(e) {
        MeteorisGridView.sort('status');
    },
    /* sorting by parameter */
    'click #btnSortimgs': function(e) {
        MeteorisGridView.sort('imgs');
    },
    /* sorting by parameter */
    'click #btnSortthumbnail': function(e) {
        MeteorisGridView.sort('thumbnail');
    },
    /* sorting by parameter */
    'click #btnSortcontributers': function(e) {
        MeteorisGridView.sort('contributers');
    },
    /* sorting by parameter */
    'click #btnSortorganisers': function(e) {
        MeteorisGridView.sort('organisers');
    },
    /* sorting by parameter */
    'click #btnSortadmins': function(e) {
        MeteorisGridView.sort('admins');
    },
    /* sorting by parameter */
    'click #btnSorttags': function(e) {
        MeteorisGridView.sort('tags');
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