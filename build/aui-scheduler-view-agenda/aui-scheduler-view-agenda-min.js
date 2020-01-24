YUI.add("aui-scheduler-view-agenda",function(e,t){var n=e.Lang,r=n.isFunction,i=n.isNumber,s=e.Array,o=e.DataType.DateMath,u=function(t){return function(n){var r=this,i=r.get("scheduler");return e.DataType.Date.format(n,{format:t,locale:i.get("locale")})}},a=function(e){return s.map(e,function(e){return+e}).sort(s.numericSort)},f=e.getClassName,l=f("scheduler-view-agenda","container"),c=f("scheduler-view-agenda","event"),h=f("scheduler-view-agenda","event","color"),p=f("scheduler-view-agenda","event","content"),d=f("scheduler-view-agenda","event","dates"),v=f("scheduler-view-agenda","event","first"),m=f("scheduler-view-agenda","info"),g=f("scheduler-view-agenda","info","biggie"),y=f("scheduler-view-agenda","info","container"),b=f("scheduler-view-agenda","info","label"),w=f("scheduler-view-agenda","info","label","biggie"),E=f("scheduler-view-agenda","info","label","small"),S=f("scheduler-view-agenda","event","last"),x=f("scheduler-view-agenda","no","events"),T=f("scheduler-view-agenda","event","past"),N=f("scheduler-view-agenda","events"),C=f("scheduler-view-agenda","header"),k=f("scheduler-view-agenda","header","day"),L=f("scheduler-view-agenda","header","extra"),A=f("scheduler-view-agenda","header","first"),O=f("scheduler-view-agenda","header","last"),M=f("clearfix"),_='<div class="'+l+'">{content}</div>',D='<div class="'+[C,M].join(" ")+' {firstClassName} {lastClassName}">'+'<div class="'+k+'">{day}</div>'+'<a href="javascript:;" class="'+L+'" data-timestamp="{timestamp}">{extra}</a>'+"</div>",P='<div class="'+N+'">{content}</div>',H='<div class="'+[c,M].join(" ")+' {firstClassName} {lastClassName} {eventClassName}" data-clientId="{clientId}">'+'<div class="'+h+'" style="background-color: {color};"></div>'+'<div class="'+p+'">{content}</div>'+'<div class="'+d+'">{dates}</div>'+"</div>",B='<div class="'+x+'">{content}</div>',j='<div class="'+y+'">'+'<div class="'+[m,M].join(" ")+'">'+'<div class="'+g+'">{day}</div>'+'<div class="'+b+'">'+'<div class="'+w+'">{labelBig}</div>'+'<div class="'+E+'">{labelSmall}</div>'+"</div>"+"</div>"+"</div>",F=e.Component.create({NAME:"scheduler-view-agenda",ATTRS:{bodyContent:{value:""},daysCount:{value:30,validator:i},eventsDateFormatter:{value:function(e,t){var n=this,r=n.get("scheduler"),i=r.get("activeView").get("isoTime"),s="%H:%M",a="%H:%M",f,l;return i||(s="%l:%M",a="%l:%M",e.getHours()>=12&&(s+="pm"),t.getHours()>=12&&(a+="pm")),o.isDayOverlap(e,t)&&(s+=", %b %e",a+=", %b %e"),f=u.call(n,s),l=u.call(n,a),[f.call(n,e),"&mdash;",l.call(n,t)].join(" ")},validator:r},headerDayDateFormatter:{value:function(e){var t=this,n=t.get("scheduler").get("todayDate"),r,i;return o.isDayOverlap(e,n)?r="%A":r="today",i=u.call(t,r),i.call(t,e)},validator:r},headerExtraDateFormatter:{validator:r,value:u("%B %e")},infoDayDateFormatter:{validator:r,value:u("%e")},infoLabelBigDateFormatter:{validator:r,value:u("%A")},infoLabelSmallDateFormatter:{validator:r,value:u("%B %d, %Y")},name:{value:"agenda"},navigationDateFormatter:{value:function(){return""},validator:r},strings:{value:{noEvents:"No future events."}}},EXTENDS:e.SchedulerView,UI_ATTRS:["daysCount"],prototype:{bindUI:function(){var e=this,t=e.get("boundingBox");t.delegate("click",e._onSchedulerEventClick,"."+c,e),t.delegate("click",e._onEventsHeaderClick,"."+L,e)},getDateInterval:function(){var e=F.superclass.getDateInterval.apply(this);return delete e.endDate,e},getNextDate:function(){var e=this,t=e.get("scheduler").get("viewDate");return o.toMidnight(o.add(t,o.DAY,1))},getPrevDate:function(){var e=this,t=e.get("scheduler").get("viewDate");return o.toLastHour(o.subtract(t,o.DAY,1))},plotEvents:function(){var t=this,n=t.get("strings"),r=t.get("scheduler"),i=r.get("viewDate"),u=t.get("eventsDateFormatter"),f=t.get("headerDayDateFormatter"),l=t.get("headerExtraDateFormatter"),c=t.get("infoDayDateFormatter"),h=t.get("infoLabelBigDateFormatter"),p=t.get("infoLabelSmallDateFormatter"),d=[],m=t._getDayEventsMap(),g=e.Object.keys(m),y=g.length;t.set("headerContent",e.Lang.sub(j,{day:c.call(t,i),labelBig:h.call(t,i),labelSmall:p.call(t,i)})),e.Object.isEmpty(m)?d.push(e.Lang.sub(B,{content:n.noEvents})):s.each(a(g),function(n,r){var i=new Date(e.Lang.toInt(n)),a=m[n],c=a.length;d.push(e.Lang.sub(D,{day:f.call(t,i),extra:l.call(t,i),firstClassName:r===0?A:"",lastClassName:r===y-1?O:"",timestamp:n})),s.each(a,function(n,r){var s=o.toMidnight(new Date),a=n.get("endDate"),f=n.get("startDate");d.push(e.Lang.sub(H,{clientId:n.get("clientId"),color:n.get("color"),content:n.get("content"),dates:u.call(t,f,a),eventClassName:i.getTime()<s.getTime()||a.getTime()<s.getTime()?T:"",firstClassName:r===0?v:"",lastClassName:r===c-1?S:""}))})});var b=e.Lang.sub(_,{content:e.Lang.sub(P,{content:d.join("")})});t.set("bodyContent",b)},_getDayEventsMap:function(){var e=this,t=e.get("daysCount"),n=e.get("scheduler"),r=o.toMidnight(n.get("viewDate")),i=o.add(r,o.DAY,t-1),s={};return n.eachEvent(function(e){var t=e.get("endDate"),n=e.get("startDate"),u=e.get("visible"),a;if(!u)return;var f=n;o.before(i,t)&&(t=i);while(f.getTime()<=t.getTime())f.getTime()>=r.getTime()&&(a=o.safeClearTime(f).getTime(),s[a]||(s[a]=[]),s[a].push(e)),f=o.add(f,o.DAY,1)}),s},_onEventsHeaderClick:function(t){var n=this,r=n.get("scheduler"),i=t.currentTarget,s=e.Lang.toInt(i.getData("timestamp"))||(new Date).getTime(),o=new Date(s),u=r.getViewByName("day");u&&(r.set("date",o),r.set("activeView",u))},_onSchedulerEventClick:function(e){var t=this,n=e.currentTarget,r=t.get("scheduler"),i=r.get("eventRecorder"),s=n.getData("schedulerEvent");s||(s=r.getEventByClientId(n.getData("clientId")),n.setData("schedulerEvent",s)),s&&i&&(i.set("event",s,{silent:!0}),i.showPopover(n))},_uiSetDaysCount:function(){var e=this;e.plotEvents()}}});e.SchedulerAgendaView=F},"3.1.0-deprecated.74",{requires:["aui-scheduler-base"],skinnable:!0});
