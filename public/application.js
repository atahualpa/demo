(function ($) {

    //demo data
    var data = [
        { name: "Contact 1", fruit: "apple"},
        { name: "Contact 2", address: "watermellon"}
    ];

	var User = Backbone.Model.extend({});

	var Users = Backbone.Collection.extend({
 		model: User
   	//url: 'http://localhost:9393/users'
	});
	
	var users = new Users(data);

	var UserView = Backbone.View.extend({
		tagName: "user",
		className: "user-container",
		template: _.template($("#userTemplate").html()),
		
  	render: function () {
			debugger;    
			this.$el.html(this.template({model: this.model}));
    	return this;
		}
	});

	var UsersView = Backbone.View.extend({
  	el: $("#users"),

   	initialize: function () {
   		this.collection = new Users(users);
    	this.render();
    	//this.$el.find("#userEditTemplate").append(this.createSelect()); 
    	//this.on("change:filterType", this.filterByType, this);
    	//this.collection.on("reset", this.render, this);
  	 },

   	render: function () {
    	this.$el.find("user").remove();
			debugger;
   		_.each(this.collection.models, function (item) {
    		this.renderUser(item);
    	}, this);
   	},
   
   	renderUser: function (item) {
			debugger;
   		var userView = new UserView({
   			model: item
  		});
   		this.$el.append(userView.render().el);
   	},

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

		$(function(){
    //add routing
    var UsersRouter = Backbone.Router.extend({
        routes: {
            '': 'index'
        },
				index: function(){
					debugger;
					new UsersView({collection: users});
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
