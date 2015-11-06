Ext.define('Healthsurvey.view.chartbuilder.chartpanel.ChartPanelView', {
	extend : 'Ext.form.Panel',
	requires:['Healthsurvey.view.chartbuilder.chartpanel.ChartPanelController'],
	controller:'chartpanelcontroller',
	alias: 'widget.chart-panel',
	xtype : 'chart-panel',
	itemId:'chart-panel-id',
	bodyStyle:'background-image:url("resources/square.gif");',
	layout: {
		type: 'vbox',
		align: 'center',
		pack: 'center'
		},
	items:[{
			xtype:'panel',
			itemId:'chartPanel',
			border:true,
			title:'Chart Preview',
			jsonObject:'',
			layout:{
				type:'fit',
				align:'center',
				//pack:'center'
			},
			autoScroll:true,
			width:'70%',
			items:[],
			html:'Charts will render here  ...'			
	}]//item close	
}); //define close 