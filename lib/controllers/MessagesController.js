MessagesController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();

        
        this.subscription = this.subs.subscribe('messages', this.getCriteria(), sort);
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
                {ownerId: {$regex: search, $options: 'i'}},
{userId: {$regex: search, $options: 'i'}},
{seenAt: {$regex: search, $options: 'i'}},
{readAt: {$regex: search, $options: 'i'}},
{sentAt: {$regex: search, $options: 'i'}},
{subject: {$regex: search, $options: 'i'}},
{msgDetail: {$regex: search, $options: 'i'}},
{filesAtt: {$regex: search, $options: 'i'}},
{msgType: {$regex: search, $options: 'i'}},

            ]
        };
    },
    index: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = Messages.find(this.getCriteria(), sort);

        return this.render('messagesIndex', {
            data: {
                ready: this.subscription.ready,
                isEmpty: models.count() === 0 ? true : false,
                models: models,
                hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
            }
        });
    },
    view: function() {
        return this.render('messagesView', {
            data: {
                model: this._loadModel(this.getId()),
            }
        });
    },
    /* private get user input docs */
    _getDoc: function(t) {
        return {
            ownerId: t.find('#ownerId').value,
userId: t.find('#userId').value,
seenAt: t.find('#seenAt').value? new Date(t.find('#seenAt').value):null,
readAt: t.find('#readAt').value? new Date(t.find('#readAt').value):null,
sentAt: t.find('#sentAt').value? new Date(t.find('#sentAt').value):null,
subject: t.find('#subject').value,
msgDetail: t.find('#msgDetail').value,
filesAtt: t.find('#filesAtt').value,
msgType: t.find('#msgType').value,

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

            Messages.insert(doc, function(err, _id) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Inserting Messages");
                Router.go('messagesView', {_id: _id});
            });
        }
        return this.render('messagesInsert', {});
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

            Messages.update(_id, {$set: doc}, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Updating Messages");
            });
            Router.go('messagesView', {_id: _id});
        }
        return this.render('messagesUpdate', {
            data: {
                model: model,
            }
        });
    },
    /* event removing data by id */
    remove: function(_id) {
        Messages.remove(_id, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Removing Messages");
        });
    },
    _loadModel: function(_id) {
        return Messages.findOne(_id);
    },
});