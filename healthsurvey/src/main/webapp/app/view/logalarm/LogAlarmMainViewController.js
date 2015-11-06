/**
 * 
 */
Ext.define('Healthsurvey.view.logalarm.LogAlarmMainViewController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.logAlarmMainViewController',
	
	logAlarmTreePanelController : null,
	logAlarmMainViewTabPanelController : null,
	init : function()
	{
		debugger;
		var currentObject = this;
		currentObject.logAlarmTreePanelController = currentObject.view.down('#logAlarmTreePanel').getController();
		currentObject.logAlarmMainViewTabPanelController = currentObject.view.down('#logAlarmMainViewTabPanel').getController();
		
		currentObject.getLogModules();
	},
	
	getLogModules : function(){
		debugger;
		var currentObject = this;
		Ext.Ajax.request({
			timeout: 6000000,
			url : 'secure/Logger/findAll',
			method : 'GET',
			jsonData : {},
			success : function(response, opts){
				debugger;
				var responseJson = Ext.JSON.decode(response.responseText);
				if (responseJson.response.success) {
					var logConfigData = responseJson.response.data;
					currentObject.logAlarmMainViewTabPanelController.getView().getActiveTab().getController().loadLoggerData(logConfigData);
					
					Ext.Ajax.request({
						timeout: 6000000,
						url : 'secure/LogModule/findAll',
						method : 'GET',
						jsonData : {},
						success : function(response, opts){
							debugger;
							var responseJson = Ext.JSON.decode(response.responseText);
							if (responseJson.response.success) {
								var logModuleData = responseJson.response.data;
								currentObject.logAlarmTreePanelController.setFormData(logModuleData);
								currentObject.logAlarmMainViewTabPanelController.setFormData(logModuleData);
							} else {
								Ext.Msg.alert("Error.", responseJson.message);
							}
						},
						failure : function(response, opts){
							var responseJson = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert("Error...", responseJson.response.message);
						}
					});
				} else {
					Ext.Msg.alert("Error.", responseJson.message);
				}
			},
			failure : function(response, opts){
				var responseJson = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert("Error...", responseJson.response.message);
			}
		});
	
		
	
	},
	setButtonText : function(text)
	{
		this.view.down('#saveButton').setText(text);
	},
	
	onClearButton : function(but, evt) {
		debugger;
		this.setButtonText("Save Module");
		this.logAlarmMainViewTabPanelController.getView().getActiveTab().getController().clearFormData(but,evt);
	},
	
	onSaveButton : function(but, evt) {
		debugger;
		this.logAlarmMainViewTabPanelController.getView().getActiveTab().getController().onSaveButton(but,evt);
	}
});
