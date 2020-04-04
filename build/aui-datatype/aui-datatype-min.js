YUI.add("aui-datatype",function(e,t){var n=e.Lang,r=60,i=1e3,s=24,o=e.namespace("DataType.Boolean"),u=e.namespace("DataType.String");o.parse=function(t){return t=e.Lang.trim(t),t==="false"?!1:!!t},u.evaluate=function(t){var r=e.Lang.trim(t);if(r==="true"||r==="false")return o.parse(t);if(r&&n.isString(r)){var i=+r;if(!isNaN(i))return i}return t};var n=e.Lang,a=e.Lang.String,f=n.isDate,l=n.isValue;e.namespace("DataType.DateMath"),e.mix(e.DataType.DateMath,{DAY:"D",WEEK:"W",YEAR:"Y",MONTH:"M",MINUTES:"MINUTES",HOUR:"HOUR",SECONDS:"SECONDS",MAX_MONTH_LENGTH:31,WEEK_LENGTH:7,ONE_DAY_MS:i*r*r*s,ONE_HOUR_MS:i*r*r,ONE_MINUTE_MS:i*r,ONE_SECOND_MS:i,WEEK_ONE_JAN_DATE:1,add:function(e,t,n){var r=new Date(e.getTime());switch(t){case this.MONTH:var i=e.getMonth()+n,s=0;if(i<0)while(i<0)i+=12,s-=1;else if(i>11)while(i>11)i-=12,s+=1;r.setMonth(i),r.setFullYear(e.getFullYear()+s);break;case this.DAY:this._addDays(r,n);break;case this.YEAR:r.setFullYear(e.getFullYear()+n);break;case this.WEEK:this._addDays(r,n*7);break;case this.HOUR:var o=r.getHours();r.setHours(o+n);break;case this.MINUTES:var u=r.getMinutes();r.setMinutes(u+n);break;case this.SECONDS:var a=r.getSeconds();r.setSeconds(a+n)}return r},_addDays:function(t,n){if(e.UA.webkit&&e.UA.webkit<420)if(n<0)for(var r=-128;n<r;n-=r)t.setDate(t.getDate()+r);else for(var i=96;n>i;n-=i)t.setDate(t.getDate()+i);t.setDate(t.getDate()+n)},compare:function(e,t){return e&&t&&e.getTime()===t.getTime()},copyHours:function(e,t){e.setHours(t.getHours()),e.setMinutes(t.getMinutes()),e.setSeconds(t.getSeconds()),e.setMilliseconds(t.getMilliseconds())},countDays:function(e,t){var n,r,i,s,o;return this.before(e,t)?(i=e,o=t):(i=t,o=e),s=o.getTime()-i.getTime(),r=Math.floor(s/this.ONE_DAY_MS),n=this.toMidnight(this.add(i,this.DAY,r)),o=this.toMidnight(o),this.before(n,o)&&r++,r},subtract:function(e,t,n){return this.add(e,t,n*-1)},before:function(e,t){var n=t.getTime();return e.getTime()<n?!0:!1},after:function(e,t){var n=t.getTime();return e.getTime()>n?!0:!1},between:function(e,t,n){return this.after(e,t)&&this.before(e,n)?!0:!1},betweenInclusive:function(e,t,n){return this.between(e,t,n)||this.compare(e,t)||this.compare(e,n)},getJan1:function(e){return this.getDate(e,0,1)},getDayOffsetYear:function(e,t){var n=this.getJan1(t);return this.getDayOffset(e,n,t)},getDayOffset:function(e,t){return this._absFloor(this.getOffset(e,t,this.ONE_DAY_MS))},getHoursOffset:function(e,t){return this._absFloor(this.getOffset(e,t,this.ONE_HOUR_MS))},getMinutesOffset:function(e,t){return this._absFloor(this.getOffset(e,t,this.ONE_MINUTE_MS))},getSecondsOffset:function(e,t){return this._absFloor(this.getOffset(e,t,this.ONE_SECOND_MS))},getOffset:function(e,t,n){var r=(e.getTime()-t.getTime())/(n||0);return r},_absFloor:function(e){var t=Math.floor(Math.abs(e));return e<0&&(t*=-1),t},getWeekNumber:function(e,t,n){t=t||0,n=n||this.WEEK_ONE_JAN_DATE;var r=this.clearTime(e),i,s;r.getDay()===t?i=r:i=this.getFirstDayOfWeek(r,t);var o=i.getFullYear();s=new Date(i.getTime()+6*this.ONE_DAY_MS);var u;if(o!==s.getFullYear()&&s.getDate()>=n)u=1;else{var a=this.clearTime(this.getDate(o,0,n)),f=this.getFirstDayOfWeek(a,t),l=Math.round((r.getTime()-f.getTime())/this.ONE_DAY_MS),c=l%7,h=(l-c)/7;u=h+1}return u},getFirstDayOfWeek:function(e,t){t=t||0;var n=e.getDay(),r=(n-t+7)%7;return this.subtract(e,this.DAY,r)},isWeekDay:function(e){var t=e.getDay();return t>0&&t<6},isTueOrThu:function(e){return this.isWeekDay(e)&&e.getDay()%2===0},isMonWedOrFri:function(e){return this.isWeekDay(e)&&!this.isTueOrThu(e)},isNextDay:function(e,t){return this.getDayOffset(this.safeClearTime(t),this.safeClearTime(e))===1},isDayBoundary:function(e,t){return this.isNextDay(e,t)&&t.getHours()===0&&t.getMinutes()===0&&t.getSeconds()===0},isDayOverlap:function(e,t){return e.getFullYear()!==t.getFullYear()||e.getMonth()!==t.getMonth()||e.getDate()!==t.getDate()},isToday:function(e){return!this.isDayOverlap(e,new Date)},isSameMonth:function(e,t){return e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()},isYearOverlapWeek:function(e){var t=!1,n=this.add(e,this.DAY,6);return n.getFullYear()!==e.getFullYear()&&(t=!0),t},isMonthOverlapWeek:function(e){var t=!1,n=this.add(e,this.DAY,6);return n.getMonth()!==e.getMonth()&&(t=!0),t},findMonthStart:function(e){var t=this.getDate(e.getFullYear(),e.getMonth(),1);return t},findMonthEnd:function(e){var t=this.findMonthStart(e),n=this.add(t,this.MONTH,1),r=this.subtract(n,this.DAY,1);return r.setHours(23,59,59,999),r},clearTime:function(e){return e.setHours(12,0,0,0),e},safeClearTime:function(e){return this.clearTime(this.clone(e))},toLastHour:function(e){return e=this.clone(e),e.setHours(23,59,59,999),e},toMidnight:function(e){return e=this.clone(e),e.setHours(0,0,0,0),e},clone:function(e){return new Date(e.getTime())},getDate:function(e,t,n){var r=null;return l(n)||(n=1),e>=100?r=new Date(e,t,n):(r=new Date,r.setFullYear(e),r.setMonth(t),r.setDate(n),r.setHours(0,0,0,0)),r},getDaysInMonth:function(e,t){return this.findMonthEnd(this.getDate(e,t)).getDate()},getWeeksInYear:function(e,t){var n=this.getDate(e,11,31),r=this.getWeekNumber(n,t,this.WEEK_ONE_JAN_DATE);return r===1&&(n=this.getDate(e,11,24),r=this.getWeekNumber(n,t,this.WEEK_ONE_JAN_DATE)),r},toUsTimeString:function(e,t,n,r){e=f(e)?e:new Date(0,0,0,e);var i=e.getHours(),s=e.getMinutes(),o=!1;i>=12?(o=!0,i>12&&(i-=12)):i===0&&(i=12);var u=t?a.padNumber(i,2):String(i);return n||(u+=":",u+=a.padNumber(s,2)),r||(u+=o?"pm":"am"),u},toIsoTimeString:function(e,t){e=f(e)?e:new Date(0,0,0,e);var n=e.getHours(),r=e.getMinutes(),i=a.padNumber(n,2)+":"+a.padNumber(r,2);if(t){var s=e.getSeconds();i+=":",i+=a.padNumber(s,2)}return i}}),function(e){var t={a:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],A:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],b:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],B:["January","February","March","April","May","June","July","August","September","October"
,"November","December"],c:"%a %d %b %Y %T %Z",p:["AM","PM"],P:["am","pm"],r:"%I:%M:%S %p",x:"%d/%m/%y",X:"%T"};e.namespace("DataType.Date.Locale"),e.DataType.Date.Locale.en=t,e.DataType.Date.Locale["en-US"]=e.merge(t,{c:"%a %d %b %Y %I:%M:%S %p %Z",x:"%m/%d/%Y",X:"%I:%M:%S %p"}),e.DataType.Date.Locale["en-GB"]=e.merge(t,{r:"%l:%M:%S %P %Z"}),e.DataType.Date.Locale["en-AU"]=e.merge(t)}(e)},"3.1.0-deprecated.76",{requires:["datatype","aui-datatype-date-parse"]});
