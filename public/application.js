(function ($) {


/*
2) 3 views: list, edit, show.  show knows about list and edit.  show has events: 'mouseup #some-div': swapViews, swapViews: function(e) {this.listView.toggle(); this.editView.toggle()}
list view and edit views need a toggle setup too
I generally have an initialize in all of my views that setup the _.bindAll, this, 'list', 'of', 'methods'
*/

var User = Backbone.Model.extend({});

var Users = Backbone.Collection.extend({
  model: User,
  url: '/users'
});

var users = new Users;

var showUserView = Backbone.View.extend({
  tagName: "user",
  className: "user-container",
  events: 'mouseup .edit','swapViews',
  template: _.template($("#userTemplate").html()),

  swapViews: function(e) {
      // Wondering if "listUserView" goes here or not.
      // Should I be switching the general view ("listUserView")?.
      this.listUserView.toggle(); 
      this.editUserView.toggle();
    }

    render: function () {
     this.$el.html(this.template({model: this.model}));
     return this;
   }
 });

var editUserView = Backbone.View.extend({
  tagName: "user",
  className: "user-container",
  template: _.template($("#userEditTemplate").html()),

  initialize: function () {
    this.render();
    this.$el.find("#userEditTemplate").append(this.createSelect()); 
  }

  render: function () {
   this.$el.html(this.template({model: this.model}));
   return this;
 }

 getTypes: function () {
   return _.uniq(this.collection.pluck("fruit"));
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
});

var listUsersView = Backbone.View.extend({
 el: $("#users"),

 initialize: function () {
   		// this.collection = new Users(users);
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
     var userView = new UserView({
      model: item
    });
     this.$el.append(userView.render().el);
   },
 });

$(function(){
    //add routing
    var UsersRouter = Backbone.Router.extend({
      routes: {
        '': 'index'
      },
      index: function(){
       var users = new Users();
       users.fetch({
        success:function(a,b,c){
         new listUsersView({collection: users});
       },	
       error:function(a,b,c){
         debugger;
       }		
     });
     }
   });
    
    //create instance of master view
    //var users_view = new UsersView();

    //create router instance
    var usersRouter = new UsersRouter();


    	//start history service
    	Backbone.history.start();			
    });

} (jQuery));
