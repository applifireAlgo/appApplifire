/**
 * 
 */
 
 Ext.define('Healthsurvey.view.console.ConsoleWindow',{
 			   extend : 'Ext.window.Window',
	
			   //xtype:'consoleWindow',
               title: 'Communication Log',
               height: 400,
               width: 600,
               layout: 'fit',
               items: {
                    xtype: 'grid',
                    itemId: 'consoleGrid',
                    border: false,
                    columns: [{
                         header: 'Name',
                         dataIndex: 'name',
                         'flex': 1
                    }, {
                         header: 'Status',
                         dataIndex: 'status',
                         'flex': 1
                    }, {
                         header: 'StatusText',
                         dataIndex: 'statusText',
                         'flex': 1
                    }, {
                         header: 'Success',
                         dataIndex: 'success',
                         'flex': 1
                    }, {
                         header: 'Message',
                         dataIndex: 'message',
                         'flex': 1
                    }],
                    store: Ext.create('Ext.data.Store', {
                         fields: [],
                         data: [],
                         autoLoad: true
                    })
               }
          })