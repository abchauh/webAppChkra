ProjectsController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();

        
        this.subscription = this.subs.subscribe('projects', this.getCriteria(), sort);
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
{title: {$regex: search, $options: 'i'}},
{shortDesc: {$regex: search, $options: 'i'}},
{lingDesc: {$regex: search, $options: 'i'}},
{coverImg: {$regex: search, $options: 'i'}},
{imgSrcText: {$regex: search, $options: 'i'}},
{status: {$regex: search, $options: 'i'}},
{projStart: {$regex: search, $options: 'i'}},
{projEnd: {$regex: search, $options: 'i'}},
{projLastUpdate: {$regex: search, $options: 'i'}},
{projCountry: {$regex: search, $options: 'i'}},
{projCity: {$regex: search, $options: 'i'}},
{projWeb: {$regex: search, $options: 'i'}},
{projFacebook: {$regex: search, $options: 'i'}},
{projSocialLinks: {$regex: search, $options: 'i'}},

            ]
        };
    },
    index: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = Projects.find(this.getCriteria(), sort);

        return this.render('projectsIndex', {
            data: {
                ready: this.subscription.ready,
                isEmpty: models.count() === 0 ? true : false,
                models: models,
                hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
            }
        });
    },
    view: function() {
        return this.render('projectsView', {
            data: {
                model: this._loadModel(this.getId()),
            }
        });
    },
    /* private get user input docs */
    _getDoc: function(t) {
        return {
            userId: t.find('#userId').value,
title: t.find('#title').value,
shortDesc: t.find('#shortDesc').value,
lingDesc: t.find('#lingDesc').value,
coverImg: t.find('#coverImg').value,
imgSrcText: t.find('#imgSrcText').value,
status: t.find('#status').value,
projStart: t.find('#projStart').value? new Date(t.find('#projStart').value):null,
projEnd: t.find('#projEnd').value? new Date(t.find('#projEnd').value):null,
projLastUpdate: t.find('#projLastUpdate').value? new Date(t.find('#projLastUpdate').value):null,
projCountry: t.find('#projCountry').value,
projCity: t.find('#projCity').value,
projWeb: t.find('#projWeb').value,
projFacebook: t.find('#projFacebook').value,
projSocialLinks: t.find('#projSocialLinks').value,

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

            Projects.insert(doc, function(err, _id) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Inserting Projects");
                Router.go('projectsView', {_id: _id});
            });
        }
        return this.render('projectsInsert', {});
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

            Projects.update(_id, {$set: doc}, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Updating Projects");
            });
            Router.go('projectsView', {_id: _id});
        }
        return this.render('projectsUpdate', {
            data: {
                model: model,
            }
        });
    },
    /* event removing data by id */
    remove: function(_id) {
        Projects.remove(_id, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Removing Projects");
        });
    },
    _loadModel: function(_id) {
        return Projects.findOne(_id);
    },
});