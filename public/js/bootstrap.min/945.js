"use strict";(self.webpackChunknexopos_4x=self.webpackChunknexopos_4x||[]).push([[945],{8945:(e,t,r)=>{r.r(t),r.d(t,{default:()=>p});var n=r(381),s=r.n(n),a=r(4915),o=r(7700),i=r(3632),c=r(9765);const u={name:"ns-payment-types-report",data:function(){return{startDate:s()(),endDate:s()(),report:[],field:{type:"datetimepicker",value:"2021-02-07",name:"date"}}},components:{nsDatepicker:a.Z,nsDateTimePicker:c.Z},computed:{},mounted:function(){},methods:{printSaleReport:function(){this.$htmlToPaper("sale-report")},setStartDate:function(e){console.log(e),this.startDate=e.format()},loadReport:function(){var e=this;if(null===this.startDate||null===this.endDate)return o.kX.error((0,i.__)("Unable to proceed. Select a correct time range.")).subscribe();var t=s()(this.startDate);if(s()(this.endDate).isBefore(t))return o.kX.error((0,i.__)("Unable to proceed. The current time range is not valid.")).subscribe();o.ih.post("/api/nexopos/v4/reports/payment-types",{startDate:this.startDate,endDate:this.endDate}).subscribe((function(t){e.report=t}),(function(e){o.kX.error(e.message).subscribe()}))},setEndDate:function(e){console.log(e),this.endDate=e.format()}}},l=u;const p=(0,r(1900).Z)(l,(function(){var e=this.$createElement;return(this._self._c||e)("div")}),[],!1,null,null,null).exports}}]);