Ext.define('Healthsurvey.view.searchengine.search.SearchEngineMainPanel', {
	extend : 'Ext.panel.Panel',
	alias : [ 'layout.accordion' ],
	xtype : 'solrsearchmainpanel',
	

	requires : ['Healthsurvey.view.searchengine.search.NorthPanel', 'Healthsurvey.view.searchengine.search.SearchResult','Healthsurvey.view.searchengine.search.SearchEngineMainPanelController'],
	controller : 'solrsearchcontroller',
	
	layout : {
		type : 'vbox',
		align : 'stretch',
	},

	listeners : {
		scope: 'controller',
		resize : function(control, width, height, oldWidth, oldHeight, eOpts) {

			table = control.down("#table");
			table.setHeight(window.innerHeight - 160);

			documents = control.down("#document");
			//documents.setHeight(window.innerHeight - 160);
		},
		scope:'controller',
		afterrender:'afterRender'
		},

	items : [ {

		items : [ {
			layout : {
				type : 'fit',
			},
			xtype : 'northcontainer',
			height : '10%',
			itemId : 'northPanel',
		}, {
			xtype : 'searchResultTab',
			height : '90%',
		} ]
	} ]
});
