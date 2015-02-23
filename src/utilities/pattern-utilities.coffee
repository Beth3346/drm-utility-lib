###############################################################################
# drm-utilities library
###############################################################################

$ = jQuery

# TODO: add support for sorting datetime values
DrmUtilities.patterns =
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