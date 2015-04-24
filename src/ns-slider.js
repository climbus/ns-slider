var NsSlider = Polymer({
        is: 'ns-slider',
        current: 0,
        elms: null,
        prev: null,
        next: null,
        // Fires when an instance of the element is created

        setVisibleElement: function(index) {

            if (index >= this.elms.length || index < 0) {
                return;
            }
            for (var i=0; i<this.elms.length; i++) {
                if (i == index) {
                    this.elms[i].style.display = "block";
                } else {
                    this.elms[i].style.display = "none";
                }
            }
            Polymer.dom.flush();
            this.current = index;
        },

        setActiveButtons: function() {
            
            if (this.current >= this.count() - 1) {
                this.deactivate(this.next);
            } else {
                this.activate(this.next);
            }

            if (this.current == 0) {
                this.deactivate(this.prev);
            } else {
                this.activate(this.prev);
            }
        },

        setButtons: function() {
            this.prev = this.querySelector("#prev");
            this.next = this.querySelector("#next");
            this.setActiveButtons();
        },

        deactivate: function(btn) {
            btn.className = btn.className.replace(/(\s|^)active(\s|$)/, ' ');
        },

        activate: function(btn) {
            if (btn.className.search("active") == -1) {
                btn.className += " active";
            }
        },

        count: function() {
            return this.elms.length;
        },

        created: function() {
        },

        // Fires when the element’s initial set of children and siblings are guaranteevd to exist
        domReady: function() {
        },

        // Fires when the "<polymer-element>" has been fully prepared
        ready: function() {
            var content = this.querySelector("#content");

            this.elms = content.children;
            
            for (var i in this.elms) {
                this.elms[i].className += " slide";
            }

            Polymer.dom.flush();

            this.setVisibleElement(0);
            this.setButtons();

            var dom = this;
            this.querySelector("#next").onclick = function(event) {
                if (dom.current < dom.count() - 1) {
                    dom.animate(dom.current, dom.current + 1, function() {
                        dom.setVisibleElement(dom.current + 1);
                        dom.setActiveButtons();    
                    });
                }
            }
            this.querySelector("#prev").onclick = function(event) {
                if (dom.current > 0) {
                    dom.animate(dom.current, dom.current -1, function() {
                        dom.setVisibleElement(dom.current - 1);
                        dom.setActiveButtons(); 
                    });
                }
            }
        },
        // Fires when the element was inserted into the document
        attached: function() {
        },

        // Fires when the element was removed from the document
        detached: function() {
        },

        // Fires when an attribute was added, removed, or updated
        attributeChanged: function(attr, oldVal, newVal) {
        },

        animate: function(startIndex, endIndex, callback) {

            var startElm = this.elms[startIndex];
            startElm.style.position = "absolute";

            var endElm = this.elms[endIndex];
            endElm.style.display = "block";
            endElm.style.position = "absolute";
            
            var step = 30;
            var direction = 1;
            
            var endPosition = startElm.offsetWidth;
            
            if (startIndex < endIndex) {
                direction = -1;
                endPosition = 0;
            }
            endElm.style.left = endElm.offsetLeft - endElm.offsetWidth * direction + "px";
            startElm.style.left = "0px";

            var anim = setInterval(function() {
                if (endElm.offsetLeft * direction + step >= 0) {
                    startElm.style.left = "0px";
                    endElm.style.left = "0px";
                    clearInterval(anim);
                    callback();
                    return;
                }
                startElm.style.left = startElm.offsetLeft + direction * step + "px";
                endElm.style.left = endElm.offsetLeft + direction * step + "px";
                
            }, 1000/60);
        }
    });