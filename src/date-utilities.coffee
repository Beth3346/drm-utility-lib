###############################################################################
# drm-utilities library
###############################################################################

$ = jQuery

@DrmUtilities.dateUtilities =
    getYearsToDays: (years) -> return (years * 146097) / 400
    getDaysToYears: (days) -> return (days * 400) / 146097

    isLeapYear: (year) ->
        # The above expression evaluates whether or not the given date falls within a leap year 
        # using the three following Gregorian calendar rules:
        # Most years divisible by 4 are Leap Years (i.e. 1996)
        # However, most years divisible by 100 are not (i.e. 1900)
        # Unless they are also divisible by 400, in which case they are leap years (i.e. 2000)
        
        return (year % 4 is 0 and year % 100 isnt 0) or year % 400 is 0

    daysInYear: (year) =>
        return if @isLeapYear(year) then 366 else 365

    getDaysInMonth: (month, year) ->
        # returns the number of days in a month
        _month = month + 1
        return new Date(year, _month, 0).getDate()

    getDayOfWeek: (month, date, year) ->
        # returns the day of the week for a specific date
        _day = new Date year, month, date
        return _day.getDay()

    getFirstDayOfMonth: (month, year) ->
        return @getDayOfWeek month, 1, year

    getWeeksInMonth: (month, year) ->
        # gets the number of weeks in a month
        _firstDay = @getDayOfWeek month, 1, year
        _numberDays = @getDaysInMonth month, year
        _dayShift = if _firstDay is @daysPerWeek then 0 else _firstDay
        Math.ceil (_numberDays + _dayShift) / @daysPerWeek

    getMonthWeekNum: (dayNum, day, month, year) ->
        # gets the week of the month which an event occurs
        _weeks = @calendar.find("div.#{@calendarInnerClass}").find '.drm-week'
        _firstDay = @getDayOfWeek month, 1, year
        _dayShift = if _firstDay is @daysPerWeek then 0 else _firstDay
        _numberWeeks = @getWeeksInMonth month, year
        _lastWeekLength = _weeks.eq(_numberWeeks).length

        if dayNum is 'last' and _dayShift <= day
            eventWeekNum = if _lastWeekLength < day then (_numberWeeks - 2) else _numberWeeks - 1
        else if dayNum is 'last' and _dayShift > day
            eventWeekNum = _numberWeeks - 2
        else
            eventWeekNum = parseInt(dayNum, 10) - 1

        return if _dayShift <= day then eventWeekNum else eventWeekNum + 1

    getDatesInWeek: (month, newDate, year) ->
        _firstDay = @getDayOfWeek month, 1, year
        _numberDays = @getDaysInMonth month, year
        _dayShift = if _firstDay is @daysPerWeek then 0 else _firstDay
        _currentDay = @getDayOfWeek month, newDate, year
        _numberWeeks = @getWeeksInMonth month, year
        weekInfo = {}
        weekInfo.datesInWeek = []

        _firstWeek = []
        _lastWeek = []

        _daysInFirstWeek = @daysPerWeek - _dayShift

        _i = 1
        # get the number of dates in each week
        while _i <= _numberWeeks
            dates = []

            if _i is 1
            # first week of the month
                _j = 0
                while _j < _daysInFirstWeek
                    _j = _j + 1
                    dates.push _j
            # middle weeks
            else if _i < _numberWeeks
                if _i is 2 then _date = _daysInFirstWeek
                _j = 0
                while _j < @daysPerWeek
                    _j = _j + 1
                    _date = _date + 1
                    dates.push _date
            else if _i is _numberWeeks
            # last week in month
                while _date < _numberDays
                    _date = _date + 1
                    dates.push _date

            # get the week number
            if newDate in dates
                weekInfo.weekNum = _i - 1
                weekInfo.datesInWeek = dates

            _i = _i + 1
        weekInfo

    getWeekNumber: (month, newDate, year) ->
        self = @
        _weekNum = 1
        weekNums = []
        _weekInfo = self.getDatesInWeek month, newDate, year

        $.each self.months, (key) ->
            _numberDays = self.getDaysInMonth key, year
            _firstDay = self.getDayOfWeek key, 1, year
            _dayShift = if _firstDay is self.daysPerWeek then 0 else _firstDay
            _numberWeeks = self.getWeeksInMonth month, year
            _week = 1
            if $.isNumeric _numberWeeks
                while _week <= _numberWeeks
                    if _week is 1 and _firstDay isnt 0
                        _weekNum = _weekNum
                    else
                        _weekNum = _weekNum + 1
                    _week = _week + 1
                    if month is key
                        weekNums.push _weekNum
        
        weekNums[_weekInfo.weekNum]

@DrmUtilities.timeFactors =
    ms: 1
    seconds: 1e3
    minutes: 6e4
    hours: 36e5
    days: 864e5
    weeks: 6048e5
    months: 2592e6
    years: 31556952e3

@DrmUtilities.timeConversionUtilities =
    convertMsToSeconds: (ms) -> return ms/factors.seconds
    convertMsToMinutes: (ms) -> return ms/factors.minutes
    convertMsToHours: (ms) -> return ms/factors.hours
    convertMsToDays: (ms) -> return ms/factors.days
    convertMsToWeeks: (ms) -> return ms/factors.weeks
    convertMsToMonths: (ms) -> return ms/factors.months
    convertMsToYears: (ms) ->
        _days = @convertMsToDays ms
        _days = if (ms/factors.days) >= 0 then Math.floor(ms/factors.days) else Math.ceil(ms/factors.days)
        
        return dateUtilities.getDaysToYears _days
    convertSecondsToMs: (seconds) -> return seconds * factors.seconds
    convertMinutesToMs: (minutes) -> return minutes * factors.minutes
    convertHoursToMs: (hours) -> return hours * factors.hours
    convertDaysToMs: (days) -> return days * factors.days

@DrmUtilities.durationUtilities =
    getMsDuration: (now, date) -> return (now.getTime() - date.getTime()) / factors.ms

    getSecondsDuration: (now, date) ->
        _ms = @getMsDuration now, date
        _seconds = conversionUtilities.convertMsToSeconds _ms

        return if _seconds >= 0 then Math.floor _seconds else Math.ceil _seconds

    getMinutesDuration: (now, date) ->
        _ms = @getMsDuration now, date
        _minutes = conversionUtilities.convertMsToMinutes _ms

        return if _minutes >= 0 then Math.floor _minutes else Math.ceil _minutes

    getHoursDuration: (now, date) ->
        _ms = @getMsDuration now, date
        _hours = conversionUtilities.convertMsToHours _ms

        return if _hours >= 0 then Math.floor _hours else Math.ceil _hours

    getDaysDuration: (now, date) ->
        _ms = @getMsDuration now, date
        _days = conversionUtilities.convertMsToDays _ms

        return if _days >= 0 then Math.floor _days else Math.ceil _days

    getWeeksDuration: (now, date) ->
        _ms = @getMsDuration now, date
        _weeks = conversionUtilities.convertMsToWeeks _ms

        return if _weeks >= 0 then Math.floor _weeks else Math.ceil _weeks

    getMonthsDuration: (now, date) ->
        _ms = @getMsDuration now, date
        _months = conversionUtilities.convertMsToMonths _ms
        
        if Math.abs(_months) >= 1
            # round months up to account for number of weeks estimated weirdness
            return if _months >= 0 then Math.ceil(_months) else Math.floor(_months)
        else
            return 0

    getYearsDuration: (now, date) ->
        _ms = @getMsDuration now, date            
        _years = conversionUtilities.convertMsToYears _ms
        
        return if _years >= 0 then Math.floor _years else Math.ceil _years

@DrmUtilities.timeRemainderUtilities =
    # seconds, minutes, hours need adjustments for countdowns
    getLeftOverSeconds: (now, date) ->
        if (date.getSeconds() isnt 0) or (durationUtilities.getMsDuration(now, date) > 0)
            return now.getSeconds() - date.getSeconds()
        else
            return now.getSeconds() - 59
    getLeftOverMinutes: (now, date) ->
        if (date.getMinutes() isnt 0) or (durationUtilities.getMsDuration(now, date) > 0)
            return now.getMinutes() - date.getMinutes()
        else
            return now.getMinutes() - 59
    getLeftOverHours: (now, date) ->
        if (date.getHours() isnt 0) or (durationUtilities.getMsDuration(now, date) > 0)
            return now.getHours() - date.getHours()
        else
            return now.getHours() - 11
    getLeftOverDays: (now, date) ->
        _ms = durationUtilities.getMsDuration now, date
        _days = conversionUtilities.convertMsToDays(_ms % factors.weeks)

        return if _days >= 0 then Math.floor _days else Math.ceil _days

    getLeftOverDaysInYear: (now, date) ->
        _days = durationUtilities.getDaysDuration now, date
        _years = durationUtilities.getYearsDuration now, date

        if self.isLeapYear(date.getFullYear()) then _days = _days + 1
        
        _days = _days - dateUtilities.getYearsToDays(_years)
        
        return if _days >= 0 then Math.floor _days else Math.ceil _days

@DrmUtilities.unitTokens = {
    ms: 'millisecond'
    s: 'second'
    m: 'minute'
    h: 'hour'
    d: 'day'
    D: 'date'
    w: 'week'
    M: 'month'
    Q: 'quarter'
    y: 'year'
    DDD: 'dayOfYear'
    a: 'ampm'
}

@DrmUtilities.months = [
    'January'
    'February'
    'March'
    'April'
    'May'
    'June'
    'July'
    'August'
    'September'
    'October'
    'November'
    'December'
]

@DrmUtilities.shortMonths = [
    'Jan'
    'Feb'
    'Mar'
    'Apr'
    'May'
    'Jun'
    'Jul'
    'Aug'
    'Sep'
    'Oct'
    'Nov'
    'Dec'
]

@DrmUtilities.days = [
    'Sunday'
    'Monday'
    'Tuesday'
    'Wednesday'
    'Thursday'
    'Friday'
    'Saturday'
]

@DrmUtilities.shortDays = [
    'Sun'
    'Mon'
    'Tues'
    'Wed'
    'Thurs'
    'Fri'
    'Sat'
]

@DrmUtilities.minDays = [
    'Sun'
    'Mon'
    'Tue'
    'Wed'
    'Thu'
    'Fri'
    'Sat'
]

@DrmUtilities.parseDate = (dateTime) =>
    # check for Yesterday, Today, Tomorrow strings and look for time
    self = @
    dateTime = dateTime.toLowerCase()
    parsingUtilities =
        getYesterday: (today) ->
            _lastMonth = if today.month is 0 then 11 else today.month - 1
            _lastDateInLastMonth = self.getDaysInMonth _lastMonth, today.year
            
            return {
                month: if today.date is 1 then _lastMonth else today.month
                date: if today.date is 1 then _lastDateInLastMonth else today.date - 1
                year: if (today.month is 0) and (today.date is 1) then today.year - 1 else today.year
            }
        
        getToday: (today) ->
            return {
                month: today.month
                date: today.date
                year: today.year
            }
        
        getTomorrow: (today) ->
            _nextMonth = if today.month is 11 then 0 else today.month + 1
            _lastDateInMonth = self.getDaysInMonth today.month, today.year
            
            return {
                month: if today.date is _lastDateInMonth then _nextMonth else today.month
                date: if today.date is _lastDateInMonth then 1 else today.date + 1
                year: if (today.month is 11) and (today.date is _lastDateInMonth) then today.year + 1 else today.year
            }
        
        getMonth: (date) ->
            _month = date.match /^([0]?[1-9]|[1][012]|[1-9])/
            
            return parseInt(_month[0], 10) - 1
        
        getMonthName: (date) ->
            # month or day of the week
            _dayMonth = date.match /^(?:[a-z]*[\.,]?\s)?[a-z]*/
            _dayMonth = $.trim _dayMonth[0]
            _dayMonth = _dayMonth.replace /[\.,]/, ''
            
            if _dayMonth.search(/\s/) isnt -1
                _dayMonth = _dayMonth.split(' ')
                _month = _dayMonth[1]
            else
                _month = _dayMonth

            _months = $.map self.months, (str) ->
                str.toLowerCase()

            _shortMonths = $.map self.shortMonths, (str) ->
                str.toLowerCase()

            if _month in _months
                return $.inArray(_month, _months)
            else if _month in _shortMonths
                return $.inArray(_month, _shortMonths)
        
        getDate: (date) ->
            _date = date.match /[\s\/\-\.](?:([3][01]),?[\s\/\-\.]?|([012][1-9]),?[\s\/\-\.]?|([1-9]),?[\s\/\-\.]?)/
            
            if _date[1]?
                return parseInt(_date[1], 10)
            else if _date[2]?
                return parseInt(_date[2], 10)
            else if _date[3]?
                return parseInt(_date[3], 10)
        
        getYear: (date) ->
            _year = date.match /([0-9]{4})$/
            
            return parseInt(_year[1], 10)

        getHours: (time) ->
            _ampm = time.match /(am|pm)$/i
            _ampm = _ampm[1]

            _hour = time.match /^(?:([12][012]):|([0]?[0-9]):)/
            _hour = if _hour[1]? then parseInt(_hour[1], 10) else parseInt(_hour[2], 10)
            
            if _ampm is 'am' and _hour is 12
                return 0
            else if _ampm is 'pm' and _hour < 12
                return _hour + 12
            else
                return _hour

        getMinutes: (time) ->
            _minute = time.match /\:([012345][0-9])/                    
            return parseInt(_minute[1], 10)

        getSeconds: (time) ->
            _second = time.match /\:(?:[012345][0-9])\:([012345][0-9])/
            return if _second? then parseInt(_second[1], 10) else 0

    _parseDate = (date) ->            
        # look for date keywords yesterday, today, tomorrow
        if date.search(/^(yesterday|today|tomorrow)/i) isnt -1
            _keyword = date.match /^(yesterday|today|tomorrow)/i
            _keyword = _keyword[0]

            switch _keyword
                when 'yesterday' then return parsingUtilities.getYesterday self.today
                when 'today' then return parsingUtilities.getToday self.today
                when 'tomorrow' then return parsingUtilities.getTomorrow self.today

        # look for month names
        else if date.search(/^(?:[a-z]*[\.,]?\s)?[a-z]*\.?\s(?:[3][01],?\s|[012][1-9],?\s|[1-9],?\s)[0-9]{4}$/i) isnt -1
            
            return {
                month: parsingUtilities.getMonthName date
                date: parsingUtilities.getDate date
                year: parsingUtilities.getYear date
            }

        else if date.search(/((?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4})/) isnt -1
            _fullDate = date.match /((?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4})/
            _fullDate = _fullDate[0]
            
            return {
                month: parsingUtilities.getMonth _fullDate
                date: parsingUtilities.getDate _fullDate
                year: parsingUtilities.getYear _fullDate
            }
        else
            return

    _parseTime = (time) ->
        # add noon and midnight keywords
        if time.search(/^(noon|midnight)/i) isnt -1
            _keyword = time.match /^(noon|midnight)/i
            _keyword = _keyword[0]

            switch _keyword
                when 'noon' then return parsingUtilities.getNoon self.today
                when 'midnight' then return parsingUtilities.getMidnight self.today
        
        else if time.search(/((?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\:[012345][0-9])?(?:am|pm)?)/i) isnt -1
            _fullTime = time.match /((?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\:[012345][0-9])?(?:am|pm)?)/i
            _fullTime = _fullTime[0]

            return {
                hour: parsingUtilities.getHours _fullTime
                minute: parsingUtilities.getMinutes _fullTime
                second: parsingUtilities.getSeconds _fullTime
            }
        
        else
            return

    date = _parseDate dateTime
    time = _parseTime dateTime
    
    if date? and time?
        return new Date date.year, date.month, date.date, time.hour, time.minute, time.second
    else if date? and !time
        return new Date date.year, date.month, date.date, 0, 0, 0
    else if !date and time?
        return new Date self.today.year, self.today.month, self.today.date, time.hour, time.minute, time.second
    else
        console.log 'invalid date string'

@DrmUtilities.prettifyDate = (date, dateFormat = 'dddd, MMMM DD, yyyy, hh:mm:ss a') =>
    # format date and time
    self = @
    _getHours = (date) ->
        if date.getHours() is 0
            return 12
        else if date.getHours() > 12
            return date.getHours() - 12
        else 
            return date.getHours()

    formatTokens = {
        dddd: (date) -> return "#{self.days[date.getDay()]}" # long day name
        ddd: (date) -> return "#{self.shortDays[date.getDay()]}" # short day name
        dd: (date) -> return "#{self.minDays[date.getDay()]}" # three letter day abbr
        MMMM: (date) -> return "#{self.months[date.getMonth()]}" # long month name
        MMM: (date) -> return "#{self.shortMonths[date.getMonth()]}" # short month name
        MM: (date) -> return if date.getMonth().toString().length is 1 then "0#{date.getMonth().toString()}" else date.getMonth() # two digit month
        M: (date) -> return date.getMonth() # one digit month
        DD: (date) -> return if date.getDate().toString().length is 1 then "0#{date.getDate().toString()}" else date.getDate() # two digit date
        D: (date) -> return date.getDate() # one digit date
        yyyy: (date) -> return date.getFullYear() # four digit year
        yy: (date) -> return date.getFullYear().toString().slice -2 # two digit year
        hh: (date) -> return if _getHours(date).toString().length is 1 then "0#{_getHours(date).toString()}" else _getHours(date) # two digit hours
        h: (date) -> return _getHours(date) # one digit hours
        HH: (date) -> return if date.getHours().toString().length is 1 then "0#{date.getHours().toString()}" else date.getHours() # two digit 24hr format
        H: (date) -> return date.getHours() # one digit 24hr format
        mm: (date) -> return if date.getMinutes().toString().length is 1 then "0#{date.getMinutes().toString()}" else date.getMinutes() # two digit minutes
        m: (date) -> return date.getMinutes() # one digit minutes
        ss: (date) -> return if date.getSeconds().toString().length is 1 then "0#{date.getSeconds().toString()}" else date.getSeconds().toString() # two digit seconds
        s: (date) -> return date.getSeconds() # one digit seconds
        a: (date) -> return if date.getHours() >= 12 then 'pm' else 'am' # ampm
        A: (date) -> return if date.getHours() >= 12 then 'PM' else 'AM' # AMPM
    }

    if dateFormat?            
        # parse dateFormat string and replace tokens with date information
        tokens = []
        tmpFormat = dateFormat
        $.each formatTokens, (key) ->
            tmp = new RegExp "#{key}"
            if tmpFormat.search(tmp) isnt -1
                tokens.push key
            tmpFormat = tmpFormat.replace tmp, ''
            return tokens

        $.each tokens, (key, value) ->
            tmp = new RegExp "#{value}"
            dateFormat = dateFormat.replace tmp, "{{#{value}}}"
            return dateFormat
        
        # render template
        prettyDate = dateFormat
        $.each formatTokens, (key, value) ->
            re = new RegExp "{{#{key}}}"
            str = value(date)
            prettyDate = prettyDate.replace re, str
            return prettyDate

        return prettyDate
    else
        return