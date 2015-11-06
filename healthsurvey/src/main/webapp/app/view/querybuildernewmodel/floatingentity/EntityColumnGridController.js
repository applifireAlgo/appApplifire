Ext.define('Healthsurvey.view.querybuildernewmodel.floatingentity.EntityColumnGridController',
{
	extend : 'Ext.app.ViewController',
	 requires:['Ext.view.*'],
	alias : 'controller.entity-column-grid',
	entRelationPanel:null,
	entColumnGrid:null,
	queryBuilder: null,
	init:function(){
		
		this.entColumnGrid = this.getView();
		this.entRelationPanel = this.entColumnGrid.up().up();
		this.queryBuilder =  this.entRelationPanel.up().up();
		
	},
	onRender:function(columnGrid){
		columnGrid.dragZone = new Ext.view.DragZone({
               view: columnGrid,
               ddGroup: 'entityRelationDD',
               dragText: '{0} selected table column{1}',
           
           });
		columnGrid.dragZone.dropZone = new Ext.grid.ViewDropZone({
              view: columnGrid,
              ddGroup: 'entityRelationDD',
              handleNodeDrop: function(data, record, position){
              },
              onNodeOver: function(node, dragZone, e, data){
                  var me = this, view = me.view, pos = me.getPosition(e, node), overRecord = view.getRecord(node), draggingRecords = data.records;
                  
                  if (!Ext.Array.contains(data.records, me.view.getRecord(node))) {
                      if (!Ext.Array.contains(draggingRecords, overRecord) && data.records[0].get('field') != '*') {
                          me.valid = true;
                      }
                      else {
                          me.valid = false;
                      }
                  }
                  return me.valid ? me.dropAllowed : me.dropNotAllowed;
              },
              onContainerOver: function(dd, e, data){
                  var me = this;
                  me.valid = false;
                  return me.dropNotAllowed;
              }
          });
	
	
	},
	onAdded: function( grid, container, pos, eOpts ){
		
		var  cloneData = Ext.decode(Ext.encode(container.store.getAt(0).data));
		Ext.iterate(cloneData,function(attr){
			
			if(attr == 'fieldName'){
				this.cloneData[attr]="All";
			}
			else if(attr == 'dataTypePrecision'){
				this.cloneData[attr]="*";
			}
			else{
				this.cloneData[attr]="";
			}
			
		},{cloneData:cloneData});
		container.store.insert(0,cloneData);
	},
	onRowSelect :function(){
	},
	onRenderer:function(){
		
	},
	onSelect: function(entColumnGrid, record, index, eOpts ){
		var entConfig = this.entColumnGrid.up().entConfig;
		
		this.queryBuilder.controller.querySelectTree.controller.selectFieldNode(entConfig,[record.data],'add');
		
		this.queryBuilder.controller.queryGroupByTree.controller.groupByFieldNode(entConfig,[record.data],'add');
		
		this.queryBuilder.controller.queryStructureTree.controller.fieldNode('isSelect',entConfig,[record.data],'add');
		
	},
	onDeselect:function( entColumnGrid, record, index, eOpts ){
		var entConfig = this.entColumnGrid.up().entConfig;
		
		this.queryBuilder.controller.querySelectTree.controller.selectFieldNode(entConfig,[record.data],'remove');
		this.queryBuilder.controller.queryGroupByTree.controller.groupByFieldNode(entConfig,[record.data],'remove');
		this.queryBuilder.controller.queryStructureTree.controller.fieldNode('isSelect',entConfig,[record.data],'remove');
	
	},
	onBeforeDrop:function( node, data, dropRec, dropPosition, dropHandlers, e){
		
		data['sourceEntity'] = data.view.up().up();
		
	},
	changeChecked : function(checked){
		
	},
	showJoinCM : function(event, el){
        var cm;
        
        // stop the browsers event bubbling
       // event.stopEvent();
        // create context menu
        cm = Ext.create('Ext.menu.Menu', {
            items: [{
                text: 'Remove Join',
               // icon: 'resources/images/remove.gif',
               // handler: Ext.Function.bind(function(){}, this)
            }, {
                text: 'Close Menu',
               // icon: 'resources/images/cross.gif',
               // handler: Ext.emptyFn
            }]
        });
        
        // show the contextmenu next to current mouse position
       cm.show();
        // cm.showAt(event.getXY());
    },
	 onDrop: function(node, data, dropRec, dropPosition,dropHandlers,e) {
		 var targetEntity = this.getView().up();
		 var sourceEntity = data.sourceEntity;
		 
		 var connection;
		 var sourceEntityDataAt = data.item.getAttribute('data-recordindex');
		 var targetEntityDataAt = node.getAttribute('data-recordindex');
		 
		 var leftFieldConfig = sourceEntity.down('grid').store.getAt(sourceEntityDataAt).data;
		 var rightFieldConfig = targetEntity.down('grid').store.getAt(targetEntityDataAt).data;
		 
		 var leftEntName = sourceEntity.entConfig.name.replace(" ","").toLowerCase();
		 var rightEntName = targetEntity.entConfig.name.replace(" ","").toLowerCase();
		 
		 if(sourceEntity == targetEntity)
		 	{
			 return false;
		 	}
		 else{
			 var aBBPos = [sourceEntityDataAt, targetEntityDataAt];
			 
			 connection = this.entRelationPanel.controller.connection(sourceEntity.shadowSprite,targetEntity.shadowSprite, "'#0B6121'", aBBPos);
			
			 if(connection){
			 
			 sourceEntity.connectionUUIDs.push(connection.uuid);
			 targetEntity.connectionUUIDs.push(connection.uuid);
			 
			 /**Add INNER join as where condition to where node in structure tree... */
				var rootNode = this.queryBuilder.controller.queryStructureTree.getRootNode();
				var whereNode = rootNode.findChild('isWhere',true);
				var andor = whereNode.hasChildNodes()?'AND':'';
				
				var _connID = connection.uuid;//this.createCONNID("987456asbcde");
				var whereConfig = {
					 isRootCondition :true,
					 _parentConnId :'isWhereRoot',
					 leftFieldConfig : {
						 				fieldType:'isReference',
										fieldValue :leftEntName+"."+ leftFieldConfig.fieldName,
										entConfig:sourceEntity.entConfig,
										fieldConfig:leftFieldConfig},
										
					 rightFieldConfig : {fieldType:'isReference',
										fieldValue :rightEntName+"."+ rightFieldConfig.fieldName,
										entConfig:targetEntity.entConfig,fieldConfig:rightFieldConfig},
					 operator:'=',
					 andor:andor,
					 _connId :_connID,
					 joinConnection:connection
					 
				};
				
				this.queryBuilder.controller.queryStructureTree.controller.addNewCondition(whereConfig);
			 
		//	 connection.line.on('contextmenu', this.showJoinCM(), this);
			 }
		 }
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