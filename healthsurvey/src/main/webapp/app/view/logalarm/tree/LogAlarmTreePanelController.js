/**
 * 
 */
Ext.define('Healthsurvey.view.logalarm.tree.LogAlarmTreePanelController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.logAlarmTreePanelController',
	
	logModuleData : null,
	logModuleTree : null,
	
	init : function(){
		this.logModuleTree = this.view.down('#logModuleTree');
	},
	
	clearTreePanel : function()
	{
		debugger;
		this.logModuleTree.store.sync();
		this.setTreeStore();
	},
	
	setTreeStore : function(){
		 var node = this.logModuleTree.getRootNode();
		 node.removeAll();
		 this.logModuleTree.getSelectionModel().deselectAll();
	},
		
	setFormData : function(logModuleData){
		debugger;
		this.clearTreePanel();
		this.logModuleData = logModuleData;
		for(var i = 0; i < logModuleData.length; i++)
		{
			var id = logModuleData[i].id;
			var logModule = logModuleData[i].name;
			this.logModuleTree.getRootNode().appendChild({ "id": id, "name": logModule, "text" :logModule,  "leaf": true });
		}
		if (this.logModuleTree.getRootNode().hasChildNodes()) {
			this.logModuleTree.getSelectionModel().select(this.logModuleTree.getRootNode().child(0));
			} else {
				console.log('no childs');
			}
	},
	
	onItemClick : function(view, record, item, index, e)
	{
		debugger;
		var tabPanel = this.view.up().down('#logAlarmMainViewTabPanel');
		
		if(index>0){
			var logModule = this.logModuleData[index-1];
			tabPanel.getActiveTab().setTitle(logModule.name);
			tabPanel.getActiveTab().getController().setFormData(logModule);	
			this.view.up().getController().setButtonText("Update Module");
		}
	},
	
	onRightClick : function(view, r, node, index, e) {
		var currentObject = this;
		e.stopEvent();
		Ext.create('Ext.menu.Menu', {
			items : [
			Ext.create('Ext.Action', {
				iconCls : 'star',
				itemId : 'addAlarmModule',
				text : 'Add Module',
				handler : function(){
					currentObject.onAddModuleClick();
				}
			}),
			]
		}).showAt(e.getXY());
		return false;
	},
	
	onAddModuleClick : function()
	{
		 debugger;
		 this.view.up().getController().onClearButton();
	}
	
});