(function($) {
    // adds case insensitive contains to jQuery

    $.extend($.expr[":"], {
        "containsNC": function(elem, i, match) {
            return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
        }
    });

    var elrUtilities = function() {
        var self = {};

        // TODO: add support for sorting datetime values
        self.patterns = {
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
            integer: new RegExp("(^\\-?\\d*$)|(^\\-?\\d*(,\\d{3})*$)"),
            number: new RegExp("^(?:\\-?\\d+|\\d*)(?:\\.?\\d+|\\d)$"),
            url: new RegExp('^https?:\\/\\/[\\da-z\\.\\-]+[\\.a-z]{2,6}[\\/\\w/.\\-]*\\/?$','i'),
            email: new RegExp('^[a-z][a-z\\-\\_\\.\\d]*@[a-z\\-\\_\\.\\d]*\\.[a-z]{2,6}$','i'),
            // validates 77494 and 77494-3232
            zip: new RegExp('^[0-9]{5}-[0-9]{4}$|^[0-9]{5}$'),
            // validates United States phone number patterns
            phone: new RegExp('^\\(?\\d{3}[\\)\\-\\.]?[\\s]?\\d{3}[\\-\\.]?\\d{4}(?:[xX]\\d+)?$','i'),
            // allows alpha . - and ensures that the user enters both a first and last name
            fullName: new RegExp('^[a-z]+ [a-z\\.\\- ]+$','i'),
            alpha: new RegExp('[a-z]*','i'),
            allAlpha: new RegExp('^[a-z\\-\\s]*$','i'),
            alphaNum: new RegExp('^[a-z\\d ]*$','i'),
            noSpaces: new RegExp('^[\\S]*$','i'),
            alphaNumDash: new RegExp('^[a-z\\d- ]*$','i'),
            // allows alphanumeric characters and underscores; no spaces; recommended for usernames
            alphaNumUnderscore: new RegExp('^[a-z\\d_]*$','i'),
            noTags: new RegExp('<[a-z]+.*>.*<\/[a-z]+>','i'),
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
            sortNumber: new RegExp("^(?:\\-?\\d+|\\d*)(?:\\.?\\d+|\\d)"),
            sortMonthDayYear: new RegExp('^(?:[0]?[1-9]|[1][012]|[1-9])[-\/.](?:[0]?[1-9]|[12][0-9]|[3][01])[-\/.][0-9]{4}'),
            sortTime: new RegExp('^(?:[12][012]:|[0]?[0-9]:)[012345][0-9](?:\/:[012345][0-9])?(?:am|pm|AM|PM)', 'i')
        };

        self.dataTypeChecks = {
            isDate: function(value) {
                return ( self.patterns.sortMonthDayYear.test(value) ) ? true : false;
            },
            isNumber: function(value) {
                return ( self.patterns.sortNumber.test(value) ) ? true : false;
            },
            isAlpha: function(value) {
                return ( self.patterns.alpha.test(value) ) ? true : false;
            },
            isTime: function(value) {
                return ( self.patterns.sortTime.test(value) ) ? true : false;
            }
        };

        self.getDataTypes = function(values, type) {
            var that = this;
            var types = [];
            type = type || null;

            if ( type ) {
                types.push(type);
            } else {
                $.each(values, function(k,v) {
                    if ( v === '' ) {
                        return;
                    }

                    if ( self.dataTypeChecks.isDate.call(that, v) ) {
                        return types.push('date');
                    } else if ( self.dataTypeChecks.isTime.call(that, v) ) {
                        return types.push('time');
                    } else if ( self.dataTypeChecks.isNumber.call(that, v) ) {
                        return types.push('number');
                    } else if ( self.dataTypeChecks.isAlpha.call(that, v) ) {
                        return types.push('alpha');
                    } else {
                        return;
                    }
                });
            }
            return $.unique(types);
        };

        self.generateRandomString = function(length, charset) {
            var str = '';
            length = length || 10;
            charset = charset || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

            for (var i = 0, n = charset.length; i < length; i++) {
                str += charset.charAt(Math.floor(Math.random() * n));
            }

            return str;
        };

        self.checkBlacklist = function(password, blacklist) {
            return $.inArray(password.toLowerCase(), blacklist);
        };

        self.checkLength = function(str, reqLength) {
            return (str.length < reqLength) ? true : false;
        };

        self.getText = function($elems) {
            var text = [];

            $.each($elems, function() {
                text.push($(this).text());
            });

            return text;
        };

        self.getValue = function($field) {
            return $.trim($field.val());
        };

        self.getColumnList = function(columnNum, $listItems) {
            var $list = [];

            $.each($listItems, function(k,v) {
                $list.push($(v).find('td').eq(columnNum));

                return $list;
            });

            return $list;
        };

        self.getListValues = function($list) {
            var values = [];

            $.each($list, function(k,v) {
                values.push($.trim($(v).text()).toLowerCase());

                return values;
            });

            return values;
        };

        // removes leading 'the' or 'a' from a string
        self.cleanAlpha = function(str, ignoreWords) {
            ignoreWords = ignoreWords || ['the', 'a'];

            $.each(ignoreWords, function() {
                var re = new RegExp("^" + this + "\\s", 'i');
                str = str.replace(re, '');

                return str;
            });

            return str;
        };

        self.capitalize = function(str) {
            return str.toLowerCase().replace(/^.|\s\S/g, function(a) {
                return a.toUpperCase();
            });
        };
        
        self.throttle = function(fn, threshold, scope) {
            var last;
            var deferTimer;
            
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
        };

        self.clearElement = function($el, speed) {
            speed = speed || 300;

            $el.fadeOut(speed, function() {
                $(this).remove();
            });
        };

        self.createElement = function(tagName, attrs) {
            attrs = attrs || {};
            return $('<' + tagName + '></' + tagName + '>', attrs);
        };

        self.toTop = function($content, speed) {
            $content.stop().animate({
                'scrollTop': $content.position().top
            }, speed, 'swing');
        };

        self.killEvent = function($el, eventType, selector) {
            selector = selector || null;

            if ( selector === null ) {
                $el.on(eventType, function(e) {
                    e.stopPropagation();
                });                
            } else {
                $el.on(eventType, selector, function(e) {
                    e.stopPropagation();
                });                  
            }
        };

        self.scrollToView = function($el, speed) {
            var scroll = $('body').scrollTop();
            var height = $(window).height() - 200;

            speed = speed || 300;

            if ( scroll > height ) {
                $el.fadeIn(speed);
            } else if ( scroll < height ) {
                $el.fadeOut(speed);
            }
        };

        // create an array of unique items from jQuery object text
        self.toArray = function($items, unique) {
            var arr = [];
            unique = unique || false;

            $.each($items, function(key, value) {
                arr.push($(value).text());

                if ( unique ) {
                    return $.unique(arr);    
                } else {
                    return arr;
                }
            });

            return arr;
        };

        // create object keys with arrays for each value in an array
        self.createArrays = function(obj, list) {
            $.each(list, function() {
                obj[this] = [];
            });

            return obj;
        };

        // combine an object made up of arrays into a single array
        self.concatArrays = function(obj) {
            var arr = [];

            $.each(obj, function() {
                arr = arr.concat(this);
            });
            return arr;
        };

        // test for alpha values and perform alpha sort
        self.sortValues = function(a, b, dir) {
            dir = dir || 'ascending';

            if ( self.patterns.alpha.test(a) ) {
                if ( a < b ) {
                    return ( dir === 'ascending' ) ? -1 : 1;
                } else if ( a > b ) {
                    return ( dir === 'ascending' ) ? 1 : -1;
                } else if ( a === b ) {
                    return 0;
                }
            } else {
                return ( dir === 'ascending' ) ? a - b : b - a;
            }
        };

        self.sortComplexList = function(types, listItems, direction) {
            var that = this;
            var sortLists = {};

            direction = direction || 'ascending';

            // create sortList arrays
            self.createArrays(sortLists, types);

            // add list items to sortLists arrays

            $.each(types, function() {
                var type = this;
                
                $.each(listItems, function() {
                    var listItem = this;
                    var value = $.trim($(listItem).text());

                    if ( self.dataTypeChecks['is' + self.capitalize(type)].call(that, value) ) {
                        sortLists[type].push(listItem);
                    } else {
                        return;
                    }
                });

                $.each(sortLists[type], function() {
                    var value = ($(this).text());

                    $(listItems).each(function(k) {
                        var listVal = $(this).text();

                        if (listVal === value) {
                            listItems.splice(k, 1);
                        }
                    });
                });
            });

            // sort sortLists arrays
            $.each(sortLists, function(key) {
                self.comparators['sort' + self.capitalize(key)](sortLists[key], direction);
            });

            // $.each(types, function() {
            //     var type = this;
            //     $.each(sortLists[type], function(k, v) {
            //         console.log($(v).text() + ':' + type);
            //     });
            // });

            return self.concatArrays(sortLists);
        };

        self.comparators = {
            sortDate: function($items, direction) {
                var sort = function(a, b) {
                    if ( self.dataTypeChecks.isDate($.trim($(a).text())) && self.dataTypeChecks.isDate($.trim($(b).text())) ) {
                        a = new Date(self.patterns.sortMonthDayYear.exec($.trim($(a).text())));
                        b = new Date(self.patterns.sortMonthDayYear.exec($.trim($(b).text())));
                    }

                    return self.sortValues(a, b, direction);
                };

                return $items.sort(sort);
            },

            sortTime: function($items, direction) {
                var sort = function(a, b) {
                    var time1 = self.patterns.sortTime.exec($.trim($(a).text()))[0];
                    var time2 = self.patterns.sortTime.exec($.trim($(b).text()))[0];

                    if ( self.dataTypeChecks.isTime($.trim($(a).text())) && self.dataTypeChecks.isTime($.trim($(b).text())) ) {
                        a = new Date("04-22-2014 " + self.parseTime(time1));
                        b = new Date("04-22-2014 " + self.parseTime(time2));
                    }

                    return self.sortValues(a, b, direction);
                };

                return $items.sort(sort);
            },

            sortAlpha: function($items, direction) {
                var sort = function(a, b) {
                    a = self.cleanAlpha($.trim($(a).text()), ['the', 'a']).toLowerCase();
                    b = self.cleanAlpha($.trim($(b).text()), ['the', 'a']).toLowerCase();

                    return self.sortValues(a, b, direction);
                };

                return $items.sort(sort);
            },

            sortNumber: function($items, direction) {
                var sort = function(a, b) {
                    a = parseFloat($.trim($(a).text()));
                    b = parseFloat($.trim($(b).text()));

                    return self.sortValues(a, b, direction);
                };

                return $items.sort(sort);
            },

            sortColumnDate: function($listItems, dir, columnNum) {
                var sort = function(a,b) {
                    a = $.trim($(a).find('td').eq(columnNum).text());
                    b = $.trim($(b).find('td').eq(columnNum).text());

                    if ( self.dataTypeChecks.isDate(a) && self.dataTypeChecks.isDate(b) ) {
                        a = new Date(self.patterns.monthDayYear.exec(a));
                        b = new Date(self.patterns.monthDayYear.exec(b));
                    } else {
                        return;
                    }

                    return self.sortValues(a, b, dir);
                };

                return $listItems.sort(sort);
            },

            sortColumnTime: function($listItems, dir, columnNum) {
                var sort = function(a,b) {
                    a = $.trim($(a).find('td').eq(columnNum).text());
                    b = $.trim($(b).find('td').eq(columnNum).text());

                    if ( self.dataTypeChecks.isTime(a) && self.dataTypeChecks.isTime(b) ) {
                        a = new Date('04-22-2014' + self.parseTime(self.patterns.monthDayYear.exec(a)));
                        b = new Date('04-22-2014' + self.parseTime(self.patterns.monthDayYear.exec(b)));
                    } else {
                        return;
                    }

                    return self.sortValues(a, b, dir);
                };

                return $listItems.sort(sort);
            },

            sortColumnAlpha: function($listItems, dir, columnNum) {
                var ignoreWords = ['a', 'the'];
                var sort = function(a,b) {
                    a = self.cleanAlpha($.trim($(a).find('td').eq(columnNum).text()), ignoreWords).toLowerCase();
                    b = self.cleanAlpha($.trim($(b).find('td').eq(columnNum).text()), ignoreWords).toLowerCase();

                    return self.sortValues(a, b, dir);
                };

                return $listItems.sort(sort);
            },

            sortColumnNumber: function($listItems, dir, columnNum) {
                var sort = function(a,b) {
                    a = parseFloat($.trim($(a).find('td').eq(columnNum).text()));
                    b = parseFloat($.trim($(b).find('td').eq(columnNum).text()));

                    return self.sortValues(a, b, dir);
                };

                return $listItems.sort(sort);
            }
        };

        self.scrollSpy = function($nav, $content, el, activeClass) {
            var scroll = $('body').scrollTop();
            var links = $nav.find('a[href^="#"]');
            var positions = self.findPositions($content, el);

            $.each(positions, function(index, value) {
                if ( scroll === 0 ) {
                    $('a.' + activeClass).removeClass(activeClass);
                    links.eq(0).addClass(activeClass);
                } else if ( value < scroll ) {
                    // if value is less than scroll add activeClass to link with the same index
                    $('a.' + activeClass).removeClass(activeClass);
                    links.eq(index).addClass(activeClass);
                }
            });     
        };

        self.getPosition = function(height, $obj) {
            if ( height > 200 ) {
                return $obj.position().top - ( $obj.height() / 4 );
            } else {
                return $obj.position().top - ( $obj.height() / 2 );
            }
        };

        self.findPositions = function($content, el) {
            var $sections = $content.find(el);
            var positions = [];

            // populate positions array with the position of the top of each section element
            $sections.each(function(index) {
                var $that = $(this);
                var length = $sections.length;
                var position;

                // the first element's position should always be 0
                if ( index === 0 ) {
                    position = 0;
                } else if ( index === ( length - 1 ) ) {
                    // subtract the bottom container's full height so final scroll value is equivalent 
                    // to last container's position
                    position = self.getPosition( $that.height, $that );
                } else {
                    // for all other elements correct position by only subtracting half of its height
                    // from its top position
                    position = $that.position().top - ( $that.height() / 4 );
                }

                // correct for any elements _that may have a negative position value

                if ( position < 0 ) {
                    positions.push(0); 
                } else {
                    positions.push(position);
                }
            });

            return positions;
        };

        // converts a time string to 24hr time
        self.parseTime = function(time) {
            var hour = parseInt(self.patterns.hour.exec(time)[1], 10);
            var minutes = self.patterns.minute.exec(time)[1];
            var ampm = self.patterns.ampm.exec(time)[1].toLowerCase();

            if ( ampm === 'am' ) {
                hour = hour.toString();
                
                if ( hour === '12' ) {
                    hour = '0';
                } else if ( hour.length === 1 ) {
                    hour = '0' + hour;
                }

                return hour + ':' + minutes;

            } else if ( ampm === 'pm' ) {
                return (hour + 12) + ':' + minutes;
            }
        };

        return self;
    };

    window.elr = elrUtilities();
})(jQuery);