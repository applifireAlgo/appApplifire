Ext.define('Healthsurvey.view.querybuildernewmodel.floatingentity.FloatingEntityController',
{
			extend : 'Ext.app.ViewController',
			alias : 'controller.floating-entity',
			requires:['Healthsurvey.view.querybuildernewmodel.floatingentity.EntityColumnGrid',
			          'Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.Query',
			          'Healthsurvey.view.querybuildernewmodel.floatingentity.EntitySprite',
			          'Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.QueryEntitiesStore',
			          'Ext.draw.*'],
			entRelationPanel:null,
			floatingEntity:null,
			queryBuilder : null,
			startpoints:[],
			init:function(){
				this.floatingEntity= this.getView();
				this.entRelationPanel = this.floatingEntity.up();
				this.queryBuilder = this.entRelationPanel.up().up();
				this.floatingEntity.connectionUUIDs = [];
			},
			initFloatingEntity : function() {
				
				var entMask = new Ext.LoadMask({
				    msg    : 'Loading...',
				    target : this.floatingEntity
				}).show();
				
				Ext.Ajax.request({
					url : "secure/buzzorapp/fetchEntityDetails",
					method : 'POST',
					waitMsg : 'Loading entities...',
					jsonData : {id:this.floatingEntity.entConfig.id},
					scope:this,
					entMask:entMask,
					success : function(response,sender) {
						var scope = sender.scope;
						var floatingEntity = scope.getView();
						var responseJson = Ext.JSON.decode(response.responseText);
						var resp = Ext.JSON.decode(responseJson.response.data);
						var data,fieldList=[];
						
						if(resp && resp.hasOwnProperty('entityInfo')){
							data = resp.entityInfo;
							fieldList = data.awsTableFieldDetails
						}
						
						var gridstore = Ext.create('Ext.data.Store',{
							fields:['fieldName','fieldOrder'],
							autoSync:false,
							data:fieldList,
							sorters:['fieldOrder'],
							sortOnLoad :true
						});
						
						var selectionModel = Ext.create('Ext.selection.CheckboxModel',{
					    	mode: 'SIMPLE',
					        checkOnly: true,
					        queryType:scope.queryBuilder.controller.queryType,
					        /*renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
					        	
					        	if(this.queryType == 1){
					        	//	metaData.column.setDisabled(true);	
					        	}
					        	else{
					        	//	metaData.column.setDisabled(false);
					        	}
					        	
					        },*/
					    	listeners:{
					    		select : 'onSelect',
					    		deselect : 'onDeselect',
					    	}
					    });
						floatingEntity.add(
						{
							xtype:'entity-column-grid',
							itemId:'entityColumnGrid'+floatingEntity.entConfig.id,
							store:gridstore,
							
							hideHeaders:(this.queryBuilder.controller.queryType==1)?true:false,
							selModel :selectionModel,
							columns : [ 
							          {
											xtype : 'gridcolumn',
											flex : 3,
											header:' Select all',
											dataIndex : 'fieldName',
												  renderer: function(val, meta, model){
													  
													  data = model.data;
													  style = "font-weight: bold;font-size:12px;color:#585858;";
													  if(data.isPKey=='true'){
															 //style  = style+'background-image:url(images/icon/key.png) !important;background-position:2px 3px;background-repeat:no-repeat;';
													  }
													  return '<div><span style="'+style+'">'+data.fieldName+'</span><span style="color:grey;font-size:9px;">'+' '+data.dataType+'('+data.dataTypePrecision+')'+'</span></div>';
										            }
								          }
							          ]
						}
						);
						
						this.queryBuilder.controller.queryStructureTree.controller.fieldNode('isFrom',floatingEntity.entConfig,fieldList,'add');
						/**Add same fields to Group By /**/
						sender.entMask.hide();
						sender.scope.addQueryEntity(sender);
					},
						failure : function(response, sender) {
							sender.entMask.hide();
							var scope = sender.scope;
							var floatingEntity = scope.getView();
							floatingEntity.add({html:'<br><br><br><b>  No fields available!</b>'});
						}
					});
				this.createShadowSprite();
				
				this.floatingEntity.getHeader().el.on('mousedown', this.onMouseDown, this);
				
				/**In case of NAme query add common floating radio as tool...*/
			
				this.addFloatingRadioTool();
			
			},
			addFloatingRadioTool :function(){
				/**Add common radio field for NameQuery*/
				if(this.queryBuilder.controller.queryType == 1){
					
					var floatindRadioGroup = this.queryBuilder.down('#floatindRadioGroup');
					var floatingRadiofield = floatindRadioGroup.items.items.pop();
				
					this.floatingEntity.tools.pop();
					this.floatingEntity.addTool(floatingRadiofield);
				
				}
				/**Add close tool*/
				this.floatingEntity.addTool({
					    type:'delete',
					    tooltip: 'Remove',
					    itemId : 'closeTool',
					    handler:'closeFloatingEntity'
					   
					});
				
			},
			addQueryEntity : function(sender){
				/**Add fields along with entity info to use further...*/
				var colGrid = this.floatingEntity.down('grid');
				var entFields=[];
				var entFieldsConfig=[];
				
				if(colGrid.store.data.length >0){
					
						colGrid.store.data.each(function(row){
					
							this.entFields.push(row.data.fieldName);
							this.entFieldsConfig.push(row.data);
							
						},{entFields:entFields ,entFieldsConfig:entFieldsConfig});
				
				}
				this.floatingEntity['entFields'] = entFields;
				this.floatingEntity['entFieldsConfig'] = entFieldsConfig;
				
			},
			
			onMouseDown:function(){
				
				this.floatingEntity.bMouseDown = true;
			},
			onMouseMove:function(){
				if(this.floatingEntity.bMouseDown){
					var drawContainer = this.entRelationPanel.down('draw');
					var shadowSprite = this.floatingEntity.shadowSprite;
					var parentXY = this.entRelationPanel.getXY();
					var childXY = this.floatingEntity.getXY();
					
					drawContainer.getSurface().setRect([0, 0, this.entRelationPanel.getWidth(), this.entRelationPanel.getHeight()]);
					
					shadowSprite.setAttributes(
							{
								x:childXY[0]-parentXY[0],
								y:childXY[1]-parentXY[1]
							},true);
					
					shadowSprite.repaint();
					debugger;
			        this.reconfigureConnections(shadowSprite);
			       
			        this.floatingEntity.bMouseDown = false;
				}
				
			},
			onMouseUp:function(){
				
			},
			
			onUnfloat:function(){
				
				
			},
			
			createShadowSprite:function(floatingEnt){
			
				var parentXY = this.entRelationPanel.el.getXY();
				var childXY = this.floatingEntity.el.getXY();
			    var childSize = this.floatingEntity.el.getSize();
				var drawContiner = this.entRelationPanel.down('draw');
				var surface = drawContiner.getSurface();
				
				surface.setRect([0, 0, this.entRelationPanel.getWidth(), this.entRelationPanel.getHeight()]);
				
				var shadowSprite= Ext.create('Ext.draw.sprite.Rect');
				
				shadowSprite.setSurface(surface);
				
				shadowSprite.setAttributes(
						{
							bConnections: false,
							x:childXY[0]-parentXY[0],
							y:childXY[1]-parentXY[1],
							height:childSize.height ,
							width: childSize.width,
							fillStyle: 'none',
							surface: surface
						},true);
				
				this.floatingEntity.shadowSprite = surface.add(shadowSprite).show(true);
				
				this.floatingEntity.on('resize', this.onResize, this);
			},
			onResize:function(floatEntity, width, height, e){
				
				floatEntity.shadowSprite.setAttributes({
														width : width,
														height : height,
														x : floatEntity.x,
														y : floatEntity.y
											});
				
				floatEntity.shadowSprite.repaint();
				debugger;
				this.reconfigureConnections(floatEntity);
			},
			reconfigureConnections:function(floatEntity){
				debugger;
				var queryStructureTree = this.queryBuilder.controller.queryStructureTree;
				var rootNode = queryStructureTree.getRootNode();
				var whereNode = rootNode.findChild('isWhere',true);
				this.redrawConnections(whereNode);
			
			},
			redrawConnections:function(whereNode){
				
				whereNode.eachChild(function(wh){
					debugger;if(wh.data.hasOwnProperty('whereConfig') && wh.data.whereConfig.hasOwnProperty('joinConnection')){
						 var whConn = wh.data.whereConfig.joinConnection;
						 if(whConn){
							 
							 this.scope.entRelationPanel.controller.connection(whConn.from,whConn.to,whConn.line,whConn.aBBPos,whConn.uuid,whConn.marker);	 
						 }
						 
						 if(wh.hasChildNodes()){
							 this.scope.redrawConnections(wh);
						 }
						 
					} 
					
				},{scope:this});
				
				
			},
			closeFloatingEntity : function(sender){
				Ext.Msg.confirm('Confirmation','Do you want to remove entity "'+ this.floatingEntity.title+'" ?', function(e)
				   {
		    	if((e=='yes')){
				
			
				/**Remove entity sprite from draw surface...*/
		    	var drawSurface = this.me.entRelationPanel.down('draw').getSurface();
				drawSurface.remove( this.me.floatingEntity.shadowSprite,true);
				drawSurface.renderFrame();

				/**Remove entity from Query Structure...>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.**/
				this.me.queryBuilder.controller.querySelectTree.controller.selectEntityNode(this.me.floatingEntity.entConfig,'remove');
				this.me.queryBuilder.controller.queryFromTree.controller.fromEntityNode(this.me.floatingEntity.entConfig,'remove');
				this.me.queryBuilder.controller.queryGroupByTree.controller.groupByEntityNode(this.me.floatingEntity.entConfig,'remove');
				
				this.me.queryBuilder.controller.queryStructureTree.controller.entityNode(this.me.floatingEntity.entConfig,'remove');
				
				/**Remove all items inside entity...*/
				this.me.floatingEntity.removeAll(true);
				
				/**Remove entity from entRelationPanel....*/
				this.me.entRelationPanel.remove(this.me.floatingEntity,true);
				
				
		    	}},{me:this});
				},
				onFloatingCommonChkChange : function(foatingCommonRadio, newValue, oldValue, eOpts){
					/**For common radio in case of named query*/
					var entGridSelModel;
					var entGrid = this.floatingEntity.down('grid');
					if(entGrid){
						entGridSelModel = entGrid.selModel;	
					}
					if(entGridSelModel){
								
						if(newValue){
							
							entGrid.selModel.selectAll();
						}else{
							
							entGrid.selModel.deselectAll();
						}
					}
				} 
		});