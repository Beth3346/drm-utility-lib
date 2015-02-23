###############################################################################
# drm-utilities library
###############################################################################

$ = jQuery

DrmUtilities.sortValues = (a, b, direction = 'ascending') ->
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

DrmUtilities.sortComplexList = (types, listItems, direction) ->
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

DrmUtilities.listSortDate = (listItems, direction) ->
    # need support for various date and time formats
    _sort = (a, b) ->
        if dataTypeChecks.isDate($.trim($(a).text())) and dataTypeChecks.isDate($.trim($(b).text()))
            a = new Date patterns.monthDayYear.exec($.trim($(a).text()))
            b = new Date patterns.monthDayYear.exec($.trim($(b).text()))

        return sortUtilities.sortValues a, b, direction

    return listItems.sort _sort 

DrmUtilities.listSortTime = (listItems, direction) ->
    # need support for various date and time formats                
    _sort = (a, b) ->
        if dataTypeChecks.isTime($.trim($(a).text())) and dataTypeChecks.isTime($.trim($(b).text()))
            a = new Date "04-22-2014 #{sortUtilities.parseTime(patterns.time.exec($.trim($(a).text())))}"
            b = new Date "04-22-2014 #{sortUtilities.parseTime(patterns.time.exec($.trim($(b).text())))}"

        return sortUtilities.sortValues a, b, direction

    return listItems.sort _sort

DrmUtilities.listSortAlpha = (listItems, direction) =>
    _sort = (a, b) =>
        a = sortUtilities.cleanAlpha($.trim($(a).text()), @ignoreWords).toLowerCase()
        b = sortUtilities.cleanAlpha($.trim($(b).text()), @ignoreWords).toLowerCase()

        return sortUtilities.sortValues a, b, direction

    return listItems.sort _sort

DrmUtilities.listSortNumber = (listItems, direction) ->
    _sort = (a, b) ->
        a = parseFloat($.trim($(a).text()))
        b = parseFloat($.trim($(b).text()))

        return sortUtilities.sortValues a, b, direction

    return listItems.sort _sort