Ext.define('Healthsurvey.view.fw.DataPointPanelController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.dataPointPanelController',
	
	init: function(){
		debugger;
		this.dataPointPanel = this.view.down("#dataPointPanelId");
		this.dataPointPanel.setData(this.view.dpData);
	}
});