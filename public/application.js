(function ($) {

  // Model and Collection
  var User = Backbone.Model.extend({});
  var Users = Backbone.Collection.extend({
    model: User,
    url: '/users'
  });

  // Views
  var ShowUserView = Backbone.View.extend({

    tagName: "user",
    className: "user-show-container",
    template: _.template($("#userTemplate").html()),

    events: {
      'mouseup .edit' : 'swapViews'
    },

    initialize: function() {
      _.bindAll(this, 'render', 'swapViews');
      this.render();
    },

    swapViews: function(e) {
      debugger;
      this.$el.html(this.editView);
    },

    render: function () {
      this.showView = this.template({model: this.model})
      this.editView = new EditUserView({model: this.model});
      this.$el.html(this.showView);
      // this.$el.append(this.editView.el);
      $el.find('.edit').bind('mouseup', this.swapViews);
      return this;
    }
  });

  var EditUserView = Backbone.View.extend({
    tagName: "user",
    className: "user-edit-container",
    template: _.template($("#userEditTemplate").html()),

    initialize: function () {
      _.bindAll(this,'render','getTypes','createSelect');
      this.render()
    },

    render: function () {
      this.$el.html(this.template({model: this.model}));
      this.$el.append(this.createSelect()); 
      return this;
    },

    getTypes: function () {
      return _.uniq(this.model.collection.pluck("fruit"));
    },

    createSelect: function () {
      var select = $("<select/>", {
        html: "<option value=''>Choose one</option>"
      });

      _.each(this.getTypes(), function (item) {
        var option = $("<option/>", {
          value: item,
          text: item
        }).appendTo(select);
      });

      return select;
    },
  }); // EditUserView

  var ListUsersView = Backbone.View.extend({
    el: $("#users"),

    initialize: function () {
      this.render();
      //this.on("change:filterType", this.filterByType, this);
      //this.collection.on("reset", this.render, this);

    },

    render: function () {
      this.$el.find("user").remove();
      _.each(this.collection.models, function (item) {
        this.renderUser(item);
      }, this);
    },

    renderUser: function (item) {
      var userShowView = new ShowUserView({
        model: item
      });
      var userEditView = new EditUserView({
        model: item
      });
      this.$el.append(userShowView.el);
      this.$el.append(userEditView.el);
    }
  }); // ListUsersView

  // Router
  var UsersRouter = Backbone.Router.extend({
    routes: {
      '': 'index'
    },
    
    index: function(){
      var users = new Users();
      users.fetch({
        success:function(a,b,c){
          new ListUsersView({collection: users});
        },  
        error:function(a,b,c){
          // TODO
        }    
      });
    }
  });

  // On Window Load
  $(function(){
    //create router instance
    new UsersRouter();
    //start history service
    Backbone.history.start();      
  });

} (jQuery));
