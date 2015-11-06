Ext.define('Healthsurvey.view.reportbuilder.properties.RptDrillDownGridView', {
	extend : 'Ext.grid.Panel',
	requires:['Healthsurvey.view.reportbuilder.properties.RptDrillDownGridController'],
	controller: 'drillDownGridController',
	xtype : 'drilldown-grid-view',
	panelId:'drillDownGrid',
	itemId:'drillDownGrid',
	border:true,
	bodyBorder:true,
	collapsible : true,
	collapseDirection : 'bottom',
	autoScroll : true,
	width : "100%",
	selType: 'cellmodel',
	listeners:{
		scope:'controller',
		afterrender:'afterDDGridRender',
		itemdblclick:'editItemdblclick'
	},
	tbar:[
	      {
	    	  xtype : 'button',
	    	  icon : 'images/icon-add.png',
	    	  tooltip:'Add DrillDown Properties',
	    	  listeners:{
	    		  click:'onAddDrillDownGClick'
	    	  }    	  
	      },'->',
			{
				xtype : "checkbox",
				checkId : "qcContext",
				inputValue : 1,
				boxLabel : "Query Criteria Context"
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
					text:"Field Name",
					dataIndex:"displayName",
					//dataIndex:"dfieldName",
					flex:0.333333333
				},
				{
					text:"Target Report",
					dataIndex:"targetReportDe",	
					flex:0.433333333
				}
	]//columns ends	
});