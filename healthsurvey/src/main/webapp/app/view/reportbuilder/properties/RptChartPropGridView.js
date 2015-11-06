Ext.define('Healthsurvey.view.reportbuilder.properties.RptChartPropGridView', {
	extend : 'Ext.grid.Panel',
	requires:['Healthsurvey.view.reportbuilder.properties.RptChartPropGridController'],
	controller: 'chartPropCtrll',
	xtype : 'chartPropGridView',
	panelId:'chartPropGridView',
	itemId:'chartPropGridView',
	border:true,
	bodyBorder:true,
	collapsible : true,
	collapseDirection : 'bottom',
	autoScroll : true,
	width : "100%",
	selType: 'cellmodel',
	listeners:{
		scope:'controller',
		afterrender:'afterChartPropGridRender',
		itemdblclick:'editItemdblclick'
	},
	tbar:[
	      {
	    	  xtype : 'button',
	    	  icon : 'images/icon-add.png',
	    	  tooltip:'Add Charts',
	    	  listeners:{
	    		  click:'onAddChartClick'
	    	  }    	  
	      },
			{
				xtype : "textfield",
				width:150,
				margin : '0 0 0 80',
				itemId:"chartColumns",
			//	value:1,
				fieldLabel:'No of Column',
			}
	],
	viewConfig : {
		plugins : {
			ptype : 'gridviewdragdrop'
		}
	},
	cntRow:1,
	columns : [
				{
					xtype : 'actioncolumn',
					menuDisabled : true,
					text : 'Action',
					align: 'center',
					flex:0.233333333,
					items : [ {
						icon : 'images/delete.gif',
						tooltip : 'Delete Row',
						handler : "onDeleteRowClick"						
					} ]
				},
				{
					text:"Chart Title",
					dataIndex:"chartTitle",
					flex:0.333333333
				},
				{
					text:"Chart Type",
					dataIndex:"chartType",	
					flex:0.433333333
				}
	]//columns ends	
});