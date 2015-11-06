/**
 * 
 */
Ext.define('Healthsurvey.view.logger.LogConfigurationTabPanelController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.logConfigurationTabPanelController',
		
	dbConnectorTab : null,
	dbConnectorTabController : null,
	detailsTab : null,
	detailsTabController : null,
	fileConnectorTab : null,
	fileConnectorTabController : null,
	syslogSocketConnectorTab : null,
	syslogSocketConnectorTabController : null,
	tcpSocketConnectorTab : null,
	tcpSocketConnectorTabController : null,
	appConfigId : null,
	
	submitButton : null,
	init : function()
	{
		var currentObject = this;
		currentObject.appConfigId = currentObject.view.down('#appConfigId');
		
		currentObject.dbConnectorTab = currentObject.view.down('#dbConnectorTab');
		currentObject.dbConnectorTabController = currentObject.dbConnectorTab.getController();
		
		currentObject.detailsTab = currentObject.view.down('#detailsTab');
		currentObject.detailsTabController = currentObject.detailsTab.getController();
		
		
		currentObject.fileConnectorTab = currentObject.view.down('#fileConnectorTab');
		currentObject.fileConnectorTabController = currentObject.fileConnectorTab.getController();
		
		currentObject.syslogSocketConnectorTab = currentObject.view.down('#syslogSocketConnectorTab');
		currentObject.syslogSocketConnectorTabController = currentObject.syslogSocketConnectorTab.getController();
		
		currentObject.tcpSocketConnectorTab = currentObject.view.down('#tcpSocketConnectorTab');
		currentObject.tcpSocketConnectorTabController = currentObject.tcpSocketConnectorTab.getController();
		
		currentObject.submitButton = currentObject.view.down('#submitButton');

		debugger;
		Ext.Ajax.request({
			timeout: 6000000,
			url : 'secure/Logger/findAll',
			method : 'GET',
			jsonData : {},
			success : function(response, opts) {
				debugger;
				var responseJson = Ext.JSON.decode(response.responseText);
							
				if (responseJson.response.success) {
						var parsedFormJSON = responseJson.response.data;
						
						currentObject.submitButton.setText("Update");
						currentObject.appConfigId.setValue(parsedFormJSON.appConfigId);
						
						currentObject.detailsTabController.setLoggerForm(parsedFormJSON);
						currentObject.fileConnectorTabController.setLoggerForm(parsedFormJSON);
						currentObject.dbConnectorTabController.setLoggerForm(parsedFormJSON);
						currentObject.syslogSocketConnectorTabController.setLoggerForm(parsedFormJSON);
						currentObject.tcpSocketConnectorTabController.setLoggerForm(parsedFormJSON);
				}
			},
			failure : function(response,opts) 
			{
				var responseJson = Ext.JSON.decode(response.responseText);	
				Ext.Msg.alert("Error...",responseJson.response.message); 
			},
		}, this);
		
	},
	onResetClick : function(but, evt) 
	{
		debugger;
		var loggerForm = but.up('form').getForm();
		loggerForm.reset();
	},
	onSubmitClick : function(but, evt) {
		debugger;
		this.onUpdateLogger(but, evt);
	},
	
	createAppLogJSON : function(formJSON)
	{
		debugger;
		var dbConnectorJSON = this.dbConnectorTabController.toJson(formJSON);
		var fileConnectorJSON = this.fileConnectorTabController.toJson(formJSON);
		var tcpSocketConnectorJSON = this.tcpSocketConnectorTabController.toJson(formJSON);
		var syslogSocketConnectorJSON = this.syslogSocketConnectorTabController.toJson(formJSON);
		var detailsJSON = this.detailsTabController.toJson(formJSON);
		
		var connectorJSON = '';
		connectorJSON = connectorJSON.concat("'connectorArray': [ ");
		connectorJSON = connectorJSON + dbConnectorJSON + ",";
		connectorJSON = connectorJSON + fileConnectorJSON + ",";
		connectorJSON = connectorJSON + syslogSocketConnectorJSON + ",";
		connectorJSON = connectorJSON + tcpSocketConnectorJSON + "]";

		var appLogJSON = '{';
		appLogJSON = appLogJSON.concat("'appConfigId': '"+ this.appConfigId.getValue() +"'");		
		appLogJSON = appLogJSON.concat(",");
		appLogJSON = appLogJSON.concat(detailsJSON);
		appLogJSON = appLogJSON.concat(",");
		appLogJSON = appLogJSON.concat(connectorJSON);
		appLogJSON = appLogJSON.concat("}")
		return appLogJSON;
	},
	
	onUpdateLogger : function(but, evt)
	{
		debugger;
		var currentObject = this;
		var form = but.up('form').getForm();
		var formJSON = Ext.JSON.encode(form.getValues());
				
		var appLogJSON = this.createAppLogJSON(formJSON);
		
		if (form.isValid()) {
			this.waitWindow = Ext.MessageBox.wait('Please wait, request in process');
			Ext.Ajax.request({
						timeout: 6000000,
						url : 'secure/Logger/update',
						jsonData : Ext.JSON.decode(appLogJSON),
						method : 'PUT',
						success : function(response, opts) {
							debugger;
							var responseJson = Ext.JSON.decode(response.responseText);
							if (responseJson.response.success) {
								Ext.Msg.alert("Info",responseJson.response.message);
							} 
							else 
							{
								Ext.Msg.alert("Error...",responseJson.response.message);
							}
						},
						failure : function(response,opts) 
						{
							var responseJson = Ext.JSON.decode(response.responseText);	
							Ext.Msg.alert("Error...",responseJson.response.message); 
						},
					}, this);
		} else {
			Ext.Msg.alert('Form Validation', "Form is not valid");
		}
	}
});