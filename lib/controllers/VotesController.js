VotesController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();

        
        this.subscription = this.subs.subscribe('votes', this.getCriteria(), sort);
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
                {userId: {$regex: search, $options: 'i'}},
{votedItem: {$regex: search, $options: 'i'}},
{votedItemID: {$regex: search, $options: 'i'}},
{votedAt: {$regex: search, $options: 'i'}},
{votedOrDemoted: {$regex: search, $options: 'i'}},
{status: {$regex: search, $options: 'i'}},
{statusChsngedBy: {$regex: search, $options: 'i'}},
{statusChangedAt: {$regex: search, $options: 'i'}},

            ]
        };
    },
    index: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = Votes.find(this.getCriteria(), sort);

        return this.render('votesIndex', {
            data: {
                ready: this.subscription.ready,
                isEmpty: models.count() === 0 ? true : false,
                models: models,
                hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
            }
        });
    },
    view: function() {
        return this.render('votesView', {
            data: {
                model: this._loadModel(this.getId()),
            }
        });
    },
    /* private get user input docs */
    _getDoc: function(t) {
        return {
            userId: t.find('#userId').value,
votedItem: t.find('#votedItem').value,
votedItemID: t.find('#votedItemID').value,
votedAt: t.find('#votedAt').value? new Date(t.find('#votedAt').value):null,
votedOrDemoted: t.find('#votedOrDemoted').value,
status: t.find('#status').value,
statusChsngedBy: t.find('#statusChsngedBy').value,
statusChangedAt: t.find('#statusChangedAt').value? new Date(t.find('#statusChangedAt').value):null,

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
    insert: function(t) {
        if (this._post) {
            //uploading file using cfs:fileSystem package + cfs:ejson
            //var imageId = this._uploadImage();

            //set inserted doc
            var doc = this._getDoc(t);
            //doc.imageId = imageId;

            Votes.insert(doc, function(err, _id) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Inserting Votes");
                Router.go('votesView', {_id: _id});
            });
        }
        return this.render('votesInsert', {});
    },
    /* event updating data */
    update: function(t) {
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

            Votes.update(_id, {$set: doc}, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Updating Votes");
            });
            Router.go('votesView', {_id: _id});
        }
        return this.render('votesUpdate', {
            data: {
                model: model,
            }
        });
    },
    /* event removing data by id */
    remove: function(_id) {
        Votes.remove(_id, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Removing Votes");
        });
    },
    _loadModel: function(_id) {
        return Votes.findOne(_id);
    },
});