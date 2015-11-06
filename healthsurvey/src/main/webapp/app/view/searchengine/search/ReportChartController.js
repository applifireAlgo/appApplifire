Ext.define('Healthsurvey.view.searchengine.search.ReportChartController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.reportChartController',

	onAfterrender : function() {
		debugger;
		currentView = this.getView()
		chartjson = currentView.chartJson;
		this.view.setHeight((this.view.chartJson.height * 1)+70);
		resultPanel = this.view.up().up();
		var Value = this.view.up().header.items.items[1].value;
		newColumns = parseInt(Value);
		totalWidth = (this.view.up().getWidth());
	/*	totalWidth = (mainPanel.getWidth())
		- (defaultWidthToReduce + (newColumns * 5));*/
		this.view.chartJson.width = (totalWidth - (10 + (newColumns * 5)))
		/ newColumns;
		if (chartjson.hasOwnProperty("group") && chartjson.group == true) {
			this.loadGroupCharts(chartjson.groupCharts, chartjson,
					this.view.chartJson.width);
		} else {
			var fusionchart = new FusionCharts(this.view.chartJson);
			fusionchart.render(this.view.body.id);
		}
	},
	loadGroupCharts : function(groupcharts, chart,totalCalculateWidth) {
		var charts = [],
		height=500;
		for (var x = 0; x < groupcharts.length; x++) {
			height=	groupcharts[x].height*1+100;
			charts.push({
				xtype : "panel",
				height : height,
				scope : this,
				margin : '0 5 0 0',
				chartwidth : (totalCalculateWidth / groupcharts.length)-7,
				chartJSON : groupcharts[x],
				listeners : {
					afterrender : function(panel) {
						panel.chartJSON.width = panel.chartwidth;
						var fusionchart = new FusionCharts(panel.chartJSON);
						fusionchart.render(panel.body.id);
					}
				}
			});
		}
		this.getView().add({
			xtype : "panel",
			margin : '0 5 0 0',
			title : chart.chartTitle,
			bodyStyle : 'background:#D8D8D8',
			group : true,
			scope : this,
			width : "100%",
			height:height,
			layout : {
				type : 'table',
				columns : charts.length
			},
			items : charts
		});
		// this.resizeCharts(this.getView().down("#chartcolumnlayout"));
	}
});