/**
 * 
 */
Ext.define('Healthsurvey.view.mobileview.login.ForgetPasswordWindowController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.forgetPasswordWindowController',
	
	prepareForgetPasswordJson : function(){
		debugger;
		var json = {};
		json['loginId'] = this.getView().down('#loginId').getValue();
		json['passRecoveryId'] = this.getView().down('#secQuestion').getValue();
		json['answer'] = this.getView().down('#secAnswer').getValue();
		return json;
	},
	
	onSubmitClick : function(btn, opts) {
		debugger;
		if (this.getView().down('#secQuestion').isValid() && this.getView().down('#secAnswer').isValid()) {
			var formData = this.prepareForgetPasswordJson();
			var entMask = new Ext.LoadMask({
				msg : 'Updating...',
				target : this.getView()
			}).show();

			Ext.Ajax.request({
				timeout : 180000,
				url : "secure/PasswordGenerator/forgetPassword",
				method : 'POST',
				headers : {isBeforeSession : true},
				waitMsg : 'Updating...',
				entMask : entMask,
				jsonData : formData,
				me : this,
				success : function(response, sender) {
					debugger;
					var responseText = Ext.JSON.decode(response.responseText);
					if (responseText.response.success) {
						Ext.Msg.alert("Info", responseText.response.message);
						sender.me.onResetClick();
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
					debugger;
					Ext.Msg.alert("ERROR", "Cannot connect to server");
					sender.entMask.hide();
				}
			});
		}
	},

	onResetClick : function(btn, opts) {
		this.getView().down('#secQuestion').reset();
		this.getView().down('#secAnswer').reset();
	}
});