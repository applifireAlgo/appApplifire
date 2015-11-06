Ext.define('Healthsurvey.view.reportbuilder.properties.ActionButtonView', {
	extend : 'Ext.grid.Panel',
	requires:['Healthsurvey.view.reportbuilder.properties.ActionButtonController'],
	controller: 'actionbuttoncontroller',
	xtype : 'action-button-view',
	itemId:'actionbutton',
	border:true,
	bodyBorder:true,
	collapsible : true,
	collapseDirection : 'bottom',
	autoScroll : true,
	width : "100%",
	selType: 'cellmodel',
	listeners:{
		scope:'controller',
		afterrender:'afterActionButtonRender',
		itemdblclick:'editActionclick'
	},
	tbar:[
	      {
	    	  xtype : 'button',
	    	  icon : 'images/icon-add.png',
	    	  tooltip:'Add Data Point Properties',
	    	  listeners:{
	    		  click:'onAddActionButton'
	    	  }    	  
	      }
	],
	viewConfig : {
		plugins : {
			ptype : 'gridviewdragdrop'
		}
	},
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
						handler : "onDeleteActionClick"						
					} ]
				},
				{
					text:"Name",
					dataIndex:'name',
					flex:0.2
				},
				{
					text:"Service",
					dataIndex:"servicename",
					//dataIndex:"dfieldName",
					flex:0.3
				}
				
	]//columns ends	
});