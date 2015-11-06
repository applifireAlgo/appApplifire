Ext.define('Healthsurvey.view.searchengine.search.NorthPanelController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.NorthPanelController',

	onAfterRender : function() {
		debugger;
		//	alert("onAfterRender");
		this.mainController = this.view.up().up().getController();

	},

	onEnterKey : function(me, e) {
		if (e.getKey() === e.ENTER) {

			this.mainController.onSolrSearchClick();
		}
	},

	onVoiceSearch : function(me) {

		this.mainController.onVoiceSearch(me);
	},
	onPanelCollapse : function(me) {
	},
	onDoSearch:function(me)
	{
		this.mainController.onSolrSearchClick();
	}
});
