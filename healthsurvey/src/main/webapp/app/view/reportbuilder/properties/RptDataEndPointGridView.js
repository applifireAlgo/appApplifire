Ext.define('Healthsurvey.view.reportbuilder.properties.RptDataEndPointGridView', {
	extend : 'Ext.grid.Panel',
	requires:['Healthsurvey.view.reportbuilder.properties.RptDataEndPointGridController'],
	controller: 'dataendpoint-GridController',
	xtype : 'dataendpoint-grid-view',
	panelId:'dataEndPointGrid',
	itemId:'dataEndPointGrid',
	border:true,
	bodyBorder:true,
	collapsible : true,
	collapseDirection : 'bottom',
	autoScroll : true,
	width : "100%",
	selType: 'cellmodel',
	listeners:{
		scope:'controller',
		afterrender:'afterDataEPGridRender',
		itemdblclick:'editItemdblclick'
	},
	tbar:[
	      {
	    	  xtype : 'button',
	    	  icon : 'images/icon-add.png',
	    	  tooltip:'Add Data Point Properties',
	    	  listeners:{
	    		  click:'onAddDataGridClick'
	    	  }    	  
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
					flex:0.2,
					items : [ {
						icon : 'images/delete.gif',
						tooltip : 'Delete Row',
						handler : "onDeleteRowClick"						
					} ]
				},
				{
					text:"Type",
					dataIndex:'type',
					flex:0.2
				},
				{
					text:"Field Name",
					dataIndex:"displayName",
					//dataIndex:"dfieldName",
					flex:0.3
				},
				{
					text:"Aggregate",
					dataIndex:"aggregate",	
					flex:0.3
				}
	]//columns ends	
});