CampaignsController = MeteorisController.extend({
    /* get subscribtion from server with parameter criteria, and sort/limit */
    subscriptions: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();

        this.subs.subscribe('campUpdates', {});
        this.subscription = this.subs.subscribe('campaigns', this.getCriteria(), sort);
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
                //{headerImg: {$regex: search, $options: 'i'}},
                {about: {$regex: search, $options: 'i'}},
                {supporters: {$regex: search, $options: 'i'}},
                {promoteCount: {$regex: search, $options: 'i'}},
                {sharedCount: {$regex: search, $options: 'i'}},
                {country: {$regex: search, $options: 'i'}},
                {city: {$regex: search, $options: 'i'}},
                {ownerid: {$regex: search, $options: 'i'}},
                {ownernickname: {$regex: search, $options: 'i'}},
                {type: {$regex: search, $options: 'i'}},
                {linkedToBlocks: {$regex: search, $options: 'i'}},
                {status: {$regex: search, $options: 'i'}},
                {imgs: {$regex: search, $options: 'i'}},
                {thumbnail: {$regex: search, $options: 'i'}},
                {contributers: {$regex: search, $options: 'i'}},
                {organisers: {$regex: search, $options: 'i'}},
                {admins: {$regex: search, $options: 'i'}},
                {tags: {$regex: search, $options: 'i'}},
            ]
        };
    },
    index: function() {
        var sort = MeteorisGridView.getSorting();
        sort.limit = this.limit();
        var models = Campaigns.find(this.getCriteria(), sort);

        return this.render('campaignsIndex', {
            data: {
                ready: this.subscription.ready,
                isEmpty: models.count() === 0 ? true : false,
                models: models,
                hasMore: this.limit() == models.fetch().length ? this.route.path({limit: this.limit() + this.increment}) : null,
            }
        });
    },
    view: function() {
        return this.render('campaignsView', {
            data: {
                model: this._loadModel(this.getId()),
            }
        });
    },
    /* private get user input docs */
    _getDoc: function(t) {
        return {
//            title: t.find('#title').value,
headerImg: t.find('#headerImg').value,
            ctype: t.find('#ctype').value,
            location: t.find('#location').value,
            tlocation: t.find('#tlocation').value,
            causes: t.find('#causes').value,
            title: t.find('#title').value,
//            imgs: t.find('#imgs').value,
        };
    },
    /* uploading file using cfs:fileSystem package + cfs:ejson */
    _uploadImage: function() {
        var headerImg = null;
        var file = $('#headerImg').get(0).files[0];
        if (file) {
            var image = Images.insert(file, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
            });
            headerImg = image._id;
        }

        return headerImg;
    },
    /* event inserting data */
    insert: function(t) {
        if (this._post) {
            //uploading file using cfs:fileSystem package + cfs:ejson
            var headerImg = this._uploadImage();

            //set inserted doc
            var doc = this._getDoc(t);
            doc.headerImg = headerImg;

            Campaigns.insert(doc, function(err, _id) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Inserting Campaigns");
                Router.go('campaignsView', {_id: _id});
            });
        }
        return this.render('campaignsInsert', {});
    },
    /* event updating data */
    update: function(t) {
        var _id = this.getId();
        var model = this._loadModel(_id);

        if (this._post) {
            //uploading file using cfs:fileSystem package + cfs:ejson
            var headerImg = this._uploadImage();

            //remove old image if user inputting new image        
            if (headerImg && model.headerImg)
                Images.remove(model.headerImg);

            //set updated doc
            var doc = this._getDoc(t);
            doc.headerImg = headerImg ? headerImg : model.headerImg;

            Campaigns.update(_id, {$set: doc}, function(err) {
                if (err) {
                    MeteorisFlash.set('danger', err.message);
                    throw new Meteor.Error(err);
                }
                MeteorisFlash.set('success', "Success Updating Campaigns");
            });
            Router.go('campaignsView', {_id: _id});
        }
        return this.render('campaignsUpdate', {
            data: {
                model: model,
            }
        });
    },
    /* event removing data by id */
    remove: function(_id) {
        Campaigns.remove(_id, function(err) {
            if (err) {
                MeteorisFlash.set('danger', err.message);
                throw new Meteor.Error(err);
            }
            MeteorisFlash.set('success', "Success Removing Campaigns");
        });
    },
    _loadModel: function(_id) {
        return Campaigns.findOne(_id);
    },
});