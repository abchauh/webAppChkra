_.deepOmit = function (obj, filter) {
    var omittedObj = {};
    if (_.isObject(obj)) {
        var keys = _.keys(obj);
        for (var i=0; i<keys.length; i++) {
            var key = keys[i];
            var val = obj[key];
            if (! filter(val, key, obj)) {
                omittedObj[key] = _.isObject(val) ? _.deepOmit(val, filter) : val;
            }
        }
    }
    return omittedObj;
};
