/**
 * 
 */
Ext.define('Healthsurvey.view.searchengine.search.DouMeanView', {
	extend : 'Ext.form.Label',
	xtype : 'DouMeanView',

	//margin : '1 1 1 1',
	bodyStyle : 'background:#D8D8D8',
	border : 1,
	requires : [ 'Healthsurvey.view.searchengine.search.DouMeanController' ],

	controller : 'DouMeanController',
	initComponent : function() {

		this.listeners = {
			scope : 'controller',
			afterrender : 'onAfterrender',
		/*render: function(c){
		      c.getEl().on('click', searchIt);
		    }*/
		},

		this.callParent();
	},
	onRender : function() {

		this.callParent(arguments);

		this.getEl().on('click', this.onClick, this);
	},

	onClick : function(e, t) {
		debugger;
		mainView = this.up().up().up().up().up().up();
		mainViewContoller = mainView.controller;
		searchTextbox = mainView.down("#searchs");
		searchTextbox.setValue(this.newSearchString);
		mainViewContoller.onSolrSearchClick();
	}
});