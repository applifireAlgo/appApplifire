Ext.define('Healthsurvey.view.querybuildernewmodel.querystructure.QueryStructureController', {
	extend : 'Ext.app.ViewController',
	requires:[],
	alias:'controller.query-structure',
	queryStructureTree : null,
	queryBuilder : null,
	foundStructureTreeNode : undefined,
	queryStructreStore :null,
	WHERE :"",
	queryJson:{
		fields:[],where:[],inputParams:[],join:[{
			operator:'AND' 
		}]
	},
	JPQL:'',	
	init:function(){
		
		this.queryStructureTree = this.getView();
		
		this.queryBuilder = this.queryStructureTree.up().up();
		
		this.queryBuilder.controller.queryStructureTree = this.queryStructureTree;
		
		this.queryStructreStore = Ext.create('Healthsurvey.view.querybuildernewmodel.querystructure.QueryStructureStore');
		
	},
	afterrender :function( tree,eOpts ){
		var root = tree.getRootNode();
		var rootChildNodes = root.childNodes;
				
				for (var q = 0; q < rootChildNodes.length; q++) {
					var structChild = rootChildNodes[q];
					
					var model = Ext.create('Healthsurvey.view.querybuildernewmodel.querystructure.QueryStructureModel');
					model.set('type',structChild.data.nodeType);
					model.set('queryconfig',[]);
					
					this.queryStructreStore.add(model);
				}
	},
	
	onItemAppend :function(tree, node, index){
		
		/**Differentiate fields by category (isSelect/Gruopby etc)**/
		var records = this.queryStructreStore.query('type',node.data.nodeType); 
		if(node.data.nodeType=="isWhere"||node.data.nodeType=="isFrom" || (node.data.nodeType!="isFrom" && node.data.hasOwnProperty('isField')&&node.data.isField))
				{
			for (var s = 0; s < records.length; s++) {
					
					var record = records.getAt(s);
					/**Push queryconfig...*/
					
					record.data.queryconfig.push(node.data.queryconfig);
					
					record.commit(true);
					record.endEdit();
					
				}
			this.parseStructureTree(this.queryStructureTree.getRootNode());
				}
	},

	onItemRemove :function(tree, node, index){
		  if(node.data.nodeType=='isWhere'){
				 
			   if(node.data.hasOwnProperty('whereConfig') && node.data.whereConfig.hasOwnProperty('joinConnection')){
				   debugger; 
				   var joinConnection = node.data.whereConfig.joinConnection;
				   this.queryBuilder.controller.entRelationPanel.controller.removeJoinConnection(joinConnection);
			   }
			   
		   }
		/**Differentiate fields by category (isSelect/Gruopby etc)**/
		var records = this.queryStructreStore.query('type',node.data.nodeType); 
		
			   for (var s = 0; s < records.length; s++) {
			
				   var record = records.getAt(s);
				   	/**Remove queryconfig...*/
				   Ext.Array.remove(record.data.queryconfig,node.data.queryconfig);
				   record.commit(true);
				   record.endEdit();
			
		}
			 
			   this.parseStructureTree(this.queryStructureTree.getRootNode());
			   
			   
	},
	onItemUpdate : function(tree,node,params){
		
		
		var records = this.queryStructreStore.query('type',node.data.nodeType); 
		 for (var s = 0; s < records.length; s++) {
				
			   var record = records.getAt(s);
			   
			   				for (var int = 0; int < record.data.queryconfig.length; int++) {
								var qCon = record.data.queryconfig[int];
									
								if(qCon==node.data.queryconfig || (node.data.nodeType=="isWhere"&& (node.data.queryconfig._connId == qCon._connId))){
									for(key in params){
										
										qCon[key] =params[key];
										
										node.data.queryconfig[key] =params[key];
									}
								}
							}
			   
			   
			   record.commit(true);
			   record.endEdit();
		
	}
		   this.parseStructureTree(this.queryStructureTree.getRootNode());
	},

	makeWhereClause : function(whereNode,WHERE){
		
		whereNode.eachChild(function(wherechild) {
			if(wherechild.data.hasOwnProperty('whereConfig')){
			var whereConfig = wherechild.data.whereConfig;
			var left = whereConfig.leftFieldConfig;//.fieldValue;
			var right = whereConfig.rightFieldConfig;//.fieldValue;
			var oper = whereConfig.operator;
			var andor = whereConfig.andor;
			 
			if(wherechild.isFirst() && wherechild.data.whereConfig._parentConnId =='isWhereRoot'){
				this.scope.WHERE =  "\n WHERE";
			}
			if(!wherechild.hasChildNodes()){
				
				this.scope.WHERE = this.scope.WHERE +"\n"
								+" "+andor
								+" "+(left.hasOwnProperty('fieldValue')?left.fieldValue:null)
								+" "+ oper
								+" "+(right.hasOwnProperty('fieldValue')?right.fieldValue:null)
				var noOfClose = wherechild.getDepth()-2;
				for (var i = 0; i < noOfClose; i++) {
					this.scope.WHERE= this.scope.WHERE+" )";
				}
				
			}
			else{
				
				this.scope.WHERE =this.scope.WHERE+"\n"
								+" " +andor
								+" "+"("+(left.hasOwnProperty('fieldValue')?left.fieldValue:null)
										+" "+ oper
										+" "+(right.hasOwnProperty('fieldValue')?right.fieldValue:null);
				
				this.scope.makeWhereClause(wherechild,this.WHERE);
			}
			}
			debugger;
			
		},{WHERE:WHERE,scope:this});
	},
	removeWhereCondition : function(whereNode,whereConfig){
			whereNode.eachChild(function(wherechild) {
				
				if(wherechild.data.whereConfig._connId == this.whereConfig._connId){
					
					wherechild.parentNode.removeChild(wherechild);
					return false;
				}
				if(wherechild.hasChildNodes()){
					this.scope.removeWhereCondition(wherechild,this.whereConfig);
				}
			},{whereConfig:whereConfig ,scope:this}
			);
	},
	addNewCondition :function(whereConfig){
		
		var rootNode = this.queryStructureTree.getRootNode();
		var whereNode = rootNode.findChild('isWhere',true);
		debugger;
		
		if(whereConfig.isRootCondition){
			
			var andor ;
			if(whereConfig.andor=="" && whereNode.hasChildNodes()){
				andor = "AND";
				whereConfig.andor = "AND";
			}else{
				andor = whereConfig.andor;
			}
			var isJoin = whereConfig.hasOwnProperty('joinConnection');
			var _conditionExpression = andor +" "+ whereConfig.leftFieldConfig.fieldValue+" "+whereConfig.operator+" "+whereConfig.rightFieldConfig.fieldValue;
			var lastAdded =	whereNode.appendChild({
							text :_conditionExpression,
							whereConfig:whereConfig,
							icon:isJoin?'images/where.png':'images/table_link.png',
							queryconfig :{
										_connId:whereConfig._connId,
										andor:whereConfig.andor,
										leftFieldConfig:whereConfig.leftFieldConfig,
										operator:whereConfig.operator,
										rightFieldConfig:whereConfig.rightFieldConfig},
							nodeType:'isWhere',
							isCondition:true,
							leaf:true
			});
			this.queryStructureTree.selectPath(lastAdded.getPath());
			this.queryStructureTree.expandNode(lastAdded,true);
		}
		else{
			this.whereCondition(whereNode,whereConfig,'_connId',whereConfig._parentConnId,'add');
		}
		this.queryStructureTree.reconfigure();
		
	},
	whereCondition :function(whereNode,whereConfig,key,value,action){
		
		whereNode.eachChild(function(wherechild) {
			
			if((wherechild) && wherechild.data.whereConfig[key] == this.value){
				switch (this.action) {
				case 'add':
					var _conditionExpression = this.whereConfig.andor +" " +this.whereConfig.leftFieldConfig.fieldValue+" "+this.whereConfig.operator+" "+this.whereConfig.rightFieldConfig.fieldValue;
					var isJoin = this.whereConfig.hasOwnProperty('joinConnection');
					
					var lastAdded =	wherechild.appendChild({
						text :_conditionExpression,
						icon:isJoin?'images/where.png':'images/table_link.png',
						whereConfig:this.whereConfig,
						queryconfig  :{
							andor:this.whereConfig.andor,
							leftFieldConfig:this.whereConfig.leftFieldConfig,
							operator:this.whereConfig.operator,
							rightFieldConfig:this.whereConfig.rightFieldConfig
							},
						nodeType:'isWhere',
						isCondition:true,
						leaf:false
					});
					/**Add flag hasMore to set brackets in final query...*/
					this.scope.queryStructureTree.selectPath(lastAdded.getPath());
					this.scope.queryStructureTree.expandNode(lastAdded,true);
					
					return false;
					break;
				case 'remove':
					wherechild.parentNode.removeChild(wherechild);
					break;

				default:
					break;
				}
				
			
			}
			if(wherechild.hasChildNodes()){
				this.scope.whereCondition(wherechild,this.whereConfig,this.key,this.value,this.action);
			}
			
		},{whereConfig:whereConfig,key:key,value:value,action:action,scope:this});
		
	},
	fieldNode: function(nodeType,entConfig,fieldConfigs,action,params){
		
		var rootNode =this.queryStructureTree.getRootNode();
		var structureNode = rootNode.findChild(nodeType,true);
		
		var entNode = structureNode.findChild('entId',entConfig.id);
		
		if(entNode)
		{	
		switch (action) {
		case 'add':
			for(var i = 0; i < fieldConfigs.length;i++ ){
				var fieldConfig = fieldConfigs[i];
				
				var queryconfig={entConfig:entConfig,fieldConfig:fieldConfig};
				/*for(key in params){
					queryconfig[key] =params[key];
				}*/
				var childadded = entNode.appendChild(
						{
							//text: entConfig.name.replace(" ","").toLowerCase()+"."+fieldConfig.fieldName,
							text:fieldConfig.fieldName,
							icon:(fieldConfig.isPKey=='true')?'images/icon/key.png':'images/column_icon.png',
							isField :true,
							nodeType:nodeType,
							cls : (nodeType=='isFrom')?'x-hidden':'',
							entConfig :entConfig,
							fieldName:fieldConfig.fieldName,
							fieldConfig : fieldConfig,
							queryconfig :queryconfig,
							expanded:false,
							leaf:true
						}
				);
				this.queryStructureTree.selectPath(childadded.getPath());
				this.queryStructureTree.expandNode(childadded,true);
				if(params){
					for(key in params){
						childadded.data.queryconfig[key] =params[key];
						childadded.data[key] =params[key];
					}
					
			}
			
			
			}
			entNode.data.expanded = true;
			
			break;
		case 'remove':
			
				for(var i = 0;i<fieldConfigs.length;i++ ){
					var fieldConfig = fieldConfigs[i];
					var fieldNode = entNode.findChild('fieldName',fieldConfig.fieldName);
						/**Delete fieldNode from entNode...*/
					entNode.removeChild(fieldNode);
					
				}
				entNode.data.leaf = entNode.hasChildNodes()?false: true;
		break;
		case 'update':
			for(var i = 0;i<fieldConfigs.length;i++ ){
				var fieldConfig = fieldConfigs[0];
				var fieldNode = entNode.findChild('fieldName',fieldConfig.fieldName);
				/**Update fieldConfig....**/
				if(params){
					for(key in params){
						fieldNode.data[key] = params[key];
						//fieldNode.data.queryconfig[key] =params[key];
					}
				}
				
				 this.onItemUpdate(nodeType,fieldNode,params);
			}
					
		break;
		default:
			break;
		}
			this.queryStructureTree.reconfigure();
		}
		else{
			
			console.log('Entity not found to add/remove/update Strucure Tree!!');
		}
		
	},
	entityNode : function(entConfig,action){
		
		var rootNode =this.queryStructureTree.getRootNode();
		
		rootNode.eachChild(function(child) {
				
				switch (this.action) {
				case 'add':
					if((child.data.hasOwnProperty('isSelect')) || (child.data.hasOwnProperty('isFrom'))
							|| (child.data.hasOwnProperty('isGroupBy')) || (child.data.hasOwnProperty('isOrderBy')))
					{
					child.appendChild(
							{
								text:this.entConfig.name,
								isEntity :true,
								nodeType:child.data.nodeType,
								entConfig :this.entConfig,
								icon:'images/table_icon.png',
								//cls:'x-hidden',
								queryconfig :{entConfig:entConfig},
								entId:entConfig.id,
								expanded:true,
								leaf:true,
								useArrows:false
							}
					);
					}
					break;
				case 'remove':
						
						child.eachChild(function(item) {
							debugger;
							if(item && (
									(item.data.hasOwnProperty('entConfig') && item.data.entConfig.id == this.entConfig.id) 
									|| (item.data.hasOwnProperty('whereConfig') 
											&&item.data.whereConfig.leftFieldConfig.hasOwnProperty('entConfig')
											&& item.data.whereConfig.rightFieldConfig.hasOwnProperty('entConfig')
											&& (item.data.whereConfig.leftFieldConfig.entConfig.id == this.entConfig.id ||item.data.whereConfig.rightFieldConfig.entConfig.id == this.entConfig.id) /**For where Node condition will change...*/ 
							))){
								
								this.child.removeChild(item);
								debugger;
							}
						},{child : child ,entConfig : this.entConfig});
					break;
					
				default:
					break;
				}
				
			
		},{entConfig:entConfig ,action:action});
		this.queryStructureTree.reconfigure();
		
	},
		
	parseStructureTree :function(){
		this.WHERE = "";
		var finalQuery,SELECT = "SELECT",FROM = "\nFROM ",/*WHERE ="\nWHERE " ,*/GROUPBY ="" ,ORDERBY ="";
		var queryPanel = this.queryBuilder.down('#queryHTML');
		var rootNode = this.queryStructureTree.getRootNode();
		var selectNode = rootNode.findChild('nodeType','isSelect');
		var fromNode = rootNode.findChild('nodeType','isFrom');
		var whereNode = rootNode.findChild('nodeType','isWhere');
		var groupByNode = rootNode.findChild('nodeType','isGroupBy');
		var orderByNode = rootNode.findChild('nodeType','isOrderBy');
		
/**SELECT*/		
		for (var  i= 0; i < selectNode.childNodes.length; i++) {
			 
			  var entNode = selectNode.childNodes[i];
			  if(!entNode.hasChildNodes()){
				  entNode.data.cls='x-hidden';
			  }
			  else{
				  entNode.data.cls='';
			  }
			  if(entNode.data.hasOwnProperty('isEntity') && entNode.data.isEntity && entNode.hasChildNodes()){
				 
				 var entAlias= entNode.data.entConfig.name.replace(" ","").toLowerCase();
				var entFromNode = fromNode.findChild('entId',entNode.data.entConfig.id);
				
				if(entFromNode && (entFromNode.childNodes.length == entNode.childNodes.length)){
				
					SELECT = SELECT +" "+ entAlias ;//+ ((i!=selectNode.childNodes.length-1)?",":"");;
					
				}
				else{
				  /**If not selectAll*/
				  for (var  j= 0; j < entNode.childNodes.length; j++) {
					  
					  fieldNode = entNode.childNodes[j];
					  if(fieldNode.isFirst()){
						  this.queryJson.fields=[];
					  }
					  if(fieldNode.data.hasOwnProperty('isField') && fieldNode.data.isField){
						  var fieldConfig = fieldNode.data.fieldConfig;
						 
						  
						  this.queryJson.fields.push(
							{
								name : fieldConfig.fieldName,
								dataType: fieldConfig.dataType,
								displayName :fieldConfig.displayJson.DisplayName,
								widget:fieldConfig.displayJson.Widgets,
								alias:entAlias
							}	  
						  );
							if(fieldNode.data.hasOwnProperty('aggregate') )
							{
								
								SELECT = SELECT +" " +((SELECT!="SELECT")?",":"")+fieldNode.data.aggregate+"("+entAlias +"."+fieldConfig.fieldName+")";
							}
							else{
								SELECT = SELECT +" " +((SELECT!="SELECT")?",":"")+" "+entAlias +"."+fieldConfig.fieldName;	
							}
						  
					  }
					  
				  }
				}/***/
				  
			  }
		}
		 
/**FROM*/		
		for (var  i= 0; i < fromNode.childNodes.length; i++) {
			 
			  var entNode = fromNode.childNodes[i];
			  
			  if(entNode.data.hasOwnProperty('isEntity') && entNode.data.isEntity){
				  var entName = entNode.data.entConfig.name;
				 
						  FROM = FROM + entName+ " AS "+entName.replace(" ","").toLowerCase() +((i!=fromNode.childNodes.length-1)?",":"");
				  
			  }
		}
		

/**GROUP BY*/
		for (var  i= 0; i < groupByNode.childNodes.length; i++) {
			 
			  var entNode = groupByNode.childNodes[i];
			  if(!entNode.hasChildNodes()){
				  entNode.data.cls='x-hidden';
			  }
			  else{
				  entNode.data.cls='';
			  }
			  if(entNode.data.hasOwnProperty('isEntity') && entNode.data.isEntity && entNode.hasChildNodes()){
				  
				  for (var  j= 0; j < entNode.childNodes.length; j++) {
					  
					  fieldNode = entNode.childNodes[j];
					  
					  if(fieldNode.data.hasOwnProperty('isField') && fieldNode.data.isField){
						  
						  GROUPBY = (fieldNode.isFirst())?"\nGROUP BY":GROUPBY;
						  GROUPBY = GROUPBY +" " +entNode.data.entConfig.name.replace(" ","").toLowerCase() +"."+fieldNode.data.fieldConfig.fieldName + ((j!=entNode.childNodes.length-1)?",":"");
					  }
					  
					  
				  }
				  
			  }
		}
/**ORDER BY**/		
		for (var  i= 0; i < orderByNode.childNodes.length; i++) {
			 
			  var entNode = orderByNode.childNodes[i];
			  if(!entNode.hasChildNodes()){
				  entNode.data.cls='x-hidden';
			  }
			  else{
				  entNode.data.cls='';
			  }
			  if(entNode.data.hasOwnProperty('isEntity') && entNode.data.isEntity && entNode.hasChildNodes()){
				  
				  for (var  j= 0; j < entNode.childNodes.length; j++) {
					  
					  fieldNode = entNode.childNodes[j];
					  
					  if(fieldNode.data.hasOwnProperty('isField') && fieldNode.data.isField){
						
						var ord = "";
							if(fieldNode.data.hasOwnProperty('orderBy') )
								//&&fieldNode.data.queryconfig.hasOwnProperty('orderBy')){
							{	ord= fieldNode.data.orderBy; 
							}
						  ORDERBY = (fieldNode.isFirst())?"\nORDER BY":ORDERBY;
						  ORDERBY = ORDERBY +" " +entNode.data.entConfig.name.replace(" ","").toLowerCase() +"."+fieldNode.data.fieldConfig.fieldName +" "+ord +((j!=entNode.childNodes.length-1)?",":"");
					  }
					  
				  }
				  
			  }
		}
		
		this.queryJson.where=[];
		/**WHERE*/		
		 this.makeWhereClause(whereNode);
		this.queryJson.where =  this.getDeepAllLeafNode(whereNode);	
		
		console.log("Query JSON Field :: "+JSON.stringify(this.queryJson,null,4));
		finalQuery = SELECT + FROM + this.WHERE + GROUPBY +ORDERBY;
		
		queryPanel.setHtml('<pre class="brush :sql">'+finalQuery+'</pre>');
		this.JPQL = finalQuery;
		console.log("JPQL Query:: "+finalQuery);
		
		SyntaxHighlighter.autoloader('sql resources/syntaxhighlighter/shBrushSql.js');
		SyntaxHighlighter.config.strings.aboutDialog = finalQuery;
		SyntaxHighlighter.config.strings.help = '{}';
		SyntaxHighlighter.all();
		
	},
	createWhereID: function(hexDigits){
	    var s = [];
	    for (var i = 0; i < 36; i++) {
	        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	    }
	    s[14] = "4";
	    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
	    s[8] = s[13] = s[18] = s[23] = "-";
	    
	    var uuid = s.join("");
	    return uuid;
	},
	getDeepAllLeafNode : function(node)
	{
		debugger;
		var allNodes = new Array();
		
		if (node.isLeaf()) {
			return node;
		} else {
			node.eachChild(function(Mynode) {
				if(Mynode.data.hasOwnProperty('whereConfig')){
					var whereConfig = Mynode.data.whereConfig;
					if(whereConfig.andor!=""){
						allNodes = allNodes.concat({relation:whereConfig.andor});
					}
					}
				allNodes = allNodes.concat(this.getDeepAllChildNodes(Mynode));
			}, this);
		}
		return allNodes;
	},
	getDeepAllChildNodes : function(node)
	{
		debugger;
		var _conditionDef ={};
		if(node.data.hasOwnProperty('whereConfig')){
			debugger;	
			var whereConfig = node.data.whereConfig;
			var left = whereConfig.leftFieldConfig;
			var right = whereConfig.rightFieldConfig;
			
			_conditionDef = {
				left:{
					name : (right.fieldType == 'isStatic')?"": left.fieldConfig.fieldName,
					value :left.fieldValue,
					dataType:  (left.fieldType == 'isStatic')?"":left.fieldConfig.dataType,
					displayName : (left.fieldType == 'isStatic')?"":left.fieldConfig.displayJson.DisplayName,
					widget: (left.fieldType == 'isStatic')?"":left.fieldConfig.displayJson.Widgets,
					alias:  (left.fieldType == 'isStatic')?"":left.entConfig.name,
		            placeHolder:  (left.fieldType == 'isStatic')?"":left.fieldConfig.fieldName
				},
				operator : whereConfig.operator,
				right:{
					name : (right.fieldType == 'isStatic')?"":right.fieldConfig.fieldName,
					value :right.fieldValue,
					dataType: (right.fieldType == 'isStatic')?"": right.fieldConfig.dataType,
					displayName : (right.fieldType == 'isStatic')?"":right.fieldConfig.displayJson.DisplayName,
					widget: (right.fieldType == 'isStatic')?"":right.fieldConfig.displayJson.Widgets,
					alias:  (right.fieldType == 'isStatic')?"":right.entConfig.name,
		            placeHolder:  (right.fieldType == 'isStatic')?"":right.fieldConfig.fieldName
				}
			
			};
		}
		var allNodes = new Array();
	
		if (!node.hasChildNodes()) {
			debugger;
			return _conditionDef;
		} else {
			var allChild = new Array();
			debugger;
			
		
			allChild = allChild.concat(_conditionDef);
			
			node.eachChild(function(Mynode) {
				if(Mynode.data.hasOwnProperty('whereConfig')){
				var whereConfig = Mynode.data.whereConfig;
				if(whereConfig.andor!=""){
					allChild = allChild.concat({relation:whereConfig.andor});
				}
				}
				allChild = allChild.concat(this.getDeepAllChildNodes(Mynode));
			}, this);
		
			allNodes = allNodes.concat({
				group : allChild
			});
		}
		return allNodes;
	},
});
