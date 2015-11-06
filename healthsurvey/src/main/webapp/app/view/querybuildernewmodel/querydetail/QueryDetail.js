Ext.define('Healthsurvey.view.querybuildernewmodel.querydetail.QueryDetail', {
	extend : 'Ext.window.Window',
	requires:['Healthsurvey.view.querybuildernewmodel.querydetail.QueryDetailController',
	          ],
	controller:'query-detail',
	xtype : 'query-detail',
	title:'Enter Query Detail...',
	shrinkWrap:3,
	height:250,
	constrain: true,
	width:500,
	closeAction:'hide',
	layout:'fit',
//	autoScroll:true,
	defaults: {
         margin:10
     },
	/*maxHeight:400,
	maxWidth:500,*/
	extend : 'Ext.window.Window',
	items : [ {
						xtype : 'form',
						margin:10,
						layout : 'anchor',
						defaults : {
							margin : '10',
						},
						items : [
						{
							xtype : 'panel',
							layout : 'border',
							anchor :'100% 100%',
							items : [

							{
								xtype : 'panel',
								flex : 2,
								region:'center',
								/*height:'60%',
								width:'50%',*/
								layout:'fit',
								margin:'0 0 0 0',
								title:'Query',
								border:3,
								autoScroll:true,
								items : [ /* {
									xtype:'label',
									html:'Query',
									margin:10
								},*/{
									xtype : 'label',
									maxWidth:'50%',
									html : '',
									margin:'10 0 0 0',
									itemId : 'jpqlQuery',
									emptyText : 'No Query Found!',
									fieldLabel : 'Query',
								
								} ]
							}, {
								xtype : 'panel',
								region:'east',
								height:'60%',
								width:'50%',
								flex : 1,
								border:3,
								margin:'0 0 0 0',
								autoScroll:true,
								items : [{
									xtype : 'gridpanel',
									autoScroll : true,
									itemId : 'queryEntityGrid',
									title : 'Select entity',
									columns : [ {
										text : '',
										dataIndex : 'entName',
										flex : 1
									}]
								} 
							]
							}

							]
						}

						],
						buttons : [ {
							xtype : 'tbfill'
						}, {
							xtype : 'button',
							text : 'Save',
							handler : 'saveQueryDetailForm'
						}, {
							xtype : 'button',
							text : 'Clear',
							handler : 'clearQueryDetailForm'
						} ]
					} // form
					]
   
	
});