Ext.define('Healthsurvey.view.querybuildernewmodel.querycondition.QueryFromController', {
	extend : 'Ext.app.ViewController',
	requires:[],
	alias:'controller.query-from',
	queryFromTree : null,
	queryBuilder : null,
	foundFromTreeNode : null,
	searchBox : null,
	searchBoxData : [],
	init:function(){
		this.queryFromTree = this.getView();
		
		this.queryBuilder = this.queryFromTree.up().up().up().up().up();
		
		this.queryBuilder.controller.queryFromTree = this.queryFromTree;

	},
	fromEntityNode : function(entConfig,action){
		
		var rootNode =this.queryFromTree.getRootNode();
			
				switch (action) {
				case 'add':
					
					rootNode.appendChild(
							{
								text:entConfig.name,
								isEntity :true,
								entConfig :entConfig,
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
	searchQueryFromTree:function(treeNode ,key,value,isExpand){
    	var me = this;
    	var foundEntityNode ;
    	treeNode.eachChild(function(child) {
    		
    		if(child.data.hasOwnProperty('config')&& child.data.config.hasOwnProperty(key)&& child.data.config[key] == value){
    			
    			if(isExpand){
    				me.queryFromTree.selectPath(child.getPath());
    				me.queryFromTree.expandNode(child,true);
    				me.foundFromTreeNode = child;
    			}
    			return false;
    		}
    		else if (child.hasChildNodes()){
    			me.searchQueryFromTree(child,key,value,isExpand);		
    		}
		
		},me);
    	
	},
	onSearchBoxSelect:function( searchbox, records, eOpts ){
		
		this.searchQueryFromTree(this.queryFromTree.getRootNode(), 'entId',records[0].data.id, true);
		var searchBox = this.queryBuilder.down('#fromSearchBox');
		searchBox.reset();
	}
	
});
