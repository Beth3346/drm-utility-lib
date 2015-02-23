###############################################################################
# drm-utilities library
###############################################################################

$ = jQuery

$.extend $.expr[":"], {
    "containsNC": (elem, i, match) ->
        (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0
}

class @DrmUtilities
    constructor: () ->
        # TODO: add support for sorting datetime values
        @patterns =
            hour: new RegExp '^(\\d+)'
            minute: new RegExp ':(\\d+)'
            ampm: new RegExp '(am|pm|AM|PM)$'
            # an integer can be negative or positive and can include one comma separator followed by exactly 3 numbers
            integer: new RegExp "^\\-?\\d*"
            number: new RegExp "^(?:\\-?\\d+|\\d*)(?:\\.?\\d+|\\d)$"
            url: new RegExp '^https?:\\/\\/[\\da-z\\.\\-]+[\\.a-z]{2,6}[\\/\\w/.\\-]*\\/?$','i'
            email: new RegExp '^[a-z][a-z\\-\\_\\.\\d]*@[a-z\\-\\_\\.\\d]*\\.[a-z]{2,6}$','i'
            # validates 77494 and 77494-3232
            zip: new RegExp '^[0-9]{5}-[0-9]{4}$|^[0-9]{5}$'
            # validates United States phone number patterns
            phone: new RegExp '^\\(?\\d{3}[\\)\\-\\.]?\\d{3}[\\-\\.]?\\d{4}(?:[xX]\\d+)?$','i'
            # allows alpha . - and ensures that the user enters both a first and last name
            fullName: new RegExp '^[a-z]+ [a-z\\.\\- ]+$','i'
            alpha: new RegExp '^[a-z \\-]*','i'
            alphaNum: new RegExp '^[a-z\\d ]*$','i'
            noSpaces: new RegExp '^\\S*$','i'
            alphaNumDash: new RegExp '^[a-z\\d- ]*$','i'
            # allows alphanumeric characters and underscores; no spaces; recommended for usernames
            alphaNumUnderscore: new RegExp '^[a-z\\d_]*$','i'
            noTags: new RegExp '<[a-z]+.*>.*<\/[a-z]+>','i'
            # mm/dd/yyyy
            monthDayYear: new RegExp '^(?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4}$'
            # 00:00pm
            time: new RegExp '^(?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\/:[012345][0-9])?(?:am|pm)$', 'i'
            # matched all major cc
            creditCard: new RegExp '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$'
            cvv: new RegExp '^[0-9]{3,4}$'
            longDate: new RegExp '^(?:[a-z]*[\\.,]?\\s)?[a-z]*\\.?\\s(?:[3][01],?\\s|[012][1-9],?\\s|[1-9],?\\s)[0-9]{4}$', 'i'
            shortDate: new RegExp '((?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4})'
            longTime: new RegExp '((?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\\:[012345][0-9])?(?:am|pm)?)', 'i'
            longMonth: new RegExp '^(?:[a-z]*[\\.,]?\\s)?[a-z]*'
            dateNumber: new RegExp '[\\s\\/\\-\\.](?:([3][01]),?[\\s\\/\\-\\.]?|([012][1-9]),?[\\s\\/\\-\\.]?|([1-9]),?[\\s\\/\\-\\.]?)'
            year: new RegExp '([0-9]{4})'
            dateKeywords: new RegExp '^(yesterday|today|tomorrow)', 'i'
            timeKeywords: new RegExp '^(noon|midnight)', 'i'
            singleSpace: new RegExp '\\s'

    scrollToTop: (content, speed) =>
        content.stop().animate {
            'scrollTop': content.position().top
        }, speed, 'swing'

    capitalize: (str) ->
        str.toLowerCase().replace /^.|\s\S/g, (a) -> a.toUpperCase()

    cleanString: (str, re) ->
        re = new RegExp "#{re}", 'i'
        return $.trim str.replace re, ''

    getFormData: (form) ->
        # get form data and return an object
        # need to remove dashes from ids
        formInput = {}
        _fields = form.find(':input').not('button').not ':checkbox'
        _checkboxes = form.find 'input:checked'

        if _checkboxes.length isnt 0
            _boxIds = []

            _checkboxes.each ->
                _boxIds.push $(@).attr 'id'

            _boxIds = $.unique boxIds

            $.each _boxIds, ->
                _checkboxValues = []
                _boxes = form.find "input:checked##{@}"

                _boxes.each ->
                    checkboxValues.push $.trim($(@).val())

                formInput["#{@}"] = checkboxValues
                return

        $.each _fields, ->
            _that = $ @
            _id = _that.attr 'id'

            _input = if $.trim(_that.val()) is '' then null else $.trim(_that.val())

            if _input? then formInput["#{_id}"] = _input
            return

        formInput

    clearForm: (fields) ->
        fields.each ->
            _that = $ @
            if _that.attr('type') is 'checkbox' then _that.prop 'checked', false else _that.val ''

    removeContent: (e, content) ->
        content.fadeOut @speed, ->
            $(@).remove()

        e.preventDefault()

    checkLength: (length, reqLength) ->
        if length < reqLength
            true
        else
            false

    checkPosition: (item) ->
        _positionLeft = item.position().left
        _offsetLeft = item.offset().left
        _positionTop = item.position().top
        _offsetTop = item.offset().top
        _popoverHeight = item.height()

        if _offsetLeft < 0
            item.css('left': (Math.abs(_offsetLeft) + 10) + _positionLeft)
        else if _offsetTop < 0
            item.css('bottom': (Math.abs(_positionTop) - _popoverHeight) - Math.abs(_offsetTop))

    getValues: (listItems) ->
        # creates an array of values from list items
        values = []

        listItems.each ->
            _that = $ @
            values.push $.trim(_that.text())

        return values

    parseTime: (time) ->
        _hour = parseInt(patterns.hour.exec(time)[1], 10)
        _minutes = patterns.minute.exec(time)[1]
        _ampm = patterns.ampm.exec(time)[1].toLowerCase()

        if _ampm is 'am'
            _hour = _hour.toString()
            
            if _hour is '12'
                _hour = '0'
            else if _hour.length is 1
                _hour = "0#{_hour}"
                
            return "#{_hour}:#{_minutes}"

        else if _ampm is 'pm'
            return "#{_hour + 12}:#{_minutes}"
    
    cleanAlpha: (str, ignoreWords = []) ->
        # removes leading 'the' or 'a'
        $.each ignoreWords, ->
            re = new RegExp "^#{@}\\s", 'i'
            str = str.replace re, ''
            return str

        return str

    sortValues: (a, b, direction = 'ascending') ->
        # test for alpha values and perform alpha sort
        if patterns.alpha.test(a)
            if a < b
                return if direction is 'ascending' then -1 else 1
            else if a > b
                return if direction is 'ascending' then 1 else -1
            else if a is b
                return 0
        # if values are not alpha perform an numeric sort
        else
            return if direction is 'ascending' then a - b else b - a

    getDataTypes: (listItems, type = null) =>
        self = @
        values = sortUtilities.getValues listItems
        types = []

        if type?
            types.push type
        else
            $.each values, ->
                if dataTypeChecks.isDate.call self, @
                    types.push 'date'
                else if dataTypeChecks.isTime.call self, @
                    types.push 'time'
                else if dataTypeChecks.isNumber.call self, @
                    types.push 'number'
                else if dataTypeChecks.isAlpha.call self, @
                    types.push 'alpha'
                else
                    types.push null

        return $.unique types

    createArrays: (obj, list) ->
        # create keys with empty arrays for each value in an array
        $.each list, ->
            obj[@] = []
            return
        return obj

    concatArrays: (obj) ->
        # combine an object made up of arrays into a single array
        arr = []
        $.each obj, ->
            arr = arr.concat @
            return
        return arr

    sortComplexList: (types, listItems, direction) ->            
        # sort complex list with two or more data types
        # group data types together
        self = @
        sortLists = {}
        # create sortLists arrays
        @createArrays sortLists, types
        # add listItems to sortLists arrays
        $.each listItems, ->
            listItem = @
            value = $.trim $(listItem).text()
            $.each types, ->
                if dataTypeChecks["is#{self.capitalize(@)}"].call self, value
                    sortLists["#{@}"].push listItem
        # sort sortLists arrays
        $.each sortLists, (key) ->
            comparators["sort#{self.capitalize(key)}"] sortLists[key], direction

        return @concatArrays sortLists

    isDate: (value) -> return if patterns.monthDayYear.test(value) then true else false
    isNumber: (value) -> return if patterns.number.test(value) then true else false
    isAlpha: (value) -> return if patterns.alpha.test(value) then true else false
    isTime: (value) -> return if patterns.time.test(value) then true else false

    listSortDate: (listItems, direction) ->
        # need support for various date and time formats
        _sort = (a, b) ->
            if dataTypeChecks.isDate($.trim($(a).text())) and dataTypeChecks.isDate($.trim($(b).text()))
                a = new Date patterns.monthDayYear.exec($.trim($(a).text()))
                b = new Date patterns.monthDayYear.exec($.trim($(b).text()))

            return sortUtilities.sortValues a, b, direction

        return listItems.sort _sort 

    listSortTime: (listItems, direction) ->
        # need support for various date and time formats                
        _sort = (a, b) ->
            if dataTypeChecks.isTime($.trim($(a).text())) and dataTypeChecks.isTime($.trim($(b).text()))
                a = new Date "04-22-2014 #{sortUtilities.parseTime(patterns.time.exec($.trim($(a).text())))}"
                b = new Date "04-22-2014 #{sortUtilities.parseTime(patterns.time.exec($.trim($(b).text())))}"

            return sortUtilities.sortValues a, b, direction

        return listItems.sort _sort

    listSortAlpha: (listItems, direction) =>
        _sort = (a, b) =>
            a = sortUtilities.cleanAlpha($.trim($(a).text()), @ignoreWords).toLowerCase()
            b = sortUtilities.cleanAlpha($.trim($(b).text()), @ignoreWords).toLowerCase()

            return sortUtilities.sortValues a, b, direction

        return listItems.sort _sort

    listSortNumber: (listItems, direction) ->
        _sort = (a, b) ->
            a = parseFloat($.trim($(a).text()))
            b = parseFloat($.trim($(b).text()))

            return sortUtilities.sortValues a, b, direction

        return listItems.sort _sort

    tableSortDate: (listItems, direction, columnNum) ->
        # need support for various date and time formats
        _sort = (a, b) ->
            a = $.trim $(a).find('td').eq(columnNum).text()
            b = $.trim $(b).find('td').eq(columnNum).text()
            if dataTypeChecks.isDate(a) and dataTypeChecks.isDate(b)
                a = new Date patterns.monthDayYear.exec(a)
                b = new Date patterns.monthDayYear.exec(b)

            return sortUtilities.sortValues a, b, direction

        return listItems.sort _sort 

    tableSortTime: (listItems, direction, columnNum) ->
        # need support for various date and time formats                
        _sort = (a, b) ->
            a = $.trim $(a).find('td').eq(columnNum).text()
            b = $.trim $(b).find('td').eq(columnNum).text()
            if dataTypeChecks.isTime(a) and dataTypeChecks.isTime(b)
                a = new Date "04-22-2014 #{sortUtilities.parseTime(patterns.time.exec(a))}"
                b = new Date "04-22-2014 #{sortUtilities.parseTime(patterns.time.exec(b))}"

            return sortUtilities.sortValues a, b, direction

        return listItems.sort _sort

    tableSortAlpha: (listItems, direction, columnNum) =>
        _sort = (a, b) =>
            a = sortUtilities.cleanAlpha($.trim($(a).find('td').eq(columnNum).text()), @ignoreWords).toLowerCase()
            b = sortUtilities.cleanAlpha($.trim($(b).find('td').eq(columnNum).text()), @ignoreWords).toLowerCase()

            return sortUtilities.sortValues a, b, direction

        return listItems.sort _sort

    tableSortNumber: (listItems, direction, columnNum) ->
        _sort = (a, b) ->
            a = parseFloat($.trim($(a).find('td').eq(columnNum).text()))
            b = parseFloat($.trim($(b).find('td').eq(columnNum).text()))

            return sortUtilities.sortValues a, b, direction

        return listItems.sort _sort

    affixItem: (top, item) =>
        _scroll = $('body').scrollTop()
        _position = item.data 'position'
        navPositionLeft = item.position().left
        _winHeight = $(window).height()
        _navHeight = item.height()
        _contentHeight = $('body').height()

        if _scroll > (top + _contentHeight)
            item.removeClass "sticky-#{_position}"
        else if _scroll > (top - 50) and _navHeight < _winHeight
            item.addClass "sticky-#{_position}"
            @positionRight navPositionLeft
        else
            item.removeClass "sticky-#{_position}"

    goToSection: (activeClass) ->
        _that = $ @
        target = _that.attr 'href'
        _content = $ 'body'

        $('a.active').removeClass activeClass
        _that.addClass activeClass

        _content.stop().animate {
            'scrollTop': $(target).position().top
        }, 900, swing, ->
            window.location.hash = target
            return

        false

    scrollSpy: =>
        scroll = $('body').scrollTop()
        links = @nav.find 'a[href^="#"]'

        _findPositions = =>
            sections = @content.find 'section'
            positions = []
            # populate positions array with the position of the top of each section element 
            sections.each (index) ->
                _that = $ @
                _length = sections.length

                getPosition = (height) ->
                    if height > 200
                        _that.position().top - (_that.height() / 2)
                    else    
                        _that.position().top - _that.height()

                # the first element's position should always be 0
                if index is 0
                    _position = 0
                # subtract the bottom container's full height so final scroll value is equivalent 
                # to last container's position  
                else if index is _length - 1
                    _position = getPosition _that.height()
                # for all other elements correct position by only subtracting half of its height
                # from its top position
                else
                    _position = _that.position().top - (_that.height() / 2)

                # correct for any elements _that may have a negative position value  
                if _position < 0 then positions.push 0 else positions.push _position

            positions

        positions = _findPositions()

        $.each positions, (index, value) =>
            # console.log "value: #{value} : scroll: #{scroll}"
            if scroll is 0
                $("a.#{@activeClass}").removeClass @activeClass  
                links.eq(0).addClass @activeClass
            # if value is less than scroll add @activeClass to link with the same index
            else if value < scroll
                $("a.#{@activeClass}").removeClass @activeClass
                links.eq(index).addClass @activeClass

    filterList: =>
        self = @
        # check other inputs
        _inputs = self.table.find('th').find ".#{self.searchInput}"
        filterValues = []

        # get all input values and add them to filterValues array
        $.each _inputs, (key, value) ->
            _that = $ value

            if $.trim(_that.val()).length isnt 0 then filterValues.push value
        
        # get filtered rows
        if filterValues.length is 0
            rows = self.fullRows
        else
            $.each filterValues, (key, value) ->
                _that = $ value
                _input = $.trim(_that.val()).toLowerCase()
                _columnNum = _that.closest('th').index()

                if filterValues.length is 1
                    rows = self.fullRows.has "td:eq(#{_columnNum}):containsNC(#{_input})"
                else if key is 0
                    rows = self.fullRows.has "td:eq(#{_columnNum}):containsNC(#{_input})"
                else
                    rows = rows.has "td:eq(#{_columnNum}):containsNC(#{_input})"
                rows
        rows

    filterTable: =>
        self = @
        # check other inputs
        _inputs = self.table.find('th').find ".#{self.searchInput}"
        filterValues = []

        # get all input values and add them to filterValues array
        $.each _inputs, (key, value) ->
            _that = $ value

            if $.trim(_that.val()).length isnt 0 then filterValues.push value
        
        # get filtered rows
        if filterValues.length is 0
            rows = self.fullRows
        else
            $.each filterValues, (key, value) ->
                _that = $ value
                _input = $.trim(_that.val()).toLowerCase()
                _columnNum = _that.closest('th').index()

                if filterValues.length is 1
                    rows = self.fullRows.has "td:eq(#{_columnNum}):containsNC(#{_input})"
                else if key is 0
                    rows = self.fullRows.has "td:eq(#{_columnNum}):containsNC(#{_input})"
                else
                    rows = rows.has "td:eq(#{_columnNum}):containsNC(#{_input})"
                rows
        rows