CausesController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();

        
        this.subscription = this.subs.subscribe('causes', this.getCriteria(), sort);
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
{tag: {$regex: search, $options: 'i'}},
{type: {$regex: search, $options: 'i'}},
{shortDesc: {$regex: search, $options: 'i'}},
{longDesc: {$regex: search, $options: 'i'}},
{imgThumb: {$regex: search, $options: 'i'}},
{imgLarge: {$regex: search, $options: 'i'}},
{galleries: {$regex: search, $options: 'i'}},
{causeStart: {$regex: search, $options: 'i'}},
{causeEnd: {$regex: search, $options: 'i'}},
{causeStatus: {$regex: search, $options: 'i'}},
{causeUpdated: {$regex: search, $options: 'i'}},
{causeWeb: {$regex: search, $options: 'i'}},
{causeSocialMedia: {$regex: search, $options: 'i'}},

            ]
        };
    },
    index: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = Causes.find(this.getCriteria(), sort);

        return this.render('causesIndex', {
            data: {
                ready: this.subscription.ready,
                isEmpty: models.count() === 0 ? true : false,
                models: models,
                hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
            }
        });
    },
    view: function() {
        return this.render('causesView', {
            data: {
                model: this._loadModel(this.getId()),
            }
        });
    },
    /* private get user input docs */
    _getDoc: function(t) {
        return {
            title: t.find('#title').value,
tag: t.find('#tag').value,
type: t.find('#type').value,
shortDesc: t.find('#shortDesc').value,
longDesc: t.find('#longDesc').value,
imgThumb: t.find('#imgThumb').value,
imgLarge: t.find('#imgLarge').value,
galleries: t.find('#galleries').value,
causeStart: t.find('#causeStart').value? new Date(t.find('#causeStart').value):null,
causeEnd: t.find('#causeEnd').value? new Date(t.find('#causeEnd').value):null,
causeStatus: t.find('#causeStatus').value,
causeUpdated: t.find('#causeUpdated').value? new Date(t.find('#causeUpdated').value):null,
causeWeb: t.find('#causeWeb').value,
causeSocialMedia: t.find('#causeSocialMedia').value,

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

            Causes.insert(doc, function(err, _id) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Inserting Causes");
                Router.go('causesView', {_id: _id});
            });
        }
        return this.render('causesInsert', {});
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

            Causes.update(_id, {$set: doc}, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Updating Causes");
            });
            Router.go('causesView', {_id: _id});
        }
        return this.render('causesUpdate', {
            data: {
                model: model,
            }
        });
    },
    /* event removing data by id */
    remove: function(_id) {
        Causes.remove(_id, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Removing Causes");
        });
    },
    _loadModel: function(_id) {
        return Causes.findOne(_id);
    },
});