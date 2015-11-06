Ext.define('Healthsurvey.view.maintopmenu.MainPanel', {
	extend : 'Ext.panel.Panel',
	xtype : 'mainPanelWithTopMenu',

	requires : ['Healthsurvey.view.maintopmenu.TopPanel',
				'Ext.layout.container.Accordion', 
				'Ext.Img',
				'Ext.button.Split',
				'Healthsurvey.view.fw.mainViewPanel.MainPanelController' ],

	controller:'mainViewPanelController',
	layout : 'border',
	anchor : '100% 100%',

	tbar : {
		xtype : 'topToolbar',
		itemId : 'topToolbar'
	},
	
	items : [{
		region : 'center',
		xtype : 'tabpanel',
		itemId : 'appMainTabPanel',
		id : 'appMainTabPanel',
		listeners:{
			afterrender:'aftrAppMainTabPanelRender'
		}
	}, {
		region : 'east',
		title : 'Help',
		split : true,
		collapsible : true,
		width : '20%',
		collapsed : true,
		plugins : 'responsive',
		responsiveConfig : {
			tall : {
				region : 'south',
			},
			wide : {
				region : 'east',
			}
		},
		items : [ {

			html : 'The page is under construction.....'

		} ]
	} ],
	listeners:{
		scope:'controller',
		afterrender:'afterRender'
	}
});
