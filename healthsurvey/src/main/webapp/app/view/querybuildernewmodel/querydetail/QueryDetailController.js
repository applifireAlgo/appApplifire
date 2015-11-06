Ext.define('Healthsurvey.view.querybuildernewmodel.querydetail.QueryDetailController',
{
	extend : 'Ext.app.ViewController',
	alias : 'controller.query-detail',
	queryDetailWindow:null,
	queryBuilder : null,
	init:function(){
	
		this.queryDetailWindow = this.getView();
		
	},
	setMainQBCntrl :function(qbCntrl){
		this.queryBuilder = qbCntrl;
	},
	setQueryEntity :function(store){
		var entityList = this.queryDetailWindow.down('#queryEntityGrid');
		debugger;
		//entityList.setStore(this.queryBuilder.controller.entities);
		var queryStructureTree = this.queryBuilder.controller.queryStructureTree;
		var rootNode = queryStructureTree.getRootNode();
		var fromNode = rootNode.findChild('nodeType','isFrom');
		var store = Ext.create('Ext.data.Store', {
			storeId : 'searchStore',
			fields : ['entId','entName','entConfig'],
			data : [],
			sortOnLoad :true
			});


		fromNode.eachChild(function(ent){
			this.store.add({
				entId:ent.data.entConfig.id,
				entName:ent.data.entConfig.name,
				entConfig : ent.data.entConfig});
		},{store:store});
		entityList.setStore(store);
		var namedQueryLabel  = this.queryDetailWindow.down('#jpqlQuery');
		debugger;
		var jpqlQuery = queryStructureTree.controller.JPQL;
		
		namedQueryLabel.setHtml('<pre class="brush : sql">'+jpqlQuery+'</pre>');

		
	},
	clearQueryDetailForm: function(){
		var queryName =  this.queryBuilder.down('#txtQueryName'); 
		queryName.reset();
	},
	/***Save JPQL Named Query...*/
	saveQueryDetailForm : function(){
		var queryDetailValues = this.getQueryDetails();
	
		console.log('Final JSON to be submitted!'+JSON.stringify(queryDetailValues,null,4));
		
		Ext.Ajax.request(
				{
					url : "secure/buzzorapp/queryController/save",
					method : 'POST',
					waitMsg : 'Saving...',
					cache: false , 
					jsonData :Ext.encode(queryDetailValues),
					me:this,
					success : function(response, scope) 
					{
						
						scope.me.queryDetailWindow.close();
						Ext.Msg.alert("Status","Query has been saved sucessfully!");
					},
					failure : function(response, scope) 
					{
						scope.me.queryDetailWindow.close();
						Ext.Msg.alert("Error","Could not save entity!");
					}
				});
	
	},
	getQueryDetails : function(){
		
		var queryDetailForm  = this.queryDetailWindow.down('form');
		var queryStructureCntrl = this.queryBuilder.controller.queryStructureTree.controller;

		if(queryDetailForm.isValid()){
			{
				var entSelected =  this.queryDetailWindow.down('#queryEntityGrid').getSelection()[0];
				var queryName =  this.queryBuilder.down('#txtQueryName'); 
				var queryType =  this.queryBuilder.down('#queryType');
				qtypeChk = queryType.getChecked()[0];
				
				if(queryName == ""){
					Ext.Msg.alert("Info",
					"Please enter entity name!");
				}
				else if(!qtypeChk){
					Ext.Msg.alert("Info",
					"Please select query type!");
				}
				else{
				if(entSelected){
					
				var finalJson = 
				{
						queryId: "",
						name :queryName.getValue(),
						jpqlQuery: queryStructureCntrl.JPQL.replace('\n',''),
						entityJson: "",
						awsTableDetails: {
							    tableId: entSelected.data.entId
						},
						queryType :qtypeChk.typeId,
					    queryJSON: Ext.encode(queryStructureCntrl.queryJson),
					};
				debugger;
					return finalJson;
				}
				else{
					Ext.Msg.alert("Info",
					"Please select query entity!");
				}
				
			}
			}
		}
		
	},
	
	/***queryJson:{
						fields:[{
							name : '',
							dataType: '',
							displayName :'',
							widget:'',
							alias:''
						}],
						where :[{
							field:{
								name : '',
								dataType: '',
								displayName :'',
								widget:'',
								alias:''
							},
							relOperator:'=',
							relValue :'',
							relationField: {
								name : '',
								dataType: '',
								displayName :'',
								widget:'',
								alias:''
							},
							
						}
						],
						join:[{
						operator: 
						}]
					}**/
});