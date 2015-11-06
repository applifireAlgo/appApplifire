Ext.define('Healthsurvey.view.reportbuilder.sql.SqlListPanelController',{
	extend : 'Ext.app.ViewController',
	alias : 'controller.sqlcontroller',
	requires : [],

	onSqlTreeLoad : function(currentObject, records,successful, operation, node, eOpts) 
	{
		debugger;
		var me = this;
		var tempView = this.getView();
		Ext.Ajax.request({
			url : "secure/reportBuilderController/getQueryTree",
			method : 'POST',
			currentView : tempView,
			jsonData : {},
			success : function(response, currentObject,options)
			{
				debugger;
				var responseJson = Ext.JSON.decode(response.responseText);
				if (responseJson.response.success == 'true') 
				{
					var data = Ext.JSON.decode(responseJson.response.data);
					var sqlPanel = currentObject.currentView;
					sqlPanel.setRootNode(data);
				} else
				{
					Ext.Msg.alert('Error',"Report Queries List Rendering Failed");
				}
			},
			failure : function()
			{
				Ext.Msg.alert('Error','Cannot connect to server');
			}
		});
	},

	onItemClick : function(currentObject, record, successful,operation, node, eOpts) 
	{
		debugger;
		var me = this;
		var tempView = this.getView();
		Ext.Ajax.request({
			url : "secure/reportBuilderController/getQueryJsonById",
			method : 'POST',
			currentView : tempView,
			jsonData : {
					id : record.data.id
			},
			success : function(response, currentObject,options)
			{
				debugger;
				var responseJson = Ext.JSON.decode(response.responseText);
				if (responseJson.response.success == 'true')
				{
					var data = Ext.JSON.decode(responseJson.response.data);
					var reportConfigView = currentObject.currentView.up();

					var gridConfig = reportConfigView.down('#gridConfig');
					var gridConfigStore = gridConfig.getStore();

					gridConfigStore.clearData();
					gridConfigStore.loadData(Ext.decode(data[0].queryJSON).fields,true);

					gridConfig["headerGroup"] = undefined;

					// to see the store with field and value --->gridConfigStore.data.items[0].data
					// To add some data dynamically after loading store with DB's JSON
					for (var i = 0; i < gridConfigStore.data.items.length; i++) 
					{
						var record = gridConfigStore.getAt(i);
						record.set("fieldVisible",true);
						record.set("fieldWidth", 100);
						if (record.data.dataType.toUpperCase() == "VARCHAR")
						{
							record.set("alignment","Left Align");
						} else 
						{
							record.set("alignment","Right Align");
						}
					}
					debugger;
					var activeTab=reportConfigView.up();
					activeTab.queryId=data[0].queryId;
					activeTab.queryJson=data[0].queryJSON;
					activeTab.jpqlQuery=data[0].jpqlQuery;
					
					var qCriteriaGrid = reportConfigView.down('#queryCriteriaGrid');
					var qCriteriaStore = qCriteriaGrid.getStore();
					qCriteriaStore.clearData();
					var qcCriteriaObj = currentObject.currentView.controller.prepareQCData(Ext.decode(data[0].queryJSON).where);

					qCriteriaStore.loadData(qcCriteriaObj, true);

					// To add some data dynamically after loading store with DB's JSON
					for (var i = 0; i < qCriteriaStore.data.items.length; i++)
					{
						var record = qCriteriaStore.getAt(i);
						var cnt = qCriteriaGrid.cntRow;
						qCriteriaGrid.cntRow = cnt + 1;
						record.set("id", cnt);
						record.set("widget","textfield");
					}
				} else
				{
					Ext.Msg.alert('Error',"Report Queries Data Rendering Failed");
				}
			},
			failure : function()
			{
				Ext.Msg.alert('Error','Cannot connect to server');
			}
		});
	},//onItemClick ends
	
	prepareQCData : function(whereData)
	{
		debugger;
		var allNodes = new Array();
		whereData.forEach(function(Mynode) {
					allNodes = allNodes.concat(this.getDeepAllChildNodes(Mynode));
					}, this);
		return allNodes;
	},

	getDeepAllChildNodes : function(node)
	{
						var allNodes = new Array();
						/*
						 * if (!Ext.value(node, false)) { return []; }
						 */
						if (node.hasOwnProperty("left")
								&& node.left.valueType == 2) {
							allNodes.push(this.getQcObject(node.left));
						}
						if (node.hasOwnProperty("right")
								&& node.right.valueType == 2) {
							allNodes.push(this.getQcObject(node.right));
						}
						if (node.hasOwnProperty("group")) {
							node.group.forEach(function(Mynode) {
								allNodes = allNodes.concat(this
										.getDeepAllChildNodes(Mynode));
							}, this);

						}
						if (node.hasOwnProperty("left") &&  node.left.hasOwnProperty("group")) {
							node.left.group.forEach(function(Mynode) {
								allNodes = allNodes.concat(this
										.getDeepAllChildNodes(Mynode));
							}, this);

						}
						if (node.hasOwnProperty("right") &&  node.right.hasOwnProperty("group")) {
							node.right.group.forEach(function(Mynode) {
								allNodes = allNodes.concat(this
										.getDeepAllChildNodes(Mynode));
							}, this);

						}
						return allNodes;
	},
	getQcObject : function(obj)
	{
		return {
					displayName : obj.displayName,
					name : obj.name,
					datatype : obj.dataType
				}
	}

});