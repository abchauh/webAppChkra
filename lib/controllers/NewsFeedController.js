NewsFeedController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function () {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();


        this.subscription = this.subs.subscribe('newsFeed', this.getCriteria(), sort);
    },
    /* event searching data by user input with parameter */
    search: function (t) {
        Router.go(Router.current().route.getName(), {limit: this.limit()}, {query: "q=" + t.find('#search').value});
    },
    /* @override getCriteria */
    getCriteria: function () {
        var search = this.params.query.q ? this.params.query.q : "";
        return {
            $or: [
                {userId: {$regex: search, $options: 'i'}},
                {dateCreated: {$regex: search, $options: 'i'}},
                {dateStatusChanged: {$regex: search, $options: 'i'}},
                {status: {$regex: search, $options: 'i'}},
                {postID: {$regex: search, $options: 'i'}},
            ]
        };
    },
    index: function () {

        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = NewsFeed.find(this.getCriteria(), sort);

        return this.render('newsFeedIndex', {
            data: {
                ready: this.subscription.ready,
                isEmpty: models.count() === 0,
                models: models,
                hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
            }
        });
    },
    view: function () {
        return this.render('newsFeedView', {
            data: {
                model: this._loadModel(this.getId()),
            }
        });
    },
    /* private get user input docs */
    _getDoc: function (t) {
        return {
            userId: t.find('#userId').value,
            dateCreated: t.find('#dateCreated').value ? new Date(t.find('#dateCreated').value) : null,
            dateStatusChanged: t.find('#dateStatusChanged').value ? new Date(t.find('#dateStatusChanged').value) : null,
            status: t.find('#status').value,
            postID: t.find('#postID').value,
        };
    },
    /* uploading file using cfs:fileSystem package + cfs:ejson */
    _uploadImage: function () {
        var imageId = null;
        var file = $('#image').get(0).files[0];
        if (file) {
            var image = Images.insert(file, function (err) {
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
    insert: function (t) {
        if (this._post) {
            //uploading file using cfs:fileSystem package + cfs:ejson
            //var imageId = this._uploadImage();

            //set inserted doc
            var doc = this._getDoc(t);
            //doc.imageId = imageId;

            NewsFeed.insert(doc, function (err, _id) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Inserting NewsFeed");
                Router.go('newsFeedView', {_id: _id});
            });
        }
        return this.render('newsFeedInsert', {});
    },
    /* event updating data */
    update: function (t) {
        var _id = this.getId();
        var model = this._loadModel(_id);

        if (this._post) {
            //uploading file using cfs:fileSystem package + cfs:ejson
            //var imageId = this._uploadImage();

            //remove old image if user inputting new image        
            //if (imageId && model.imageId)
            //Images.remove(model.imageId);

            //set updated doc
            var doc = this._getDoc(t);
            //doc.imageId = imageId ? imageId : model.imageId;

            NewsFeed.update(_id, {$set: doc}, function (err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Updating NewsFeed");
            });
            Router.go('newsFeedView', {_id: _id});
        }
        return this.render('newsFeedUpdate', {
            data: {
                model: model,
            }
        });
    },
    /* event removing data by id */
    remove: function (_id) {
        NewsFeed.remove(_id, function (err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Removing NewsFeed");
        });
    },
    _loadModel: function (_id) {
        return NewsFeed.findOne(_id);
    },
});