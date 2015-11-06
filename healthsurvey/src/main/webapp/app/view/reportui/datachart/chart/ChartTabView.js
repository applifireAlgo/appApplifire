Ext.define('Healthsurvey.view.reportui.datachart.chart.ChartTabView', {
	extend : 'Ext.panel.Panel',
	requires:['Healthsurvey.view.reportui.datachart.chart.RatingField','Healthsurvey.view.reportui.datachart.chart.ChartController'],
	xtype : 'chart-tabView',
	controller : 'chartController',
	bodyStyle : 'background:#D8D8D8',
	autoScroll : true,
	border : 0,
	margin : '0 0 5 0',
	layout : {
		type : 'table',
		columns : 4
	},
	initComponent : function() {
		debugger;
		var showdaterange=1;
		var tools=[];
		/*var qcxtypes=Ext.Array.pluck(this.reportJSON.queryCWidgetU,"xtype")
		if(qcxtypes.indexOf("daterange")>-1){
			tools=[{xtype:"button",text:"This Week",daterangevalue:"thisweek",margin:"0 3 0 0"},{xtype:"button",text:"This Month",daterangevalue:"thismonth",margin:"0 3 0 0"},{xtype:"button",text:"Last 3 Months",daterangevalue:"last3month",margin:"0 3 0 0"},{xtype:"button",text:"Last 6 Months",daterangevalue:"last6month",margin:"0 3 0 0"},{xtype:"button",text:"This Year",daterangevalue:"thisyear",margin:"0 3 0 0"},];
		}*/
		tools.push({
			xtype : 'ratingField',
			itemId:'chartcolumnlayout',
			hidden:false,
			RatingFieldTypeid : 'rating',
			numberOfStars : 6,
			tooltip : 'Choose columns',
			defaultHeightToReduce : 1,
			defaultWidthToReduce : 60,
			minLength : 1,
			value : 1,
			allowBlank : false,
			listeners : {
				change : 'resizeCharts',
				beforerender:'initObject'
			}
		});
		this.tools=tools;
		this.callParent(arguments);
	},
	listeners : {
		scope : 'controller',
		afterrender : 'afterRender',
		resize:'onPanelResize'
	}
});
