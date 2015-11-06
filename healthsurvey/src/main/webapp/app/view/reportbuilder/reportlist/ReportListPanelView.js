Ext.define('Healthsurvey.view.reportbuilder.reportlist.ReportListPanelView', {
	extend : 'Ext.panel.Panel',
	requires:['Healthsurvey.view.reportbuilder.reportlist.ReportListPanelController'],
	xtype:'reports-left-panel',
	itemId:'reportsLeftPanel',
	controller:'reportleftcontroller',
	title:'Reports',
	split:true,
	closable:false,
	collapsible:true,
	width:'15%',
	bodyPadding:'10 5 0 5',
	listeners:{
		scope:'controller',
		afterrender:'afterRender'
	},
	layout:
	{
		type: 'anchor'
	},
	items:[
	       {
	    	   xtype:'button',
	    	   text:'New',
	    	   //margin:'5 20 5 70', //center
	    	   icon:'images/icon-add.png',
	    	   listeners:{
				   click:'onNewReportClick'
	    	   }   	   
	       },
	       {
    	       xtype:'fieldset',
    	       cls:'entity-fieldset',
			   title: 'Reports',
			   items:[{
				   		xtype:'treepanel',
				   		itemId:'report-builder-tree',
				   		rootVisible : false,
				   		//useArrows: true,
				   		lines:true,
				   		listeners: {
				   				load:'onReportTreeLoad',
				   				itemdblclick:'onReportListDblClick'
				   		}
			   }]		   	   
	       }
	]
});