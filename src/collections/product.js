var Backbone = require('backbone');


/****************************************
  App
*****************************************/

var App = require('../app');
var User = require('../models/Product');

/****************************************
  Collection: User
*****************************************/

var UserCollection = Backbone.Collection.extend({
  url: App.Settings.apiRoot + '/products',
  model: product
});

App.Collections.product = new productCollection;

module.exports = App.Collections.product;
