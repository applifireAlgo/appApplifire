Ext.define('Healthsurvey.view.googlemaps.map.MapPanel', {
	extend : 'Ext.panel.Panel',
	xtype : 'mapPanel',
	//height : window.innerHeight,
	requires : [ 'Healthsurvey.view.googlemaps.map.MapPanelController' ],
	controller : 'MapPanelController',
	title : 'Map',
	split : true,
	closable : false,
	//collapsible : true,

	bodyPadding : '1 0 0 0',
	//itemId : 'querycriteria',
	layout : {
		type : 'vbox',
		padding : 0,
		align : 'stretch'
	},
	height:500,
	
	mapData2 : [ {
		l1 : 19.75148,
		l2 : 75.713888,
		displayValue : "Maharashtra"
	}, {
		l1 : 33.778175,
		l2 : 76.576171,
		displayValue : "J & K"
	} ],
	/*bbar : [ {
		xtype : 'button',
		text : 'Search',
		itemId:"btnSearch",
		icon : 'resources/css/images/search.png',
		listeners:{
    		 click:'showMarker'
    	 }
	} ],*/
	
	listeners : {
		scope : 'controller',
		afterrender : 'loadGoogleMap'
	}
});