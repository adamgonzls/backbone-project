var $ = require('jquery');
var Backbone = require('backbone');
var listProductsTemplate = require('../templates/list-products.hbs');

// App

var App = require('../app');

// View: List Products

var ListProducts = Backbone.View.extend({
  el: $('main'),

  collection: App.Collections.product,

  render: function () {
    var _this = this;
    var userCollection = this.collection;

    //Fetch Collection from Server
    userCollection.fetch().done(function (products) {
      _this.$el.html(listProductsTemplate(products));
    });
  }
});

module.exports = ProductsUsers;