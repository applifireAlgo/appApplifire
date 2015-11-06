Ext.define('Healthsurvey.view.querybuildernewmodel.querycondition.QueryGroupByController', {
	extend : 'Ext.app.ViewController',
	requires:[],
	alias:'controller.query-groupby',
	queryGroupByTree : null,
	queryBuilder : null,
	foundGroupbyTreeNode : null,
	init:function(){
		this.queryGroupByTree = this.getView();
		
		this.queryBuilder = this.queryGroupByTree.up().up().up().up().up();
		
		this.queryBuilder.controller.queryGroupByTree = this.queryGroupByTree;
	},
	groupByEntityNode : function(entConfig,action){
		
		var rootNode =this.queryGroupByTree.getRootNode();
			
				switch (action) {
				case 'add':
					
					rootNode.appendChild(
							{
								text:entConfig.name,
								isEntity :true,
								entConfig :entConfig,
								entId:entConfig.id,
								icon:'images/table_icon.png',
								expanded:true,
								leaf:true
							}
					);
					break;
				case 'remove':
						
					rootNode.eachChild(function(ent) {
							
							if((ent) && (ent.data.entConfig == this.entConfig)){
								
								this.rootNode.removeChild(ent);
							}
						},{rootNode : rootNode ,entConfig : entConfig});
					break;
					
				default:
					break;
				}
				
	},
	groupByFieldNode : function(entConfig,fieldConfigs,action){
		
		var rootNode =this.queryGroupByTree.getRootNode();
		
		rootNode.eachChild(function(ent) {
			
			if((ent.data.hasOwnProperty('isEntity')&& ent.data.isEntity) && ent.data.entConfig.id == this.entConfig.id){
				
				switch (this.action) {
				case 'add':
					
					for(var i = 0;i<this.fieldConfigs.length;i++ ){
						var fieldConfig = fieldConfigs[i];
						
						ent.appendChild(
								{
									text: fieldConfig.fieldName,
									icon:(fieldConfig.isPKey=='true')?'images/icon/key.png':'',
									isField :true,
									checked:false,
									entConfig :this.entConfig,
									fieldName:fieldConfig.fieldName,
									icon:(fieldConfig.isPKey=='true')?'images/icon/key.png':'images/column_icon.png',
									fieldConfig : fieldConfig,
									expanded:false,
									leaf:true
								}
						);
					}
					
					ent.data.expanded = true;
					break;
				case 'remove':
					
					ent.eachChild(function(field) {
						for(var i = 0;i<this.fieldConfigs.length;i++ ){
							var fieldConfig = fieldConfigs[0];
						if(field 
								&& (field.data.hasOwnProperty('isField')&& field.data.isField)
								&& (field.data.fieldConfig.fieldName == fieldConfig.fieldName)
						)
						{
							
							this.ent.removeChild(field);
						}
						}
					},{ent:ent,fieldConfigs:this.fieldConfigs});
				break;
				
				default:
					break;
				}
			}
		},{entConfig:entConfig,fieldConfigs:fieldConfigs,action:action});
		
	},
	searchQueryGroupByTree:function(treeNode ,key,value,isExpand){
    	var me = this;
    	treeNode.eachChild(function(child) {
    		
    		if(child.data.hasOwnProperty('config')&& child.data.config.hasOwnProperty(key)&& child.data.config[key] == value){
    			
    			if(isExpand){
    				
    				me.queryGroupByTree.selectPath(child.getPath());
    				me.queryGroupByTree.expandNode(child,true);
    				me.foundGroupbyTreeNode = child;
    			}
    			return false;
    		}
    		else if (child.hasChildNodes()){
    			me.searchQueryGroupByTree(child,key,value,isExpand);		
    		}
		
		},me);
    	
	},
	onSearchBoxSelect:function( searchbox, records, eOpts ){
	
		this.searchQueryGroupByTree(this.queryGroupByTree.getRootNode(), 'fieldName',records[0].data.id, true);
		var searchBox = this.queryBuilder.down('#groupBySearchBox');
		searchBox.reset();
	},
	onCheckChange : function(treenode, checked){
		
		var entConfig = treenode.parentNode.data.entConfig;
		var fieldConfig = treenode.data.fieldConfig;
		
		treenode.data.cls=(checked)?'conditionNode':'';
		
		this.queryGroupByTree.reconfigure();
	//	this.queryBuilder.controller.editQueryFieldRecord(fieldConfig.fieldName+entConfig.entId,'grouping',checked);
		
		/**Add frild to query structure tree...*/
		this.queryBuilder.controller.queryStructureTree.controller.fieldNode('isGroupBy',entConfig,[fieldConfig],checked?'add':'remove');
	}
});
