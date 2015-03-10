YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-scheduler');
    var DateMath = Y.DataType.DateMath;

    var today = new Date();
    var JANUARY_1 = DateMath.getJan1(today.getFullYear());
    var JULY_1 = DateMath.getDate(today.getFullYear(), 6, 1);
    var NO_DST_OFFSET = (JANUARY_1.getTimezoneOffset() === JULY_1.getTimezoneOffset());
    var WEEK_LENGTH = DateMath.WEEK_LENGTH;

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',

        _should: {
            ignore: {
                'should display event in month view in the week DST begins': NO_DST_OFFSET,
                'should display event in month view in the last day of first week under DST': NO_DST_OFFSET,
                'should not display "Show n more" link with only two events': NO_DST_OFFSET,
                'should display last day of event spanning to DST from one week before': NO_DST_OFFSET
            }
        },

        setUp: function() {
            this._agendaView = new Y.SchedulerAgendaView(),
            this._dayView = new Y.SchedulerDayView(),
            this._monthView = new Y.SchedulerMonthView(),
            this._weekView = new Y.SchedulerWeekView();
        },

        tearDown: function() {
            if (this._scheduler) {
                this._scheduler.destroy();
                delete this._scheduler;
            }
        },

        _createScheduler: function(config) {
            this._scheduler = new Y.Scheduler(Y.merge({
                boundingBox: '#myScheduler',
                date: new Date(2013, 11, 4),
                eventRecorder: new Y.SchedulerEventRecorder(),
                items: [
                    {
                        color: '#8D8',
                        content: 'Colorful',
                        endDate: new Date(2013, 11, 6, 6),
                        startDate: new Date(2013, 11, 6, 2)
                    }
                ],
                render: true,
                views: [
                    this._weekView,
                    this._dayView,
                    this._monthView,
                    this._agendaView
                ]
            }, config));
        },

        _getLocalTimeZoneDSTFirstDay: function() {
            var curDate = JULY_1,
                dstOffset = Math.min(JANUARY_1.getTimezoneOffset(), JULY_1.getTimezoneOffset()),
                prevDate = DateMath.subtract(curDate, DateMath.DAY, 1),
                step;

            if (NO_DST_OFFSET) {
                return null;
            }

            dstOffset = Math.min(JANUARY_1.getTimezoneOffset(), JULY_1.getTimezoneOffset());
            curDate = JULY_1;
            prevDate = DateMath.subtract(curDate, DateMath.DAY, 1);

            if (curDate.getTimezoneOffset() !== dstOffset) {
                // If current date is not under DST, go forward to find when
                // DST will start.
                step = 1;
            }
            else {
                // If current date is under DST, go back to find when DST
                // started.
                step = -1;
            }

            while (prevDate.getTimezoneOffset() <= curDate.getTimezoneOffset()) {
                prevDate = DateMath.add(prevDate, DateMath.DAY, step);
                curDate = DateMath.add(curDate, DateMath.DAY, step);
            }

            // The returned date should satisfy some criteria. Here we check
            // whether they are true. Since time zone rules are complex and
            // prone to change, this ensures the test will fail if it cannot
            // proceed.
            Y.Assert.isFalse(
                DateMath.isDayOverlap(prevDate, DateMath.subtract(curDate, DateMath.DAY, 1)),
                'The previous date should be one day before the current one'
            );

            Y.Assert.areEqual(
                curDate.getTimezoneOffset(),
                dstOffset,
                'The current date should have DST offset'
            );

            Y.Assert.isTrue(
                curDate.getTimezoneOffset() < prevDate.getTimezoneOffset(),
                'The previous date should have a smaller offset'
            );

            return curDate;
        },

        'event color is encoded in RGB': function() {
            this._createScheduler();

            var events = this._scheduler.getEventsByDay(new Date(2013, 11, 6));
            Y.Assert.areEqual(1, events.length);

            var node = events[0].get('node').item(0);

            Y.Assert.isNotNull(node);
            Y.Assert.isTrue(Y.Lang.String.startsWith(node.getStyle('color'), 'rgb('));
            Y.Assert.isTrue(Y.Lang.String.startsWith(node.getStyle('backgroundColor'), 'rgb('));
        },

        'events in the scheduler view should respond to the click event': function() {
            var recorder;

            this._createScheduler();
            this._scheduler.set('disabled', true);

            recorder = this._scheduler.get('eventRecorder');

            Y.one('button.scheduler-base-view-month').simulate('click');
            Y.one('.scheduler-event').simulate('click');

            Y.Assert.isTrue(
                recorder.popover.get('visible'),
                'Popover should be visible when event is clicked in month view'
            );

            Y.one('button.scheduler-base-view-agenda').simulate('click');
            Y.one('.scheduler-view-agenda-event').simulate('click');

            Y.Assert.isTrue(
                recorder.popover.get('visible'),
                'Popover should be visible when event is clicked in agenda view'
            );
        },

        'should display the first week of an event in month view': function() {
            // Second Wednesday
            var startDate = new Date(2013, 11, 11, 12, 1);

            this._createScheduler({
                activeView: this._monthView,
                items: [
                    {
                        color: '#8D8',
                        content: 'Many days',
                        endDate: DateMath.add(startDate, DateMath.MONTH, 3),
                        startDate: startDate
                    }
                ]
            });

            var rows = Y.all('.scheduler-view-table-row');

            Y.Assert.areEqual(
                0, rows.item(0).all('.scheduler-event').size(),
                'There should be no event in the first row'
            );

            Y.Assert.areEqual(
                1, rows.item(1).all('.scheduler-event').size(),
                'There should be one event in the second row'
            );

            Y.Assert.areEqual(
                1, rows.item(2).all('.scheduler-event').size(),
                'There should be one event in the third row'
            );
        },

        'should display event in month view in the week DST begins': function() {
            var dstDate = this._getLocalTimeZoneDSTFirstDay(),
                endDate,
                firstDayOfWeek = DateMath.getFirstDayOfWeek(dstDate),
                rows,
                startDate;

            if (dstDate === null) {
                Y.Assert.pass('The current machine time zone has no DSTs');

                return;
            }

            endDate = DateMath.add(dstDate, DateMath.MONTH, 1);
            startDate = DateMath.subtract(dstDate, DateMath.MONTH, 1);

            this._createScheduler({
                activeView: this._monthView,
                date: dstDate,
                firstDayOfWeek: firstDayOfWeek.getDay(),
                items: [
                    {
                        color: '#8D8',
                        content: 'Many days',
                        endDate: endDate,
                        startDate: startDate
                    }
                ]
            });

            rows = Y.all('.scheduler-view-table-row');

            rows.each(function(row, index) {
                Y.Assert.areEqual(
                    1, row.all('.scheduler-event').size(),
                    'There should be an event at row #'.concat(index)
                );
            });
        },

        'should display event in month view in the last day of first week under DST': function() {
            var dstDate = this._getLocalTimeZoneDSTFirstDay(),
                endDate,
                events,
                firstDayOfWeek = DateMath.getFirstDayOfWeek(dstDate),
                startDate;

            if (dstDate === null) {
                Y.Assert.pass('The current machine time zone has no DSTs');

                return;
            }

            endDate = DateMath.add(dstDate, DateMath.MONTH, 2);
            startDate = DateMath.subtract(dstDate, DateMath.MONTH, 2);

            this._createScheduler({
                activeView: this._monthView,
                date: dstDate,
                firstDayOfWeek: (firstDayOfWeek.getDay() - 1) % 7,
                items: [
                    {
                        color: '#8D8',
                        content: 'Event 1',
                        endDate: endDate,
                        startDate: startDate
                    }
                ]
            });

            events = Y.all('.scheduler-event');

            events.each(function(event, index) {
                var column = event.ancestor('.scheduler-view-table-data-col');

                Y.Assert.areEqual(
                    7, column.getAttribute('colspan'),
                    'Event column #'.concat(index).concat(' should fill row.')
                );
            });
        },

        'should not display "Show n more" link with only two events': function() {
            var dstDate = this._getLocalTimeZoneDSTFirstDay(),
                endDate,
                firstDayOfWeek = DateMath.getFirstDayOfWeek(dstDate),
                startDate;

            if (dstDate === null) {
                Y.Assert.pass('The current machine time zone has no DSTs');

                return;
            }

            endDate = DateMath.add(dstDate, DateMath.MONTH, 2);
            startDate = DateMath.subtract(dstDate, DateMath.MONTH, 2);

            this._createScheduler({
                activeView: this._monthView,
                date: dstDate,
                firstDayOfWeek: (firstDayOfWeek.getDay() - 1) % 7,
                items: [
                    {
                        color: '#8D8',
                        content: 'Event 1',
                        endDate: endDate,
                        startDate: startDate
                    },
                    {
                        color: '#474',
                        content: 'Event 2',
                        endDate: endDate,
                        startDate: startDate
                    }
                ]
            });

            Y.Assert.areEqual(
                0, Y.all('.scheduler-view-table-more').size(),
                '"Show n more" link should not be displayed.'
            );
        },

        'should display last day of event spanning to DST from one week before': function() {
            var column,
                dstDate = this._getLocalTimeZoneDSTFirstDay(),
                endDate,
                events,
                startDate;

            endDate = DateMath.subtract(dstDate, DateMath.DAY, 1);
            startDate = DateMath.subtract(dstDate, DateMath.DAY, WEEK_LENGTH);

            this._createScheduler({
                activeView: this._monthView,
                date: dstDate,
                firstDayOfWeek: startDate.getDay(),
                items: [
                    {
                        color: '#8D8',
                        content: 'Event 1',
                        endDate: endDate,
                        startDate: startDate
                    }
                ]
            });

            events = Y.all('.scheduler-event');

            Y.Assert.areEqual(
                1, events.size(),
                'Event should span through only one week'
            );

            var column = events.item(0).ancestor('.scheduler-view-table-data-col');

            Y.Assert.areEqual(
                7, column.getAttribute('colspan'),
                'Event should fill entire week.'
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['node-event-simulate', 'test', 'aui-scheduler', 'aui-datatype']
});
