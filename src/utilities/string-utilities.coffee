###############################################################################
# drm-utilities library
###############################################################################

$ = jQuery

DrmUtilities.capitalize = (str) -> str.toLowerCase().replace /^.|\s\S/g, (a) -> a.toUpperCase()

DrmUtilities.cleanString = (str, re) ->
    re = new RegExp "#{re}", 'i'
    return $.trim str.replace re, ''

DrmUtilities.checkLength = (length, reqLength) -> if length < reqLength then true else false

DrmUtilities.cleanAlpha = (str, ignoreWords = []) ->
    # removes leading 'the' or 'a'
    $.each ignoreWords, ->
        re = new RegExp "^#{@}\\s", 'i'
        str = str.replace re, ''
        return str

    return str

DrmUtilities.isDate = (value) -> return if patterns.monthDayYear.test(value) then true else false
DrmUtilities.isNumber = (value) -> return if patterns.number.test(value) then true else false
DrmUtilities.isAlpha = (value) -> return if patterns.alpha.test(value) then true else false
DrmUtilities.isTime = (value) -> return if patterns.time.test(value) then true else false