var Backbone = require('backbone');

// App
var App = require('./app');
var userCollection = require('./collections/user');
var productCollection = require('./collections/product');

// View: User Form
var UserFormView = require('./views/user-form');
App.Views.UserForm = new UserFormView;
var ProductFormView = require('./views/product-form');
App.Views.ProductForm = new ProductFormView;

// View: List Users
var ListUsersView = require('./views/list-users');
App.Views.ListUsers  = new ListUsersView;
var ListProductsView = require('./views/list-products');
App.Views.ListProducts  = new ListProductsView;

// App Router
App.Router = Backbone.Router.extend({

  // Route definitions
  routes: {
    '': 'index',
    'user/add(/)': 'addUser',
    'user/:id/edit(/)': 'addUser',
    'user/:id/delete(/)': 'deleteUser',
    'product(/)': 'myProducts',
    'product/add(/)': 'addProduct',
    '*actions': 'defaultRoute'
  },

  // Route handlers
  myProducts: function () {
    App.Views.ListProducts.render();
    console.log('products')
  },

  addProduct: function () {
    App.Views.ProductForm.render();
    console.log('adding projects')
  },

  index: function() {
    App.Views.ListUsers.render();
  },

  addUser: function(id) {
    App.Views.UserForm.render(id);
  },

  deleteUser: function(id) {
    var user = userCollection.get(id);

    user.destroy().done(function (user) {
      App.router.navigate('/', { trigger: true })
    });
  },

  defaultRoute: function(actions) {
    console.log('404');
  }
});

// Initiate the router
App.router = new App.Router;

Backbone.history.start();
