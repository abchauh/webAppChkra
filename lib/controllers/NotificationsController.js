NotificationsController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();

        
        this.subscription = this.subs.subscribe('notifications', this.getCriteria(), sort);
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
{ownerID: {$regex: search, $options: 'i'}},
{seenAt: {$regex: search, $options: 'i'}},
{readAt: {$regex: search, $options: 'i'}},
{sentAt: {$regex: search, $options: 'i'}},
{subject: {$regex: search, $options: 'i'}},
{detail: {$regex: search, $options: 'i'}},
{filesAtt: {$regex: search, $options: 'i'}},
{notType: {$regex: search, $options: 'i'}},

            ]
        };
    },
    index: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = Notifications.find(this.getCriteria(), sort);

        return this.render('notificationsIndex', {
            data: {
                ready: this.subscription.ready,
                isEmpty: models.count() === 0 ? true : false,
                models: models,
                hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
            }
        });
    },
    view: function() {
        return this.render('notificationsView', {
            data: {
                model: this._loadModel(this.getId()),
            }
        });
    },
    /* private get user input docs */
    _getDoc: function(t) {
        return {
            userId: t.find('#userId').value,
ownerID: t.find('#ownerID').value,
seenAt: t.find('#seenAt').value? new Date(t.find('#seenAt').value):null,
readAt: t.find('#readAt').value? new Date(t.find('#readAt').value):null,
sentAt: t.find('#sentAt').value? new Date(t.find('#sentAt').value):null,
subject: t.find('#subject').value,
detail: t.find('#detail').value,
filesAtt: t.find('#filesAtt').value,
notType: t.find('#notType').value,

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

            Notifications.insert(doc, function(err, _id) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Inserting Notifications");
                Router.go('notificationsView', {_id: _id});
            });
        }
        return this.render('notificationsInsert', {});
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

            Notifications.update(_id, {$set: doc}, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Updating Notifications");
            });
            Router.go('notificationsView', {_id: _id});
        }
        return this.render('notificationsUpdate', {
            data: {
                model: model,
            }
        });
    },
    /* event removing data by id */
    remove: function(_id) {
        Notifications.remove(_id, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Removing Notifications");
        });
    },
    _loadModel: function(_id) {
        return Notifications.findOne(_id);
    },
});