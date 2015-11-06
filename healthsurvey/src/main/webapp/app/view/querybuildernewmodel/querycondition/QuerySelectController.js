Ext.define('Healthsurvey.view.querybuildernewmodel.querycondition.QuerySelectController', {
	extend : 'Ext.app.ViewController',
	requires:[],
	alias:'controller.query-select',
	querySelectTree : null,
	queryBuilder : null,
	foundSelectTreeNode : null,
	searchBox : null,
	searchBoxData : [],
	init:function(){
		this.querySelectTree = this.getView();
		
		this.queryBuilder = this.querySelectTree.up().up().up().up().up();
		
		this.queryBuilder.controller.querySelectTree = this.querySelectTree;
		
//		this.searchBox = this.queryBuilder.down('#selectSearchBox');
	},
	selectEntityNode : function(entConfig,action){
		
		var rootNode =this.querySelectTree.getRootNode();
			
				switch (action) {
				case 'add':
					
					rootNode.appendChild(
							{
								selectField:entConfig.name,
								sortBy:'',
								aggregate:'',
								isEntity :true,
								entConfig :entConfig,
								icon:'images/table_icon.png',
								entId:entConfig.id,
								expanded:true,
								leaf:false
							
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
	selectFieldNode : function(entConfig,fieldConfigs,action){
		
		var rootNode =this.querySelectTree.getRootNode();
		var entNode = rootNode.findChild('entId',entConfig.id);
		
		if(entNode)
		{	
		switch (action) {
		case 'add':
			
			for(var i = 0;i<fieldConfigs.length;i++ ){
				var fieldConfig = fieldConfigs[i];
				
				entNode.appendChild(
						{
							selectField: fieldConfig.fieldName,
							isField :true,
							orderBy:'',
							aggregate:'',
							icon:(fieldConfig.isPKey=='true')?'images/icon/key.png':'images/column_icon.png',
							entConfig :entConfig,
							fieldConfig : fieldConfig,
							fieldName : fieldConfig.fieldName,
							expanded:false,
							leaf:true
						}
				);
			}
			
			entNode.data.expanded = true;
			break;
		case 'remove':
		
			for(var i = 0;i<fieldConfigs.length;i++ ){
				var fieldConfig = fieldConfigs[0];
				var fieldNode = entNode.findChild('fieldName',fieldConfig.fieldName);
					/**Delete fieldNode from entNode...*/
				entNode.removeChild(fieldNode);
			}
		break;
		
		default:
			break;
		}
	
		}
		else{
			
			console.log('Entity not found to add/remove/update selectfeiled!!');
		}
	},
	beforeCellEdit : function(editor, context, eOpts){
		
		
		if(context.record.isRoot()||(context.record.data.hasOwnProperty('isEntity')&&context.record.data.isEntity))
		{
			return false;
		}else{
			return true;
		}
	},
	onCellEdit :function(editor, context,e){
		
		var record = context.record.data; 
		var nodeType;
		var params;
		var action;
		switch (context.colIdx) {
		case 1:
		
			nodeType = 'isOrderBy';
			action ='add';
			params	 = {
					text :record.selectField +"["+record.orderBy+"]",
					orderBy :record.orderBy
					};
			this.queryBuilder.controller.queryStructureTree.controller.fieldNode(nodeType,record.entConfig,[record.fieldConfig],'remove',params);
			this.queryBuilder.controller.queryStructureTree.controller.fieldNode(nodeType,record.entConfig,[record.fieldConfig],'add',params);
			this.queryBuilder.controller.queryStructureTree.controller.parseStructureTree();
			break;
		case 2:// aggregate 
			params	 = {
				text :record.aggregate+"("+record.selectField+")",
				aggregate :record.aggregate,
				
				};
			//param['queryconfig'] = params;
			nodeType = 'isSelect';
			action ='update';
			this.queryBuilder.controller.queryStructureTree.controller.fieldNode(nodeType,record.entConfig,[record.fieldConfig],action,params);
			this.queryBuilder.controller.queryStructureTree.controller.parseStructureTree();
			break;
			
		default:
			break;
		}
		
		
		
	},
	searchQuerySelectTree:function(treeNode ,key,value,isExpand){
    	var me = this;
    	treeNode.eachChild(function(child) {
    		if(child.data.hasOwnProperty('config')&& child.data.config.hasOwnProperty(key)&& child.data.config[key] == value){
    			
    			if(isExpand){
    				me.querySelectTree.selectPath(child.getPath());
    				me.querySelectTree.expandNode(child,true);
    				me.foundSelectTreeNode = child;
    			}
    			return false;
    		}
    		else if (child.hasChildNodes()){
    			me.searchQuerySelectTree(child,key,value,isExpand);		
    		}
		
		},me);
    	
	},
	onSearchBoxSelect:function( searchbox, records, eOpts ){
		
		this.searchQuerySelectTree(this.querySelectTree.getRootNode(), 'fieldName',records[0].data.id, true);
		var searchBox = this.queryBuilder.down('#selectSearchBox');
		searchBox.reset();
	}
	
});
