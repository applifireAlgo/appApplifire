Ext.define('Healthsurvey.view.reportui.datachart.ChartPointController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.chartPointController',
	reportView : null,
	reportViewController : null,
	reportJSON : null,
	init : function() {

	},
	initObject : function() {
		this.reportView = this.getView().up().up();
		this.reportViewController = this.reportView.controller;
		this.reportJSON = this.reportView.reportJSON;
	},
	loadChartPoints : function(chartpoints) {
		debugger;
		this.getView().setHeight(this.getView().defualtHeight);
		this.initObject();
		var fusionchart;
		// var charts= this.chartDatas
		var width = Math.ceil(100
				/ chartpoints.length);
		var widthpixel=Math.ceil(1024
				/ chartpoints.length)
		for (var x = 0; x < chartpoints.length; x++) {
			chartpoints[x].chartJSON.height=this.getView().height;
			
			chartpoints[x].chartJSON.width=widthpixel;
			panel = this.getView().add({
				xtype : "panel",
				height : this.getView().height,
				margin : '5 5 0 0',
				width:width+"%",
				
				chartJSON : chartpoints[x].chartJSON,
				listeners : {
					afterrender : 'loadfusionchart1'
				}
			});
			
		}
		this.getView().doLayout();
		
	},
	loadfusionchart1 : function(panel) {
		debugger;
		var fusionchart = new FusionCharts(panel.chartJSON);
		fusionchart.render(panel.body.id);
		panel.doLayout();
	},
});