###############################################################################
# drm-utilities library
###############################################################################

$ = jQuery

DrmUtilities.getDataTypes = (listItems, type = null) =>
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

DrmUtilities.createArrays = (obj, list) ->
    # create keys with empty arrays for each value in an array
    $.each list, ->
        obj[@] = []
        return
    return obj

DrmUtilities.concatArrays = (obj) ->
    # combine an object made up of arrays into a single array
    arr = []
    $.each obj, ->
        arr = arr.concat @
        return
    return arr

DrmUtilities.filterArray = =>
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