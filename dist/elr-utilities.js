'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var $ = require('jquery');

if (!Number.isNan) {
    Number.isNan = function (num) {
        return num !== num;
    };
}

var elrUtilities = function elrUtilities() {
    var self = {
        // TODO: add support for sorting datetime values
        patterns: {
            numeral: new RegExp('[0-9]+'),
            alphaLower: new RegExp('[a-z]+'),
            alphaUpper: new RegExp('[A-Z]+'),
            specialCharacters: new RegExp('[^a-zA-Z0-9_]'),
            allNumbers: new RegExp('^[0-9]*$'),
            allAlphaLower: new RegExp('^[a-z]*$'),
            allAlphaUpper: new RegExp('^[A-Z]*$'),
            allSpecialCharacters: new RegExp('^[^a-zA-Z0-9_]*$'),
            hour: new RegExp('^(\\d+)'),
            minute: new RegExp(':(\\d+)'),
            ampm: new RegExp('(am|pm|AM|PM)$'),
            // an integer can be negative or positive and can include one comma separator followed by exactly 3 numbers
            integer: new RegExp('(^\\-?\\d*$)|(^\\-?\\d*(,\\d{3})*$)'),
            number: new RegExp('^(?:\\-?\\d+|\\d*)(?:\\.?\\d+|\\d)$'),
            url: new RegExp('^https?:\\/\\/[\\da-z\\.\\-]+[\\.a-z]{2,6}[\\/\\w/.\\-]*\\/?$', 'i'),
            email: new RegExp('^[a-z][a-z\\-\\_\\.\\d]*@[a-z\\-\\_\\.\\d]*\\.[a-z]{2,6}$', 'i'),
            // validates 77494 and 77494-3232
            postalCode: new RegExp('^[0-9]{5}-[0-9]{4}$|^[0-9]{5}$'),
            // validates United States phone number patterns
            phone: new RegExp('^\\(?\\d{3}[\\)\\-\\.]?[\\s]?\\d{3}[\\-\\.]?\\d{4}(?:[xX]\\d+)?$', 'i'),
            // allows alpha . - and ensures that the user enters both a first and last name
            fullName: new RegExp('^[a-z]+ [a-z\\.\\- ]+$', 'i'),
            alpha: new RegExp('[a-z]*', 'i'),
            allAlpha: new RegExp('^[a-z\\-\\s]*$', 'i'),
            alphaNum: new RegExp('^[a-z\\d ]*$', 'i'),
            spaces: new RegExp('^[\\S]*$', 'i'),
            alphaNumDash: new RegExp('^[a-z\\d- ]*$', 'i'),
            // allows alphanumeric characters and underscores; no spaces; recommended for usernames
            alphaNumUnderscore: new RegExp('^[a-z\\d_]*$', 'i'),
            tags: new RegExp('<[a-z]+.*>.*<\/[a-z]+>', 'i'),
            // mm/dd/yyyy
            monthDayYear: new RegExp('^(?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4}$'),
            // 00:00pm
            time: new RegExp('^(?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\/:[012345][0-9])?(?:am|pm)$', 'i'),
            // matched all major cc
            creditCard: new RegExp('^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$'),
            cvv: new RegExp('^[0-9]{3,4}$'),
            longDate: new RegExp('^(?:[a-z]*[\\.,]?\\s)?[a-z]*\\.?\\s(?:[3][01],?\\s|[012][1-9],?\\s|[1-9],?\\s)[0-9]{4}$', 'i'),
            shortDate: new RegExp('((?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4})'),
            longTime: new RegExp('((?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\\:[012345][0-9])?(?:am|pm)?)', 'i'),
            longMonth: new RegExp('^(?:[a-zA-Z]*[\\.,]?\\s)?[a-zA-Z]*'),
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
        each: function each(collection, callback) {
            var i = 0;
            var length = collection.length;
            var isArray = self.isArrayLike(collection);

            if (isArray) {
                for (; i < length; i++) {
                    if (callback.call(collection[i], i, collection[i]) === false) {
                        break;
                    }
                }
            } else {
                for (i in collection) {
                    if (callback.call(collection[i], i, collection[i]) === false) {
                        break;
                    }
                }
            }

            return collection;
        },
        trim: function trim(str) {
            if (str) {
                return str === null ? '' : str.replace(/^\s+|\s+$/g, '');
            }

            return false;
        },
        isOdd: function isOdd(val) {
            return val % 2 === 1;
        },
        isEven: function isEven(val) {
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
        isDate: function isDate(val) {
            return this.patterns.sortMonthDayYear.test(val) ? true : false;
        },
        isNumber: function isNumber(val) {
            return this.patterns.sortNumber.test(val) ? true : false;
        },
        isAlpha: function isAlpha(val) {
            return this.patterns.alpha.test(val) ? true : false;
        },
        isTime: function isTime(val) {
            return this.patterns.sortTime.test(val) ? true : false;
        },
        getDataTypes: function getDataTypes(values) {
            var _this = this;

            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var types = [];
            type = type || null;

            if (type) {
                types.push(type);
            } else {
                this.each(values, function (k, v) {
                    if (v === '') {
                        return;
                    }

                    if (_this.isDate(v)) {
                        return types.push('date');
                    } else if (_this.isTime(v)) {
                        return types.push('time');
                    } else if (_this.isNumber(v)) {
                        return types.push('number');
                    } else if (_this.isAlpha(v)) {
                        return types.push('alpha');
                    } else {
                        return;
                    }
                });
            }

            return this.unique(types);
        },
        generateRandomString: function generateRandomString(length, charset) {
            var str = '';
            length = length || 10;
            charset = charset || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

            for (var i = 0, n = charset.length; i < length; i++) {
                str += charset.charAt(Math.floor(Math.random() * n));
            }

            return str;
        },
        checkBlacklist: function checkBlacklist(str, blacklist) {
            if (str) {
                return self.inArray(blacklist, str.toLowerCase());
            }

            return;
        },
        checkLength: function checkLength(str, reqLength) {
            if (str) {
                return str.length < reqLength ? true : false;
            }

            return;
        },
        getText: function getText(elems) {
            var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';

            var text = [];

            self.each(elems, function () {
                var val = this.innerText || this.textContent;
                text.push(self.trim(val));
            });

            return text.join(separator);
        },
        getTextArray: function getTextArray(elems) {
            var arr = [];

            self.each(elems, function () {
                var val = this.innerText || this.textContent;
                arr.push(val);
            });

            return arr;
        },
        getValue: function getValue(field) {
            var value = self.trim(field.value);

            if (value.length > 0) {
                return value;
            } else {
                return null;
            }
        },
        getColumnList: function getColumnList(columnNum, $listItems) {
            var $list = [];

            self.each($listItems, function (k, v) {
                $list.push($(v).find('td').eq(columnNum));

                return $list;
            });

            return $list;
        },
        getListValues: function getListValues($list) {
            var values = [];

            self.each($list, function (k, v) {
                values.push(self.trim($(v).text()).toLowerCase());

                return values;
            });

            return values;
        },

        // removes leading 'the' or 'a' from a string
        cleanAlpha: function cleanAlpha(str, ignoreWords) {
            ignoreWords = ignoreWords || ['the', 'a'];

            self.each(ignoreWords, function () {
                var re = new RegExp('^' + this + '\\s', 'i');
                str = str.replace(re, '');

                return str;
            });

            return str;
        },
        capitalize: function capitalize(str) {
            return str.toLowerCase().replace(/^.|\s\S/g, function (a) {
                return a.toUpperCase();
            });
        },

        // debounce
        throttle: function throttle(fn, threshold, scope) {
            var last = void 0;
            var deferTimer = void 0;

            threshold = threshold || 500;

            return function () {
                var context = scope || this;
                var now = +new Date(),
                    args = arguments;

                if (last && now < last + threshold) {
                    // hold on to it
                    clearTimeout(deferTimer);
                    deferTimer = setTimeout(function () {
                        last = now;
                        fn.apply(context, args);
                    }, threshold);
                } else {
                    last = now;
                    fn.apply(context, args);
                }
            };
        },
        clearElement: function clearElement($el, speed) {
            speed = speed || 300;

            $el.fadeOut(speed, function () {
                $(this).remove();
            });
        },
        clearForm: function clearForm($fields) {
            $fields.each(function () {
                var $that = $(this);
                if ($that.attr('type') === 'checkbox') {
                    $that.prop('checked', false);
                } else {
                    $that.val('');
                }
            });
        },
        cleanString: function cleanString(str, re) {
            var reg = new RegExp(re, 'i');
            return self.trim(str.replace(reg, ''));
        },
        getFormData: function getFormData($form) {
            // get form data and return an object
            // need to remove dashes from ids
            var formInput = {};
            var $fields = $form.find(':input').not('button').not(':checkbox');
            var $checkboxes = $form.find('input:checked');

            if ($checkboxes.length !== 0) {
                (function () {
                    var boxIds = [];

                    $checkboxes.each(function () {
                        boxIds.push($(this).attr('id'));
                    });

                    boxIds = self.unique(boxIds);

                    self.each(boxIds, function () {
                        var checkboxValues = [];
                        var $boxes = form.find('input:checked#' + this);

                        $boxes.each(function () {
                            checkboxValues.push(self.trim($(this).val()));
                        });

                        formInput[this] = checkboxValues;
                        return;
                    });
                })();
            }

            self.each(fields, function () {
                var $that = $(this);
                var id = $that.attr('id');
                var formInput = [];
                var input = void 0;

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
        createElement: function createElement(tagName) {
            var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return $('<' + tagName + '></' + tagName + '>', attrs);
        },
        toTop: function toTop($content, speed) {
            $content.stop().animate({
                'scrollTop': $content.position().top
            }, speed, 'swing');
        },
        killEvent: function killEvent($el, eventType) {
            var selector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            if (selector === null) {
                $el.on(eventType, function (e) {
                    e.stopPropagation();
                });
            }

            $el.on(eventType, selector, function (e) {
                e.stopPropagation();
            });
        },

        // scrollEvent($el, offset, cb) {
        //     // TODO: finish thie function
        //     if ($(document).scrollTop() > $(window).height()) {
        //         cb();
        //     }
        // },
        scrollToView: function scrollToView($el) {
            var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

            var showElement = function showElement(speed) {
                var scroll = $(document).scrollTop();
                var height = $(window).height();

                if (scroll > height) {
                    $el.fadeIn(speed);
                } else if (scroll < height) {
                    $el.fadeOut(speed);
                }
            };

            $(window).on('scroll', self.throttle(showElement, 100));
        },
        strToArray: function strToArray(str) {
            var arr = [];
            var splitStr = str.split(',');

            self.each(splitStr, function () {
                arr.push(self.trim(this));
            });

            return arr;
        },
        isArray: function isArray(arr) {
            return Array.isArray(arr);
        },
        isArrayLike: function isArrayLike(obj) {
            return obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && (obj.length === 0 || typeof obj.length === 'number' && obj.length > 0 && obj.length - 1 in obj);
        },
        unique: function unique(arr) {
            // const that = this;
            return arr.filter(function (v, i, that) {
                return that.indexOf(v) === i;
            });
        },
        inArray: function inArray(arr, item, i) {
            return arr == null ? -1 : arr.indexOf(item, i);
        },

        // create an array of unique items from a list
        toArray: function toArray(items) {
            var unique = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var arr = [];

            self.each(items, function () {
                arr.push(this.textContent);

                if (unique) {
                    return self.unique(arr);
                }

                return arr;
            });

            return arr;
        },

        // create object keys with arrays for each value in an array
        createArrays: function createArrays(obj, list) {
            self.each(list, function () {
                obj[this] = [];
            });

            return obj;
        },

        // combine an object made up of arrays into a single array
        concatArrays: function concatArrays(obj) {
            var arr = [];

            self.each(obj, function () {
                arr = arr.concat(this);
            });

            return arr;
        },

        // test for alpha values and perform alpha sort
        sortValues: function sortValues(a, b) {
            var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ascending';

            if (this.patterns.alpha.test(a)) {
                if (a < b) {
                    return dir === 'ascending' ? -1 : 1;
                } else if (a > b) {
                    return dir === 'ascending' ? 1 : -1;
                } else if (a === b) {
                    return 0;
                }
            }

            return dir === 'ascending' ? a - b : b - a;
        },
        sortComplexList: function sortComplexList(types, listItems) {
            var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ascending';

            var that = this;
            var sortLists = {};

            // create sortList arrays
            that.createArrays(sortLists, types);

            // add list items to sortLists arrays

            that.each(types, function () {
                var type = this;

                that.each(listItems, function () {
                    var listItem = this;
                    var val = that.trim($(listItem).text());

                    if (that['is' + that.capitalize(type)].call(that, val)) {
                        sortLists[type].push(listItem);
                    } else {
                        return;
                    }
                });

                that.each(sortLists[type], function () {
                    var val = $(this).text();

                    $(listItems).each(function (k) {
                        var listVal = $(this).text();

                        if (listVal === val) {
                            listItems.splice(k, 1);
                        }
                    });
                });
            });

            // sort sortLists arrays
            that.each(sortLists, function (key) {
                that['sort' + that.capitalize(key)](sortLists[key], dir);
            });

            // that.each(types, function() {
            //     let type = this;
            //     that.each(sortLists[type], function(k, v) {
            //         console.log($(v).text() + ':' + type);
            //     });
            // });

            return that.concatArrays(sortLists);
        },
        sortDate: function sortDate($items, dir) {
            var _this2 = this;

            var sort = function sort(a, b) {
                if (_this2.isDate(_this2.trim($(a).text())) && _this2.isDate(_this2.trim($(b).text()))) {
                    a = new Date(_this2.patterns.sortMonthDayYear.exec(_this2.trim($(a).text())));
                    b = new Date(_this2.patterns.sortMonthDayYear.exec(_this2.trim($(b).text())));
                }

                return _this2.sortValues(a, b, dir);
            };

            return $items.sort(sort);
        },

        // converts a time string to 24hr time
        parseTime: function parseTime(time) {
            var minutes = this.patterns.minute.exec(time)[1];
            var ampm = this.patterns.ampm.exec(time)[1].toLowerCase();
            var hour = parseInt(this.patterns.hour.exec(time)[1], 10);

            if (ampm === 'am') {
                hour = hour.toString();

                if (hour === '12') {
                    hour = '00';
                } else if (hour.length === 1) {
                    hour = '0' + hour;
                }

                return hour + ':' + minutes;
            } else if (ampm === 'pm') {
                return hour + 12 + ':' + minutes;
            }

            return 'should be am or pm';
        },
        sortTime: function sortTime($items, dir) {
            var _this3 = this;

            var sort = function sort(a, b) {
                var time1 = _this3.patterns.sortTime.exec(_this3.trim($(a).text()))[0];
                var time2 = _this3.patterns.sortTime.exec(_this3.trim($(b).text()))[0];

                if (_this3.isTime(_this3.trim($(a).text())) && _this3.isTime(_this3.trim($(b).text()))) {
                    a = new Date('04-22-2014 ' + _this3.parseTime(time1));
                    b = new Date('04-22-2014 ' + _this3.parseTime(time2));
                }

                return _this3.sortValues(a, b, dir);
            };

            return $items.sort(sort);
        },
        sortAlpha: function sortAlpha($items, dir) {
            var _this4 = this;

            var sort = function sort(a, b) {
                a = _this4.cleanAlpha(_this4.trim($(a).text()), ['the', 'a']).toLowerCase();
                b = _this4.cleanAlpha(_this4.trim($(b).text()), ['the', 'a']).toLowerCase();

                return _this4.sortValues(a, b, dir);
            };

            return $items.sort(sort);
        },
        sortNumber: function sortNumber($items, dir) {
            var _this5 = this;

            var sort = function sort(a, b) {
                a = parseFloat(_this5.trim($(a).text()));
                b = parseFloat(_this5.trim($(b).text()));

                return _this5.sortValues(a, b, dir);
            };

            return $items.sort(sort);
        },
        sortColumnDate: function sortColumnDate($listItems, dir, columnNum) {
            var _this6 = this;

            var sort = function sort(a, b) {
                a = _this6.trim($(a).find('td').eq(columnNum).text());
                b = _this6.trim($(b).find('td').eq(columnNum).text());

                if (_this6.isDate(a) && _this6.isDate(b)) {
                    a = new Date(_this6.patterns.monthDayYear.exec(a));
                    b = new Date(_this6.patterns.monthDayYear.exec(b));

                    return _this6.sortValues(a, b, dir);
                }

                return;
            };

            return $listItems.sort(sort);
        },
        sortColumnTime: function sortColumnTime($listItems, dir, columnNum) {
            var _this7 = this;

            var sort = function sort(a, b) {
                a = _this7.trim($(a).find('td').eq(columnNum).text());
                b = _this7.trim($(b).find('td').eq(columnNum).text());

                if (_this7.isTime(a) && _this7.isTime(b)) {
                    a = new Date('04-22-2014 ' + _this7.parseTime(_this7.patterns.monthDayYear.exec(a)));
                    b = new Date('04-22-2014 ' + _this7.parseTime(_this7.patterns.monthDayYear.exec(b)));
                } else {
                    return;
                }

                return _this7.sortValues(a, b, dir);
            };

            return $listItems.sort(sort);
        },
        sortColumnAlpha: function sortColumnAlpha($listItems, dir, columnNum) {
            var _this8 = this;

            var ignoreWords = ['a', 'the'];
            var sort = function sort(a, b) {
                a = _this8.cleanAlpha(_this8.trim($(a).find('td').eq(columnNum).text()), ignoreWords).toLowerCase();
                b = _this8.cleanAlpha(_this8.trim($(b).find('td').eq(columnNum).text()), ignoreWords).toLowerCase();

                return _this8.sortValues(a, b, dir);
            };

            return $listItems.sort(sort);
        },
        sortColumnNumber: function sortColumnNumber($listItems, dir, columnNum) {
            var _this9 = this;

            var sort = function sort(a, b) {
                a = parseFloat(_this9.trim($(a).find('td').eq(columnNum).text()));
                b = parseFloat(_this9.trim($(b).find('td').eq(columnNum).text()));

                return _this9.sortValues(a, b, dir);
            };

            return $listItems.sort(sort);
        },
        scrollSpy: function scrollSpy($nav, $content, el, activeClass) {
            var scroll = $(document).scrollTop();
            var $links = $nav.find('a[href^="#"]');
            var positions = this.findPositions($content, el);

            this.each(positions, function (index, value) {
                if (scroll === 0) {
                    $nav.find('a.' + activeClass).removeClass(activeClass);
                    $links.eq(0).addClass(activeClass);
                } else if (value < scroll) {
                    // if value is less than scroll add activeClass to link with the same index
                    $nav.find('a.' + activeClass).removeClass(activeClass);
                    $links.eq(index).addClass(activeClass);
                }
            });
        },
        getPosition: function getPosition(height, $obj) {
            if (height > 200) {
                return $obj.position().top - $obj.height() / 4;
            }

            return $obj.position().top - $obj.height() / 2;
        },
        findPositions: function findPositions($content, el) {
            var $sections = $content.find(el);
            var positions = [];

            // populate positions array with the position of the top of each section element
            $sections.each(function (index) {
                var $that = $(this);
                var length = $sections.length;
                var position = void 0;

                // the first element's position should always be 0
                if (index === 0) {
                    position = 0;
                } else if (index === length - 1) {
                    // subtract the bottom container's full height so final scroll value is equivalent
                    // to last container's position
                    position = self.getPosition($that.height, $that);
                } else {
                    // for all other elements correct position by only subtracting half of its height
                    // from its top position
                    position = $that.position().top - $that.height() / 4;
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
        openInTab: function openInTab($links) {
            $links.on('click', function (e) {
                e.preventDefault();
                window.open($(this).attr('href'), '_blank');
            });
        },
        isMobile: function isMobile() {
            var mobileWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 568;

            return $(window).width() <= mobileWidth ? true : false;
        },

        // assigns a random class to an element.
        // useful for random backgrounds/styles
        randomClass: function randomClass() {
            var classList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var $el = arguments[1];

            elr.each(classList, function (index, value) {
                $el.removeClass(value);
            });

            $el.addClass(classList[Math.floor(Math.random() * classList.length)]);
        },

        // smooth scroll to section of page
        // put id of section in href attr of link
        gotoSection: function gotoSection() {
            var section = $(this).attr('href').split('#').pop();

            $('body, html').stop().animate({
                'scrollTop': $('#' + section).position().top
            });

            return false;
        },
        closest: function closest(el, selector) {
            var firstEl = el[0];
            var matchesSelector = firstEl.matches || firstEl.msMatchesSelector;
            var els = [];
            var closestEl = void 0;

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
        eq: function eq(collection, index) {
            var els = [];

            var parent = self.parent(collection).length > 1 ? self.parent(collection)[0] : self.parent(collection);

            console.log(parent);

            var checkCollectionLength = function checkCollectionLength(collection) {
                // make sure an element with the index exists in the collection
                if (collection.length < index + 1) {
                    console.log('There is no element with that index');

                    return false;
                }

                return true;
            };

            var children = checkCollectionLength(collection) ? parent[0].children : null;

            els.push(children[index]);

            return els;
        },

        // get the index of the provided element
        index: function index(el) {
            var parent = self.parent(el);

            return Array.prototype.indexOf.call(parent[0].children, el[0]);;
        },
        matches: function matches(el, selector) {
            var matchesSelector = el.matches || el.msMatchesSelector;

            if (matchesSelector.call(el, selector)) {
                return el;
            } else {
                return null;
            }
        },

        // get elements not matching the given criteria
        not: function not(collection, filter) {
            var filtered = [];

            for (var i = 0; i < collection.length; i++) {
                if (!self.matches(collection[i], filter)) {
                    filtered.push(collection[i]);
                }
            }

            return filtered;
        },
        even: function even(collection) {
            var filtered = [];

            for (var i = 0; i < collection.length; i++) {
                if ((self.index([collection[i]]) + 1) % 2 === 0) {
                    filtered.push(collection[i]);
                }
            }

            return filtered;
        },
        odd: function odd(collection) {
            var filtered = [];

            for (var i = 0; i < collection.length; i++) {
                if ((self.index([collection[i]]) + 1) % 2 !== 0) {
                    filtered.push(collection[i]);
                }
            }

            return filtered;
        },

        // get the data value from the given element
        data: function data(el, dataName) {
            var data = el[0].dataset[dataName];

            if (typeof data !== 'undefined') {
                return data;
            }

            console.log('there is no data attribute with this name');

            return;
        },

        // get the first element in the collection
        first: function first(collection) {
            return collection[0];
        },

        // get the last element in the collection
        last: function last(collection) {
            if (collection.length > 1) {
                return collection[collection.length - 1];
            }

            return collection[0];
        },

        // returns parent of the first element if a collection is provided
        parent: function parent(el) {
            var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            // get the parent elements for each element in the collection
            // if they are the same parent only return a single item
            var parents = [];

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
        parents: function parents(el) {
            var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var firstEl = el[0];
            var parents = [];

            while (firstEl) {
                if (firstEl.tagName && typeof firstEl.tagName !== 'undefined' && firstEl.tagName !== 'HTML') {
                    parents.push(firstEl.parentNode);
                }

                firstEl = el.parentNode;
            }

            return parents;
        },

        // children
        children: function (_children) {
            function children(_x13) {
                return _children.apply(this, arguments);
            }

            children.toString = function () {
                return _children.toString();
            };

            return children;
        }(function (el) {
            var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            return children;
        }),
        prev: function prev(el) {
            var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            return prevElement;
        },
        next: function next(el) {
            var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            return nextElement;
        },

        // find
        find: function find(selector) {
            var collection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            return collection;
        },

        // hasClass
        hasClass: function hasClass(el, className) {
            return false;
        },

        // addClass
        addClass: function addClass(el, className) {
            return;
        },

        // removeClass
        removeClass: function removeClass(el, className) {
            return;
        },

        // toggleClass
        toggleClass: function toggleClass(el, className) {
            return;
        },

        // clone
        clone: function (_clone) {
            function clone(_x18) {
                return _clone.apply(this, arguments);
            }

            clone.toString = function () {
                return _clone.toString();
            };

            return clone;
        }(function (el) {
            return clone;
        }),

        // css
        css: function css(el) {
            var _css = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return;
        },

        // appendTo
        appendTo: function appendTo(el, target) {
            return;
        },

        // prependTo
        prependTo: function prependTo(el, target) {
            return;
        }
    };

    return self;
};

exports.default = elrUtilities;