Ext.define('Healthsurvey.view.main.MainPanel', {
	extend : 'Ext.panel.Panel',
	xtype : 'mainPanel',

	requires : [ 'Healthsurvey.view.resource.ResourcePanel',
			'Healthsurvey.view.main.TopPanel.TopPanel',
			'Ext.layout.container.Accordion', 'Ext.Img', 'Ext.button.Split' ],

	layout : 'border',
	anchor : '100% 100%',

	items : [ {
		region : 'north',
		xtype : 'panel',
		items : [ {
			xtype : 'customHeader'
		},
		]
	}, {
		region : 'west',
		itemId : 'westPanel',
		collapsible : true,
		split : true,
		width : '18%',
		title : 'Resources',
		xtype : 'resourcePanel',
		listeners : {
			afterrender : function(panel) {
				panel.hide();
			}
		},
	}, {
		region : 'center',
		xtype : 'tabpanel',
		itemId : 'appMainTabPanel',
		id : 'appMainTabPanel',
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
	} ]
});
