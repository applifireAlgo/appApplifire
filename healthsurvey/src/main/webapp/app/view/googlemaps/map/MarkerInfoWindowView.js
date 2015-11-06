Ext.define('Healthsurvey.view.googlemaps.map.MarkerInfoWindowView', {
	extend : 'Ext.window.Window',
	xtype : 'infoWindow',
	title: 'Information',
    height: 250,
    width: 400,
    items: {  // Let's put an empty grid in just to illustrate fit layout
        xtype: 'grid',
        itemId : 'wndGrid',
        border: false,
//        columns: [{header: 'World'}],                 // One header just for show. There's no data,
//        store: Ext.create('Ext.data.ArrayStore', {}) // A dummy empty data store
          columns: [
                  { text: 'Lattitude',  dataIndex: 'lat' },
                  { text: 'Longitude', dataIndex: 'long'},
                  { text: 'DisplayValue', dataIndex: 'value' }
              ],
//          store : Ext.create('Ext.data.Store', {
//		            storeId:'simpsonsStore',
//		            fields:['name', 'email', 'phone'],
//		            data:{'items':[
//		                { 'name': 'Lisa',  "email":"lisa@simpsons.com",  "phone":"555-111-1224"  },
//		                { 'name': 'Bart',  "email":"bart@simpsons.com",  "phone":"555-222-1234" },
//		                { 'name': 'Homer', "email":"homer@simpsons.com",  "phone":"555-222-1244"  },
//		                { 'name': 'Marge', "email":"marge@simpsons.com", "phone":"555-222-1254"  }
//		            ]},
//		            proxy: {
//		                type: 'memory',
//		                reader: {
//		                    type: 'json',
//		                    rootProperty: 'items'
//		                }
//		            }
//		          })
    }
//    [{
//		xtype : 'textfield',
//		fieldLabel : 'Latitude',
//		margin : "15,15,15,15",
//		readOnly:true,
//		itemId:'wndLatitude',
//		width : 200
//	},
//	{
//		xtype : 'textfield',
//		fieldLabel : 'Longitude',
//		margin : "15,15,15,15",
//		readOnly:true,
//		itemId:'wndLongitude',
//		width : 200
//	}]
});