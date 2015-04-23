Polymer({
        is: 'ns-slider',
        current: 0,
        // Fires when an instance of the element is created
        created: function() {

        },

        // Fires when the element’s initial set of children and siblings are guaranteevd to exist
        domReady: function() {

        },

        // Fires when the "<polymer-element>" has been fully prepared
        ready: function() {
            this.querySelector(".slide").style.display = "block";
            
            var dom = this;
            this.querySelector("#next").onclick = function(event) {
                var elms = dom.querySelectorAll(".slide");
                if (dom.current < elms.length -1) {
                    elms[dom.current].style.display = "none";
                    dom.current++;
                    elms[dom.current].style.display = "block";
                    Polymer.dom.flush()
                }
            }
            this.querySelector("#prev").onclick = function(event) {
                var elms = dom.querySelectorAll(".slide");
                if (dom.current > 0) {
                    elms[dom.current].style.display = "none";
                    dom.current--;
                    elms[dom.current].style.display = "block";
                    Polymer.dom.flush()
                }
            }
        },
        // Fires when the element was inserted into the document
        attached: function() {},

        // Fires when the element was removed from the document
        detached: function() {},

        // Fires when an attribute was added, removed, or updated
        attributeChanged: function(attr, oldVal, newVal) {}
    });