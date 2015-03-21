CampsController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();

        
        this.subscription = this.subs.subscribe('camps', this.getCriteria(), sort);
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
{longDesc: {$regex: search, $options: 'i'}},
//{coverImg: {$regex: search, $options: 'i'}},
{imgSrcText: {$regex: search, $options: 'i'}},
{causes: {$regex: search, $options: 'i'}},
{campCreatedAt: {$regex: search, $options: 'i'}},
{campEndDate: {$regex: search, $options: 'i'}},
{campLastUpdate: {$regex: search, $options: 'i'}},
{address: {$regex: search, $options: 'i'}},
{country: {$regex: search, $options: 'i'}},
{city: {$regex: search, $options: 'i'}},

            ]
        };
    },
    index: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = Camps.find(this.getCriteria(), sort);
        
        // chkName = "inside CampsController";
        
        // Meteor.call('sayHello', 'Namoo', function(err, result){
        //     alert('Result from server:' + result);
        // });

        return this.render('campsIndex', {
            data: {
                ready: this.subscription.ready,
                isEmpty: models.count() === 0 ? true : false,
                models: models,
                hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
            }
        });
        
    },
    view: function() {
        return this.render('campsView', {
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
            longDesc: t.find('#longDesc').value,
            //coverImg: t.find('#coverImg').value,
            imgSrcText: t.find('#imgSrcText').value,
            causes: t.find('#causes').value,
            campCreatedAt: t.find('#campCreatedAt').value? new Date(t.find('#campCreatedAt').value):null,
            campEndDate: t.find('#campEndDate').value? new Date(t.find('#campEndDate').value):null,
            campLastUpdate: t.find('#campLastUpdate').value? new Date(t.find('#campLastUpdate').value):null,
            address: t.find('#address').value,
            country: t.find('#country').value,
            city: t.find('#city').value,

        };
    },
    /* uploading file using cfs:fileSystem package + cfs:ejson */
    _uploadImage: function() {
        var coverImg = null;
        var file = $('#coverImg').get(0).files[0];
        if (file) {
            var image = Images.insert(file, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
            });
            coverImg = image._id;
        }
        return coverImg;
    },
    /* event inserting data */
    insert: function(t) {
        if (this._post) {
            //uploading file using cfs:fileSystem package + cfs:ejson
            var coverImg = this._uploadImage();

            //set inserted doc
            var doc = this._getDoc(t);
            doc.coverImg = coverImg;
            doc.userId = Meteor.userId();

            Camps.insert(doc, function(err, _id) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Inserting Camps");
                Router.go('campsView', {_id: _id});
            });
        }
        return this.render('campsInsert', {});
    },
    /* event updating data */
    update: function(t) {
        var _id = this.getId();
        var model = this._loadModel(_id);

        if (this._post) {
            //uploading file using cfs:fileSystem package + cfs:ejson
            var coverImg = this._uploadImage();

            //remove old image if user inputting new image        
            if (coverImg && model.coverImg)
                Images.remove(model.coverImg);

            //set updated doc
            var doc = this._getDoc(t);
            doc.coverImg = coverImg ? coverImg : model.coverImg;
            
            //Moved_Update_to_server
            //Camps.update(_id, {$set: doc}, function(err) {
            Meteor.call('campsUpdateServer', _id, doc, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Updating Camps");
            });
            Router.go('campsView', {_id: _id});
        }
        return this.render('campsUpdate', {
            data: {
                model: model,
            }
        });
    },
    /* event removing data by id */
    remove: function(_id) {
        Camps.remove(_id, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Removing Camps");
        });
    },
    _loadModel: function(_id) {
        return Camps.findOne(_id);
    },
});