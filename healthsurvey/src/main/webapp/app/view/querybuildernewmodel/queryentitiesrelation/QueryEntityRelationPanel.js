Ext.define('Healthsurvey.view.querybuildernewmodel.queryentitiesrelation.QueryEntityRelationPanel', {
	extend : 'Ext.panel.Panel',
	requires:['Healthsurvey.view.querybuildernewmodel.queryentitiesrelation.QueryEntityRelationController'],
	controller:'query-entities-relation',
	xtype : 'query-entities-relation',
	layout : 'fit',
	//autoScroll:true,
	noOfCasecade:1,
	connections : [],
	items : [{
		xtype : 'draw',
		//autoScroll:true,
		bodyStyle : 'background-image:url("resources/square.gif");',
		
	} ],
	listeners:{
		scope:'controller',
		render : 'initEntRelationPanel'
	}
});