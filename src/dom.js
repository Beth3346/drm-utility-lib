const elrDom = function() {
    const self = {
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
        elIsEven(el) {
            if (((this.index(el) + 1) % 2) === 0) {
                return true;
            }

            return false;
        },
        even(collection) {
            const filtered = [];

            for (var i = 0; i < collection.length; i++) {
                if (this.elIsEven(collection[i])) {
                    filtered.push(collection[i]);
                }
            }

            return filtered;
        },
        odd(collection) {
            const filtered = [];

            for (var i = 0; i < collection.length; i++) {
                if (!this.elIsEven(collection[i])) {
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

export default elrDom;