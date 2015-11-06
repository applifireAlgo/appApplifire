Ext.define('Healthsurvey.view.querybuildernewmodel.QueryBuilderController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.query-builder',
	requires:['Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.QueryFieldsStore',
	          'Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.QueryEntitiesStore',
	          'Healthsurvey.view.querybuildernewmodel.queryentitiesjoins.EntityJoinStore',

	          ],
	entTreePanel:null,
	entRelationPanel:null,
	queryConditionGrid:null,
	querySelectTree : null,	
	queryWhereTree :null,
	queryBuilderPanel : null,
	queryFromTree:null,
	nameQueryPanel : null,
	queryGroupByTree:null,
	noOfConditions :0,
	queryType:1,
	finalNamedQuery :null,
	floatingEntCommonRadio :null,
	queryWhereConditionGrid : null,
	queryStructureTree:null,
	queryWhereClauseWindow:null,
	
	config: {
	        entities: '',
	        fields: '',
	        joins: '',
	        conditions:''
	},
	init:function(){
		this.nameQueryPanel = this.getView().down('#nameQueryPanel');
		this.queryBuilderPanel = this.getView();
	},    
	
	/***<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<GROUP BY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>**/
	addGroupByField : function(entity,field){
		
	},
	onSearchBoxSelect:function( searchbox, records, eOpts ){
			
			this.entTreePanel.controller.onSearchBoxSelect( searchbox, records, eOpts);
	},
	onSelectBoxSelect:function( searchbox, records, eOpts ){
		
			this.querySelectTree.controller.onSearchBoxSelect( searchbox, records, eOpts);
	},
	onFromBoxSelect :function( searchbox, records, eOpts ){
		
		this.queryFromTree.controller.onSearchBoxSelect( searchbox, records, eOpts);
	},
	onWhereBoxSelect :function( searchbox, records, eOpts ){
		
			this.queryWhereTree.controller.onSearchBoxSelect( searchbox, records, eOpts);
	},
	onGroupByBoxSelect :function( searchbox, records, eOpts ){
		
		this.queryGroupByTree.controller.onSearchBoxSelect( searchbox, records, eOpts);
	},
	
	/**Form and Display Query Output...**/
	openQueryDetailWindow : function(saveBtn){
		debugger;
		var fields = this.queryStructureTree.controller.queryJson.fields;
		var rootNode = this.queryStructureTree.getRootNode();
		var fromNode = rootNode.findChild('nodeType','isFrom');
		
		var queryName =  this.getView().down('#txtQueryName').getValue(); 
		if(fromNode.childNodes.length < 1){
			Ext.Msg.alert("Info",
			"Please select any entity build query!");
		}else
		if(fields.length < 1){
			Ext.Msg.alert("Info",
			"Please select any entity field to build query!");
		}else if(queryName == ""){
			Ext.Msg.alert("Info",
			"Please enter query name!");
		}
		else{
			
		var queryWindow = Ext.create('Healthsurvey.view.querybuildernewmodel.querydetail.QueryDetail');
		
		queryWindow.controller.setMainQBCntrl(this.getView());
		queryWindow.controller.setQueryEntity(this.entities);
		this.queryBuilderPanel.add(queryWindow).showAt();
		}
	},
	//opp
	
	closeQueryDetailWindow : function(saveBtn){
		
		var queryWindow = Ext.create('Healthsurvey.view.querybuildernewmodel.querydetail.QueryDetail');
		queryWindow.show();
	},
	resetQueryBuilder : function(){
		Ext.Msg.confirm('Confirmation','Do you want to reset query?', function(e)
		    	{
    	if((e=='yes')){
    	
    		var drawSurface = this.entRelationPanel.down('draw').getSurface();
    		drawSurface.removeAll();
    		drawSurface.renderFrame();
    		
    		
    		this.entRelationPanel.down('window');
    		//this.entRelationPanel.removeAll(true);
    		
    		/**Reset all stores...*/
    		this.entities.removeAll(true);
    		this.fields.removeAll(true);
    		this.joins.removeAll(true);
    		
    		/**Regenrate query...*/
    		this.displayQueryOutput();
    	}
    	},this);
		
	},

	saveQuery : function (){
		
	},
	onNewBtn:function(newBtn){
		
		var txtQuryName = this.queryBuilderPanel.down('#txtQueryName');
		var queryType = this.queryBuilderPanel.down('#queryType');
		var entSearchBox  = this.queryBuilderPanel.down('#entSearchBox');
	//	var queryTabPanel  = this.queryBuilderPanel.down('#queryTabPanel');
		
		var cancelBtn = this.queryBuilderPanel.down('#cancelBtn');
		var saveBtn = this.queryBuilderPanel.down('#saveBtn');
		var resetBtn = this.queryBuilderPanel.down('#resetBtn');
		var executeBtn = this.queryBuilderPanel.down('#executeBtn');

		txtQuryName.setHidden(false);
		queryType.setHidden(false);
		//queryTabPanel.setHidden(false);
		this.entTreePanel.setDisabled(false);
		entSearchBox.setDisabled(false);
		newBtn.setDisabled(true);
		cancelBtn.setDisabled(false);
		
		saveBtn.setDisabled(false);
		resetBtn.setDisabled(false);
		executeBtn.setDisabled(false);
		
		executeBtn.setHidden(false);
		saveBtn.setHidden(false);
		resetBtn.setHidden(false);
		
	},
	onCancelBtn :function(cancelBtn){
		
		var txtQuryName = this.queryBuilderPanel.down('#txtQueryName');
		var queryType = this.queryBuilderPanel.down('#queryType');
		var newBtn = this.queryBuilderPanel.down('#newBtn');
		var saveBtn = this.queryBuilderPanel.down('#saveBtn');
		var resetBtn = this.queryBuilderPanel.down('#resetBtn');
		var entSearchBox  = this.queryBuilderPanel.down('#entSearchBox');
	//	var queryTabPanel  = this.queryBuilderPanel.down('#queryTabPanel');
		var executeBtn = this.queryBuilderPanel.down('#executeBtn');
		
		//queryTabPanel.setHidden(true);
		txtQuryName.reset();
		this.entTreePanel.setDisabled(true);
		entSearchBox.setDisabled(true);
		txtQuryName.setHidden(true);
		queryType.setHidden(true);
		newBtn.setDisabled(false);
		cancelBtn.setDisabled(true);
		saveBtn.setDisabled(true);
		resetBtn.setDisabled(true);
		executeBtn.setDisabled(true);
		
		executeBtn.setHidden(true);
		saveBtn.setHidden(true);
		resetBtn.setHidden(true);
	},
	onQueryTypeChkChange :function(queryTypeRadio, newValue, oldValue, eOpts ){
		
		this.queryType=newValue.queryType;
		
	}
});