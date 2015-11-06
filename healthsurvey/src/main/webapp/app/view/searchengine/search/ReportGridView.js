/**
 * 
 */
Ext.define('Healthsurvey.view.searchengine.search.ReportGridView', {
	extend : 'Ext.grid.Panel',
	xtype : 'reportGridView',
	height : 400,
	margin:'5 5 0 0',
	requires : [ 'Healthsurvey.view.searchengine.search.ReportGridController' ],
	border : 1,
	controller : 'reportGridController',
	initComponent : function() {

		/*
		 * this.listeners = { afterrender : 'onAfterrender'function( me, record,
		 * index, eOpts ) { alert("Selected"); } },
		 */
		this.listeners = {
			scope : 'controller',
			afterrender : 'onAfterrender',
			
			/*
											 * function( me, record, index,
											 * eOpts ) { alert("Selected"); }
											 */
		},

		this.callParent();
	}
});