Ext.define('Healthsurvey.view.querybuildernewmodel.queryentities.QueryEntitiesController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.query-entities-tree',
	requires:['Healthsurvey.view.querybuildernewmodel.floatingentity.FloatingEntity','Ext.tree.*'],
	entTreePanel:null,
	queryBuilder :null,
	draggedRecord:null,
	init:function(){
		
		this.entTreePanel = this.getView();
		
		this.queryBuilder = this.entTreePanel.up().up().up();
		this.queryBuilder.controller.entTreePanel = this.entTreePanel;
		this.initTreeDragZone();
	},
	initTreeDragZone: function(){
		  var entTreePanel = this.getView();
		  var scope = this;
		  entTreePanel.on('render', function(v) {
  			
			  entTreePanel.dragZone = new Ext.dd.DragZone(v.getEl(), {
	    			
	    				onBeforeDrag : function(data, e) {
						
	    				},
	    		        getDragData: function(e) {
	    		            var sourceEl = e.getTarget(v.itemSelector, 10);
	    		            
	    		            if (sourceEl) {
	    		                d = sourceEl.cloneNode(true);
	    		                d.id = Ext.id();
	    		                
	    		                return {
	    		                    ddel: d,
	    		                    sourceEl: sourceEl,
	    		                    repairXY: Ext.fly(sourceEl).getXY(),
	    		                    sourceStore: v.store,
	    		                    draggedRecord: scope.draggedRecord
	    		                    
	    		                };
	    		            }
	    		        },

	    		        getRepairXY: function() {
	    		            return this.dragData.repairXY;
	    		        },
	    		        
	    		        ddGroup : 'entityDDGroup'
	    		    },scope);    		
	    		
	    	},scope);
		
  	},
  	
  	onItemClick: function( entTreePanel, record, item, index, e, eOpts ) {
    	
		this.draggedRecord = record;
		
	},
	getAllEntities:function(){
		
		var me = this;
		var entMask = new Ext.LoadMask({
		    msg    : 'Loading...',
		    target : this.entTreePanel.up()
		}).show();
		
		Ext.Ajax.request({
			url : "secure/buzzorapp/allEntities",
			method : 'POST',
			waitMsg : 'Loading entities...',
			jsonData : {},
			scope:me,
			entMask:entMask,
			success : function(response,sender) {
				
				var enTree = sender.scope.getView();
				
				var responseJson = Ext.JSON.decode(response.responseText);
				var data = Ext.JSON.decode(responseJson.response.data);
				
					Ext.each(data,function(td){
						
						var enTreeRoot = enTree.getRootNode();
						
						var domainChild = enTreeRoot.appendChild(
								{
									text:td.domainName,
									expanded:true,
									icon:'images/folder-database-icon.png',
									cls:'folderTitle',
									leaf:false
								}
						);
					
						Ext.each(td.tables,function(table){
							
							domainChild.appendChild({
								text:table.name,
								entConfig:table,
								icon:'images/table_icon.png',
								leaf:true
							});
							
						},domainChild);
						
					},enTree);
					
					//enTree.store.load(enTree.getRootNode());
					//enTree.store.setRootNode(enTree.store.getRootNode());
					//enTree.folderSort(true);
					/*var sorter = new Ext.tree.TreeSorter(enTree, {folderSort:true});
					sorter.doSort(enTree.getRootNode());*/
					/**Search box store...**/
					if (data.length > 0) {
				
						var searchEntCombo = sender.scope.queryBuilder.down('#entSearchBox');
						
						var store = Ext.create('Ext.data.Store', {
										storeId : 'searchStore',
										fields : ['id','name','entConfig'],
										data : [],
										sortOnLoad :true
										});
						
						
						
						Ext.each(data, function(ent) {
							Ext.each(ent.tables,function(table){
								this.store.add({id:table.id,name:table.name,entConfig:table});
							},{store:store});
						}, {store:store});
						store.sort('name', 'ASC');
						searchEntCombo.setStore(store);
						
				}
					else{
						Ext.Msg.alert("Info",
						"No entities available!");
					}
					sender.entMask.hide();
				},
				failure : function(response, opts) {
					opts.entMask.hide();
					Ext.Msg.alert("Error",
							"Couldn't load entities!");
				}
			});
		
	},
	onSearchBoxSelect:function( searchbox, records, eOpts ){
		
		this.searchEntity(this.entTreePanel.getRootNode(), records[0].data.id, true);
		this.drawEntitySprite (records[0]);
		
	},
	onItemdblclick : function(enTree, record, item, index, e, eOpts ){
		
		this.drawEntitySprite (record);
		
	},
	drawEntitySprite : function(record){
		
		if(record.data){
			
			var rootNode = this.queryBuilder.controller.queryStructureTree.getRootNode();
			var fromNode = rootNode.findChild('nodeType','isFrom');
			
			var entity = fromNode.findChild('entId',record.data.entConfig.id);//this.queryBuilder.controller.searchQueryEntityRecord(record.data.entConfig.id);
			
			if(entity == null || entity == undefined ){
				
				var entRelationPanel = this.getView().up().up().up().down('#entDetailPanel');
				
				var pos = entRelationPanel.noOfCasecade *10;
				var floatPanel = {
						xtype: 'floating-entity',
						constrain: true,
						autoShow:false,
						autoRender:false,
						icon:'images/table_icon.png',
						autoEl:false,
						itemId:'floatingEntity'+record.data.entConfig.id,
						entConfig:record.data.entConfig,
						title: record.data.entConfig.name
					};
				
				/***In case of Name query add common floating radio...*/
				if(this.queryBuilder.controller.queryType == 1){
					var floatindRadioGroup =	this.queryBuilder.down('#floatindRadioGroup');
					
					floatindRadioGroup.add(
					{	alignTarget :'left',
						//boxLabel : record.data.entConfig.name,
						itemId : 'floatingRadiofield'+record.data.entConfig.id,
						checked : false,
						tooltip:'Select all',
						name:'floatingEntRadio',
						listeners:{
							change:'onFloatingCommonChkChange'
						}
					} );
						
				}
				
					entRelationPanel.add(floatPanel).showAt(pos,pos);
					
					entRelationPanel.noOfCasecade ++;
					/**Add added entity to Query Structure...**/
					
					
					this.queryBuilder.controller.querySelectTree.controller.selectEntityNode(record.data.entConfig,'add');
					this.queryBuilder.controller.queryFromTree.controller.fromEntityNode(record.data.entConfig,'add');
					this.queryBuilder.controller.queryGroupByTree.controller.groupByEntityNode(record.data.entConfig,'add');
					this.queryBuilder.controller.queryStructureTree.controller.entityNode(record.data.entConfig,'add');
					
					
					//this.queryBuilder.controller.queryWhereClauseWindow.controller.whereSelectEntityNode(record.data.entConfig,'add');
					
					
		
			}
			else{
				
					Ext.Msg.alert("Info","Entity "+'"'+record.data.entConfig.name +'"'+" is already dropped!");
			}
		}
	},	
	searchEntity : function (treeNode, entKey ,isExpand){
	    	var me = this;
	    	treeNode.eachChild(function(child) {
	    		if(child.data.hasOwnProperty('entConfig')&&child.data.entConfig.id == entKey){
	    			
	    			if(isExpand){
	    				
	    				me.entTreePanel.selectPath(child.getPath());
	    				me.entTreePanel.expandNode(child,true);
	    				//me.entTreePanel.refreshScroll();
	    			//	me.entTreePanel.focusRow(me.entTreePanel.getSelectionModel().getSelection()[0]);
	    			}
	    			return false;
	    		}
	    		else if (child.hasChildNodes()){
	    			me.searchEntity(child,entKey,isExpand);		
	    		}
			
			},me);
	    	var searchEntCombo = this.queryBuilder.down('#entSearchBox');
	    	searchEntCombo.reset();
	    	
	}
});
