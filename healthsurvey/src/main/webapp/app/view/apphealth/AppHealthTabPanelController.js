/**
 * 
 */
Ext.define('Healthsurvey.view.apphealth.AppHealthTabPanelController',{
	extend : 'Ext.app.ViewController',
	alias : 'controller.appHealthTabPanelController',
	requires : ['Healthsurvey.view.apphealth.AppHealthConnector'],
	
	init : function()
	{
		this.loadFormData();
	},
	
	loadFormData :function(){
		var currentObject = this;
		Ext.Ajax.request({
			timeout: 6000000,
			url : 'secure/HealthSchedulerService/findAll',
			method : 'GET',
			jsonData : {},
			success : function(response, opts){
				var responseJson = Ext.JSON.decode(response.responseText);
				if (responseJson.response.success) {
					var appHealthSchedulerData = responseJson.response.data;
					
					Ext.Ajax.request({
						timeout: 6000000,
						url : 'secure/HealthStatusService/findAll',
						method : 'GET',
						jsonData : {},
						success : function(response, opts){
							var responseJson = Ext.JSON.decode(response.responseText);
							if (responseJson.response.success) {
								var appHealthStatusData = responseJson.response.data[0];
								
								for(var i = 0; i < appHealthSchedulerData.length; i++)
								{
									var appHealthScheduler = appHealthSchedulerData[i];
									var connectorPanel = Ext.create("Healthsurvey.view.apphealth.AppHealthConnector", {
										title : appHealthScheduler.schedulerKey,
									});
									
									connectorPanel.getController().setFormData(appHealthScheduler, appHealthStatusData,i);
									var tabPosition = i;
									if (appHealthScheduler.schedulerName == "connector.status") {
										tabPosition = 0;
									}
									currentObject.onAddTabClick(connectorPanel,tabPosition);
								}
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
	
	onAddTabClick: function(connectorPanel,index) 
	{
		var tabPanel = this.getView().down('#appHealthTab');
		if(index == 0){
			 var tab = tabPanel.insert(index,{
		           xtype : connectorPanel
		         });
			tabPanel.setActiveTab(tab);
		}
		else{
			var tab = tabPanel.add({
		           xtype : connectorPanel
		    });
		}
    },
	
	onResetClick : function(but, evt) 
	{
		var appHealthForm = but.up('form').getForm();
		appHealthForm.reset();
	},
	
	getConnectorJSON : function()
	{
		var tabPanel = this.getView().down('#appHealthTab');
		var tabs = tabPanel.items;
		
		var connectorJSON = '[';
		for(var i = 0; i < tabs.length; i++)
		{
			var appHealthConnectorController = tabs.get(i).getController();
			var appHealthConnectorJson = appHealthConnectorController.toJson();
			
			if(i == 0 || appHealthConnectorJson.schedulerKey == 'Status')
			{
				var statusJson = appHealthConnectorController.getStatusJson();
				this.updateHealthStatus(statusJson);
			}
			
			connectorJSON = connectorJSON.concat(appHealthConnectorJson);
			connectorJSON = connectorJSON.concat(",");
		}
		connectorJSON = connectorJSON.concat("]");
		return connectorJSON;
	},
	
	updateHealthStatus : function(statusJson)
	{
		Ext.Ajax.request({
			timeout: 6000000,
			url : 'secure/HealthStatusService/update',
			jsonData : Ext.decode(statusJson),
			contoller : this,
			method : 'PUT',
			success : function(response, opts) {
				var responseJson = Ext.JSON.decode(response.responseText);
				if (responseJson.response.success == true) {
					Ext.Msg.alert("Info",responseJson.response.message);
					var tabPanel = opts.contoller.getView().down('#appHealthTab');
					tabPanel.removeAll();
					opts.contoller.loadFormData();
				} else {
					Ext.Msg.alert("Error...",responseJson.response.message);
				}
			},
			failure : function(response,opts) 
			{
				var responseJson = Ext.JSON.decode(response.responseText);	
				Ext.Msg.alert("Error...",responseJson.response.message); 
			},
		}, this);
	},
	
	onSubmitClick : function(but, evt) {
		var form = but.up('form').getForm();
		
		var connectorJson = this.getConnectorJSON();
		
		if (form.isValid()) {
			this.waitWindow = Ext.MessageBox.wait('Please wait, request in process');
			Ext.Ajax.request({
						timeout: 6000000,
						url : 'secure/HealthSchedulerService/update',
						jsonData : Ext.decode(connectorJson),
						contoller : this,
						method : 'PUT',
						success : function(response, opts) {
							debugger;
							var responseJson = Ext.JSON.decode(response.responseText);
							if (responseJson.response.success == true) {
								opts.contoller.updateHealthStatus();
							} else {
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
	},
});