Ext.define('Healthsurvey.view.reportbuilder.gridconfig.GridConfigController',{
    extend: 'Ext.app.ViewController',
    requires:['Ext.data.TreeStore'],
    alias: 'controller.gridConfigController',
    rptBuilderTab:null,
    
    afterRender:function(grid)
    {
    	debugger;
    	this.rptBuilderTab=grid.up().up().up();
    	
    	grid.reconfigure(this.getGridStore());
    	
    	if(this.rptBuilderTab.isEdit!=null && this.rptBuilderTab.isEdit==true)
    	{
    		grid.getStore().loadData(this.rptBuilderTab.editJSON.grid_conf_json.gridConfig)
    		grid["headerGroup"]=JSON.stringify(this.rptBuilderTab.editJSON.grid_conf_json.headerGroup); //set header group		
    		if (this.rptBuilderTab.isSummaryGrid == 1) {
				grid.up().down("#summaryGrid").setValue(true);
			}
    		
    	}
    },
    getGridStore:function()
    {
    	return Ext.create('Ext.data.Store', {
			autoLoad : true,
			fields : [ {
				name : "fieldVisible",
				type : "boolean"
			}, {
				name : "name",
				type : "string"
			}, {
				name : "displayName",
				type : "string"
			} , {
				name : "dataType",
				type : "string"
			} , {
				name : "isSortable",
				type : "string"
			} , {
				name : "fieldWidth",
				type : "int"
			} , {
				name : "alignment",
				type : "string"
			}, {
				name : "lock",
				type : "boolean"
			}, {
				name : "summaryGroup",
				type : "boolean"
			},{
				name : "summaryAgg",
				type : "string"
			},{
				name : "summaryCaption",
				type : "string"
			}  ],
			data : []

		});
		;
    },
    
    onHeaderGroupClick:function(btn)
    {
    	debugger;
    	var gridConf=btn.up().up();
    	this.initHeaderObjects(gridConf);
    	this.loadHeaderGData(gridConf);
    	this.headerMainWindow.show(); 
    },
    initHeaderObjects : function(gridConf)
    {
    	debugger;
    	this.headerMainWindow=this.getHeaderGroupMainWindow(gridConf);
    	//this.headerGHStore = this.getHeaderGHStore();
		this.headerGCStore = this.getHeaderGCStore();
		this.copyHeaderGCStore = this.getCopyHeaderGCStore();
		this.selectednode = null;
		this.headerGHGrid = this.headerMainWindow.query("[gridType=headerColumnList]")[0];
		this.headerGCGrid = this.headerMainWindow.query("[gridType=columnsList]")[0];
		//this.isHeaderGroupClear = false;
	},
	loadHeaderGData : function(gridConf)
	{
		debugger;
		var colsGrid = this.headerMainWindow.query("[gridType=columnsList]")[0];
    	colsGrid.reconfigure(this.headerGCStore);
		var gridStore = gridConf.getStore();
		this.headerGCStore.loadData(gridStore.data.items,true);
		this.doCopyHeaderGCStore(this.headerGCStore);
		this.headerGCStore.filter("fieldVisible", true);
		if (gridConf.headerGroup != undefined) {
			this.loadSaveTreeData(this.headerGHGrid, Ext.decode(gridConf.headerGroup))
		}
	},
	loadSaveTreeData : function(tree, saveHeaderValue)
	{
		var selectednode = tree.getRootNode();
		if (saveHeaderValue != undefined && saveHeaderValue.length > 0)
			this.loadTreeSaveData(saveHeaderValue,selectednode);
	},
	loadTreeSaveData : function(treeData, selectednode)
	{
		for (var x = 0; x < treeData.length; x++)
		{
			if (treeData[x]["fieldCol"] != undefined&& treeData[x]["fieldCol"] == true)
			{
				var row = this.headerGCGrid.getStore().find("displayName", treeData[x]["text"]);
				if (row != -1) {
					this.addChidldNode(treeData[x]["text"],treeData[x]["name"],selectednode);
					this.headerGCGrid.getStore().removeAt(row);
				}
			} else if (treeData[x]["fieldCol"] != undefined && treeData[x]["fieldCol"] == false)
			{
				var pnode = this.addParentNode(treeData[x]["text"], selectednode);
				if (treeData[x]["columns"] != undefined && treeData[x]["columns"].length > 0) {
					this.loadTreeSaveData(treeData[x]["columns"], pnode);
				}
			}

		}
	},
    getHeaderGroupMainWindow:function(gridConf)
    {
		return Ext.create('Ext.window.Window', {
			title : ' Grid Header Configuration',
			height :'70%',
			width :'40%',
			closeAction :'close',
			gridConf:gridConf,
			modal : true,
			resizable : false,
			layout : 'vbox',
			bodyPadding :'5',
			controller:this,
			items : [{
				xtype : 'panel',
				width :'100%',
				bodyPadding:'5',
				layout : {
					type : 'hbox',
					align : 'right',
					pack : 'end'
				},
				items:[{
					xtype : 'textfield',
					txtType : "headerName",
					fieldLabel : 'Enter Node',
					labelAlign : 'right',
					margin : '0 2 0 0'
				}, {
					xtype : 'button',
					icon:'images/icon-add.png',
					tooltip:'Add node',
					margin : '0 2 0 0',
					listeners:{
						click:'addHeader',
					}
				}, {
					xtype : 'button',		
					icon:'images/minusIcon.png',
					tooltip:'Remove node',
					margin : '0 2 0 0',
					listeners:{
						click:'removeHeader',
					}				
				}]
			},{
				xtype:'panel',
				layout:'hbox',
				width:'100%',
				items:[
				       this.getHeaderGCPanel(),
				       this.getHeaderGButtons(),
				       this.getHeaderGHTreePanel()
				       ]
			}],
			buttonAlign : 'right',
			buttons : [ {
				text : 'Save',
				icon : 'images/greenFlopy_save.png',
				tooltip : 'Save',
				handler:'saveHeaderGroup'
			}, {
				text : 'Cancel',
				icon : 'images/delete_icon.png',
				handler : function() {
					this.up().up().close();
				}
			}]
		});	
    },//getHeaderGroupMainWindow ends
    
    getHeaderGCPanel: function()
    {
		return Ext.create('Ext.grid.Panel', {
			viewConfig : {
				plugins : {
					ptype : 'gridviewdragdrop',
				}
			},
			gridType : "columnsList",
			multiSelect : true,
			cls:'gridBorder',
			border:true,
			store : this.headerGCStore,
			columns : [{
				text : "Field Header",
				allowBlank : false,
				sortable : false,
				resizable : false,
				menuDisabled : true,
				dataIndex : 'displayName',
				flex : 0.1266697,
			} ],
			stripeRows : true,
			title : 'Columns',
			margins : '0 2 0 0',
			width : '44%',
			height : 380,
		});
	},
	
	getHeaderGCStore : function()
	{
		return new Ext.create('Ext.data.Store', {
			fields : ['name', 'displayName'],  
			data : []
		});
	},

	getHeaderGButtons : function()
	{
		return Ext.create('Ext.panel.Panel', {
			autoScroll : false,
			height : 380,
			layout : {
				type : 'vbox',
				padding : 5,
				align : 'center',
				pack : 'center',
			},
			items : [ {
				xtype : 'button',
				text : 'Add',
				margin : '5 15 5 0',
				handler:'addColumnsToGroup'
			}, {
				xtype : 'button',
				text : 'Remove',
				margin : '5 0 5 0',
				handler : 'removeColumnsFromGroup'				
			} ]
		});
	},
	getHeaderGHTreePanel : function() 
	{
		return Ext.create('Ext.tree.Panel', {
		//	store : this.headerGHStore,
			border:true,
			 root: {
			        text: 'Columns',
			        expanded: true,
			        children: []
			    },
			cls:'gridBorder',
			margins : '0 2 0 0',
			gridType : "headerColumnList",
			title : 'Header',
			rootVisible : true,
			width : '44%',
			height : 380,
			//async : true,
			allowDeselect : true,
			autoScroll:false,
			expandable : true,
			useArrows : true,
			viewConfig : {
				plugins : {
					ptype : 'treeviewdragdrop',
				}
			},
			listeners : {
				itemClick : this.selectHeader,
				scope : this
			}
		});
	},
	
	selectHeader : function(view, record, item, index, e) 
	{
		debugger;
		this.selectednode = record;
	},
	/*getHeaderGHStore : function()
	{
		debugger;
		return Ext.create('Ext.data.TreeStore', {
			async : true,
			autoSync : true,
			folderSort : true,
			root : {
				text : 'Columns',
				//expanded : true,
			}
		});
	},*/

	addHeader : function(btn)
	{
		debugger;
		if (this.selectednode != undefined && this.selectednode != null && this.selectednode.isLeaf() == false)
		{
			var text = btn.up().query("[txtType=headerName]")[0];
			this.addParentNode(text.getValue(),this.selectednode);
			text.reset();
		}
	},
	removeHeader : function(btn)
	{
		if (this.selectednode != undefined&& this.selectednode != null&& this.selectednode.isLeaf() == false)
		{
			if (this.selectednode.hasChildNodes()) {
				Ext.Msg.alert('Error',"Please remove child node first");
			} else {
				this.selectednode.remove(true);
				this.selectednode = undefined;
			}
		}
	},
	addParentNode : function(text,selectednode) 
	{
		var newNode = selectednode.appendChild({
			text : text,
			displaySeq : 1,
			leaf : false,
			name:"",
			fieldCol : false,
			depth : 1,
			expanded : true,
		});
		selectednode.expand();
		return newNode;
	},
	addChidldNode : function(text,name, selectednode) 
	{
		selectednode.appendChild({
			text : text,
			fieldName : text,
			name:name,
			fieldCol : true,
			leaf : true
		});
	},

	addColumnsToGroup : function(btn)
	{
		debugger;
		if (this.selectednode != undefined&& this.selectednode != null)
		{
			if (this.headerGCGrid.getSelectionModel().hasSelection())
			{
				var rows = this.headerGCGrid.getSelectionModel().getSelection();
				for (var x = 0; x < rows.length; x++)
				{
					var row = rows[x];
					this.addChidldNode(row.data.displayName,row.data.name,this.selectednode);
					this.headerGCGrid.getStore().remove(row);
				}
			}
		}
	},
	removeColumnsFromGroup : function(btn)
	{
		debugger;
		if (this.selectednode != undefined&& this.selectednode != null) 
		{
			var idx = this.copyHeaderGCStore.find("displayName",this.selectednode.data.text);
			if (idx != -1) {
				this.headerGCStore.add(this.copyHeaderGCStore.getAt(idx));
				this.selectednode.remove(true);
				this.selectednode = null;
			}
		}
	},
	getCopyHeaderGCStore : function()
	{
		return Ext.create('Ext.data.Store', {
			autoLoad : true,
			data : [],
			fields : []
		});
	},
	doCopyHeaderGCStore : function(store)
	{
		Ext.Array.each(store.data.items, function(item) {
			this.copyHeaderGCStore.add(item);
		}, this);
	},
	
	saveHeaderGroup : function(btn)
	{
		debugger;
		var data = this.getTreedata(this.headerGHGrid,this.headerGCGrid);
		btn.up().up().gridConf["headerGroup"] = JSON.stringify(data);
		btn.up().up().close();
	},
	getTreedata : function(tree, headerGCGrid)
	{
		debugger;
		var headerVal = this.getDeepAllLeafNode(tree.getRootNode());
		if (headerGCGrid.getStore().data.items.length > 0)
		{
			Ext.Array.each(headerGCGrid.getStore().data.items,
					function(item) {
						headerVal.push({
							text : item.data.displayName,
							name:item.data.name
						});
					});
		}
		return headerVal;
	},
	getDeepAllLeafNode : function(node)
	{
		debugger;
		var allNodes = new Array();
		/*if (!Ext.value(node, false)) {
			return [];
		}*/	
		if (node.isLeaf()) {
			return node;
		} else {
			node.eachChild(function(Mynode) {
				allNodes = allNodes.concat(this.getDeepAllChildNodes(Mynode));
			}, this);
		}
		return allNodes;
	},
	getDeepAllChildNodes : function(node)
	{
		debugger;
		var allNodes = new Array();
		/*if (!Ext.value(node, false)) {
			return [];
		}*/
		if (!node.hasChildNodes()) {
			return {
				text : node.data.text,
				fieldCol : node.data.leaf,
				name:node.data.name
			};
		} else {
			var allChild = new Array();
			node.eachChild(function(Mynode) {
				allChild = allChild.concat(this.getDeepAllChildNodes(Mynode));
			}, this);
			allNodes = allNodes.concat({
				text : node.data.text,
				fieldCol : node.data.leaf,
				name:node.data.name,
				columns : allChild
			});
		}
		return allNodes;
	},
});