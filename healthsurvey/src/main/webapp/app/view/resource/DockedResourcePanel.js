Ext.define('Healthsurvey.view.resource.DockedResourcePanel', {
	extend : 'Ext.panel.Panel', //Ext.toolbar.Toolbar',
	xtype : 'dockedResourcePanel',
	itemId : 'dockedResourcePanel',

	requires : ['Healthsurvey.view.resource.DockedResourcePanelController'],
	controller : 'dockedResourcePanelController',

	bodyStyle : {
		backgroundColor: "#2f4050"
	},

	bodyPadding : '20 0 0 0',	
	width : '3%',
	
	defaults : {
		width : '100%',
		arrowVisible : false,
		height : '7%'
	}
	
});
