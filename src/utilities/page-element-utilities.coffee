###############################################################################
# drm-utilities library
###############################################################################

$ = jQuery

DrmUtilities.scrollToTop = (content, speed) ->
    content.stop().animate {
        'scrollTop': content.position().top
    }, speed, 'swing'

DrmUtilities.getFormData = (form) ->
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

DrmUtilities.clearForm = (fields) ->
    fields.each ->
        _that = $ @
        if _that.attr('type') is 'checkbox' then _that.prop 'checked', false else _that.val ''

DrmUtilities.removeContent = (e, content) ->
    content.fadeOut @speed, ->
        $(@).remove()

    e.preventDefault()

DrmUtilities.checkPosition = (item) ->
    _positionLeft = item.position().left
    _offsetLeft = item.offset().left
    _positionTop = item.position().top
    _offsetTop = item.offset().top
    _popoverHeight = item.height()

    if _offsetLeft < 0
        item.css('left': (Math.abs(_offsetLeft) + 10) + _positionLeft)
    else if _offsetTop < 0
        item.css('bottom': (Math.abs(_positionTop) - _popoverHeight) - Math.abs(_offsetTop))

DrmUtilities.getValues = (listItems) ->
    # creates an array of values from list items
    values = []

    listItems.each ->
        _that = $ @
        values.push $.trim(_that.text())

    return values

DrmUtilities.affixItem = (top, item) =>
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

DrmUtilities.goToSection = (activeClass) ->
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

DrmUtilities.scrollSpy = =>
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

DrmUtilities.filterList = =>
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

DrmUtilities.filterTable = =>
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