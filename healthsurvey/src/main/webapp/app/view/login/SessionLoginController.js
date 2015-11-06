Ext.define('Healthsurvey.view.login.SessionLoginController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.sessionLoginCtrll',
	
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
	}
});