const elrUtilities = function() {
    const self = {
        // TODO: add support for sorting datetime values
        patterns: {
            numeral: /[0-9]+/,
            alphaLower: /[a-z]+/,
            alphaUpper: /[A-Z]+/,
            specialCharacters: /[^a-zA-Z0-9_\s]+/,
            allNumbers: /^[0-9]*$/,
            allAlphaLower: /^[a-z]*$/,
            allAlphaUpper: /^[A-Z]*$/,
            allSpecialCharacters: /^[^a-zA-Z0-9_]*$/,
            // an integer can be negative or positive and can include one comma separator followed by exactly 3 numbers
            integer: /(^\-?\d*$)|(^\-?\d*(,\d{3})*$)/,
            number: /^(?:\-?\d+|\d*)(?:\.?\d+|\d)$/,
            // allows alpha . - and ensures that the user enters both a first and last name
            fullName: /^([a-z- ]+ [a-z- .]+)$/i,
            alpha: /[a-z]/i,
            allAlpha: /^[a-z\-\s]*$/i,
            alphaNum: /^[a-z\d ]*$/i,
            username: /^[a-z\d\_]*$/i,
            spaces: /[\s]/i,
            website: /^((?:https?):[\/]{2}(?:[w]{3}\.)(?:[a-zA-z]+)(?:[.][a-zA-Z]{2,4}))$/i,
            url: /^https?:[\/]{2}(?:[w]{3}\.{1})?(?:[a-zA-Z-_\d]+)\.[a-zA-Z]{2,4}(?:\/[a-zA-Z-_]+)*/i,
            email: /^[a-z][a-z\-\_\.\d]*@[a-z\-\_\.\d]*\.[a-z]{2,6}$/i,
            // validates 77494 and 77494-3232
            postalCode: /^[0-9]{5}-[0-9]{4}$|^[0-9]{5}$/,
            // validates United States phone number patterns
            phone: /^(?:\d{10})|^((?:\()?(?:\d{3}[)-.])?(?:[\s]?\d{3})(?:[\-\.]?\d{4})(?:[xX]\d+)?)$/i,
            slug: /^[a-z\d-]*$/i,
            tags: /<[a-z]+.*>.*<\/[a-z]+>/i,
            // matched all major cc
            creditCard: /^(?:3[47]\d{2}([\ \-]?)\d{6}\1\d|(?:(?:4\d|5[1-5]|65)\d{2}|6011)([\ \-]?)\d{4}\2\d{4}\2)\d{4}$/,
            cvv: /^[0-9]{3,4}$/,
            // mm/dd/yyyy
            monthDayYear: /^(?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4}$/,
            // 00:00pm
            time: /(?:^(?:[12][012]:|[0]?[0-9]:)[012345][0-9](?::[012345][0-9])?(?:am|pm)$)|(?:^(?:(?:1[0-9])|(?:2[0-3])|(?:0?[0-9])):(?:[0-5][0-9])(?::[0-5][0-9])?$)/i,
            hour: /^([12][012])(?=:)|^([0]?[0-9])(?=:)|^(1[0-5])(?=:)|^(2[0-3])(?=:)/,
            minute: /:(0[0-9])|:([1-5][0-9])/,
            ampm: /(am|pm|AM|PM)$/,
            longDate: /^(?:[a-z]*[\.,]?\s)?[a-z]*\.?\s(?:[3][01],?\s|[012][1-9],?\s|[1-9],?\s)[0-9]{4}$/i,
            // shortDate: this.monthDayYear,
            longTime: /((?:[12][012]:|[0]?[0-9]:)[012345][0-9](?::[012345][0-9])?(?:am|pm)?)/i,
            longMonth: /\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)/,
            dateNumber: /[\s\/\-\.](?:([3][01]),?[\s\/\-\.]?|([012][1-9]),?[\s\/\-\.]?|([1-9]),?[\s\/\-\.]?)/,
            year: /([0-9]{4})/,
            dateKeywords: /^(yesterday|today|tomorrow)/i,
            timeKeywords: /^(noon|midnight)/i,
            singleSpace: /\s/,

            // sort patterns
            sortNumber: new RegExp('^(?:\\-?\\d+|\\d*)(?:\\.?\\d+|\\d)'),
            sortMonthDayYear: new RegExp('^(?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4}'),
            sortTime: new RegExp('^(?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\/:[012345][0-9])?(?:am|pm|AM|PM)', 'i')
        },
        each(collection, callback) {
            let i = 0;
            let length = collection.length;
            let isArray = self.isArrayLike(collection);

            if (isArray) {
                for (; i < length; i++) {
                    if (callback.call(collection[ i ], i, collection[ i ]) === false) {
                        break;
                    }
                }
            } else {
                for (i in collection) {
                    if (callback.call(collection[ i ], i, collection[ i ]) === false) {
                        break;
                    }
                }
            }

            return collection;
        },
        trim(str) {
            if (str) {
                return (str === null) ? '' : str.replace(/^\s+|\s+$/g,'');
            }

            return false;
        },
        isOdd(val) {
            return val % 2 === 1;
        },
        isEven(val) {
            return val % 2 === 0;
        },
        isDate(val) {
            return (this.patterns.sortMonthDayYear.test(val)) ? true : false;
        },
        isNumber(val) {
            return (this.patterns.sortNumber.test(val)) ? true : false;
        },
        isAlpha(val) {
            return (this.patterns.alpha.test(val)) ? true : false;
        },
        isTime(val) {
            return (this.patterns.time.test(val)) ? true : false;
        },
        getDataTypes(values, type = null) {
            const types = [];

            if (type) {
                types.push(type);
            } else {
                this.each(values, (k, v) => {
                    if (v === '') {
                        return;
                    }

                    if (this.isDate(v)) {
                        return types.push('date');
                    } else if (this.isTime(v)) {
                        return types.push('time');
                    } else if (this.isNumber(v)) {
                        return types.push('number');
                    } else if (this.isAlpha(v)) {
                        return types.push('alpha');
                    } else {
                        return;
                    }
                });
            }

            return this.unique(types);
        },
        generateRandomString(length = 10, charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
            let str = '';

            for (let i = 0, n = charset.length; i < length; i++) {
                str += charset.charAt(Math.floor(Math.random() * n));
            }

            return str;
        },
        checkBlacklist(str, blacklist) {
            if (str) {
                return self.inArray(blacklist, str.toLowerCase());
            }

            return;
        },
        checkLength(str, reqLength) {
            if (str) {
                return (str.length <= reqLength) ? true : false;
            }

            return;
        },
        getTextArray(elems) {
            const arr = [];

            this.each(elems, function() {
                const val = this.innerText || this.textContent;
                arr.push(val);
            });

            return arr;
        },
        getText(elems, separator = ' ') {
            return this.getTextArray(elems).join(separator);
        },
        getValue(field) {
            let value = this.trim(field.value);

            if (value.length > 0) {
                return value;
            }

            return null;
        },
        // removes leading 'the' or 'a' from a string
        cleanAlpha(str, ignoreWords = ['the', 'a']) {
            this.each(ignoreWords, function() {
                const re = new RegExp('^' + this + '\\s', 'i');
                str = str.replace(re, '');

                return str;
            });

            return str;
        },
        capitalize(str) {
            return str.toLowerCase().replace(/^.|\s\S/g, function(a) {
                return a.toUpperCase();
            });
        },
        // debounce
        throttle(fn, scope, threshold = 500) {
            let last;
            let deferTimer;

            return function() {
                let context = scope || this;
                let now = +new Date(),
                    args = arguments;

                if (last && now < last + threshold) {
                    // hold on to it
                    clearTimeout(deferTimer);
                    deferTimer = setTimeout(function() {
                        last = now;
                        fn.apply(context, args);
                    }, threshold);
                } else {
                    last = now;
                    fn.apply(context, args);
                }
            };
        },
        cleanString(str, re) {
            const reg = new RegExp(re, 'i');
            return this.trim(str.replace(reg, ''));
        },
        strToArray(str) {
            const arr = [];
            const splitStr = str.split(',');

            this.each(splitStr, function() {
                arr.push(this.trim(this));
            });

            return arr;
        },
        isArray(arr) {
            return Array.isArray(arr);
        },
        isArrayLike(obj) {
            return obj && typeof obj === 'object' && (obj.length === 0 || typeof obj.length === 'number' && obj.length > 0 && obj.length - 1 in obj);
        },
        unique(arr) {
            // const that = this;
            return arr.filter((v, i, that) => {
                return that.indexOf(v) === i;
            });
        },
        inArray(arr, item, startIndex) {
            return (arr === null) ? -1 : arr.indexOf(item, startIndex);
        },
        // create an array of items from a list
        toArray(items, unique = false) {
            const arr = [];

            this.each(items, function() {
                arr.push(this.textContent);

                if (unique) {
                    return self.unique(arr);
                }

                return arr;
            });

            return arr;
        },
        // create object keys with arrays for each value in an array
        createArrays(list, obj = {}) {
            this.each(list, function() {
                obj[this] = [];
            });

            return obj;
        },
        // combine an object made up of arrays into a single array
        concatArrays(obj) {
            let arr = [];

            this.each(obj, function() {
                arr = arr.concat(this);
            });

            return arr;
        },
        compareAlpha(a, b, dir = 'ascending') {
            if (a < b) {
                return (dir === 'ascending') ? -1 : 1;
            } else if (a > b) {
                return (dir === 'ascending') ? 1 : -1;
            }

            return 0;
        },
        compare(a, b, dir = 'ascending') {
            return (dir === 'ascending') ? a - b : b - a;
        },
        // test for alpha values and perform alpha sort
        sortValues(a, b, dir = 'ascending') {
            if (this.patterns.alpha.test(a)) {
                return this.compareAlpha(a, b, dir);
            }

            return this.compare(a, b, dir);
        },
        // converts a time string to 24hr time
        to24hr(hour, minutes, ampm) {
            if (ampm === 'am') {
                const hourStr = hour.toString();

                return (hourStr === '12') ? `00:${minutes}` : `0${hourStr}:${minutes}`;
            // if 12pm
            } else if (hour === 12) {
                return `12:${minutes}`;
            }
            // if pm after 12
            return `${(hour + 12)}:${minutes}`;
        },
        parseTime(time) {
            if (this.patterns.time.test(time) && this.patterns.ampm.test(time)) {
                const minutes = this.patterns.minute.exec(time)[2];
                const hour = parseInt(this.patterns.hour.exec(time)[0], 10);
                const ampm = this.patterns.ampm.exec(time)[0].toLowerCase();

                return this.to24hr(hour, minutes, ampm);
            }

            return null;
        }
    };

    return self;
};

export default elrUtilities;