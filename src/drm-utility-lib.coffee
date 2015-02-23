###############################################################################
# drm-utilities library
###############################################################################

$ = jQuery

$.extend $.expr[":"], {
    "containsNC": (elem, i, match) ->
        (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0
}

class window.DrmUtilities
    constructor: () ->

new DrmUtilities();