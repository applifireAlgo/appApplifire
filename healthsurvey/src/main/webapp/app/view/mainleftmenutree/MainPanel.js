Ext.define('Healthsurvey.view.mainleftmenutree.MainPanel', {
	extend : 'Ext.panel.Panel',
	xtype : 'mainPanelWithLeftMenu',

	requires : [ 'Healthsurvey.view.resource.ResourcePanel',
			'Healthsurvey.view.mainleftmenutree.TopPanel.TopPanel',
			'Ext.layout.container.Accordion', 'Ext.Img', 'Ext.button.Split',
			'Healthsurvey.view.resource.DockedResourcePanel','Healthsurvey.view.fw.mainViewPanel.MainPanelController' ],

	controller:'mainViewPanelController',
	layout : 'border',
	anchor : '100% 100%',

	items : [ /*{
		region : 'north',
		xtype : 'panel',
		items : [ {
			xtype : 'menuTopPanel'
		} ]
	},*/ {
		region : 'west',
		width : '16%', 
		itemId : 'westPanel',
		xtype : 'resourcePanel',
		placeholder : {
			xtype : 'dockedResourcePanel'
		},		
		placeholderCollapseHideMode : Ext.Element.DISPLAY, 
		collapsible : true,
		hideCollapseTool : true,
		titleCollapse : true,
	}, {
		
		region : 'center',
		xtype : 'tabpanel',
		itemId : 'appMainTabPanel',
		id : 'appMainTabPanel',
		listeners:{
			afterrender:'aftrAppMainTabPanelRender'
		},
		dockedItems : [{
			xtype : 'menuTopPanel'
		}]
		
	}/*, {
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
	} */],
	listeners:{
		scope:'controller',
		afterrender:'afterRender'
	}
});
