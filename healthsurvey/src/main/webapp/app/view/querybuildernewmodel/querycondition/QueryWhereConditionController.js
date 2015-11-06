Ext.define('Healthsurvey.view.querybuildernewmodel.querycondition.QueryWhereConditionController', {
	extend : 'Ext.app.ViewController',
	requires:[],
	alias:'controller.query-where-condition',
	queryWhereConditionGrid : null,
	queryBuilder : null,
	newConditionRow :{ condition:'',field:'',operator:'',value:'',leaf: true},
	fieldEditor: null,
	init:function(){
		this.queryWhereConditionGrid = this.getView();
		
		this.queryBuilder = this.queryWhereConditionGrid.up().up().up().up().up();
		this.queryBuilder.controller.queryWhereConditionGrid = this.queryWhereConditionGrid;
	},
	onItemDoubleClick : function(){
		
	},
	beforeCellEdit : function(editor, context, eOpts){
		debugger;
		if(context.record.isRoot()||(context.record.isFirst()&&context.colIdx ==1 && 
				
				context.record.parentNode.isRoot()&&context.record.data.andor=="")){

			return false;
		}
		else if(!context.record.isRoot() && (context.colIdx ==3 || context.colIdx ==1 )){
			return true;
		}
		else{
			var whereClauseWindow = Ext.create('Healthsurvey.view.querybuildernewmodel.querycondition.QueryWhereClauseWindow',{
				queryBuilder : this.queryBuilder,
				requestedEditor :{editor:editor,context:context}
			});
			this.queryBuilder.controller.entRelationPanel.add(whereClauseWindow).show();
				
		}
	},
	onCellEdit :function(editor, context,e){
		
		this.setWhereField(editor,context.rowIdx, context.column.dataIndex,context.record);
		  
	},
	setWhereField :function(requestedEditor,rowIndex,dataIndex,fieldDetail){
		
		var gridstore = this.queryWhereConditionGrid.store;
		
		var rowConfig = gridstore.getAt(rowIndex).data;
		
		switch (dataIndex) {
		case 'leftFieldConfig':
			
			rowConfig[dataIndex]= {
									fieldType:fieldDetail.fieldType,
									fieldValue :fieldDetail.fieldValue,
									fieldConfig: fieldDetail.fieldConfig,
									entConfig:fieldDetail.entConfig
									};
			break;
		case 'rightFieldConfig':
			rowConfig[dataIndex]= {
					fieldType:fieldDetail.fieldType,
					fieldValue :fieldDetail.fieldValue,
					fieldConfig: fieldDetail.fieldConfig,
					entConfig:fieldDetail.entConfig
					};
			
			break;
		case 'andor':
			rowConfig[dataIndex] = rowConfig.andor;
			break;
		case 'operator':
			rowConfig[dataIndex] = rowConfig.operator;
			break;
	
		default:
			break;
		}
		this.queryWhereConditionGrid.reconfigure();
		
		var rootNode = this.queryBuilder.controller.queryStructureTree.getRootNode();
		var whereNode = rootNode.findChild('isWhere',true);
	
		
		if(rowConfig.leftFieldConfig.hasOwnProperty('entConfig') && rowConfig.leftFieldConfig.hasOwnProperty('fieldConfig')
				&& rowConfig.rightFieldConfig.hasOwnProperty('entConfig') && rowConfig.rightFieldConfig.hasOwnProperty('fieldConfig')
				&& rowConfig.operator!=""){
			/*var _conditionExpression = rowConfig.andor +" "+ rowConfig.leftFieldConfig.fieldValue+" "+rowConfig.operator+" "+rowConfig.rightFieldConfig.fieldValue;
			rowConfig['_conditionExpression'] = _conditionExpression;*/
			
			this.queryBuilder.controller.queryStructureTree.controller.whereCondition(whereNode,null,'_connId',rowConfig._connId,'remove');
			this.queryBuilder.controller.queryStructureTree.controller.addNewCondition(rowConfig);
			/**Update query structure tree...*/
			//this.queryBuilder.controller.queryStructureTree.controller.updateWhereCondtion(whereNode,rowConfig);
			this.queryWhereConditionGrid.reconfigure();
		}
	},
	deleteWhereCondition : function(treegrid, rowIndex, colIndex){
		this.queryWhereConditionGrid.setSelection(rowIndex);
		var targetNode = this.queryWhereConditionGrid.getSelection()[0];
		var _connIdDelete = targetNode.data._connId;
		
		targetNode.parentNode.removeChild(targetNode);
		
		var rootNode =this.queryBuilder.controller.queryStructureTree.getRootNode();
		var whereNode = rootNode.findChild('nodeType','isWhere');
		this.queryBuilder.controller.queryStructureTree.controller.whereCondition(whereNode,null,'_connId',targetNode.data._connId,'remove');
	},
	addWhereCondition:function(treegrid, rowIndex, colIndex){
		
		this.queryWhereConditionGrid.setSelection(rowIndex);
		var targetNode = this.queryWhereConditionGrid.getSelection()[0];
		var _connId =  this.createCONNID("09876vwxyz");
		var totalData = this.queryWhereConditionGrid.store.data;
		debugger;
		var structRoot =this.queryBuilder.controller.queryStructureTree.getRootNode();
		var whereNode = structRoot.findChild('nodeType','isWhere');
		var andor ='AND';
		if(!whereNode.hasChildNodes()){
			andor = '';
		};
		var whereConfig =  { 
						text:'Condition'+(totalData)?totalData.length:0,
						icon:'images/table_link.png',
						_connId :_connId,
						isRootCondition :targetNode.isRoot(),
						_parentConnId :!targetNode.isRoot()?targetNode.data._connId:'isWhereRoot',
						andor:andor,
						leftFieldConfig:{},
						operator:'',
						rightFieldConfig:{},
						leaf: true
					};
		var child = targetNode.appendChild(whereConfig);
		
		this.queryWhereConditionGrid.selectPath(child.getPath());
		this.queryWhereConditionGrid.expandNode(child,true);
		
		this.queryWhereConditionGrid.reconfigure();
		
	//**Add new node to structure tree as well...*/
	//	this.queryBuilder.controller.queryStructureTree.controller.addNewCondition(whereConfig);
	},
	createCONNID: function(hexDigits){
	    var s = [];
	    for (var i = 0; i < 36; i++) {
	        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	    }
	    s[14] = "4";
	    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
	    s[8] = s[13] = s[18] = s[23] = "#";
	    
	    var uuid = s.join("");
	    return uuid;
	}
});