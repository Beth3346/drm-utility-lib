const $ = require('jquery');

if (!Number.isNan) {
    Number.isNan = function(num) {
        return num !== num;
    };
}

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
            longTime: new RegExp('((?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\\:[012345][0-9])?(?:am|pm)?)', 'i'),
            longMonth: /\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)/,
            dateNumber: new RegExp('[\\s\/\\-\\.](?:([3][01]),?[\\s\/\\-\\.]?|([012][1-9]),?[\\s\/\\-\\.]?|([1-9]),?[\\s\/\\-\\.]?)'),
            year: new RegExp('([0-9]{4})'),
            dateKeywords: new RegExp('^(yesterday|today|tomorrow)', 'i'),
            timeKeywords: new RegExp('^(noon|midnight)', 'i'),
            singleSpace: new RegExp('\\s'),

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
        // filters an array using a callback function
        // exclude(arr, fn) {
        //     let list = [];
        //     for (let i = 0; i < arr.length; i++) {
        //         if (fn(arr[i])) {
        //             list.push(arr[i]);
        //         }
        //     }

        //     return list;
        // };
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
        getText(elems, separator = ' ') {
            const text = [];

            this.each(elems, function() {
                const val = this.innerText || this.textContent;
                text.push(this.trim(val));
            });

            return text.join(separator);
        },
        getTextArray(elems) {
            let arr = [];

            this.each(elems, function() {
                let val = this.innerText || this.textContent;
                arr.push(val);
            });

            return arr;
        },
        getValue(field) {
            let value = this.trim(field.value);

            if (value.length > 0) {
                return value;
            }

            return null;
        },
        getColumnList(columnNum, $listItems) {
            let $list = [];

            this.each($listItems, function(k, v) {
                $list.push($(v).find('td').eq(columnNum));

                return $list;
            });

            return $list;
        },
        getListValues($list) {
            let values = [];

            this.each($list, function(k,v) {
                values.push(this.trim($(v).text()).toLowerCase());

                return values;
            });

            return values;
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
        clearElement($el, speed = 300) {
            $el.fadeOut(speed, function() {
                $(this).remove();
            });
        },
        clearForm($fields) {
            $fields.each(function() {
                let $that = $(this);
                if ($that.attr('type') === 'checkbox') {
                    $that.prop('checked', false);
                } else {
                    $that.val('');
                }
            });
        },
        cleanString(str, re) {
            const reg = new RegExp(re, 'i');
            return this.trim(str.replace(reg, ''));
        },
        getFormData($form) {
            // get form data and return an object
            // need to remove dashes from ids
            let formInput = {};
            let $fields = $form.find(':input').not('button').not(':checkbox');
            let $checkboxes = $form.find('input:checked');

            if ($checkboxes.length !== 0) {
                let boxIds = [];

                $checkboxes.each(function() {
                    boxIds.push($(this).attr('id'));
                });

                boxIds = self.unique(boxIds);

                self.each(boxIds, function() {
                    let checkboxValues = [];
                    let $boxes = $form.find(`input:checked#${this}`);

                    $boxes.each(function() {
                        checkboxValues.push(self.trim($(this).val()));
                    });

                    formInput[this] = checkboxValues;
                    return;
                });
            }

            self.each($fields, function() {
                let $that = $(this);
                let id = $that.attr('id');
                let formInput = [];
                let input;

                if (self.trim($that.val()) === '') {
                    input = null;
                } else {
                    input = self.trim($that.val());
                }

                if (input) {
                    formInput[id] = input;
                }

                return;
            });

            return formInput;
        },
        // wrapper for creating jquery objects
        createElement(tagName, attrs = {}) {
            return $(`<${tagName}></${tagName}>`, attrs);
        },
        toTop($content, speed) {
            $content.stop().animate({
                'scrollTop': $content.position().top
            }, speed, 'swing');
        },
        killEvent($el, eventType, selector = null) {
            if (selector === null) {
                $el.on(eventType, function(e) {
                    e.stopPropagation();
                });
            }

            $el.on(eventType, selector, function(e) {
                e.stopPropagation();
            });
        },
        // scrollEvent($el, offset, cb) {
        //     // TODO: finish thie function
        //     if ($(document).scrollTop() > $(window).height()) {
        //         cb();
        //     }
        // },
        scrollToView($el, speed = 300) {
            const showElement = function(speed) {
                const scroll = $(document).scrollTop();
                const height = $(window).height();

                if (scroll > height) {
                    $el.fadeIn(speed);
                } else if (scroll < height) {
                    $el.fadeOut(speed);
                }
            };

            $(window).on('scroll', self.throttle(showElement, 100));
        },
        strToArray(str) {
            const arr = [];
            const splitStr = str.split(',');

            self.each(splitStr, function() {
                arr.push(self.trim(this));
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
        inArray(arr, item, i) {
            return (arr == null) ? -1 : arr.indexOf(item, i);
        },
        // create an array of unique items from a list
        toArray(items, unique = false) {
            const arr = [];

            self.each(items, function() {
                arr.push(this.textContent);

                if (unique) {
                    return self.unique(arr);
                }

                return arr;
            });

            return arr;
        },
        // create object keys with arrays for each value in an array
        createArrays(obj, list) {
            self.each(list, function() {
                obj[this] = [];
            });

            return obj;
        },
        // combine an object made up of arrays into a single array
        concatArrays(obj) {
            let arr = [];

            self.each(obj, function() {
                arr = arr.concat(this);
            });

            return arr;
        },
        // test for alpha values and perform alpha sort
        sortValues(a, b, dir = 'ascending') {
            if (this.patterns.alpha.test(a)) {
                if (a < b) {
                    return (dir === 'ascending') ? -1 : 1;
                } else if (a > b) {
                    return (dir === 'ascending') ? 1 : -1;
                } else if (a === b) {
                    return 0;
                }
            }

            return (dir === 'ascending') ? a - b : b - a;
        },
        sortComplexList(types, listItems, dir = 'ascending') {
            const that = this;
            const sortLists = {};

            // create sortList arrays
            that.createArrays(sortLists, types);

            // add list items to sortLists arrays

            that.each(types, function() {
                const type = this;

                that.each(listItems, function() {
                    const listItem = this;
                    const val = that.trim($(listItem).text());

                    if (that[`is${that.capitalize(type)}`].call(that, val)) {
                        sortLists[type].push(listItem);
                    } else {
                        return;
                    }
                });

                that.each(sortLists[type], function() {
                    const val = ($(this).text());

                    $(listItems).each(function(k) {
                        const listVal = $(this).text();

                        if (listVal === val) {
                            listItems.splice(k, 1);
                        }
                    });
                });
            });

            // sort sortLists arrays
            that.each(sortLists, function(key) {
                that[`sort${that.capitalize(key)}`](sortLists[key], dir);
            });

            // that.each(types, function() {
            //     let type = this;
            //     that.each(sortLists[type], function(k, v) {
            //         console.log($(v).text() + ':' + type);
            //     });
            // });

            return that.concatArrays(sortLists);
        },
        sortDate($items, dir) {
            const sort = (a, b) => {
                if (this.isDate(this.trim($(a).text())) && this.isDate(this.trim($(b).text()))) {
                    a = new Date(this.patterns.sortMonthDayYear.exec(this.trim($(a).text())));
                    b = new Date(this.patterns.sortMonthDayYear.exec(this.trim($(b).text())));
                }

                return this.sortValues(a, b, dir);
            };

            return $items.sort(sort);
        },
        // converts a time string to 24hr time
        parseTime(time) {
            const minutes = this.patterns.minute.exec(time)[1];
            const ampm = this.patterns.ampm.exec(time)[1].toLowerCase();
            let hour = parseInt(this.patterns.hour.exec(time)[1], 10);

            if (ampm === 'am') {
                hour = hour.toString();

                if (hour === '12') {
                    hour = '00';
                } else if (hour.length === 1) {
                    hour = `0${hour}`;
                }

                return `${hour}:${minutes}`;

            } else if (ampm === 'pm') {
                return `${(hour + 12)}:${minutes}`;
            }

            return 'should be am or pm';
        },
        sortTime($items, dir) {
            const sort = (a, b) => {
                const time1 = this.patterns.sortTime.exec(this.trim($(a).text()))[0];
                const time2 = this.patterns.sortTime.exec(this.trim($(b).text()))[0];

                if (this.isTime(this.trim($(a).text())) && this.isTime(this.trim($(b).text()))) {
                    a = new Date(`04-22-2014 ${this.parseTime(time1)}`);
                    b = new Date(`04-22-2014 ${this.parseTime(time2)}`);
                }

                return this.sortValues(a, b, dir);
            };

            return $items.sort(sort);
        },
        sortAlpha($items, dir) {
            const sort = (a, b) => {
                a = this.cleanAlpha(this.trim($(a).text()), ['the', 'a']).toLowerCase();
                b = this.cleanAlpha(this.trim($(b).text()), ['the', 'a']).toLowerCase();

                return this.sortValues(a, b, dir);
            };

            return $items.sort(sort);
        },
        sortNumber($items, dir) {
            const sort = (a, b) => {
                a = parseFloat(this.trim($(a).text()));
                b = parseFloat(this.trim($(b).text()));

                return this.sortValues(a, b, dir);
            };

            return $items.sort(sort);
        },
        sortColumnDate($listItems, dir, columnNum) {
            const sort = (a, b) => {
                a = this.trim($(a).find('td').eq(columnNum).text());
                b = this.trim($(b).find('td').eq(columnNum).text());

                if (this.isDate(a) && this.isDate(b)) {
                    a = new Date(this.patterns.monthDayYear.exec(a));
                    b = new Date(this.patterns.monthDayYear.exec(b));

                    return this.sortValues(a, b, dir);
                }

                return;
            };

            return $listItems.sort(sort);
        },
        sortColumnTime($listItems, dir, columnNum) {
            const sort = (a, b) => {
                a = this.trim($(a).find('td').eq(columnNum).text());
                b = this.trim($(b).find('td').eq(columnNum).text());

                if (this.isTime(a) && this.isTime(b)) {
                    a = new Date(`04-22-2014 ${this.parseTime(this.patterns.monthDayYear.exec(a))}`);
                    b = new Date(`04-22-2014 ${this.parseTime(this.patterns.monthDayYear.exec(b))}`);
                } else {
                    return;
                }

                return this.sortValues(a, b, dir);
            };

            return $listItems.sort(sort);
        },
        sortColumnAlpha($listItems, dir, columnNum) {
            const ignoreWords = ['a', 'the'];
            const sort = (a, b) => {
                a = this.cleanAlpha(this.trim($(a).find('td').eq(columnNum).text()), ignoreWords).toLowerCase();
                b = this.cleanAlpha(this.trim($(b).find('td').eq(columnNum).text()), ignoreWords).toLowerCase();

                return this.sortValues(a, b, dir);
            };

            return $listItems.sort(sort);
        },
        sortColumnNumber($listItems, dir, columnNum) {
            const sort = (a, b) => {
                a = parseFloat(this.trim($(a).find('td').eq(columnNum).text()));
                b = parseFloat(this.trim($(b).find('td').eq(columnNum).text()));

                return this.sortValues(a, b, dir);
            };

            return $listItems.sort(sort);
        },
        scrollSpy($nav, $content, el, activeClass) {
            const scroll = $(document).scrollTop();
            const $links = $nav.find('a[href^="#"]');
            const positions = this.findPositions($content, el);

            this.each(positions, function(index, value) {
                if (scroll === 0) {
                    $nav.find(`a.${activeClass}`).removeClass(activeClass);
                    $links.eq(0).addClass(activeClass);
                } else if (value < scroll) {
                    // if value is less than scroll add activeClass to link with the same index
                    $nav.find(`a.${activeClass}`).removeClass(activeClass);
                    $links.eq(index).addClass(activeClass);
                }
            });
        },
        getPosition(height, $obj) {
            if (height > 200) {
                return $obj.position().top - ($obj.height() / 4);
            }

            return $obj.position().top - ($obj.height() / 2);
        },
        findPositions($content, el) {
            const $sections = $content.find(el);
            const positions = [];

            // populate positions array with the position of the top of each section element
            $sections.each(function(index) {
                const $that = $(this);
                const length = $sections.length;
                let position;

                // the first element's position should always be 0
                if (index === 0) {
                    position = 0;
                } else if (index === (length - 1)) {
                    // subtract the bottom container's full height so final scroll value is equivalent
                    // to last container's position
                    position = self.getPosition($that.height, $that);
                } else {
                    // for all other elements correct position by only subtracting half of its height
                    // from its top position
                    position = $that.position().top - ($that.height() / 4);
                }

                // correct for any elements _that may have a negative position value

                if (position < 0) {
                    positions.push(0);
                } else {
                    positions.push(position);
                }
            });

            return positions;
        },
        // forces link to open in a new tab
        openInTab($links) {
            $links.on('click', function(e) {
                e.preventDefault();
                window.open($(this).attr('href'), '_blank');
            });
        },
        isMobile(mobileWidth = 568) {
            return ($(window).width() <= mobileWidth) ? true : false;
        },
        // assigns a random class to an element.
        // useful for random backgrounds/styles
        randomClass($el, classList = []) {
            this.each(classList, function(index, value) {
                $el.removeClass(value);
            });

            $el.addClass(classList[Math.floor(Math.random() * classList.length)]);
        },
        // smooth scroll to section of page
        // put id of section in href attr of link
        gotoSection() {
            const section = $(this).attr('href').split('#').pop();

            $('body, html').stop().animate({
                'scrollTop': $(`#${section}`).position().top
            });

            return false;
        },
        closest(el, selector) {
            let firstEl = el[0];
            const matchesSelector = firstEl.matches || firstEl.msMatchesSelector;
            const els = [];
            let closestEl;

            while (firstEl) {
                if (matchesSelector.call(firstEl, selector)) {
                    break;
                }

                firstEl = firstEl.parentElement;
            }

            els.push(closestEl);

            return els;
        },
        // checkCollectionLength(collection) {
        //     // make sure an element with the index exists in the collection
        //     if (collection.length < index + 1) {
        //         console.log('There is no element with that index');

        //         return false;
        //     }

        //     return true;
        // },
        // get element in the collection with the provided index
        eq(collection, index) {
            const els = [];

            const parent = (self.parent(collection).length > 1) ? self.parent(collection)[0] : self.parent(collection);

            console.log(parent);

            const checkCollectionLength = function(collection) {
                // make sure an element with the index exists in the collection
                if (collection.length < index + 1) {
                    console.log('There is no element with that index');

                    return false;
                }

                return true;
            };

            const children = checkCollectionLength(collection) ? parent[0].children : null;

            els.push(children[index]);

            return els;
        },
        // get the index of the provided element
        index(el) {
            const parent = self.parent(el);

            return Array.prototype.indexOf.call(parent[0].children, el[0]);
        },
        matches(el, selector) {
            const matchesSelector = el.matches || el.msMatchesSelector;

            if (matchesSelector.call(el, selector)) {
                return el;
            } else {
                return null;
            }
        },
        // get elements not matching the given criteria
        not(collection, filter) {
            const filtered = [];

            for (var i = 0; i < collection.length; i++) {
                if (!self.matches(collection[i], filter)) {
                    filtered.push(collection[i]);
                }
            }

            return filtered;
        },
        even(collection) {
            const filtered = [];

            for (var i = 0; i < collection.length; i++) {
                if (((self.index([collection[i]]) + 1) % 2) === 0) {
                    filtered.push(collection[i]);
                }
            }

            return filtered;
        },
        odd(collection) {
            const filtered = [];

            for (var i = 0; i < collection.length; i++) {
                if (((self.index([collection[i]]) + 1) % 2) !== 0) {
                    filtered.push(collection[i]);
                }
            }

            return filtered;
        },
        // get the data value from the given element
        data(el, dataName) {
            const data = el[0].dataset[dataName];

            if (typeof data !== 'undefined') {
                return data;
            }

            console.log('there is no data attribute with this name');

            return;
        },
        // get the first element in the collection
        first(collection) {
            return collection[0];
        },
        // get the last element in the collection
        last(collection) {
            if (collection.length > 1) {
                return collection[collection.length - 1];
            }

            return collection[0];
        },
        // returns parent of the first element if a collection is provided
        parent(el, selector = null) {
            // get the parent elements for each element in the collection
            // if they are the same parent only return a single item
            const parents = [];

            for (var i = 0; i < el.length; i++) {
                if (selector) {
                    parents.push(self.matches(el[i].parentNode, selector));
                } else {
                    parents.push(el[i].parentNode);
                }
            }

            return self.unique(parents);
        },
        // return all of the element's parents through the entire dom tree
        parents(el, selector = null) {
            let firstEl = el[0];
            const parents = [];

            while (firstEl) {
                if (firstEl.tagName && typeof firstEl.tagName !== 'undefined' && firstEl.tagName !== 'HTML') {
                    parents.push(firstEl.parentNode);
                }

                firstEl = el.parentNode;
            }

            return parents;
        },
        // // children
        // children(el, selector = null) {
        //     return children;
        // },
        // prev(el, selector = null) {
        //     return prevElement;
        // },
        // next(el, selector = null) {
        //     return nextElement;
        // },
        // // find
        // find(selector, collection = null) {
        //     return collection;
        // },
        // // hasClass
        // hasClass(el, className) {
        //     return false;
        // },
        // // addClass
        // addClass(el, className) {
        //     return;
        // },
        // // removeClass
        // removeClass(el, className) {
        //     return;
        // },
        // // toggleClass
        // toggleClass(el, className) {
        //     return;
        // },
        // // clone
        // clone(el) {
        //     return clone;
        // },
        // // css
        // css(el, css = {}) {
        //     return;
        // },
        // // appendTo
        // appendTo(el, target) {
        //     return;
        // },
        // // prependTo
        // prependTo(el, target) {
        //     return;
        // },
        // // extend obj
        // extendObj(obj, newObj = {}) {
        //     return;
        // }
    };

    return self;
};

export default elrUtilities;