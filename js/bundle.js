if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(jQuery), + function(t) {
    "use strict";

    function e() {
        var t = document.createElement("bootstrap"),
            e = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var i in e)
            if (void 0 !== t.style[i]) return {
                end: e[i]
            };
        return !1
    }
    t.fn.emulateTransitionEnd = function(e) {
        var i = !1,
            o = this;
        t(this).one("bsTransitionEnd", function() {
            i = !0
        });
        var n = function() {
            i || t(o).trigger(t.support.transition.end)
        };
        return setTimeout(n, e), this
    }, t(function() {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function(e) {
                if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var i = t(this),
                n = i.data("bs.alert");
            n || i.data("bs.alert", n = new o(this)), "string" == typeof e && n[e].call(i)
        })
    }
    var i = '[data-dismiss="alert"]',
        o = function(e) {
            t(e).on("click", i, this.close)
        };
    o.VERSION = "3.3.7", o.TRANSITION_DURATION = 150, o.prototype.close = function(e) {
        function i() {
            r.detach().trigger("closed.bs.alert").remove()
        }
        var n = t(this),
            s = n.attr("data-target");
        s || (s = n.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, ""));
        var r = t("#" === s ? [] : s);
        e && e.preventDefault(), r.length || (r = n.closest(".alert")), r.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (r.removeClass("in"), t.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", i).emulateTransitionEnd(o.TRANSITION_DURATION) : i())
    };
    var n = t.fn.alert;
    t.fn.alert = e, t.fn.alert.Constructor = o, t.fn.alert.noConflict = function() {
        return t.fn.alert = n, this
    }, t(document).on("click.bs.alert.data-api", i, o.prototype.close)
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.button"),
                s = "object" == typeof e && e;
            n || o.data("bs.button", n = new i(this, s)), "toggle" == e ? n.toggle() : e && n.setState(e)
        })
    }
    var i = function(e, o) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, o), this.isLoading = !1
    };
    i.VERSION = "3.3.7", i.DEFAULTS = {
        loadingText: "loading..."
    }, i.prototype.setState = function(e) {
        var i = "disabled",
            o = this.$element,
            n = o.is("input") ? "val" : "html",
            s = o.data();
        e += "Text", null == s.resetText && o.data("resetText", o[n]()), setTimeout(t.proxy(function() {
            o[n](null == s[e] ? this.options[e] : s[e]), "loadingText" == e ? (this.isLoading = !0, o.addClass(i).attr(i, i).prop(i, !0)) : this.isLoading && (this.isLoading = !1, o.removeClass(i).removeAttr(i).prop(i, !1))
        }, this), 0)
    }, i.prototype.toggle = function() {
        var t = !0,
            e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") ? (i.prop("checked") && (t = !1), e.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == i.prop("type") && (i.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), i.prop("checked", this.$element.hasClass("active")), t && i.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var o = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function() {
        return t.fn.button = o, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(i) {
        var o = t(i.target).closest(".btn");
        e.call(o, "toggle"), t(i.target).is('input[type="radio"], input[type="checkbox"]') || (i.preventDefault(), o.is("input,button") ? o.trigger("focus") : o.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.carousel"),
                s = t.extend({}, i.DEFAULTS, o.data(), "object" == typeof e && e),
                r = "string" == typeof e ? e : s.slide;
            n || o.data("bs.carousel", n = new i(this, s)), "number" == typeof e ? n.to(e) : r ? n[r]() : s.interval && n.pause().cycle()
        })
    }
    var i = function(e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 600, i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, i.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, i.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, i.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, i.prototype.getItemForDirection = function(t, e) {
        var i = this.getItemIndex(e),
            o = "prev" == t && 0 === i || "next" == t && i == this.$items.length - 1;
        if (o && !this.options.wrap) return e;
        var n = "prev" == t ? -1 : 1,
            s = (i + n) % this.$items.length;
        return this.$items.eq(s)
    }, i.prototype.to = function(t) {
        var e = this,
            i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(t > this.$items.length - 1 || t < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
            e.to(t)
        }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t))
    }, i.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, i.prototype.next = function() {
        if (!this.sliding) return this.slide("next")
    }, i.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev")
    }, i.prototype.slide = function(e, o) {
        var n = this.$element.find(".item.active"),
            s = o || this.getItemForDirection(e, n),
            r = this.interval,
            a = "next" == e ? "left" : "right",
            l = this;
        if (s.hasClass("active")) return this.sliding = !1;
        var d = s[0],
            c = t.Event("slide.bs.carousel", {
                relatedTarget: d,
                direction: a
            });
        if (this.$element.trigger(c), !c.isDefaultPrevented()) {
            if (this.sliding = !0, r && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var h = t(this.$indicators.children()[this.getItemIndex(s)]);
                h && h.addClass("active")
            }
            var p = t.Event("slid.bs.carousel", {
                relatedTarget: d,
                direction: a
            });
            return t.support.transition && this.$element.hasClass("slide") ? (s.addClass(e), s[0].offsetWidth, n.addClass(a), s.addClass(a), n.one("bsTransitionEnd", function() {
                s.removeClass([e, a].join(" ")).addClass("active"), n.removeClass(["active", a].join(" ")), l.sliding = !1, setTimeout(function() {
                    l.$element.trigger(p)
                }, 0)
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (n.removeClass("active"), s.addClass("active"), this.sliding = !1, this.$element.trigger(p)), r && this.cycle(), this
        }
    };
    var o = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = o, this
    };
    var n = function(i) {
        var o, n = t(this),
            s = t(n.attr("data-target") || (o = n.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, ""));
        if (s.hasClass("carousel")) {
            var r = t.extend({}, s.data(), n.data()),
                a = n.attr("data-slide-to");
            a && (r.interval = !1), e.call(s, r), a && s.data("bs.carousel").to(a), i.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", n).on("click.bs.carousel.data-api", "[data-slide-to]", n), t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var i = t(this);
            e.call(i, i.data())
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        var i, o = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(o)
    }

    function i(e) {
        return this.each(function() {
            var i = t(this),
                n = i.data("bs.collapse"),
                s = t.extend({}, o.DEFAULTS, i.data(), "object" == typeof e && e);
            !n && s.toggle && /show|hide/.test(e) && (s.toggle = !1), n || i.data("bs.collapse", n = new o(this, s)), "string" == typeof e && n[e]()
        })
    }
    var o = function(e, i) {
        this.$element = t(e), this.options = t.extend({}, o.DEFAULTS, i), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    o.VERSION = "3.3.7", o.TRANSITION_DURATION = 350, o.DEFAULTS = {
        toggle: !0
    }, o.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, o.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, n = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(n && n.length && (e = n.data("bs.collapse"), e && e.transitioning))) {
                var s = t.Event("show.bs.collapse");
                if (this.$element.trigger(s), !s.isDefaultPrevented()) {
                    n && n.length && (i.call(n, "hide"), e || n.data("bs.collapse", null));
                    var r = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var a = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[r](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return a.call(this);
                    var l = t.camelCase(["scroll", r].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(o.TRANSITION_DURATION)[r](this.$element[0][l])
                }
            }
        }
    }, o.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var n = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(n, this)).emulateTransitionEnd(o.TRANSITION_DURATION) : n.call(this)
            }
        }
    }, o.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, o.prototype.getParent = function() {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(i, o) {
            var n = t(o);
            this.addAriaAndCollapsedClass(e(n), n)
        }, this)).end()
    }, o.prototype.addAriaAndCollapsedClass = function(t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var n = t.fn.collapse;
    t.fn.collapse = i, t.fn.collapse.Constructor = o, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = n, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(o) {
        var n = t(this);
        n.attr("data-target") || o.preventDefault();
        var s = e(n),
            r = s.data("bs.collapse"),
            a = r ? "toggle" : n.data();
        i.call(s, a)
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var o = i && t(i);
        return o && o.length ? o : e.parent()
    }

    function i(i) {
        i && 3 === i.which || (t(n).remove(), t(s).each(function() {
            var o = t(this),
                n = e(o),
                s = {
                    relatedTarget: this
                };
            n.hasClass("open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && t.contains(n[0], i.target) || (n.trigger(i = t.Event("hide.bs.dropdown", s)), i.isDefaultPrevented() || (o.attr("aria-expanded", "false"), n.removeClass("open").trigger(t.Event("hidden.bs.dropdown", s)))))
        }))
    }

    function o(e) {
        return this.each(function() {
            var i = t(this),
                o = i.data("bs.dropdown");
            o || i.data("bs.dropdown", o = new r(this)), "string" == typeof e && o[e].call(i)
        })
    }
    var n = ".dropdown-backdrop",
        s = '[data-toggle="dropdown"]',
        r = function(e) {
            t(e).on("click.bs.dropdown", this.toggle)
        };
    r.VERSION = "3.3.7", r.prototype.toggle = function(o) {
        var n = t(this);
        if (!n.is(".disabled, :disabled")) {
            var s = e(n),
                r = s.hasClass("open");
            if (i(), !r) {
                "ontouchstart" in document.documentElement && !s.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", i);
                var a = {
                    relatedTarget: this
                };
                if (s.trigger(o = t.Event("show.bs.dropdown", a)), o.isDefaultPrevented()) return;
                n.trigger("focus").attr("aria-expanded", "true"), s.toggleClass("open").trigger(t.Event("shown.bs.dropdown", a))
            }
            return !1
        }
    }, r.prototype.keydown = function(i) {
        if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
            var o = t(this);
            if (i.preventDefault(), i.stopPropagation(), !o.is(".disabled, :disabled")) {
                var n = e(o),
                    r = n.hasClass("open");
                if (!r && 27 != i.which || r && 27 == i.which) return 27 == i.which && n.find(s).trigger("focus"), o.trigger("click");
                var a = " li:not(.disabled):visible a",
                    l = n.find(".dropdown-menu" + a);
                if (l.length) {
                    var d = l.index(i.target);
                    38 == i.which && d > 0 && d--, 40 == i.which && d < l.length - 1 && d++, ~d || (d = 0), l.eq(d).trigger("focus")
                }
            }
        }
    };
    var a = t.fn.dropdown;
    t.fn.dropdown = o, t.fn.dropdown.Constructor = r, t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = a, this
    }, t(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", s, r.prototype.toggle).on("keydown.bs.dropdown.data-api", s, r.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", r.prototype.keydown)
}(jQuery), + function(t) {
    "use strict";

    function e(e, o) {
        return this.each(function() {
            var n = t(this),
                s = n.data("bs.modal"),
                r = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
            s || n.data("bs.modal", s = new i(this, r)), "string" == typeof e ? s[e](o) : r.show && s.show(o)
        })
    }
    var i = function(e, i) {
        this.options = i, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, i.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t)
    }, i.prototype.show = function(e) {
        var o = this,
            n = t.Event("show.bs.modal", {
                relatedTarget: e
            });
        this.$element.trigger(n), this.isShown || n.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            o.$element.one("mouseup.dismiss.bs.modal", function(e) {
                t(e.target).is(o.$element) && (o.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var n = t.support.transition && o.$element.hasClass("fade");
            o.$element.parent().length || o.$element.appendTo(o.$body), o.$element.show().scrollTop(0), o.adjustDialog(), n && o.$element[0].offsetWidth, o.$element.addClass("in"), o.enforceFocus();
            var s = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            n ? o.$dialog.one("bsTransitionEnd", function() {
                o.$element.trigger("focus").trigger(s)
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : o.$element.trigger("focus").trigger(s)
        }))
    }, i.prototype.hide = function(e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
    }, i.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            document === t.target || this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, i.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, i.prototype.resize = function() {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }, i.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(), this.backdrop(function() {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, i.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, i.prototype.backdrop = function(e) {
        var o = this,
            n = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var s = t.support.transition && n;
            if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + n).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), s && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            s ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var r = function() {
                o.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", r).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : r()
        } else e && e()
    }, i.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, i.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }, i.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, i.prototype.checkScrollbar = function() {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
    }, i.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, i.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, i.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var o = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function() {
        return t.fn.modal = o, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(i) {
        var o = t(this),
            n = o.attr("href"),
            s = t(o.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")),
            r = s.data("bs.modal") ? "toggle" : t.extend({
                remote: !/#/.test(n) && n
            }, s.data(), o.data());
        o.is("a") && i.preventDefault(), s.one("show.bs.modal", function(t) {
            t.isDefaultPrevented() || s.one("hidden.bs.modal", function() {
                o.is(":visible") && o.trigger("focus")
            })
        }), e.call(s, r, this)
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.tooltip"),
                s = "object" == typeof e && e;
            !n && /destroy|hide/.test(e) || (n || o.data("bs.tooltip", n = new i(this, s)), "string" == typeof e && n[e]())
        })
    }
    var i = function(t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 150, i.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, i.prototype.init = function(e, i, o) {
        if (this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(o), this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var n = this.options.trigger.split(" "), s = n.length; s--;) {
            var r = n[s];
            if ("click" == r) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != r) {
                var a = "hover" == r ? "mouseenter" : "focusin",
                    l = "hover" == r ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, i.prototype.getDefaults = function() {
        return i.DEFAULTS
    }, i.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, i.prototype.getDelegateOptions = function() {
        var e = {},
            i = this.getDefaults();
        return this._options && t.each(this._options, function(t, o) {
            i[t] != o && (e[t] = o)
        }), e
    }, i.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusin" == e.type ? "focus" : "hover"] = !0), i.tip().hasClass("in") || "in" == i.hoverState ? void(i.hoverState = "in") : (clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    }, i.prototype.isInStateTrue = function() {
        for (var t in this.inState)
            if (this.inState[t]) return !0;
        return !1
    }, i.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        if (i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusout" == e.type ? "focus" : "hover"] = !1), !i.isInStateTrue()) return clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide()
    }, i.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var o = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !o) return;
            var n = this,
                s = this.tip(),
                r = this.getUID(this.type);
            this.setContent(), s.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && s.addClass("fade");
            var a = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i,
                d = l.test(a);
            d && (a = a.replace(l, "") || "top"), s.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(a).data("bs." + this.type, this), this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var c = this.getPosition(),
                h = s[0].offsetWidth,
                p = s[0].offsetHeight;
            if (d) {
                var u = a,
                    f = this.getPosition(this.$viewport);
                a = "bottom" == a && c.bottom + p > f.bottom ? "top" : "top" == a && c.top - p < f.top ? "bottom" : "right" == a && c.right + h > f.width ? "left" : "left" == a && c.left - h < f.left ? "right" : a, s.removeClass(u).addClass(a)
            }
            var g = this.getCalculatedOffset(a, c, h, p);
            this.applyPlacement(g, a);
            var m = function() {
                var t = n.hoverState;
                n.$element.trigger("shown.bs." + n.type), n.hoverState = null, "out" == t && n.leave(n)
            };
            t.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", m).emulateTransitionEnd(i.TRANSITION_DURATION) : m()
        }
    }, i.prototype.applyPlacement = function(e, i) {
        var o = this.tip(),
            n = o[0].offsetWidth,
            s = o[0].offsetHeight,
            r = parseInt(o.css("margin-top"), 10),
            a = parseInt(o.css("margin-left"), 10);
        isNaN(r) && (r = 0), isNaN(a) && (a = 0), e.top += r, e.left += a, t.offset.setOffset(o[0], t.extend({
            using: function(t) {
                o.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, e), 0), o.addClass("in");
        var l = o[0].offsetWidth,
            d = o[0].offsetHeight;
        "top" == i && d != s && (e.top = e.top + s - d);
        var c = this.getViewportAdjustedDelta(i, e, l, d);
        c.left ? e.left += c.left : e.top += c.top;
        var h = /top|bottom/.test(i),
            p = h ? 2 * c.left - n + l : 2 * c.top - s + d,
            u = h ? "offsetWidth" : "offsetHeight";
        o.offset(e), this.replaceArrow(p, o[0][u], h)
    }, i.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
    }, i.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, i.prototype.hide = function(e) {
        function o() {
            "in" != n.hoverState && s.detach(), n.$element && n.$element.removeAttr("aria-describedby").trigger("hidden.bs." + n.type), e && e()
        }
        var n = this,
            s = t(this.$tip),
            r = t.Event("hide.bs." + this.type);
        if (this.$element.trigger(r), !r.isDefaultPrevented()) return s.removeClass("in"), t.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(), this.hoverState = null, this
    }, i.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, i.prototype.hasContent = function() {
        return this.getTitle()
    }, i.prototype.getPosition = function(e) {
        e = e || this.$element;
        var i = e[0],
            o = "BODY" == i.tagName,
            n = i.getBoundingClientRect();
        null == n.width && (n = t.extend({}, n, {
            width: n.right - n.left,
            height: n.bottom - n.top
        }));
        var s = window.SVGElement && i instanceof window.SVGElement,
            r = o ? {
                top: 0,
                left: 0
            } : s ? null : e.offset(),
            a = {
                scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
            },
            l = o ? {
                width: t(window).width(),
                height: t(window).height()
            } : null;
        return t.extend({}, n, a, l, r)
    }, i.prototype.getCalculatedOffset = function(t, e, i, o) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - o,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - o / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - o / 2,
            left: e.left + e.width
        }
    }, i.prototype.getViewportAdjustedDelta = function(t, e, i, o) {
        var n = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return n;
        var s = this.options.viewport && this.options.viewport.padding || 0,
            r = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var a = e.top - s - r.scroll,
                l = e.top + s - r.scroll + o;
            a < r.top ? n.top = r.top - a : l > r.top + r.height && (n.top = r.top + r.height - l)
        } else {
            var d = e.left - s,
                c = e.left + s + i;
            d < r.left ? n.left = r.left - d : c > r.right && (n.left = r.left + r.width - c)
        }
        return n
    }, i.prototype.getTitle = function() {
        var t, e = this.$element,
            i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
    }, i.prototype.getUID = function(t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, i.prototype.tip = function() {
        if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, i.prototype.enable = function() {
        this.enabled = !0
    }, i.prototype.disable = function() {
        this.enabled = !1
    }, i.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, i.prototype.toggle = function(e) {
        var i = this;
        e && (i = t(e.currentTarget).data("bs." + this.type), i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), e ? (i.inState.click = !i.inState.click, i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, i.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null, t.$element = null
        })
    };
    var o = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = i, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = o, this
    }
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.popover"),
                s = "object" == typeof e && e;
            !n && /destroy|hide/.test(e) || (n || o.data("bs.popover", n = new i(this, s)), "string" == typeof e && n[e]())
        })
    }
    var i = function(t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    i.VERSION = "3.3.7", i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), i.prototype.constructor = i, i.prototype.getDefaults = function() {
        return i.DEFAULTS
    }, i.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle(),
            i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, i.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, i.prototype.getContent = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var o = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = i, t.fn.popover.noConflict = function() {
        return t.fn.popover = o, this
    }
}(jQuery), + function(t) {
    "use strict";

    function e(i, o) {
        this.$body = t(document.body), this.$scrollElement = t(t(i).is(document.body) ? window : i), this.options = t.extend({}, e.DEFAULTS, o), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
    }

    function i(i) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.scrollspy"),
                s = "object" == typeof i && i;
            n || o.data("bs.scrollspy", n = new e(this, s)), "string" == typeof i && n[i]()
        })
    }
    e.VERSION = "3.3.7", e.DEFAULTS = {
        offset: 10
    }, e.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function() {
        var e = this,
            i = "offset",
            o = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (i = "position", o = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var e = t(this),
                n = e.data("target") || e.attr("href"),
                s = /^#./.test(n) && t(n);
            return s && s.length && s.is(":visible") && [
                [s[i]().top + o, n]
            ] || null
        }).sort(function(t, e) {
            return t[0] - e[0]
        }).each(function() {
            e.offsets.push(this[0]), e.targets.push(this[1])
        })
    }, e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset,
            i = this.getScrollHeight(),
            o = this.options.offset + i - this.$scrollElement.height(),
            n = this.offsets,
            s = this.targets,
            r = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), e >= o) return r != (t = s[s.length - 1]) && this.activate(t);
        if (r && e < n[0]) return this.activeTarget = null, this.clear();
        for (t = n.length; t--;) r != s[t] && e >= n[t] && (void 0 === n[t + 1] || e < n[t + 1]) && this.activate(s[t])
    }, e.prototype.activate = function(e) {
        this.activeTarget = e, this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            o = t(i).parents("li").addClass("active");
        o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")), o.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function() {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var o = t.fn.scrollspy;
    t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = o, this
    }, t(window).on("load.bs.scrollspy.data-api", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            i.call(e, e.data())
        })
    })
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.tab");
            n || o.data("bs.tab", n = new i(this)), "string" == typeof e && n[e]()
        })
    }
    var i = function(e) {
        this.element = t(e)
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 150, i.prototype.show = function() {
        var e = this.element,
            i = e.closest("ul:not(.dropdown-menu)"),
            o = e.data("target");
        if (o || (o = e.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var n = i.find(".active:last a"),
                s = t.Event("hide.bs.tab", {
                    relatedTarget: e[0]
                }),
                r = t.Event("show.bs.tab", {
                    relatedTarget: n[0]
                });
            if (n.trigger(s), e.trigger(r), !r.isDefaultPrevented() && !s.isDefaultPrevented()) {
                var a = t(o);
                this.activate(e.closest("li"), i), this.activate(a, a.parent(), function() {
                    n.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: n[0]
                    })
                })
            }
        }
    }, i.prototype.activate = function(e, o, n) {
        function s() {
            r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), a ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), n && n()
        }
        var r = o.find("> .active"),
            a = n && t.support.transition && (r.length && r.hasClass("fade") || !!o.find("> .fade").length);
        r.length && a ? r.one("bsTransitionEnd", s).emulateTransitionEnd(i.TRANSITION_DURATION) : s(), r.removeClass("in")
    };
    var o = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function() {
        return t.fn.tab = o, this
    };
    var n = function(i) {
        i.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', n).on("click.bs.tab.data-api", '[data-toggle="pill"]', n)
}(jQuery), + function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.affix"),
                s = "object" == typeof e && e;
            n || o.data("bs.affix", n = new i(this, s)), "string" == typeof e && n[e]()
        })
    }
    var i = function(e, o) {
        this.options = t.extend({}, i.DEFAULTS, o), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    i.VERSION = "3.3.7", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
        offset: 0,
        target: window
    }, i.prototype.getState = function(t, e, i, o) {
        var n = this.$target.scrollTop(),
            s = this.$element.offset(),
            r = this.$target.height();
        if (null != i && "top" == this.affixed) return n < i && "top";
        if ("bottom" == this.affixed) return null != i ? !(n + this.unpin <= s.top) && "bottom" : !(n + r <= t - o) && "bottom";
        var a = null == this.affixed,
            l = a ? n : s.top,
            d = a ? r : e;
        return null != i && n <= i ? "top" : null != o && l + d >= t - o && "bottom"
    }, i.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
            e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, i.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, i.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(),
                o = this.options.offset,
                n = o.top,
                s = o.bottom,
                r = Math.max(t(document).height(), t(document.body).height());
            "object" != typeof o && (s = n = o), "function" == typeof n && (n = o.top(this.$element)), "function" == typeof s && (s = o.bottom(this.$element));
            var a = this.getState(r, e, n, s);
            if (this.affixed != a) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (a ? "-" + a : ""),
                    d = t.Event(l + ".bs.affix");
                if (this.$element.trigger(d), d.isDefaultPrevented()) return;
                this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == a && this.$element.offset({
                top: r - e - s
            })
        }
    };
    var o = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function() {
        return t.fn.affix = o, this
    }, t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var i = t(this),
                o = i.data();
            o.offset = o.offset || {}, null != o.offsetBottom && (o.offset.bottom = o.offsetBottom), null != o.offsetTop && (o.offset.top = o.offsetTop), e.call(i, o)
        })
    })
}(jQuery),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
}(function(t) {
    function e(t, e) {
        return t.toFixed(e.decimals)
    }
    var i = function(e, o) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, this.dataOptions(), o), this.init()
    };
    i.DEFAULTS = {
        from: 0,
        to: 0,
        speed: 1e3,
        refreshInterval: 100,
        decimals: 0,
        formatter: e,
        onUpdate: null,
        onComplete: null
    }, i.prototype.init = function() {
        this.value = this.options.from, this.loops = Math.ceil(this.options.speed / this.options.refreshInterval), this.loopCount = 0, this.increment = (this.options.to - this.options.from) / this.loops
    }, i.prototype.dataOptions = function() {
        var t = {
                from: this.$element.data("from"),
                to: this.$element.data("to"),
                speed: this.$element.data("speed"),
                refreshInterval: this.$element.data("refresh-interval"),
                decimals: this.$element.data("decimals")
            },
            e = Object.keys(t);
        for (var i in e) {
            var o = e[i];
            "undefined" == typeof t[o] && delete t[o]
        }
        return t
    }, i.prototype.update = function() {
        this.value += this.increment, this.loopCount++, this.render(), "function" == typeof this.options.onUpdate && this.options.onUpdate.call(this.$element, this.value), this.loopCount >= this.loops && (clearInterval(this.interval), this.value = this.options.to, "function" == typeof this.options.onComplete && this.options.onComplete.call(this.$element, this.value))
    }, i.prototype.render = function() {
        var t = this.options.formatter.call(this.$element, this.value, this.options);
        this.$element.text(t)
    }, i.prototype.restart = function() {
        this.stop(), this.init(), this.start()
    }, i.prototype.start = function() {
        this.stop(), this.render(), this.interval = setInterval(this.update.bind(this), this.options.refreshInterval)
    }, i.prototype.stop = function() {
        this.interval && clearInterval(this.interval)
    }, i.prototype.toggle = function() {
        this.interval ? this.stop() : this.start()
    }, t.fn.countTo = function(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("countTo"),
                s = !n || "object" == typeof e,
                r = "object" == typeof e ? e : {},
                a = "string" == typeof e ? e : "start";
            s && (n && n.stop(), o.data("countTo", n = new i(this, r))), n[a].call(n)
        })
    }
}), ! function(t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
    "use strict";

    function i(i, s, a) {
        function l(t, e, o) {
            var n, s = "$()." + i + '("' + e + '")';
            return t.each(function(t, l) {
                var d = a.data(l, i);
                if (!d) return void r(i + " not initialized. Cannot call methods, i.e. " + s);
                var c = d[e];
                if (!c || "_" == e.charAt(0)) return void r(s + " is not a valid method");
                var h = c.apply(d, o);
                n = void 0 === n ? h : n
            }), void 0 !== n ? n : t
        }

        function d(t, e) {
            t.each(function(t, o) {
                var n = a.data(o, i);
                n ? (n.option(e), n._init()) : (n = new s(o, e), a.data(o, i, n))
            })
        }
        a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function(t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function(t) {
            if ("string" == typeof t) {
                var e = n.call(arguments, 1);
                return l(this, t, e)
            }
            return d(this, t), this
        }, o(a))
    }

    function o(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var n = Array.prototype.slice,
        s = t.console,
        r = "undefined" == typeof s ? function() {} : function(t) {
            s.error(t)
        };
    return o(e || t.jQuery), i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                o = i[t] = i[t] || [];
            return o.indexOf(e) == -1 && o.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                o = i[t] = i[t] || {};
            return o[e] = !0, this
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var o = i.indexOf(e);
            return o != -1 && i.splice(o, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var o = 0,
                n = i[o];
            e = e || [];
            for (var s = this._onceEvents && this._onceEvents[t]; n;) {
                var r = s && s[n];
                r && (this.off(t, n), delete s[n]), n.apply(this, e), o += r ? 0 : 1, n = i[o]
            }
            return this
        }
    }, t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
        return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";

    function t(t) {
        var e = parseFloat(t),
            i = t.indexOf("%") == -1 && !isNaN(e);
        return i && e
    }

    function e() {}

    function i() {
        for (var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, e = 0; e < d; e++) {
            var i = l[e];
            t[i] = 0
        }
        return t
    }

    function o(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
    }

    function n() {
        if (!c) {
            c = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var n = o(e);
            s.isBoxSizeOuter = r = 200 == t(n.width), i.removeChild(e)
        }
    }

    function s(e) {
        if (n(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var s = o(e);
            if ("none" == s.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var c = a.isBorderBox = "border-box" == s.boxSizing, h = 0; h < d; h++) {
                var p = l[h],
                    u = s[p],
                    f = parseFloat(u);
                a[p] = isNaN(f) ? 0 : f
            }
            var g = a.paddingLeft + a.paddingRight,
                m = a.paddingTop + a.paddingBottom,
                v = a.marginLeft + a.marginRight,
                y = a.marginTop + a.marginBottom,
                w = a.borderLeftWidth + a.borderRightWidth,
                b = a.borderTopWidth + a.borderBottomWidth,
                S = c && r,
                T = t(s.width);
            T !== !1 && (a.width = T + (S ? 0 : g + w));
            var x = t(s.height);
            return x !== !1 && (a.height = x + (S ? 0 : m + b)), a.innerWidth = a.width - (g + w), a.innerHeight = a.height - (m + b), a.outerWidth = a.width + v, a.outerHeight = a.height + y, a
        }
    }
    var r, a = "undefined" == typeof console ? e : function(t) {
            console.error(t)
        },
        l = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        d = l.length,
        c = !1;
    return s
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var t = function() {
        var t = Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var o = e[i],
                n = o + "MatchesSelector";
            if (t[n]) return n
        }
    }();
    return function(e, i) {
        return e[t](i)
    }
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function(t, e) {
    var i = {};
    i.extend = function(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }, i.modulo = function(t, e) {
        return (t % e + e) % e
    }, i.makeArray = function(t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if (t && "number" == typeof t.length)
            for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e
    }, i.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1)
    }, i.getParent = function(t, i) {
        for (; t != document.body;)
            if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function(t, o) {
        t = i.makeArray(t);
        var n = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!o) return void n.push(t);
                e(t, o) && n.push(t);
                for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++) n.push(i[s])
            }
        }), n
    }, i.debounceMethod = function(t, e, i) {
        var o = t.prototype[e],
            n = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[n];
            t && clearTimeout(t);
            var e = arguments,
                s = this;
            this[n] = setTimeout(function() {
                o.apply(s, e), delete s[n]
            }, i || 100)
        }
    }, i.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var o = t.console;
    return i.htmlInit = function(e, n) {
        i.docReady(function() {
            var s = i.toDashed(n),
                r = "data-" + s,
                a = document.querySelectorAll("[" + r + "]"),
                l = document.querySelectorAll(".js-" + s),
                d = i.makeArray(a).concat(i.makeArray(l)),
                c = r + "-options",
                h = t.jQuery;
            d.forEach(function(t) {
                var i, s = t.getAttribute(r) || t.getAttribute(c);
                try {
                    i = s && JSON.parse(s)
                } catch (e) {
                    return void(o && o.error("Error parsing " + r + " on " + t.className + ": " + e))
                }
                var a = new e(t, i);
                h && h.data(t, n, a)
            })
        })
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function(t, e) {
    "use strict";

    function i(t) {
        for (var e in t) return !1;
        return e = null, !0
    }

    function o(t, e) {
        t && (this.element = t, this.layout = e, this.position = {
            x: 0,
            y: 0
        }, this._create())
    }

    function n(t) {
        return t.replace(/([A-Z])/g, function(t) {
            return "-" + t.toLowerCase()
        })
    }
    var s = document.documentElement.style,
        r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
        a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
        l = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        }[r],
        d = {
            transform: a,
            transition: r,
            transitionDuration: r + "Duration",
            transitionProperty: r + "Property",
            transitionDelay: r + "Delay"
        },
        c = o.prototype = Object.create(t.prototype);
    c.constructor = o, c._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        })
    }, c.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, c.getSize = function() {
        this.size = e(this.element)
    }, c.css = function(t) {
        var e = this.element.style;
        for (var i in t) {
            var o = d[i] || i;
            e[o] = t[i]
        }
    }, c.getPosition = function() {
        var t = getComputedStyle(this.element),
            e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            o = t[e ? "left" : "right"],
            n = t[i ? "top" : "bottom"],
            s = this.layout.size,
            r = o.indexOf("%") != -1 ? parseFloat(o) / 100 * s.width : parseInt(o, 10),
            a = n.indexOf("%") != -1 ? parseFloat(n) / 100 * s.height : parseInt(n, 10);
        r = isNaN(r) ? 0 : r, a = isNaN(a) ? 0 : a, r -= e ? s.paddingLeft : s.paddingRight, a -= i ? s.paddingTop : s.paddingBottom, this.position.x = r, this.position.y = a
    }, c.layoutPosition = function() {
        var t = this.layout.size,
            e = {},
            i = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop"),
            n = i ? "paddingLeft" : "paddingRight",
            s = i ? "left" : "right",
            r = i ? "right" : "left",
            a = this.position.x + t[n];
        e[s] = this.getXValue(a), e[r] = "";
        var l = o ? "paddingTop" : "paddingBottom",
            d = o ? "top" : "bottom",
            c = o ? "bottom" : "top",
            h = this.position.y + t[l];
        e[d] = this.getYValue(h), e[c] = "", this.css(e), this.emitEvent("layout", [this])
    }, c.getXValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }, c.getYValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }, c._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x,
            o = this.position.y,
            n = parseInt(t, 10),
            s = parseInt(e, 10),
            r = n === this.position.x && s === this.position.y;
        if (this.setPosition(t, e), r && !this.isTransitioning) return void this.layoutPosition();
        var a = t - i,
            l = e - o,
            d = {};
        d.transform = this.getTranslate(a, l), this.transition({
            to: d,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        })
    }, c.getTranslate = function(t, e) {
        var i = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop");
        return t = i ? t : -t, e = o ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
    }, c.goTo = function(t, e) {
        this.setPosition(t, e), this.layoutPosition()
    }, c.moveTo = c._transitionTo, c.setPosition = function(t, e) {
        this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
    }, c._nonTransition = function(t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
    }, c.transition = function(t) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
            this.css(t.from);
            var o = this.element.offsetHeight;
            o = null
        }
        this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
    };
    var h = "opacity," + n(a);
    c.enableTransition = function() {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({
                transitionProperty: h,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(l, this, !1)
        }
    }, c.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t)
    }, c.onotransitionend = function(t) {
        this.ontransitionend(t)
    };
    var p = {
        "-webkit-transform": "transform"
    };
    c.ontransitionend = function(t) {
        if (t.target === this.element) {
            var e = this._transn,
                o = p[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[o]), o in e.onEnd) {
                var n = e.onEnd[o];
                n.call(this), delete e.onEnd[o]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }, c.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(l, this, !1), this.isTransitioning = !1
    }, c._removeStyles = function(t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e)
    };
    var u = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return c.removeTransitionStyles = function() {
        this.css(u)
    }, c.stagger = function(t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
    }, c.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [this])
    }, c.remove = function() {
        return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem()
        }), void this.hide()) : void this.removeElem()
    }, c.reveal = function() {
        delete this.isHidden, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("visibleStyle");
        e[i] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, c.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }, c.getHideRevealTransitionEndProperty = function(t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i
    }, c.hide = function() {
        this.isHidden = !0, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        e[i] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, c.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"))
    }, c.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }, o
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, o, n, s) {
        return e(t, i, o, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function(t, e, i, o, n) {
    "use strict";

    function s(t, e) {
        var i = o.getQueryElement(t);
        if (!i) return void(l && l.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i, d && (this.$element = d(this.element)), this.options = o.extend({}, this.constructor.defaults), this.option(e);
        var n = ++h;
        this.element.outlayerGUID = n, p[n] = this, this._create();
        var s = this._getOption("initLayout");
        s && this.layout()
    }

    function r(t) {
        function e() {
            t.apply(this, arguments)
        }
        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }

    function a(t) {
        if ("number" == typeof t) return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/),
            i = e && e[1],
            o = e && e[2];
        if (!i.length) return 0;
        i = parseFloat(i);
        var n = f[o] || 1;
        return i * n
    }
    var l = t.console,
        d = t.jQuery,
        c = function() {},
        h = 0,
        p = {};
    s.namespace = "outlayer", s.Item = n, s.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var u = s.prototype;
    o.extend(u, e.prototype), u.option = function(t) {
        o.extend(this.options, t)
    }, u._getOption = function(t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }, s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, u._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize()
    }, u.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }, u._itemize = function(t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0; n < e.length; n++) {
            var s = e[n],
                r = new i(s, this);
            o.push(r)
        }
        return o
    }, u._filterFindItemElements = function(t) {
        return o.filterFindElements(t, this.options.itemSelector)
    }, u.getItemElements = function() {
        return this.items.map(function(t) {
            return t.element
        })
    }, u.layout = function() {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, u._init = u.layout, u._resetLayout = function() {
        this.getSize()
    }, u.getSize = function() {
        this.size = i(this.element)
    }, u._getMeasurement = function(t, e) {
        var o, n = this.options[t];
        n ? ("string" == typeof n ? o = this.element.querySelector(n) : n instanceof HTMLElement && (o = n), this[t] = o ? i(o)[e] : n) : this[t] = 0
    }, u.layoutItems = function(t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, u._getItemsForLayout = function(t) {
        return t.filter(function(t) {
            return !t.isIgnored
        })
    }, u._layoutItems = function(t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function(t) {
                var o = this._getItemLayoutPosition(t);
                o.item = t, o.isInstant = e || t.isLayoutInstant, i.push(o)
            }, this), this._processLayoutQueue(i)
        }
    }, u._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }, u._processLayoutQueue = function(t) {
        this.updateStagger(), t.forEach(function(t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }, u.updateStagger = function() {
        var t = this.options.stagger;
        return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger)
    }, u._positionItem = function(t, e, i, o, n) {
        o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i))
    }, u._postLayout = function() {
        this.resizeContainer()
    }, u.resizeContainer = function() {
        var t = this._getOption("resizeContainer");
        if (t) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
        }
    }, u._getContainerSize = c, u._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
        }
    }, u._emitCompleteOnItems = function(t, e) {
        function i() {
            n.dispatchEvent(t + "Complete", null, [e])
        }

        function o() {
            r++, r == s && i()
        }
        var n = this,
            s = e.length;
        if (!e || !s) return void i();
        var r = 0;
        e.forEach(function(e) {
            e.once(t, o)
        })
    }, u.dispatchEvent = function(t, e, i) {
        var o = e ? [e].concat(i) : i;
        if (this.emitEvent(t, o), d)
            if (this.$element = this.$element || d(this.element), e) {
                var n = d.Event(e);
                n.type = t, this.$element.trigger(n, i)
            } else this.$element.trigger(t, i)
    }, u.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, u.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, u.stamp = function(t) {
        t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, u.unstamp = function(t) {
        t = this._find(t), t && t.forEach(function(t) {
            o.removeFrom(this.stamps, t), this.unignore(t)
        }, this)
    }, u._find = function(t) {
        if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = o.makeArray(t)
    }, u._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, u._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect(),
            e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }, u._manageStamp = c, u._getElementOffset = function(t) {
        var e = t.getBoundingClientRect(),
            o = this._boundingRect,
            n = i(t),
            s = {
                left: e.left - o.left - n.marginLeft,
                top: e.top - o.top - n.marginTop,
                right: o.right - e.right - n.marginRight,
                bottom: o.bottom - e.bottom - n.marginBottom
            };
        return s
    }, u.handleEvent = o.handleEvent, u.bindResize = function() {
        t.addEventListener("resize", this), this.isResizeBound = !0
    }, u.unbindResize = function() {
        t.removeEventListener("resize", this), this.isResizeBound = !1
    }, u.onresize = function() {
        this.resize()
    }, o.debounceMethod(s, "onresize", 100), u.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, u.needsResizeLayout = function() {
        var t = i(this.element),
            e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth
    }, u.addItems = function(t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e
    }, u.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, u.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, u.reveal = function(t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.reveal()
            })
        }
    }, u.hide = function(t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.hide()
            })
        }
    }, u.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, u.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e)
    }, u.getItem = function(t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i
        }
    }, u.getItems = function(t) {
        t = o.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this), e
    }, u.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) {
            t.remove(), o.removeFrom(this.items, t)
        }, this)
    }, u.destroy = function() {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) {
            t.destroy()
        }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete p[e], delete this.element.outlayerGUID, d && d.removeData(this.element, this.constructor.namespace)
    }, s.data = function(t) {
        t = o.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && p[e]
    }, s.create = function(t, e) {
        var i = r(s);
        return i.defaults = o.extend({}, s.defaults), o.extend(i.defaults, e), i.compatOptions = o.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(n), o.htmlInit(i, t), d && d.bridget && d.bridget(t, i), i
    };
    var f = {
        ms: 1,
        s: 1e3
    };
    return s.Item = n, s
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
}(window, function(t) {
    "use strict";

    function e() {
        t.Item.apply(this, arguments)
    }
    var i = e.prototype = Object.create(t.Item.prototype),
        o = i._create;
    i._create = function() {
        this.id = this.layout.itemGUID++, o.call(this), this.sortData = {}
    }, i.updateSortData = function() {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var t = this.layout.options.getSortData,
                e = this.layout._sorters;
            for (var i in t) {
                var o = e[i];
                this.sortData[i] = o(this.element, this)
            }
        }
    };
    var n = i.destroy;
    return i.destroy = function() {
        n.apply(this, arguments), this.css({
            display: ""
        })
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, function(t, e) {
    "use strict";

    function i(t) {
        this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
    }
    var o = i.prototype,
        n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
    return n.forEach(function(t) {
        o[t] = function() {
            return e.prototype[t].apply(this.isotope, arguments)
        }
    }), o.needsVerticalResizeLayout = function() {
        var e = t(this.isotope.element),
            i = this.isotope.size && e;
        return i && e.innerHeight != this.isotope.size.innerHeight
    }, o._getMeasurement = function() {
        this.isotope._getMeasurement.apply(this, arguments)
    }, o.getColumnWidth = function() {
        this.getSegmentSize("column", "Width")
    }, o.getRowHeight = function() {
        this.getSegmentSize("row", "Height")
    }, o.getSegmentSize = function(t, e) {
        var i = t + e,
            o = "outer" + e;
        if (this._getMeasurement(i, o), !this[i]) {
            var n = this.getFirstItemSize();
            this[i] = n && n[o] || this.isotope.size["inner" + e]
        }
    }, o.getFirstItemSize = function() {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element)
    }, o.layout = function() {
        this.isotope.layout.apply(this.isotope, arguments)
    }, o.getSize = function() {
        this.isotope.getSize(), this.size = this.isotope.size
    }, i.modes = {}, i.create = function(t, e) {
        function n() {
            i.apply(this, arguments)
        }
        return n.prototype = Object.create(o), n.prototype.constructor = n, e && (n.options = e), n.prototype.namespace = t, i.modes[t] = n, n
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function(t, e) {
    var i = t.create("masonry");
    return i.compatOptions.fitWidth = "isFitWidth", i.prototype._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0
    }, i.prototype.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0],
                i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var o = this.columnWidth += this.gutter,
            n = this.containerWidth + this.gutter,
            s = n / o,
            r = o - n % o,
            a = r && r < 1 ? "round" : "floor";
        s = Math[a](s), this.cols = Math.max(s, 1)
    }, i.prototype.getContainerWidth = function() {
        var t = this._getOption("fitWidth"),
            i = t ? this.element.parentNode : this.element,
            o = e(i);
        this.containerWidth = o && o.innerWidth
    }, i.prototype._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
            i = e && e < 1 ? "round" : "ceil",
            o = Math[i](t.size.outerWidth / this.columnWidth);
        o = Math.min(o, this.cols);
        for (var n = this._getColGroup(o), s = Math.min.apply(Math, n), r = n.indexOf(s), a = {
                x: this.columnWidth * r,
                y: s
            }, l = s + t.size.outerHeight, d = this.cols + 1 - n.length, c = 0; c < d; c++) this.colYs[r + c] = l;
        return a
    }, i.prototype._getColGroup = function(t) {
        if (t < 2) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++) {
            var n = this.colYs.slice(o, o + t);
            e[o] = Math.max.apply(Math, n);
        }
        return e
    }, i.prototype._manageStamp = function(t) {
        var i = e(t),
            o = this._getElementOffset(t),
            n = this._getOption("originLeft"),
            s = n ? o.left : o.right,
            r = s + i.outerWidth,
            a = Math.floor(s / this.columnWidth);
        a = Math.max(0, a);
        var l = Math.floor(r / this.columnWidth);
        l -= r % this.columnWidth ? 0 : 1, l = Math.min(this.cols - 1, l);
        for (var d = this._getOption("originTop"), c = (d ? o.top : o.bottom) + i.outerHeight, h = a; h <= l; h++) this.colYs[h] = Math.max(c, this.colYs[h])
    }, i.prototype._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
    }, i.prototype._getContainerFitWidth = function() {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }, i.prototype.needsResizeLayout = function() {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, function(t, e) {
    "use strict";
    var i = t.create("masonry"),
        o = i.prototype,
        n = {
            _getElementOffset: !0,
            layout: !0,
            _getMeasurement: !0
        };
    for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]);
    var r = o.measureColumns;
    o.measureColumns = function() {
        this.items = this.isotope.filteredItems, r.call(this)
    };
    var a = o._getOption;
    return o._getOption = function(t) {
        return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments)
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("fitRows"),
        i = e.prototype;
    return i._resetLayout = function() {
        this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
    }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
            i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
        var o = {
            x: this.x,
            y: this.y
        };
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, o
    }, i._getContainerSize = function() {
        return {
            height: this.maxY
        }
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("vertical", {
            horizontalAlignment: 0
        }),
        i = e.prototype;
    return i._resetLayout = function() {
        this.y = 0
    }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
            i = this.y;
        return this.y += t.size.outerHeight, {
            x: e,
            y: i
        }
    }, i._getContainerSize = function() {
        return {
            height: this.y
        }
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function(i, o, n, s, r, a) {
        return e(t, i, o, n, s, r, a)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope/js/item"), require("isotope/js/layout-mode"), require("isotope/js/layout-modes/masonry"), require("isotope/js/layout-modes/fit-rows"), require("isotope/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
}(window, function(t, e, i, o, n, s, r) {
    function a(t, e) {
        return function(i, o) {
            for (var n = 0; n < t.length; n++) {
                var s = t[n],
                    r = i.sortData[s],
                    a = o.sortData[s];
                if (r > a || r < a) {
                    var l = void 0 !== e[s] ? e[s] : e,
                        d = l ? 1 : -1;
                    return (r > a ? 1 : -1) * d
                }
            }
            return 0
        }
    }
    var l = t.jQuery,
        d = String.prototype.trim ? function(t) {
            return t.trim()
        } : function(t) {
            return t.replace(/^\s+|\s+$/g, "")
        },
        c = e.create("isotope", {
            layoutMode: "masonry",
            isJQueryFiltering: !0,
            sortAscending: !0
        });
    c.Item = s, c.LayoutMode = r;
    var h = c.prototype;
    h._create = function() {
        this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
        for (var t in r.modes) this._initLayoutMode(t)
    }, h.reloadItems = function() {
        this.itemGUID = 0, e.prototype.reloadItems.call(this)
    }, h._itemize = function() {
        for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
            var o = t[i];
            o.id = this.itemGUID++
        }
        return this._updateItemsSortData(t), t
    }, h._initLayoutMode = function(t) {
        var e = r.modes[t],
            i = this.options[t] || {};
        this.options[t] = e.options ? n.extend(e.options, i) : i, this.modes[t] = new e(this)
    }, h.layout = function() {
        return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
    }, h._layout = function() {
        var t = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
    }, h.arrange = function(t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
    }, h._init = h.arrange, h._hideReveal = function(t) {
        this.reveal(t.needReveal), this.hide(t.needHide)
    }, h._getIsInstant = function() {
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = e, e
    }, h._bindArrangeComplete = function() {
        function t() {
            e && i && o && n.dispatchEvent("arrangeComplete", null, [n.filteredItems])
        }
        var e, i, o, n = this;
        this.once("layoutComplete", function() {
            e = !0, t()
        }), this.once("hideComplete", function() {
            i = !0, t()
        }), this.once("revealComplete", function() {
            o = !0, t()
        })
    }, h._filter = function(t) {
        var e = this.options.filter;
        e = e || "*";
        for (var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
            var a = t[r];
            if (!a.isIgnored) {
                var l = s(a);
                l && i.push(a), l && a.isHidden ? o.push(a) : l || a.isHidden || n.push(a)
            }
        }
        return {
            matches: i,
            needReveal: o,
            needHide: n
        }
    }, h._getFilterTest = function(t) {
        return l && this.options.isJQueryFiltering ? function(e) {
            return l(e.element).is(t)
        } : "function" == typeof t ? function(e) {
            return t(e.element)
        } : function(e) {
            return o(e.element, t)
        }
    }, h.updateSortData = function(t) {
        var e;
        t ? (t = n.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
    }, h._getSorters = function() {
        var t = this.options.getSortData;
        for (var e in t) {
            var i = t[e];
            this._sorters[e] = p(i)
        }
    }, h._updateItemsSortData = function(t) {
        for (var e = t && t.length, i = 0; e && i < e; i++) {
            var o = t[i];
            o.updateSortData()
        }
    };
    var p = function() {
        function t(t) {
            if ("string" != typeof t) return t;
            var i = d(t).split(" "),
                o = i[0],
                n = o.match(/^\[(.+)\]$/),
                s = n && n[1],
                r = e(s, o),
                a = c.sortDataParsers[i[1]];
            return t = a ? function(t) {
                return t && a(r(t))
            } : function(t) {
                return t && r(t)
            }
        }

        function e(t, e) {
            return t ? function(e) {
                return e.getAttribute(t)
            } : function(t) {
                var i = t.querySelector(e);
                return i && i.textContent
            }
        }
        return t
    }();
    c.sortDataParsers = {
        parseInt: function(t) {
            return parseInt(t, 10)
        },
        parseFloat: function(t) {
            return parseFloat(t)
        }
    }, h._sort = function() {
        var t = this.options.sortBy;
        if (t) {
            var e = [].concat.apply(t, this.sortHistory),
                i = a(e, this.options.sortAscending);
            this.filteredItems.sort(i), t != this.sortHistory[0] && this.sortHistory.unshift(t)
        }
    }, h._mode = function() {
        var t = this.options.layoutMode,
            e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return e.options = this.options[t], e
    }, h._resetLayout = function() {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout()
    }, h._getItemLayoutPosition = function(t) {
        return this._mode()._getItemLayoutPosition(t)
    }, h._manageStamp = function(t) {
        this._mode()._manageStamp(t)
    }, h._getContainerSize = function() {
        return this._mode()._getContainerSize()
    }, h.needsResizeLayout = function() {
        return this._mode().needsResizeLayout()
    }, h.appended = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i)
        }
    }, h.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            this._resetLayout(), this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
        }
    }, h._filterRevealAdded = function(t) {
        var e = this._filter(t);
        return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
    }, h.insert = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i, o, n = e.length;
            for (i = 0; i < n; i++) o = e[i], this.element.appendChild(o.element);
            var s = this._filter(e).matches;
            for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;
            for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;
            this.reveal(s)
        }
    };
    var u = h.remove;
    return h.remove = function(t) {
        t = n.makeArray(t);
        var e = this.getItems(t);
        u.call(this, t);
        for (var i = e && e.length, o = 0; i && o < i; o++) {
            var s = e[o];
            n.removeFrom(this.filteredItems, s)
        }
    }, h.shuffle = function() {
        for (var t = 0; t < this.items.length; t++) {
            var e = this.items[t];
            e.sortData.random = Math.random()
        }
        this.options.sortBy = "random", this._sort(), this._layout()
    }, h._noTransition = function(t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var o = t.apply(this, e);
        return this.options.transitionDuration = i, o
    }, h.getFilteredItemElements = function() {
        return this.filteredItems.map(function(t) {
            return t.element
        })
    }, c
}),
function(t) {
    t.fn.appear = function(e, i) {
        var o = t.extend({
            data: void 0,
            one: !0,
            accX: 0,
            accY: 0
        }, i);
        return this.each(function() {
            var i = t(this);
            if (i.appeared = !1, !e) return void i.trigger("appear", o.data);
            var n = t(window),
                s = function() {
                    if (!i.is(":visible")) return void(i.appeared = !1);
                    var t = n.scrollLeft(),
                        e = n.scrollTop(),
                        s = i.offset(),
                        r = s.left,
                        a = s.top,
                        l = o.accX,
                        d = o.accY,
                        c = i.height(),
                        h = n.height(),
                        p = i.width(),
                        u = n.width();
                    a + c + d >= e && a <= e + h + d && r + p + l >= t && r <= t + u + l ? i.appeared || i.trigger("appear", o.data) : i.appeared = !1
                },
                r = function() {
                    if (i.appeared = !0, o.one) {
                        n.unbind("scroll", s);
                        var r = t.inArray(s, t.fn.appear.checks);
                        r >= 0 && t.fn.appear.checks.splice(r, 1)
                    }
                    e.apply(this, arguments)
                };
            o.one ? i.one("appear", o.data, r) : i.bind("appear", o.data, r), n.scroll(s), t.fn.appear.checks.push(s), s()
        })
    }, t.extend(t.fn.appear, {
        checks: [],
        timeout: null,
        checkAll: function() {
            var e = t.fn.appear.checks.length;
            if (e > 0)
                for (; e--;) t.fn.appear.checks[e]()
        },
        run: function() {
            t.fn.appear.timeout && clearTimeout(t.fn.appear.timeout), t.fn.appear.timeout = setTimeout(t.fn.appear.checkAll, 20)
        }
    }), t.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function(e, i) {
        var o = t.fn[i];
        o && (t.fn[i] = function() {
            var e = o.apply(this, arguments);
            return t.fn.appear.run(), e
        })
    })
}(jQuery), ! function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], function(i) {
        return e(i, t, t.document, t.Math)
    }) : "object" == typeof exports && exports ? module.exports = e(require("jquery"), t, t.document, t.Math) : e(jQuery, t, t.document, t.Math)
}("undefined" != typeof window ? window : this, function(t, e, i, o, n) {
    "use strict";
    var s = "fullpage-wrapper",
        r = "." + s,
        a = "fp-scrollable",
        l = "." + a,
        d = "fp-responsive",
        c = "fp-notransition",
        h = "fp-destroyed",
        p = "fp-enabled",
        u = "fp-viewing",
        f = "active",
        g = "." + f,
        m = "fp-completely",
        v = "." + m,
        y = ".section",
        w = "fp-section",
        b = "." + w,
        S = b + g,
        T = b + ":first",
        x = b + ":last",
        k = "fp-tableCell",
        C = "." + k,
        $ = "fp-auto-height",
        I = "fp-normal-scroll",
        E = "fp-nav",
        A = "#" + E,
        O = "fp-tooltip",
        R = "." + O,
        z = "fp-show-active",
        L = ".slide",
        j = "fp-slide",
        P = "." + j,
        M = P + g,
        D = "fp-slides",
        _ = "." + D,
        H = "fp-slidesContainer",
        F = "." + H,
        N = "fp-table",
        W = "fp-slidesNav",
        B = "." + W,
        q = B + " a",
        U = "fp-controlArrow",
        Y = "." + U,
        V = "fp-prev",
        X = "." + V,
        Q = U + " " + V,
        G = Y + X,
        K = "fp-next",
        Z = "." + K,
        J = U + " " + K,
        tt = Y + Z,
        et = t(e),
        it = t(i),
        ot = {
            scrollbars: !0,
            mouseWheel: !0,
            hideScrollbars: !1,
            fadeScrollbars: !1,
            disableMouse: !0,
            interactiveScrollbars: !0
        };
    t.fn.fullpage = function(a) {
        function l(e, i) {
            e || ti(0), si("autoScrolling", e, i);
            var o = t(S);
            a.autoScrolling && !a.scrollBar ? (li.css({
                overflow: "hidden",
                height: "100%"
            }), U(Li.recordHistory, "internal"), yi.css({
                "-ms-touch-action": "none",
                "touch-action": "none"
            }), o.length && ti(o.position().top)) : (li.css({
                overflow: "visible",
                height: "initial"
            }), U(!1, "internal"), yi.css({
                "-ms-touch-action": "",
                "touch-action": ""
            }), o.length && li.scrollTop(o.position().top))
        }

        function U(t, e) {
            si("recordHistory", t, e)
        }

        function X(t, e) {
            si("scrollingSpeed", t, e)
        }

        function K(t, e) {
            si("fitToSection", t, e)
        }

        function Z(t) {
            a.lockAnchors = t
        }

        function st(t) {
            t ? (Ye(), Ve()) : (Ue(), Xe())
        }

        function rt(e, i) {
            "undefined" != typeof i ? (i = i.replace(/ /g, "").split(","), t.each(i, function(t, i) {
                ii(e, i, "m")
            })) : e ? (st(!0), Qe()) : (st(!1), Ge())
        }

        function at(e, i) {
            "undefined" != typeof i ? (i = i.replace(/ /g, "").split(","), t.each(i, function(t, i) {
                ii(e, i, "k")
            })) : a.keyboardScrolling = e
        }

        function lt() {
            var e = t(S).prev(b);
            e.length || !a.loopTop && !a.continuousVertical || (e = t(b).last()), e.length && Vt(e, null, !0)
        }

        function dt() {
            var e = t(S).next(b);
            e.length || !a.loopBottom && !a.continuousVertical || (e = t(b).first()), e.length && Vt(e, null, !1)
        }

        function ct(t, e) {
            X(0, "internal"), ht(t, e), X(Li.scrollingSpeed, "internal")
        }

        function ht(t, e) {
            var i = Pe(t);
            "undefined" != typeof e ? De(t, e) : i.length > 0 && Vt(i)
        }

        function pt(t) {
            qt("right", t)
        }

        function ut(t) {
            qt("left", t)
        }

        function ft(e) {
            if (!yi.hasClass(h)) {
                bi = !0, wi = et.height(), t(b).each(function() {
                    var e = t(this).find(_),
                        i = t(this).find(P);
                    a.verticalCentered && t(this).find(C).css("height", Le(t(this)) + "px"), t(this).css("height", wi + "px"), a.scrollOverflow && (i.length ? i.each(function() {
                        Re(t(this))
                    }) : Re(t(this))), i.length > 1 && ye(e, e.find(M))
                });
                var i = t(S),
                    o = i.index(b);
                o && ct(o + 1), bi = !1, t.isFunction(a.afterResize) && e && a.afterResize.call(yi), t.isFunction(a.afterReBuild) && !e && a.afterReBuild.call(yi)
            }
        }

        function gt(e) {
            var i = di.hasClass(d);
            e ? i || (l(!1, "internal"), K(!1, "internal"), t(A).hide(), di.addClass(d), t.isFunction(a.afterResponsive) && a.afterResponsive.call(yi, e)) : i && (l(Li.autoScrolling, "internal"), K(Li.autoScrolling, "internal"), t(A).show(), di.removeClass(d), t.isFunction(a.afterResponsive) && a.afterResponsive.call(yi, e))
        }

        function mt() {
            a.css3 && (a.css3 = qe()), a.scrollBar = a.scrollBar || a.hybrid, yt(), wt(), rt(!0), l(a.autoScrolling, "internal"), xe(), Be(), "complete" === i.readyState && se(), et.on("load", se)
        }

        function vt() {
            et.on("scroll", zt).on("hashchange", re).blur(ue).resize(Te), it.keydown(ae).keyup(de).on("click touchstart", A + " a", fe).on("click touchstart", q, ge).on("click", R, le), t(b).on("click touchstart", Y, pe), a.normalScrollElements && (it.on("mouseenter", a.normalScrollElements, function() {
                st(!1)
            }), it.on("mouseleave", a.normalScrollElements, function() {
                st(!0)
            }))
        }

        function yt() {
            var e = yi.find(a.sectionSelector);
            a.anchors.length || (a.anchors = e.filter("[data-anchor]").map(function() {
                return t(this).data("anchor").toString()
            }).get()), a.navigationTooltips.length || (a.navigationTooltips = e.filter("[data-tooltip]").map(function() {
                return t(this).data("tooltip").toString()
            }).get())
        }

        function wt() {
            yi.css({
                height: "100%",
                position: "relative"
            }), yi.addClass(s), t("html").addClass(p), wi = et.height(), yi.removeClass(h), xt(), t(b).each(function(e) {
                var i = t(this),
                    o = i.find(P),
                    n = o.length;
                St(i, e), Tt(i, e), n > 0 ? bt(i, o, n) : a.verticalCentered && ze(i)
            }), a.fixedElements && a.css3 && t(a.fixedElements).appendTo(di), a.navigation && Ct(), It(), a.scrollOverflow ? ("complete" === i.readyState && $t(), et.on("load", $t)) : Ot()
        }

        function bt(e, i, o) {
            var n = 100 * o,
                s = 100 / o;
            i.wrapAll('<div class="' + H + '" />'), i.parent().wrap('<div class="' + D + '" />'), e.find(F).css("width", n + "%"), o > 1 && (a.controlArrows && kt(e), a.slidesNavigation && He(e, o)), i.each(function(e) {
                t(this).css("width", s + "%"), a.verticalCentered && ze(t(this))
            });
            var r = e.find(M);
            r.length && (0 !== t(S).index(b) || 0 === t(S).index(b) && 0 !== r.index()) ? Je(r, "internal") : i.eq(0).addClass(f)
        }

        function St(e, i) {
            i || 0 !== t(S).length || e.addClass(f), fi = t(S), e.css("height", wi + "px"), a.paddingTop && e.css("padding-top", a.paddingTop), a.paddingBottom && e.css("padding-bottom", a.paddingBottom), "undefined" != typeof a.sectionsColor[i] && e.css("background-color", a.sectionsColor[i]), "undefined" != typeof a.anchors[i] && e.attr("data-anchor", a.anchors[i])
        }

        function Tt(e, i) {
            "undefined" != typeof a.anchors[i] && e.hasClass(f) && Ee(a.anchors[i], i), a.menu && a.css3 && t(a.menu).closest(r).length && t(a.menu).appendTo(di)
        }

        function xt() {
            yi.find(a.sectionSelector).addClass(w), yi.find(a.slideSelector).addClass(j)
        }

        function kt(t) {
            t.find(_).after('<div class="' + Q + '"></div><div class="' + J + '"></div>'), "#fff" != a.controlArrowColor && (t.find(tt).css("border-color", "transparent transparent transparent " + a.controlArrowColor), t.find(G).css("border-color", "transparent " + a.controlArrowColor + " transparent transparent")), a.loopHorizontal || t.find(G).hide()
        }

        function Ct() {
            di.append('<div id="' + E + '"><ul></ul></div>');
            var e = t(A);
            e.addClass(function() {
                return a.showActiveTooltip ? z + " " + a.navigationPosition : a.navigationPosition
            });
            for (var i = 0; i < t(b).length; i++) {
                var o = "";
                a.anchors.length && (o = a.anchors[i]);
                var n = '<li><a href="#' + o + '"><span></span></a>',
                    s = a.navigationTooltips[i];
                "undefined" != typeof s && "" !== s && (n += '<div class="' + O + " " + a.navigationPosition + '">' + s + "</div>"), n += "</li>", e.find("ul").append(n)
            }
            t(A).css("margin-top", "-" + t(A).height() / 2 + "px"), t(A).find("li").eq(t(S).index(b)).find("a").addClass(f)
        }

        function $t() {
            t(b).each(function() {
                var e = t(this).find(P);
                e.length ? e.each(function() {
                    Re(t(this))
                }) : Re(t(this))
            }), Ot()
        }

        function It() {
            yi.find('iframe[src*="youtube.com/embed/"]').each(function() {
                Et(t(this), "enablejsapi=1")
            })
        }

        function Et(t, e) {
            var i = t.attr("src");
            t.attr("src", i + At(i) + e)
        }

        function At(t) {
            return /\?/.test(t) ? "&" : "?"
        }

        function Ot() {
            var e = t(S);
            e.addClass(m), a.scrollOverflowHandler.afterRender && a.scrollOverflowHandler.afterRender(e), te(e), ee(e), a.scrollOverflowHandler.afterLoad(), Rt() && t.isFunction(a.afterLoad) && a.afterLoad.call(e, e.data("anchor"), e.index(b) + 1), t.isFunction(a.afterRender) && a.afterRender.call(yi)
        }

        function Rt() {
            var t = e.location.hash.replace("#", "").split("/"),
                i = Pe(decodeURIComponent(t[0]));
            return !i.length || i.length && i.index() === fi.index()
        }

        function zt() {
            var e;
            if (!a.autoScrolling || a.scrollBar) {
                var o = et.scrollTop(),
                    n = Pt(o),
                    s = 0,
                    r = o + et.height() / 2,
                    l = di.height() - et.height() === o,
                    d = i.querySelectorAll(b);
                if (l) s = d.length - 1;
                else if (o)
                    for (var c = 0; c < d.length; ++c) {
                        var h = d[c];
                        h.offsetTop <= r && (s = c)
                    } else s = 0;
                if (jt(n) && (t(S).hasClass(m) || t(S).addClass(m).siblings().removeClass(m)), e = t(d).eq(s), !e.hasClass(f)) {
                    ji = !0;
                    var p, u, g = t(S),
                        v = g.index(b) + 1,
                        y = Ae(e),
                        w = e.data("anchor"),
                        T = e.index(b) + 1,
                        x = e.find(M);
                    x.length && (u = x.data("anchor"), p = x.index()), Ti && (e.addClass(f).siblings().removeClass(f), t.isFunction(a.onLeave) && a.onLeave.call(g, v, T, y), t.isFunction(a.afterLoad) && a.afterLoad.call(e, w, T), oe(g), te(e), ee(e), Ee(w, T - 1), a.anchors.length && (hi = w), Fe(p, u, w, T)), clearTimeout(Ei), Ei = setTimeout(function() {
                        ji = !1
                    }, 100)
                }
                a.fitToSection && (clearTimeout(Ai), Ai = setTimeout(function() {
                    a.fitToSection && Lt()
                }, a.fitToSectionDelay))
            }
        }

        function Lt() {
            Ti && (bi = !0, Vt(t(S)), bi = !1)
        }

        function jt(e) {
            var i = t(S).position().top,
                o = i + et.height();
            return "up" == e ? o >= et.scrollTop() + et.height() : i <= et.scrollTop()
        }

        function Pt(t) {
            var e = t > Pi ? "down" : "up";
            return Pi = t, Ni = t, e
        }

        function Mt(t, e) {
            if (ki.m[t]) {
                var i = "down" === t ? "bottom" : "top",
                    o = "down" === t ? dt : lt;
                if (e.length > 0) {
                    if (!a.scrollOverflowHandler.isScrolled(i, e)) return !0;
                    o()
                } else o()
            }
        }

        function Dt(t) {
            var e = t.originalEvent;
            !Ht(t.target) && a.autoScrolling && Ft(e) && t.preventDefault()
        }

        function _t(e) {
            var i = e.originalEvent,
                n = t(i.target).closest(b);
            if (!Ht(e.target) && Ft(i)) {
                a.autoScrolling && e.preventDefault();
                var s = a.scrollOverflowHandler.scrollable(n),
                    r = Ze(i);
                _i = r.y, Hi = r.x, n.find(_).length && o.abs(Di - Hi) > o.abs(Mi - _i) ? !gi && o.abs(Di - Hi) > et.outerWidth() / 100 * a.touchSensitivity && (Di > Hi ? ki.m.right && pt(n) : ki.m.left && ut(n)) : a.autoScrolling && Ti && o.abs(Mi - _i) > et.height() / 100 * a.touchSensitivity && (Mi > _i ? Mt("down", s) : _i > Mi && Mt("up", s))
            }
        }

        function Ht(e, i) {
            i = i || 0;
            var o = t(e).parent();
            return !!(i < a.normalScrollElementTouchThreshold && o.is(a.normalScrollElements)) || i != a.normalScrollElementTouchThreshold && Ht(o, ++i)
        }

        function Ft(t) {
            return "undefined" == typeof t.pointerType || "mouse" != t.pointerType
        }

        function Nt(t) {
            var e = t.originalEvent;
            if (a.fitToSection && li.stop(), Ft(e)) {
                var i = Ze(e);
                Mi = i.y, Di = i.x
            }
        }

        function Wt(t, e) {
            for (var i = 0, n = t.slice(o.max(t.length - e, 1)), s = 0; s < n.length; s++) i += n[s];
            return o.ceil(i / e)
        }

        function Bt(i) {
            var n = (new Date).getTime(),
                s = t(v).hasClass(I);
            if (a.autoScrolling && !ui && !s) {
                i = i || e.event;
                var r = i.wheelDelta || -i.deltaY || -i.detail,
                    l = o.max(-1, o.min(1, r)),
                    d = "undefined" != typeof i.wheelDeltaX || "undefined" != typeof i.deltaX,
                    c = o.abs(i.wheelDeltaX) < o.abs(i.wheelDelta) || o.abs(i.deltaX) < o.abs(i.deltaY) || !d;
                xi.length > 149 && xi.shift(), xi.push(o.abs(r)), a.scrollBar && (i.preventDefault ? i.preventDefault() : i.returnValue = !1);
                var h = t(S),
                    p = a.scrollOverflowHandler.scrollable(h),
                    u = n - Fi;
                if (Fi = n, u > 200 && (xi = []), Ti) {
                    var f = Wt(xi, 10),
                        g = Wt(xi, 70),
                        m = f >= g;
                    m && c && (0 > l ? Mt("down", p) : Mt("up", p))
                }
                return !1
            }
            a.fitToSection && li.stop()
        }

        function qt(e, i) {
            var o = "undefined" == typeof i ? t(S) : i,
                n = o.find(_),
                s = n.find(P).length;
            if (!(!n.length || gi || 2 > s)) {
                var r = n.find(M),
                    l = null;
                if (l = "left" === e ? r.prev(P) : r.next(P), !l.length) {
                    if (!a.loopHorizontal) return;
                    l = "left" === e ? r.siblings(":last") : r.siblings(":first")
                }
                gi = !0, ye(n, l, e)
            }
        }

        function Ut() {
            t(M).each(function() {
                Je(t(this), "internal")
            })
        }

        function Yt(t) {
            var e = t.position(),
                i = e.top,
                o = e.top > Ni,
                n = i - wi + t.outerHeight(),
                s = a.bigSectionsDestination;
            return t.outerHeight() > wi ? (!o && !s || "bottom" === s) && (i = n) : (o || bi && t.is(":last-child")) && (i = n), Ni = i, i
        }

        function Vt(e, i, o) {
            if ("undefined" != typeof e) {
                var n, s, r = Yt(e),
                    l = {
                        element: e,
                        callback: i,
                        isMovementUp: o,
                        dtop: r,
                        yMovement: Ae(e),
                        anchorLink: e.data("anchor"),
                        sectionIndex: e.index(b),
                        activeSlide: e.find(M),
                        activeSection: t(S),
                        leavingSection: t(S).index(b) + 1,
                        localIsResizing: bi
                    };
                l.activeSection.is(e) && !bi || a.scrollBar && et.scrollTop() === l.dtop && !e.hasClass($) || (l.activeSlide.length && (n = l.activeSlide.data("anchor"), s = l.activeSlide.index()), a.autoScrolling && a.continuousVertical && "undefined" != typeof l.isMovementUp && (!l.isMovementUp && "up" == l.yMovement || l.isMovementUp && "down" == l.yMovement) && (l = Gt(l)), (!t.isFunction(a.onLeave) || l.localIsResizing || a.onLeave.call(l.activeSection, l.leavingSection, l.sectionIndex + 1, l.yMovement) !== !1) && (l.localIsResizing || oe(l.activeSection), a.scrollOverflowHandler.beforeLeave(), e.addClass(f).siblings().removeClass(f), te(e), a.scrollOverflowHandler.onLeave(), Ti = !1, Fe(s, n, l.anchorLink, l.sectionIndex), Xt(l), hi = l.anchorLink, Ee(l.anchorLink, l.sectionIndex)))
            }
        }

        function Xt(e) {
            if (a.css3 && a.autoScrolling && !a.scrollBar) {
                var i = "translate3d(0px, -" + o.round(e.dtop) + "px, 0px)";
                je(i, !0), a.scrollingSpeed ? (clearTimeout($i), $i = setTimeout(function() {
                    Zt(e)
                }, a.scrollingSpeed)) : Zt(e)
            } else {
                var n = Qt(e);
                t(n.element).animate(n.options, a.scrollingSpeed, a.easing).promise().done(function() {
                    a.scrollBar ? setTimeout(function() {
                        Zt(e)
                    }, 30) : Zt(e)
                })
            }
        }

        function Qt(t) {
            var e = {};
            return a.autoScrolling && !a.scrollBar ? (e.options = {
                top: -t.dtop
            }, e.element = r) : (e.options = {
                scrollTop: t.dtop
            }, e.element = "html, body"), e
        }

        function Gt(e) {
            return e.isMovementUp ? t(S).before(e.activeSection.nextAll(b)) : t(S).after(e.activeSection.prevAll(b).get().reverse()), ti(t(S).position().top), Ut(), e.wrapAroundElements = e.activeSection, e.dtop = e.element.position().top, e.yMovement = Ae(e.element), e
        }

        function Kt(e) {
            e.wrapAroundElements && e.wrapAroundElements.length && (e.isMovementUp ? t(T).before(e.wrapAroundElements) : t(x).after(e.wrapAroundElements), ti(t(S).position().top), Ut())
        }

        function Zt(e) {
            Kt(e), t.isFunction(a.afterLoad) && !e.localIsResizing && a.afterLoad.call(e.element, e.anchorLink, e.sectionIndex + 1), a.scrollOverflowHandler.afterLoad(), e.localIsResizing || ee(e.element), e.element.addClass(m).siblings().removeClass(m), Ti = !0, t.isFunction(e.callback) && e.callback.call(this)
        }

        function Jt(t, e) {
            t.attr(e, t.data(e)).removeAttr("data-" + e)
        }

        function te(e) {
            if (a.lazyLoading) {
                var i, o = ne(e);
                o.find("img[data-src], img[data-srcset], source[data-src], audio[data-src], iframe[data-src]").each(function() {
                    i = t(this), t.each(["src", "srcset"], function(t, e) {
                        var o = i.attr("data-" + e);
                        "undefined" != typeof o && o && Jt(i, e)
                    }), i.is("source") && i.closest("video").get(0).load()
                })
            }
        }

        function ee(e) {
            var i = ne(e);
            i.find("video, audio").each(function() {
                var e = t(this).get(0);
                e.hasAttribute("data-autoplay") && "function" == typeof e.play && e.play()
            }), i.find('iframe[src*="youtube.com/embed/"]').each(function() {
                var e = t(this).get(0);
                e.hasAttribute("data-autoplay") && ie(e), e.onload = function() {
                    e.hasAttribute("data-autoplay") && ie(e)
                }
            })
        }

        function ie(t) {
            t.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
        }

        function oe(e) {
            var i = ne(e);
            i.find("video, audio").each(function() {
                var e = t(this).get(0);
                e.hasAttribute("data-keepplaying") || "function" != typeof e.pause || e.pause()
            }), i.find('iframe[src*="youtube.com/embed/"]').each(function() {
                var e = t(this).get(0);
                /youtube\.com\/embed\//.test(t(this).attr("src")) && !e.hasAttribute("data-keepplaying") && t(this).get(0).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
            })
        }

        function ne(e) {
            var i = e.find(M);
            return i.length && (e = t(i)), e
        }

        function se() {
            var t = e.location.hash.replace("#", "").split("/"),
                i = decodeURIComponent(t[0]),
                o = decodeURIComponent(t[1]);
            i && (a.animateAnchor ? De(i, o) : ct(i, o))
        }

        function re() {
            if (!ji && !a.lockAnchors) {
                var t = e.location.hash.replace("#", "").split("/"),
                    i = decodeURIComponent(t[0]),
                    o = decodeURIComponent(t[1]),
                    n = "undefined" == typeof hi,
                    s = "undefined" == typeof hi && "undefined" == typeof o && !gi;
                i.length && (i && i !== hi && !n || s || !gi && pi != o) && De(i, o)
            }
        }

        function ae(e) {
            clearTimeout(Oi);
            var i = t(":focus");
            if (!i.is("textarea") && !i.is("input") && !i.is("select") && "true" !== i.attr("contentEditable") && "" !== i.attr("contentEditable") && a.keyboardScrolling && a.autoScrolling) {
                var o = e.which,
                    n = [40, 38, 32, 33, 34];
                t.inArray(o, n) > -1 && e.preventDefault(), ui = e.ctrlKey, Oi = setTimeout(function() {
                    me(e)
                }, 150)
            }
        }

        function le() {
            t(this).prev().trigger("click")
        }

        function de(t) {
            Si && (ui = t.ctrlKey)
        }

        function ce(t) {
            2 == t.which && (Wi = t.pageY, yi.on("mousemove", ve))
        }

        function he(t) {
            2 == t.which && yi.off("mousemove")
        }

        function pe() {
            var e = t(this).closest(b);
            t(this).hasClass(V) ? ki.m.left && ut(e) : ki.m.right && pt(e)
        }

        function ue() {
            Si = !1, ui = !1
        }

        function fe(e) {
            e.preventDefault();
            var i = t(this).parent().index();
            Vt(t(b).eq(i))
        }

        function ge(e) {
            e.preventDefault();
            var i = t(this).closest(b).find(_),
                o = i.find(P).eq(t(this).closest("li").index());
            ye(i, o)
        }

        function me(e) {
            var i = e.shiftKey;
            if (Ti || !([37, 39].indexOf(e.which) < 0)) switch (e.which) {
                case 38:
                case 33:
                    ki.k.up && lt();
                    break;
                case 32:
                    if (i && ki.k.up) {
                        lt();
                        break
                    }
                case 40:
                case 34:
                    ki.k.down && dt();
                    break;
                case 36:
                    ki.k.up && ht(1);
                    break;
                case 35:
                    ki.k.down && ht(t(b).length);
                    break;
                case 37:
                    ki.k.left && ut();
                    break;
                case 39:
                    ki.k.right && pt();
                    break;
                default:
                    return
            }
        }

        function ve(t) {
            Ti && (t.pageY < Wi && ki.m.up ? lt() : t.pageY > Wi && ki.m.down && dt()), Wi = t.pageY
        }

        function ye(e, i, o) {
            var n = e.closest(b),
                s = {
                    slides: e,
                    destiny: i,
                    direction: o,
                    destinyPos: i.position(),
                    slideIndex: i.index(),
                    section: n,
                    sectionIndex: n.index(b),
                    anchorLink: n.data("anchor"),
                    slidesNav: n.find(B),
                    slideAnchor: We(i),
                    prevSlide: n.find(M),
                    prevSlideIndex: n.find(M).index(),
                    localIsResizing: bi
                };
            return s.xMovement = Oe(s.prevSlideIndex, s.slideIndex), s.localIsResizing || (Ti = !1), a.onSlideLeave && !s.localIsResizing && "none" !== s.xMovement && t.isFunction(a.onSlideLeave) && a.onSlideLeave.call(s.prevSlide, s.anchorLink, s.sectionIndex + 1, s.prevSlideIndex, s.xMovement, s.slideIndex) === !1 ? void(gi = !1) : (i.addClass(f).siblings().removeClass(f), s.localIsResizing || (oe(s.prevSlide), te(i)), !a.loopHorizontal && a.controlArrows && (n.find(G).toggle(0 !== s.slideIndex), n.find(tt).toggle(!i.is(":last-child"))), n.hasClass(f) && !s.localIsResizing && Fe(s.slideIndex, s.slideAnchor, s.anchorLink, s.sectionIndex), void be(e, s, !0))
        }

        function we(e) {
            Se(e.slidesNav, e.slideIndex), e.localIsResizing || (t.isFunction(a.afterSlideLoad) && a.afterSlideLoad.call(e.destiny, e.anchorLink, e.sectionIndex + 1, e.slideAnchor, e.slideIndex), Ti = !0, ee(e.destiny)), gi = !1
        }

        function be(t, e, i) {
            var n = e.destinyPos;
            if (a.css3) {
                var s = "translate3d(-" + o.round(n.left) + "px, 0px, 0px)";
                ke(t.find(F)).css(ei(s)), Ii = setTimeout(function() {
                    i && we(e)
                }, a.scrollingSpeed, a.easing)
            } else t.animate({
                scrollLeft: o.round(n.left)
            }, a.scrollingSpeed, a.easing, function() {
                i && we(e)
            })
        }

        function Se(t, e) {
            t.find(g).removeClass(f), t.find("li").eq(e).find("a").addClass(f)
        }

        function Te() {
            if (xe(), mi) {
                var e = t(i.activeElement);
                if (!e.is("textarea") && !e.is("input") && !e.is("select")) {
                    var n = et.height();
                    o.abs(n - Bi) > 20 * o.max(Bi, n) / 100 && (ft(!0), Bi = n)
                }
            } else clearTimeout(Ci), Ci = setTimeout(function() {
                ft(!0)
            }, 350)
        }

        function xe() {
            var t = a.responsive || a.responsiveWidth,
                e = a.responsiveHeight,
                i = t && et.outerWidth() < t,
                o = e && et.height() < e;
            t && e ? gt(i || o) : t ? gt(i) : e && gt(o)
        }

        function ke(t) {
            var e = "all " + a.scrollingSpeed + "ms " + a.easingcss3;
            return t.removeClass(c), t.css({
                "-webkit-transition": e,
                transition: e
            })
        }

        function Ce(t) {
            return t.addClass(c)
        }

        function $e(e, i) {
            a.navigation && (t(A).find(g).removeClass(f), e ? t(A).find('a[href="#' + e + '"]').addClass(f) : t(A).find("li").eq(i).find("a").addClass(f))
        }

        function Ie(e) {
            a.menu && (t(a.menu).find(g).removeClass(f), t(a.menu).find('[data-menuanchor="' + e + '"]').addClass(f))
        }

        function Ee(t, e) {
            Ie(t), $e(t, e)
        }

        function Ae(e) {
            var i = t(S).index(b),
                o = e.index(b);
            return i == o ? "none" : i > o ? "up" : "down"
        }

        function Oe(t, e) {
            return t == e ? "none" : t > e ? "left" : "right"
        }

        function Re(t) {
            if (!t.hasClass("fp-noscroll")) {
                t.css("overflow", "hidden");
                var e, i = a.scrollOverflowHandler,
                    o = i.wrapContent(),
                    n = t.closest(b),
                    s = i.scrollable(t);
                s.length ? e = i.scrollHeight(t) : (e = t.get(0).scrollHeight, a.verticalCentered && (e = t.find(C).get(0).scrollHeight));
                var r = wi - parseInt(n.css("padding-bottom")) - parseInt(n.css("padding-top"));
                e > r ? s.length ? i.update(t, r) : (a.verticalCentered ? t.find(C).wrapInner(o) : t.wrapInner(o), i.create(t, r)) : i.remove(t), t.css("overflow", "")
            }
        }

        function ze(t) {
            t.hasClass(N) || t.addClass(N).wrapInner('<div class="' + k + '" style="height:' + Le(t) + 'px;" />')
        }

        function Le(t) {
            var e = wi;
            if (a.paddingTop || a.paddingBottom) {
                var i = t;
                i.hasClass(w) || (i = t.closest(b));
                var o = parseInt(i.css("padding-top")) + parseInt(i.css("padding-bottom"));
                e = wi - o
            }
            return e
        }

        function je(t, e) {
            e ? ke(yi) : Ce(yi), yi.css(ei(t)), setTimeout(function() {
                yi.removeClass(c)
            }, 10)
        }

        function Pe(e) {
            if (!e) return [];
            var i = yi.find(b + '[data-anchor="' + e + '"]');
            return i.length || (i = t(b).eq(e - 1)), i
        }

        function Me(t, e) {
            var i = e.find(_),
                o = i.find(P + '[data-anchor="' + t + '"]');
            return o.length || (o = i.find(P).eq(t)), o
        }

        function De(t, e) {
            var i = Pe(t);
            i.length && ("undefined" == typeof e && (e = 0), t === hi || i.hasClass(f) ? _e(i, e) : Vt(i, function() {
                _e(i, e)
            }))
        }

        function _e(t, e) {
            if ("undefined" != typeof e) {
                var i = t.find(_),
                    o = Me(e, t);
                o.length && ye(i, o)
            }
        }

        function He(t, e) {
            t.append('<div class="' + W + '"><ul></ul></div>');
            var i = t.find(B);
            i.addClass(a.slidesNavPosition);
            for (var o = 0; e > o; o++) i.find("ul").append('<li><a href="#"><span></span></a></li>');
            i.css("margin-left", "-" + i.width() / 2 + "px"), i.find("li").first().find("a").addClass(f)
        }

        function Fe(t, e, i, o) {
            var n = "";
            a.anchors.length && !a.lockAnchors && (t ? ("undefined" != typeof i && (n = i), "undefined" == typeof e && (e = t), pi = e, Ne(n + "/" + e)) : "undefined" != typeof t ? (pi = e, Ne(i)) : Ne(i)), Be()
        }

        function Ne(t) {
            if (a.recordHistory) location.hash = t;
            else if (mi || vi) e.history.replaceState(n, n, "#" + t);
            else {
                var i = e.location.href.split("#")[0];
                e.location.replace(i + "#" + t)
            }
        }

        function We(t) {
            var e = t.data("anchor"),
                i = t.index();
            return "undefined" == typeof e && (e = i), e
        }

        function Be() {
            var e = t(S),
                i = e.find(M),
                o = We(e),
                n = We(i),
                s = String(o);
            i.length && (s = s + "-" + n), s = s.replace("/", "-").replace("#", "");
            var r = new RegExp("\\b\\s?" + u + "-[^\\s]+\\b", "g");
            di[0].className = di[0].className.replace(r, ""), di.addClass(u + "-" + s)
        }

        function qe() {
            var t, o = i.createElement("p"),
                s = {
                    webkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    msTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
            i.body.insertBefore(o, null);
            for (var r in s) o.style[r] !== n && (o.style[r] = "translate3d(1px,1px,1px)", t = e.getComputedStyle(o).getPropertyValue(s[r]));
            return i.body.removeChild(o), t !== n && t.length > 0 && "none" !== t
        }

        function Ue() {
            i.addEventListener ? (i.removeEventListener("mousewheel", Bt, !1), i.removeEventListener("wheel", Bt, !1), i.removeEventListener("MozMousePixelScroll", Bt, !1)) : i.detachEvent("onmousewheel", Bt)
        }

        function Ye() {
            var t, o = "";
            e.addEventListener ? t = "addEventListener" : (t = "attachEvent", o = "on");
            var s = "onwheel" in i.createElement("div") ? "wheel" : i.onmousewheel !== n ? "mousewheel" : "DOMMouseScroll";
            "DOMMouseScroll" == s ? i[t](o + "MozMousePixelScroll", Bt, !1) : i[t](o + s, Bt, !1)
        }

        function Ve() {
            yi.on("mousedown", ce).on("mouseup", he)
        }

        function Xe() {
            yi.off("mousedown", ce).off("mouseup", he);
        }

        function Qe() {
            (mi || vi) && (a.autoScrolling && di.off(zi.touchmove).on(zi.touchmove, Dt), t(r).off(zi.touchstart).on(zi.touchstart, Nt).off(zi.touchmove).on(zi.touchmove, _t))
        }

        function Ge() {
            (mi || vi) && t(r).off(zi.touchstart).off(zi.touchmove)
        }

        function Ke() {
            var t;
            return t = e.PointerEvent ? {
                down: "pointerdown",
                move: "pointermove"
            } : {
                down: "MSPointerDown",
                move: "MSPointerMove"
            }
        }

        function Ze(t) {
            var e = [];
            return e.y = "undefined" != typeof t.pageY && (t.pageY || t.pageX) ? t.pageY : t.touches[0].pageY, e.x = "undefined" != typeof t.pageX && (t.pageY || t.pageX) ? t.pageX : t.touches[0].pageX, vi && Ft(t) && a.scrollBar && (e.y = t.touches[0].pageY, e.x = t.touches[0].pageX), e
        }

        function Je(t, e) {
            X(0, "internal"), "undefined" != typeof e && (bi = !0), ye(t.closest(_), t), "undefined" != typeof e && (bi = !1), X(Li.scrollingSpeed, "internal")
        }

        function ti(t) {
            var e = o.round(t);
            if (a.css3 && a.autoScrolling && !a.scrollBar) {
                var i = "translate3d(0px, -" + e + "px, 0px)";
                je(i, !1)
            } else a.autoScrolling && !a.scrollBar ? yi.css("top", -e) : li.scrollTop(e)
        }

        function ei(t) {
            return {
                "-webkit-transform": t,
                "-moz-transform": t,
                "-ms-transform": t,
                transform: t
            }
        }

        function ii(t, e, i) {
            switch (e) {
                case "up":
                    ki[i].up = t;
                    break;
                case "down":
                    ki[i].down = t;
                    break;
                case "left":
                    ki[i].left = t;
                    break;
                case "right":
                    ki[i].right = t;
                    break;
                case "all":
                    "m" == i ? rt(t) : at(t)
            }
        }

        function oi(e) {
            l(!1, "internal"), rt(!1), at(!1), yi.addClass(h), clearTimeout(Ii), clearTimeout($i), clearTimeout(Ci), clearTimeout(Ei), clearTimeout(Ai), et.off("scroll", zt).off("hashchange", re).off("resize", Te), it.off("click touchstart", A + " a").off("mouseenter", A + " li").off("mouseleave", A + " li").off("click touchstart", q).off("mouseover", a.normalScrollElements).off("mouseout", a.normalScrollElements), t(b).off("click touchstart", Y), clearTimeout(Ii), clearTimeout($i), e && ni()
        }

        function ni() {
            ti(0), yi.find("img[data-src], source[data-src], audio[data-src], iframe[data-src]").each(function() {
                Jt(t(this), "src")
            }), yi.find("img[data-srcset]").each(function() {
                Jt(t(this), "srcset")
            }), t(A + ", " + B + ", " + Y).remove(), t(b).css({
                height: "",
                "background-color": "",
                padding: ""
            }), t(P).css({
                width: ""
            }), yi.css({
                height: "",
                position: "",
                "-ms-touch-action": "",
                "touch-action": ""
            }), li.css({
                overflow: "",
                height: ""
            }), t("html").removeClass(p), di.removeClass(d), t.each(di.get(0).className.split(/\s+/), function(t, e) {
                0 === e.indexOf(u) && di.removeClass(e)
            }), t(b + ", " + P).each(function() {
                a.scrollOverflowHandler.remove(t(this)), t(this).removeClass(N + " " + f)
            }), Ce(yi), yi.find(C + ", " + F + ", " + _).each(function() {
                t(this).replaceWith(this.childNodes)
            }), yi.css({
                "-webkit-transition": "none",
                transition: "none"
            }), li.scrollTop(0);
            var e = [w, j, H];
            t.each(e, function(e, i) {
                t("." + i).removeClass(i)
            })
        }

        function si(t, e, i) {
            a[t] = e, "internal" !== i && (Li[t] = e)
        }

        function ri() {
            var e = ["fadingEffect", "continuousHorizontal", "scrollHorizontally", "interlockedSlides", "resetSliders", "responsiveSlides", "offsetSections", "dragAndMove", "scrollOverflowReset", "parallax"];
            return t("html").hasClass(p) ? void ai("error", "Fullpage.js can only be initialized once and you are doing it multiple times!") : (a.continuousVertical && (a.loopTop || a.loopBottom) && (a.continuousVertical = !1, ai("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), a.scrollBar && a.scrollOverflow && ai("warn", "Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox"), !a.continuousVertical || !a.scrollBar && a.autoScrolling || (a.continuousVertical = !1, ai("warn", "Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), t.each(e, function(t, e) {
                a[e] && ai("warn", "fullpage.js extensions require jquery.fullpage.extensions.min.js file instead of the usual jquery.fullpage.js. Requested: " + e)
            }), void t.each(a.anchors, function(e, i) {
                var o = it.find("[name]").filter(function() {
                        return t(this).attr("name") && t(this).attr("name").toLowerCase() == i.toLowerCase()
                    }),
                    n = it.find("[id]").filter(function() {
                        return t(this).attr("id") && t(this).attr("id").toLowerCase() == i.toLowerCase()
                    });
                (n.length || o.length) && (ai("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE)."), n.length && ai("error", '"' + i + '" is is being used by another element `id` property'), o.length && ai("error", '"' + i + '" is is being used by another element `name` property'))
            }))
        }

        function ai(t, e) {
            console && console[t] && console[t]("fullPage: " + e)
        }
        if (t("html").hasClass(p)) return void ri();
        var li = t("html, body"),
            di = t("body"),
            ci = t.fn.fullpage;
        a = t.extend({
            menu: !1,
            anchors: [],
            lockAnchors: !1,
            navigation: !1,
            navigationPosition: "right",
            navigationTooltips: [],
            showActiveTooltip: !1,
            slidesNavigation: !1,
            slidesNavPosition: "bottom",
            scrollBar: !1,
            hybrid: !1,
            css3: !0,
            scrollingSpeed: 700,
            autoScrolling: !0,
            fitToSection: !0,
            fitToSectionDelay: 1e3,
            easing: "easeInOutCubic",
            easingcss3: "ease",
            loopBottom: !1,
            loopTop: !1,
            loopHorizontal: !0,
            continuousVertical: !1,
            continuousHorizontal: !1,
            scrollHorizontally: !1,
            interlockedSlides: !1,
            dragAndMove: !1,
            offsetSections: !1,
            resetSliders: !1,
            fadingEffect: !1,
            normalScrollElements: null,
            scrollOverflow: !1,
            scrollOverflowReset: !1,
            scrollOverflowHandler: nt,
            scrollOverflowOptions: null,
            touchSensitivity: 5,
            normalScrollElementTouchThreshold: 5,
            bigSectionsDestination: null,
            keyboardScrolling: !0,
            animateAnchor: !0,
            recordHistory: !0,
            controlArrows: !0,
            controlArrowColor: "#fff",
            verticalCentered: !0,
            sectionsColor: [],
            paddingTop: 0,
            paddingBottom: 0,
            fixedElements: null,
            responsive: 0,
            responsiveWidth: 0,
            responsiveHeight: 0,
            responsiveSlides: !1,
            parallax: !1,
            parallaxOptions: {
                type: "reveal",
                percentage: 62,
                property: "translate"
            },
            sectionSelector: y,
            slideSelector: L,
            afterLoad: null,
            onLeave: null,
            afterRender: null,
            afterResize: null,
            afterReBuild: null,
            afterSlideLoad: null,
            onSlideLeave: null,
            afterResponsive: null,
            lazyLoading: !0
        }, a);
        var hi, pi, ui, fi, gi = !1,
            mi = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
            vi = "ontouchstart" in e || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints,
            yi = t(this),
            wi = et.height(),
            bi = !1,
            Si = !0,
            Ti = !0,
            xi = [],
            ki = {};
        ki.m = {
            up: !0,
            down: !0,
            left: !0,
            right: !0
        }, ki.k = t.extend(!0, {}, ki.m);
        var Ci, $i, Ii, Ei, Ai, Oi, Ri = Ke(),
            zi = {
                touchmove: "ontouchmove" in e ? "touchmove" : Ri.move,
                touchstart: "ontouchstart" in e ? "touchstart" : Ri.down
            },
            Li = t.extend(!0, {}, a);
        ri(), ot.click = vi, ot = t.extend(ot, a.scrollOverflowOptions), t.extend(t.easing, {
            easeInOutCubic: function(t, e, i, o, n) {
                return (e /= n / 2) < 1 ? o / 2 * e * e * e + i : o / 2 * ((e -= 2) * e * e + 2) + i
            }
        }), t(this).length && (ci.setAutoScrolling = l, ci.setRecordHistory = U, ci.setScrollingSpeed = X, ci.setFitToSection = K, ci.setLockAnchors = Z, ci.setMouseWheelScrolling = st, ci.setAllowScrolling = rt, ci.setKeyboardScrolling = at, ci.moveSectionUp = lt, ci.moveSectionDown = dt, ci.silentMoveTo = ct, ci.moveTo = ht, ci.moveSlideRight = pt, ci.moveSlideLeft = ut, ci.fitToSection = Lt, ci.reBuild = ft, ci.setResponsive = gt, ci.destroy = oi, mt(), vt());
        var ji = !1,
            Pi = 0,
            Mi = 0,
            Di = 0,
            _i = 0,
            Hi = 0,
            Fi = (new Date).getTime(),
            Ni = 0,
            Wi = 0,
            Bi = wi
    }, "undefined" != typeof IScroll && (IScroll.prototype.wheelOn = function() {
        this.wrapper.addEventListener("wheel", this), this.wrapper.addEventListener("mousewheel", this), this.wrapper.addEventListener("DOMMouseScroll", this)
    }, IScroll.prototype.wheelOff = function() {
        this.wrapper.removeEventListener("wheel", this), this.wrapper.removeEventListener("mousewheel", this), this.wrapper.removeEventListener("DOMMouseScroll", this)
    });
    var nt = {
        refreshId: null,
        iScrollInstances: [],
        toggleWheel: function(e) {
            var i = t(S).find(l);
            i.each(function() {
                var i = t(this).data("iscrollInstance");
                "undefined" != typeof i && i && (e ? i.wheelOn() : i.wheelOff())
            })
        },
        onLeave: function() {
            nt.toggleWheel(!1)
        },
        beforeLeave: function() {
            nt.onLeave()
        },
        afterLoad: function() {
            nt.toggleWheel(!0)
        },
        create: function(e, i) {
            var o = e.find(l);
            o.height(i), o.each(function() {
                var e = t(this),
                    i = e.data("iscrollInstance");
                i && t.each(nt.iScrollInstances, function() {
                    t(this).destroy()
                }), i = new IScroll(e.get(0), ot), nt.iScrollInstances.push(i), i.wheelOff(), e.data("iscrollInstance", i)
            })
        },
        isScrolled: function(t, e) {
            var i = e.data("iscrollInstance");
            return !i || ("top" === t ? i.y >= 0 && !e.scrollTop() : "bottom" === t ? 0 - i.y + e.scrollTop() + 1 + e.innerHeight() >= e[0].scrollHeight : void 0)
        },
        scrollable: function(t) {
            return t.find(_).length ? t.find(M).find(l) : t.find(l)
        },
        scrollHeight: function(t) {
            return t.find(l).children().first().get(0).scrollHeight
        },
        remove: function(t) {
            var e = t.find(l);
            if (e.length) {
                var i = e.data("iscrollInstance");
                i.destroy(), e.data("iscrollInstance", null)
            }
            t.find(l).children().first().children().first().unwrap().unwrap()
        },
        update: function(e, i) {
            clearTimeout(nt.refreshId), nt.refreshId = setTimeout(function() {
                t.each(nt.iScrollInstances, function() {
                    t(this).get(0).refresh()
                })
            }, 150), e.find(l).css("height", i + "px").parent().css("height", i + "px")
        },
        wrapContent: function() {
            return '<div class="' + a + '"><div class="fp-scroller"></div></div>'
        }
    }
}), ! function(t) {
    function e() {
        return t("body").height() > t(window).height()
    }
    var i = function(e, i) {
        this.settings = i, this.checkSettings(), this.imgAnalyzerTimeout = null, this.entries = null, this.buildingRow = {
            entriesBuff: [],
            width: 0,
            height: 0,
            aspectRatio: 0
        }, this.lastFetchedEntry = null, this.lastAnalyzedIndex = -1, this.yield = {
            every: 2,
            flushed: 0
        }, this.border = i.border >= 0 ? i.border : i.margins, this.maxRowHeight = this.retrieveMaxRowHeight(), this.suffixRanges = this.retrieveSuffixRanges(), this.offY = this.border, this.rows = 0, this.spinner = {
            phase: 0,
            timeSlot: 150,
            $el: t('<div class="spinner"><span></span><span></span><span></span></div>'),
            intervalId: null
        }, this.checkWidthIntervalId = null, this.galleryWidth = e.width(), this.$gallery = e
    };
    i.prototype.getSuffix = function(t, e) {
        var i, o;
        for (i = t > e ? t : e, o = 0; o < this.suffixRanges.length; o++)
            if (i <= this.suffixRanges[o]) return this.settings.sizeRangeSuffixes[this.suffixRanges[o]];
        return this.settings.sizeRangeSuffixes[this.suffixRanges[o - 1]]
    }, i.prototype.removeSuffix = function(t, e) {
        return t.substring(0, t.length - e.length)
    }, i.prototype.endsWith = function(t, e) {
        return -1 !== t.indexOf(e, t.length - e.length)
    }, i.prototype.getUsedSuffix = function(t) {
        for (var e in this.settings.sizeRangeSuffixes)
            if (this.settings.sizeRangeSuffixes.hasOwnProperty(e)) {
                if (0 === this.settings.sizeRangeSuffixes[e].length) continue;
                if (this.endsWith(t, this.settings.sizeRangeSuffixes[e])) return this.settings.sizeRangeSuffixes[e]
            }
        return ""
    }, i.prototype.newSrc = function(t, e, i, o) {
        var n;
        if (this.settings.thumbnailPath) n = this.settings.thumbnailPath(t, e, i, o);
        else {
            var s = t.match(this.settings.extension),
                r = null !== s ? s[0] : "";
            n = t.replace(this.settings.extension, ""), n = this.removeSuffix(n, this.getUsedSuffix(n)), n += this.getSuffix(e, i) + r
        }
        return n
    }, i.prototype.showImg = function(t, e) {
        this.settings.cssAnimation ? (t.addClass("entry-visible"), e && e()) : (t.stop().fadeTo(this.settings.imagesAnimationDuration, 1, e), t.find("> img, > a > img").stop().fadeTo(this.settings.imagesAnimationDuration, 1, e))
    }, i.prototype.extractImgSrcFromImage = function(t) {
        var e = "undefined" != typeof t.data("safe-src") ? t.data("safe-src") : t.attr("src");
        return t.data("jg.originalSrc", e), e
    }, i.prototype.imgFromEntry = function(t) {
        var e = t.find("> img");
        return 0 === e.length && (e = t.find("> a > img")), 0 === e.length ? null : e
    }, i.prototype.captionFromEntry = function(t) {
        var e = t.find("> .caption");
        return 0 === e.length ? null : e
    }, i.prototype.displayEntry = function(e, i, o, n, s, r) {
        e.width(n), e.height(r), e.css("top", o), e.css("left", i);
        var a = this.imgFromEntry(e);
        if (null !== a) {
            a.css("width", n), a.css("height", s), a.css("margin-left", -n / 2), a.css("margin-top", -s / 2);
            var l = a.attr("src"),
                d = this.newSrc(l, n, s, a[0]);
            a.one("error", function() {
                a.attr("src", a.data("jg.originalSrc"))
            });
            var c = function() {
                l !== d && a.attr("src", d)
            };
            "skipped" === e.data("jg.loaded") ? this.onImageEvent(l, t.proxy(function() {
                this.showImg(e, c), e.data("jg.loaded", !0)
            }, this)) : this.showImg(e, c)
        } else this.showImg(e);
        this.displayEntryCaption(e)
    }, i.prototype.displayEntryCaption = function(e) {
        var i = this.imgFromEntry(e);
        if (null !== i && this.settings.captions) {
            var o = this.captionFromEntry(e);
            if (null === o) {
                var n = i.attr("alt");
                this.isValidCaption(n) || (n = e.attr("title")), this.isValidCaption(n) && (o = t('<div class="caption">' + n + "</div>"), e.append(o), e.data("jg.createdCaption", !0))
            }
            null !== o && (this.settings.cssAnimation || o.stop().fadeTo(0, this.settings.captionSettings.nonVisibleOpacity), this.addCaptionEventsHandlers(e))
        } else this.removeCaptionEventsHandlers(e)
    }, i.prototype.isValidCaption = function(t) {
        return "undefined" != typeof t && t.length > 0
    }, i.prototype.onEntryMouseEnterForCaption = function(e) {
        var i = this.captionFromEntry(t(e.currentTarget));
        this.settings.cssAnimation ? i.addClass("caption-visible").removeClass("caption-hidden") : i.stop().fadeTo(this.settings.captionSettings.animationDuration, this.settings.captionSettings.visibleOpacity)
    }, i.prototype.onEntryMouseLeaveForCaption = function(e) {
        var i = this.captionFromEntry(t(e.currentTarget));
        this.settings.cssAnimation ? i.removeClass("caption-visible").removeClass("caption-hidden") : i.stop().fadeTo(this.settings.captionSettings.animationDuration, this.settings.captionSettings.nonVisibleOpacity)
    }, i.prototype.addCaptionEventsHandlers = function(e) {
        var i = e.data("jg.captionMouseEvents");
        "undefined" == typeof i && (i = {
            mouseenter: t.proxy(this.onEntryMouseEnterForCaption, this),
            mouseleave: t.proxy(this.onEntryMouseLeaveForCaption, this)
        }, e.on("mouseenter", void 0, void 0, i.mouseenter), e.on("mouseleave", void 0, void 0, i.mouseleave), e.data("jg.captionMouseEvents", i))
    }, i.prototype.removeCaptionEventsHandlers = function(t) {
        var e = t.data("jg.captionMouseEvents");
        "undefined" != typeof e && (t.off("mouseenter", void 0, e.mouseenter), t.off("mouseleave", void 0, e.mouseleave), t.removeData("jg.captionMouseEvents"))
    }, i.prototype.prepareBuildingRow = function(t) {
        var e, i, o, n, s, r = !0,
            a = 0,
            l = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
            d = l / this.buildingRow.aspectRatio,
            c = this.settings.rowHeight,
            h = this.buildingRow.width / l > this.settings.justifyThreshold;
        if (t && "hide" === this.settings.lastRow && !h) {
            for (e = 0; e < this.buildingRow.entriesBuff.length; e++) i = this.buildingRow.entriesBuff[e], this.settings.cssAnimation ? i.removeClass("entry-visible") : (i.stop().fadeTo(0, .1), i.find("> img, > a > img").fadeTo(0, 0));
            return -1
        }
        for (t && !h && "justify" !== this.settings.lastRow && "hide" !== this.settings.lastRow && (r = !1, this.rows > 0 && (c = (this.offY - this.border - this.settings.margins * this.rows) / this.rows, r = c * this.buildingRow.aspectRatio / l > this.settings.justifyThreshold)), e = 0; e < this.buildingRow.entriesBuff.length; e++) i = this.buildingRow.entriesBuff[e], o = i.data("jg.width") / i.data("jg.height"), r ? (n = e === this.buildingRow.entriesBuff.length - 1 ? l : d * o, s = d) : (n = c * o, s = c), l -= Math.round(n), i.data("jg.jwidth", Math.round(n)), i.data("jg.jheight", Math.ceil(s)), (0 === e || a > s) && (a = s);
        return this.buildingRow.height = a, r
    }, i.prototype.clearBuildingRow = function() {
        this.buildingRow.entriesBuff = [], this.buildingRow.aspectRatio = 0, this.buildingRow.width = 0
    }, i.prototype.flushRow = function(t) {
        var e, i, o, n = this.settings,
            s = this.border;
        if (i = this.prepareBuildingRow(t), t && "hide" === n.lastRow && -1 === i) return void this.clearBuildingRow();
        if (this.maxRowHeight && (this.maxRowHeight.isPercentage && this.maxRowHeight.value * n.rowHeight < this.buildingRow.height ? this.buildingRow.height = this.maxRowHeight.value * n.rowHeight : this.maxRowHeight.value >= n.rowHeight && this.maxRowHeight.value < this.buildingRow.height && (this.buildingRow.height = this.maxRowHeight.value)), "center" === n.lastRow || "right" === n.lastRow) {
            var r = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * n.margins;
            for (o = 0; o < this.buildingRow.entriesBuff.length; o++) e = this.buildingRow.entriesBuff[o], r -= e.data("jg.jwidth");
            "center" === n.lastRow ? s += r / 2 : "right" === n.lastRow && (s += r)
        }
        for (o = 0; o < this.buildingRow.entriesBuff.length; o++) e = this.buildingRow.entriesBuff[o], this.displayEntry(e, s, this.offY, e.data("jg.jwidth"), e.data("jg.jheight"), this.buildingRow.height), s += e.data("jg.jwidth") + n.margins;
        this.galleryHeightToSet = this.offY + this.buildingRow.height + this.border, this.$gallery.height(this.galleryHeightToSet + this.getSpinnerHeight()), (!t || this.buildingRow.height <= n.rowHeight && i) && (this.offY += this.buildingRow.height + n.margins, this.rows += 1, this.clearBuildingRow(), this.$gallery.trigger("jg.rowflush"))
    };
    var o = !1;
    i.prototype.checkWidth = function() {
        this.checkWidthIntervalId = setInterval(t.proxy(function() {
            var t = parseFloat(this.$gallery.width());
            e() === o ? Math.abs(t - this.galleryWidth) > this.settings.refreshSensitivity && (this.galleryWidth = t, this.rewind(), this.startImgAnalyzer(!0)) : (o = e(), this.galleryWidth = t)
        }, this), this.settings.refreshTime)
    }, i.prototype.isSpinnerActive = function() {
        return null !== this.spinner.intervalId
    }, i.prototype.getSpinnerHeight = function() {
        return this.spinner.$el.innerHeight()
    }, i.prototype.stopLoadingSpinnerAnimation = function() {
        clearInterval(this.spinner.intervalId), this.spinner.intervalId = null, this.$gallery.height(this.$gallery.height() - this.getSpinnerHeight()), this.spinner.$el.detach()
    }, i.prototype.startLoadingSpinnerAnimation = function() {
        var t = this.spinner,
            e = t.$el.find("span");
        clearInterval(t.intervalId), this.$gallery.append(t.$el), this.$gallery.height(this.offY + this.buildingRow.height + this.getSpinnerHeight()), t.intervalId = setInterval(function() {
            t.phase < e.length ? e.eq(t.phase).fadeTo(t.timeSlot, 1) : e.eq(t.phase - e.length).fadeTo(t.timeSlot, 0), t.phase = (t.phase + 1) % (2 * e.length)
        }, t.timeSlot)
    }, i.prototype.rewind = function() {
        this.lastFetchedEntry = null, this.lastAnalyzedIndex = -1, this.offY = this.border, this.rows = 0, this.clearBuildingRow()
    }, i.prototype.updateEntries = function(e) {
        var i;
        return e && null != this.lastFetchedEntry ? i = t(this.lastFetchedEntry).nextAll(this.settings.selector).toArray() : (this.entries = [], i = this.$gallery.children(this.settings.selector).toArray()), i.length > 0 && (t.isFunction(this.settings.sort) ? i = this.sortArray(i) : this.settings.randomize && (i = this.shuffleArray(i)), this.lastFetchedEntry = i[i.length - 1], this.settings.filter ? i = this.filterArray(i) : this.resetFilters(i)), this.entries = this.entries.concat(i), !0
    }, i.prototype.insertToGallery = function(e) {
        var i = this;
        t.each(e, function() {
            t(this).appendTo(i.$gallery)
        })
    }, i.prototype.shuffleArray = function(t) {
        var e, i, o;
        for (e = t.length - 1; e > 0; e--) i = Math.floor(Math.random() * (e + 1)), o = t[e], t[e] = t[i], t[i] = o;
        return this.insertToGallery(t), t
    }, i.prototype.sortArray = function(t) {
        return t.sort(this.settings.sort), this.insertToGallery(t), t
    }, i.prototype.resetFilters = function(e) {
        for (var i = 0; i < e.length; i++) t(e[i]).removeClass("jg-filtered")
    }, i.prototype.filterArray = function(e) {
        var i = this.settings;
        if ("string" === t.type(i.filter)) return e.filter(function(e) {
            var o = t(e);
            return o.is(i.filter) ? (o.removeClass("jg-filtered"), !0) : (o.addClass("jg-filtered").removeClass("jg-visible"), !1)
        });
        if (t.isFunction(i.filter)) {
            for (var o = e.filter(i.filter), n = 0; n < e.length; n++) - 1 == o.indexOf(e[n]) ? t(e[n]).addClass("jg-filtered").removeClass("jg-visible") : t(e[n]).removeClass("jg-filtered");
            return o
        }
    }, i.prototype.destroy = function() {
        clearInterval(this.checkWidthIntervalId), t.each(this.entries, t.proxy(function(e, i) {
            var o = t(i);
            o.css("width", ""), o.css("height", ""), o.css("top", ""), o.css("left", ""), o.data("jg.loaded", void 0), o.removeClass("jg-entry");
            var n = this.imgFromEntry(o);
            n.css("width", ""), n.css("height", ""), n.css("margin-left", ""), n.css("margin-top", ""), n.attr("src", n.data("jg.originalSrc")), n.data("jg.originalSrc", void 0), this.removeCaptionEventsHandlers(o);
            var s = this.captionFromEntry(o);
            o.data("jg.createdCaption") ? (o.data("jg.createdCaption", void 0), null !== s && s.remove()) : null !== s && s.fadeTo(0, 1)
        }, this)), this.$gallery.css("height", ""), this.$gallery.removeClass("justified-gallery"), this.$gallery.data("jg.controller", void 0)
    }, i.prototype.analyzeImages = function(e) {
        for (var i = this.lastAnalyzedIndex + 1; i < this.entries.length; i++) {
            var o = t(this.entries[i]);
            if (o.data("jg.loaded") === !0 || "skipped" === o.data("jg.loaded")) {
                var n = this.galleryWidth - 2 * this.border - (this.buildingRow.entriesBuff.length - 1) * this.settings.margins,
                    s = o.data("jg.width") / o.data("jg.height");
                if (n / (this.buildingRow.aspectRatio + s) < this.settings.rowHeight && (this.flushRow(!1), ++this.yield.flushed >= this.yield.every)) return void this.startImgAnalyzer(e);
                this.buildingRow.entriesBuff.push(o), this.buildingRow.aspectRatio += s, this.buildingRow.width += s * this.settings.rowHeight, this.lastAnalyzedIndex = i
            } else if ("error" !== o.data("jg.loaded")) return
        }
        this.buildingRow.entriesBuff.length > 0 && this.flushRow(!0), this.isSpinnerActive() && this.stopLoadingSpinnerAnimation(), this.stopImgAnalyzerStarter(), this.$gallery.trigger(e ? "jg.resize" : "jg.complete"), this.$gallery.height(this.galleryHeightToSet)
    }, i.prototype.stopImgAnalyzerStarter = function() {
        this.yield.flushed = 0, null !== this.imgAnalyzerTimeout && clearTimeout(this.imgAnalyzerTimeout)
    }, i.prototype.startImgAnalyzer = function(t) {
        var e = this;
        this.stopImgAnalyzerStarter(), this.imgAnalyzerTimeout = setTimeout(function() {
            e.analyzeImages(t)
        }, .001)
    }, i.prototype.onImageEvent = function(e, i, o) {
        if (i || o) {
            var n = new Image,
                s = t(n);
            i && s.one("load", function() {
                s.off("load error"), i(n)
            }), o && s.one("error", function() {
                s.off("load error"), o(n)
            }), n.src = e
        }
    }, i.prototype.init = function() {
        var e = !1,
            i = !1,
            o = this;
        t.each(this.entries, function(n, s) {
            var r = t(s),
                a = o.imgFromEntry(r);
            if (r.addClass("jg-entry"), r.data("jg.loaded") !== !0 && "skipped" !== r.data("jg.loaded"))
                if (null !== o.settings.rel && r.attr("rel", o.settings.rel), null !== o.settings.target && r.attr("target", o.settings.target), null !== a) {
                    var l = o.extractImgSrcFromImage(a);
                    if (a.attr("src", l), o.settings.waitThumbnailsLoad === !1) {
                        var d = parseFloat(a.attr("width")),
                            c = parseFloat(a.attr("height"));
                        if (!isNaN(d) && !isNaN(c)) return r.data("jg.width", d), r.data("jg.height", c), r.data("jg.loaded", "skipped"), i = !0, o.startImgAnalyzer(!1), !0
                    }
                    r.data("jg.loaded", !1), e = !0, o.isSpinnerActive() || o.startLoadingSpinnerAnimation(), o.onImageEvent(l, function(t) {
                        r.data("jg.width", t.width), r.data("jg.height", t.height), r.data("jg.loaded", !0), o.startImgAnalyzer(!1)
                    }, function() {
                        r.data("jg.loaded", "error"), o.startImgAnalyzer(!1)
                    })
                } else r.data("jg.loaded", !0), r.data("jg.width", r.width() | parseFloat(r.css("width")) | 1), r.data("jg.height", r.height() | parseFloat(r.css("height")) | 1)
        }), e || i || this.startImgAnalyzer(!1), this.checkWidth()
    }, i.prototype.checkOrConvertNumber = function(e, i) {
        if ("string" === t.type(e[i]) && (e[i] = parseFloat(e[i])), "number" !== t.type(e[i])) throw i + " must be a number";
        if (isNaN(e[i])) throw "invalid number for " + i
    }, i.prototype.checkSizeRangesSuffixes = function() {
        if ("object" !== t.type(this.settings.sizeRangeSuffixes)) throw "sizeRangeSuffixes must be defined and must be an object";
        var e = [];
        for (var i in this.settings.sizeRangeSuffixes) this.settings.sizeRangeSuffixes.hasOwnProperty(i) && e.push(i);
        for (var o = {
                0: ""
            }, n = 0; n < e.length; n++)
            if ("string" === t.type(e[n])) try {
                var s = parseInt(e[n].replace(/^[a-z]+/, ""), 10);
                o[s] = this.settings.sizeRangeSuffixes[e[n]]
            } catch (t) {
                throw "sizeRangeSuffixes keys must contains correct numbers (" + t + ")"
            } else o[e[n]] = this.settings.sizeRangeSuffixes[e[n]];
        this.settings.sizeRangeSuffixes = o
    }, i.prototype.retrieveMaxRowHeight = function() {
        var e = {};
        if ("string" === t.type(this.settings.maxRowHeight)) this.settings.maxRowHeight.match(/^[0-9]+%$/) ? (e.value = parseFloat(this.settings.maxRowHeight.match(/^([0-9]+)%$/)[1]) / 100, e.isPercentage = !1) : (e.value = parseFloat(this.settings.maxRowHeight), e.isPercentage = !0);
        else {
            if ("number" !== t.type(this.settings.maxRowHeight)) {
                if (this.settings.maxRowHeight === !1 || null === this.settings.maxRowHeight || "undefined" == typeof this.settings.maxRowHeight) return null;
                throw "maxRowHeight must be a number or a percentage"
            }
            e.value = this.settings.maxRowHeight, e.isPercentage = !1
        }
        if (isNaN(e.value)) throw "invalid number for maxRowHeight";
        return e.isPercentage && e.value < 100 && (e.value = 100), e
    }, i.prototype.checkSettings = function() {
        this.checkSizeRangesSuffixes(), this.checkOrConvertNumber(this.settings, "rowHeight"), this.checkOrConvertNumber(this.settings, "margins"), this.checkOrConvertNumber(this.settings, "border");
        var e = ["justify", "nojustify", "left", "center", "right", "hide"];
        if (-1 === e.indexOf(this.settings.lastRow)) throw "lastRow must be one of: " + e.join(", ");
        if (this.checkOrConvertNumber(this.settings, "justifyThreshold"), this.settings.justifyThreshold < 0 || this.settings.justifyThreshold > 1) throw "justifyThreshold must be in the interval [0,1]";
        if ("boolean" !== t.type(this.settings.cssAnimation)) throw "cssAnimation must be a boolean";
        if ("boolean" !== t.type(this.settings.captions)) throw "captions must be a boolean";
        if (this.checkOrConvertNumber(this.settings.captionSettings, "animationDuration"), this.checkOrConvertNumber(this.settings.captionSettings, "visibleOpacity"), this.settings.captionSettings.visibleOpacity < 0 || this.settings.captionSettings.visibleOpacity > 1) throw "captionSettings.visibleOpacity must be in the interval [0, 1]";
        if (this.checkOrConvertNumber(this.settings.captionSettings, "nonVisibleOpacity"), this.settings.captionSettings.nonVisibleOpacity < 0 || this.settings.captionSettings.nonVisibleOpacity > 1) throw "captionSettings.nonVisibleOpacity must be in the interval [0, 1]";
        if (this.checkOrConvertNumber(this.settings, "imagesAnimationDuration"), this.checkOrConvertNumber(this.settings, "refreshTime"), this.checkOrConvertNumber(this.settings, "refreshSensitivity"), "boolean" !== t.type(this.settings.randomize)) throw "randomize must be a boolean";
        if ("string" !== t.type(this.settings.selector)) throw "selector must be a string";
        if (this.settings.sort !== !1 && !t.isFunction(this.settings.sort)) throw "sort must be false or a comparison function";
        if (this.settings.filter !== !1 && !t.isFunction(this.settings.filter) && "string" !== t.type(this.settings.filter)) throw "filter must be false, a string or a filter function"
    }, i.prototype.retrieveSuffixRanges = function() {
        var t = [];
        for (var e in this.settings.sizeRangeSuffixes) this.settings.sizeRangeSuffixes.hasOwnProperty(e) && t.push(parseInt(e, 10));
        return t.sort(function(t, e) {
            return t > e ? 1 : e > t ? -1 : 0
        }), t
    }, i.prototype.updateSettings = function(e) {
        this.settings = t.extend({}, this.settings, e), this.checkSettings(), this.border = this.settings.border >= 0 ? this.settings.border : this.settings.margins, this.maxRowHeight = this.retrieveMaxRowHeight(), this.suffixRanges = this.retrieveSuffixRanges()
    }, t.fn.justifiedGallery = function(e) {
        return this.each(function(o, n) {
            var s = t(n);
            s.addClass("justified-gallery");
            var r = s.data("jg.controller");
            if ("undefined" == typeof r) {
                if ("undefined" != typeof e && null !== e && "object" !== t.type(e)) {
                    if ("destroy" === e) return;
                    throw "The argument must be an object"
                }
                r = new i(s, t.extend({}, t.fn.justifiedGallery.defaults, e)), s.data("jg.controller", r)
            } else if ("norewind" === e);
            else {
                if ("destroy" === e) return void r.destroy();
                r.updateSettings(e), r.rewind()
            }
            r.updateEntries("norewind" === e) && r.init()
        })
    }, t.fn.justifiedGallery.defaults = {
        sizeRangeSuffixes: {},
        thumbnailPath: void 0,
        rowHeight: 120,
        maxRowHeight: !1,
        margins: 1,
        border: -1,
        lastRow: "nojustify",
        justifyThreshold: .9,
        waitThumbnailsLoad: !0,
        captions: !0,
        cssAnimation: !0,
        imagesAnimationDuration: 500,
        captionSettings: {
            animationDuration: 500,
            visibleOpacity: .7,
            nonVisibleOpacity: 0
        },
        rel: null,
        target: null,
        extension: /\.[^.\\\/]+$/,
        refreshTime: 200,
        refreshSensitivity: 0,
        randomize: !1,
        sort: !1,
        filter: !1,
        selector: "a, div:not(.spinner)"
    }
}(jQuery),
function(t, e) {
    "use strict";

    function i(t) {
        t = t || {};
        for (var e = 1; e < arguments.length; e++) {
            var i = arguments[e];
            if (i)
                for (var o in i) i.hasOwnProperty(o) && ("object" == typeof i[o] ? deepExtend(t[o], i[o]) : t[o] = i[o])
        }
        return t
    }

    function o(o, r) {
        function a() {
            if (k) {
                v = e.createElement("canvas"), v.className = "pg-canvas", v.style.display = "block", o.insertBefore(v, o.firstChild), y = v.getContext("2d"), l();
                for (var i = Math.round(v.width * v.height / r.density), n = 0; n < i; n++) {
                    var s = new u;
                    s.setStackPos(n), C.push(s)
                }
                t.addEventListener("resize", function() {
                    c()
                }, !1), e.addEventListener("mousemove", function(t) {
                    $ = t.pageX, I = t.pageY
                }, !1), A && !E && t.addEventListener("deviceorientation", function() {
                    R = Math.min(Math.max(-event.beta, -30), 30), O = Math.min(Math.max(-event.gamma, -30), 30)
                }, !0), d(), m("onInit")
            }
        }

        function l() {
            v.width = o.offsetWidth, v.height = o.offsetHeight, y.fillStyle = r.dotColor, y.strokeStyle = r.lineColor, y.lineWidth = r.lineWidth
        }

        function d() {
            if (k) {
                b = t.innerWidth, S = t.innerHeight, y.clearRect(0, 0, v.width, v.height);
                for (var e = 0; e < C.length; e++) C[e].updatePosition();
                for (var e = 0; e < C.length; e++) C[e].draw();
                z || (w = requestAnimationFrame(d))
            }
        }

        function c() {
            l();
            for (var t = o.offsetWidth, e = o.offsetHeight, i = C.length - 1; i >= 0; i--)(C[i].position.x > t || C[i].position.y > e) && C.splice(i, 1);
            var n = Math.round(v.width * v.height / r.density);
            if (n > C.length)
                for (; n > C.length;) {
                    var s = new u;
                    C.push(s)
                } else n < C.length && C.splice(n);
            for (i = C.length - 1; i >= 0; i--) C[i].setStackPos(i)
        }

        function h() {
            z = !0
        }

        function p() {
            z = !1, d()
        }

        function u() {
            switch (this.stackPos, this.active = !0, this.layer = Math.ceil(3 * Math.random()), this.parallaxOffsetX = 0, this.parallaxOffsetY = 0, this.position = {
                x: Math.ceil(Math.random() * v.width),
                y: Math.ceil(Math.random() * v.height)
            }, this.speed = {}, r.directionX) {
                case "left":
                    this.speed.x = +(-r.maxSpeedX + Math.random() * r.maxSpeedX - r.minSpeedX).toFixed(2);
                    break;
                case "right":
                    this.speed.x = +(Math.random() * r.maxSpeedX + r.minSpeedX).toFixed(2);
                    break;
                default:
                    this.speed.x = +(-r.maxSpeedX / 2 + Math.random() * r.maxSpeedX).toFixed(2), this.speed.x += this.speed.x > 0 ? r.minSpeedX : -r.minSpeedX
            }
            switch (r.directionY) {
                case "up":
                    this.speed.y = +(-r.maxSpeedY + Math.random() * r.maxSpeedY - r.minSpeedY).toFixed(2);
                    break;
                case "down":
                    this.speed.y = +(Math.random() * r.maxSpeedY + r.minSpeedY).toFixed(2);
                    break;
                default:
                    this.speed.y = +(-r.maxSpeedY / 2 + Math.random() * r.maxSpeedY).toFixed(2), this.speed.x += this.speed.y > 0 ? r.minSpeedY : -r.minSpeedY
            }
        }

        function f(t, e) {
            return e ? void(r[t] = e) : r[t]
        }

        function g() {
            console.log("destroy"), v.parentNode.removeChild(v), m("onDestroy"), s && s(o).removeData("plugin_" + n)
        }

        function m(t) {
            void 0 !== r[t] && r[t].call(o)
        }
        var v, y, w, b, S, T, x, k = !!e.createElement("canvas").getContext,
            C = [],
            $ = 0,
            I = 0,
            E = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),
            A = !!t.DeviceOrientationEvent,
            O = 0,
            R = 0,
            z = !1;
        return r = i({}, t[n].defaults, r), u.prototype.draw = function() {
            y.beginPath(), y.arc(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY, r.particleRadius / 2, 0, 2 * Math.PI, !0), y.closePath(), y.fill(), y.beginPath();
            for (var t = C.length - 1; t > this.stackPos; t--) {
                var e = C[t],
                    i = this.position.x - e.position.x,
                    o = this.position.y - e.position.y,
                    n = Math.sqrt(i * i + o * o).toFixed(2);
                n < r.proximity && (y.moveTo(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY), r.curvedLines ? y.quadraticCurveTo(Math.max(e.position.x, e.position.x), Math.min(e.position.y, e.position.y), e.position.x + e.parallaxOffsetX, e.position.y + e.parallaxOffsetY) : y.lineTo(e.position.x + e.parallaxOffsetX, e.position.y + e.parallaxOffsetY))
            }
            y.stroke(), y.closePath()
        }, u.prototype.updatePosition = function() {
            if (r.parallax) {
                if (A && !E) {
                    var t = (b - 0) / 60;
                    T = (O - -30) * t + 0;
                    var e = (S - 0) / 60;
                    x = (R - -30) * e + 0
                } else T = $, x = I;
                this.parallaxTargX = (T - b / 2) / (r.parallaxMultiplier * this.layer), this.parallaxOffsetX += (this.parallaxTargX - this.parallaxOffsetX) / 10, this.parallaxTargY = (x - S / 2) / (r.parallaxMultiplier * this.layer), this.parallaxOffsetY += (this.parallaxTargY - this.parallaxOffsetY) / 10
            }
            var i = o.offsetWidth,
                n = o.offsetHeight;
            switch (r.directionX) {
                case "left":
                    this.position.x + this.speed.x + this.parallaxOffsetX < 0 && (this.position.x = i - this.parallaxOffsetX);
                    break;
                case "right":
                    this.position.x + this.speed.x + this.parallaxOffsetX > i && (this.position.x = 0 - this.parallaxOffsetX);
                    break;
                default:
                    (this.position.x + this.speed.x + this.parallaxOffsetX > i || this.position.x + this.speed.x + this.parallaxOffsetX < 0) && (this.speed.x = -this.speed.x)
            }
            switch (r.directionY) {
                case "up":
                    this.position.y + this.speed.y + this.parallaxOffsetY < 0 && (this.position.y = n - this.parallaxOffsetY);
                    break;
                case "down":
                    this.position.y + this.speed.y + this.parallaxOffsetY > n && (this.position.y = 0 - this.parallaxOffsetY);
                    break;
                default:
                    (this.position.y + this.speed.y + this.parallaxOffsetY > n || this.position.y + this.speed.y + this.parallaxOffsetY < 0) && (this.speed.y = -this.speed.y)
            }
            this.position.x += this.speed.x, this.position.y += this.speed.y
        }, u.prototype.setStackPos = function(t) {
            this.stackPos = t
        }, a(), {
            option: f,
            destroy: g,
            start: p,
            pause: h
        }
    }
    var n = "particleground",
        s = t.jQuery;
    t[n] = function(t, e) {
        return new o(t, e)
    }, t[n].defaults = {
        minSpeedX: .1,
        maxSpeedX: .7,
        minSpeedY: .1,
        maxSpeedY: .7,
        directionX: "center",
        directionY: "center",
        density: 1e4,
        dotColor: "#666666",
        lineColor: "#666666",
        particleRadius: 7,
        lineWidth: 1,
        curvedLines: !1,
        proximity: 100,
        parallax: !0,
        parallaxMultiplier: 5,
        onInit: function() {},
        onDestroy: function() {}
    }, s && (s.fn[n] = function(t) {
        if ("string" == typeof arguments[0]) {
            var e, i = arguments[0],
                r = Array.prototype.slice.call(arguments, 1);
            return this.each(function() {
                s.data(this, "plugin_" + n) && "function" == typeof s.data(this, "plugin_" + n)[i] && (e = s.data(this, "plugin_" + n)[i].apply(this, r))
            }), void 0 !== e ? e : this
        }
        if ("object" == typeof t || !t) return this.each(function() {
            s.data(this, "plugin_" + n) || s.data(this, "plugin_" + n, new o(this, t))
        })
    })
}(window, document),
function() {
    for (var t = 0, e = ["ms", "moz", "webkit", "o"], i = 0; i < e.length && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[i] + "CancelAnimationFrame"] || window[e[i] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(e, i) {
        var o = (new Date).getTime(),
            n = Math.max(0, 16 - (o - t)),
            s = window.setTimeout(function() {
                e(o + n)
            }, n);
        return t = o + n, s
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
        clearTimeout(t)
    })
}(), ! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    "use strict";
    var e = window.Slick || {};
    e = function() {
        function e(e, o) {
            var n, s = this;
            s.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: t(e),
                appendDots: t(e),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function(e, i) {
                    return t('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, s.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, t.extend(s, s.initials), s.activeBreakpoint = null, s.animType = null, s.animProp = null, s.breakpoints = [], s.breakpointSettings = [], s.cssTransitions = !1, s.focussed = !1, s.interrupted = !1, s.hidden = "hidden", s.paused = !0, s.positionProp = null, s.respondTo = null, s.rowCount = 1, s.shouldClick = !0, s.$slider = t(e), s.$slidesCache = null, s.transformType = null, s.transitionType = null, s.visibilityChange = "visibilitychange", s.windowWidth = 0, s.windowTimer = null, n = t(e).data("slick") || {}, s.options = t.extend({}, s.defaults, o, n), s.currentSlide = s.options.initialSlide, s.originalSettings = s.options, "undefined" != typeof document.mozHidden ? (s.hidden = "mozHidden", s.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (s.hidden = "webkitHidden", s.visibilityChange = "webkitvisibilitychange"), s.autoPlay = t.proxy(s.autoPlay, s), s.autoPlayClear = t.proxy(s.autoPlayClear, s), s.autoPlayIterator = t.proxy(s.autoPlayIterator, s), s.changeSlide = t.proxy(s.changeSlide, s), s.clickHandler = t.proxy(s.clickHandler, s), s.selectHandler = t.proxy(s.selectHandler, s), s.setPosition = t.proxy(s.setPosition, s), s.swipeHandler = t.proxy(s.swipeHandler, s), s.dragHandler = t.proxy(s.dragHandler, s), s.keyHandler = t.proxy(s.keyHandler, s), s.instanceUid = i++, s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, s.registerBreakpoints(), s.init(!0)
        }
        var i = 0;
        return e
    }(), e.prototype.activateADA = function() {
        var t = this;
        t.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, e.prototype.addSlide = e.prototype.slickAdd = function(e, i, o) {
        var n = this;
        if ("boolean" == typeof i) o = i, i = null;
        else if (0 > i || i >= n.slideCount) return !1;
        n.unload(), "number" == typeof i ? 0 === i && 0 === n.$slides.length ? t(e).appendTo(n.$slideTrack) : o ? t(e).insertBefore(n.$slides.eq(i)) : t(e).insertAfter(n.$slides.eq(i)) : o === !0 ? t(e).prependTo(n.$slideTrack) : t(e).appendTo(n.$slideTrack), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slides.each(function(e, i) {
            t(i).attr("data-slick-index", e)
        }), n.$slidesCache = n.$slides, n.reinit()
    }, e.prototype.animateHeight = function() {
        var t = this;
        if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.animate({
                height: e
            }, t.options.speed)
        }
    }, e.prototype.animateSlide = function(e, i) {
        var o = {},
            n = this;
        n.animateHeight(), n.options.rtl === !0 && n.options.vertical === !1 && (e = -e), n.transformsEnabled === !1 ? n.options.vertical === !1 ? n.$slideTrack.animate({
            left: e
        }, n.options.speed, n.options.easing, i) : n.$slideTrack.animate({
            top: e
        }, n.options.speed, n.options.easing, i) : n.cssTransitions === !1 ? (n.options.rtl === !0 && (n.currentLeft = -n.currentLeft), t({
            animStart: n.currentLeft
        }).animate({
            animStart: e
        }, {
            duration: n.options.speed,
            easing: n.options.easing,
            step: function(t) {
                t = Math.ceil(t), n.options.vertical === !1 ? (o[n.animType] = "translate(" + t + "px, 0px)", n.$slideTrack.css(o)) : (o[n.animType] = "translate(0px," + t + "px)", n.$slideTrack.css(o))
            },
            complete: function() {
                i && i.call()
            }
        })) : (n.applyTransition(), e = Math.ceil(e), n.options.vertical === !1 ? o[n.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[n.animType] = "translate3d(0px," + e + "px, 0px)", n.$slideTrack.css(o), i && setTimeout(function() {
            n.disableTransition(), i.call()
        }, n.options.speed))
    }, e.prototype.getNavTarget = function() {
        var e = this,
            i = e.options.asNavFor;
        return i && null !== i && (i = t(i).not(e.$slider)), i
    }, e.prototype.asNavFor = function(e) {
        var i = this,
            o = i.getNavTarget();
        null !== o && "object" == typeof o && o.each(function() {
            var i = t(this).slick("getSlick");
            i.unslicked || i.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function(t) {
        var e = this,
            i = {};
        e.options.fade === !1 ? i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
    }, e.prototype.autoPlay = function() {
        var t = this;
        t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function() {
        var t = this;
        t.autoPlayTimer && clearInterval(t.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function() {
        var t = this,
            e = t.currentSlide + t.options.slidesToScroll;
        t.paused || t.interrupted || t.focussed || (t.options.infinite === !1 && (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : 0 === t.direction && (e = t.currentSlide - t.options.slidesToScroll, t.currentSlide - 1 === 0 && (t.direction = 1))), t.slideHandler(e))
    }, e.prototype.buildArrows = function() {
        var e = this;
        e.options.arrows === !0 && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, e.prototype.buildDots = function() {
        var e, i, o = this;
        if (o.options.dots === !0 && o.slideCount > o.options.slidesToShow) {
            for (o.$slider.addClass("slick-dotted"), i = t("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1) i.append(t("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = i.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, e.prototype.buildOut = function() {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, i) {
            t(i).attr("data-slick-index", e).data("originalStyling", t(i).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), (e.options.centerMode === !0 || e.options.swipeToSlide === !0) && (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.options.draggable === !0 && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function() {
        var t, e, i, o, n, s, r, a = this;
        if (o = document.createDocumentFragment(), s = a.$slider.children(), a.options.rows > 1) {
            for (r = a.options.slidesPerRow * a.options.rows, n = Math.ceil(s.length / r), t = 0; n > t; t++) {
                var l = document.createElement("div");
                for (e = 0; e < a.options.rows; e++) {
                    var d = document.createElement("div");
                    for (i = 0; i < a.options.slidesPerRow; i++) {
                        var c = t * r + (e * a.options.slidesPerRow + i);
                        s.get(c) && d.appendChild(s.get(c))
                    }
                    l.appendChild(d)
                }
                o.appendChild(l)
            }
            a.$slider.empty().append(o), a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, e.prototype.checkResponsive = function(e, i) {
        var o, n, s, r = this,
            a = !1,
            l = r.$slider.width(),
            d = window.innerWidth || t(window).width();
        if ("window" === r.respondTo ? s = d : "slider" === r.respondTo ? s = l : "min" === r.respondTo && (s = Math.min(d, l)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            n = null;
            for (o in r.breakpoints) r.breakpoints.hasOwnProperty(o) && (r.originalSettings.mobileFirst === !1 ? s < r.breakpoints[o] && (n = r.breakpoints[o]) : s > r.breakpoints[o] && (n = r.breakpoints[o]));
            null !== n ? null !== r.activeBreakpoint ? (n !== r.activeBreakpoint || i) && (r.activeBreakpoint = n, "unslick" === r.breakpointSettings[n] ? r.unslick(n) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[n]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), a = n) : (r.activeBreakpoint = n, "unslick" === r.breakpointSettings[n] ? r.unslick(n) : (r.options = t.extend({}, r.originalSettings, r.breakpointSettings[n]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), a = n) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e), a = n), e || a === !1 || r.$slider.trigger("breakpoint", [r, a])
        }
    }, e.prototype.changeSlide = function(e, i) {
        var o, n, s, r = this,
            a = t(e.currentTarget);
        switch (a.is("a") && e.preventDefault(), a.is("li") || (a = a.closest("li")), s = r.slideCount % r.options.slidesToScroll !== 0, o = s ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
            case "previous":
                n = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - n, !1, i);
                break;
            case "next":
                n = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + n, !1, i);
                break;
            case "index":
                var l = 0 === e.data.index ? 0 : e.data.index || a.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(l), !1, i), a.children().trigger("focus");
                break;
            default:
                return
        }
    }, e.prototype.checkNavigable = function(t) {
        var e, i, o = this;
        if (e = o.getNavigableIndexes(), i = 0, t > e[e.length - 1]) t = e[e.length - 1];
        else
            for (var n in e) {
                if (t < e[n]) {
                    t = i;
                    break
                }
                i = e[n]
            }
        return t
    }, e.prototype.cleanUpEvents = function() {
        var e = this;
        e.options.dots && null !== e.$dots && t("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", t.proxy(e.interrupt, e, !0)).off("mouseleave.slick", t.proxy(e.interrupt, e, !1)), e.$slider.off("focus.slick blur.slick"), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), t(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), e.options.accessibility === !0 && e.$list.off("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().off("click.slick", e.selectHandler), t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), t(window).off("resize.slick.slick-" + e.instanceUid, e.resize), t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpSlideEvents = function() {
        var e = this;
        e.$list.off("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", t.proxy(e.interrupt, e, !1))
    }, e.prototype.cleanUpRows = function() {
        var t, e = this;
        e.options.rows > 1 && (t = e.$slides.children().children(), t.removeAttr("style"), e.$slider.empty().append(t))
    }, e.prototype.clickHandler = function(t) {
        var e = this;
        e.shouldClick === !1 && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
    }, e.prototype.destroy = function(e) {
        var i = this;
        i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), t(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            t(this).attr("style", t(this).data("originalStyling"))
        }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.$slider.removeClass("slick-dotted"), i.unslicked = !0, e || i.$slider.trigger("destroy", [i])
    }, e.prototype.disableTransition = function(t) {
        var e = this,
            i = {};
        i[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
    }, e.prototype.fadeSlide = function(t, e) {
        var i = this;
        i.cssTransitions === !1 ? (i.$slides.eq(t).css({
            zIndex: i.options.zIndex
        }), i.$slides.eq(t).animate({
            opacity: 1
        }, i.options.speed, i.options.easing, e)) : (i.applyTransition(t), i.$slides.eq(t).css({
            opacity: 1,
            zIndex: i.options.zIndex
        }), e && setTimeout(function() {
            i.disableTransition(t), e.call()
        }, i.options.speed))
    }, e.prototype.fadeSlideOut = function(t) {
        var e = this;
        e.cssTransitions === !1 ? e.$slides.eq(t).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, e.prototype.filterSlides = e.prototype.slickFilter = function(t) {
        var e = this;
        null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.focusHandler = function() {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(i) {
            i.stopImmediatePropagation();
            var o = t(this);
            setTimeout(function() {
                e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay())
            }, 0)
        })
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
        var t = this;
        return t.currentSlide
    }, e.prototype.getDotCount = function() {
        var t = this,
            e = 0,
            i = 0,
            o = 0;
        if (t.options.infinite === !0)
            for (; e < t.slideCount;) ++o, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        else if (t.options.centerMode === !0) o = t.slideCount;
        else if (t.options.asNavFor)
            for (; e < t.slideCount;) ++o, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
        else o = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
        return o - 1
    }, e.prototype.getLeft = function(t) {
        var e, i, o, n = this,
            s = 0;
        return n.slideOffset = 0, i = n.$slides.first().outerHeight(!0), n.options.infinite === !0 ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = i * n.options.slidesToShow * -1), n.slideCount % n.options.slidesToScroll !== 0 && t + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (t > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (t - n.slideCount)) * n.slideWidth * -1, s = (n.options.slidesToShow - (t - n.slideCount)) * i * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, s = n.slideCount % n.options.slidesToScroll * i * -1))) : t + n.options.slidesToShow > n.slideCount && (n.slideOffset = (t + n.options.slidesToShow - n.slideCount) * n.slideWidth, s = (t + n.options.slidesToShow - n.slideCount) * i), n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0, s = 0), n.options.centerMode === !0 && n.options.infinite === !0 ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : n.options.centerMode === !0 && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)), e = n.options.vertical === !1 ? t * n.slideWidth * -1 + n.slideOffset : t * i * -1 + s, n.options.variableWidth === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(t) : n.$slideTrack.children(".slick-slide").eq(t + n.options.slidesToShow), e = n.options.rtl === !0 ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, n.options.centerMode === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(t) : n.$slideTrack.children(".slick-slide").eq(t + n.options.slidesToShow + 1), e = n.options.rtl === !0 ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function(t) {
        var e = this;
        return e.options[t]
    }, e.prototype.getNavigableIndexes = function() {
        var t, e = this,
            i = 0,
            o = 0,
            n = [];
        for (e.options.infinite === !1 ? t = e.slideCount : (i = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, t = 2 * e.slideCount); t > i;) n.push(i), i = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return n
    }, e.prototype.getSlick = function() {
        return this
    }, e.prototype.getSlideCount = function() {
        var e, i, o, n = this;
        return o = n.options.centerMode === !0 ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0, n.options.swipeToSlide === !0 ? (n.$slideTrack.find(".slick-slide").each(function(e, s) {
            return s.offsetLeft - o + t(s).outerWidth() / 2 > -1 * n.swipeLeft ? (i = s, !1) : void 0
        }), e = Math.abs(t(i).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
    }, e.prototype.goTo = e.prototype.slickGoTo = function(t, e) {
        var i = this;
        i.changeSlide({
            data: {
                message: "index",
                index: parseInt(t)
            }
        }, e)
    }, e.prototype.init = function(e) {
        var i = this;
        t(i.$slider).hasClass("slick-initialized") || (t(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()), e && i.$slider.trigger("init", [i]), i.options.accessibility === !0 && i.initADA(), i.options.autoplay && (i.paused = !1, i.autoPlay())
    }, e.prototype.initADA = function() {
        var e = this;
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), e.$slideTrack.attr("role", "listbox"), e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(i) {
            t(this).attr({
                role: "option",
                "aria-describedby": "slick-slide" + e.instanceUid + i
            })
        }), null !== e.$dots && e.$dots.attr("role", "tablist").find("li").each(function(i) {
            t(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + e.instanceUid + i,
                id: "slick-slide" + e.instanceUid + i
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), e.activateADA()
    }, e.prototype.initArrowEvents = function() {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, t.changeSlide))
    }, e.prototype.initDotEvents = function() {
        var e = this;
        e.options.dots === !0 && e.slideCount > e.options.slidesToShow && t("li", e.$dots).on("click.slick", {
            message: "index"
        }, e.changeSlide), e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.interrupt, e, !0)).on("mouseleave.slick", t.proxy(e.interrupt, e, !1))
    }, e.prototype.initSlideEvents = function() {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", t.proxy(e.interrupt, e, !1)))
    }, e.prototype.initializeEvents = function() {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), t(document).on(e.visibilityChange, t.proxy(e.visibility, e)), e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().on("click.slick", e.selectHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)), t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)), t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.initUI = function() {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.show()
    }, e.prototype.keyHandler = function(t) {
        var e = this;
        t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && e.options.accessibility === !0 ? e.changeSlide({
            data: {
                message: e.options.rtl === !0 ? "next" : "previous"
            }
        }) : 39 === t.keyCode && e.options.accessibility === !0 && e.changeSlide({
            data: {
                message: e.options.rtl === !0 ? "previous" : "next"
            }
        }))
    }, e.prototype.lazyLoad = function() {
        function e(e) {
            t("img[data-lazy]", e).each(function() {
                var e = t(this),
                    i = t(this).attr("data-lazy"),
                    o = document.createElement("img");
                o.onload = function() {
                    e.animate({
                        opacity: 0
                    }, 100, function() {
                        e.attr("src", i).animate({
                            opacity: 1
                        }, 200, function() {
                            e.removeAttr("data-lazy").removeClass("slick-loading")
                        }), r.$slider.trigger("lazyLoaded", [r, e, i])
                    })
                }, o.onerror = function() {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, e, i])
                }, o.src = i
            })
        }
        var i, o, n, s, r = this;
        r.options.centerMode === !0 ? r.options.infinite === !0 ? (n = r.currentSlide + (r.options.slidesToShow / 2 + 1), s = n + r.options.slidesToShow + 2) : (n = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), s = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (n = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, s = Math.ceil(n + r.options.slidesToShow), r.options.fade === !0 && (n > 0 && n--, s <= r.slideCount && s++)), i = r.$slider.find(".slick-slide").slice(n, s), e(i), r.slideCount <= r.options.slidesToShow ? (o = r.$slider.find(".slick-slide"), e(o)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (o = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), e(o)) : 0 === r.currentSlide && (o = r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow), e(o))
    }, e.prototype.loadSlider = function() {
        var t = this;
        t.setPosition(), t.$slideTrack.css({
            opacity: 1
        }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function() {
        var t = this;
        t.changeSlide({
            data: {
                message: "next"
            }
        })
    }, e.prototype.orientationChange = function() {
        var t = this;
        t.checkResponsive(), t.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function() {
        var t = this;
        t.autoPlayClear(), t.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function() {
        var t = this;
        t.autoPlay(), t.options.autoplay = !0, t.paused = !1, t.focussed = !1, t.interrupted = !1
    }, e.prototype.postSlide = function(t) {
        var e = this;
        e.unslicked || (e.$slider.trigger("afterChange", [e, t]), e.animating = !1, e.setPosition(), e.swipeLeft = null, e.options.autoplay && e.autoPlay(), e.options.accessibility === !0 && e.initADA())
    }, e.prototype.prev = e.prototype.slickPrev = function() {
        var t = this;
        t.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, e.prototype.preventDefault = function(t) {
        t.preventDefault()
    }, e.prototype.progressiveLazyLoad = function(e) {
        e = e || 1;
        var i, o, n, s = this,
            r = t("img[data-lazy]", s.$slider);
        r.length ? (i = r.first(), o = i.attr("data-lazy"), n = document.createElement("img"), n.onload = function() {
            i.attr("src", o).removeAttr("data-lazy").removeClass("slick-loading"), s.options.adaptiveHeight === !0 && s.setPosition(), s.$slider.trigger("lazyLoaded", [s, i, o]), s.progressiveLazyLoad()
        }, n.onerror = function() {
            3 > e ? setTimeout(function() {
                s.progressiveLazyLoad(e + 1)
            }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, i, o]), s.progressiveLazyLoad())
        }, n.src = o) : s.$slider.trigger("allImagesLoaded", [s])
    }, e.prototype.refresh = function(e) {
        var i, o, n = this;
        o = n.slideCount - n.options.slidesToShow, !n.options.infinite && n.currentSlide > o && (n.currentSlide = o), n.slideCount <= n.options.slidesToShow && (n.currentSlide = 0), i = n.currentSlide, n.destroy(!0), t.extend(n, n.initials, {
            currentSlide: i
        }), n.init(), e || n.changeSlide({
            data: {
                message: "index",
                index: i
            }
        }, !1)
    }, e.prototype.registerBreakpoints = function() {
        var e, i, o, n = this,
            s = n.options.responsive || null;
        if ("array" === t.type(s) && s.length) {
            n.respondTo = n.options.respondTo || "window";
            for (e in s)
                if (o = n.breakpoints.length - 1, i = s[e].breakpoint, s.hasOwnProperty(e)) {
                    for (; o >= 0;) n.breakpoints[o] && n.breakpoints[o] === i && n.breakpoints.splice(o, 1), o--;
                    n.breakpoints.push(i), n.breakpointSettings[i] = s[e].settings
                }
            n.breakpoints.sort(function(t, e) {
                return n.options.mobileFirst ? t - e : e - t
            })
        }
    }, e.prototype.reinit = function() {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), e.options.focusOnSelect === !0 && t(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, e.prototype.resize = function() {
        var e = this;
        t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
            e.windowWidth = t(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function(t, e, i) {
        var o = this;
        return "boolean" == typeof t ? (e = t, t = e === !0 ? 0 : o.slideCount - 1) : t = e === !0 ? --t : t, !(o.slideCount < 1 || 0 > t || t > o.slideCount - 1) && (o.unload(), i === !0 ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(t).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, void o.reinit())
    }, e.prototype.setCSS = function(t) {
        var e, i, o = this,
            n = {};
        o.options.rtl === !0 && (t = -t), e = "left" == o.positionProp ? Math.ceil(t) + "px" : "0px", i = "top" == o.positionProp ? Math.ceil(t) + "px" : "0px", n[o.positionProp] = t, o.transformsEnabled === !1 ? o.$slideTrack.css(n) : (n = {}, o.cssTransitions === !1 ? (n[o.animType] = "translate(" + e + ", " + i + ")", o.$slideTrack.css(n)) : (n[o.animType] = "translate3d(" + e + ", " + i + ", 0px)", o.$slideTrack.css(n)))
    }, e.prototype.setDimensions = function() {
        var t = this;
        t.options.vertical === !1 ? t.options.centerMode === !0 && t.$list.css({
            padding: "0px " + t.options.centerPadding
        }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), t.options.centerMode === !0 && t.$list.css({
            padding: t.options.centerPadding + " 0px"
        })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), t.options.vertical === !1 && t.options.variableWidth === !1 ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : t.options.variableWidth === !0 ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
        var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
        t.options.variableWidth === !1 && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
    }, e.prototype.setFade = function() {
        var e, i = this;
        i.$slides.each(function(o, n) {
            e = i.slideWidth * o * -1, i.options.rtl === !0 ? t(n).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            }) : t(n).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0
            })
        }), i.$slides.eq(i.currentSlide).css({
            zIndex: i.options.zIndex - 1,
            opacity: 1
        })
    }, e.prototype.setHeight = function() {
        var t = this;
        if (1 === t.options.slidesToShow && t.options.adaptiveHeight === !0 && t.options.vertical === !1) {
            var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
            t.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function() {
        var e, i, o, n, s, r = this,
            a = !1;
        if ("object" === t.type(arguments[0]) ? (o = arguments[0], a = arguments[1], s = "multiple") : "string" === t.type(arguments[0]) && (o = arguments[0], n = arguments[1], a = arguments[2], "responsive" === arguments[0] && "array" === t.type(arguments[1]) ? s = "responsive" : "undefined" != typeof arguments[1] && (s = "single")), "single" === s) r.options[o] = n;
        else if ("multiple" === s) t.each(o, function(t, e) {
            r.options[t] = e
        });
        else if ("responsive" === s)
            for (i in n)
                if ("array" !== t.type(r.options.responsive)) r.options.responsive = [n[i]];
                else {
                    for (e = r.options.responsive.length - 1; e >= 0;) r.options.responsive[e].breakpoint === n[i].breakpoint && r.options.responsive.splice(e, 1), e--;
                    r.options.responsive.push(n[i])
                }
        a && (r.unload(), r.reinit())
    }, e.prototype.setPosition = function() {
        var t = this;
        t.setDimensions(), t.setHeight(), t.options.fade === !1 ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
    }, e.prototype.setProps = function() {
        var t = this,
            e = document.body.style;
        t.positionProp = t.options.vertical === !0 ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), (void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.msTransition) && t.options.useCSS === !0 && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform",
            t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && t.animType !== !1 && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && null !== t.animType && t.animType !== !1
    }, e.prototype.setSlideClasses = function(t) {
        var e, i, o, n, s = this;
        i = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), s.$slides.eq(t).addClass("slick-current"), s.options.centerMode === !0 ? (e = Math.floor(s.options.slidesToShow / 2), s.options.infinite === !0 && (t >= e && t <= s.slideCount - 1 - e ? s.$slides.slice(t - e, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = s.options.slidesToShow + t, i.slice(o - e + 1, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? i.eq(i.length - 1 - s.options.slidesToShow).addClass("slick-center") : t === s.slideCount - 1 && i.eq(s.options.slidesToShow).addClass("slick-center")), s.$slides.eq(t).addClass("slick-center")) : t >= 0 && t <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(t, t + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= s.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (n = s.slideCount % s.options.slidesToShow, o = s.options.infinite === !0 ? s.options.slidesToShow + t : t, s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - t < s.options.slidesToShow ? i.slice(o - (s.options.slidesToShow - n), o + n).addClass("slick-active").attr("aria-hidden", "false") : i.slice(o, o + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === s.options.lazyLoad && s.lazyLoad()
    }, e.prototype.setupInfinite = function() {
        var e, i, o, n = this;
        if (n.options.fade === !0 && (n.options.centerMode = !1), n.options.infinite === !0 && n.options.fade === !1 && (i = null, n.slideCount > n.options.slidesToShow)) {
            for (o = n.options.centerMode === !0 ? n.options.slidesToShow + 1 : n.options.slidesToShow, e = n.slideCount; e > n.slideCount - o; e -= 1) i = e - 1, t(n.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - n.slideCount).prependTo(n.$slideTrack).addClass("slick-cloned");
            for (e = 0; o > e; e += 1) i = e, t(n.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + n.slideCount).appendTo(n.$slideTrack).addClass("slick-cloned");
            n.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                t(this).attr("id", "")
            })
        }
    }, e.prototype.interrupt = function(t) {
        var e = this;
        t || e.autoPlay(), e.interrupted = t
    }, e.prototype.selectHandler = function(e) {
        var i = this,
            o = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"),
            n = parseInt(o.attr("data-slick-index"));
        return n || (n = 0), i.slideCount <= i.options.slidesToShow ? (i.setSlideClasses(n), void i.asNavFor(n)) : void i.slideHandler(n)
    }, e.prototype.slideHandler = function(t, e, i) {
        var o, n, s, r, a, l = null,
            d = this;
        return e = e || !1, d.animating === !0 && d.options.waitForAnimate === !0 || d.options.fade === !0 && d.currentSlide === t || d.slideCount <= d.options.slidesToShow ? void 0 : (e === !1 && d.asNavFor(t), o = t, l = d.getLeft(o), r = d.getLeft(d.currentSlide), d.currentLeft = null === d.swipeLeft ? r : d.swipeLeft, d.options.infinite === !1 && d.options.centerMode === !1 && (0 > t || t > d.getDotCount() * d.options.slidesToScroll) ? void(d.options.fade === !1 && (o = d.currentSlide, i !== !0 ? d.animateSlide(r, function() {
            d.postSlide(o)
        }) : d.postSlide(o))) : d.options.infinite === !1 && d.options.centerMode === !0 && (0 > t || t > d.slideCount - d.options.slidesToScroll) ? void(d.options.fade === !1 && (o = d.currentSlide, i !== !0 ? d.animateSlide(r, function() {
            d.postSlide(o)
        }) : d.postSlide(o))) : (d.options.autoplay && clearInterval(d.autoPlayTimer), n = 0 > o ? d.slideCount % d.options.slidesToScroll !== 0 ? d.slideCount - d.slideCount % d.options.slidesToScroll : d.slideCount + o : o >= d.slideCount ? d.slideCount % d.options.slidesToScroll !== 0 ? 0 : o - d.slideCount : o, d.animating = !0, d.$slider.trigger("beforeChange", [d, d.currentSlide, n]), s = d.currentSlide, d.currentSlide = n, d.setSlideClasses(d.currentSlide), d.options.asNavFor && (a = d.getNavTarget(), a = a.slick("getSlick"), a.slideCount <= a.options.slidesToShow && a.setSlideClasses(d.currentSlide)), d.updateDots(), d.updateArrows(), d.options.fade === !0 ? (i !== !0 ? (d.fadeSlideOut(s), d.fadeSlide(n, function() {
            d.postSlide(n)
        })) : d.postSlide(n), void d.animateHeight()) : void(i !== !0 ? d.animateSlide(l, function() {
            d.postSlide(n)
        }) : d.postSlide(n))))
    }, e.prototype.startLoad = function() {
        var t = this;
        t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), t.options.dots === !0 && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function() {
        var t, e, i, o, n = this;
        return t = n.touchObject.startX - n.touchObject.curX, e = n.touchObject.startY - n.touchObject.curY, i = Math.atan2(e, t), o = Math.round(180 * i / Math.PI), 0 > o && (o = 360 - Math.abs(o)), 45 >= o && o >= 0 ? n.options.rtl === !1 ? "left" : "right" : 360 >= o && o >= 315 ? n.options.rtl === !1 ? "left" : "right" : o >= 135 && 225 >= o ? n.options.rtl === !1 ? "right" : "left" : n.options.verticalSwiping === !0 ? o >= 35 && 135 >= o ? "down" : "up" : "vertical"
    }, e.prototype.swipeEnd = function(t) {
        var e, i, o = this;
        if (o.dragging = !1, o.interrupted = !1, o.shouldClick = !(o.touchObject.swipeLength > 10), void 0 === o.touchObject.curX) return !1;
        if (o.touchObject.edgeHit === !0 && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (i = o.swipeDirection()) {
                case "left":
                case "down":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != i && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, i]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, e.prototype.swipeHandler = function(t) {
        var e = this;
        if (!(e.options.swipe === !1 || "ontouchend" in document && e.options.swipe === !1 || e.options.draggable === !1 && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, e.options.verticalSwiping === !0 && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
            case "start":
                e.swipeStart(t);
                break;
            case "move":
                e.swipeMove(t);
                break;
            case "end":
                e.swipeEnd(t)
        }
    }, e.prototype.swipeMove = function(t) {
        var e, i, o, n, s, r = this;
        return s = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !(!r.dragging || s && 1 !== s.length) && (e = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== s ? s[0].pageX : t.clientX, r.touchObject.curY = void 0 !== s ? s[0].pageY : t.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), r.options.verticalSwiping === !0 && (r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2)))), i = r.swipeDirection(), "vertical" !== i ? (void 0 !== t.originalEvent && r.touchObject.swipeLength > 4 && t.preventDefault(), n = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), r.options.verticalSwiping === !0 && (n = r.touchObject.curY > r.touchObject.startY ? 1 : -1), o = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, r.options.infinite === !1 && (0 === r.currentSlide && "right" === i || r.currentSlide >= r.getDotCount() && "left" === i) && (o = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), r.options.vertical === !1 ? r.swipeLeft = e + o * n : r.swipeLeft = e + o * (r.$list.height() / r.listWidth) * n, r.options.verticalSwiping === !0 && (r.swipeLeft = e + o * n), r.options.fade !== !0 && r.options.touchMove !== !1 && (r.animating === !0 ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft))) : void 0)
    }, e.prototype.swipeStart = function(t) {
        var e, i = this;
        return i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow ? (i.touchObject = {}, !1) : (void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, void(i.dragging = !0))
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
        var t = this;
        null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
    }, e.prototype.unload = function() {
        var e = this;
        t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function(t) {
        var e = this;
        e.$slider.trigger("unslick", [e, t]), e.destroy()
    }, e.prototype.updateArrows = function() {
        var t, e = this;
        t = Math.floor(e.options.slidesToShow / 2), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function() {
        var t = this;
        null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, e.prototype.visibility = function() {
        var t = this;
        t.options.autoplay && (document[t.hidden] ? t.interrupted = !0 : t.interrupted = !1)
    }, t.fn.slick = function() {
        var t, i, o = this,
            n = arguments[0],
            s = Array.prototype.slice.call(arguments, 1),
            r = o.length;
        for (t = 0; r > t; t++)
            if ("object" == typeof n || "undefined" == typeof n ? o[t].slick = new e(o[t], n) : i = o[t].slick[n].apply(o[t].slick, s), "undefined" != typeof i) return i;
        return o
    }
}), ! function(t) {
    "use strict";
    var e = function(e, i) {
        this.el = t(e), this.options = t.extend({}, t.fn.typed.defaults, i), this.isInput = this.el.is("input"), this.attr = this.options.attr, this.showCursor = !this.isInput && this.options.showCursor, this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text(), this.contentType = this.options.contentType, this.typeSpeed = this.options.typeSpeed, this.startDelay = this.options.startDelay, this.backSpeed = this.options.backSpeed, this.backDelay = this.options.backDelay, this.stringsElement = this.options.stringsElement, this.strings = this.options.strings, this.strPos = 0, this.arrayPos = 0, this.stopNum = 0, this.loop = this.options.loop, this.loopCount = this.options.loopCount, this.curLoop = 0, this.stop = !1, this.cursorChar = this.options.cursorChar, this.shuffle = this.options.shuffle, this.sequence = [], this.build()
    };
    e.prototype = {
        constructor: e,
        init: function() {
            var t = this;
            t.timeout = setTimeout(function() {
                for (var e = 0; e < t.strings.length; ++e) t.sequence[e] = e;
                t.shuffle && (t.sequence = t.shuffleArray(t.sequence)), t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos)
            }, t.startDelay)
        },
        build: function() {
            var e = this;
            if (this.showCursor === !0 && (this.cursor = t('<span class="typed-cursor">' + this.cursorChar + "</span>"), this.el.after(this.cursor)), this.stringsElement) {
                this.strings = [], this.stringsElement.hide(), console.log(this.stringsElement.children());
                var i = this.stringsElement.children();
                t.each(i, function(i, o) {
                    e.strings.push(t(o).html())
                })
            }
            this.init()
        },
        typewrite: function(t, e) {
            if (this.stop !== !0) {
                var i = Math.round(70 * Math.random()) + this.typeSpeed,
                    o = this;
                o.timeout = setTimeout(function() {
                    var i = 0,
                        n = t.substr(e);
                    if ("^" === n.charAt(0)) {
                        var s = 1;
                        /^\^\d+/.test(n) && (n = /\d+/.exec(n)[0], s += n.length, i = parseInt(n)), t = t.substring(0, e) + t.substring(e + s)
                    }
                    if ("html" === o.contentType) {
                        var r = t.substr(e).charAt(0);
                        if ("<" === r || "&" === r) {
                            var a = "",
                                l = "";
                            for (l = "<" === r ? ">" : ";"; t.substr(e + 1).charAt(0) !== l && (a += t.substr(e).charAt(0), e++, !(e + 1 > t.length)););
                            e++, a += l
                        }
                    }
                    o.timeout = setTimeout(function() {
                        if (e === t.length) {
                            if (o.options.onStringTyped(o.arrayPos), o.arrayPos === o.strings.length - 1 && (o.options.callback(), o.curLoop++, o.loop === !1 || o.curLoop === o.loopCount)) return;
                            o.timeout = setTimeout(function() {
                                o.backspace(t, e)
                            }, o.backDelay)
                        } else {
                            0 === e && o.options.preStringTyped(o.arrayPos);
                            var i = t.substr(0, e + 1);
                            o.attr ? o.el.attr(o.attr, i) : o.isInput ? o.el.val(i) : "html" === o.contentType ? o.el.html(i) : o.el.text(i), e++, o.typewrite(t, e)
                        }
                    }, i)
                }, i)
            }
        },
        backspace: function(t, e) {
            if (this.stop !== !0) {
                var i = Math.round(70 * Math.random()) + this.backSpeed,
                    o = this;
                o.timeout = setTimeout(function() {
                    if ("html" === o.contentType && ">" === t.substr(e).charAt(0)) {
                        for (var i = "";
                            "<" !== t.substr(e - 1).charAt(0) && (i -= t.substr(e).charAt(0), e--, !(e < 0)););
                        e--, i += "<"
                    }
                    var n = t.substr(0, e);
                    o.attr ? o.el.attr(o.attr, n) : o.isInput ? o.el.val(n) : "html" === o.contentType ? o.el.html(n) : o.el.text(n), e > o.stopNum ? (e--, o.backspace(t, e)) : e <= o.stopNum && (o.arrayPos++, o.arrayPos === o.strings.length ? (o.arrayPos = 0, o.shuffle && (o.sequence = o.shuffleArray(o.sequence)), o.init()) : o.typewrite(o.strings[o.sequence[o.arrayPos]], e))
                }, i)
            }
        },
        shuffleArray: function(t) {
            var e, i, o = t.length;
            if (o)
                for (; --o;) i = Math.floor(Math.random() * (o + 1)), e = t[i], t[i] = t[o], t[o] = e;
            return t
        },
        reset: function() {
            var t = this;
            clearInterval(t.timeout);
            this.el.attr("id");
            this.el.empty(), "undefined" != typeof this.cursor && this.cursor.remove(), this.strPos = 0, this.arrayPos = 0, this.curLoop = 0, this.options.resetCallback()
        }
    }, t.fn.typed = function(i) {
        return this.each(function() {
            var o = t(this),
                n = o.data("typed"),
                s = "object" == typeof i && i;
            n && n.reset(), o.data("typed", n = new e(this, s)), "string" == typeof i && n[i]()
        })
    }, t.fn.typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        stringsElement: null,
        typeSpeed: 0,
        startDelay: 0,
        backSpeed: 0,
        shuffle: !1,
        backDelay: 500,
        loop: !1,
        loopCount: !1,
        showCursor: !0,
        cursorChar: "|",
        attr: null,
        contentType: "html",
        callback: function() {},
        preStringTyped: function() {},
        onStringTyped: function() {},
        resetCallback: function() {}
    }
}(window.jQuery), ! function(t, e) {
    function i(i) {
        if ("undefined" == typeof i) throw new Error('Pathformer [constructor]: "element" parameter is required');
        if (i.constructor === String && (i = e.getElementById(i), !i)) throw new Error('Pathformer [constructor]: "element" parameter is not related to an existing ID');
        if (!(i.constructor instanceof t.SVGElement || /^svg$/i.test(i.nodeName))) throw new Error('Pathformer [constructor]: "element" parameter must be a string or a SVGelement');
        this.el = i, this.scan(i)
    }

    function o(t, e, i) {
        this.isReady = !1, this.setElement(t, e), this.setOptions(e), this.setCallback(i), this.isReady && this.init()
    }
    i.prototype.TYPES = ["line", "ellipse", "circle", "polygon", "polyline", "rect"], i.prototype.ATTR_WATCH = ["cx", "cy", "points", "r", "rx", "ry", "x", "x1", "x2", "y", "y1", "y2"], i.prototype.scan = function(t) {
        for (var e, i, o, n, s = t.querySelectorAll(this.TYPES.join(",")), r = 0; r < s.length; r++) i = s[r], e = this[i.tagName.toLowerCase() + "ToPath"], o = e(this.parseAttr(i.attributes)), n = this.pathMaker(i, o), i.parentNode.replaceChild(n, i)
    }, i.prototype.lineToPath = function(t) {
        var e = {},
            i = t.x1 || 0,
            o = t.y1 || 0,
            n = t.x2 || 0,
            s = t.y2 || 0;
        return e.d = "M" + i + "," + o + "L" + n + "," + s, e
    }, i.prototype.rectToPath = function(t) {
        var e = {},
            i = parseFloat(t.x) || 0,
            o = parseFloat(t.y) || 0,
            n = parseFloat(t.width) || 0,
            s = parseFloat(t.height) || 0;
        return e.d = "M" + i + " " + o + " ", e.d += "L" + (i + n) + " " + o + " ", e.d += "L" + (i + n) + " " + (o + s) + " ", e.d += "L" + i + " " + (o + s) + " Z", e
    }, i.prototype.polylineToPath = function(t) {
        var e, i, o = {},
            n = t.points.trim().split(" ");
        if (-1 === t.points.indexOf(",")) {
            var s = [];
            for (e = 0; e < n.length; e += 2) s.push(n[e] + "," + n[e + 1]);
            n = s
        }
        for (i = "M" + n[0], e = 1; e < n.length; e++) - 1 !== n[e].indexOf(",") && (i += "L" + n[e]);
        return o.d = i, o
    }, i.prototype.polygonToPath = function(t) {
        var e = i.prototype.polylineToPath(t);
        return e.d += "Z", e
    }, i.prototype.ellipseToPath = function(t) {
        var e = {},
            i = parseFloat(t.rx) || 0,
            o = parseFloat(t.ry) || 0,
            n = parseFloat(t.cx) || 0,
            s = parseFloat(t.cy) || 0,
            r = n - i,
            a = s,
            l = parseFloat(n) + parseFloat(i),
            d = s;
        return e.d = "M" + r + "," + a + "A" + i + "," + o + " 0,1,1 " + l + "," + d + "A" + i + "," + o + " 0,1,1 " + r + "," + d, e
    }, i.prototype.circleToPath = function(t) {
        var e = {},
            i = parseFloat(t.r) || 0,
            o = parseFloat(t.cx) || 0,
            n = parseFloat(t.cy) || 0,
            s = o - i,
            r = n,
            a = parseFloat(o) + parseFloat(i),
            l = n;
        return e.d = "M" + s + "," + r + "A" + i + "," + i + " 0,1,1 " + a + "," + l + "A" + i + "," + i + " 0,1,1 " + s + "," + l, e
    }, i.prototype.pathMaker = function(t, i) {
        var o, n, s = e.createElementNS("http://www.w3.org/2000/svg", "path");
        for (o = 0; o < t.attributes.length; o++) n = t.attributes[o], -1 === this.ATTR_WATCH.indexOf(n.name) && s.setAttribute(n.name, n.value);
        for (o in i) s.setAttribute(o, i[o]);
        return s
    }, i.prototype.parseAttr = function(t) {
        for (var e, i = {}, o = 0; o < t.length; o++) {
            if (e = t[o], -1 !== this.ATTR_WATCH.indexOf(e.name) && -1 !== e.value.indexOf("%")) throw new Error("Pathformer [parseAttr]: a SVG shape got values in percentage. This cannot be transformed into 'path' tags. Please use 'viewBox'.");
            i[e.name] = e.value
        }
        return i
    };
    var n, s, r;
    o.LINEAR = function(t) {
        return t
    }, o.EASE = function(t) {
        return -Math.cos(t * Math.PI) / 2 + .5
    }, o.EASE_OUT = function(t) {
        return 1 - Math.pow(1 - t, 3)
    }, o.EASE_IN = function(t) {
        return Math.pow(t, 3)
    }, o.EASE_OUT_BOUNCE = function(t) {
        var e = -Math.cos(.5 * t * Math.PI) + 1,
            i = Math.pow(e, 1.5),
            o = Math.pow(1 - t, 2),
            n = -Math.abs(Math.cos(2.5 * i * Math.PI)) + 1;
        return 1 - o + n * o
    }, o.prototype.setElement = function(i, o) {
        if ("undefined" == typeof i) throw new Error('Vivus [constructor]: "element" parameter is required');
        if (i.constructor === String && (i = e.getElementById(i), !i)) throw new Error('Vivus [constructor]: "element" parameter is not related to an existing ID');
        if (this.parentEl = i, o && o.file) {
            var n = e.createElement("object");
            n.setAttribute("type", "image/svg+xml"), n.setAttribute("data", o.file), n.setAttribute("built-by-vivus", "true"), i.appendChild(n), i = n
        }
        switch (i.constructor) {
            case t.SVGSVGElement:
            case t.SVGElement:
                this.el = i, this.isReady = !0;
                break;
            case t.HTMLObjectElement:
                var s, r;
                r = this, s = function(t) {
                    if (!r.isReady) {
                        if (r.el = i.contentDocument && i.contentDocument.querySelector("svg"), !r.el && t) throw new Error("Vivus [constructor]: object loaded does not contain any SVG");
                        return r.el ? (i.getAttribute("built-by-vivus") && (r.parentEl.insertBefore(r.el, i), r.parentEl.removeChild(i), r.el.setAttribute("width", "100%"), r.el.setAttribute("height", "100%")), r.isReady = !0, r.init(), !0) : void 0
                    }
                }, s() || i.addEventListener("load", s);
                break;
            default:
                throw new Error('Vivus [constructor]: "element" parameter is not valid (or miss the "file" attribute)')
        }
    }, o.prototype.setOptions = function(e) {
        var i = ["delayed", "sync", "async", "nsync", "oneByOne", "scenario", "scenario-sync"],
            n = ["inViewport", "manual", "autostart"];
        if (void 0 !== e && e.constructor !== Object) throw new Error('Vivus [constructor]: "options" parameter must be an object');
        if (e = e || {}, e.type && -1 === i.indexOf(e.type)) throw new Error("Vivus [constructor]: " + e.type + " is not an existing animation `type`");
        if (this.type = e.type || i[0], e.start && -1 === n.indexOf(e.start)) throw new Error("Vivus [constructor]: " + e.start + " is not an existing `start` option");
        if (this.start = e.start || n[0], this.isIE = -1 !== t.navigator.userAgent.indexOf("MSIE") || -1 !== t.navigator.userAgent.indexOf("Trident/") || -1 !== t.navigator.userAgent.indexOf("Edge/"), this.duration = r(e.duration, 120), this.delay = r(e.delay, null), this.dashGap = r(e.dashGap, 1), this.forceRender = e.hasOwnProperty("forceRender") ? !!e.forceRender : this.isIE, this.reverseStack = !!e.reverseStack, this.selfDestroy = !!e.selfDestroy, this.onReady = e.onReady, this.map = [], this.frameLength = this.currentFrame = this.delayUnit = this.speed = this.handle = null, this.ignoreInvisible = !!e.hasOwnProperty("ignoreInvisible") && !!e.ignoreInvisible, this.animTimingFunction = e.animTimingFunction || o.LINEAR, this.pathTimingFunction = e.pathTimingFunction || o.LINEAR, this.delay >= this.duration) throw new Error("Vivus [constructor]: delay must be shorter than duration")
    }, o.prototype.setCallback = function(t) {
        if (t && t.constructor !== Function) throw new Error('Vivus [constructor]: "callback" parameter must be a function');
        this.callback = t || function() {}
    }, o.prototype.mapping = function() {
        var e, i, o, n, s, a, l, d;
        for (d = a = l = 0, i = this.el.querySelectorAll("path"), e = 0; e < i.length; e++) o = i[e], this.isInvisible(o) || (s = {
            el: o,
            length: Math.ceil(o.getTotalLength())
        }, isNaN(s.length) ? t.console && console.warn && console.warn("Vivus [mapping]: cannot retrieve a path element length", o) : (this.map.push(s), o.style.strokeDasharray = s.length + " " + (s.length + 2 * this.dashGap), o.style.strokeDashoffset = s.length + this.dashGap, s.length += this.dashGap, a += s.length, this.renderPath(e)));
        for (a = 0 === a ? 1 : a, this.delay = null === this.delay ? this.duration / 3 : this.delay, this.delayUnit = this.delay / (i.length > 1 ? i.length - 1 : 1), this.reverseStack && this.map.reverse(), e = 0; e < this.map.length; e++) {
            switch (s = this.map[e], this.type) {
                case "delayed":
                    s.startAt = this.delayUnit * e, s.duration = this.duration - this.delay;
                    break;
                case "oneByOne":
                    s.startAt = l / a * this.duration, s.duration = s.length / a * this.duration;
                    break;
                case "sync":
                case "async":
                case "nsync":
                    s.startAt = 0, s.duration = this.duration;
                    break;
                case "scenario-sync":
                    o = s.el, n = this.parseAttr(o), s.startAt = d + (r(n["data-delay"], this.delayUnit) || 0), s.duration = r(n["data-duration"], this.duration), d = void 0 !== n["data-async"] ? s.startAt : s.startAt + s.duration, this.frameLength = Math.max(this.frameLength, s.startAt + s.duration);
                    break;
                case "scenario":
                    o = s.el, n = this.parseAttr(o), s.startAt = r(n["data-start"], this.delayUnit) || 0, s.duration = r(n["data-duration"], this.duration), this.frameLength = Math.max(this.frameLength, s.startAt + s.duration)
            }
            l += s.length, this.frameLength = this.frameLength || this.duration
        }
    }, o.prototype.drawer = function() {
        var t = this;
        if (this.currentFrame += this.speed, this.currentFrame <= 0) this.stop(), this.reset();
        else {
            if (!(this.currentFrame >= this.frameLength)) return this.trace(), void(this.handle = n(function() {
                t.drawer()
            }));
            this.stop(), this.currentFrame = this.frameLength, this.trace(), this.selfDestroy && this.destroy()
        }
        this.callback(this), this.instanceCallback && (this.instanceCallback(this), this.instanceCallback = null)
    }, o.prototype.trace = function() {
        var t, e, i, o;
        for (o = this.animTimingFunction(this.currentFrame / this.frameLength) * this.frameLength, t = 0; t < this.map.length; t++) i = this.map[t], e = (o - i.startAt) / i.duration, e = this.pathTimingFunction(Math.max(0, Math.min(1, e))), i.progress !== e && (i.progress = e, i.el.style.strokeDashoffset = Math.floor(i.length * (1 - e)), this.renderPath(t))
    }, o.prototype.renderPath = function(t) {
        if (this.forceRender && this.map && this.map[t]) {
            var e = this.map[t],
                i = e.el.cloneNode(!0);
            e.el.parentNode.replaceChild(i, e.el), e.el = i
        }
    }, o.prototype.init = function() {
        this.frameLength = 0, this.currentFrame = 0, this.map = [], new i(this.el), this.mapping(), this.starter(), this.onReady && this.onReady(this)
    }, o.prototype.starter = function() {
        switch (this.start) {
            case "manual":
                return;
            case "autostart":
                this.play();
                break;
            case "inViewport":
                var e = this,
                    i = function() {
                        e.isInViewport(e.parentEl, 1) && (e.play(), t.removeEventListener("scroll", i))
                    };
                t.addEventListener("scroll", i), i()
        }
    }, o.prototype.getStatus = function() {
        return 0 === this.currentFrame ? "start" : this.currentFrame === this.frameLength ? "end" : "progress"
    }, o.prototype.reset = function() {
        return this.setFrameProgress(0)
    }, o.prototype.finish = function() {
        return this.setFrameProgress(1)
    }, o.prototype.setFrameProgress = function(t) {
        return t = Math.min(1, Math.max(0, t)), this.currentFrame = Math.round(this.frameLength * t), this.trace(), this
    }, o.prototype.play = function(t, e) {
        if (this.instanceCallback = null, t && "function" == typeof t) this.instanceCallback = t, t = null;
        else if (t && "number" != typeof t) throw new Error("Vivus [play]: invalid speed");
        return e && "function" == typeof e && !this.instanceCallback && (this.instanceCallback = e), this.speed = t || 1, this.handle || this.drawer(), this
    }, o.prototype.stop = function() {
        return this.handle && (s(this.handle), this.handle = null), this
    }, o.prototype.destroy = function() {
        this.stop();
        var t, e;
        for (t = 0; t < this.map.length; t++) e = this.map[t], e.el.style.strokeDashoffset = null, e.el.style.strokeDasharray = null, this.renderPath(t)
    }, o.prototype.isInvisible = function(t) {
        var e, i = t.getAttribute("data-ignore");
        return null !== i ? "false" !== i : !!this.ignoreInvisible && (e = t.getBoundingClientRect(), !e.width && !e.height)
    }, o.prototype.parseAttr = function(t) {
        var e, i = {};
        if (t && t.attributes)
            for (var o = 0; o < t.attributes.length; o++) e = t.attributes[o], i[e.name] = e.value;
        return i
    }, o.prototype.isInViewport = function(t, e) {
        var i = this.scrollY(),
            o = i + this.getViewportH(),
            n = t.getBoundingClientRect(),
            s = n.height,
            r = i + n.top,
            a = r + s;
        return e = e || 0, o >= r + s * e && a >= i
    }, o.prototype.docElem = t.document.documentElement, o.prototype.getViewportH = function() {
        var e = this.docElem.clientHeight,
            i = t.innerHeight;
        return i > e ? i : e
    }, o.prototype.scrollY = function() {
        return t.pageYOffset || this.docElem.scrollTop
    }, n = function() {
        return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(e) {
            return t.setTimeout(e, 1e3 / 60)
        }
    }(), s = function() {
        return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || t.msCancelAnimationFrame || function(e) {
            return t.clearTimeout(e)
        }
    }(), r = function(t, e) {
        var i = parseInt(t, 10);
        return i >= 0 ? i : e
    }, "function" == typeof define && define.amd ? define([], function() {
        return o
    }) : "object" == typeof exports ? module.exports = o : t.Vivus = o
}(window, document), + function() {
    "use strict";

    function t(t) {
        var e = t.getBoundingClientRect();
        return {
            top: e.top + document.body.scrollTop,
            left: e.left + document.body.scrollLeft
        }
    }

    function e() {
        function t() {
            document.body.addEventListener("click", function(t) {
                "zoom" === t.target.getAttribute("data-action") && "IMG" === t.target.tagName && e(t)
            })
        }

        function e(t) {
            if (t.stopPropagation(), !(document.body.classList.contains("zoom-overlay-open") || t.target.width >= window.innerWidth - i)) {
                if (t.metaKey || t.ctrlKey) return n();
                s({
                    forceDispose: !0
                }), u = o(t.target), u.zoomImage(), r()
            }
        }

        function n() {
            window.open(event.target.getAttribute("data-original") || event.target.currentSrc || event.target.src, "_blank")
        }

        function s(t) {
            t = t || {
                forceDispose: !1
            }, u && (u[t.forceDispose ? "dispose" : "close"](), a(), u = null)
        }

        function r() {
            window.addEventListener("scroll", l), document.addEventListener("click", c), document.addEventListener("keyup", d), document.addEventListener("touchstart", h)
        }

        function a() {
            window.removeEventListener("scroll", l), document.removeEventListener("keyup", d), document.removeEventListener("click", c), document.removeEventListener("touchstart", h)
        }

        function l(t) {
            null === f && (f = window.scrollY);
            var e = f - window.scrollY;
            Math.abs(e) >= 40 && s()
        }

        function d(t) {
            27 == t.keyCode && s()
        }

        function c(t) {
            t.stopPropagation(), t.preventDefault(), s()
        }

        function h(t) {
            g = t.touches[0].pageY, t.target.addEventListener("touchmove", p)
        }

        function p(t) {
            Math.abs(t.touches[0].pageY - g) <= 10 || (s(), t.target.removeEventListener("touchmove", p))
        }
        var u = null,
            f = null,
            g = null;
        return {
            listen: t
        }
    }
    var i = 80,
        o = function() {
            function e() {
                var t = document.createElement("img");
                t.onload = function() {
                    l = Number(t.height), d = Number(t.width), o()
                }, t.src = p.currentSrc || p.src
            }

            function o() {
                u = document.createElement("div"), u.className = "zoom-img-wrap", u.style.position = "absolute", u.style.top = t(p).top + "px", u.style.left = t(p).left + "px", f = p.cloneNode(), f.style.visibility = "hidden", p.style.width = p.offsetWidth + "px", p.parentNode.replaceChild(f, p), document.body.appendChild(u), u.appendChild(p), p.classList.add("zoom-img"), p.setAttribute("data-action", "zoom-out"), c = document.createElement("div"), c.className = "zoom-overlay", document.body.appendChild(c), n(), s()
            }

            function n() {
                p.offsetWidth;
                var t = d,
                    e = l,
                    o = t / p.width,
                    n = window.innerHeight - i,
                    s = window.innerWidth - i,
                    r = t / e,
                    a = s / n;
                h = t < s && e < n ? o : r < a ? n / e * o : s / t * o
            }

            function s() {
                p.offsetWidth;
                var e = t(p),
                    i = window.scrollY,
                    o = i + window.innerHeight / 2,
                    n = window.innerWidth / 2,
                    s = e.top + p.height / 2,
                    r = e.left + p.width / 2,
                    a = o - s,
                    l = n - r,
                    d = "scale(" + h + ")",
                    c = "translate(" + l + "px, " + a + "px) translateZ(0)";
                p.style.webkitTransform = d, p.style.msTransform = d, p.style.transform = d, u.style.webkitTransform = c, u.style.msTransform = c, u.style.transform = c, document.body.classList.add("zoom-overlay-open")
            }

            function r() {
                return document.body.classList.remove("zoom-overlay-open"), document.body.classList.add("zoom-overlay-transitioning"), p.style.webkitTransform = "", p.style.msTransform = "", p.style.transform = "", u.style.webkitTransform = "", u.style.msTransform = "", u.style.transform = "", !1 in document.body.style ? a() : (p.addEventListener("transitionend", a), void p.addEventListener("webkitTransitionEnd", a))
            }

            function a() {
                p.removeEventListener("transitionend", a), p.removeEventListener("webkitTransitionEnd", a), u && u.parentNode && (p.classList.remove("zoom-img"), p.style.width = "", p.setAttribute("data-action", "zoom"), f.parentNode.replaceChild(p, f), u.parentNode.removeChild(u), c.parentNode.removeChild(c), document.body.classList.remove("zoom-overlay-transitioning"))
            }
            var l = null,
                d = null,
                c = null,
                h = null,
                p = null,
                u = null,
                f = null;
            return function(t) {
                return p = t, {
                    zoomImage: e,
                    close: r,
                    dispose: a
                }
            }
        }();
    e().listen()
}();