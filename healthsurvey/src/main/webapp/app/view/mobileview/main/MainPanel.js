Ext.define('Healthsurvey.view.mobileview.main.MainPanel', {
	extend : 'Ext.panel.Panel',
	xtype : 'mainPanel',

	requires : [ 'Healthsurvey.view.mobileview.resource.ResourcePanel',
			'Healthsurvey.view.mobileview.main.TopPanel.TopPanel',
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
		split : false,
		width : '90%',
		height:'100%',
		xtype : 'resourcePanel',
		collapsible:false,//mbadd
		hidden:true,//mbadd
		title:"",
		autoScroll:false,
		//mbremove
		/*listeners : {
			afterrender : function(panel) {
				debugger;
				alert();
				panel.setHidden(true);
			}
		},*/
	}, {
		region : 'center',
		xtype : 'panel',
		layout:'fit', //mbadd
		itemId : 'appMainTabPanel',
		maskOnDisable :true,
		id : 'appMainTabPanel',
	}
	//mbremove
	/*, {
		region : 'east',
		title : 'Help',
		split : false,
		hidden:true,
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
	}*/ ]
});
