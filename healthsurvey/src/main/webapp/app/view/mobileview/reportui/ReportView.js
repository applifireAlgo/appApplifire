Ext.define('Healthsurvey.view.mobileview.reportui.ReportView', {
	extend : 'Ext.panel.Panel',
	requires : [ 'Healthsurvey.view.mobileview.reportui.querycriteria.QueryCriteriaView',
			'Healthsurvey.view.mobileview.reportui.datachart.DataChartViewTab',
			'Healthsurvey.view.mobileview.reportui.datachart.DataChartViewPanel',
			'Healthsurvey.view.mobileview.reportui.ReportViewController' ,
			'Healthsurvey.view.mobileview.fw.DataPointPanel',
			'Healthsurvey.view.mobileview.googlemaps.map.MapPanel'
			],
	xtype : 'reportview',
	controller : 'reportviewController',
	layout : 'border',
	reportWidgets :["1","2","3","4"],
	//autoScroll : true,
	//margin : '3 0 5 0',

	listeners : {
		scope : 'controller',
		afterrender : 'renderReport'
	}
});
