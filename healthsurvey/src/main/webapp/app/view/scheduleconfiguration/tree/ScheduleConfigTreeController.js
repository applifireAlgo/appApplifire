/**
 * 
 */
Ext.define("Healthsurvey.view.scheduleconfiguration.tree.ScheduleConfigTreeController", {
	extend : 'Ext.app.ViewController',
	alias : 'controller.schedulerConfigTreeController',

	treePanel : null,
	init : function() {
		this.treePanel = this.getView().down('#schedulerConfigTree');
		this.loadTreeData();
	},

	loadTreeData : function() {
		var currentObject = this;
		Ext.Ajax.request({
			timeout : 6000000,
			url : 'secure/ScheduleConfig/getTreeStore',
			jsonData : {},
			method : "GET",
			success : function(response, opts) {
				debugger;
				var responseJson = Ext.JSON.decode(response.responseText);
				if (responseJson.response.success == true) {
					var data = Ext.JSON.decode(responseJson.response.data);
					currentObject.setTreeStore(data);
				} else {
					Ext.Msg.alert("Error...", responseJson.response.message);
				}
			},
			failure : function(response, opts) {
				var responseJson = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert("Error...", responseJson.response.message);
			},
		}, this);
	},

	setTreeStore : function(data) {
		debugger;
		var rootNode = this.treePanel.getRootNode();
		Ext.Array.each(data, function(child) {
			rootNode.appendChild(child);
		});
	},

	reloadTree : function() {
		this.treePanel.store.sync();
		this.treePanel.getRootNode().removeAll();
		this.treePanel.getSelectionModel().deselectAll();
		this.loadTreeData();
	},

	onItemClick : function(view, record, item, index, e) {
		if (index > 0) {
			var isPresent = false;
			var tabPanel = this.view.up().down('#schedulerConfigTab');
			for (var i = 0; i < tabPanel.items.length; i++) {
				var tab = tabPanel.items.get(i);
				if (tab.scheduleId == record.data.id) {
					tabPanel.setActiveTab(tab);
					isPresent = true;
					break;
				}
			}
			if (!isPresent) {
				var component = Ext.create("Healthsurvey.view.scheduleconfiguration.panel.ScheduleConfig", {
					title : record.data.name,
					scheduleId : record.data.id,
					closable : true,
					icon : 'images/edit.png',
				});
				component.getController().loadFormData(record.data.id);
				tabPanel.getController().onAddTabClick(component);
			}
		}
	}
});