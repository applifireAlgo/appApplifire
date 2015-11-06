/**
 * 
 */

Ext.define('Healthsurvey.view.searchengine.search.ReportGridController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.reportGridController',
	onAfterrender : function() {
		
		view = this.view;
		var gridStore = Ext.create('Ext.data.Store', {
			async : false,
			autoLoad : true,
			pageSize : 10,
			fields : [],
			data : view.lData

		});
		debugger;
		view.reconfigure(gridStore);
		var defaultWidthToReduce = 60;
		var defaultHeightToReduce = 70;
		var Value = view.up().header.items.items[1].value;
		mainPanel =view.up();
		mainPanel.getLayout().columns = parseInt(Value);
		newColumns = parseInt(Value);
		totalWidth = (mainPanel.getWidth());
		for (var i = 0; i < mainPanel.items.length; i++) {
			var currentPanel = mainPanel.items.items[i];
			currentPanel
					.setWidth((totalWidth -15)/ newColumns);
		}
	}

});