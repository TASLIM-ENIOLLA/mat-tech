
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.55.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\App.svelte generated by Svelte v3.55.0 */

    const file = "src\\App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i].feedback;
    	child_ctx[6] = list[i].rate;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    // (19:7) {#each rates as each}
    function create_each_block_1(ctx) {
    	let div;
    	let button;
    	let t0_value = /*each*/ ctx[9] + "";
    	let t0;
    	let button_class_value;
    	let t1;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[3](/*each*/ ctx[9]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			button = element("button");
    			t0 = text(t0_value);
    			t1 = space();

    			attr_dev(button, "class", button_class_value = "" + (null_to_empty(`${/*feedbackData*/ ctx[0].rate === /*each*/ ctx[9]
			? 'pink-bg text-white'
			: ''} rate-button shadow-sm transit btn bold border`) + " svelte-88zsrp"));

    			add_location(button, file, 20, 9, 556);
    			attr_dev(div, "class", "col-auto mb-3 svelte-88zsrp");
    			add_location(div, file, 19, 8, 519);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button);
    			append_dev(button, t0);
    			append_dev(div, t1);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", click_handler, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*feedbackData*/ 1 && button_class_value !== (button_class_value = "" + (null_to_empty(`${/*feedbackData*/ ctx[0].rate === /*each*/ ctx[9]
			? 'pink-bg text-white'
			: ''} rate-button shadow-sm transit btn bold border`) + " svelte-88zsrp"))) {
    				attr_dev(button, "class", button_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(19:7) {#each rates as each}",
    		ctx
    	});

    	return block;
    }

    // (77:4) {:else}
    function create_else_block(ctx) {
    	let t0;
    	let div2;
    	let div1;
    	let div0;
    	let t2;

    	const block = {
    		c: function create() {
    			t0 = text("(\n\t\t\t\t\t");
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "there are temporarily no feedbacks for now. Please check again later.";
    			t2 = text("\n\t\t\t\t)");
    			attr_dev(div0, "class", "col text-center text-sentence bold text-muted text-justify svelte-88zsrp");
    			add_location(div0, file, 79, 7, 2748);
    			attr_dev(div1, "class", "row svelte-88zsrp");
    			add_location(div1, file, 78, 6, 2723);
    			attr_dev(div2, "class", "container-fluid bg-white p-5 rounded-2x svelte-88zsrp");
    			add_location(div2, file, 77, 5, 2663);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			insert_dev(target, t2, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(77:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (56:4) {#if feedback.length > 0}
    function create_if_block(ctx) {
    	let t0;
    	let t1;
    	let each_value = /*feedback*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			t0 = text("(\n\t\t\t\t\t");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = text("\n\t\t\t\t)");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, t1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*feedback*/ 2) {
    				each_value = /*feedback*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(t1.parentNode, t1);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(56:4) {#if feedback.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (57:5) {#each feedback as {feedback, rate}}
    function create_each_block(ctx) {
    	let div4;
    	let div3;
    	let div0;
    	let button0;
    	let t0_value = /*rate*/ ctx[6] + "";
    	let t0;
    	let t1;
    	let div1;
    	let t2_value = /*feedback*/ ctx[1] + "";
    	let t2;
    	let t3;
    	let div2;
    	let button1;
    	let span;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			div0 = element("div");
    			button0 = element("button");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			div2 = element("div");
    			button1 = element("button");
    			span = element("span");
    			attr_dev(button0, "class", "rating border-0 outline-0 text-white svelte-88zsrp");
    			add_location(button0, file, 60, 9, 2144);
    			attr_dev(div0, "class", "col-auto position-absolute pr-0 rating-holder svelte-88zsrp");
    			add_location(div0, file, 59, 8, 2075);
    			attr_dev(div1, "class", "col-12 bold py-2 text-muted text-justify svelte-88zsrp");
    			add_location(div1, file, 64, 8, 2257);
    			attr_dev(span, "class", "bi-x fo-s-22 svelte-88zsrp");
    			add_location(span, file, 69, 10, 2530);
    			attr_dev(button1, "class", "remove-btn text-dark bg-light shadow rounded-circle p-0 border-dark border btn svelte-88zsrp");
    			add_location(button1, file, 68, 9, 2424);
    			attr_dev(div2, "class", "col-auto pl-0 delete-holder position-absolute svelte-88zsrp");
    			add_location(div2, file, 67, 8, 2355);
    			attr_dev(div3, "class", "row svelte-88zsrp");
    			add_location(div3, file, 58, 7, 2049);
    			attr_dev(div4, "class", "container-fluid bg-white py-3 mb-5 rounded-2x position-relative svelte-88zsrp");
    			add_location(div4, file, 57, 6, 1964);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, div0);
    			append_dev(div0, button0);
    			append_dev(button0, t0);
    			append_dev(div3, t1);
    			append_dev(div3, div1);
    			append_dev(div1, t2);
    			append_dev(div3, t3);
    			append_dev(div3, div2);
    			append_dev(div2, button1);
    			append_dev(button1, span);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*feedback*/ 2 && t0_value !== (t0_value = /*rate*/ ctx[6] + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*feedback*/ 2 && t2_value !== (t2_value = /*feedback*/ ctx[1] + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(57:5) {#each feedback as {feedback, rate}}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let div15;
    	let div14;
    	let div13;
    	let div7;
    	let div6;
    	let h4;
    	let t0;
    	let br;
    	let t1;
    	let t2;
    	let div1;
    	let div0;
    	let t3;
    	let div5;
    	let div4;
    	let div2;
    	let input;
    	let t4;
    	let div3;
    	let button;
    	let t5;
    	let button_disabled_value;
    	let t6;
    	let div11;
    	let div10;
    	let div8;
    	let span0;
    	let t7_value = /*feedback*/ ctx[1].length + "";
    	let t7;
    	let t8;
    	let t9_value = (/*feedback*/ ctx[1].length > 1 ? 's' : '') + "";
    	let t9;
    	let t10;
    	let div9;
    	let span1;
    	let t12;
    	let div12;
    	let mounted;
    	let dispose;
    	let each_value_1 = /*rates*/ ctx[2];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	function select_block_type(ctx, dirty) {
    		if (/*feedback*/ ctx[1].length > 0) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div15 = element("div");
    			div14 = element("div");
    			div13 = element("div");
    			div7 = element("div");
    			div6 = element("div");
    			h4 = element("h4");
    			t0 = text("how would you rate your");
    			br = element("br");
    			t1 = text("service with us?");
    			t2 = space();
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			div5 = element("div");
    			div4 = element("div");
    			div2 = element("div");
    			input = element("input");
    			t4 = space();
    			div3 = element("div");
    			button = element("button");
    			t5 = text("send");
    			t6 = space();
    			div11 = element("div");
    			div10 = element("div");
    			div8 = element("div");
    			span0 = element("span");
    			t7 = text(t7_value);
    			t8 = text(" review");
    			t9 = text(t9_value);
    			t10 = space();
    			div9 = element("div");
    			span1 = element("span");
    			span1.textContent = "average rating (9)";
    			t12 = space();
    			div12 = element("div");
    			if_block.c();
    			attr_dev(br, "class", "svelte-88zsrp");
    			add_location(br, file, 15, 75, 385);
    			attr_dev(h4, "class", "bold m-0 text-center text-sentence svelte-88zsrp");
    			add_location(h4, file, 15, 5, 315);
    			attr_dev(div0, "class", "row j-c-c svelte-88zsrp");
    			add_location(div0, file, 17, 6, 458);
    			attr_dev(div1, "class", "container-fluid py-4 svelte-88zsrp");
    			add_location(div1, file, 16, 5, 417);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", "py-2 text-muted bold outline-0 bg-clear border-0 d-block w-100 svelte-88zsrp");
    			add_location(input, file, 28, 8, 914);
    			attr_dev(div2, "class", "col svelte-88zsrp");
    			add_location(div2, file, 27, 7, 888);
    			button.disabled = button_disabled_value = !(/*feedbackData*/ ctx[0].feedback.length > 10 && /*feedbackData*/ ctx[0].rate !== null);
    			attr_dev(button, "class", "" + (null_to_empty(`transit py-2 px-4 bg-light w-100 rounded-lg border text-capitalize bold`) + " svelte-88zsrp"));
    			add_location(button, file, 31, 8, 1094);
    			attr_dev(div3, "class", "col-auto svelte-88zsrp");
    			add_location(div3, file, 30, 7, 1063);
    			attr_dev(div4, "class", "row a-i-c svelte-88zsrp");
    			add_location(div4, file, 26, 6, 857);
    			attr_dev(div5, "class", "container-fluid border py-2 rounded-lg svelte-88zsrp");
    			add_location(div5, file, 25, 5, 798);
    			attr_dev(div6, "class", "bg-white rounded-2x p-5 svelte-88zsrp");
    			add_location(div6, file, 14, 4, 272);
    			attr_dev(div7, "class", "col-12 svelte-88zsrp");
    			add_location(div7, file, 13, 3, 247);
    			attr_dev(span0, "class", "text-sentence bold text-white svelte-88zsrp");
    			add_location(span0, file, 43, 6, 1574);
    			attr_dev(div8, "class", "col-auto svelte-88zsrp");
    			add_location(div8, file, 42, 5, 1545);
    			attr_dev(span1, "class", "text-sentence bold text-white svelte-88zsrp");
    			add_location(span1, file, 48, 6, 1743);
    			attr_dev(div9, "class", "col-auto svelte-88zsrp");
    			add_location(div9, file, 47, 5, 1714);
    			attr_dev(div10, "class", "row j-c-space-between a-i-c svelte-88zsrp");
    			add_location(div10, file, 41, 4, 1498);
    			attr_dev(div11, "class", "col-12 py-3 svelte-88zsrp");
    			add_location(div11, file, 40, 3, 1468);
    			attr_dev(div12, "class", "col-12 svelte-88zsrp");
    			add_location(div12, file, 54, 3, 1864);
    			attr_dev(div13, "class", "row svelte-88zsrp");
    			add_location(div13, file, 12, 2, 226);
    			attr_dev(div14, "class", "container max-w-600px svelte-88zsrp");
    			add_location(div14, file, 11, 1, 188);
    			attr_dev(div15, "class", "min-vh-100 vw-100 bg-dark-blue p-12 svelte-88zsrp");
    			add_location(div15, file, 10, 0, 137);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div15, anchor);
    			append_dev(div15, div14);
    			append_dev(div14, div13);
    			append_dev(div13, div7);
    			append_dev(div7, div6);
    			append_dev(div6, h4);
    			append_dev(h4, t0);
    			append_dev(h4, br);
    			append_dev(h4, t1);
    			append_dev(div6, t2);
    			append_dev(div6, div1);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div6, t3);
    			append_dev(div6, div5);
    			append_dev(div5, div4);
    			append_dev(div4, div2);
    			append_dev(div2, input);
    			set_input_value(input, /*feedbackData*/ ctx[0].feedback);
    			append_dev(div4, t4);
    			append_dev(div4, div3);
    			append_dev(div3, button);
    			append_dev(button, t5);
    			append_dev(div13, t6);
    			append_dev(div13, div11);
    			append_dev(div11, div10);
    			append_dev(div10, div8);
    			append_dev(div8, span0);
    			append_dev(span0, t7);
    			append_dev(span0, t8);
    			append_dev(span0, t9);
    			append_dev(div10, t10);
    			append_dev(div10, div9);
    			append_dev(div9, span1);
    			append_dev(div13, t12);
    			append_dev(div13, div12);
    			if_block.m(div12, null);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[4]),
    					listen_dev(button, "click", /*click_handler_1*/ ctx[5], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*feedbackData, rates*/ 5) {
    				each_value_1 = /*rates*/ ctx[2];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			if (dirty & /*feedbackData*/ 1 && input.value !== /*feedbackData*/ ctx[0].feedback) {
    				set_input_value(input, /*feedbackData*/ ctx[0].feedback);
    			}

    			if (dirty & /*feedbackData*/ 1 && button_disabled_value !== (button_disabled_value = !(/*feedbackData*/ ctx[0].feedback.length > 10 && /*feedbackData*/ ctx[0].rate !== null))) {
    				prop_dev(button, "disabled", button_disabled_value);
    			}

    			if (dirty & /*feedback*/ 2 && t7_value !== (t7_value = /*feedback*/ ctx[1].length + "")) set_data_dev(t7, t7_value);
    			if (dirty & /*feedback*/ 2 && t9_value !== (t9_value = (/*feedback*/ ctx[1].length > 1 ? 's' : '') + "")) set_data_dev(t9, t9_value);

    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div12, null);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div15);
    			destroy_each(each_blocks, detaching);
    			if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let feedbackData;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let feedback = [];
    	const rates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const click_handler = each => $$invalidate(0, feedbackData.rate = each, feedbackData);

    	function input_input_handler() {
    		feedbackData.feedback = this.value;
    		$$invalidate(0, feedbackData);
    	}

    	const click_handler_1 = () => {
    		$$invalidate(1, feedback = [feedbackData, ...feedback]);
    		$$invalidate(0, feedbackData = { feedback: '', rate: 1 });
    	};

    	$$self.$capture_state = () => ({ feedback, rates, feedbackData });

    	$$self.$inject_state = $$props => {
    		if ('feedback' in $$props) $$invalidate(1, feedback = $$props.feedback);
    		if ('feedbackData' in $$props) $$invalidate(0, feedbackData = $$props.feedbackData);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$invalidate(0, feedbackData = { feedback: '', rate: 1 });

    	return [
    		feedbackData,
    		feedback,
    		rates,
    		click_handler,
    		input_input_handler,
    		click_handler_1
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
