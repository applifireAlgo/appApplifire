Ext.define('Healthsurvey.view.fw.DateRange', {
	extend : 'Ext.panel.Panel',
	xtype : 'daterange',
	defaultval:"",
	fromfieldLabel:"",
	tofieldLabel:"",
	layoutchild:"hbox",
	defaults:{
		margin:'0 20 5 0'
	},
	defaultValue:"",
	initComponent : function() {
		debugger;
		this.layout="anchor";
		this.items=[{xtype:"panel",layout:{type:"table",
			columns:this.layoutchild=="hbox"?'2':"1",tableAttrs: {
		        style: {
		            width: '50%'
		        }
		    }},items:[{
			xtype : "combobox",
			fieldLabel: '<input type=radio name=rowColRadio value=1 checked>&nbsp;Date',
			 width: 230,
			 align:"center",
			 itemId:"defaultsDate",
			 labelWidth:70,
			 store : new Ext.data.ArrayStore({
				fields : [ 'name', 'text' ],
				data : [ [ '', '' ],
				         [ 'today', 'Today' ], 
				         [ 'yesterday', 'Yesterday' ] , 
				         [ 'dayB4yes', 'Day B4 Yesterday' ],
				         [ 'thisweek', 'This Week' ],
				         [ 'lastweek', 'Last Week' ],
				         [ 'thismonth', 'This Month' ],
				         [ 'lastmonth', 'Last Month' ],
				         [ 'last3month', 'Last Three Month' ],
				         [ 'last6month', 'Last Six Month' ],
				         [ 'thisyear', 'This Year' ],
				         [ 'lastyear', 'Last Year' ],
				         ]
		}),
			displayField : 'text',
			valueField : 'name',
			emptyText : 'Select '
		},{
			xtype : "fieldset",
			cls : 'entity-fieldset',
			margin:"0 0 5 5",
			width:this.layoutchild=="hbox"?550:"",
			layout:this.layoutchild,
			title : "<input type=radio name=rowColRadio value=1>&nbsp;Custom",
			defaults:{margin:'5 5 5 5'},
			items : [  {
				   xtype: 'datefield',
				   width: 250,
				   margin:'0 5 5 5',
				    labelWidth:70,
				   itemId:"fromDate",
			       fieldLabel: ' From Date',
			} , {
				   xtype: 'datefield',
				   margin:'0 5 5 5',
				   width: 250,
				  labelWidth:70,
				   itemId:"toDate",
				   fieldLabel:  'To Date',
			} ]
		} ]} ];
		
		this.callParent(arguments);
	},
	listeners:{
		afterrender:function(panel){
			debugger;
			alert();
			
	}
},
	/*
	 * Used to get FRom Date based of date selection 
	 */
	getFromDate:function(){
		//if Defualt is selected then
		if(this.getEl() == undefined){
			if(this.down("#defaultsDate").getValue() != null){
				return this.getDefaultsFromDate();
			}
			return null;
		}
		if(this.getEl().dom.getElementsByTagName("input")[0].checked == true){
			return this.getDefaultsFromDate();
		}else{//In case of Custom selection
			return this.down("#fromDate").getValue()!= null?this.down("#fromDate").getValue().getTime():null;
		}
	},
	/*
	 * Used to get To Date based of date selection 
	 */
	getToDate:function(){
		//if Defualt is selected then
		if(this.getEl() == undefined){
			if(this.down("#defaultsDate").getValue() != null){
				return this.getDefaultsToDate();
			}
			return null;
		}
		if(this.getEl().dom.getElementsByTagName("input")[0].checked == true){
			return this.getDefaultsToDate();
		}else{//In case of Custom selection
			return this.down("#toDate").getValue()!= null?this.down("#toDate").getValue().getTime():null;
		}
	},
	/*
	 * Used to get From Date of besed on DEfault selection
	 */
	getDefaultsFromDate:function(){
		debugger;
		var defaultVal=this.down("#defaultsDate").getValue();
		if(defaultVal!=null && defaultVal.length>0){
			if(defaultVal== "today"){
				return this.getTodayFromDate();
			}else if(defaultVal== "yesterday"){
				return this.getYesterFromDate();
			} else if(defaultVal== "dayB4yes"){
				return this.getDB4YesterFromDate();
			}else if(defaultVal== "thisweek"){
				return this.getStartDayOfWeek();
			}else if(defaultVal== "lastweek"){
				return this.getStartDayOfLastWeek();
			}else if(defaultVal== "thismonth"){
				return this.getStartDayofThisMonth();
			}else if(defaultVal== "lastmonth"){
				return this.getStartDayofLastMonth();
			}else if(defaultVal== "last3month"){
				return this.getStartDayofLast3Month();
			}else if(defaultVal== "last6month"){
				return this.getStartDayofLast6Month();
			}else if(defaultVal== "thisyear"){
				return this.getStartDayofThisYear();
			}else if(defaultVal== "lastyear"){
				return this.getStartDayofLastYear();
			}
		} 
		return null;
		
	},
	/*
	 * Used to get From Date of besed on DEfault selection
	 */
	getDefaultsToDate:function(){
		debugger;
		var defaultVal=this.down("#defaultsDate").getValue();
		if(defaultVal!=null && defaultVal.length>0){
			if(defaultVal== "today"){
				return this.getTodayToDate();
			} else if(defaultVal== "yesterday"){
				return this.getYesterToDate();
			}else if(defaultVal== "dayB4yes"){
				return this.getDB4YesterToDate();
			}else if(defaultVal== "thisweek"){
				return this.getEndDayOfWeek();
			}else if(defaultVal== "lastweek"){
				return this.getEndDayOfLastWeek();
			}else if(defaultVal== "thismonth"){
				return this.getEndDayofThisMonth();
			}else if(defaultVal== "lastmonth"){
				return this.getEndDayofLastMonth();
			}else if(defaultVal== "last3month"){
				return this.getEndDayofLast3Month();
			}else if(defaultVal== "last6month"){
				return this.getEndDayofLast6Month();
			}else if(defaultVal== "thisyear"){
				return this.getEndDayofThisYear();
			}else if(defaultVal== "lastyear"){
				return this.getEndDayofLastYear();
			}
			
			
		} 
		return null;
		
	},
	setFromHHMM:function(date){
		date.setHours(00);
		date.setMinutes(00);
	},
	setToHHMM:function(date){
		date.setHours(23);
		date.setMinutes(59);
	},
	/*
	 * used to get Today Date
	 */
	getTodayFromDate:function(){
		var date= new Date();
		this.setFromHHMM(date);
		return date.getTime();
	},
	/*
	 * used to get Today Date
	 */
	getTodayToDate:function(){
		var date= new Date();
		this.setToHHMM(date);
		return date.getTime();
	},
	/*
	 * used to get yesterday Date
	 */
	getYesterFromDate:function(){
		var date=new Date();
		date.setDate(date.getDate()-1);
		this.setFromHHMM(date);
		return date.getTime();
	},
	/*
	 * used to get yesterday Date
	 */
	getYesterToDate:function(){
		var date=new Date();
		date.setDate(date.getDate()-1);
		this.setToHHMM(date);
		return date.getTime();
	},
	/*
	 * used to get yesterday Date
	 */
	getDB4YesterFromDate:function(){
		var date=new Date();
		date.setDate(date.getDate()-2);
		this.setFromHHMM(date);
		return date.getTime();
	},	
	/*
	 * used to get yesterday Date
	 */
	getDB4YesterToDate:function(){
		var date=new Date();
		date.setDate(date.getDate()-2);
		this.setToHHMM(date);
		return date.getTime();
	},
	/*
	 * used to get Start date of current week
	 */
	getStartDayOfWeek:function(){
		var date=new Date();
		date.setDate(date.getDate() - date.getDay());
		this.setFromHHMM(date);
		return date.getTime();
	},
	/*
	 * used to get End date of current week
	 */
	getEndDayOfWeek:function(){
		var date=new Date();
		date.setDate(date.getDate() + (6-date.getDay()));
		this.setToHHMM(date);
		return date.getTime();
	},
	/*
	 * used to get Star date of Last week
	 */
	getStartDayOfLastWeek:function(){
		var date=new Date();
		//set Last Week Date
		date.setDate(date.getDate() - (date.getDay()+ 1));
		//set first day of last week
		date.setDate(date.getDate() - date.getDay())
		this.setFromHHMM(date);
		return date.getTime();
	},
	/*
	 * used to get End date of current week
	 */
	getEndDayOfLastWeek:function(){
		var date=new Date();
		//set Last Week Date
		date.setDate(date.getDate() - (date.getDay()+ 1));
		//set first day of last week
		date.setDate(date.getDate() + (6-date.getDay()));
		this.setToHHMM(date);
		return date.getTime();
	},
	/*
	 * Used to get StartDay of current Month
	 */
	getStartDayofThisMonth:function(){
		var date=new Date(new Date().getFullYear(),new Date().getMonth(),1)
		this.setFromHHMM(date);
		return date.getTime();
	},
	/*
	 * Used to get end Day of current Month
	 */
	getEndDayofThisMonth:function(){
		var date=new Date(new Date().getFullYear(),new Date().getMonth()+1,0);
		this.setToHHMM(date);
		return date.getTime();
	},
	/*
	 * Used to get StartDay of Last Month
	 */
	getStartDayofLastMonth:function(){
		var date=new Date(new Date().getFullYear(),new Date().getMonth()-1,1);
		this.setFromHHMM(date);
		return date.getTime();
	},
	/*
	 * Used to get end Day of Last Month
	 */
	getEndDayofLastMonth:function(){
		var date=new Date(new Date().getFullYear(),new Date().getMonth(),0);
		this.setToHHMM(date);
		return date.getTime();
	},
	/*
	 * Used to get StartDay of Last 3 Month
	 */
	getStartDayofLast3Month:function(){
		var date=new Date(new Date().getFullYear(),new Date().getMonth()-3,1);
		this.setFromHHMM(date);
		return date.getTime(); 
	},
	/*
	 * Used to get end Day of Last 3 Month
	 */
	getEndDayofLast3Month:function(){
		var date=new Date(new Date().getFullYear(),new Date().getMonth(),0);
		this.setToHHMM(date);
		return date.getTime();
	},
	/*
	 * Used to get StartDay of Last 6 Month
	 */
	getStartDayofLast6Month:function(){
		var date=new Date(new Date().getFullYear(),new Date().getMonth()-6,1);
		this.setFromHHMM(date);
		return date.getTime();
	},
	/*
	 * Used to get end Day of Last 6 Month
	 */
	getEndDayofLast6Month:function(){
		var date=new Date(new Date().getFullYear(),new Date().getMonth(),0);
		this.setToHHMM(date);
		return date.getTime();
	},
	/*
	 * Used to get StartDay of Last 6 Month
	 */
	getStartDayofThisYear:function(){
		var date=new Date(new Date().getFullYear(),0,1);
		this.setFromHHMM(date);
		return date.getTime();
	},
	/*
	 * Used to get end Day of Last 6 Month
	 */
	getEndDayofThisYear:function(){
		var date=new Date(new Date().getFullYear(),12,0);
		this.setToHHMM(date);
		return date.getTime();
	},
	/*
	 * Used to get StartDay of Last 6 Month
	 */
	getStartDayofLastYear:function(){
		var date=new Date(new Date().getFullYear()-1,0,1);
		this.setFromHHMM(date);
		return date.getTime();
	},
	/*
	 * Used to get end Day of Last 6 Month
	 */
	getEndDayofLastYear:function(){
		var date=new Date(new Date().getFullYear()-1,12,0);
		this.setToHHMM(date);
		return date.getTime();
	},
	listeners:{
		afterrender:function(panel){
			debugger;
		}
	},
	reset:function(){
		if(this.down("#defaultsDate") != undefined){
			this.down("#defaultsDate").reset();
		}
		if(this.down("#fromDate")!= undefined){
			this.down("#fromDate").reset();
		}
		if(this.down("#toDate")!= undefined){
			this.down("#toDate").reset();
		}
		
		
	}
	
});
