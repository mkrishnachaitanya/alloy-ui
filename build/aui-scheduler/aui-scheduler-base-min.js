AUI.add("aui-scheduler-base",function(AH){var t=AH.Lang,Ae=t.isString,f=t.isObject,C=t.isArray,G=t.isDate,n=t.isNumber,Y=function(A){return(A instanceof AH.SchedulerView);},AE=function(A){return(A instanceof AH.SchedulerEvent);},L=AH.DataType.DateMath,AA=AH.WidgetStdMod,Ac="-",y=".",T="",U=" ",W="scheduler-base",AN="data-view-name",l="activeView",S="boundingBox",Ad="clearfix",k="controls",AP="controlsNode",AS="current",AG="currentDate",AC="currentDateNode",AO="date",AF="dateFormat",AY="day",AM="endDate",Af="events",h="firstDayOfWeek",Ak="hd",Ab="headerNode",Q="helper",w="icon",N="iconNextNode",AX="iconPrevNode",Ai="locale",I="month",P="name",u="nav",q="navNode",R="next",F="nextDate",Aa="prev",AQ="prevDate",Aj="rendered",p="scheduler",AT="srcNode",Ag="startDate",i="strings",AV="template",H="today",AI="todayNode",a="triggerNode",d="view",Al="views",AB="viewsNode",s="week",X="year",AW="navigationDateFormat",r="eventRecorder",e=AH.ClassNameManager.getClassName,AJ=e(Q,Ad),M=e(w),AU=e(W,k),x=e(W,AS,AO),K=e(W,Ak),z=e(W,w,R),g=e(W,w,Aa),Ah=e(W,u),c=e(W,H),AD=e(W,d),V=e(W,Al),J=e(W,d,T),Z=e(W,d,AY),B=e(W,d,I),D=e(W,d,s),AL=e(W,d,X),j=e(p,d,T),AR='<div class="'+AU+'"></div>',b='<div class="'+x+'"></div>',E='<div class="'+K+'"></div>',Am='<a href="#" class="'+[M,z].join(U)+'">Next</a>',AK='<a href="#" class="'+[M,g].join(U)+'">Prev</a>',O='<div class="'+Ah+'"></div>',v='<a href="#" class="'+c+'">{today}</a>',AZ='<a href="#" class="'+[AD,J].join(U)+'{name}" data-view-name="{name}">{label}</a>',o='<div class="'+V+'"></div>';var m=AH.Component.create({NAME:W,ATTRS:{activeView:{validator:Y},eventRecorder:{setter:"_setEventRecorder"},events:{value:[],setter:"_setEvents",validator:C},strings:{value:{day:"Day",month:"Month",today:"Today",week:"Week",year:"Year"}},navigationDateFormat:{getter:function(Ao){var A=this;var An=A.get(l);if(An){return An.get(AW);}return Ao;},value:"%A - %d %b %Y",validator:Ae},views:{setter:"_setViews",value:[]},currentDate:{valueFn:function(){return new Date();},validator:G},firstDayOfWeek:{value:0,validator:n},controlsNode:{valueFn:function(){return AH.Node.create(AR);}},currentDateNode:{valueFn:function(){return AH.Node.create(b);}},headerNode:{valueFn:function(){return AH.Node.create(E);}},iconNextNode:{valueFn:function(){return AH.Node.create(Am);}},iconPrevNode:{valueFn:function(){return AH.Node.create(AK);}},navNode:{valueFn:function(){return AH.Node.create(O);}},todayNode:{valueFn:function(){return AH.Node.create(this._processTemplate(v));}},viewsNode:{valueFn:function(){return AH.Node.create(o);}}},HTML_PARSER:{controlsNode:y+AU,currentDateNode:y+x,headerNode:y+K,iconNextNode:y+z,iconPrevNode:y+g,navNode:y+Ah,todayNode:y+c,viewsNode:y+V},UI_ATTRS:[AG],prototype:{viewStack:null,initializer:function(){var A=this;A.viewStack={};A.controlsNode=A.get(AP);A.currentDateNode=A.get(AC);A.iconNextNode=A.get(N);A.iconPrevNode=A.get(AX);A.navNode=A.get(q);A.schedulerHeaderNode=A.get(Ab);A.todayNode=A.get(AI);A.viewsNode=A.get(AB);A.after({render:A._afterRender,activeViewChange:A._afterActiveViewChange});},bindUI:function(){var A=this;A._bindDelegate();},syncUI:function(){var A=this;A.syncStdContent();},addEvent:function(An){var A=this;var Ao=A.get(Af);if(AH.Array.indexOf(Ao,An)>-1){AH.Array.removeItem(Ao,An);}Ao.push(An);A.set(Af,Ao);},removeEvent:function(An){var A=this;var Ao=A.get(Af);AH.Array.removeItem(Ao,An);A.set(Af,Ao);},flushEvents:function(){var A=this;AH.Array.each(A.get(Af),function(An,Ao){An.eachRepeatedEvent(function(Aq,Ap){delete Aq._filtered;});delete An._filtered;});},getEventsByDay:function(An){var A=this;An=L.safeClearTime(An);return A._getEvents(An,function(Ao){return L.compare(Ao.getClearStartDate(),An);});},getIntersectEvents:function(An){var A=this;An=L.safeClearTime(An);return A._getEvents(An,function(Ap){var Ao=Ap.getClearStartDate();var Aq=Ap.getClearEndDate();return(L.compare(An,Ao)||L.compare(An,Aq)||L.between(An,Ao,Aq));});},sortEventsByDateAsc:function(An){var A=this;An.sort(function(Ar,Ap){var Aq=Ar.get(AM);var Ao=Ap.get(AM);var At=Ar.get(Ag);var As=Ap.get(Ag);if(L.after(At,As)||L.compare(At,As)&&L.before(Aq,Ao)){return 1;}else{return -1;}});},getViewByName:function(An){var A=this;return A.viewStack[An];},getStrings:function(){var A=this;return A.get(i);},getString:function(An){var A=this;return A.getStrings()[An];},renderView:function(An){var A=this;if(An){An.show();if(!An.get(Aj)){var Ao=An.get(P);if(!A.bodyNode){A.setStdModContent(AA.BODY,T);}An.render(A.bodyNode);}}},plotViewEvents:function(An){var A=this;An.plotEvents(A.get(Af));},syncEventsUI:function(){var A=this;A.plotViewEvents(A.get(l));},_afterActiveViewChange:function(Ap){var An=this;if(An.get(Aj)){var Ao=Ap.newVal;var A=Ap.prevVal;if(A){A.hide();}An.renderView(Ao);}},_afterRender:function(An){var A=this;A.renderView(A.get(l));},_bindDelegate:function(){var A=this;A.viewsNode.delegate("click",A._onClickViewTrigger,y+AD,A);A.controlsNode.delegate("click",A._onClickPrevIcon,y+g,A);A.controlsNode.delegate("click",A._onClickNextIcon,y+z,A);A.controlsNode.delegate("click",A._onClickToday,y+c,A);},_createViewTriggerNode:function(An){var A=this;if(!An.get(a)){var Ao=An.get(P);An.set(a,AH.Node.create(AH.substitute(AZ,{name:Ao,label:(A.getString(Ao)||Ao)})));}return An.get(a);},_getEvents:function(An,Ap){var A=this;var Ao=A.get(Af);var Aq=[];AH.Array.each(Ao,function(Ar,As){if(Ap.apply(A,[Ar])){Aq.push(Ar);}else{if(Ar.isRepeatableDate(An)){var At=Ar.repeatByDate(An);Aq.push(At);}}});A.sortEventsByDateAsc(Aq);return Aq;},_onClickToday:function(An){var A=this;A.set(AG,A.get(l).getToday());An.preventDefault();},_onClickNextIcon:function(An){var A=this;A.set(AG,A.get(l).get(F));An.preventDefault();},_onClickPrevIcon:function(An){var A=this;A.set(AG,A.get(l).get(AQ));An.preventDefault();},_onClickViewTrigger:function(Ao){var A=this;var Ap=Ao.currentTarget;var Aq=Ap.attr(AN);var An=A.getViewByName(Aq);A.set(l,An);Ao.preventDefault();},_processTemplate:function(An){var A=this;return AH.substitute(An,A.getStrings());
},_setEventRecorder:function(An){var A=this;if(An){An.set(p,A);}},_setEvents:function(Ao){var A=this;var An=[];AH.Array.each(Ao,function(Ap,Aq){if(!AE(Ap)){Ap=new AH.SchedulerEvent(Ap);}Ap.set(p,A);An.push(Ap);});return An;},_setViews:function(Ao){var A=this;var An=[];AH.Array.each(Ao,function(Ap){if(Y(Ap)&&!Ap.get(Aj)){Ap.set(p,A);An.push(Ap);A.viewStack[Ap.get(P)]=Ap;}});if(!A.get(l)){A.set(l,Ao[0]);}return An;},syncStdContent:function(){var A=this;var An=A.get(Al);A.navNode.append(A.iconPrevNode);A.navNode.append(A.iconNextNode);A.controlsNode.append(A.todayNode);A.controlsNode.append(A.navNode);A.controlsNode.append(A.currentDateNode);AH.Array.each(An,function(Ao){A.viewsNode.append(A._createViewTriggerNode(Ao));});A.schedulerHeaderNode.append(A.controlsNode);A.schedulerHeaderNode.append(A.viewsNode);A.schedulerHeaderNode.addClass(AJ);A.setStdModContent(AA.HEADER,A.schedulerHeaderNode.getDOM());},_uiSetCurrentDate:function(Ar){var Ao=this;var An=Ao.get(AW);var A=Ao.get(Ai);var Aq=AH.DataType.Date.format(Ar,{format:An,locale:A});Ao.currentDateNode.html(Aq);if(Ao.get(Aj)){var Ap=Ao.get(l);if(Ap){Ap._uiSetCurrentDate(Ar);}Ao.syncEventsUI();}}}});AH.Scheduler=AH.Base.create(W,m,[AH.WidgetStdMod]);},"@VERSION@",{requires:["aui-scheduler-view","datasource"],skinnable:true});