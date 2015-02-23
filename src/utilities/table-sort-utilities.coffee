###############################################################################
# drm-utilities library
###############################################################################

$ = jQuery

DrmUtilities.tableSortDate = (listItems, direction, columnNum) ->
    # need support for various date and time formats
    _sort = (a, b) ->
        a = $.trim $(a).find('td').eq(columnNum).text()
        b = $.trim $(b).find('td').eq(columnNum).text()
        if dataTypeChecks.isDate(a) and dataTypeChecks.isDate(b)
            a = new Date patterns.monthDayYear.exec(a)
            b = new Date patterns.monthDayYear.exec(b)

        return sortUtilities.sortValues a, b, direction

    return listItems.sort _sort 

DrmUtilities.tableSortTime = (listItems, direction, columnNum) ->
    # need support for various date and time formats                
    _sort = (a, b) ->
        a = $.trim $(a).find('td').eq(columnNum).text()
        b = $.trim $(b).find('td').eq(columnNum).text()
        if dataTypeChecks.isTime(a) and dataTypeChecks.isTime(b)
            a = new Date "04-22-2014 #{sortUtilities.parseTime(patterns.time.exec(a))}"
            b = new Date "04-22-2014 #{sortUtilities.parseTime(patterns.time.exec(b))}"

        return sortUtilities.sortValues a, b, direction

    return listItems.sort _sort

DrmUtilities.tableSortAlpha = (listItems, direction, columnNum) =>
    _sort = (a, b) =>
        a = sortUtilities.cleanAlpha($.trim($(a).find('td').eq(columnNum).text()), @ignoreWords).toLowerCase()
        b = sortUtilities.cleanAlpha($.trim($(b).find('td').eq(columnNum).text()), @ignoreWords).toLowerCase()

        return sortUtilities.sortValues a, b, direction

    return listItems.sort _sort

DrmUtilities.tableSortNumber = (listItems, direction, columnNum) ->
    _sort = (a, b) ->
        a = parseFloat($.trim($(a).find('td').eq(columnNum).text()))
        b = parseFloat($.trim($(b).find('td').eq(columnNum).text()))

        return sortUtilities.sortValues a, b, direction

    return listItems.sort _sort