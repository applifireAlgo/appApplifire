/**
 * 
 */
Ext.define('Healthsurvey.view.logalarm.mainscreen.LogAlarmMainViewTabPanelController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.logAlarmMainViewTabPanelController',
	
	init : function()
	{
		debugger;
		var component = Ext.create("Healthsurvey.view.logalarm.mainscreen.AddLogAlarm", {
			title : "Log Module",
		});
		this.onAddTabClick(component);
	},
	onAddTabClick: function(component) 
	{
		debugger;
		var tabPanel = this.getView(),
        tab = tabPanel.add({
           xtype : component
         });
		tabPanel.setActiveTab(tab);
    },
    
    setFormData : function(logModuleData)
	{
		debugger;
		var tabPanel = this.getView();
		
		var logModule = logModuleData[0];
		tabPanel.getActiveTab().setTitle(logModule.name);
		
		tabPanel.getActiveTab().getController().setFormData(logModuleData[0]);
	},
});