var $ = require('jquery');
var Backbone = require('backbone');
var productFormTemplate = require('../templates/product-form.hbs');


/****************************************
  App
*****************************************/

var App = require('../app');
var Product = require('../models/product');

/****************************************
  View: User Form
*****************************************/

var ProductFormView = Backbone.View.extend({
  el: $("main"),
  editMode: false,

  render: function (productId) {
    var _this = this;
    this.editMode = !!productId;

    // Display form in Create Mode
    if (!this.editMode) {
      var output = productFormTemplate();
      this.$el.html(output);

    // Display form in Update Mode
    } else {
      var product = this.product = new Product({ id: productId });

      product.fetch().done(function () {
        var output = formTemplate(product.toJSON());
        _this.$el.html(output);
      });
    }
  },

  events: {
    "submit form.product": "submitForm"
  },

  submitForm: function () {
    // Collect Form Data
    var formData = {
      //use id's on the inputs instead of this way:
      id: $('#prodId').val(),
      type: $('#prodType').val(),
      //id: $('form.product input[id="id"]').val(),
      //type: $('form.product input[type="text"]').val(),

    };

    // Add Mode (Create User)
    if (!this.editMode) {

      // Only set the image on add mode
      formData.img = 'http://robohash.org/'+ Date.now().toString(16) + '.png'

      App.Collections.product.create(formData, {
        success: function (product) {
          App.router.navigate('/', { trigger: true });
        }
      });

    // Edit Mode (Update User)
    } else {
      this.product.set(formData);
      this.product.save().done(function () {
        App.router.navigate('/', { trigger: true });
      });
    }

    // Prevent Default
    return false;
  }
});

module.exports = ProductFormView;