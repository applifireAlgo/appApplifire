Ext.define('Healthsurvey.view.login.LoginPageController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.login',
	views : [ "LoginPage" ],
//	requires : [ 'view.main.Main' ],
	
	latitude : null,
	longitude : null,
	
	loggedInUserContactDetails : null,
	
	onSpecialKey : function(field, e) {
		if (e.getKey() === e.ENTER) {
			this.doLogin();
		}
	},
	onLoginClick : function() {
		this.doLogin();
	},
	doLogin : function() {
		var form = this.view.down('#form1');
		// var container = this.view.container;
		var container = this.getView();
		var currentObject = this;

		if (form.isValid()) {
			Ext.Ajax.request({
				url : "secure/Authentication/authenticate",
				method : 'POST',
				container : container,
				maskEnable: true,
				currentObject : currentObject,
				jsonData : {
					"loginId" : form.getValues().loginId,
					"password" : form.getValues().password,
					"latitude" : currentObject.latitude,
					"longitude" : currentObject.longitude
				},
				success : function(response, scope) {
					debugger;
					var jsonResponse = Ext.JSON.decode(response.responseText);
					if (jsonResponse.response.success) {
						scope.currentObject.loggedInUserContactDetails = jsonResponse.response.userinfo;
						scope.container.removeAll();
						/*#applifireRedirect#*/  
					} else {
						if (jsonResponse.response.changePassword == true) {
							Ext.Msg.confirm('Confirm', jsonResponse.response.message, function(id, value) {
								if (id == 'yes') {
									debugger;
									// show change password screen
									scope.container.removeAll();
									scope.container.add(Ext.create('Healthsurvey.view.login.ChangePasswordScreen'));
								}
							}, {
								controller : this,
								scope : scope
							});
						} else {
							Ext.Msg.alert({
								title : 'Info',
								msg : jsonResponse.response.message,
								icon : Ext.MessageBox.WARNING
							});
						}
					}
				},
				failure : function(response, scope) {
					debugger;
					var jsonResponse = Ext.JSON.decode(response.responseText);
					Ext.Msg.alert('Error', jsonResponse.response.message);
				}
			});
		}
	},

	onSessionLoginClick : function() {

		debugger;
		var form = this.lookupReference('form');
		var container = this.view.container;

		var currentObject = this;
		if (form.isValid()) {
			debugger;
			Ext.Ajax.request({
				url : "secure/Authentication/reauthenticate",
				method : 'POST',
				controller : currentObject,
				maskEnable: true,
				jsonData : {
					"loginId" : '',
					"password" : form.getValues().password
				},
				success : function(response, scope) {
					debugger;
					var jsonRespone = Ext.JSON.decode(response.responseText);

					if (jsonRespone.response.success) {
						
						sessionTimeOutFlag = false;
						
						/*if(scope.controller.view.currentController != null){
							scope.controller.view.currentController.renderTreeGridData();
						}*/
						
						form.up().close();
					} else {
						if (jsonResponse.response.changePassword == true) {
							Ext.Msg.confirm('Confirm', jsonResponse.response.message, function(id, value) {
								if (id == 'yes') {
									debugger;
									// show change password screen
									scope.container.removeAll();
									scope.container.add(Ext.create('Healthsurvey.view.login.ChangePasswordScreen'));
								}
							}, {
								controller : this,
								scope : scope
							});
						} else {
							Ext.Msg.alert({
								title : 'Info',
								msg : jsonResponse.response.message,
								icon : Ext.MessageBox.WARNING
							});
						}
					}
				},
				failure : function(response) {
					var jsonRespone = Ext.JSON.decode(response.responseText);
					Ext.Msg.alert('Authentication failed', jsonRespone.response.message);
				}
			});
		}
	},

	onForgetPasswordClick : function(btn, opts) {
		debugger;
		var parentpanel = this.getView();
		var form = this.view.down('#form1');
		var loginId = form.getValues().loginId;

		var entMask = new Ext.LoadMask({
			msg : 'Loading questions...',
			target : this.getView()
		}).show();
		Ext.Ajax.request({
			timeout : 180000,
			url : "secure/PasswordGenerator/findSecurityQuestions",
			headers : {isBeforeSession : true},
			method : 'POST',
			waitMsg : 'Loading questions...',
			entMask : entMask,
			jsonData : {
				"findKey" : loginId
			},
			me : this,
			success : function(response, sender) {
				debugger;
				var responseText = Ext.JSON.decode(response.responseText);
				if (responseText.response.success) {
					var data = responseText.response.data;
					var forgetPasswordWindow = Ext.create('Healthsurvey.view.login.ForgetPasswordWindow', {
						parentPanel : parentpanel,
						listeners : {
							afterrender : function(window, opts) {
								debugger;
								window.down('#loginId').setValue(loginId);
								var secQuestionStore = window.down('#secQuestion').getStore();
								secQuestionStore.loadData(Ext.JSON.decode(data));
							},
							scope : btn.up('login').controller
						}
					});
					parentpanel.add(forgetPasswordWindow).show();
				} else {
					Ext.Msg.alert({
						title : 'Info',
						msg : responseText.response.message,
						icon : Ext.MessageBox.WARNING
					});
				}
				sender.entMask.hide();
			},
			failure : function(response, sender) {
				Ext.Msg.alert("ERROR", "Cannot connect to server");
				sender.entMask.hide();
			}
		});
	},
	
	errorHandler : function(err) {
		if (err.code == 1) {
			console.log("Error: Access is denied!");
		}

		else if (err.code == 2) {
			console.log("Error: Position is unavailable!");
		}
	},

	getLocation : function() {
		var currentObject = this;
		if (navigator.geolocation) {
			var options = {
				timeout : 180000
			};
			navigator.geolocation.getCurrentPosition(function(position) {
				currentObject.latitude = position.coords.latitude;
				currentObject.longitude = position.coords.longitude;
			}, this.errorHandler, options);
		} else {
			 console.log("Sorry, browser does not support geolocation!");
		}
	}
});
