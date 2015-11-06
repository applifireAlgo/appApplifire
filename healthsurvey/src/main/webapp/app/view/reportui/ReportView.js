Ext.define('Healthsurvey.view.reportui.ReportView', {
	extend : 'Ext.panel.Panel',
	requires : [ 'Healthsurvey.view.reportui.querycriteria.QueryCriteriaView',
			'Healthsurvey.view.reportui.datachart.DataChartViewTab',
			'Healthsurvey.view.reportui.datachart.DataChartViewPanel',
			'Healthsurvey.view.reportui.ReportViewController' ,
			'Healthsurvey.view.fw.MainDataPointPanel',
			'Healthsurvey.view.googlemaps.map.MapPanel'
			],
	xtype : 'reportview',
	controller : 'reportviewController',
	layout : 'border',
	reportWidgets :["1","2","3","4"],
	//autoScroll : true,
	//margin : '3 0 5 0',
	height:500,
	width:1000,
	listeners : {
		scope : 'controller',
		afterrender : 'renderReport'
	}
});
