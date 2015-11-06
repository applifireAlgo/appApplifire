Ext.define('Healthsurvey.view.chartbuilder.rightpanel.RightPanelController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.rightpanelcontroller',
    chartMainView:null,
    panel:null,
    
    afterRender:function()
    {
    	this.chartMainView=this.getView().up();
    },
    
    onPropertyClick:function(source, recordId, value, oldValue, eOpts)
    {
		debugger;
		var centerChartPanel=this.chartMainView.down('#chartPanel');
		var a=new FusionCharts(centerChartPanel.jsonObject);
		a.render(centerChartPanel.body.id);
		centerChartPanel.doLayout();	
	},
	
	loadPanelItems:function(panel,panelItems)
	{
		this.panel=panel;
		
		var all=panel.query("[comboType=all]");
		for(var i=0;i<all.length;i++)
		{
			var allCombo=all[i];
			allCombo.store=this.getComboStore();
			allCombo.getStore().loadData(this.chartMainView.gridConfigStore.data.items,true);
		}
		var numericComboall=panel.query("[comboType=numeric]");
		for(var i=0;i<numericComboall.length;i++)
		{
			var numericCombo=numericComboall[i];
			numericCombo.store=this.getComboStore();
			numericCombo.getStore().loadData(this.formatNumericData(this.chartMainView.gridConfigStore,numericCombo.getStore()),true);
			//numericCombo.getStore().loadData(this.formatNumericData(this.chartMainView.gridConfigStore,numericCombo.getStore()),true);
		}
		var dateCombo=panel.query("[comboType=date]");
		if(dateCombo.length > 0)
		{
			for(var x=0;x<dateCombo.length ;x++){
				dateCombo[x].store=this.getComboStore();
				dateCombo[x].getStore().loadData(this.formatDateData(this.chartMainView.gridConfigStore,dateCombo[x].getStore()),true);
			}
		}
		var aggCombo=panel.down("#aggCombo");
		if(aggCombo!=undefined)
		{
			aggCombo.store=this.getAggregateComboStore();
		}
		var criteriaCombo=panel.down("#criteriaCombo");
		if(criteriaCombo!=undefined)
		{
			criteriaCombo.store=this.getCriteriaComboStore();
		}
		var criteriamulti=panel.down("#crtMultiCriteria");
		if(criteriamulti!=undefined)
		{
			criteriamulti.store=this.getCriMultiComboStore();
		}
		var timeinterval=panel.down("#timeinterval");
		if(timeinterval!=undefined)
		{
			timeinterval.store=this.getTimeIntervalStore();
			timeinterval.setValue("6")
		}

		this.bindEvent(panel);
	},
	
	/** Row Column data radio click functionality*/
	afterRowFieldSetRender:function(field)
	{
		field.getEl().on('click', this.rowFieldRadioClick, this);
	},
	rowFieldRadioClick:function(fieldset,opts)
	{
		debugger;
		if(opts.hasAttribute("type") &&  opts.getAttribute("type") == "radio")
		{
			rowFieldSet=this.panel.down("#rowDataFieldSet");
			rowFieldSet.setDisabled(false);
			colFieldset=this.panel.down("#colDataFieldSet");
			colFieldset.setDisabled(true);
		}
	},
	afterColFieldSetRender:function(field)
	{
		field.getEl().on('click', this.colFieldRadioClick, this);
	},
	colFieldRadioClick:function(fieldset,opts)
	{
		debugger;
		if(opts.hasAttribute("type") &&  opts.getAttribute("type") == "radio")
		{
			rowFieldSet=this.panel.down("#rowDataFieldSet");
			rowFieldSet.setDisabled(true);
			colFieldset=this.panel.down("#colDataFieldSet");
			colFieldset.setDisabled(false);
		}
	},
	/***/
	/*
	 * used to bind event to  criteria radio button to enable and disable Single and multiple component based on radio button
	 */
	bindEvent:function(panel){
		if(panel.down("#reportFormRadio") != undefined){
			/*
			 * assign id to radio group button
			 */
			var items=panel.down("#reportFormRadio").items.items;
			for(var x=0;x<items.length;x++){
				items[x].name="criteria"+this.getView().id;
			}
			var criteriaRadio=panel.down("#reportFormRadio");
			criteriaRadio.on("change",this.changeCriteria);
		}
			
		
	},
	changeCriteria:function(field, newValue, oldValue){
		 if(field.getChecked()[0].inputValue == "single"){
			 field.up().down("#multiCriteria").hide();
	       	 field.up().up().down("#criteriaCombo").show();
	     }else{
	    	 field.up().down("#multiCriteria").show();
	       	  field.up().up().down("#criteriaCombo").hide();
       	 
         }
	},
	ganttTimeCheck:function(field, newValue, oldValue){
		if(newValue == true){
			 field.up().up().down("#timeinterval").show();
		}else{
			field.up().up().down("#timeinterval").hide();
		}
			
		debugger;
	},
	getComboStore : function(rptBuilderActiveTab) //Store structure same as GridConfig store structure
	{
		return Ext.create('Ext.data.Store', {
			autoLoad : true,
			fields : [ {
				name : "name",
				type : "string"
			}, {
				name : "displayName",
				type : "string"
			}],
			data : []
		});
		;
	},
	
	getAggregateComboStore:function()
	{
		return Ext.create('Ext.data.Store', {
			autoLoad : true,
			fields : [ {
				name : 'aggregate_value',
				type : 'string'
			}, {
				name : 'aggregate_name',
				type : 'string'
			} ],
			data:[
			      {aggregate_value:"Sum",aggregate_name:"Sum"},
			      {aggregate_value:"Min",aggregate_name:"Min"},
			      {aggregate_value:"Max",aggregate_name:"Max"},
			      {aggregate_value:"Avg",aggregate_name:"Avg"},
			      {aggregate_value:"Count",aggregate_name:"Count"}
			]
		});
	},
	getCriMultiComboStore:function()
	{
		return Ext.create('Ext.data.Store', {
			autoLoad : true,
			fields : [ {
				name : "name",
				type : "string"
			}, {
				name : "displayName",
				type : "string"
			}],
			data:[
			      {displayName:"Top",name:"top"},
			      {displayName:"Bottom",name:"bottom"},
			      {displayName:"Less than",name:"less"},
			      {displayName:"Less than eq",name:"lesse"},
			      {displayName:"Greater than",name:"greater"},
			      {displayName:"Greater than eq",name:"greatere"}
			]
		});
	},
	getTimeIntervalStore:function()
	{
		return Ext.create('Ext.data.Store', {
			autoLoad : true,
			fields : [ {
				name : "name",
				type : "string"
			}, {
				name : "value",
				type : "string"
			}],
			data:[
			      {value:"1",name:"1"},
			      {value:"3",name:"3"},
			      {value:"6",name:"6"},
			      {value:"8",name:"8"},
			    
			]
		});
	},
	getCriteriaComboStore:function()
	{
		return Ext.create('Ext.data.Store', {
			autoLoad : true,
			fields : [ {
				name : 'criteria_value',
				type : 'string'
			}, {
				name : 'criteria_name',
				type : 'string'
			} ],
			data:[
			      {criteria_value:"Min",criteria_name:"Min"},
			      {criteria_value:"Max",criteria_name:"Max"}
			]
		});
	},
	
	formatNumericData: function(store, existFields) 
	{
		var data = [];
		Ext.Array.each(store.data.items,function(item) 
				{
					debugger;
					if(item.data.dataType.toUpperCase()=="INT" || item.data.dataType.toUpperCase()=="FLOAT"
						|| item.data.dataType.toUpperCase()=="DECIMAL" || item.data.dataType.toUpperCase()=="DOUBLE")
					{
							data.push(item.data);
					}
				},{
					 data : data,
					 existFields : existFields
		});
		return data;
	},
	formatDateData: function(store, existFields) 
	{
		var data = [];
		Ext.Array.each(store.data.items,function(item) 
				{
					debugger;
					if(item.data.dataType.toUpperCase()=="DATE" || item.data.dataType.toUpperCase()=="DATETIME"	)
					{
							data.push(item.data);
					}
				},{
					 data : data,
					 existFields : existFields
		});
		return data;
	},
});
