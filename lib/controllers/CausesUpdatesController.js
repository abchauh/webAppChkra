CausesUpdatesController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();

        this.subscription = this.subs.subscribe('causesUpdates', this.getCriteria(), sort);
    },
    /* event searching data by user input with parameter */
    search: function(t) {
        Router.go(Router.current().route.getName(), {limit: this.limit()}, {query: "q=" + t.find('#search').value});
    },
    /* @override getCriteria */
    getCriteria: function() {
        var search = this.params.query.q ? this.params.query.q : "";
        return {
            $or: [
                {title: {$regex: search, $options: 'i'}},
                {userId: {$regex: search, $options: 'i'}},
            ]
        };
    },
    index: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = CausesUpdates.find({}, this.getCriteria(), sort);

        return this.render('causesUpdatesIndex', {
            data: {
                ready: this.subscription.ready,
                isEmpty: models.count() === 0 ? true : false,
                models: models,
                hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
            }
        });
    },
    view: function() {
        return this.render('causesUpdatesView', {
            data: {
                model: this._loadModel(this.getId()),
            }
        });
    },
    /* private get user input docs */
    _getDoc: function(t) {
        return {
            title: t.find('#title').value,
            content: t.find('#content').value,
            parenttype: t.find('#parenttype').value,
            parentID: t.find('#parentID').value,
            slug: t.find('#slug').value,
            tags: t.find('#tags').value,
            URL: t.find('#URL').value,
            status: t.find('#status').value,

        };
    },
    /* uploading file using cfs:fileSystem package + cfs:ejson */
    _uploadImage: function() {
        var imageId = null;
        var file = $('#image').get(0).files[0];
        if (file) {
            var image = Images.insert(file, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
            });
            imageId = image._id;
        }

        return imageId;
    },
    /* event inserting data */

    InsertCausesUpdatesBlogId: function(t) {
        if (this._post) {
            //uploading file using cfs:fileSystem package + cfs:ejson
            var imageId = this._uploadImage();

            //set inserted doc
            var doc = this._getDoc(t);
            //doc.blogId = this.params._id;
            doc.imageId = imageId;
            CausesUpdates.insert(doc, function(err, _id) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Inserting CausesUpdates");
                Router.go('causesUpdatesView', {_id: _id});
            });
        }
        return this.render('causesUpdatesInsert', {});
    },
    insert: function(t) {
        if (this._post) {
            //uploading file using cfs:fileSystem package + cfs:ejson
            var imageId = this._uploadImage();

            //set inserted doc
            var doc = this._getDoc(t);
            doc.blogId = this.params._id
            doc.imageId = imageId;
            CausesUpdates.insert(doc, function(err, _id) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Inserting CausesUpdates");
                Router.go('causesUpdatesView', {_id: _id});
            });
        }
        return this.render('causesUpdatesInsert', {});
    },
    /* event updating data */
    update: function(t) {
        var _id = this.getId();
        var model = this._loadModel(_id);

        if (this._post) {
            //uploading file using cfs:fileSystem package + cfs:ejson
            var imageId = this._uploadImage();

            //remove old image if user inputting new image        
            if (imageId && model.imageId)
                Images.remove(model.imageId);

            //set updated doc
            var doc = this._getDoc(t);
            doc.imageId = imageId ? imageId : model.imageId;

            CausesUpdates.update(_id, {$set: doc}, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Updating CausesUpdates");
            });
            Router.go('causesUpdatesView', {_id: _id});
        }
        return this.render('causesUpdatesUpdate', {
            data: {
                model: model,
            }
        });
    },
    /* event removing data by id */
    remove: function(_id) {
        CausesUpdates.remove(_id, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Removing CausesUpdates");
        });
    },
    _loadModel: function(_id) {
        return CausesUpdates.findOne(_id);
    },
});