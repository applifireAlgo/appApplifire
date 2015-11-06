Ext.define('Healthsurvey.view.querybuildernewmodel.querycondition.QueryWhereClauseWindowController', {
	extend : 'Ext.app.ViewController',
	requires:[],
	alias:'controller.query-where-clause-window',
	queryWhereClauseWindow : null,
	queryWhereFieldsTree :null,
	queryBuilder : null,
	requestedEditor:null,
	fieldValue : null,
	fieldType:null,
	init : function(){
		this.queryWhereClauseWindow = this.getView();
		
		/**Main query builder controller is comming from window view...*/
		this.queryBuilder = this.queryWhereClauseWindow.queryBuilder;
		/**Calling editor to return value*/
		this.requestedEditor = this.queryWhereClauseWindow.requestedEditor;
		
		/**Load entity and fields in tree*/
		this.queryWhereFieldsTree = this.queryWhereClauseWindow.down('#query-where-fields');
		this.fieldValue = this.queryWhereClauseWindow.down('#relValue');
		this.fieldType = this.queryWhereClauseWindow.down('#fieldType');
		
		this.initWhereFieldsTree();
	},
	initWhereFieldsTree : function(){
		
		var structureTree = this.queryBuilder.controller.queryStructureTree;
		var queryStructreStore = structureTree.controller.queryStructreStore;
		var fromRecord = queryStructreStore.findRecord('type','isFrom');
		if(fromRecord && fromRecord.data.queryconfig.length > 0)
		//var _Qconfigs = fromRecord.data.queryconfig;
			
				for (var i = 0; i < fromRecord.data.queryconfig.length; i++) {
					var _qCon = fromRecord.data.queryconfig[i];
					
					if(_qCon.hasOwnProperty('entConfig')&&!_qCon.hasOwnProperty('fieldConfig') )
					{	
						this.whereSelectEntityNode(_qCon.entConfig,'add');
						
					}
					else if(_qCon.hasOwnProperty('entConfig')&&_qCon.hasOwnProperty('fieldConfig') ) {
						
						this.whereSelectFieldNode(_qCon.entConfig,[_qCon.fieldConfig],'add');
					}
				}
		
		
	},
	assignWhereFieldDetail :function(){
		var rowIndex = this.requestedEditor.editor.context.rowIdx;
		var dataIndex = this.requestedEditor.editor.context.column.dataIndex;
		
		var selField = this.queryWhereFieldsTree.getSelection()[0];
		var fieldValue = this.fieldValue.getValue();
		var fieldTypeId=this.fieldType.getValue().fieldType;
		
		var fieldType ;
			if(fieldTypeId==0){
				fieldType='isReference';
			}
			else if (fieldTypeId==1){
				fieldType='isDynamic';
			}
			else if (fieldTypeId==2){
				fieldType='isStatic';
			}
			
		var fieldDetail ={
				fieldType:fieldType,
				fieldValue :fieldValue==""?'""':fieldValue,
				entConfig :{},
				fieldConfig:{}
			};
	
		if(selField)
			{
			var selRecord =selField.data;
			
			if(selRecord.hasOwnProperty('isField')&& selRecord.isField){
				
			fieldDetail.entConfig =selRecord.entConfig;
			fieldDetail.fieldConfig= selRecord.fieldConfig;
			}
			
		}
		
		this.queryBuilder.controller.queryWhereConditionGrid.controller.setWhereField(this.requestedEditor,rowIndex,dataIndex,fieldDetail);
		this.queryWhereClauseWindow.close();
	},
	onItemClick : function( fieldTree, record, item, index, e, eOpts ){
		
		var treeRecord = record.data;
		if(treeRecord.hasOwnProperty('isField')&& treeRecord.isField){
			var fldType = this.fieldType.getValue().fieldType;
			var entConfig =treeRecord.entConfig,fieldConfig= treeRecord.fieldConfig;
			
			switch (fldType) {
			case 0:
				this.fieldValue.setValue(entConfig.name.replace(" ","").toLowerCase()+"."+fieldConfig.fieldName);	
				break;
			case 1:
				this.fieldValue.setValue(":"+fieldConfig.fieldName);
				break;

			default:
				break;
			}
		
		}
		
		
	},
	onFieldTypeChkChange : function(fieldTypeRadio, newValue, oldValue, eOpts ){
		
		var selField = this.queryWhereFieldsTree.getSelection()[0];
		switch (newValue.fieldType) {
		case 0:

			this.queryWhereFieldsTree.setDisabled(false);
			this.fieldValue.reset();
			this.fieldValue.setDisabled(true);
			
		
			if(!selField){
				Ext.Msg.alert("Info","Please select any field for reference.");
			}
			else{
				var selRecord = selField.data;
				if(selRecord.hasOwnProperty('isField')&& selRecord.isField){
					var entConfig =selRecord.entConfig,fieldConfig= selRecord.fieldConfig;
				
				var fieldName = fieldConfig.fieldName;
				var entName = entConfig.name;
				
				this.fieldValue.setValue(entName.replace(" ","").toLowerCase()+"."+fieldName);
				}
			}
			break;
		case 1:

			this.queryWhereFieldsTree.setDisabled(false);
			this.fieldValue.reset();
			this.fieldValue.setDisabled(true);
			
		
			if(!selField){
				Ext.Msg.alert("Info","Please select any field for dynamic value.");
			}
			else{
				var fieldName = selField.data.fieldConfig.fieldName;
				this.fieldValue.setValue(":"+fieldName);
				
			}
			break;
		case 2:
			
			
			this.queryWhereFieldsTree.setDisabled(true);
			this.fieldValue.setDisabled(false);
			this.fieldValue.reset();
			
			
			break;

		default:
			break;
		}
	},
	whereSelectEntityNode : function(entConfig,action){
		
		var rootNode =this.queryWhereFieldsTree.getRootNode();
			
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
	whereSelectFieldNode : function(entConfig,fieldConfigs,action){
		
		var rootNode =this.queryWhereFieldsTree.getRootNode();
		var entNode = rootNode.findChild('entId',entConfig.id);
		
		if(entNode)
		{	
		switch (action) {
		case 'add':
			
			for(var i = 0;i<fieldConfigs.length;i++ ){
				var fieldConfig = fieldConfigs[i];
				
				entNode.appendChild(
						{
							text: fieldConfig.fieldName,
							isField :true,
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
		this.queryWhereFieldsTree.store.sort('fieldOrder','ASC');
		}
		else{
			
			console.log('Entity not found to add/remove/update selectfeiled!!');
		}
	},
});