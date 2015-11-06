Ext.define('Healthsurvey.view.reportui.datachart.DataChartPController', {
	extend : 'Ext.app.ViewController',

	alias : 'controller.datachartpController',
	requires : [ 'Healthsurvey.view.reportui.ModifiedProxy' ],
	queryCriteria : null,
	reportView : null,
	reportViewController : null,
	reportQCList : null,
	datagrid : null,
	chartView : null,
	reportJSON : null,
	datapoint : null,
	mapView : null,
	init : function() {

		var view = this.getView();
		this.reportView = this.getView().up().up();
		this.reportViewController = this.reportView.controller;

		var tempArr = this.reportViewController.reportWidgets;
		for (var i = 0; i < tempArr.length; i++) {
			var reportWidget = this.reportWidgetFilter(tempArr[i]);
			view.add(reportWidget);
		}
	},
	initObjects : function() {
		this.queryCriteria = this.reportView.down("#querycriteria");
		this.datagrid = this.getView().down("#data-grid-view");
		this.chartView = this.getView().down("#chart-view");
		if (this.chartView != null)
			this.chartView.controller.reportView = this.reportView;
		this.datapoint = this.getView().down("#datapoint");
		this.mapView = this.getView().down("#mapPanel");
	},
	refreshData : function() {
		this.filterData(this.datagrid, this);

	},
	loadData : function(reportJSON) {
		this.reportJSON = reportJSON;
		this.initObjects();

		// load Query Criteria
		var queryCriteria = this.reportViewController.loadQueryCriteria();

		// load chart data
		this.reportViewController.loadDataPointChart(queryCriteria, this);

		// load Grid Data
		this.reportViewController.loadGridData(queryCriteria, this.datagrid,
				this);

		// load map data
		this.reportViewController.loadMap(queryCriteria, this);

		// set display Query Criteria
		this.setReportDetails();

	},
	filterData : function() {
		this.reportViewController.filterData(this.datagrid, this);
	},
	setReportDetails : function() {
		this.reportQCList = [];
	},
	reportWidgetFilter : function(rc) {
		switch (rc) {
		case "1": {
			return {
				xtype : 'panel',
				items : [ {
					xtype : 'mainDataPointPanel',
					bodyStyle : 'background:#D8D8D8',
					margin : '0 0 3 0',
					itemId : "mainDatapoint",
					layout : {
						type : 'anchor',
						align : 'center'
					},
					dpData : []
				}, {
					xtype : "chart-point"
				} ]
			};
		}
		case "2": {

			return {
				xtype : "chart-tabView",
				title : "Analytic",
				itemId : "chart-view",
				autoScroll : false,
				reportJSON : this.reportView.reportJSON,
				value : 1
			};
		}
		case "3": {
			return this.reportViewController.getDataGrid();
		}
		case "4": {
			return {
				xtype : 'mapPanel',
				bodyStyle : 'background:#D8D8D8',
				layout : {
					type : 'anchor',
					align : 'center'
				}
			};
			
		}
		default: {
			break;
		}
		}
	},

});