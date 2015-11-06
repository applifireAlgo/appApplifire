Ext.define('Healthsurvey.view.querybuildernewmodel.querycondition.QueryWhereClauseWindow', {
	extend : 'Ext.window.Window',
	requires:['Healthsurvey.view.querybuildernewmodel.querycondition.QueryWhereClauseWindowController',
	        //  'Healthsurvey.view.querybuildernewmodel.querycondition.QueryWhereCondition'
	          ],
	controller:'query-where-clause-window',
	xtype : 'query-where-clause-window',
	itemId : 'query-where-clause-window',
	height:400,
	width:400,
	queryBuilder:null,
	closeAction:'hide',
	constrain:true,
	title:'Where Clause',
	layout:'border',
	requestedEditor:null,
	defaults:{
		border:2,
		margin:3
	},
	items:[
	       {
	    	   region:'west',
	    	   title:'Field',
	    	   collapsible : true,
	   		   collapsed : false,
	   		   height:'80%',
	   		   hidden:false,
	   		   width:'60%',
	   		   layout:'fit',
	   		   items:[
	   		          {
	   		        	  xtype : 'treepanel',
	   		        	  itemId : 'query-where-fields',
	   		        	  useArrows:true,
	   		        	  rootVisible: false,
	   		        	  mode:'SINGLE',
	   		        	  loadMask :	true,
	   		        	  folderSort :true,
	   		        	  title: '',
	   		        	 
	   		        	  autoScroll:true,
	   		        	  queryBuilder:null,
	   		        	  listeners:{
	   		        		itemclick :'onItemClick'
	   		        	  }
	   		   }],
	       },
	       {
	    	   region:'center',
	    	   title:'Function',
	    	   collapsible : true,
	   		   collapsed : false,
	       },
	       {
	    	   region:'south',
	    	   title:'',
	    	  /* collapsible : true,
	   		   collapsed : false,*/
	   		   hidden:false,
	   		   height:'20%',
	   		   width:'100%',
	   		   items:[{
		        	xtype : 'radiogroup',
		        	name:'Value Type : ',
		        	itemId : 'fieldType',
		        	fieldLabel : '',
		        	columns : 3,
		        	margin:'0 10 0 10',
		        	defaults:{},
		        	vertical : true,
			    items:[
			           	{
			           	boxLabel : 'Reference',
			           	name : 'fieldType',
			           	margin:'0 0 0 10',
			           	inputValue : 0,
			           	checked : true,
			           	},
				 {
					boxLabel : 'Dynamic',
					name : 'fieldType',
					margin:'0 0 0 10',
					inputValue : 1,
					checked : false,
				} ,{
					boxLabel : 'Static',
					name : 'fieldType',
					margin:'0 0 0 10',
					inputValue : 2,
					checked : false,
				}],
				listeners:{
					change:'onFieldTypeChkChange'
				}}, {
					xtype : 'textfield',
					itemId : 'relValue',
					width:'90%',
					margin:'0 40 0 20 ',
					//fieldLabel:'Field Value',
					allowBlank : false,
					disabled:true,
					emptyText : 'Enter value',
					forceSelection : true
				}]
	       }
	],
	buttons:[{
		text:'Set',
		handler:'assignWhereFieldDetail'
	}]
});