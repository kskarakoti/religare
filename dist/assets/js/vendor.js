/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

// MSDropDown - jquery.dd.js
// author: Marghoob Suleman - http://www.marghoobsuleman.com/
// Date: 10 Nov, 2012 
// Version: 3.5.2
// Revision: 27
// web: www.marghoobsuleman.com
/*
// msDropDown is free jQuery Plugin: you can redistribute it and/or modify
// it under the terms of the either the MIT License or the Gnu General Public License (GPL) Version 2
*/ 
var msBeautify = msBeautify || {};
(function ($) {
	msBeautify = {
	version: {msDropdown:'3.5.2'},
	author: "Marghoob Suleman",
	counter: 20,
	debug: function (v) {
		if (v !== false) {
			$(".ddOutOfVision").css({height: 'auto', position: 'relative'});
		} else {
			$(".ddOutOfVision").css({height: '0px', position: 'absolute'});
		}
	},
	oldDiv: '',
	create: function (id, settings, type) {
		type = type || "dropdown";
		var data;
		switch (type.toLowerCase()) {
		case "dropdown":
		case "select":
			data = $(id).msDropdown(settings).data("dd");
			break;
		}
		return data;
	}
};

$.msDropDown = {}; //Legacy
$.msDropdown = {}; //camelCaps
$.extend(true, $.msDropDown, msBeautify);
$.extend(true, $.msDropdown, msBeautify);
// make compatibiliy with old and new jquery
if ($.fn.prop === undefined) {$.fn.prop = $.fn.attr;}
if ($.fn.on === undefined) {$.fn.on = $.fn.bind;$.fn.off = $.fn.unbind;}
if (typeof $.expr.createPseudo === 'function') {
	//jQuery 1.8  or greater
	$.expr[':'].Contains = $.expr.createPseudo(function (arg) {return function (elem) { return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0; }; });
} else {
	//lower version
	$.expr[':'].Contains = function (a, i, m) {return $(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; };
}
//dropdown class
function dd(element, settings) {
	var settings = $.extend(true,
		{byJson: {data: null, selectedIndex: 0, name: null, size: 0, multiple: false, width: 250},
		mainCSS: 'dd',
		height: 120, //not using currently
		visibleRows: 7,
		rowHeight: 0,
		showIcon: true,
		zIndex: 9999,
		useSprite: false,
		animStyle: 'slideDown',
		event:'click',
		openDirection: 'auto', //auto || alwaysUp || alwaysDown
		jsonTitle: true,
		style: '',
		disabledOpacity: 0.7,
		disabledOptionEvents: true,
		childWidth:0,
		enableCheckbox:false, //this needs to multiple or it will set element to multiple
		checkboxNameSuffix:'_mscheck',
		append:'',
		prepend:'',
		reverseMode:true, //it will update the msdropdown UI/value if you update the original dropdown - will be usefull if are using knockout.js or playing with original dropdown
		roundedCorner:true,
		enableAutoFilter:true,
		on: {create: null,open: null,close: null,add: null,remove: null,change: null,blur: null,click: null,dblclick: null,mousemove: null,mouseover: null,mouseout: null,focus: null,mousedown: null,mouseup: null}
		}, settings);								  
	var $this = this; //this class	 
	var holderId = {postElementHolder: '_msddHolder', postID: '_msdd', postTitleID: '_title',postTitleTextID: '_titleText', postChildID: '_child'};
	var css = {dd:settings.mainCSS, ddTitle: 'ddTitle', arrow: 'ddArrow arrowoff', ddChild: 'ddChild', ddTitleText: 'ddTitleText',disabled: 'disabled', enabled: 'enabled', ddOutOfVision: 'ddOutOfVision', borderTop: 'borderTop', noBorderTop: 'noBorderTop', selected: 'selected', divider: 'divider', optgroup: "optgroup", optgroupTitle: "optgroupTitle", description: "description", label: "ddlabel",hover: 'hover',disabledAll: 'disabledAll'};
	var css_i = {li: '_msddli_',borderRadiusTp: 'borderRadiusTp',ddChildMore: 'border shadow',fnone: "fnone"};
	var isList = false, isMultiple=false,isDisabled=false, cacheElement = {}, element, orginial = {}, isOpen=false;
	var DOWN_ARROW = 40, UP_ARROW = 38, LEFT_ARROW=37, RIGHT_ARROW=39, ESCAPE = 27, ENTER = 13, ALPHABETS_START = 47, SHIFT=16, CONTROL = 17, BACKSPACE=8, DELETE=46;
	var shiftHolded=false, controlHolded=false,lastTarget=null,forcedTrigger=false, oldSelected, isCreated = false;
	var doc = document, ua = window.navigator.userAgent, isIE = ua.match(/msie/i);
	settings.reverseMode = settings.reverseMode.toString();
	settings.roundedCorner = settings.roundedCorner.toString();
	var isArray = function(obj) {
		return (Object.prototype.toString.call(obj)=="[object Array]") ? true : false;
	};
	var msieversion = function()
   	{      
      var msie = ua.indexOf("MSIE");
      if ( msie > 0 ) {      // If Internet Explorer, return version number
         return parseInt (ua.substring (msie+5, ua.indexOf (".", msie)));
	  } else {                // If another browser, return 0
         return 0;
	  };
   	};
	var checkDataSetting = function() {
		settings.mainCSS = $("#"+element).data("maincss") || settings.mainCSS;
		settings.visibleRows = $("#"+element).data("visiblerows") || settings.visibleRows;
		if($("#"+element).data("showicon")==false) {settings.showIcon = $("#"+element).data("showicon");};
		settings.useSprite = $("#"+element).data("usesprite") || settings.useSprite;
		settings.animStyle = $("#"+element).data("animstyle") || settings.animStyle;
		settings.event = $("#"+element).data("event") || settings.event;
		settings.openDirection = $("#"+element).data("opendirection") || settings.openDirection;
		settings.jsonTitle = $("#"+element).data("jsontitle") || settings.jsonTitle;
		settings.disabledOpacity = $("#"+element).data("disabledopacity") || settings.disabledOpacity;
		settings.childWidth = $("#"+element).data("childwidth") || settings.childWidth;
		settings.enableCheckbox = $("#"+element).data("enablecheckbox") || settings.enableCheckbox;
		settings.checkboxNameSuffix = $("#"+element).data("checkboxnamesuffix") || settings.checkboxNameSuffix;
		settings.append = $("#"+element).data("append") || settings.append;
		settings.prepend = $("#"+element).data("prepend") || settings.prepend;
		settings.reverseMode = $("#"+element).data("reversemode") || settings.reverseMode;
		settings.roundedCorner = $("#"+element).data("roundedcorner") || settings.roundedCorner;
		settings.enableAutoFilter = $("#"+element).data("enableautofilter") || settings.enableAutoFilter;
		
		//make string
		settings.reverseMode = settings.reverseMode.toString();
		settings.roundedCorner = settings.roundedCorner.toString();
		settings.enableAutoFilter = settings.enableAutoFilter.toString();
	};	
	var getElement = function(ele) {
		if (cacheElement[ele] === undefined) {
			cacheElement[ele] = doc.getElementById(ele);
		}
		return cacheElement[ele];
	}; 	
	var getIndex = function(opt) {
		var childid = getPostID("postChildID"); 
		return $("#"+childid + " li."+css_i.li).index(opt);
	};
	var createByJson = function() {
		if (settings.byJson.data) {
				var validData = ["description","image","title"];
				try {
					if (!element.id) {
						element.id = "dropdown"+msBeautify.counter;
					};
					settings.byJson.data = eval(settings.byJson.data);
					//change element
					var id = "msdropdown"+(msBeautify.counter++);
					var obj = {};
					obj.id = id;
					obj.name = settings.byJson.name || element.id; //its name
					if (settings.byJson.size>0) {
						obj.size = settings.byJson.size;
					};
					obj.multiple = settings.byJson.multiple;
					var oSelect = createElement("select", obj);
					for(var i=0;i<settings.byJson.data.length;i++) {
						var current = settings.byJson.data[i];
						var opt = new Option(current.text, current.value);
						for(var p in current) { 
							if (p.toLowerCase() != 'text') { 
								var key = ($.inArray(p.toLowerCase(), validData)!=-1) ? "data-" : "";
								opt.setAttribute(key+p, current[p]);
							};
						};
						oSelect.options[i] = opt;
					};
					getElement(element.id).appendChild(oSelect);
					oSelect.selectedIndex = settings.byJson.selectedIndex;
					$(oSelect).css({width: settings.byJson.width+'px'});
					//now change element for access other things
					element = oSelect;
				} catch(e) {
					throw "There is an error in json data.";
				};
		};			
	};
	var init = function() {		
		 //set properties
		 createByJson();
		if (!element.id) {
			element.id = "msdrpdd"+(msBeautify.counter++);
		};						
		element = element.id;
		$this.element = element;
		checkDataSetting();		
		isDisabled = getElement(element).disabled;
		var useCheckbox = settings.enableCheckbox;
		if(useCheckbox.toString()==="true") {
			getElement(element).multiple = true;
			settings.enableCheckbox = true;
		};
		isList = (getElement(element).size>1 || getElement(element).multiple==true) ? true : false;
		//trace("isList "+isList);
		if (isList) {isMultiple = getElement(element).multiple;};			
		mergeAllProp();		
		//create layout
		createLayout();		
		//set ui prop
		updateProp("uiData", getDataAndUI());
		updateProp("selectedOptions", $("#"+element +" option:selected"));
		var childid = getPostID("postChildID");
		oldSelected = $("#" + childid + " li." + css.selected);
		
		if(settings.reverseMode==="true") {
			$("#"+element).on("change", function() {
				setValue(this.selectedIndex);
			});
		};
		//add refresh method
		getElement(element).refresh = function(e) {
			 $("#"+element).msDropdown().data("dd").refresh();
		};

	 };	
	 /********************************************************************************************/	
	var getPostID = function (id) {
		return element+holderId[id];
	};
	var getInternalStyle = function(ele) {		 
		 var s = (ele.style === undefined) ? "" : ele.style.cssText;
		 return s;
	};
	var parseOption = function(opt) {
		var imagePath = '', title ='', description='', value=-1, text='', className='', imagecss = '', index;
		if (opt !== undefined) {
			var attrTitle = opt.title || "";
			//data-title
			if (attrTitle!="") {
				var reg = /^\{.*\}$/;
				var isJson = reg.test(attrTitle);
				if (isJson && settings.jsonTitle) {
					var obj =  eval("["+attrTitle+"]");	
				};				 
				title = (isJson && settings.jsonTitle) ? obj[0].title : title;
				description = (isJson && settings.jsonTitle) ? obj[0].description : description;
				imagePath = (isJson && settings.jsonTitle) ? obj[0].image : attrTitle;
				imagecss = (isJson && settings.jsonTitle) ? obj[0].imagecss : imagecss;
				index = opt.index;
			};

			text = opt.text || '';
			value = opt.value || '';
			className = opt.className || "";
			//ignore title attribute if playing with data tags
			title = $(opt).prop("data-title") || $(opt).data("title") || (title || "");
			description = $(opt).prop("data-description") || $(opt).data("description") || (description || "");
			imagePath = $(opt).prop("data-image") || $(opt).data("image") || (imagePath || "");
			imagecss = $(opt).prop("data-imagecss") || $(opt).data("imagecss") || (imagecss || "");
			index = $(opt).index();
		};
		var o = {image: imagePath, title: title, description: description, value: value, text: text, className: className, imagecss:imagecss, index:index};
		return o;
	};	 
	var createElement = function(nm, attr, html) {
		var tag = doc.createElement(nm);
		if (attr) {
		 for(var i in attr) {
			 switch(i) {
				 case "style":
					tag.style.cssText = attr[i];
				 break;
				 default:
					tag[i]  = attr[i];
				 break;
			 };	
		 };
		};
		if (html) {
		 tag.innerHTML = html;
		};
		return tag;
	};
	 /********************************************************************************************/
	  /*********************** <layout> *************************************/
	var hideOriginal = function() {
		var hidid = getPostID("postElementHolder");
		if ($("#"+hidid).length==0) {			 
			var obj = {style: 'height: 0px;overflow: hidden;position: absolute;',className: css.ddOutOfVision};	
			obj.id = hidid;
			var oDiv = createElement("div", obj);	
			$("#"+element).after(oDiv);
			$("#"+element).appendTo($("#"+hidid));
		} else {
			$("#"+hidid).css({height: 0,overflow: 'hidden',position: 'absolute'});
		};
		getElement(element).tabIndex = -1;
	};
	var createWrapper = function () {
		var brdRds = (settings.roundedCorner == "true") ? " borderRadius" : "";
		var obj = {
			className: css.dd + " ddcommon"+brdRds
		};
		var intcss = getInternalStyle(getElement(element));
		var w = $("#" + element).outerWidth();
		obj.style = "width: " + w + "px;";
		if (intcss.length > 0) {
			obj.style = obj.style + "" + intcss;
		};
		obj.id = getPostID("postID");
		obj.tabIndex = getElement(element).tabIndex;
		var oDiv = createElement("div", obj);
		return oDiv;
	};
	var createTitle = function () {
		var selectedOption;
		if(getElement(element).selectedIndex>=0) {
			selectedOption = getElement(element).options[getElement(element).selectedIndex];
		} else {
			selectedOption = {value:'', text:''};
		}
		var spriteClass = "", selectedClass = "";
		//check sprite
		var useSprite = $("#"+element).data("usesprite");
		if(useSprite) { settings.useSprite = useSprite; };
		if (settings.useSprite != false) {
			spriteClass = " " + settings.useSprite;
			selectedClass = " " + selectedOption.className;
		};
		var brdRdsTp = (settings.roundedCorner == "true") ? " "+css_i.borderRadiusTp : "" ;
		var oTitle = createElement("div", {className: css.ddTitle + spriteClass + brdRdsTp});
		//divider
		var oDivider = createElement("span", {className: css.divider});
		//arrow
		var oArrow = createElement("span", {className: css.arrow});
		//title Text
		var titleid = getPostID("postTitleID");
		var oTitleText = createElement("span", {className: css.ddTitleText + selectedClass, id: titleid});
	
		var parsed = parseOption(selectedOption);
		var arrowPath = parsed.image;
		var sText = parsed.text || "";		
		if (arrowPath != "" && settings.showIcon) {
			var oIcon = createElement("img");
			oIcon.src = arrowPath;
			if(parsed.imagecss!="") {
				oIcon.className = parsed.imagecss+" ";
			};
		};
		var oTitleText_in = createElement("span", {className: css.label}, sText);
		oTitle.appendChild(oDivider);
		oTitle.appendChild(oArrow);
		if (oIcon) {
			oTitleText.appendChild(oIcon);
		};
		oTitleText.appendChild(oTitleText_in);
		oTitle.appendChild(oTitleText);
		var oDescription = createElement("span", {className: css.description}, parsed.description);
		oTitleText.appendChild(oDescription);
		return oTitle;
	};
	var createFilterBox = function () {
		var tid = getPostID("postTitleTextID");
		var brdRds = (settings.roundedCorner == "true") ? "borderRadius" : "";
		var sText = createElement("input", {id: tid, type: 'text', value: '', autocomplete: 'off', className: 'text shadow '+brdRds, style: 'display: none'});
		return sText;
	};
	var createChild = function (opt) {
		var obj = {};
		var intcss = getInternalStyle(opt);
		if (intcss.length > 0) {obj.style = intcss; };
		var css2 = (opt.disabled) ? css.disabled : css.enabled;
		css2 = (opt.selected) ? (css2 + " " + css.selected) : css2;
		css2 = css2 + " " + css_i.li;
		obj.className = css2;
		if (settings.useSprite != false) {
			obj.className = css2 + " " + opt.className;
		};
		var li = createElement("li", obj);
		var parsed = parseOption(opt);
		if (parsed.title != "") {
			li.title = parsed.title;
		};
		var arrowPath = parsed.image;
		if (arrowPath != "" && settings.showIcon) {
			var oIcon = createElement("img");
			oIcon.src = arrowPath;
			if(parsed.imagecss!="") {
				oIcon.className = parsed.imagecss+" ";
			};
		};
		if (parsed.description != "") {
			var oDescription = createElement("span", {
				className: css.description
			}, parsed.description);
		};
		var sText = opt.text || "";
		var oTitleText = createElement("span", {
			className: css.label
		}, sText);
		//checkbox
		if(settings.enableCheckbox===true) {
			var chkbox = createElement("input", {
			type: 'checkbox', name:element+settings.checkboxNameSuffix+'[]', value:opt.value||"", className:"checkbox"}); //this can be used for future
			li.appendChild(chkbox);
			if(settings.enableCheckbox===true) {
				chkbox.checked = (opt.selected) ? true : false;
			};
		};
		if (oIcon) {
			li.appendChild(oIcon);
		};
		li.appendChild(oTitleText);
		if (oDescription) {
			li.appendChild(oDescription);
		} else {
			if (oIcon) {
				oIcon.className = oIcon.className+css_i.fnone;
			};
		};
		var oClear = createElement("div", {className: 'clear'});
		li.appendChild(oClear);
		return li;
	};
	var createChildren = function () {
		var childid = getPostID("postChildID");
		var obj = {className: css.ddChild + " ddchild_ " + css_i.ddChildMore, id: childid};
		if (isList == false) {
			obj.style = "z-index: " + settings.zIndex;
		} else {
			obj.style = "z-index:1";
		};
		var childWidth = $("#"+element).data("childwidth") || settings.childWidth;
		if(childWidth) {
			obj.style =  (obj.style || "") + ";width:"+childWidth;
		};		
		var oDiv = createElement("div", obj);
		var ul = createElement("ul");
		if (settings.useSprite != false) {
			ul.className = settings.useSprite;
		};
		var allOptions = getElement(element).children;
		for (var i = 0; i < allOptions.length; i++) {
			var current = allOptions[i];
			var li;
			if (current.nodeName.toLowerCase() == "optgroup") {
				//create ul
				li = createElement("li", {className: css.optgroup});
				var span = createElement("span", {className: css.optgroupTitle}, current.label);
				li.appendChild(span);
				var optChildren = current.children;
				var optul = createElement("ul");
				for (var j = 0; j < optChildren.length; j++) {
					var opt_li = createChild(optChildren[j]);
					optul.appendChild(opt_li);
				};
				li.appendChild(optul);
			} else {
				li = createChild(current);
			};
			ul.appendChild(li);
		};
		oDiv.appendChild(ul);		
		return oDiv;
	};
	var childHeight = function (val) {
		var childid = getPostID("postChildID");
		if (val) {
			if (val == -1) { //auto
				$("#"+childid).css({height: "auto", overflow: "auto"});
			} else {				
				$("#"+childid).css("height", val+"px");
			};
			return false;
		};
		//else return height
		var iHeight;
		var totalOptions = getElement(element).options.length;
		if (totalOptions > settings.visibleRows || settings.visibleRows) {
			var firstLI = $("#" + childid + " li:first");
			var margin = parseInt(firstLI.css("padding-bottom")) + parseInt(firstLI.css("padding-top"));
			if(settings.rowHeight===0) {
				$("#" + childid).css({visibility:'hidden',display:'block'}); //hack for first child
				settings.rowHeight = Math.ceil(firstLI.height());
				$("#" + childid).css({visibility:'visible'});
				if(!isList || settings.enableCheckbox===true) {
					$("#" + childid).css({display:'none'});
				};
			};
			iHeight = ((settings.rowHeight + margin) * Math.min(settings.visibleRows,totalOptions)) + 3;
		} else if (isList) {
			iHeight = $("#" + element).height(); //get height from original element
		};		
		return iHeight;
	};
	var applyChildEvents = function () {
		var childid = getPostID("postChildID");
		$("#" + childid).on("click", function (e) {
			if (isDisabled === true) return false;
			//prevent body click
			e.preventDefault();
			e.stopPropagation();
			if (isList) {
				bind_on_events();
			};
		});
		$("#" + childid + " li." + css.enabled).on("click", function (e) {
			if(e.target.nodeName.toLowerCase() !== "input") {
				close(this);
			};
		});
		$("#" + childid + " li." + css.enabled).on("mousedown", function (e) {
			if (isDisabled === true) return false;
			oldSelected = $("#" + childid + " li." + css.selected);
			lastTarget = this;
			e.preventDefault();
			e.stopPropagation();
			//select current input
			if(settings.enableCheckbox===true) {
				if(e.target.nodeName.toLowerCase() === "input") {
					controlHolded = true;
				};	
			};
			if (isList === true) {
				if (isMultiple) {					
					if (shiftHolded === true) {
						$(this).addClass(css.selected);
						var selected = $("#" + childid + " li." + css.selected);
						var lastIndex = getIndex(this);
						if (selected.length > 1) {
							var items = $("#" + childid + " li." + css_i.li);
							var ind1 = getIndex(selected[0]);
							var ind2 = getIndex(selected[1]);
							if (lastIndex > ind2) {
								ind1 = (lastIndex);
								ind2 = ind2 + 1;
							};
							for (var i = Math.min(ind1, ind2); i <= Math.max(ind1, ind2); i++) {
								var current = items[i];
								if ($(current).hasClass(css.enabled)) {
									$(current).addClass(css.selected);
								};
							};
						};
					} else if (controlHolded === true) {
						$(this).toggleClass(css.selected); //toggle
						if(settings.enableCheckbox===true) {
							var checkbox = this.childNodes[0];
							checkbox.checked = !checkbox.checked; //toggle
						};
					} else {
						$("#" + childid + " li." + css.selected).removeClass(css.selected);
						$("#" + childid + " input:checkbox").prop("checked", false);
						$(this).addClass(css.selected);
						if(settings.enableCheckbox===true) {
							this.childNodes[0].checked = true;
						};
					};					
				} else {
					$("#" + childid + " li." + css.selected).removeClass(css.selected);
					$(this).addClass(css.selected);
				};
				//fire event on mouseup
			} else {
				$("#" + childid + " li." + css.selected).removeClass(css.selected);
				$(this).addClass(css.selected);
			};		
		});
		$("#" + childid + " li." + css.enabled).on("mouseenter", function (e) {
			if (isDisabled === true) return false;
			e.preventDefault();
			e.stopPropagation();
			if (lastTarget != null) {
				if (isMultiple) {
					$(this).addClass(css.selected);
					if(settings.enableCheckbox===true) {
						this.childNodes[0].checked = true;
					};
				};
			};
		});
	
		$("#" + childid + " li." + css.enabled).on("mouseover", function (e) {
			if (isDisabled === true) return false;
			$(this).addClass(css.hover);
		});
		$("#" + childid + " li." + css.enabled).on("mouseout", function (e) {
			if (isDisabled === true) return false;
			$("#" + childid + " li." + css.hover).removeClass(css.hover);
		});
	
		$("#" + childid + " li." + css.enabled).on("mouseup", function (e) {
			if (isDisabled === true) return false;
			e.preventDefault();
			e.stopPropagation();
			if(settings.enableCheckbox===true) {
				controlHolded = false;
			};
			var selected = $("#" + childid + " li." + css.selected).length;			
			forcedTrigger = (oldSelected.length != selected || selected == 0) ? true : false;	
			fireAfterItemClicked();
			unbind_on_events(); //remove old one
			bind_on_events();
			lastTarget = null;
		});
	
		/* options events */
		if (settings.disabledOptionEvents == false) {
			$("#" + childid + " li." + css_i.li).on("click", function (e) {
				if (isDisabled === true) return false;
				fireOptionEventIfExist(this, "click");
			});
			$("#" + childid + " li." + css_i.li).on("mouseenter", function (e) {
				if (isDisabled === true) return false;
				fireOptionEventIfExist(this, "mouseenter");
			});
			$("#" + childid + " li." + css_i.li).on("mouseover", function (e) {
				if (isDisabled === true) return false;
				fireOptionEventIfExist(this, "mouseover");
			});
			$("#" + childid + " li." + css_i.li).on("mouseout", function (e) {
				if (isDisabled === true) return false;
				fireOptionEventIfExist(this, "mouseout");
			});
			$("#" + childid + " li." + css_i.li).on("mousedown", function (e) {
				if (isDisabled === true) return false;
				fireOptionEventIfExist(this, "mousedown");
			});
			$("#" + childid + " li." + css_i.li).on("mouseup", function (e) {
				if (isDisabled === true) return false;
				fireOptionEventIfExist(this, "mouseup");
			});
		};
	};
	var removeChildEvents = function () {
		var childid = getPostID("postChildID");
		$("#" + childid).off("click");
		$("#" + childid + " li." + css.enabled).off("mouseenter");
		$("#" + childid + " li." + css.enabled).off("click");
		$("#" + childid + " li." + css.enabled).off("mouseover");
		$("#" + childid + " li." + css.enabled).off("mouseout");
		$("#" + childid + " li." + css.enabled).off("mousedown");
		$("#" + childid + " li." + css.enabled).off("mouseup");
	};
	var triggerBypassingHandler = function (id, evt_n, handler) {
		$("#" + id).off(evt_n, handler);
		$("#" + id).trigger(evt_n);
		$("#" + id).on(evt_n, handler);
	};
	var applyEvents = function () {
		var id = getPostID("postID");
		var tid = getPostID("postTitleTextID");
		var childid = getPostID("postChildID");		
		$("#" + id).on(settings.event, function (e) {			
			if (isDisabled === true) return false;
			fireEventIfExist(settings.event);
			//prevent body click
			e.preventDefault();
			e.stopPropagation();
			open(e);
		});
		$("#" + id).on("keydown", function (e) {
			var k = e.which;
			if (!isOpen && (k == ENTER || k == UP_ARROW || k == DOWN_ARROW ||
				k == LEFT_ARROW || k == RIGHT_ARROW ||
				(k >= ALPHABETS_START && !isList))) {
				open(e);
				if (k >= ALPHABETS_START) {
					showFilterBox();
				} else {
					e.preventDefault();
					e.stopImmediatePropagation();
				};
			};
		});
		$("#" + id).on("focus", wrapperFocusHandler);
		$("#" + id).on("blur", wrapperBlurHandler);
		$("#" + tid).on("blur", function (e) {
			//return focus to the wrapper without triggering the handler
			triggerBypassingHandler(id, "focus", wrapperFocusHandler);
		});
		applyChildEvents();		
		$("#" + id).on("dblclick", on_dblclick);
		$("#" + id).on("mousemove", on_mousemove);
		$("#" + id).on("mouseenter", on_mouseover);
		$("#" + id).on("mouseleave", on_mouseout);
		$("#" + id).on("mousedown", on_mousedown);
		$("#" + id).on("mouseup", on_mouseup);
	};
	var wrapperFocusHandler = function (e) {
		fireEventIfExist("focus");
	};
	var wrapperBlurHandler = function (e) {
		fireEventIfExist("blur");
	};
	//after create
	var fixedForList = function () {
		var id = getPostID("postID");
		var childid = getPostID("postChildID");		
		if (isList === true && settings.enableCheckbox===false) {
			$("#" + id + " ." + css.ddTitle).hide();
			$("#" + childid).css({display: 'block', position: 'relative'});	
			//open();
		} else {
			if(settings.enableCheckbox===false) {
				isMultiple = false; //set multiple off if this is not a list
			};
			$("#" + id + " ." + css.ddTitle).show();
			$("#" + childid).css({display: 'none', position: 'absolute'});
			//set value
			var first = $("#" + childid + " li." + css.selected)[0];
			$("#" + childid + " li." + css.selected).removeClass(css.selected);
			var index = getIndex($(first).addClass(css.selected));
			setValue(index);
		};
		childHeight(childHeight()); //get and set height 
	};
	var fixedForDisabled = function () {
		var id = getPostID("postID");
		var opc = (isDisabled == true) ? settings.disabledOpacity : 1;
		if (isDisabled === true) {
			$("#" + id).addClass(css.disabledAll);
		} else {
			$("#" + id).removeClass(css.disabledAll);
		};
	};
	var fixedSomeUI = function () {
		//auto filter
		var tid = getPostID("postTitleTextID");
		if(settings.enableAutoFilter=="true") {
			$("#" + tid).on("keyup", applyFilters);
		};
		//if is list
		fixedForList();
		fixedForDisabled();
	};
	var createLayout = function () {		
		var oDiv = createWrapper();
		var oTitle = createTitle();
		oDiv.appendChild(oTitle);
		//auto filter box
		var oFilterBox = createFilterBox();
		oDiv.appendChild(oFilterBox);
	
		var oChildren = createChildren();
		oDiv.appendChild(oChildren);
		$("#" + element).after(oDiv);
		hideOriginal(); //hideOriginal
		fixedSomeUI();
		applyEvents();
		
		var childid = getPostID("postChildID");
		//append
		if(settings.append!='') {
			$("#" + childid).append(settings.append);
		};
		//prepend
		if(settings.prepend!='') {
			$("#" + childid).prepend(settings.prepend);
		};		
		if (typeof settings.on.create == "function") {
			settings.on.create.apply($this, arguments);
		};
	};
	var selectUI_LI = function(indexes) {
		var childid = getPostID("postChildID");
		$("#" + childid + " li." + css_i.li).removeClass(css.selected);
		if(settings.enableCheckbox===true) {
			$("#" + childid + " li." + css_i.li + " input.checkbox").prop("checked", false);
		};
		if(isArray(indexes)===true) {
			for(var i=0;i<indexes.length;i++) {
				updateNow(indexes[i]);
			};
		} else {
			updateNow(indexes);
		};
		function updateNow(index) {
			$($("#" + childid + " li." + css_i.li)[index]).addClass(css.selected);
			if(settings.enableCheckbox===true) {
				$($("#" + childid + " li." + css_i.li)[index]).find("input.checkbox").prop("checked", "checked");
			};
			
		};
	};
	var selectMutipleOptions = function (bySelected, useIndexes) {
		var childid = getPostID("postChildID");
		var selected = bySelected || $("#" + childid + " li." + css.selected); //bySelected or by argument
		for (var i = 0; i < selected.length; i++) {
			var ind = (useIndexes===true) ? selected[i]  : getIndex(selected[i]);
			getElement(element).options[ind].selected = "selected";
		};
		setValue(selected);
	};
	var fireAfterItemClicked = function () {
		//console.log("fireAfterItemClicked")
		var childid = getPostID("postChildID");
		var selected = $("#" + childid + " li." + css.selected);		
		if (isMultiple && (shiftHolded || controlHolded) || forcedTrigger) {
			getElement(element).selectedIndex = -1; //reset old
		};
		var index;
		if (selected.length == 0) {
			index = -1;
		} else if (selected.length > 1) {
			//selected multiple
			selectMutipleOptions(selected);
		} else {
			//if one selected
			index = getIndex($("#" + childid + " li." + css.selected));
		};		
		if ((getElement(element).selectedIndex != index || forcedTrigger) && selected.length<=1) {			
			forcedTrigger = false;			
			var evt = has_handler("change");
			getElement(element).selectedIndex = index;	
			setValue(index);
			//local
			if (typeof settings.on.change == "function") {
				var d = getDataAndUI();
				settings.on.change(d.data, d.ui);
			};			
			$("#" + element).trigger("change");			
		};
	};
	var setValue = function (index, byvalue) {
		if (index !== undefined) {
			var selectedIndex, value, selectedText;
			if (index == -1) {
				selectedIndex = -1;
				value = "";
				selectedText = "";
				updateTitleUI(-1);
			} else {
				//by index or byvalue
				if (typeof index != "object") {
					var opt = getElement(element).options[index];
					getElement(element).selectedIndex = index;
					selectedIndex = index;
					value = parseOption(opt);
					selectedText = (index >= 0) ? getElement(element).options[index].text : "";
					updateTitleUI(undefined, value);
					value = value.value; //for bottom
				} else {
					//this is multiple or by option
					selectedIndex = (byvalue && byvalue.index) || getElement(element).selectedIndex;
					value = (byvalue && byvalue.value) || getElement(element).value;
					selectedText = (byvalue && byvalue.text) || getElement(element).options[getElement(element).selectedIndex].text || "";
					updateTitleUI(selectedIndex);
					//check if this is multiple checkbox					
				};
			};			
			updateProp("selectedIndex", selectedIndex);
			updateProp("value", value);
			updateProp("selectedText", selectedText);
			updateProp("children", getElement(element).children);
			updateProp("uiData", getDataAndUI());
			updateProp("selectedOptions", $("#" + element + " option:selected"));
		};
	};
	var has_handler = function (name) {
		//True if a handler has been added in the html.
		var evt = {byElement: false, byJQuery: false, hasEvent: false};
		var obj = $("#" + element);
		//console.log(name)
		try {
			//console.log(obj.prop("on" + name) + " "+name);
			if (obj.prop("on" + name) !== null) {
				evt.hasEvent = true;
				evt.byElement = true;
			};
		} catch(e) {
			//console.log(e.message);
		}
		// True if a handler has been added using jQuery.
		var evs;
		if (typeof $._data == "function") { //1.8
			evs = $._data(obj[0], "events");
		} else {
			evs = obj.data("events");
		};
		if (evs && evs[name]) {
			evt.hasEvent = true;
			evt.byJQuery = true;
		};
		return evt;
	};
	var bind_on_events = function () {
		unbind_on_events();
		$("body").on("click", close);
		//bind more events		 
		$(document).on("keydown", on_keydown);
		$(document).on("keyup", on_keyup);
		//focus will work on this	 		 
	};
	var unbind_on_events = function () {
		$("body").off("click", close);
		//bind more events
		$(document).off("keydown", on_keydown);
		$(document).off("keyup", on_keyup);
	};
	var applyFilters = function (e) {
		if(e.keyCode < ALPHABETS_START && e.keyCode!=BACKSPACE && e.keyCode!=DELETE) {
			return false;
		};
		var childid = getPostID("postChildID");
		var tid = getPostID("postTitleTextID");
		var sText = getElement(tid).value;
		if (sText.length == 0) {
			$("#" + childid + " li:hidden").show(); //show if hidden
			childHeight(childHeight());
		} else {
			$("#" + childid + " li").hide();
			var items = $("#" + childid + " li:Contains('" + sText + "')").show();
			if ($("#" + childid + " li:visible").length <= settings.visibleRows) {
				childHeight(-1); //set autoheight
			};
			if (items.length > 0 && !isList || !isMultiple) {
				$("#" + childid + " ." + css.selected).removeClass(css.selected);
				$(items[0]).addClass(css.selected);
			};	
		};		
		if (!isList) {
			adjustOpen();
		};
	};
	var showFilterBox = function () {
		if(settings.enableAutoFilter=="true") {
			var id = getPostID("postID");
			var tid = getPostID("postTitleTextID");
			if ($("#" + tid + ":hidden").length > 0 && controlHolded == false) {
				$("#" + tid + ":hidden").show().val("");
				//blur the wrapper without triggering the handler
				triggerBypassingHandler(id, "blur", wrapperBlurHandler);
				getElement(tid).focus();
			};
		};
	};
	var hideFilterBox = function () {
		var tid = getPostID("postTitleTextID");
		if ($("#" + tid + ":visible").length > 0) {
			$("#" + tid + ":visible").hide();
			getElement(tid).blur();
		};
	};
	var on_keydown = function (evt) {
		var tid = getPostID("postTitleTextID");
		var childid = getPostID("postChildID");
		switch (evt.keyCode) {
			case DOWN_ARROW:
			case RIGHT_ARROW:
				evt.preventDefault();
				evt.stopPropagation();
				//hideFilterBox();
				next();
				break;
			case UP_ARROW:
			case LEFT_ARROW:
				evt.preventDefault();
				evt.stopPropagation();
				//hideFilterBox();
				previous();
				break;
			case ESCAPE:
			case ENTER:
				evt.preventDefault();
				evt.stopPropagation();
				close();
				var selected = $("#" + childid + " li." + css.selected).length;	
				forcedTrigger = (oldSelected.length != selected || selected == 0) ? true : false;				
				fireAfterItemClicked();
				unbind_on_events(); //remove old one				
				lastTarget = null;			
				break;
			case SHIFT:
				shiftHolded = true;
				break;
			case CONTROL:
				controlHolded = true;
				break;
			default:
				if (evt.keyCode >= ALPHABETS_START && isList === false) {
					showFilterBox();
				};
				break;
		};
		if (isDisabled === true) return false;
		fireEventIfExist("keydown");
	};
	var on_keyup = function (evt) {
		switch (evt.keyCode) {
			case SHIFT:
				shiftHolded = false;
				break;
			case CONTROL:
				controlHolded = false;
				break;
		};
		if (isDisabled === true) return false;
		fireEventIfExist("keyup");
	};
	var on_dblclick = function (evt) {
		if (isDisabled === true) return false;
		fireEventIfExist("dblclick");
	};
	var on_mousemove = function (evt) {
		if (isDisabled === true) return false;
		fireEventIfExist("mousemove");
	};
	
	var on_mouseover = function (evt) {
		if (isDisabled === true) return false;
		evt.preventDefault();
		fireEventIfExist("mouseover");
	};
	var on_mouseout = function (evt) {
		if (isDisabled === true) return false;
		evt.preventDefault();
		fireEventIfExist("mouseout");
	};
	var on_mousedown = function (evt) {
		if (isDisabled === true) return false;
		fireEventIfExist("mousedown");
	};
	var on_mouseup = function (evt) {
		if (isDisabled === true) return false;
		fireEventIfExist("mouseup");
	};
	var option_has_handler = function (opt, name) {
		//True if a handler has been added in the html.
		var evt = {byElement: false, byJQuery: false, hasEvent: false};
		if ($(opt).prop("on" + name) != undefined) {
			evt.hasEvent = true;
			evt.byElement = true;
		};
		// True if a handler has been added using jQuery.
		var evs = $(opt).data("events");
		if (evs && evs[name]) {
			evt.hasEvent = true;
			evt.byJQuery = true;
		};
		return evt;
	};
	var fireOptionEventIfExist = function (li, evt_n) {
		if (settings.disabledOptionEvents == false) {
			var opt = getElement(element).options[getIndex(li)];
			//check if original has some
			if (option_has_handler(opt, evt_n).hasEvent === true) {
				if (option_has_handler(opt, evt_n).byElement === true) {
					opt["on" + evt_n]();
				};
				if (option_has_handler(opt, evt_n).byJQuery === true) {
					switch (evt_n) {
						case "keydown":
						case "keyup":
							//key down/up will check later
							break;
						default:
							$(opt).trigger(evt_n);
							break;
					};
				};
				return false;
			};
		};
	};
	var fireEventIfExist = function (evt_n) {
		//local
		if (typeof settings.on[evt_n] == "function") {
			settings.on[evt_n].apply(this, arguments);
		};
		//check if original has some
		if (has_handler(evt_n).hasEvent === true) {
			if (has_handler(evt_n).byElement === true) {
				getElement(element)["on" + evt_n]();
			} else if (has_handler(evt_n).byJQuery === true) {
				switch (evt_n) {
					case "keydown":
					case "keyup":
						//key down/up will check later
						break;
					default:
						$("#" + element).triggerHandler(evt_n);
						break;
				};
			};
			return false;
		};
	};
	/******************************* navigation **********************************************/
	var scrollToIfNeeded = function (opt) {
		var childid = getPostID("postChildID");
		//if scroll is needed
		opt = (opt !== undefined) ? opt : $("#" + childid + " li." + css.selected);
		if (opt.length > 0) {
			var pos = parseInt(($(opt).position().top));
			var ch = parseInt($("#" + childid).height());
			if (pos > ch) {
				var top = pos + $("#" + childid).scrollTop() - (ch/2);
				$("#" + childid).animate({scrollTop:top}, 500);
			};
		};
	};
	var next = function () {
		var childid = getPostID("postChildID");
		var items = $("#" + childid + " li:visible." + css_i.li);
		var selected = $("#" + childid + " li:visible." + css.selected);
		selected = (selected.length==0) ? items[0] : selected;
		var index = $("#" + childid + " li:visible." + css_i.li).index(selected);
		if ((index < items.length - 1)) {
			index = getNext(index);
			if (index < items.length) { //check again - hack for last disabled 
				if (!shiftHolded || !isList || !isMultiple) {
					$("#" + childid + " ." + css.selected).removeClass(css.selected);
				};
				$(items[index]).addClass(css.selected);
				updateTitleUI(index);
				if (isList == true) {
					fireAfterItemClicked();
				};
				scrollToIfNeeded($(items[index]));
			};
			if (!isList) {
				adjustOpen();
			};
		};	
		function getNext(ind) {
			ind = ind + 1;
			if (ind > items.length) {
				return ind;
			};
			if ($(items[ind]).hasClass(css.enabled) === true) {
				return ind;
			};
			return ind = getNext(ind);
		};
	};
	var previous = function () {
		var childid = getPostID("postChildID");
		var selected = $("#" + childid + " li:visible." + css.selected);
		var items = $("#" + childid + " li:visible." + css_i.li);
		var index = $("#" + childid + " li:visible." + css_i.li).index(selected[0]);
		if (index >= 0) {
			index = getPrev(index);
			if (index >= 0) { //check again - hack for disabled 
				if (!shiftHolded || !isList || !isMultiple) {
					$("#" + childid + " ." + css.selected).removeClass(css.selected);
				};
				$(items[index]).addClass(css.selected);
				updateTitleUI(index);
				if (isList == true) {
					fireAfterItemClicked();
				};
				if (parseInt(($(items[index]).position().top + $(items[index]).height())) <= 0) {
					var top = ($("#" + childid).scrollTop() - $("#" + childid).height()) - $(items[index]).height();
					$("#" + childid).animate({scrollTop: top}, 500);
				};
			};
			if (!isList) {
				adjustOpen();
			};
		};
	
		function getPrev(ind) {
			ind = ind - 1;
			if (ind < 0) {
				return ind;
			};
			if ($(items[ind]).hasClass(css.enabled) === true) {
				return ind;
			};
			return ind = getPrev(ind);
		};
	};
	var adjustOpen = function () {
		var id = getPostID("postID");
		var childid = getPostID("postChildID");
		var pos = $("#" + id).offset();
		var mH = $("#" + id).height();
		var wH = $(window).height();
		var st = $(window).scrollTop();
		var cH = $("#" + childid).height();
		var top = $("#" + id).height(); //this close so its title height
		var direction = settings.openDirection.toLowerCase();
		if (((wH + st) < Math.floor(cH + mH + pos.top) || direction == 'alwaysup') && direction != 'alwaysdown') {
			top = cH;
			$("#" + childid).css({top: "-" + top + "px", display: 'block', zIndex: settings.zIndex});			
			if(settings.roundedCorner == "true") {
				$("#" + id).removeClass("borderRadius borderRadiusTp").addClass("borderRadiusBtm");
			};
			var top = $("#" + childid).offset().top;
			if (top < -10) {
				$("#" + childid).css({top: (parseInt($("#" + childid).css("top")) - top + 20 + st) + "px", zIndex: settings.zIndex});
				if(settings.roundedCorner == "true") {
					$("#" + id).removeClass("borderRadiusBtm borderRadiusTp").addClass("borderRadius");
				};
			};
		} else {
			$("#" + childid).css({top: top + "px", zIndex: settings.zIndex});			
			if(settings.roundedCorner == "true") {
				$("#" + id).removeClass("borderRadius borderRadiusBtm").addClass("borderRadiusTp");
			};
		};
		//hack for ie zindex
		//i hate ie :D
		if(isIE) {
			if(msieversion()<=7) {
				$('div.ddcommon').css("zIndex", settings.zIndex-10);
				$("#" + id).css("zIndex", settings.zIndex+5);
			};
		};		
	};
	var open = function (e) {
		if (isDisabled === true) return false;
		var id = getPostID("postID");
		var childid = getPostID("postChildID");
		if (!isOpen) {
			isOpen = true;
			if (msBeautify.oldDiv != '') {
				$("#" + msBeautify.oldDiv).css({display: "none"}); //hide all 
			};
			msBeautify.oldDiv = childid;
			$("#" + childid + " li:hidden").show(); //show if hidden
			adjustOpen();
			var animStyle = settings.animStyle;
			if(animStyle=="" || animStyle=="none") {
				$("#" + childid).css({display:"block"});
				scrollToIfNeeded();
				if (typeof settings.on.open == "function") {
					var d = getDataAndUI();
					settings.on.open(d.data, d.ui);
				};
			} else {				
				$("#" + childid)[animStyle]("fast", function () {
					scrollToIfNeeded();
					if (typeof settings.on.open == "function") {
						var d = getDataAndUI();
						settings.on.open(d.data, d.ui);
					};
				});
			};
			bind_on_events();
		} else {
			if(settings.event!=='mouseover') {
				close();
			};
		};
	};
	var close = function (e) {
		isOpen = false;
		var id = getPostID("postID");
		var childid = getPostID("postChildID");
		if (isList === false || settings.enableCheckbox===true) {
			$("#" + childid).css({display: "none"});			
			if(settings.roundedCorner == "true") {
				$("#" + id).removeClass("borderRadiusTp borderRadiusBtm").addClass("borderRadius");
			};
		};
		unbind_on_events();
		if (typeof settings.on.close == "function") {
			var d = getDataAndUI();
			settings.on.close(d.data, d.ui);
		};
		//rest some old stuff
		hideFilterBox();
		childHeight(childHeight()); //its needed after filter applied
		$("#" + childid).css({zIndex:1});
		//update the title in case the user clicked outside
		updateTitleUI(getElement(element).selectedIndex);
	};
	/*********************** </layout> *************************************/	
	var mergeAllProp = function () {
		try {
			orginial = $.extend(true, {}, getElement(element));
			for (var i in orginial) {
				if (typeof orginial[i] != "function") {				
					$this[i] = orginial[i]; //properties
				};
			};
		} catch(e) {
			//silent
		};
		$this.selectedText = (getElement(element).selectedIndex >= 0) ? getElement(element).options[getElement(element).selectedIndex].text : "";		
		$this.version = msBeautify.version.msDropdown;
		$this.author = msBeautify.author;
	};
	var getDataAndUIByOption = function (opt) {
		if (opt != null && typeof opt != "undefined") {
			var childid = getPostID("postChildID");
			var data = parseOption(opt);
			var ui = $("#" + childid + " li." + css_i.li + ":eq(" + (opt.index) + ")");
			return {data: data, ui: ui, option: opt, index: opt.index};
		};
		return null;
	};
	var getDataAndUI = function () {
		var childid = getPostID("postChildID");
		var ele = getElement(element);
		var data, ui, option, index;
		if (ele.selectedIndex == -1) {
			data = null;
			ui = null;
			option = null;
			index = -1;
		} else {
			ui = $("#" + childid + " li." + css.selected);
			if (ui.length > 1) {
				var d = [], op = [], ind = [];
				for (var i = 0; i < ui.length; i++) {
					var pd = getIndex(ui[i]);
					d.push(pd);
					op.push(ele.options[pd]);
				};
				data = d;
				option = op;
				index = d;
			} else {
				option = ele.options[ele.selectedIndex];
				data = parseOption(option);
				index = ele.selectedIndex;
			};
		};
		return {data: data, ui: ui, index: index, option: option};
	};
	var updateTitleUI = function (index, byvalue) {
		var titleid = getPostID("postTitleID");
		var value = {};
		if (index == -1) {
			value.text = "&nbsp;";
			value.className = "";
			value.description = "";
			value.image = "";
		} else if (typeof index != "undefined") {
			var opt = getElement(element).options[index];
			value = parseOption(opt);
		} else {
			value = byvalue;
		};
		//update title and current
		$("#" + titleid).find("." + css.label).html(value.text);
		getElement(titleid).className = css.ddTitleText + " " + value.className;
		//update desction
		if (value.description != "") {
			$("#" + titleid).find("." + css.description).html(value.description).show();
		} else {
			$("#" + titleid).find("." + css.description).html("").hide();
		};
		//update icon
		var img = $("#" + titleid).find("img");
		if (img.length > 0) {
			$(img).remove();
		};
		if (value.image != "" && settings.showIcon) {
			img = createElement("img", {src: value.image});
			$("#" + titleid).prepend(img);
			if(value.imagecss!="") {
				img.className = value.imagecss+" ";
			};
			if (value.description == "") {
				img.className = img.className+css_i.fnone;
			};
		};
	};
	var updateProp = function (p, v) {
		$this[p] = v;
	};
	var updateUI = function (a, opt, i) { //action, index, opt
		var childid = getPostID("postChildID");
		var wasSelected = false;
		switch (a) {
			case "add":
				var li = createChild(opt || getElement(element).options[i]);				
				var index;
				if (arguments.length == 3) {
					index = i;
				} else {
					index = $("#" + childid + " li." + css_i.li).length - 1;
				};				
				if (index < 0 || !index) {
					$("#" + childid + " ul").append(li);
				} else {
					var at = $("#" + childid + " li." + css_i.li)[index];
					$(at).before(li);
				};
				removeChildEvents();
				applyChildEvents();
				if (settings.on.add != null) {
					settings.on.add.apply(this, arguments);
				};
				break;
			case "remove":
				wasSelected = $($("#" + childid + " li." + css_i.li)[i]).hasClass(css.selected);
				$("#" + childid + " li." + css_i.li + ":eq(" + i + ")").remove();
				var items = $("#" + childid + " li." + css.enabled);
				if (wasSelected == true) {
					if (items.length > 0) {
						$(items[0]).addClass(css.selected);
						var ind = $("#" + childid + " li." + css_i.li).index(items[0]);
						setValue(ind);
					};
				};
				if (items.length == 0) {
					setValue(-1);
				};
				if ($("#" + childid + " li." + css_i.li).length < settings.visibleRows && !isList) {
					childHeight(-1); //set autoheight
				};
				if (settings.on.remove != null) {
					settings.on.remove.apply(this, arguments);
				};
				break;
		};	
	};
	/************************** public methods/events **********************/
	this.act = function () {
		var action = arguments[0];
		Array.prototype.shift.call(arguments);
		switch (action) {
			case "add":
				$this.add.apply(this, arguments);
				break;
			case "remove":
				$this.remove.apply(this, arguments);
				break;
			default:
				try {
					getElement(element)[action].apply(getElement(element), arguments);
				} catch (e) {
					//there is some error.
				};
				break;
		};
	};
	
	this.add = function () {
		var text, value, title, image, description;
		var obj = arguments[0];		
		if (typeof obj == "string") {
			text = obj;
			value = text;
			opt = new Option(text, value);
		} else {
			text = obj.text || '';
			value = obj.value || text;
			title = obj.title || '';
			image = obj.image || '';
			description = obj.description || '';
			//image:imagePath, title:title, description:description, value:opt.value, text:opt.text, className:opt.className||""
			opt = new Option(text, value);
			$(opt).data("description", description);
			$(opt).data("image", image);
			$(opt).data("title", title);
		};
		arguments[0] = opt; //this option
		getElement(element).add.apply(getElement(element), arguments);
		updateProp("children", getElement(element)["children"]);
		updateProp("length", getElement(element).length);
		updateUI("add", opt, arguments[1]);
	};
	this.remove = function (i) {
		getElement(element).remove(i);
		updateProp("children", getElement(element)["children"]);
		updateProp("length", getElement(element).length);
		updateUI("remove", undefined, i);
	};
	this.set = function (prop, val) {
		if (typeof prop == "undefined" || typeof val == "undefined") return false;
		prop = prop.toString();
		try {
			updateProp(prop, val);
		} catch (e) {/*this is ready only */};
		switch (prop) {
			case "size":
				getElement(element)[prop] = val;
				if (val == 0) {
					getElement(element).multiple = false; //if size is zero multiple should be false
				};
				isList = (getElement(element).size > 1 || getElement(element).multiple == true) ? true : false;
				fixedForList();
				break;
			case "multiple":
				getElement(element)[prop] = val;
				isList = (getElement(element).size > 1 || getElement(element).multiple == true) ? true : false;
				isMultiple = getElement(element).multiple;
				fixedForList();
				updateProp(prop, val);
				break;
			case "disabled":
				getElement(element)[prop] = val;
				isDisabled = val;
				fixedForDisabled();
				break;
			case "selectedIndex":
			case "value":				
				if(prop=="selectedIndex" && isArray(val)===true) {
					$("#"+element +" option").prop("selected", false);
					selectMutipleOptions(val, true);
					selectUI_LI(val); //setValue is being called from selectMutipleOptions
				} else {
					getElement(element)[prop] = val;					
					selectUI_LI(getElement(element).selectedIndex);
					setValue(getElement(element).selectedIndex);
				};
				break;
			case "length":
				var childid = getPostID("postChildID");
				if (val < getElement(element).length) {
					getElement(element)[prop] = val;
					if (val == 0) {
						$("#" + childid + " li." + css_i.li).remove();
						setValue(-1);
					} else {
						$("#" + childid + " li." + css_i.li + ":gt(" + (val - 1) + ")").remove();
						if ($("#" + childid + " li." + css.selected).length == 0) {
							$("#" + childid + " li." + css.enabled + ":eq(0)").addClass(css.selected);
						};
					};
					updateProp(prop, val);
					updateProp("children", getElement(element)["children"]);
				};
				break;
			case "id":
				//please i need this. so preventing to change it. will work on this later
				break;
			default:
				//check if this is not a readonly properties
				try {
					getElement(element)[prop] = val;
					updateProp(prop, val);
				} catch (e) {
					//silent
				};
				break;
		};
	};
	this.get = function (prop) {
		return $this[prop] || getElement(element)[prop]; //return if local else from original
	};
	this.visible = function (val) {
		var id = getPostID("postID");		
		if (val === true) {
			$("#" + id).show();
		} else if (val === false) {
			$("#" + id).hide();
		} else {
			return ($("#" + id).css("display")=="none") ? false : true;
		};
	};
	this.debug = function (v) {
		msBeautify.debug(v);
	};
	this.close = function () {
		close();
	};
	this.open = function () {		
		open();
	};
	this.showRows = function (r) {
		if (typeof r == "undefined" || r == 0) {
			return false;
		};
		settings.visibleRows = r;
		childHeight(childHeight());
	};
	this.visibleRows = this.showRows;
	this.on = function (type, fn) {
		$("#" + element).on(type, fn);
	};
	this.off = function (type, fn) {
		$("#" + element).off(type, fn);
	};
	this.addMyEvent = this.on;
	this.getData = function () {
		return getDataAndUI()
	};
	this.namedItem = function () {
		var opt = getElement(element).namedItem.apply(getElement(element), arguments);
		return getDataAndUIByOption(opt);
	};
	this.item = function () {
		var opt = getElement(element).item.apply(getElement(element), arguments);
		return getDataAndUIByOption(opt);
	};	
	//v 3.2
	this.setIndexByValue = function(val) {
		this.set("value", val);
	};
	this.destroy = function () {
		var hidid = getPostID("postElementHolder");
		var id = getPostID("postID");
		$("#" + id + ", #" + id + " *").off();
		getElement(element).tabIndex = getElement(id).tabIndex;
		$("#" + id).remove();
		$("#" + element).parent().replaceWith($("#" + element));		
		$("#" + element).data("dd", null);
	};
	this.refresh = function() {
		setValue(getElement(element).selectedIndex);
	};
	//Create msDropDown	
	init();
};
//bind in jquery
$.fn.extend({
			msDropDown: function(settings)
			{
				return this.each(function()
				{
					if (!$(this).data('dd')){
						var mydropdown = new dd(this, settings);
						$(this).data('dd', mydropdown);
					};
				});
			}
});
$.fn.msDropdown = $.fn.msDropDown; //make a copy
})(jQuery);
/*! custom-radiobutton - v1.0.1 - 2015-06-14
* http://www.binarystash.net/jquery-custom-radiobutton/
* Copyright (c) 2015 BinaryStash; Licensed MIT */
(function ($) {

	$.fn.customRadiobutton = function() {

		return this.each( function(i,v) {

			$(v).addClass("custom-radiobutton");

			//Ensure that a radio-button element was passed
			if ( !$(v).is(':radio') ) {
				return false;         
			}

			//Add classes
			$(v).addClass("custom-radiobutton");

			//If not wrapped within label tags, wrap it
			var parentLabel = $(v).parent("label");
			var withinLabel = parentLabel.length;

			if ( !withinLabel ){
				$(v).wrap("<label>");      
			} 

			//Create dummy radio-button
			var dummy = $("<span class='custom-radiobutton-display'></span>");
			$(v).after(dummy);
			if ( $(v).prop("checked") ) {
				dummy.addClass("custom-radiobutton-checked custom-radiobutton-checked-default");
			}

			//Add/remove classes to radio-buttons whenever state changes
			$(v).change( function(e) {

				var radiobutton = $(e.currentTarget);
				var name = radiobutton.attr("name");
				var containerForm = $(e.currentTarget).parents("form");
				var withinForm = containerForm.length > 0;
				
				if ( withinForm ) {
					containerForm.find("input[name='"+name+"']").next('.custom-radiobutton-display').removeClass('custom-radiobutton-checked');
				}
				else {
					$("input[name='"+name+"']").filter( function() { return $(this).parents("form").length < 1; } ).next('.custom-radiobutton-display').removeClass('custom-radiobutton-checked');
				}
				
				radiobutton.next('.custom-radiobutton-display').addClass("custom-radiobutton-checked");

			});
			
			//Make reset button aware of the custom checkboxes
			var form = $(v).parents("form");
			var reset = form.find("input[type='reset']");
			reset.each( function(ri,rv) {
				if ( !$(rv).hasClass("custom-checkbox-aware") ) {
					$(rv).addClass("custom-checkbox-aware");
					$(rv).click( function() {
						form.find(".custom-radiobutton-display").removeClass("custom-radiobutton-checked");
						form.find(".custom-radiobutton-display.custom-radiobutton-checked-default").addClass("custom-radiobutton-checked");
					});
				}
			});

		});

	};

}(jQuery));
(function(){var d;window.AmCharts?d=window.AmCharts:(d={},window.AmCharts=d,d.themes={},d.maps={},d.inheriting={},d.charts=[],d.onReadyArray=[],d.useUTC=!1,d.updateRate=60,d.uid=0,d.lang={},d.translations={},d.mapTranslations={},d.windows={},d.initHandlers=[],d.amString="am",d.pmString="pm");d.Class=function(a){var b=function(){arguments[0]!==d.inheriting&&(this.events={},this.construct.apply(this,arguments))};a.inherits?(b.prototype=new a.inherits(d.inheriting),b.base=a.inherits.prototype,delete a.inherits):(b.prototype.createEvents=function(){for(var a=0;a<arguments.length;a++)this.events[arguments[a]]=[]},b.prototype.listenTo=function(a,b,c){this.removeListener(a,b,c);a.events[b].push({handler:c,scope:this})},b.prototype.addListener=function(a,b,c){this.removeListener(this,a,b);a&&this.events[a]&&this.events[a].push({handler:b,scope:c})},b.prototype.removeListener=function(a,b,c){if(a&&a.events&&(a=a.events[b]))for(b=a.length-1;0<=b;b--)a[b].handler===c&&a.splice(b,1)},b.prototype.fire=function(a){for(var b=this.events[a.type],c=0;c<b.length;c++){var d=b[c];d.handler.call(d.scope,a)}});for(var c in a)b.prototype[c]=a[c];return b};d.addChart=function(a){window.requestAnimationFrame?d.animationRequested||(d.animationRequested=!0,window.requestAnimationFrame(d.update)):d.updateInt||(d.updateInt=setInterval(function(){d.update()},Math.round(1E3/d.updateRate)));d.charts.push(a)};d.removeChart=function(a){for(var b=d.charts,c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1);0===b.length&&(d.requestAnimation&&(window.cancelAnimationFrame(d.requestAnimation),d.animationRequested=!1),d.updateInt&&(clearInterval(d.updateInt),d.updateInt=NaN))};d.isModern=!0;d.getIEVersion=function(){var a=0,b,c;"Microsoft Internet Explorer"==navigator.appName&&(b=navigator.userAgent,c=/MSIE ([0-9]{1,}[.0-9]{0,})/,null!==c.exec(b)&&(a=parseFloat(RegExp.$1)));return a};d.applyLang=function(a,b){var c=d.translations;b.dayNames=d.extend({},d.dayNames);b.shortDayNames=d.extend({},d.shortDayNames);b.monthNames=d.extend({},d.monthNames);b.shortMonthNames=d.extend({},d.shortMonthNames);b.amString="am";b.pmString="pm";c&&(c=c[a])&&(d.lang=c,b.langObj=c,c.monthNames&&(b.dayNames=d.extend({},c.dayNames),b.shortDayNames=d.extend({},c.shortDayNames),b.monthNames=d.extend({},c.monthNames),b.shortMonthNames=d.extend({},c.shortMonthNames)),c.am&&(b.amString=c.am),c.pm&&(b.pmString=c.pm));d.amString=b.amString;d.pmString=b.pmString};d.IEversion=d.getIEVersion();9>d.IEversion&&0<d.IEversion&&(d.isModern=!1,d.isIE=!0);d.dx=0;d.dy=0;if(document.addEventListener||window.opera)d.isNN=!0,d.isIE=!1,d.dx=.5,d.dy=.5;document.attachEvent&&(d.isNN=!1,d.isIE=!0,d.isModern||(d.dx=0,d.dy=0));window.chrome&&(d.chrome=!0);d.handleMouseUp=function(a){for(var b=d.charts,c=0;c<b.length;c++){var e=b[c];e&&e.handleReleaseOutside&&e.handleReleaseOutside(a)}};d.handleMouseMove=function(a){for(var b=d.charts,c=0;c<b.length;c++){var e=b[c];e&&e.handleMouseMove&&e.handleMouseMove(a)}};d.handleWheel=function(a){for(var b=d.charts,c=0;c<b.length;c++){var e=b[c];if(e&&e.mouseIsOver){(e.mouseWheelScrollEnabled||e.mouseWheelZoomEnabled)&&e.handleWheel&&e.handleWheel(a);break}}};d.resetMouseOver=function(){for(var a=d.charts,b=0;b<a.length;b++){var c=a[b];c&&(c.mouseIsOver=!1)}};d.ready=function(a){d.onReadyArray.push(a)};d.handleLoad=function(){d.isReady=!0;for(var a=d.onReadyArray,b=0;b<a.length;b++){var c=a[b];isNaN(d.processDelay)?c():setTimeout(c,d.processDelay*b)}};d.addInitHandler=function(a,b){d.initHandlers.push({method:a,types:b})};d.callInitHandler=function(a){var b=d.initHandlers;if(d.initHandlers)for(var c=0;c<b.length;c++){var e=b[c];e.types?d.isInArray(e.types,a.type)&&e.method(a):e.method(a)}};d.getUniqueId=function(){d.uid++;return"AmChartsEl-"+d.uid};d.isNN&&(document.addEventListener("mousemove",d.handleMouseMove),document.addEventListener("mouseup",d.handleMouseUp,!0),window.addEventListener("load",d.handleLoad,!0));d.isIE&&(document.attachEvent("onmousemove",d.handleMouseMove),document.attachEvent("onmouseup",d.handleMouseUp),window.attachEvent("onload",d.handleLoad));d.addWheelListeners=function(){d.wheelIsListened||(d.isNN&&(window.addEventListener("DOMMouseScroll",d.handleWheel,!0),document.addEventListener("mousewheel",d.handleWheel,!0)),d.isIE&&document.attachEvent("onmousewheel",d.handleWheel));d.wheelIsListened=!0};d.clear=function(){var a=d.charts;if(a)for(var b=a.length-1;0<=b;b--)a[b].clear();d.updateInt&&clearInterval(d.updateInt);d.requestAnimation&&window.cancelAnimationFrame(d.requestAnimation);d.charts=[];d.isNN&&(document.removeEventListener("mousemove",d.handleMouseMove,!0),document.removeEventListener("mouseup",d.handleMouseUp,!0),window.removeEventListener("load",d.handleLoad,!0),window.removeEventListener("DOMMouseScroll",d.handleWheel,!0),document.removeEventListener("mousewheel",d.handleWheel,!0));d.isIE&&(document.detachEvent("onmousemove",d.handleMouseMove),document.detachEvent("onmouseup",d.handleMouseUp),window.detachEvent("onload",d.handleLoad))};d.makeChart=function(a,b,c){var e=b.type,h=b.theme;d.isString(h)&&(h=d.themes[h],b.theme=h);var f;switch(e){case"serial":f=new d.AmSerialChart(h);break;case"xy":f=new d.AmXYChart(h);break;case"pie":f=new d.AmPieChart(h);break;case"radar":f=new d.AmRadarChart(h);break;case"gauge":f=new d.AmAngularGauge(h);break;case"funnel":f=new d.AmFunnelChart(h);break;case"map":f=new d.AmMap(h);break;case"stock":f=new d.AmStockChart(h);break;case"gantt":f=new d.AmGanttChart(h)}d.extend(f,b);d.isReady?isNaN(c)?f.write(a):setTimeout(function(){d.realWrite(f,a)},c):d.ready(function(){isNaN(c)?f.write(a):setTimeout(function(){d.realWrite(f,a)},c)});return f};d.realWrite=function(a,b){a.write(b)};d.updateCount=0;d.validateAt=Math.round(d.updateRate/10);d.update=function(){var a=d.charts;d.updateCount++;var b=!1;d.updateCount==d.validateAt&&(b=!0,d.updateCount=0);if(a)for(var c=a.length-1;0<=c;c--)a[c].update&&a[c].update(),b&&(a[c].autoResize?a[c].validateSize&&a[c].validateSize():a[c].premeasure&&a[c].premeasure());window.requestAnimationFrame&&(d.requestAnimation=window.requestAnimationFrame(d.update))};"complete"==document.readyState&&d.handleLoad()})();(function(){var d=window.AmCharts;d.toBoolean=function(a,b){if(void 0===a)return b;switch(String(a).toLowerCase()){case"true":case"yes":case"1":return!0;case"false":case"no":case"0":case null:return!1;default:return!!a}};d.removeFromArray=function(a,b){var c;if(void 0!==b&&void 0!==a)for(c=a.length-1;0<=c;c--)a[c]==b&&a.splice(c,1)};d.getPath=function(){var a=document.getElementsByTagName("script");if(a)for(var b=0;b<a.length;b++){var c=a[b].src;if(-1!==c.search(/\/(amcharts|ammap)\.js/))return c.replace(/\/(amcharts|ammap)\.js.*/,"/")}};d.normalizeUrl=function(a){return""!==a&&-1===a.search(/\/$/)?a+"/":a};d.isAbsolute=function(a){return 0===a.search(/^http[s]?:|^\//)};d.isInArray=function(a,b){for(var c=0;c<a.length;c++)if(a[c]==b)return!0;return!1};d.getDecimals=function(a){var b=0;isNaN(a)||(a=String(a),-1!=a.indexOf("e-")?b=Number(a.split("-")[1]):-1!=a.indexOf(".")&&(b=a.split(".")[1].length));return b};d.wordwrap=function(a,b,c,e){var h,f,g,k;a+="";if(1>b)return a;h=-1;for(a=(k=a.split(/\r\n|\n|\r/)).length;++h<a;k[h]+=g){g=k[h];for(k[h]="";g.length>b;k[h]+=d.trim(g.slice(0,f))+((g=g.slice(f)).length?c:""))f=2==e||(f=g.slice(0,b+1).match(/\S*(\s)?$/))[1]?b:f.input.length-f[0].length||1==e&&b||f.input.length+(f=g.slice(b).match(/^\S*/))[0].length;g=d.trim(g)}return k.join(c)};d.trim=function(a){return a.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")};d.wrappedText=function(a,b,c,e,h,f,g,k){var l=d.text(a,b,c,e,h,f,g);if(l){var m=l.getBBox();if(m.width>k){var p="\n";d.isModern||(p="<br>");k=Math.floor(k/(m.width/
b.length));2<k&&(k-=2);b=d.wordwrap(b,k,p,!0);l.remove();l=d.text(a,b,c,e,h,f,g)}}return l};d.getStyle=function(a,b){var c="";if(document.defaultView&&document.defaultView.getComputedStyle)try{c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b)}catch(e){}else a.currentStyle&&(b=b.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()}),c=a.currentStyle[b]);return c};d.removePx=function(a){if(void 0!==a)return Number(a.substring(0,a.length-2))};d.getURL=function(a,b){if(a)if("_self"!=b&&b)if("_top"==b&&window.top)window.top.location.href=a;else if("_parent"==b&&window.parent)window.parent.location.href=a;else if("_blank"==b)window.open(a);else{var c=document.getElementsByName(b)[0];c?c.src=a:(c=d.windows[b])?c.opener&&!c.opener.closed?c.location.href=a:d.windows[b]=window.open(a):d.windows[b]=window.open(a)}else window.location.href=a};d.ifArray=function(a){return a&&"object"==typeof a&&0<a.length?!0:!1};d.callMethod=function(a,b){var c;for(c=0;c<b.length;c++){var e=b[c];if(e){if(e[a])e[a]();var d=e.length;if(0<d){var f;for(f=0;f<d;f++){var g=e[f];if(g&&g[a])g[a]()}}}}};d.toNumber=function(a){return"number"==typeof a?a:Number(String(a).replace(/[^0-9\-.]+/g,""))};d.toColor=function(a){if(""!==a&&void 0!==a)if(-1!=a.indexOf(",")){a=a.split(",");var b;for(b=0;b<a.length;b++){var c=a[b].substring(a[b].length-6,a[b].length);a[b]="#"+c}}else a=a.substring(a.length-6,a.length),a="#"+a;return a};d.toCoordinate=function(a,b,c){var e;void 0!==a&&(a=String(a),c&&c<b&&(b=c),e=Number(a),-1!=a.indexOf("!")&&(e=b-Number(a.substr(1))),-1!=a.indexOf("%")&&(e=b*Number(a.substr(0,a.length-1))/100));return e};d.fitToBounds=function(a,b,c){a<b&&(a=b);a>c&&(a=c);return a};d.isDefined=function(a){return void 0===a?!1:!0};d.stripNumbers=function(a){return a.replace(/[0-9]+/g,"")};d.roundTo=function(a,b){if(0>b)return a;var c=Math.pow(10,b);return Math.round(a*c)/c};d.toFixed=function(a,b){var c=String(Math.round(a*Math.pow(10,b)));if(0<b){var e=c.length;if(e<b){var d;for(d=0;d<b-e;d++)c="0"+c}e=c.substring(0,
c.length-b);""===e&&(e=0);return e+"."+c.substring(c.length-b,c.length)}return String(c)};d.formatDuration=function(a,b,c,e,h,f){var g=d.intervals,k=f.decimalSeparator;if(a>=g[b].contains){var l=a-Math.floor(a/g[b].contains)*g[b].contains;"ss"==b?(l=d.formatNumber(l,f),1==l.split(k)[0].length&&(l="0"+l)):l=d.roundTo(l,f.precision);("mm"==b||"hh"==b)&&10>l&&(l="0"+l);c=l+""+e[b]+""+c;a=Math.floor(a/g[b].contains);b=g[b].nextInterval;return d.formatDuration(a,b,c,e,h,f)}"ss"==b&&(a=d.formatNumber(a,f),1==a.split(k)[0].length&&(a="0"+a));("mm"==b||"hh"==b)&&10>a&&(a="0"+a);c=a+""+e[b]+""+c;if(g[h].count>g[b].count)for(a=g[b].count;a<g[h].count;a++)b=g[b].nextInterval,"ss"==b||"mm"==b||"hh"==b?c="00"+e[b]+""+c:"DD"==b&&(c="0"+e[b]+""+c);":"==c.charAt(c.length-1)&&(c=c.substring(0,c.length-1));return c};d.formatNumber=function(a,b,c,e,h){a=d.roundTo(a,b.precision);isNaN(c)&&(c=b.precision);var f=b.decimalSeparator;b=b.thousandsSeparator;var g;g=0>a?"-":"";a=Math.abs(a);var k=String(a),l=!1;-1!=k.indexOf("e")&&(l=!0);0<=c&&!l&&(k=d.toFixed(a,c));var m="";if(l)m=k;else{var k=k.split("."),l=String(k[0]),p;for(p=l.length;0<=p;p-=3)m=p!=l.length?0!==p?l.substring(p-3,p)+b+m:l.substring(p-3,p)+m:l.substring(p-3,p);void 0!==k[1]&&(m=m+f+k[1]);void 0!==c&&0<c&&"0"!=m&&(m=d.addZeroes(m,f,c))}m=g+m;""===g&&!0===e&&0!==a&&(m="+"+m);!0===h&&(m+="%");return m};d.addZeroes=function(a,b,c){a=a.split(b);void 0===a[1]&&0<c&&(a[1]="0");return a[1].length<c?(a[1]+="0",d.addZeroes(a[0]+b+a[1],b,c)):void 0!==a[1]?a[0]+b+a[1]:a[0]};d.scientificToNormal=function(a){var b;a=String(a).split("e");var c;if("-"==a[1].substr(0,1)){b="0.";for(c=0;c<Math.abs(Number(a[1]))-1;c++)b+="0";b+=a[0].split(".").join("")}else{var e=0;b=a[0].split(".");b[1]&&(e=b[1].length);b=a[0].split(".").join("");for(c=0;c<Math.abs(Number(a[1]))-e;c++)b+="0"}return b};d.toScientific=function(a,b){if(0===a)return"0";var c=Math.floor(Math.log(Math.abs(a))*Math.LOG10E),e=String(e).split(".").join(b);return String(e)+"e"+c};d.randomColor=function(){return"#"+("00000"+(16777216*Math.random()<<0).toString(16)).substr(-6)};d.hitTest=function(a,b,c){var e=!1,h=a.x,f=a.x+a.width,g=a.y,k=a.y+a.height,l=d.isInRectangle;e||(e=l(h,g,b));e||(e=l(h,k,b));e||(e=l(f,g,b));e||(e=l(f,k,b));e||!0===c||(e=d.hitTest(b,a,!0));return e};d.isInRectangle=function(a,b,c){return a>=c.x-5&&a<=c.x+c.width+5&&b>=c.y-5&&b<=c.y+c.height+5?!0:!1};d.isPercents=function(a){if(-1!=String(a).indexOf("%"))return!0};d.formatValue=function(a,b,c,e,h,f,g,k){if(b){void 0===h&&(h="");var l;for(l=0;l<c.length;l++){var m=c[l],p=b[m];void 0!==p&&(p=f?d.addPrefix(p,k,g,e):d.formatNumber(p,e),a=a.replace(new RegExp("\\[\\["+h+""+m+"\\]\\]","g"),p))}}return a};d.formatDataContextValue=function(a,b){if(a){var c=a.match(/\[\[.*?\]\]/g),e;for(e=0;e<c.length;e++){var d=c[e],d=d.substr(2,d.length-4);void 0!==b[d]&&(a=a.replace(new RegExp("\\[\\["+d+"\\]\\]","g"),b[d]))}}return a};d.massReplace=function(a,b){for(var c in b)if(b.hasOwnProperty(c)){var e=b[c];void 0===e&&(e="");a=a.replace(c,e)}return a};d.cleanFromEmpty=function(a){return a.replace(/\[\[[^\]]*\]\]/g,"")};d.addPrefix=function(a,b,c,e,h){var f=d.formatNumber(a,e),g="",k,l,m;if(0===a)return"0";0>a&&(g="-");a=Math.abs(a);if(1<a)for(k=b.length-1;-1<k;k--){if(a>=b[k].number&&(l=a/b[k].number,m=Number(e.precision),1>m&&(m=1),c=d.roundTo(l,m),m=d.formatNumber(c,{precision:-1,decimalSeparator:e.decimalSeparator,thousandsSeparator:e.thousandsSeparator}),!h||l==c)){f=g+""+m+""+b[k].prefix;break}}else for(k=0;k<c.length;k++)if(a<=c[k].number){l=a/c[k].number;m=Math.abs(Math.floor(Math.log(l)*Math.LOG10E));l=d.roundTo(l,m);f=g+""+l+""+c[k].prefix;break}return f};d.remove=function(a){a&&a.remove()};d.getEffect=function(a){">"==a&&(a="easeOutSine");"<"==a&&(a="easeInSine");"elastic"==a&&(a="easeOutElastic");return a};d.getObjById=function(a,b){var c,e;for(e=0;e<a.length;e++){var d=a[e];if(d.id==b){c=d;break}}return c};d.applyTheme=function(a,b,c){b||(b=d.theme);try{b=JSON.parse(JSON.stringify(b))}catch(e){}b&&b[c]&&d.extend(a,b[c])};d.isString=function(a){return"string"==typeof a?!0:!1};d.extend=function(a,b,c){var e;a||(a={});for(e in b)c?a.hasOwnProperty(e)||(a[e]=b[e]):a[e]=b[e];return a};d.copyProperties=function(a,b){for(var c in a)a.hasOwnProperty(c)&&"events"!=c&&void 0!==a[c]&&"function"!=typeof a[c]&&"cname"!=c&&(b[c]=a[c])};d.processObject=function(a,b,c,e){if(!1===a instanceof b&&(a=e?d.extend(new b(c),a):d.extend(a,new b(c),!0),a.listeners))for(var h in a.listeners)b=a.listeners[h],a.addListener(b.event,b.method);return a};d.fixNewLines=function(a){var b=RegExp("\\n","g");a&&(a=a.replace(b,"<br />"));return a};d.fixBrakes=function(a){if(d.isModern){var b=RegExp("<br>","g");a&&(a=a.replace(b,"\n"))}else a=d.fixNewLines(a);return a};d.deleteObject=function(a,b){if(a){if(void 0===b||null===b)b=20;if(0!==b)if("[object Array]"===Object.prototype.toString.call(a))for(var c=0;c<a.length;c++)d.deleteObject(a[c],b-1),a[c]=null;else if(a&&!a.tagName)try{for(c in a.theme=null,a)a[c]&&("object"==typeof a[c]&&d.deleteObject(a[c],b-1),"function"!=typeof a[c]&&(a[c]=null))}catch(e){}}};d.bounce=function(a,b,c,e,d){return(b/=d)<1/2.75?7.5625*e*b*b+c:b<2/2.75?e*(7.5625*(b-=1.5/2.75)*b+.75)+c:b<2.5/2.75?e*(7.5625*(b-=2.25/2.75)*b+.9375)+c:e*(7.5625*(b-=2.625/2.75)*b+.984375)+c};d.easeInOutQuad=function(a,b,c,e,d){b/=d/2;if(1>b)return e/2*b*b+c;b--;return-e/2*(b*(b-2)-1)+c};d.easeInSine=function(a,b,c,e,d){return-e*Math.cos(b/d*(Math.PI/2))+e+c};d.easeOutSine=function(a,b,c,e,d){return e*Math.sin(b/d*(Math.PI/2))+c};d.easeOutElastic=function(a,b,c,e,d){a=1.70158;var f=0,g=e;if(0===b)return c;if(1==(b/=d))return c+e;f||(f=.3*d);g<Math.abs(e)?(g=e,a=f/4):a=f/(2*Math.PI)*Math.asin(e/g);return g*Math.pow(2,-10*b)*Math.sin(2*(b*d-a)*Math.PI/f)+e+c};d.fixStepE=function(a){a=a.toExponential(0).split("e");var b=Number(a[1]);9==Number(a[0])&&b++;return d.generateNumber(1,b)};d.generateNumber=function(a,b){var c="",e;e=0>b?Math.abs(b)-1:Math.abs(b);var d;for(d=0;d<e;d++)c+="0";return 0>b?Number("0."+c+String(a)):Number(String(a)+c)};d.setCN=function(a,b,c,e){if(a.addClassNames&&b&&(b=b.node)&&c){var d=b.getAttribute("class");a=a.classNamePrefix+"-";e&&(a="");d?b.setAttribute("class",d+" "+a+c):b.setAttribute("class",a+c)}};d.removeCN=function(a,b,c){b&&(b=b.node)&&c&&(b=b.classList)&&b.remove(a.classNamePrefix+"-"+c)};d.parseDefs=function(a,b){for(var c in a){var e=typeof a[c];if(0<a[c].length&&"object"==e)for(var h=0;h<a[c].length;h++)e=document.createElementNS(d.SVG_NS,c),b.appendChild(e),d.parseDefs(a[c][h],e);else"object"==e?(e=document.createElementNS(d.SVG_NS,c),b.appendChild(e),d.parseDefs(a[c],e)):b.setAttribute(c,a[c])}}})();(function(){var d=window.AmCharts;d.AxisBase=d.Class({construct:function(a){this.createEvents("clickItem","rollOverItem","rollOutItem","rollOverGuide","rollOutGuide","clickGuide");this.titleDY=this.y=this.x=this.dy=this.dx=0;this.axisThickness=1;this.axisColor="#000000";this.axisAlpha=1;this.gridCount=this.tickLength=5;this.gridAlpha=.15;this.gridThickness=1;this.gridColor="#000000";this.dashLength=0;this.labelFrequency=1;this.showLastLabel=this.showFirstLabel=!0;this.fillColor="#FFFFFF";this.fillAlpha=0;this.labelsEnabled=!0;this.labelRotation=0;this.autoGridCount=!0;this.offset=0;this.guides=[];this.visible=!0;this.counter=0;this.guides=[];this.ignoreAxisWidth=this.inside=!1;this.minHorizontalGap=75;this.minVerticalGap=35;this.titleBold=!0;this.minorGridEnabled=!1;this.minorGridAlpha=.07;this.autoWrap=!1;this.titleAlign="middle";this.labelOffset=0;this.bcn="axis-";this.centerLabels=!1;this.firstDayOfWeek=1;this.centerLabelOnFullPeriod=this.markPeriodChange=this.boldPeriodBeginning=!0;this.periods=[{period:"fff",count:1},{period:"fff",count:5},{period:"fff",count:10},{period:"fff",count:50},{period:"fff",count:100},{period:"fff",count:500},{period:"ss",count:1},{period:"ss",count:5},{period:"ss",count:10},{period:"ss",count:30},{period:"mm",count:1},{period:"mm",count:5},{period:"mm",count:10},{period:"mm",count:30},{period:"hh",count:1},{period:"hh",count:3},{period:"hh",count:6},{period:"hh",count:12},{period:"DD",count:1},{period:"DD",count:2},{period:"DD",count:3},{period:"DD",count:4},{period:"DD",count:5},{period:"WW",count:1},{period:"MM",count:1},{period:"MM",count:2},{period:"MM",count:3},{period:"MM",count:6},{period:"YYYY",count:1},{period:"YYYY",count:2},{period:"YYYY",count:5},{period:"YYYY",count:10},{period:"YYYY",count:50},{period:"YYYY",count:100}];this.dateFormats=[{period:"fff",format:"NN:SS.QQQ"},{period:"ss",format:"JJ:NN:SS"},{period:"mm",format:"JJ:NN"},{period:"hh",format:"JJ:NN"},{period:"DD",format:"MMM DD"},{period:"WW",format:"MMM DD"},{period:"MM",format:"MMM"},{period:"YYYY",format:"YYYY"}];this.nextPeriod={fff:"ss",ss:"mm",mm:"hh",hh:"DD",DD:"MM",MM:"YYYY"};d.applyTheme(this,a,"AxisBase")},zoom:function(a,b){this.start=a;this.end=b;this.dataChanged=!0;this.draw()},fixAxisPosition:function(){var a=this.position;"H"==this.orientation?("left"==a&&(a="bottom"),"right"==a&&(a="top")):("bottom"==a&&(a="left"),"top"==a&&(a="right"));this.position=a},init:function(){this.createBalloon()},draw:function(){var a=this.chart;this.prevBY=this.prevBX=NaN;this.allLabels=[];this.counter=0;this.destroy();this.fixAxisPosition();this.setBalloonBounds();this.labels=[];var b=a.container,c=b.set();a.gridSet.push(c);this.set=c;b=b.set();a.axesLabelsSet.push(b);this.labelsSet=b;this.axisLine=new this.axisRenderer(this);this.autoGridCount?("V"==this.orientation?(a=this.height/this.minVerticalGap,3>a&&(a=3)):a=this.width/this.minHorizontalGap,this.gridCountR=Math.max(a,1)):this.gridCountR=this.gridCount;this.axisWidth=this.axisLine.axisWidth;this.addTitle()},setOrientation:function(a){this.orientation=a?"H":"V"},addTitle:function(){var a=this.title;this.titleLabel=null;if(a){var b=this.chart,c=this.titleColor;void 0===c&&(c=b.color);var e=this.titleFontSize;isNaN(e)&&(e=b.fontSize+1);a=d.text(b.container,a,c,b.fontFamily,e,this.titleAlign,this.titleBold);d.setCN(b,a,this.bcn+"title");this.titleLabel=a}},positionTitle:function(){var a=this.titleLabel;if(a){var b,c,e=this.labelsSet,h={};0<e.length()?h=e.getBBox():(h.x=0,h.y=0,h.width=this.width,h.height=this.height,d.VML&&(h.y+=this.y,h.x+=this.x));e.push(a);var e=h.x,f=h.y;d.VML&&(f-=this.y,e-=this.x);var g=h.width,h=h.height,k=this.width,l=this.height,m=0,p=a.getBBox().height/2,q=this.inside,n=this.titleAlign;switch(this.position){case"top":b="left"==n?-1:"right"==n?k:k/2;c=f-10-p;break;case"bottom":b="left"==n?-1:"right"==n?k:k/2;c=f+h+10+p;break;case"left":b=e-10-p;q&&(b-=5);m=-90;c=("left"==n?l+1:"right"==n?-1:l/2)+this.titleDY;break;case"right":b=e+g+10+p,q&&(b+=7),c=("left"==n?l+2:"right"==n?-2:l/2)+this.titleDY,m=-90}this.marginsChanged?(a.translate(b,c),this.tx=b,this.ty=c):a.translate(this.tx,this.ty);this.marginsChanged=!1;isNaN(this.titleRotation)||(m=this.titleRotation);0!==m&&a.rotate(m)}},pushAxisItem:function(a,b){var c=this,e=a.graphics();0<e.length()&&(b?c.labelsSet.push(e):c.set.push(e));if(e=a.getLabel())c.labelsSet.push(e),e.click(function(b){c.handleMouse(b,a,"clickItem")}).touchend(function(b){c.handleMouse(b,a,"clickItem")}).mouseover(function(b){c.handleMouse(b,a,"rollOverItem")}).mouseout(function(b){c.handleMouse(b,a,"rollOutItem")})},handleMouse:function(a,b,c){this.fire({type:c,value:b.value,serialDataItem:b.serialDataItem,axis:this,target:b.label,chart:this.chart,event:a})},addGuide:function(a){for(var b=this.guides,c=!1,e=b.length,h=0;h<b.length;h++)b[h]==a&&(c=!0,e=h);a=d.processObject(a,d.Guide,this.theme);a.id||(a.id="guideAuto"+e+"_"+(new Date).getTime());c||b.push(a)},removeGuide:function(a){var b=this.guides,c;for(c=0;c<b.length;c++)b[c]==a&&b.splice(c,1)},handleGuideOver:function(a){clearTimeout(this.chart.hoverInt);var b=a.graphics.getBBox(),c=this.x+b.x+b.width/2,b=this.y+b.y+b.height/2,e=a.fillColor;void 0===e&&(e=a.lineColor);this.chart.showBalloon(a.balloonText,e,!0,c,b);this.fire({type:"rollOverGuide",guide:a,chart:this.chart})},handleGuideOut:function(a){this.chart.hideBalloon();this.fire({type:"rollOutGuide",guide:a,chart:this.chart})},handleGuideClick:function(a){this.chart.hideBalloon();this.fire({type:"clickGuide",guide:a,chart:this.chart})},addEventListeners:function(a,b){var c=this;a.mouseover(function(){c.handleGuideOver(b)});a.mouseup(function(){c.handleGuideClick(b)});a.touchstart(function(){c.handleGuideOver(b)});a.mouseout(function(){c.handleGuideOut(b)})},getBBox:function(){var a;this.labelsSet&&(a=this.labelsSet.getBBox());a?d.VML||(a={x:a.x+this.x,y:a.y+this.y,width:a.width,height:a.height}):a={x:0,y:0,width:0,height:0};return a},destroy:function(){d.remove(this.set);d.remove(this.labelsSet);var a=this.axisLine;a&&d.remove(a.axisSet);d.remove(this.grid0)},chooseMinorFrequency:function(a){for(var b=10;0<b;b--)if(a/
b==Math.round(a/b))return a/b},parseDatesDraw:function(){var a,b=this.chart,c=this.showFirstLabel,e=this.showLastLabel,h,f="",g=d.extractPeriod(this.minPeriod),k=d.getPeriodDuration(g.period,g.count),l,m,p,q,n,t=this.firstDayOfWeek,r=this.boldPeriodBeginning;a=this.minorGridEnabled;var w,z=this.gridAlpha,x,u=this.choosePeriod(0),A=u.period,u=u.count,y=d.getPeriodDuration(A,u);y<k&&(A=g.period,u=g.count,y=k);g=A;"WW"==g&&(g="DD");this.stepWidth=this.getStepWidth(this.timeDifference);var B=Math.ceil(this.timeDifference/
y)+5,D=l=d.resetDateToMin(new Date(this.startTime-y),A,u,t).getTime();if(g==A&&1==u&&this.centerLabelOnFullPeriod||this.autoWrap||this.centerLabels)p=y*this.stepWidth,this.autoWrap&&!this.centerLabels&&(p=-p);this.cellWidth=k*this.stepWidth;q=Math.round(l/y);k=-1;q/2==Math.round(q/2)&&(k=-2,l-=y);q=this.firstTime;var C=0,K=0;a&&1<u&&(w=this.chooseMinorFrequency(u),x=d.getPeriodDuration(A,w),"DD"==A&&(x+=d.getPeriodDuration("hh")),"fff"==A&&(x=1));if(0<this.gridCountR)for(B-5-k>this.autoRotateCount&&!isNaN(this.autoRotateAngle)&&(this.labelRotationR=this.autoRotateAngle),a=k;a<=B;a++){n=q+y*(a+Math.floor((D-q)/y))-C;"DD"==A&&(n+=36E5);n=d.resetDateToMin(new Date(n),A,u,t).getTime();"MM"==A&&(h=(n-l)/y,1.5<=(n-l)/y&&(n=n-(h-1)*y+d.getPeriodDuration("DD",3),n=d.resetDateToMin(new Date(n),A,1).getTime(),C+=y));h=(n-this.startTime)*this.stepWidth;if("radar"==b.type){if(h=this.axisWidth-h,0>h||h>this.axisWidth)continue}else this.rotate?"date"==this.type&&"middle"==this.gridPosition&&(K=-y*this.stepWidth/
2):"date"==this.type&&(h=this.axisWidth-h);f=!1;this.nextPeriod[g]&&(f=this.checkPeriodChange(this.nextPeriod[g],1,n,l,g));l=!1;f&&this.markPeriodChange?(f=this.dateFormatsObject[this.nextPeriod[g]],this.twoLineMode&&(f=this.dateFormatsObject[g]+"\n"+f,f=d.fixBrakes(f)),l=!0):f=this.dateFormatsObject[g];r||(l=!1);this.currentDateFormat=f;f=d.formatDate(new Date(n),f,b);if(a==k&&!c||a==B&&!e)f=" ";this.labelFunction&&(f=this.labelFunction(f,new Date(n),this,A,u,m).toString());this.boldLabels&&(l=!0);m=new this.axisItemRenderer(this,h,f,!1,p,K,!1,l);this.pushAxisItem(m);m=l=n;if(!isNaN(w))for(h=1;h<u;h+=w)this.gridAlpha=this.minorGridAlpha,f=n+x*h,f=d.resetDateToMin(new Date(f),A,w,t).getTime(),f=new this.axisItemRenderer(this,(f-this.startTime)*this.stepWidth,void 0,void 0,void 0,void 0,void 0,void 0,void 0,!0),this.pushAxisItem(f);this.gridAlpha=z}},choosePeriod:function(a){var b=d.getPeriodDuration(this.periods[a].period,this.periods[a].count),c=this.periods;return this.timeDifference<b&&0<a?c[a-1]:Math.ceil(this.timeDifference/b)<=this.gridCountR?c[a]:a+1<c.length?this.choosePeriod(a+1):c[a]},getStepWidth:function(a){var b;this.startOnAxis?(b=this.axisWidth/(a-1),1==a&&(b=this.axisWidth)):b=this.axisWidth/a;return b},timeZoom:function(a,b){this.startTime=a;this.endTime=b},minDuration:function(){var a=d.extractPeriod(this.minPeriod);return d.getPeriodDuration(a.period,a.count)},checkPeriodChange:function(a,b,c,e,h){c=new Date(c);var f=new Date(e),g=this.firstDayOfWeek;e=b;"DD"==a&&(b=1);c=d.resetDateToMin(c,a,b,g).getTime();b=d.resetDateToMin(f,a,b,g).getTime();return"DD"==a&&"hh"!=h&&c-b<d.getPeriodDuration(a,e)-d.getPeriodDuration("hh",1)?!1:c!=b?!0:!1},generateDFObject:function(){this.dateFormatsObject={};var a;for(a=0;a<this.dateFormats.length;a++){var b=this.dateFormats[a];this.dateFormatsObject[b.period]=b.format}},hideBalloon:function(){this.balloon&&this.balloon.hide&&this.balloon.hide();this.prevBY=this.prevBX=NaN},formatBalloonText:function(a){return a},showBalloon:function(a,b,c,e){var d=this.offset;switch(this.position){case"bottom":b=this.height+d;break;case"top":b=-d;break;case"left":a=-d;break;case"right":a=this.width+d}c||(c=this.currentDateFormat);if("V"==this.orientation){if(0>b||b>this.height)return;if(isNaN(b)){this.hideBalloon();return}b=this.adjustBalloonCoordinate(b,e);e=this.coordinateToValue(b)}else{if(0>a||a>this.width)return;if(isNaN(a)){this.hideBalloon();return}a=this.adjustBalloonCoordinate(a,e);e=this.coordinateToValue(a)}var f;if(d=this.chart.chartCursor)f=d.index;if(this.balloon&&void 0!==e&&this.balloon.enabled){if(this.balloonTextFunction){if("date"==this.type||!0===this.parseDates)e=new Date(e);e=this.balloonTextFunction(e)}else this.balloonText?e=this.formatBalloonText(this.balloonText,f,c):isNaN(e)||(e=this.formatValue(e,c));if(a!=this.prevBX||b!=this.prevBY)this.balloon.setPosition(a,b),this.prevBX=a,this.prevBY=b,e&&this.balloon.showBalloon(e)}},adjustBalloonCoordinate:function(a){return a},createBalloon:function(){var a=this.chart,b=a.chartCursor;b&&(b=b.cursorPosition,"mouse"!=b&&(this.stickBalloonToCategory=!0),"start"==b&&(this.stickBalloonToStart=!0),"ValueAxis"==this.cname&&(this.stickBalloonToCategory=!1));this.balloon&&(this.balloon.destroy&&this.balloon.destroy(),d.extend(this.balloon,a.balloon,!0))},setBalloonBounds:function(){var a=this.balloon;if(a){var b=this.chart;a.cornerRadius=0;a.shadowAlpha=0;a.borderThickness=1;a.borderAlpha=1;a.adjustBorderColor=!1;a.showBullet=!1;this.balloon=a;a.chart=b;a.mainSet=b.plotBalloonsSet;a.pointerWidth=this.tickLength;if(this.parseDates||"date"==this.type)a.pointerWidth=0;a.className=this.id;b="V";"V"==this.orientation&&(b="H");this.stickBalloonToCategory||(a.animationDuration=0);var c,e,d,f,g=this.inside,k=this.width,l=this.height;switch(this.position){case"bottom":c=0;e=k;g?(d=0,f=l):(d=l,f=l+1E3);break;case"top":c=0;e=k;g?(d=0,f=l):(d=-1E3,f=0);break;case"left":d=0;f=l;g?(c=0,e=k):(c=-1E3,e=0);break;case"right":d=0,f=l,g?(c=0,e=k):(c=k,e=k+1E3)}a.drop||(a.pointerOrientation=b);a.setBounds(c,d,e,f)}}})})();(function(){var d=window.AmCharts;d.ValueAxis=d.Class({inherits:d.AxisBase,construct:function(a){this.cname="ValueAxis";this.createEvents("axisChanged","logarithmicAxisFailed","axisZoomed","axisIntZoomed");d.ValueAxis.base.construct.call(this,a);this.dataChanged=!0;this.stackType="none";this.position="left";this.unitPosition="right";this.includeAllValues=this.recalculateToPercents=this.includeHidden=this.includeGuidesInMinMax=this.integersOnly=!1;this.durationUnits={DD:"d. ",hh:":",mm:":",ss:""};this.scrollbar=!1;this.baseValue=0;this.radarCategoriesEnabled=!0;this.axisFrequency=1;this.gridType="polygons";this.useScientificNotation=!1;this.axisTitleOffset=10;this.pointPosition="axis";this.minMaxMultiplier=1;this.logGridLimit=2;this.totalTextOffset=this.treatZeroAs=0;this.minPeriod="ss";this.relativeStart=0;this.relativeEnd=1;d.applyTheme(this,a,this.cname)},updateData:function(){0>=this.gridCountR&&(this.gridCountR=1);this.totals=[];this.data=this.chart.chartData;var a=this.chart;"xy"!=a.type&&(this.stackGraphs("smoothedLine"),this.stackGraphs("line"),this.stackGraphs("column"),this.stackGraphs("step"));this.recalculateToPercents&&this.recalculate();this.synchronizationMultiplier&&this.synchronizeWith?(d.isString(this.synchronizeWith)&&(this.synchronizeWith=a.getValueAxisById(this.synchronizeWith)),this.synchronizeWith&&(this.synchronizeWithAxis(this.synchronizeWith),this.foundGraphs=!0)):(this.foundGraphs=!1,this.getMinMax(),0===this.start&&this.end==this.data.length-1&&isNaN(this.minZoom)&&isNaN(this.maxZoom)&&(this.fullMin=this.min,this.fullMax=this.max,"date"!=this.type&&this.strictMinMax&&(isNaN(this.minimum)||(this.fullMin=this.minimum),isNaN(this.maximum)||(this.fullMax=this.maximum)),this.logarithmic&&(this.fullMin=this.logMin,0===this.fullMin&&(this.fullMin=this.treatZeroAs)),"date"==this.type&&(this.minimumDate||(this.fullMin=this.minRR),this.maximumDate||(this.fullMax=this.maxRR),this.strictMinMax&&(this.minimumDate&&(this.fullMin=this.minimumDate.getTime()),this.maximumDate&&(this.fullMax=this.maximumDate.getTime())))))},draw:function(){d.ValueAxis.base.draw.call(this);var a=this.chart,b=this.set;this.labelRotationR=this.labelRotation;d.setCN(a,this.set,"value-axis value-axis-"+this.id);d.setCN(a,this.labelsSet,"value-axis value-axis-"+this.id);d.setCN(a,this.axisLine.axisSet,"value-axis value-axis-"+this.id);var c=this.type;"duration"==c&&(this.duration="ss");!0===this.dataChanged&&(this.updateData(),this.dataChanged=!1);"date"==c&&(this.logarithmic=!1,this.min=this.minRR,this.max=this.maxRR,this.reversed=!1,this.getDateMinMax());if(this.logarithmic){var e=this.treatZeroAs,h=this.getExtremes(0,this.data.length-1).min;!isNaN(this.minimum)&&this.minimum<h&&(h=this.minimum);this.logMin=h;this.minReal<h&&(this.minReal=h);isNaN(this.minReal)&&(this.minReal=h);0<e&&0===h&&(this.minReal=h=e);if(0>=h||0>=this.minimum){this.fire({type:"logarithmicAxisFailed",chart:a});return}}this.grid0=null;var f,g,k=a.dx,l=a.dy,e=!1,h=this.logarithmic;if(isNaN(this.min)||isNaN(this.max)||!this.foundGraphs||Infinity==this.min||-Infinity==this.max)e=!0;else{"date"==this.type&&this.min==this.max&&(this.max+=this.minDuration(),this.min-=this.minDuration());var m=this.labelFrequency,p=this.showFirstLabel,q=this.showLastLabel,n=1,t=0;this.minCalc=this.min;this.maxCalc=this.max;if(this.strictMinMax&&(isNaN(this.minimum)||(this.min=this.minimum),isNaN(this.maximum)||(this.max=this.maximum),this.min==this.max))return;isNaN(this.minZoom)||(this.minReal=this.min=this.minZoom);isNaN(this.maxZoom)||(this.max=this.maxZoom);if(this.logarithmic){g=this.fullMin;var r=this.fullMax;isNaN(this.minimum)||(g=this.minimum);isNaN(this.maximum)||(r=this.maximum);var r=Math.log(r)*Math.LOG10E-Math.log(g)*Math.LOG10E,w=Math.log(this.max)/Math.LN10-Math.log(g)*Math.LOG10E;this.relativeStart=d.roundTo((Math.log(this.minReal)/Math.LN10-Math.log(g)*Math.LOG10E)/r,5);this.relativeEnd=d.roundTo(w/r,5)}else this.relativeStart=d.roundTo(d.fitToBounds((this.min-this.fullMin)/(this.fullMax-this.fullMin),0,1),5),this.relativeEnd=
d.roundTo(d.fitToBounds((this.max-this.fullMin)/(this.fullMax-this.fullMin),0,1),5);var r=Math.round((this.maxCalc-this.minCalc)/this.step)+1,z;!0===h?(z=Math.log(this.max)*Math.LOG10E-Math.log(this.minReal)*Math.LOG10E,this.stepWidth=this.axisWidth/z,z>this.logGridLimit&&(r=Math.ceil(Math.log(this.max)*Math.LOG10E)+1,t=Math.round(Math.log(this.minReal)*Math.LOG10E),r>this.gridCountR&&(n=Math.ceil(r/this.gridCountR)))):this.stepWidth=this.axisWidth/(this.max-this.min);var x=0;1>this.step&&-1<this.step&&
(x=d.getDecimals(this.step));this.integersOnly&&(x=0);x>this.maxDecCount&&(x=this.maxDecCount);w=this.precision;isNaN(w)||(x=w);isNaN(this.maxZoom)&&(this.max=d.roundTo(this.max,this.maxDecCount),this.min=d.roundTo(this.min,this.maxDecCount));g={};g.precision=x;g.decimalSeparator=a.nf.decimalSeparator;g.thousandsSeparator=a.nf.thousandsSeparator;this.numberFormatter=g;var u;this.exponential=!1;for(g=t;g<r;g+=n){var A=d.roundTo(this.step*g+this.min,x);-1!=String(A).indexOf("e")&&(this.exponential=!0)}this.duration&&(this.maxInterval=d.getMaxInterval(this.max,this.duration));var x=this.step,y,A=this.minorGridAlpha;this.minorGridEnabled&&(y=this.getMinorGridStep(x,this.stepWidth*x));if(this.autoGridCount||0!==this.gridCount)if("date"==c)this.generateDFObject(),this.timeDifference=this.max-this.min,this.maxTime=this.lastTime=this.max,this.startTime=this.firstTime=this.min,this.parseDatesDraw();else for(r>=this.autoRotateCount&&!isNaN(this.autoRotateAngle)&&(this.labelRotationR=this.autoRotateAngle),c=this.minCalc,h&&(r++,c=this.maxCalc-r*x),this.gridCountReal=r,g=this.startCount=t;g<r;g+=n)if(t=x*g+c,t=d.roundTo(t,this.maxDecCount+1),!this.integersOnly||Math.round(t)==t)if(isNaN(w)||Number(d.toFixed(t,w))==t){if(!0===h)if(z>this.logGridLimit)t=Math.pow(10,g);else if(0>=t&&(t=c+x*g+x/2,0>=t))continue;u=this.formatValue(t,!1,g);Math.round(g/m)!=g/m&&(u=void 0);if(0===g&&!p||g==r-1&&!q)u=" ";f=this.getCoordinate(t);var B;this.rotate&&this.autoWrap&&(B=this.stepWidth*x-10);u=new this.axisItemRenderer(this,f,u,void 0,B,void 0,void 0,this.boldLabels);this.pushAxisItem(u);if(t==this.baseValue&&"radar"!=a.type){var D,C,K=this.width,H=this.height;"H"==this.orientation?0<=f&&f<=K+1&&(D=[f,f,f+k],C=[H,0,l]):0<=f&&f<=H+1&&(D=[0,K,K+k],C=[f,f,f+l]);D&&(f=d.fitToBounds(2*this.gridAlpha,0,1),isNaN(this.zeroGridAlpha)||(f=this.zeroGridAlpha),f=d.line(a.container,D,C,this.gridColor,f,1,this.dashLength),f.translate(this.x,this.y),this.grid0=f,a.axesSet.push(f),f.toBack(),d.setCN(a,f,this.bcn+"zero-grid-"+this.id),d.setCN(a,f,this.bcn+"zero-grid"))}if(!isNaN(y)&&0<A&&g<r-1){f=x/y;h&&(y=x*(g+n)+this.minCalc,y=d.roundTo(y,this.maxDecCount+1),z>this.logGridLimit&&(y=Math.pow(10,g+n)),f=9,y=(y-t)/f);K=this.gridAlpha;this.gridAlpha=this.minorGridAlpha;for(H=1;H<f;H++){var Q=this.getCoordinate(t+y*H),Q=new this.axisItemRenderer(this,Q,"",!1,0,0,!1,!1,0,!0);this.pushAxisItem(Q)}this.gridAlpha=K}}z=this.guides;B=z.length;if(0<B){D=this.fillAlpha;for(g=this.fillAlpha=0;g<B;g++)C=z[g],k=NaN,y=C.above,isNaN(C.toValue)||
(k=this.getCoordinate(C.toValue),u=new this.axisItemRenderer(this,k,"",!0,NaN,NaN,C),this.pushAxisItem(u,y)),l=NaN,isNaN(C.value)||(l=this.getCoordinate(C.value),u=new this.axisItemRenderer(this,l,C.label,!0,NaN,(k-l)/2,C),this.pushAxisItem(u,y)),isNaN(k)&&(l-=3,k=l+3),u&&(m=u.label)&&this.addEventListeners(m,C),isNaN(k-l)||0>l&&0>k||(k=new this.guideFillRenderer(this,l,k,C),this.pushAxisItem(k,y),y=k.graphics(),C.graphics=y,this.addEventListeners(y,C));this.fillAlpha=D}u=this.baseValue;this.min>
this.baseValue&&this.max>this.baseValue&&(u=this.min);this.min<this.baseValue&&this.max<this.baseValue&&(u=this.max);h&&u<this.minReal&&(u=this.minReal);this.baseCoord=this.getCoordinate(u,!0);u={type:"axisChanged",target:this,chart:a};u.min=h?this.minReal:this.min;u.max=this.max;this.fire(u);this.axisCreated=!0}h=this.axisLine.set;u=this.labelsSet;b.translate(this.x,this.y);u.translate(this.x,this.y);this.positionTitle();"radar"!=a.type&&h.toFront();!this.visible||e?(b.hide(),h.hide(),u.hide()):(b.show(),h.show(),u.show());this.axisY=this.y;this.axisX=this.x},getDateMinMax:function(){this.minimumDate&&(this.minimumDate instanceof Date||(this.minimumDate=d.getDate(this.minimumDate,this.chart.dataDateFormat,"fff")),this.min=this.minimumDate.getTime());this.maximumDate&&(this.maximumDate instanceof Date||(this.maximumDate=d.getDate(this.maximumDate,this.chart.dataDateFormat,"fff")),this.max=this.maximumDate.getTime())},formatValue:function(a,b,c){var e=this.exponential,h=this.logarithmic,f=this.numberFormatter,g=this.chart;if(f)return!0===this.logarithmic&&(e=-1!=String(a).indexOf("e")?!0:!1),this.useScientificNotation&&(e=!0),this.usePrefixes&&(e=!1),e?(c=-1==String(a).indexOf("e")?a.toExponential(15):String(a),e=c.split("e"),c=Number(e[0]),e=Number(e[1]),c=d.roundTo(c,14),b||isNaN(this.precision)||(c=d.roundTo(c,this.precision)),10==c&&(c=1,e+=1),c=c+"e"+e,0===a&&(c="0"),1==a&&(c="1")):(h&&(e=String(a).split("."),e[1]?(f.precision=e[1].length,0>c&&(f.precision=Math.abs(c)),b&&1<a&&(f.precision=0),b||isNaN(this.precision)||(f.precision=this.precision)):f.precision=-1),c=this.usePrefixes?d.addPrefix(a,g.prefixesOfBigNumbers,g.prefixesOfSmallNumbers,f,!b):d.formatNumber(a,f,f.precision)),this.duration&&(b&&(f.precision=0),c=d.formatDuration(a,this.duration,"",this.durationUnits,this.maxInterval,f)),"date"==this.type&&(c=d.formatDate(new Date(a),this.currentDateFormat,g)),this.recalculateToPercents?c+="%":(b=this.unit)&&(c="left"==this.unitPosition?b+c:c+b),this.labelFunction&&(c="date"==this.type?this.labelFunction(c,new Date(a),this).toString():this.labelFunction(a,c,this).toString()),c},getMinorGridStep:function(a,b){var c=[5,4,2];60>b&&c.shift();for(var e=Math.floor(Math.log(Math.abs(a))*Math.LOG10E),d=0;d<c.length;d++){var f=a/c[d],g=Math.floor(Math.log(Math.abs(f))*Math.LOG10E);if(!(1<Math.abs(e-g)))if(1>a){if(g=Math.pow(10,-g)*f,g==Math.round(g))return f}else if(f==Math.round(f))return f}},stackGraphs:function(a){var b=this.stackType;"stacked"==b&&(b="regular");"line"==b&&(b="none");"100% stacked"==b&&(b="100%");this.stackType=b;var c=[],e=[],h=[],f=[],g,k=this.chart.graphs,l,m,p,q,n,t=this.baseValue,r=!1;if("line"==a||"step"==a||"smoothedLine"==a)r=!0;if(r&&("regular"==b||"100%"==b))for(q=0;q<k.length;q++)p=k[q],p.stackGraph=null,p.hidden||(m=p.type,p.chart==this.chart&&p.valueAxis==this&&a==m&&p.stackable&&(l&&(p.stackGraph=l),l=p));p=this.start-10;l=this.end+10;q=this.data.length-1;p=d.fitToBounds(p,0,q);l=d.fitToBounds(l,0,q);for(n=p;n<=l;n++){var w=0;for(q=0;q<k.length;q++)if(p=k[q],p.hidden)p.newStack&&(h[n]=NaN,e[n]=NaN);else if(m=p.type,p.chart==this.chart&&p.valueAxis==this&&a==m&&p.stackable)if(m=this.data[n].axes[this.id].graphs[p.id],g=m.values.value,isNaN(g))p.newStack&&(h[n]=NaN,e[n]=NaN);else{var z=d.getDecimals(g);w<z&&(w=z);isNaN(f[n])?f[n]=Math.abs(g):f[n]+=Math.abs(g);f[n]=d.roundTo(f[n],w);z=p.fillToGraph;r&&z&&(z=this.data[n].axes[this.id].graphs[z.id])&&(m.values.open=z.values.value);"regular"==b&&(r&&(isNaN(c[n])?(c[n]=g,m.values.close=g,m.values.open=this.baseValue):(isNaN(g)?m.values.close=c[n]:m.values.close=g+c[n],m.values.open=c[n],c[n]=m.values.close)),"column"==a&&(p.newStack&&(h[n]=NaN,e[n]=NaN),m.values.close=g,0>g?(m.values.close=g,isNaN(e[n])?m.values.open=t:(m.values.close+=e[n],m.values.open=e[n]),e[n]=m.values.close):(m.values.close=g,isNaN(h[n])?m.values.open=t:(m.values.close+=h[n],m.values.open=h[n]),h[n]=m.values.close)))}}for(n=this.start;n<=this.end;n++)for(q=0;q<k.length;q++)(p=k[q],p.hidden)?p.newStack&&(h[n]=NaN,e[n]=NaN):(m=p.type,p.chart==this.chart&&p.valueAxis==this&&a==m&&p.stackable&&(m=this.data[n].axes[this.id].graphs[p.id],g=m.values.value,isNaN(g)||(c=g/f[n]*100,m.values.percents=c,m.values.total=f[n],p.newStack&&(h[n]=NaN,e[n]=NaN),"100%"==b&&(isNaN(e[n])&&(e[n]=0),isNaN(h[n])&&(h[n]=0),0>c?(m.values.close=d.fitToBounds(c+e[n],-100,100),m.values.open=e[n],e[n]=m.values.close):(m.values.close=d.fitToBounds(c+h[n],-100,100),m.values.open=h[n],h[n]=m.values.close)))))},recalculate:function(){var a=this.chart,b=a.graphs,c;for(c=0;c<b.length;c++){var e=b[c];if(e.valueAxis==this){var h="value";if("candlestick"==e.type||"ohlc"==e.type)h="open";var f,g,k=this.end+2,k=d.fitToBounds(this.end+1,0,this.data.length-1),l=this.start;0<l&&l--;var m;g=this.start;e.compareFromStart&&(g=0);if(!isNaN(a.startTime)&&(m=a.categoryAxis)){var p=m.minDuration(),p=new Date(a.startTime+p/2),q=d.resetDateToMin(new Date(a.startTime),m.minPeriod).getTime();d.resetDateToMin(new Date(p),m.minPeriod).getTime()>q&&g++}if(m=a.recalculateFromDate)m=d.getDate(m,a.dataDateFormat,"fff"),g=a.getClosestIndex(a.chartData,"time",m.getTime(),!0,0,a.chartData.length),k=a.chartData.length-1;for(m=g;m<=k&&(g=this.data[m].axes[this.id].graphs[e.id],f=g.values[h],e.recalculateValue&&(f=g.dataContext[e.valueField+e.recalculateValue]),isNaN(f));m++);this.recBaseValue=f;for(h=l;h<=k;h++){g=this.data[h].axes[this.id].graphs[e.id];g.percents={};var l=g.values,n;for(n in l)g.percents[n]="percents"!=n?l[n]/f*100-100:l[n]}}}},getMinMax:function(){var a=!1,b=this.chart,c=b.graphs,e;for(e=0;e<c.length;e++){var h=c[e].type;("line"==h||"step"==h||"smoothedLine"==h)&&this.expandMinMax&&(a=!0)}a&&(0<this.start&&this.start--,this.end<this.data.length-1&&this.end++);"serial"==b.type&&(!0!==b.categoryAxis.parseDates||a||this.end<this.data.length-1&&this.end++);this.includeAllValues&&(this.start=0,this.end=this.data.length-1);a=this.minMaxMultiplier;b=this.getExtremes(this.start,this.end);this.min=b.min;this.max=b.max;this.minRR=this.min;this.maxRR=this.max;a=(this.max-this.min)*(a-1);this.min-=a;this.max+=a;a=this.guides.length;if(this.includeGuidesInMinMax&&0<a)for(b=0;b<a;b++)c=this.guides[b],c.toValue<this.min&&(this.min=c.toValue),c.value<this.min&&(this.min=c.value),c.toValue>this.max&&(this.max=c.toValue),c.value>this.max&&(this.max=c.value);isNaN(this.minimum)||(this.min=this.minimum);isNaN(this.maximum)||(this.max=this.maximum);"date"==this.type&&this.getDateMinMax();this.min>this.max&&(a=this.max,this.max=this.min,this.min=a);isNaN(this.minZoom)||(this.min=this.minZoom);isNaN(this.maxZoom)||(this.max=this.maxZoom);this.minCalc=this.min;this.maxCalc=this.max;this.minReal=this.min;this.maxReal=this.max;0===this.min&&0===this.max&&(this.max=9);this.min>this.max&&(this.min=this.max-1);a=this.min;b=this.max;c=this.max-this.min;e=0===c?Math.pow(10,Math.floor(Math.log(Math.abs(this.max))*Math.LOG10E))/10:Math.pow(10,Math.floor(Math.log(Math.abs(c))*Math.LOG10E))/10;isNaN(this.maximum)&&(this.max=Math.ceil(this.max/e)*e+e);isNaN(this.minimum)&&(this.min=
Math.floor(this.min/e)*e-e);0>this.min&&0<=a&&(this.min=0);0<this.max&&0>=b&&(this.max=0);"100%"==this.stackType&&(this.min=0>this.min?-100:0,this.max=0>this.max?0:100);c=this.max-this.min;e=Math.pow(10,Math.floor(Math.log(Math.abs(c))*Math.LOG10E))/10;this.step=Math.ceil(c/this.gridCountR/e)*e;c=Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E));c=d.fixStepE(c);e=Math.ceil(this.step/c);5<e&&(e=10);5>=e&&2<e&&(e=5);this.step=Math.ceil(this.step/(c*e))*c*e;isNaN(this.setStep)||(this.step=
this.setStep);1>c?(this.maxDecCount=Math.abs(Math.log(Math.abs(c))*Math.LOG10E),this.maxDecCount=Math.round(this.maxDecCount),this.step=d.roundTo(this.step,this.maxDecCount+1)):this.maxDecCount=0;this.min=this.step*Math.floor(this.min/this.step);this.max=this.step*Math.ceil(this.max/this.step);0>this.min&&0<=a&&(this.min=0);0<this.max&&0>=b&&(this.max=0);1<this.minReal&&1<this.max-this.minReal&&(this.minReal=Math.floor(this.minReal));c=Math.pow(10,Math.floor(Math.log(Math.abs(this.minReal))*Math.LOG10E));0===this.min&&(this.minReal=c);0===this.min&&1<this.minReal&&(this.minReal=1);0<this.min&&0<this.minReal-this.step&&(this.minReal=this.min+this.step<this.minReal?this.min+this.step:this.min);this.logarithmic&&(2<Math.log(b)*Math.LOG10E-Math.log(a)*Math.LOG10E?(this.minReal=this.min=Math.pow(10,Math.floor(Math.log(Math.abs(a))*Math.LOG10E)),this.maxReal=this.max=Math.pow(10,Math.ceil(Math.log(Math.abs(b))*Math.LOG10E))):(a=Math.pow(10,Math.floor(Math.log(Math.abs(a))*Math.LOG10E))/10,Math.pow(10,Math.floor(Math.log(Math.abs(this.min))*
Math.LOG10E))/10<a&&(this.minReal=this.min=10*a)))},getExtremes:function(a,b){var c,e,d;for(d=a;d<=b;d++){var f=this.data[d].axes[this.id].graphs,g;for(g in f)if(f.hasOwnProperty(g)){var k=this.chart.graphsById[g];if(k.includeInMinMax&&(!k.hidden||this.includeHidden)){isNaN(c)&&(c=Infinity);isNaN(e)&&(e=-Infinity);this.foundGraphs=!0;k=f[g].values;this.recalculateToPercents&&(k=f[g].percents);var l;if(this.minMaxField)l=k[this.minMaxField],l<c&&(c=l),l>e&&(e=l);else for(var m in k)k.hasOwnProperty(m)&&
"percents"!=m&&"total"!=m&&"error"!=m&&(l=k[m],l<c&&(c=l),l>e&&(e=l))}}}return{min:c,max:e}},zoomOut:function(a){this.maxZoom=this.minZoom=NaN;this.zoomToRelativeValues(0,1,a)},zoomToRelativeValues:function(a,b,c){if(this.reversed){var e=a;a=1-b;b=1-e}var d=this.fullMax,e=this.fullMin,f=e+(d-e)*a,g=e+(d-e)*b;0<=this.minimum&&0>f&&(f=0);this.logarithmic&&(isNaN(this.minimum)||(e=this.minimum),isNaN(this.maximum)||(d=this.maximum),d=Math.log(d)*Math.LOG10E-Math.log(e)*Math.LOG10E,f=Math.pow(10,d*a+
Math.log(e)*Math.LOG10E),g=Math.pow(10,d*b+Math.log(e)*Math.LOG10E));return this.zoomToValues(f,g,c)},zoomToValues:function(a,b,c){if(b<a){var e=b;b=a;a=e}var h=this.fullMax,e=this.fullMin;this.relativeStart=d.roundTo((a-e)/(h-e),9);this.relativeEnd=d.roundTo((b-e)/(h-e),9);if(this.logarithmic){isNaN(this.minimum)||(e=this.minimum);isNaN(this.maximum)||(h=this.maximum);var h=Math.log(h)*Math.LOG10E-Math.log(e)*Math.LOG10E,f=Math.log(b)/Math.LN10-Math.log(e)*Math.LOG10E;this.relativeStart=d.roundTo((Math.log(a)/
Math.LN10-Math.log(e)*Math.LOG10E)/h,9);this.relativeEnd=d.roundTo(f/h,9)}if(this.minZoom!=a||this.maxZoom!=b)return this.minZoom=a,this.maxZoom=b,e={type:"axisZoomed"},e.chart=this.chart,e.valueAxis=this,e.startValue=a,e.endValue=b,e.relativeStart=this.relativeStart,e.relativeEnd=this.relativeEnd,this.prevStartValue==a&&this.prevEndValue==b||this.fire(e),this.prevStartValue=a,this.prevEndValue=b,c||(a={},d.copyProperties(e,a),a.type="axisIntZoomed",this.fire(a)),0===this.relativeStart&&1==this.relativeEnd&&
(this.maxZoom=this.minZoom=NaN),!0},coordinateToValue:function(a){if(isNaN(a))return NaN;var b=this.axisWidth,c=this.stepWidth,e=this.reversed,d=this.rotate,f=this.min,g=this.minReal;return!0===this.logarithmic?Math.pow(10,(d?!0===e?(b-a)/c:a/c:!0===e?a/c:(b-a)/c)+Math.log(g)*Math.LOG10E):!0===e?d?f-(a-b)/c:a/c+f:d?a/c+f:f-(a-b)/c},getCoordinate:function(a,b){if(isNaN(a))return NaN;var c=this.rotate,e=this.reversed,d=this.axisWidth,f=this.stepWidth,g=this.min,k=this.minReal;!0===this.logarithmic?
(0===a&&(a=this.treatZeroAs),g=Math.log(a)*Math.LOG10E-Math.log(k)*Math.LOG10E,c=c?!0===e?d-f*g:f*g:!0===e?f*g:d-f*g):c=!0===e?c?d-f*(a-g):f*(a-g):c?f*(a-g):d-f*(a-g);1E7<Math.abs(c)&&(c=c/Math.abs(c)*1E7);b||(c=Math.round(c));return c},synchronizeWithAxis:function(a){this.synchronizeWith=a;this.listenTo(this.synchronizeWith,"axisChanged",this.handleSynchronization)},handleSynchronization:function(){if(this.synchronizeWith){d.isString(this.synchronizeWith)&&(this.synchronizeWith=this.chart.getValueAxisById(this.synchronizeWith));var a=this.synchronizeWith,b=a.min,c=a.max,a=a.step,e=this.synchronizationMultiplier;e&&(this.min=b*e,this.max=c*e,this.step=a*e,b=Math.abs(Math.log(Math.abs(Math.pow(10,Math.floor(Math.log(Math.abs(this.step))*Math.LOG10E))))*Math.LOG10E),this.maxDecCount=b=Math.round(b),this.draw())}}})})();(function(){var d=window.AmCharts;d.RecAxis=d.Class({construct:function(a){var b=a.chart,c=a.axisThickness,e=a.axisColor,h=a.axisAlpha,f=a.offset,g=a.dx,k=a.dy,l=a.x,m=a.y,p=a.height,q=a.width,n=b.container;"H"==a.orientation?(e=d.line(n,[0,q],[0,0],e,h,c),this.axisWidth=a.width,"bottom"==a.position?(k=c/2+f+p+m-1,c=l):(k=-c/2-f+m+k,c=g+l)):(this.axisWidth=a.height,"right"==a.position?(e=d.line(n,[0,0,-g],[0,p,p-k],e,h,c),k=m+k,c=c/2+f+g+q+l-1):(e=d.line(n,[0,0],[0,p],e,h,c),k=m,c=-c/2-f+l));e.translate(c,k);c=b.container.set();c.push(e);b.axesSet.push(c);d.setCN(b,e,a.bcn+"line");this.axisSet=c;this.set=e}})})();(function(){var d=window.AmCharts;d.RecItem=d.Class({construct:function(a,b,c,e,h,f,g,k,l,m,p,q){b=Math.round(b);var n=a.chart;this.value=c;void 0==c&&(c="");l||(l=0);void 0==e&&(e=!0);var t=n.fontFamily,r=a.fontSize;void 0==r&&(r=n.fontSize);var w=a.color;void 0==w&&(w=n.color);void 0!==p&&(w=p);var z=a.chart.container,x=z.set();this.set=x;var u=a.axisThickness,A=a.axisColor,y=a.axisAlpha,B=a.tickLength,D=a.gridAlpha,C=a.gridThickness,K=a.gridColor,H=a.dashLength,Q=a.fillColor,M=a.fillAlpha,P=a.labelsEnabled;p=a.labelRotationR;var ia=a.counter,I=a.inside,aa=a.labelOffset,ma=a.dx,na=a.dy,Pa=a.orientation,Z=a.position,da=a.previousCoord,X=a.height,xa=a.width,ea=a.offset,fa,Ba;g?(void 0!==g.id&&(q=n.classNamePrefix+"-guide-"+g.id),P=!0,isNaN(g.tickLength)||(B=g.tickLength),void 0!=g.lineColor&&(K=g.lineColor),void 0!=g.color&&(w=g.color),isNaN(g.lineAlpha)||(D=g.lineAlpha),isNaN(g.dashLength)||(H=g.dashLength),isNaN(g.lineThickness)||(C=g.lineThickness),!0===g.inside&&(I=!0,0<ea&&(ea=0)),isNaN(g.labelRotation)||(p=g.labelRotation),isNaN(g.fontSize)||(r=g.fontSize),g.position&&(Z=g.position),void 0!==g.boldLabel&&(k=g.boldLabel),isNaN(g.labelOffset)||(aa=g.labelOffset)):""===c&&(B=0);m&&!isNaN(a.minorTickLength)&&(B=a.minorTickLength);var ga="start";0<h&&(ga="middle");a.centerLabels&&(ga="middle");var V=p*Math.PI/180,Y,Da,G=0,v=0,oa=0,ha=Y=0,Qa=0;"V"==Pa&&(p=0);var ca;P&&""!==c&&(ca=a.autoWrap&&0===p?d.wrappedText(z,c,w,t,r,ga,k,Math.abs(h),0):d.text(z,c,w,t,r,ga,k),ga=ca.getBBox(),ha=ga.width,Qa=ga.height);if("H"==Pa){if(0<=b&&b<=xa+1&&(0<B&&0<y&&b+l<=xa+1&&(fa=d.line(z,[b+l,b+l],[0,B],A,y,C),x.push(fa)),0<D&&(Ba=d.line(z,[b,b+ma,b+ma],[X,X+na,na],K,D,C,H),x.push(Ba))),v=0,G=b,g&&90==p&&I&&(G-=r),!1===e?(ga="start",v="bottom"==Z?I?v+B:v-B:I?v-B:v+B,G+=3,0<h&&(G+=h/2-3,ga="middle"),0<p&&(ga="middle")):ga="middle",1==ia&&0<M&&!g&&!m&&da<xa&&(e=d.fitToBounds(b,0,xa),da=d.fitToBounds(da,0,xa),Y=e-da,0<Y&&(Da=d.rect(z,Y,a.height,Q,M),Da.translate(e-Y+ma,na),x.push(Da))),"bottom"==Z?(v+=X+r/2+ea,I?(0<p?(v=X-ha/2*Math.sin(V)-B-3,a.centerRotatedLabels||(G+=ha/2*Math.cos(V)-4+2)):0>p?(v=X+ha*Math.sin(V)-B-3+2,G+=-ha*Math.cos(V)-Qa*Math.sin(V)-4):v-=B+r+3+3,v-=aa):(0<p?(v=X+ha/2*Math.sin(V)+B+3,a.centerRotatedLabels||(G-=ha/2*Math.cos(V))):0>p?(v=X+B+3-ha/2*Math.sin(V)+2,G+=ha/2*Math.cos(V)):v+=B+u+3+3,v+=aa)):(v+=na+r/2-ea,G+=ma,I?(0<p?(v=ha/2*Math.sin(V)+B+3,a.centerRotatedLabels||(G-=ha/2*Math.cos(V))):v+=B+3,v+=aa):(0<p?(v=-(ha/2)*Math.sin(V)-B-6,a.centerRotatedLabels||(G+=ha/2*Math.cos(V))):v-=B+
r+3+u+3,v-=aa)),"bottom"==Z?Y=(I?X-B-1:X+u-1)+ea:(oa=ma,Y=(I?na:na-B-u+1)-ea),f&&(G+=f),r=G,0<p&&(r+=ha/2*Math.cos(V)),ca&&(f=0,I&&(f=ha/2*Math.cos(V)),r+f>xa+2||0>r))ca.remove(),ca=null}else{0<=b&&b<=X+1&&(0<B&&0<y&&b+l<=X+1&&(fa=d.line(z,[0,B+1],[b+l,b+l],A,y,C),x.push(fa)),0<D&&(Ba=d.line(z,[0,ma,xa+ma],[b,b+na,b+na],K,D,C,H),x.push(Ba)));ga="end";if(!0===I&&"left"==Z||!1===I&&"right"==Z)ga="start";v=b-Qa/2+2;1==ia&&0<M&&!g&&!m&&(e=d.fitToBounds(b,0,X),da=d.fitToBounds(da,0,X),V=e-da,Da=d.polygon(z,[0,a.width,a.width,0],[0,0,V,V],Q,M),Da.translate(ma,e-V+na),x.push(Da));v+=r/2;"right"==Z?(G+=ma+xa+ea,v+=na,I?(f||(v-=r/2+3),G=G-(B+4)-aa):(G+=B+4+u,v-=2,G+=aa)):I?(G+=B+4-ea,f||(v-=r/2+3),g&&(G+=ma,v+=na),G+=aa):(G+=-B-u-4-2-ea,v-=2,G-=aa);fa&&("right"==Z?(oa+=ma+ea+xa-1,Y+=na,oa=I?oa-u:oa+u):(oa-=ea,I||(oa-=B+u)));f&&(v+=f);I=-3;"right"==Z&&(I+=na);ca&&(v>X+1||v<I-r/10)&&(ca.remove(),ca=null)}fa&&(fa.translate(oa,Y),d.setCN(n,fa,a.bcn+"tick"),d.setCN(n,fa,q,!0),g&&d.setCN(n,fa,"guide"));!1===a.visible&&(fa&&fa.remove(),ca&&(ca.remove(),ca=null));ca&&(ca.attr({"text-anchor":ga}),ca.translate(G,v,NaN,!0),0!==p&&ca.rotate(-p,a.chart.backgroundColor),a.allLabels.push(ca),this.label=ca,d.setCN(n,ca,a.bcn+"label"),d.setCN(n,ca,q,!0),g&&d.setCN(n,ca,"guide"));Ba&&(d.setCN(n,Ba,a.bcn+"grid"),d.setCN(n,Ba,q,!0),g&&d.setCN(n,Ba,"guide"));Da&&(d.setCN(n,Da,a.bcn+"fill"),d.setCN(n,Da,q,!0));m?Ba&&d.setCN(n,Ba,a.bcn+"grid-minor"):(a.counter=0===ia?1:0,a.previousCoord=b);0===this.set.node.childNodes.length&&this.set.remove()},graphics:function(){return this.set},getLabel:function(){return this.label}})})();(function(){var d=window.AmCharts;d.RecFill=d.Class({construct:function(a,b,c,e){var h=a.dx,f=a.dy,g=a.orientation,k=0;if(c<b){var l=b;b=c;c=l}var m=e.fillAlpha;isNaN(m)&&(m=0);var l=a.chart.container,p=e.fillColor;"V"==g?(b=d.fitToBounds(b,0,a.height),c=d.fitToBounds(c,0,a.height)):(b=d.fitToBounds(b,0,a.width),c=d.fitToBounds(c,0,a.width));c-=b;isNaN(c)&&(c=4,k=2,m=0);0>c&&"object"==typeof p&&(p=p.join(",").split(",").reverse());"V"==g?(g=d.rect(l,a.width,c,p,m),g.translate(h,b-k+f)):(g=d.rect(l,c,a.height,p,m),g.translate(b-k+h,f));d.setCN(a.chart,g,"guide-fill");e.id&&d.setCN(a.chart,g,"guide-fill-"+e.id);this.set=l.set([g])},graphics:function(){return this.set},getLabel:function(){}})})();(function(){var d=window.AmCharts;d.AmChart=d.Class({construct:function(a){this.svgIcons=this.tapToActivate=!0;this.theme=a;this.classNamePrefix="amcharts";this.addClassNames=!1;this.version="3.21.1";d.addChart(this);this.createEvents("buildStarted","dataUpdated","init","rendered","drawn","failed","resized","animationFinished");this.height=this.width="100%";this.dataChanged=!0;this.chartCreated=!1;this.previousWidth=this.previousHeight=0;this.backgroundColor="#FFFFFF";this.borderAlpha=this.backgroundAlpha=0;this.color=this.borderColor="#000000";this.fontFamily="Verdana";this.fontSize=11;this.usePrefixes=!1;this.autoResize=!0;this.autoDisplay=!1;this.addCodeCredits=this.accessible=!0;this.touchStartTime=this.touchClickDuration=0;this.precision=-1;this.percentPrecision=2;this.decimalSeparator=".";this.thousandsSeparator=",";this.labels=[];this.allLabels=[];this.titles=[];this.marginRight=this.marginLeft=this.autoMarginOffset=0;this.timeOuts=[];this.creditsPosition="top-left";var b=document.createElement("div"),c=b.style;c.overflow="hidden";c.position="relative";c.textAlign="left";this.chartDiv=b;b=document.createElement("div");c=b.style;c.overflow="hidden";c.position="relative";c.textAlign="left";this.legendDiv=b;this.titleHeight=0;this.hideBalloonTime=150;this.handDrawScatter=2;this.cssScale=this.handDrawThickness=1;this.cssAngle=0;this.prefixesOfBigNumbers=[{number:1E3,prefix:"k"},{number:1E6,prefix:"M"},{number:1E9,prefix:"G"},{number:1E12,prefix:"T"},{number:1E15,prefix:"P"},{number:1E18,prefix:"E"},{number:1E21,prefix:"Z"},{number:1E24,prefix:"Y"}];this.prefixesOfSmallNumbers=[{number:1E-24,prefix:"y"},{number:1E-21,prefix:"z"},{number:1E-18,prefix:"a"},{number:1E-15,prefix:"f"},{number:1E-12,prefix:"p"},{number:1E-9,prefix:"n"},{number:1E-6,prefix:"\u03bc"},{number:.001,prefix:"m"}];this.panEventsEnabled=!0;this.product="amcharts";this.animations=[];this.balloon=new d.AmBalloon(this.theme);this.balloon.chart=this;this.processTimeout=0;this.processCount=1E3;this.animatable=[];this.langObj={};d.applyTheme(this,a,"AmChart")},drawChart:function(){0<this.realWidth&&0<this.realHeight&&(this.drawBackground(),this.redrawLabels(),this.drawTitles(),this.brr(),this.renderFix(),this.chartDiv&&(this.boundingRect=this.chartDiv.getBoundingClientRect()))},makeAccessible:function(a,b,c){this.accessible&&a&&(c&&a.setAttr("role",c),a.setAttr("aria-label",b))},drawBackground:function(){d.remove(this.background);var a=this.container,b=this.backgroundColor,c=this.backgroundAlpha,e=this.set;d.isModern||0!==c||(c=.001);var h=this.updateWidth();this.realWidth=h;var f=this.updateHeight();this.realHeight=f;b=d.polygon(a,[0,h-1,h-1,0],[0,0,f-1,f-1],b,c,1,this.borderColor,this.borderAlpha);d.setCN(this,b,"bg");this.background=b;e.push(b);if(b=this.backgroundImage)a=a.image(b,0,0,h,f),d.setCN(this,b,"bg-image"),this.bgImg=a,e.push(a)},drawTitles:function(a){var b=this.titles;this.titleHeight=0;if(d.ifArray(b)){var c=20,e;for(e=0;e<b.length;e++){var h=b[e],h=d.processObject(h,d.Title,this.theme);if(!1!==h.enabled){var f=h.color;void 0===f&&(f=this.color);var g=h.size;isNaN(g)&&(g=this.fontSize+2);isNaN(h.alpha);var k=this.marginLeft,l=!0;void 0!==h.bold&&(l=h.bold);f=d.wrappedText(this.container,h.text,f,this.fontFamily,g,"middle",l,this.realWidth-35);f.translate(k+(this.realWidth-this.marginRight-k)/2,c);f.node.style.pointerEvents="none";h.sprite=f;void 0!==h.tabIndex&&f.setAttr("tabindex",h.tabIndex);d.setCN(this,f,"title");h.id&&d.setCN(this,f,"title-"+h.id);f.attr({opacity:h.alpha});c+=f.getBBox().height+5;a?
f.remove():this.freeLabelsSet.push(f)}}this.titleHeight=c-10}},write:function(a){var b=this;if(b.listeners)for(var c=0;c<b.listeners.length;c++){var e=b.listeners[c];b.addListener(e.event,e.method)}b.fire({type:"buildStarted",chart:b});b.afterWriteTO&&clearTimeout(b.afterWriteTO);0<b.processTimeout?b.afterWriteTO=setTimeout(function(){b.afterWrite.call(b,a)},b.processTimeout):b.afterWrite(a)},afterWrite:function(a){var b;if(b="object"!=typeof a?document.getElementById(a):a){for(;b.firstChild;)b.removeChild(b.firstChild);this.div=b;b.style.overflow="hidden";b.style.textAlign="left";a=this.chartDiv;var c=this.legendDiv,e=this.legend,h=c.style,f=a.style;this.measure();this.previousHeight=this.divRealHeight;this.previousWidth=this.divRealWidth;var g,k=document.createElement("div");g=k.style;g.position="relative";this.containerDiv=k;k.className=this.classNamePrefix+"-main-div";a.className=this.classNamePrefix+"-chart-div";b.appendChild(k);(b=this.exportConfig)&&d.AmExport&&!this.AmExport&&(this.AmExport=new d.AmExport(this,b));this.amExport&&d.AmExport&&(this.AmExport=d.extend(this.amExport,new d.AmExport(this),!0));this.AmExport&&this.AmExport.init&&this.AmExport.init();if(e){e=this.addLegend(e,e.divId);if(e.enabled)switch(h.left=null,h.top=null,h.right=null,f.left=null,f.right=null,f.top=null,h.position="relative",f.position="relative",g.width="100%",g.height="100%",e.position){case"bottom":k.appendChild(a);k.appendChild(c);break;case"top":k.appendChild(c);k.appendChild(a);break;case"absolute":h.position="absolute";f.position="absolute";void 0!==e.left&&(h.left=e.left+"px");void 0!==e.right&&(h.right=e.right+"px");void 0!==e.top&&(h.top=e.top+"px");void 0!==e.bottom&&(h.bottom=e.bottom+"px");e.marginLeft=0;e.marginRight=0;k.appendChild(a);k.appendChild(c);break;case"right":h.position="relative";f.position="absolute";k.appendChild(a);k.appendChild(c);break;case"left":h.position="absolute";f.position="relative";k.appendChild(a);k.appendChild(c);break;case"outside":k.appendChild(a)}else k.appendChild(a);this.prevLegendPosition=e.position}else k.appendChild(a);this.listenersAdded||(this.addListeners(),this.listenersAdded=!0);(this.mouseWheelScrollEnabled||this.mouseWheelZoomEnabled)&&d.addWheelListeners();this.initChart()}},createLabelsSet:function(){d.remove(this.labelsSet);this.labelsSet=this.container.set();this.freeLabelsSet.push(this.labelsSet)},initChart:function(){this.balloon=d.processObject(this.balloon,d.AmBalloon,this.theme);window.AmCharts_path&&(this.path=window.AmCharts_path);void 0===this.path&&(this.path=d.getPath());void 0===this.path&&(this.path="amcharts/");this.path=d.normalizeUrl(this.path);void 0===this.pathToImages&&(this.pathToImages=this.path+"images/");this.initHC||(d.callInitHandler(this),this.initHC=!0);d.applyLang(this.language,this);var a=this.numberFormatter;a&&(isNaN(a.precision)||(this.precision=a.precision),void 0!==a.thousandsSeparator&&(this.thousandsSeparator=a.thousandsSeparator),void 0!==a.decimalSeparator&&(this.decimalSeparator=a.decimalSeparator));(a=this.percentFormatter)&&!isNaN(a.precision)&&(this.percentPrecision=a.precision);this.nf={precision:this.precision,thousandsSeparator:this.thousandsSeparator,decimalSeparator:this.decimalSeparator};this.pf={precision:this.percentPrecision,thousandsSeparator:this.thousandsSeparator,decimalSeparator:this.decimalSeparator};this.destroy();(a=this.container)?(a.container.innerHTML="",a.width=this.realWidth,a.height=this.realHeight,a.addDefs(this),this.chartDiv.appendChild(a.container)):a=new d.AmDraw(this.chartDiv,this.realWidth,this.realHeight,this);this.container=a;this.extension=".png";this.svgIcons&&d.SVG&&(this.extension=".svg");this.checkDisplay();this.checkTransform(this.div);a.chart=this;d.VML||d.SVG?(a.handDrawn=this.handDrawn,a.handDrawScatter=this.handDrawScatter,a.handDrawThickness=this.handDrawThickness,d.remove(this.set),this.set=a.set(),d.remove(this.gridSet),this.gridSet=a.set(),d.remove(this.cursorLineSet),this.cursorLineSet=a.set(),d.remove(this.graphsBehindSet),this.graphsBehindSet=a.set(),d.remove(this.bulletBehindSet),this.bulletBehindSet=a.set(),d.remove(this.columnSet),this.columnSet=a.set(),d.remove(this.graphsSet),this.graphsSet=a.set(),d.remove(this.trendLinesSet),this.trendLinesSet=a.set(),d.remove(this.axesSet),this.axesSet=a.set(),d.remove(this.cursorSet),this.cursorSet=a.set(),d.remove(this.scrollbarsSet),this.scrollbarsSet=a.set(),d.remove(this.bulletSet),this.bulletSet=a.set(),d.remove(this.freeLabelsSet),this.freeLabelsSet=a.set(),d.remove(this.axesLabelsSet),this.axesLabelsSet=a.set(),d.remove(this.balloonsSet),this.balloonsSet=a.set(),d.remove(this.plotBalloonsSet),this.plotBalloonsSet=a.set(),d.remove(this.zoomButtonSet),this.zoomButtonSet=a.set(),d.remove(this.zbSet),this.zbSet=null,d.remove(this.linkSet),this.linkSet=a.set()):this.fire({type:"failed",chart:this})},premeasure:function(){var a=this.div;if(a){try{this.boundingRect=this.chartDiv.getBoundingClientRect()}catch(e){}var b=a.offsetWidth,c=a.offsetHeight;a.clientHeight&&(b=a.clientWidth,c=a.clientHeight);if(b!=this.mw||c!=this.mh)this.mw=b,this.mh=c,this.measure()}},measure:function(){var a=this.div;if(a){var b=this.chartDiv,c=a.offsetWidth,e=a.offsetHeight,h=this.container;a.clientHeight&&(c=a.clientWidth,e=a.clientHeight);var e=Math.round(e),c=Math.round(c),a=Math.round(d.toCoordinate(this.width,c)),f=Math.round(d.toCoordinate(this.height,e));(c!=this.previousWidth||e!=this.previousHeight)&&0<a&&0<f&&(b.style.width=a+"px",b.style.height=f+"px",b.style.padding=0,h&&h.setSize(a,f),this.balloon=d.processObject(this.balloon,d.AmBalloon,this.theme));this.balloon&&this.balloon.setBounds&&this.balloon.setBounds(2,2,a-2,f);this.updateWidth();this.balloon.chart=this;this.realWidth=a;this.realHeight=f;this.divRealWidth=c;this.divRealHeight=e}},checkDisplay:function(){if(this.autoDisplay&&this.container){var a=d.rect(this.container,10,10),b=a.getBBox();0===b.width&&0===b.height&&(this.divRealHeight=this.divRealWidth=this.realHeight=this.realWidth=0,this.previousWidth=this.previousHeight=NaN);a.remove()}},checkTransform:function(a){if(this.autoTransform&&window.getComputedStyle&&a){if(a.style){var b=window.getComputedStyle(a,null);if(b&&(b=b.getPropertyValue("-webkit-transform")||b.getPropertyValue("-moz-transform")||b.getPropertyValue("-ms-transform")||b.getPropertyValue("-o-transform")||b.getPropertyValue("transform"))&&"none"!==b){var c=b.split("(")[1].split(")")[0].split(","),b=c[0],c=c[1],b=Math.sqrt(b*b+c*c);isNaN(b)||(this.cssScale*=b)}}a.parentNode&&this.checkTransform(a.parentNode)}},destroy:function(){this.chartDiv.innerHTML="";this.clearTimeOuts();this.legend&&this.legend.destroy()},clearTimeOuts:function(){var a=this.timeOuts;if(a){var b;for(b=0;b<a.length;b++)clearTimeout(a[b])}this.timeOuts=[]},clear:function(a){try{document.removeEventListener("touchstart",this.docfn1,!0),document.removeEventListener("touchend",this.docfn2,!0)}catch(b){}d.callMethod("clear",[this.chartScrollbar,this.scrollbarV,this.scrollbarH,this.chartCursor]);this.chartCursor=this.scrollbarH=this.scrollbarV=this.chartScrollbar=null;this.clearTimeOuts();this.container&&(this.container.remove(this.chartDiv),this.container.remove(this.legendDiv));a||d.removeChart(this);if(a=this.div)for(;a.firstChild;)a.removeChild(a.firstChild);this.legend&&this.legend.destroy();this.AmExport&&this.AmExport.clear&&this.AmExport.clear()},setMouseCursor:function(a){"auto"==a&&d.isNN&&(a="default");this.chartDiv.style.cursor=a;this.legendDiv.style.cursor=a},redrawLabels:function(){this.labels=[];var a=this.allLabels;this.createLabelsSet();var b;for(b=0;b<a.length;b++)this.drawLabel(a[b])},drawLabel:function(a){var b=this;if(b.container&&!1!==a.enabled){a=d.processObject(a,d.Label,b.theme);var c=a.y,e=a.text,h=a.align,f=a.size,g=a.color,k=a.rotation,l=a.alpha,m=a.bold,p=d.toCoordinate(a.x,b.realWidth),c=d.toCoordinate(c,b.realHeight);p||(p=0);c||(c=0);void 0===g&&(g=b.color);isNaN(f)&&(f=b.fontSize);h||(h="start");"left"==h&&(h="start");"right"==h&&(h="end");"center"==h&&(h="middle",k?c=b.realHeight-c+c/2:p=b.realWidth/2-p);void 0===l&&(l=1);void 0===k&&(k=0);c+=f/2;e=d.text(b.container,e,g,b.fontFamily,f,h,m,l);e.translate(p,c);void 0!==a.tabIndex&&e.setAttr("tabindex",a.tabIndex);d.setCN(b,e,"label");a.id&&d.setCN(b,e,"label-"+a.id);0!==k&&e.rotate(k);a.url?(e.setAttr("cursor","pointer"),e.click(function(){d.getURL(a.url,b.urlTarget)})):e.node.style.pointerEvents="none";b.labelsSet.push(e);b.labels.push(e)}},addLabel:function(a,b,c,e,d,f,g,k,l,m){a={x:a,y:b,text:c,align:e,size:d,color:f,alpha:k,rotation:g,bold:l,url:m,enabled:!0};this.container&&this.drawLabel(a);this.allLabels.push(a)},clearLabels:function(){var a=this.labels,b;for(b=a.length-1;0<=b;b--)a[b].remove();this.labels=[];this.allLabels=[]},updateHeight:function(){var a=this.divRealHeight,b=this.legend;if(b){var c=this.legendDiv.offsetHeight,b=b.position;if("top"==b||"bottom"==b){a-=c;if(0>a||isNaN(a))a=0;this.chartDiv.style.height=a+"px"}}return a},updateWidth:function(){var a=this.divRealWidth,b=this.divRealHeight,c=this.legend;if(c){var e=this.legendDiv,d=e.offsetWidth;isNaN(c.width)||(d=c.width);c.ieW&&(d=c.ieW);var f=e.offsetHeight,e=e.style,g=this.chartDiv.style,k=c.position;if(("right"==k||"left"==k)&&void 0===c.divId){a-=d;if(0>a||isNaN(a))a=0;g.width=a+"px";this.balloon&&this.balloon.setBounds&&this.balloon.setBounds(2,2,a-2,this.realHeight);"left"==k?(g.left=d+"px",e.left="0px"):(g.left="0px",e.left=a+"px");b>f&&(e.top=(b-f)/2+"px")}}return a},getTitleHeight:function(){this.drawTitles(!0);return this.titleHeight},addTitle:function(a,b,c,e,d){isNaN(b)&&(b=this.fontSize+2);a={text:a,size:b,color:c,alpha:e,
bold:d,enabled:!0};this.titles.push(a);return a},handleWheel:function(a){var b=0;a||(a=window.event);a.wheelDelta?b=a.wheelDelta/120:a.detail&&(b=-a.detail/3);b&&this.handleWheelReal(b,a.shiftKey);a.preventDefault&&a.preventDefault()},handleWheelReal:function(){},handleDocTouchStart:function(){this.handleMouseMove();this.tmx=this.mouseX;this.tmy=this.mouseY;this.touchStartTime=(new Date).getTime()},handleDocTouchEnd:function(){-.5<this.tmx&&this.tmx<this.divRealWidth+1&&0<this.tmy&&this.tmy<this.divRealHeight?(this.handleMouseMove(),4>Math.abs(this.mouseX-this.tmx)&&4>Math.abs(this.mouseY-this.tmy)?(this.tapped=!0,this.panRequired&&this.panEventsEnabled&&this.chartDiv&&(this.chartDiv.style.msTouchAction="none",this.chartDiv.style.touchAction="none")):this.mouseIsOver||this.resetTouchStyle()):(this.tapped=!1,this.resetTouchStyle())},resetTouchStyle:function(){this.panEventsEnabled&&this.chartDiv&&(this.chartDiv.style.msTouchAction="auto",this.chartDiv.style.touchAction="auto")},checkTouchDuration:function(a){var b=this,c=(new Date).getTime();if(a)if(a.touches)b.isTouchEvent=!0;else if(!b.isTouchEvent)return!0;if(c-b.touchStartTime>b.touchClickDuration)return!0;setTimeout(function(){b.resetTouchDuration()},300)},resetTouchDuration:function(){this.isTouchEvent=!1},checkTouchMoved:function(){if(4<Math.abs(this.mouseX-this.tmx)||4<Math.abs(this.mouseY-this.tmy))return!0},addListeners:function(){var a=this,b=a.chartDiv;document.addEventListener?("ontouchstart"in document.documentElement&&(b.addEventListener("touchstart",function(b){a.handleTouchStart.call(a,b)},!0),b.addEventListener("touchmove",function(b){a.handleMouseMove.call(a,b)},!0),b.addEventListener("touchend",function(b){a.handleTouchEnd.call(a,b)},!0),a.docfn1=function(b){a.handleDocTouchStart.call(a,b)},a.docfn2=function(b){a.handleDocTouchEnd.call(a,b)},document.addEventListener("touchstart",a.docfn1,!0),document.addEventListener("touchend",a.docfn2,!0)),b.addEventListener("mousedown",function(b){a.mouseIsOver=!0;a.handleMouseMove.call(a,b);a.handleMouseDown.call(a,b);a.handleDocTouchStart.call(a,b)},!0),b.addEventListener("mouseover",function(b){a.handleMouseOver.call(a,b)},!0),b.addEventListener("mouseout",function(b){a.handleMouseOut.call(a,b)},!0),b.addEventListener("mouseup",function(b){a.handleDocTouchEnd.call(a,b)},!0)):(b.attachEvent("onmousedown",function(b){a.handleMouseDown.call(a,b)}),b.attachEvent("onmouseover",function(b){a.handleMouseOver.call(a,b)}),b.attachEvent("onmouseout",function(b){a.handleMouseOut.call(a,b)}))},dispDUpd:function(){this.skipEvents||(this.dispatchDataUpdated&&(this.dispatchDataUpdated=!1,this.fire({type:"dataUpdated",chart:this})),this.chartCreated||(this.chartCreated=!0,this.fire({type:"init",chart:this})),this.chartRendered||(this.fire({type:"rendered",chart:this}),this.chartRendered=!0),this.fire({type:"drawn",chart:this}));this.skipEvents=!1},validateSize:function(){var a=this;a.premeasure();a.checkDisplay();a.cssScale=1;a.cssAngle=0;a.checkTransform(a.div);if(a.divRealWidth!=a.previousWidth||a.divRealHeight!=a.previousHeight){var b=a.legend;if(0<a.realWidth&&0<a.realHeight){a.sizeChanged=!0;if(b){a.legendInitTO&&clearTimeout(a.legendInitTO);var c=setTimeout(function(){b.invalidateSize()},10);a.timeOuts.push(c);a.legendInitTO=c}a.marginsUpdated=!1;clearTimeout(a.initTO);c=setTimeout(function(){a.initChart()},10);a.timeOuts.push(c);a.initTO=c}a.renderFix();b&&b.renderFix&&b.renderFix();clearTimeout(a.resizedTO);a.resizedTO=setTimeout(function(){a.fire({type:"resized",chart:a})},10);a.previousHeight=a.divRealHeight;a.previousWidth=a.divRealWidth}},invalidateSize:function(){this.previousHeight=this.previousWidth=NaN;this.invalidateSizeReal()},invalidateSizeReal:function(){var a=this;a.marginsUpdated=!1;clearTimeout(a.validateTO);var b=setTimeout(function(){a.validateSize()},5);a.timeOuts.push(b);a.validateTO=b},validateData:function(a){this.chartCreated&&(this.dataChanged=!0,this.marginsUpdated=!1,this.initChart(a))},validateNow:function(a,b){this.initTO&&clearTimeout(this.initTO);a&&(this.dataChanged=!0,this.marginsUpdated=!1);this.skipEvents=b;this.chartRendered=!1;var c=this.legend;c&&c.position!=this.prevLegendPosition&&(this.previousWidth=this.mw=0,c.invalidateSize&&(c.invalidateSize(),this.validateSize()));this.write(this.div)},showItem:function(a){a.hidden=!1;this.initChart()},hideItem:function(a){a.hidden=!0;this.initChart()},hideBalloon:function(){var a=this;clearTimeout(a.hoverInt);clearTimeout(a.balloonTO);a.hoverInt=setTimeout(function(){a.hideBalloonReal.call(a)},a.hideBalloonTime)},cleanChart:function(){},hideBalloonReal:function(){var a=this.balloon;a&&a.hide&&a.hide()},showBalloon:function(a,b,c,e,d){var f=this;clearTimeout(f.balloonTO);clearTimeout(f.hoverInt);f.balloonTO=setTimeout(function(){f.showBalloonReal.call(f,a,b,c,e,d)},1)},showBalloonReal:function(a,b,c,e,d){this.handleMouseMove();var f=this.balloon;f.enabled&&(f.followCursor(!1),f.changeColor(b),!c||f.fixedPosition?(f.setPosition(e,d),isNaN(e)||isNaN(d)?f.followCursor(!0):f.followCursor(!1)):f.followCursor(!0),a&&f.showBalloon(a))},handleMouseOver:function(){this.outTO&&clearTimeout(this.outTO);d.resetMouseOver();this.mouseIsOver=!0},handleMouseOut:function(){var a=this;d.resetMouseOver();a.outTO&&clearTimeout(a.outTO);a.outTO=setTimeout(function(){a.handleMouseOutReal()},10)},handleMouseOutReal:function(){this.mouseIsOver=!1},handleMouseMove:function(a){a||(a=window.event);this.mouse2Y=this.mouse2X=NaN;var b,c,e,d;if(a){if(a.touches){var f=a.touches.item(1);f&&this.panEventsEnabled&&this.boundingRect&&(e=f.clientX-this.boundingRect.left,d=f.clientY-this.boundingRect.top);a=a.touches.item(0);if(!a)return}else this.wasTouched=!1;this.boundingRect&&a.clientX&&(b=a.clientX-this.boundingRect.left,c=a.clientY-this.boundingRect.top);isNaN(e)?this.mouseX=b:(this.mouseX=Math.min(b,e),this.mouse2X=Math.max(b,e));isNaN(d)?this.mouseY=c:(this.mouseY=Math.min(c,d),this.mouse2Y=Math.max(c,d));this.autoTransform&&(this.mouseX/=this.cssScale,this.mouseY/=this.cssScale)}},handleTouchStart:function(a){this.hideBalloonReal();a&&(a.touches&&this.tapToActivate&&!this.tapped||!this.panRequired)||(this.handleMouseMove(a),this.handleMouseDown(a))},handleTouchEnd:function(a){this.wasTouched=!0;this.handleMouseMove(a);d.resetMouseOver();this.handleReleaseOutside(a)},handleReleaseOutside:function(){this.handleDocTouchEnd.call(this)},handleMouseDown:function(a){d.resetMouseOver();this.mouseIsOver=!0;a&&a.preventDefault&&(this.panEventsEnabled?a.preventDefault():a.touches||a.preventDefault())},addLegend:function(a,b){a=d.processObject(a,d.AmLegend,this.theme);a.divId=b;a.ieW=0;var c;c="object"!=typeof b&&b?document.getElementById(b):b;this.legend=a;a.chart=this;c?(a.div=c,a.position="outside",a.autoMargins=!1):a.div=this.legendDiv;return a},removeLegend:function(){this.legend=void 0;this.previousWidth=0;this.legendDiv.innerHTML=""},handleResize:function(){(d.isPercents(this.width)||d.isPercents(this.height))&&this.invalidateSizeReal();this.renderFix()},renderFix:function(){if(!d.VML){var a=this.container;a&&a.renderFix()}},getSVG:function(){if(d.hasSVG)return this.container},animate:function(a,b,c,e,h,f,g){a["an_"+b]&&d.removeFromArray(this.animations,a["an_"+b]);c={obj:a,frame:0,attribute:b,from:c,to:e,time:h,effect:f,suffix:g};a["an_"+b]=c;this.animations.push(c);return c},setLegendData:function(a){var b=this.legend;b&&b.setData(a)},stopAnim:function(a){d.removeFromArray(this.animations,a)},updateAnimations:function(){var a;this.container&&this.container.update();if(this.animations)for(a=this.animations.length-1;0<=a;a--){var b=this.animations[a],c=d.updateRate*b.time,e=b.frame+1,h=b.obj,f=b.attribute;if(e<=c){b.frame++;var g=Number(b.from),k=Number(b.to)-g,c=d[b.effect](0,e,g,k,c);0===k?(this.animations.splice(a,1),h.node.style[f]=Number(b.to)+b.suffix):h.node.style[f]=c+b.suffix}else h.node.style[f]=Number(b.to)+b.suffix,h.animationFinished=!0,this.animations.splice(a,1)}},update:function(){this.updateAnimations();var a=this.animatable;if(0<a.length){for(var b=!0,c=a.length-1;0<=c;c--){var e=a[c];e&&(e.animationFinished?a.splice(c,1):b=!1)}b&&(this.fire({type:"animationFinished",chart:this}),this.animatable=[])}},inIframe:function(){try{return window.self!==window.top}catch(a){return!0}},brr:function(){if(!this.hideCredits){var a="amcharts.com",b=window.location.hostname.split("."),c;2<=b.length&&(c=b[b.length-2]+"."+b[b.length-1]);this.amLink&&(b=this.amLink.parentNode)&&b.removeChild(this.amLink);b=this.creditsPosition;if(c!=a||!0===this.inIframe()){var a="http://www."+a,e=c=0,d=this.realWidth,f=this.realHeight,g=this.type;if("serial"==g||"xy"==g||"gantt"==g)c=this.marginLeftReal,e=this.marginTopReal,d=c+this.plotAreaWidth,f=e+this.plotAreaHeight;var g=a+"/javascript-charts/",k="JavaScript charts",l="JS chart by amCharts";"ammap"==this.product&&(g=a+"/javascript-maps/",k="Interactive JavaScript maps",l="JS map by amCharts");a=document.createElement("a");l=document.createTextNode(l);a.setAttribute("href",g);a.setAttribute("title",k);this.urlTarget&&a.setAttribute("target",this.urlTarget);a.appendChild(l);this.chartDiv.appendChild(a);this.amLink=a;g=a.style;g.position="absolute";g.textDecoration="none";g.color=this.color;g.fontFamily=this.fontFamily;g.fontSize="11px";g.opacity=.7;g.display="block";var k=a.offsetWidth,a=a.offsetHeight,l=5+c,m=e+5;"bottom-left"==b&&(l=5+c,m=f-a-3);"bottom-right"==b&&(l=d-k-5,m=f-a-3);"top-right"==b&&(l=d-k-5,m=e+5);g.left=l+"px";g.top=m+"px"}}}});d.Slice=d.Class({construct:function(){}});d.SerialDataItem=d.Class({construct:function(){}});d.GraphDataItem=d.Class({construct:function(){}});d.Guide=d.Class({construct:function(a){this.cname="Guide";d.applyTheme(this,a,this.cname)}});d.Title=d.Class({construct:function(a){this.cname="Title";d.applyTheme(this,a,this.cname)}});d.Label=d.Class({construct:function(a){this.cname="Label";d.applyTheme(this,a,this.cname)}})})();(function(){var d=window.AmCharts;d.AmGraph=d.Class({construct:function(a){this.cname="AmGraph";this.createEvents("rollOverGraphItem","rollOutGraphItem","clickGraphItem","doubleClickGraphItem","rightClickGraphItem","clickGraph","rollOverGraph","rollOutGraph");this.type="line";this.stackable=!0;this.columnCount=1;this.columnIndex=0;this.centerCustomBullets=this.showBalloon=!0;this.maxBulletSize=50;this.minBulletSize=4;this.balloonText="[[value]]";this.hidden=this.scrollbar=this.animationPlayed=!1;this.pointPosition="middle";this.depthCount=1;this.includeInMinMax=!0;this.negativeBase=0;this.visibleInLegend=!0;this.showAllValueLabels=!1;this.showBulletsAt=this.showBalloonAt="close";this.lineThickness=1;this.dashLength=0;this.connect=!0;this.lineAlpha=1;this.bullet="none";this.bulletBorderThickness=2;this.bulletBorderAlpha=0;this.bulletAlpha=1;this.bulletSize=8;this.cornerRadiusTop=this.hideBulletsCount=this.bulletOffset=0;this.cursorBulletAlpha=1;this.gradientOrientation="vertical";this.dy=this.dx=0;this.periodValue="";this.clustered=!0;this.periodSpan=1;this.accessibleLabel="[[title]] [[category]] [[value]]";this.accessibleSkipText="Press enter to skip [[title]]";this.y=this.x=0;this.switchable=!0;this.tcc=this.minDistance=1;this.labelRotation=0;this.labelAnchor="auto";this.labelOffset=3;this.bcn="graph-";this.dateFormat="MMM DD, YYYY";this.noRounding=!0;d.applyTheme(this,a,this.cname)},init:function(){this.createBalloon()},draw:function(){var a=this.chart;a.isRolledOverBullet=!1;var b=a.type;if(a.drawGraphs){isNaN(this.precision)||(this.numberFormatter?this.numberFormatter.precision=this.precision:this.numberFormatter={precision:this.precision,decimalSeparator:a.decimalSeparator,thousandsSeparator:a.thousandsSeparator});var c=a.container;this.container=c;this.destroy();var e=c.set();this.set=e;e.translate(this.x,this.y);var h=c.set();this.bulletSet=h;h.translate(this.x,this.y);this.behindColumns?(a.graphsBehindSet.push(e),a.bulletBehindSet.push(h)):(a.graphsSet.push(e),a.bulletSet.push(h));var f=this.bulletAxis;d.isString(f)&&(this.bulletAxis=a.getValueAxisById(f));c=c.set();d.remove(this.columnsSet);this.columnsSet=c;d.setCN(a,e,"graph-"+this.type);d.setCN(a,e,"graph-"+this.id);d.setCN(a,h,"graph-"+this.type);d.setCN(a,h,"graph-"+this.id);this.columnsArray=[];this.ownColumns=[];this.allBullets=[];this.animationArray=[];h=this.labelPosition;h||(f=this.valueAxis.stackType,h="top","column"==this.type&&(a.rotate&&(h="right"),"100%"==f||"regular"==f)&&(h="middle"),this.labelPosition=h);d.ifArray(this.data)&&(a=!1,"xy"==b?this.xAxis.axisCreated&&this.yAxis.axisCreated&&(a=!0):this.valueAxis.axisCreated&&(a=!0),!this.hidden&&a&&this.createGraph());e.push(c)}},createGraph:function(){var a=this,b=a.chart;a.startAlpha=b.startAlpha;a.seqAn=b.sequencedAnimation;a.baseCoord=a.valueAxis.baseCoord;void 0===a.fillAlphas&&(a.fillAlphas=0);a.bulletColorR=a.bulletColor;void 0===a.bulletColorR&&(a.bulletColorR=a.lineColorR,a.bulletColorNegative=a.negativeLineColor);void 0===a.bulletAlpha&&(a.bulletAlpha=a.lineAlpha);if("step"==c||d.VML)a.noRounding=!1;var c=b.type;"gantt"==c&&(c="serial");clearTimeout(a.playedTO);if(!isNaN(a.valueAxis.min)&&!isNaN(a.valueAxis.max)){switch(c){case"serial":a.categoryAxis&&(a.createSerialGraph(),"candlestick"==a.type&&1>a.valueAxis.minMaxMultiplier&&a.positiveClip(a.set));break;case"radar":a.createRadarGraph();break;case"xy":a.createXYGraph()}a.playedTO=setTimeout(function(){a.setAnimationPlayed.call(a)},500*a.chart.startDuration)}},setAnimationPlayed:function(){this.animationPlayed=!0},createXYGraph:function(){var a=[],b=[],c=this.xAxis,e=this.yAxis;this.pmh=e.height;this.pmw=c.width;this.pmy=this.pmx=0;var d;for(d=this.start;d<=this.end;d++){var f=this.data[d].axes[c.id].graphs[this.id],g=f.values,k=g.x,l=g.y,g=c.getCoordinate(k,this.noRounding),m=e.getCoordinate(l,this.noRounding);if(!isNaN(k)&&!isNaN(l)&&(a.push(g),b.push(m),f.x=g,f.y=m,k=this.createBullet(f,g,m,d),l=this.labelText)){var l=this.createLabel(f,l),p=0;k&&(p=k.size);this.positionLabel(f,g,m,l,p)}}this.drawLineGraph(a,b);this.launchAnimation()},createRadarGraph:function(){var a=this.valueAxis.stackType,b=[],c=[],e=[],d=[],f,g,k,l,m;for(m=this.start;m<=this.end;m++){var p=this.data[m].axes[this.valueAxis.id].graphs[this.id],q,n;"none"==a||"3d"==a?q=p.values.value:(q=p.values.close,n=p.values.open);if(isNaN(q))this.connect||(this.drawLineGraph(b,c,e,d),b=[],c=[],e=[],d=[]);else{var t=this.valueAxis.getCoordinate(q,this.noRounding)-this.height,t=t*this.valueAxis.rMultiplier,r=-360/(this.end-this.start+1)*m;"middle"==this.valueAxis.pointPosition&&(r-=180/(this.end-this.start+1));q=t*Math.sin(r/180*Math.PI);t*=Math.cos(r/180*Math.PI);b.push(q);c.push(t);if(!isNaN(n)){var w=this.valueAxis.getCoordinate(n,this.noRounding)-this.height,w=w*this.valueAxis.rMultiplier,z=w*Math.sin(r/180*Math.PI),r=w*Math.cos(r/180*Math.PI);e.push(z);d.push(r);isNaN(k)&&(k=z);isNaN(l)&&(l=r)}r=this.createBullet(p,q,t,m);p.x=q;p.y=t;if(z=this.labelText)z=this.createLabel(p,z),w=0,r&&(w=r.size),this.positionLabel(p,q,t,z,w);isNaN(f)&&(f=q);isNaN(g)&&(g=t)}}b.push(f);c.push(g);isNaN(k)||(e.push(k),d.push(l));this.drawLineGraph(b,c,e,d);this.launchAnimation()},positionLabel:function(a,b,c,e,d){if(e){var f=this.chart,g=this.valueAxis,k="middle",l=!1,m=this.labelPosition,p=e.getBBox(),q=this.chart.rotate,n=a.isNegative,t=this.fontSize;void 0===t&&(t=this.chart.fontSize);c-=p.height/2-t/2-1;void 0!==a.labelIsNegative&&(n=a.labelIsNegative);switch(m){case"right":m=q?n?"left":"right":"right";break;case"top":m=q?"top":n?"bottom":"top";break;case"bottom":m=q?"bottom":n?"top":"bottom";break;case"left":m=q?n?"right":"left":"left"}var t=a.columnGraphics,r=0,w=0;t&&(r=t.x,w=t.y);var z=this.labelOffset;switch(m){case"right":k="start";b+=d/2+z;break;case"top":c=g.reversed?c+(d/2+p.height/2+z):c-(d/2+p.height/2+z);break;case"bottom":c=g.reversed?c-(d/2+p.height/2+z):c+(d/2+p.height/2+z);break;case"left":k="end";b-=d/2+z;break;case"inside":"column"==this.type&&(l=!0,q?n?(k="end",b=r-3-z):(k="start",b=r+3+z):c=n?w+7+z:w-10-z);break;case"middle":"column"==this.type&&(l=!0,q?b-=(b-r)/2+z-3:c-=(c-w)/2+z-3)}"auto"!=this.labelAnchor&&(k=this.labelAnchor);e.attr({"text-anchor":k});this.labelRotation&&e.rotate(this.labelRotation);e.translate(b,c);!this.showAllValueLabels&&t&&l&&(p=e.getBBox(),p.height>a.columnHeight||p.width>a.columnWidth)&&(e.remove(),e=null);if(e&&"radar"!=f.type)if(q){if(0>c||c>this.height)e.remove(),e=null;!this.showAllValueLabels&&e&&(0>b||b>this.width)&&(e.remove(),e=null)}else{if(0>b||b>this.width)e.remove(),
e=null;!this.showAllValueLabels&&e&&(0>c||c>this.height)&&(e.remove(),e=null)}e&&this.allBullets.push(e);return e}},getGradRotation:function(){var a=270;"horizontal"==this.gradientOrientation&&(a=0);return this.gradientRotation=a},createSerialGraph:function(){this.dashLengthSwitched=this.fillColorsSwitched=this.lineColorSwitched=void 0;var a=this.chart,b=this.id,c=this.index,e=this.data,h=this.chart.container,f=this.valueAxis,g=this.type,k=this.columnWidthReal,l=this.showBulletsAt;isNaN(this.columnWidth)||(k=this.columnWidth);isNaN(k)&&(k=.8);var m=this.useNegativeColorIfDown,p=this.width,q=this.height,n=this.y,t=this.rotate,r=this.columnCount,w=d.toCoordinate(this.cornerRadiusTop,k/2),z=this.connect,x=[],u=[],A,y,B,D,C=this.chart.graphs.length,K,H=this.dx/this.tcc,Q=this.dy/this.tcc,M=f.stackType,P=this.start,ia=this.end,I=this.scrollbar,aa="graph-column-";I&&(aa="scrollbar-graph-column-");var ma=this.categoryAxis,na=this.baseCoord,Pa=this.negativeBase,Z=this.columnIndex,da=this.lineThickness,X=this.lineAlpha,xa=this.lineColorR,ea=this.dashLength,fa=this.set,Ba,ga=this.getGradRotation(),V=this.chart.columnSpacing,Y=ma.cellWidth,Da=(Y*k-r)/r;V>Da&&(V=Da);var G,v,oa,ha=q,Qa=p,ca=0,tb=0,ub=0,vb=0,gb=0,hb=0,wb=this.fillColorsR,Ra=this.negativeFillColors,Ja=this.negativeLineColor,Ya=this.fillAlphas,Za=this.negativeFillAlphas;"object"==typeof Ya&&(Ya=Ya[0]);"object"==typeof Za&&(Za=Za[0]);var xb=this.noRounding;"step"==g&&(xb=!1);var ib=f.getCoordinate(f.min);f.logarithmic&&(ib=f.getCoordinate(f.minReal));this.minCoord=
ib;this.resetBullet&&(this.bullet="none");if(!(I||"line"!=g&&"smoothedLine"!=g&&"step"!=g||(1==e.length&&"step"!=g&&"none"==this.bullet&&(this.bullet="round",this.resetBullet=!0),!Ra&&void 0==Ja||m))){var Ua=Pa;Ua>f.max&&(Ua=f.max);Ua<f.min&&(Ua=f.min);f.logarithmic&&(Ua=f.minReal);var Ka=f.getCoordinate(Ua),Mb=f.getCoordinate(f.max);t?(ha=q,Qa=Math.abs(Mb-Ka),ub=q,vb=Math.abs(ib-Ka),hb=tb=0,f.reversed?(ca=0,gb=Ka):(ca=Ka,gb=0)):(Qa=p,ha=Math.abs(Mb-Ka),vb=p,ub=Math.abs(ib-Ka),gb=ca=0,f.reversed?(hb=n,tb=Ka):hb=Ka)}var La=Math.round;this.pmx=La(ca);this.pmy=La(tb);this.pmh=La(ha);this.pmw=La(Qa);this.nmx=La(gb);this.nmy=La(hb);this.nmh=La(ub);this.nmw=La(vb);d.isModern||(this.nmy=this.nmx=0,this.nmh=this.height);this.clustered||(r=1);k="column"==g?(Y*k-V*(r-1))/r:Y*k;1>k&&(k=1);var Nb=this.fixedColumnWidth;isNaN(Nb)||(k=Nb);var L;if("line"==g||"step"==g||"smoothedLine"==g){if(0<P){for(L=P-1;-1<L;L--)if(G=e[L],v=G.axes[f.id].graphs[b],oa=v.values.value,!isNaN(oa)){P=L;break}if(this.lineColorField)for(L=
P;-1<L;L--)if(G=e[L],v=G.axes[f.id].graphs[b],v.lineColor){this.lineColorSwitched=v.lineColor;void 0===this.bulletColor&&(this.bulletColorSwitched=this.lineColorSwitched);break}if(this.fillColorsField)for(L=P;-1<L;L--)if(G=e[L],v=G.axes[f.id].graphs[b],v.fillColors){this.fillColorsSwitched=v.fillColors;break}if(this.dashLengthField)for(L=P;-1<L;L--)if(G=e[L],v=G.axes[f.id].graphs[b],!isNaN(v.dashLength)){this.dashLengthSwitched=v.dashLength;break}}if(ia<e.length-1)for(L=ia+1;L<e.length;L++)if(G=e[L],v=G.axes[f.id].graphs[b],oa=v.values.value,!isNaN(oa)){ia=L;break}}ia<e.length-1&&ia++;var T=[],U=[],Ma=!1;if("line"==g||"step"==g||"smoothedLine"==g)if(this.stackable&&"regular"==M||"100%"==M||this.fillToGraph)Ma=!0;var Ob=this.noStepRisers,jb=-1E3,kb=-1E3,lb=this.minDistance,Sa=!0,$a=!1;for(L=P;L<=ia;L++){G=e[L];v=G.axes[f.id].graphs[b];v.index=L;var ab,Ta=NaN;if(m&&void 0==this.openField)for(var yb=L+1;yb<e.length&&(!e[yb]||!(ab=e[L+1].axes[f.id].graphs[b])||!ab.values||(Ta=ab.values.value,isNaN(Ta)));yb++);var S,R,J,ba,ja=NaN,E=NaN,F=NaN,O=NaN,N=NaN,qa=NaN,ra=NaN,sa=NaN,ta=NaN,ya=NaN,Ea=NaN,ka=NaN,la=NaN,W=NaN,zb=NaN,Ab=NaN,ua=NaN,va=void 0,Na=wb,Va=Ya,Ha=xa,Ca,za,Bb=this.proCandlesticks,mb=this.topRadius,Fa=q-1,pa=p-1,bb=this.pattern;void 0!=v.pattern&&(bb=v.pattern);isNaN(v.alpha)||(Va=v.alpha);isNaN(v.dashLength)||(ea=v.dashLength);var Ia=v.values;f.recalculateToPercents&&(Ia=v.percents);"none"==M&&(Z=isNaN(v.columnIndex)?this.columnIndex:v.columnIndex);if(Ia){W=this.stackable&&"none"!=M&&"3d"!=M?Ia.close:Ia.value;if("candlestick"==g||"ohlc"==g)W=Ia.close,Ab=Ia.low,ra=f.getCoordinate(Ab),zb=Ia.high,ta=f.getCoordinate(zb);ua=Ia.open;F=f.getCoordinate(W,xb);isNaN(ua)||(N=f.getCoordinate(ua,xb),m&&"regular"!=M&&"100%"!=M&&(Ta=ua,ua=N=NaN));m&&(void 0==this.openField?ab&&(ab.isNegative=Ta<W?!0:!1,isNaN(Ta)&&(v.isNegative=!Sa)):v.isNegative=Ta>W?!0:!1);if(!I)switch(this.showBalloonAt){case"close":v.y=F;break;case"open":v.y=N;break;case"high":v.y=ta;break;case"low":v.y=ra}var ja=G.x[ma.id],Wa=this.periodSpan-1;"step"!=g||isNaN(G.cellWidth)||(Y=G.cellWidth);var wa=Math.floor(Y/2)+Math.floor(Wa*Y/2),Ga=wa,nb=0;"left"==this.stepDirection&&(nb=(2*Y+Wa*Y)/2,ja-=nb);"center"==this.stepDirection&&(nb=Y/2,ja-=nb);"start"==this.pointPosition&&(ja-=Y/2+Math.floor(Wa*Y/2),wa=0,Ga=Math.floor(Y)+Math.floor(Wa*Y));"end"==this.pointPosition&&(ja+=Y/2+Math.floor(Wa*Y/2),wa=Math.floor(Y)+Math.floor(Wa*Y),Ga=0);if(Ob){var Cb=this.columnWidth;isNaN(Cb)||(wa*=Cb,Ga*=Cb)}I||(v.x=ja);-1E5>ja&&(ja=-1E5);
ja>p+1E5&&(ja=p+1E5);t?(E=F,O=N,N=F=ja,isNaN(ua)&&!this.fillToGraph&&(O=na),qa=ra,sa=ta):(O=E=ja,isNaN(ua)&&!this.fillToGraph&&(N=na));if(!Bb&&W<ua||Bb&&W<Ba)v.isNegative=!0,Ra&&(Na=Ra),Za&&(Va=Za),void 0!=Ja&&(Ha=Ja);$a=!1;isNaN(W)||(m?W>Ta?(Sa&&($a=!0),Sa=!1):(Sa||($a=!0),Sa=!0):v.isNegative=W<Pa?!0:!1,Ba=W);var Pb=!1;I&&a.chartScrollbar.ignoreCustomColors&&(Pb=!0);Pb||(void 0!=v.color&&(Na=v.color),v.fillColors&&(Na=v.fillColors));F=d.fitToBounds(F,-3E4,3E4);switch(g){case"line":if(isNaN(W))z||(this.drawLineGraph(x,u,T,U),x=[],u=[],T=[],U=[]);else{if(Math.abs(E-jb)>=lb||Math.abs(F-kb)>=lb)x.push(E),u.push(F),jb=E,kb=F;ya=E;Ea=F;ka=E;la=F;!Ma||isNaN(N)||isNaN(O)||(T.push(O),U.push(N));if($a||void 0!=v.lineColor&&v.lineColor!=this.lineColorSwitched||void 0!=v.fillColors&&v.fillColors!=this.fillColorsSwitched||!isNaN(v.dashLength))this.drawLineGraph(x,u,T,U),x=[E],u=[F],T=[],U=[],!Ma||isNaN(N)||isNaN(O)||(T.push(O),U.push(N)),m?(Sa?(this.lineColorSwitched=xa,this.fillColorsSwitched=wb):(this.lineColorSwitched=Ja,this.fillColorsSwitched=Ra),void 0===this.bulletColor&&(this.bulletColorSwitched=xa)):(this.lineColorSwitched=v.lineColor,this.fillColorsSwitched=v.fillColors,void 0===this.bulletColor&&(this.bulletColorSwitched=this.lineColorSwitched)),this.dashLengthSwitched=v.dashLength;v.gap&&(this.drawLineGraph(x,u,T,U),x=[],u=[],T=[],U=[])}break;case"smoothedLine":if(isNaN(W))z||(this.drawSmoothedGraph(x,u,T,U),x=[],u=[],T=[],U=[]);else{if(Math.abs(E-jb)>=lb||Math.abs(F-kb)>=lb)x.push(E),u.push(F),jb=E,kb=F;ya=E;Ea=F;ka=E;la=F;!Ma||isNaN(N)||isNaN(O)||(T.push(O),U.push(N));void 0==v.lineColor&&void 0==v.fillColors&&isNaN(v.dashLength)||(this.drawSmoothedGraph(x,u,T,U),x=[E],u=[F],T=[],U=[],!Ma||isNaN(N)||isNaN(O)||(T.push(O),U.push(N)),this.lineColorSwitched=v.lineColor,this.fillColorsSwitched=v.fillColors,this.dashLengthSwitched=v.dashLength);v.gap&&(this.drawSmoothedGraph(x,u,T,U),x=[],u=[],T=[],U=[])}break;case"step":if(!isNaN(W)){t?(isNaN(A)||(x.push(A),u.push(F-wa)),u.push(F-wa),x.push(E),u.push(F+Ga),x.push(E),!Ma||isNaN(N)||isNaN(O)||(isNaN(B)||(T.push(B),U.push(N-wa)),T.push(O),U.push(N-wa),T.push(O),U.push(N+Ga))):(isNaN(y)||(u.push(y),x.push(E-wa)),x.push(E-wa),u.push(F),x.push(E+Ga),u.push(F),!Ma||isNaN(N)||isNaN(O)||(isNaN(D)||(T.push(O-wa),U.push(D)),T.push(O-wa),U.push(N),T.push(O+Ga),U.push(N)));A=E;y=F;B=O;D=N;ya=E;Ea=F;ka=E;la=F;if($a||void 0!=v.lineColor||void 0!=v.fillColors||!isNaN(v.dashLength)){var Db=x[x.length-2],dc=u[u.length-2];x.pop();u.pop();T.pop();U.pop();this.drawLineGraph(x,u,T,U);x=[Db];u=[dc];T=[];U=[];Ma&&(T=[Db,Db+wa+Ga],U=[D,D]);t?(u.push(F+Ga),x.push(E)):(x.push(E+Ga),u.push(F));this.lineColorSwitched=v.lineColor;this.fillColorsSwitched=v.fillColors;this.dashLengthSwitched=v.dashLength;m&&(Sa?(this.lineColorSwitched=xa,this.fillColorsSwitched=wb):(this.lineColorSwitched=Ja,this.fillColorsSwitched=Ra))}if(Ob||v.gap)A=y=NaN,this.drawLineGraph(x,u,T,U),x=[],u=[],T=[],U=[]}else if(!z){if(1>=this.periodSpan||1<this.periodSpan&&E-A>wa+Ga)A=y=NaN;this.drawLineGraph(x,u,T,U);x=[];u=[];T=[];U=[]}break;case"column":Ca=Ha;void 0!=v.lineColor&&(Ca=v.lineColor);if(!isNaN(W)){m||(v.isNegative=W<Pa?!0:!1);v.isNegative&&(Ra&&(Na=Ra),void 0!=Ja&&(Ca=Ja));var Qb=f.min,Rb=f.max,ob=ua;isNaN(ob)&&(ob=Pa);if(!(W<Qb&&ob<Qb||W>Rb&&ob>Rb)){var Aa;if(t){"3d"==M?(R=F-(r/2-this.depthCount+1)*(k+V)+V/2+Q*Z,S=O+H*Z,Aa=Z):(R=Math.floor(F-(r/2-Z)*(k+V)+V/2),S=O,Aa=0);J=k;ya=E;Ea=R+k/2;ka=E;la=R+k/2;R+J>q+Aa*Q&&(J=q-R+Aa*Q);R<Aa*Q&&(J+=R,R=Aa*Q);ba=E-O;var ec=S;S=d.fitToBounds(S,0,p);ba+=ec-S;ba=d.fitToBounds(ba,-S,p-S+H*Z);v.labelIsNegative=0>ba?!0:!1;0===ba&&1/W===1/-0&&(v.labelIsNegative=!0);isNaN(G.percentWidthValue)||(J=this.height*G.percentWidthValue/100,R=ja-J/2,Ea=R+J/2);J=d.roundTo(J,2);ba=d.roundTo(ba,2);R<q&&0<J&&(va=new d.Cuboid(h,ba,J,H-a.d3x,Q-a.d3y,Na,Va,da,Ca,X,ga,w,t,ea,bb,mb,aa),v.columnWidth=Math.abs(ba),v.columnHeight=Math.abs(J))}else{"3d"==M?(S=E-(r/2-this.depthCount+1)*(k+V)+V/2+H*Z,R=N+Q*Z,Aa=Z):(S=E-(r/2-Z)*(k+V)+V/2,R=N,Aa=0);J=k;ya=S+k/2;Ea=F;ka=S+k/2;la=F;S+J>p+Aa*H&&(J=p-S+Aa*H);S<Aa*H&&(J+=S-Aa*H,S=Aa*H);ba=F-N;v.labelIsNegative=0<ba?!0:!1;0===ba&&1/W!==1/Math.abs(W)&&(v.labelIsNegative=!0);var fc=R;R=d.fitToBounds(R,this.dy,q);ba+=fc-R;ba=d.fitToBounds(ba,-R+Q*Aa,q-R);isNaN(G.percentWidthValue)||(J=this.width*G.percentWidthValue/100,S=ja-J/2,ya=S+J/2);J=d.roundTo(J,2);ba=d.roundTo(ba,2);S<p+Z*H&&0<J&&(this.showOnAxis&&(R-=Q/2),va=new d.Cuboid(h,J,ba,H-a.d3x,Q-a.d3y,Na,Va,da,Ca,this.lineAlpha,ga,w,t,ea,bb,mb,aa),v.columnHeight=Math.abs(ba),v.columnWidth=Math.abs(J))}}if(va){za=va.set;d.setCN(a,va.set,"graph-"+this.type);d.setCN(a,va.set,"graph-"+this.id);v.className&&d.setCN(a,va.set,v.className,!0);v.columnGraphics=za;S=d.roundTo(S,2);R=d.roundTo(R,2);za.translate(S,R);(v.url||this.showHandOnHover)&&za.setAttr("cursor","pointer");if(!I){"none"==M&&(K=t?(this.end+1-L)*C-c:C*L+c);"3d"==M&&(t?(K=(this.end+1-L)*C-c-1E3*this.depthCount,ya+=H*Z,ka+=H*Z,v.y+=H*Z):(K=(C-c)*(L+1)+1E3*this.depthCount,Ea+=Q*Z,la+=Q*Z,v.y+=Q*Z));if("regular"==M||"100%"==M)K=t?0<Ia.value?(this.end+1-L)*C+c:(this.end+1-L)*C-c:0<Ia.value?C*L+c:C*L-c;this.columnsArray.push({column:va,depth:K});v.x=t?R+J/2:S+J/2;this.ownColumns.push(va);this.animateColumns(va,L,E,O,F,N);this.addListeners(za,v);void 0!==this.tabIndex&&za.setAttr("tabindex",this.tabIndex)}this.columnsSet.push(za)}}break;case"candlestick":if(!isNaN(ua)&&!isNaN(W)){var Xa,cb;Ca=Ha;void 0!=v.lineColor&&(Ca=v.lineColor);ya=E;la=Ea=F;ka=E;if(t){"open"==l&&(ka=O);"high"==l&&(ka=sa);"low"==l&&(ka=qa);E=d.fitToBounds(E,0,pa);O=d.fitToBounds(O,0,pa);qa=d.fitToBounds(qa,0,pa);sa=d.fitToBounds(sa,0,pa);if(0===E&&0===O&&0===qa&&0===sa)continue;if(E==pa&&O==pa&&qa==pa&&sa==pa)continue;R=F-k/2;S=O;J=k;R+J>q&&(J=q-R);0>R&&(J+=R,R=0);if(R<q&&0<J){var Eb,Fb;W>ua?(Eb=[E,sa],Fb=[O,qa]):(Eb=[O,sa],Fb=[E,qa]);!isNaN(sa)&&!isNaN(qa)&&F<q&&0<F&&(Xa=d.line(h,Eb,[F,F],Ca,X,da),cb=d.line(h,Fb,[F,F],Ca,X,da));ba=E-O;va=new d.Cuboid(h,ba,J,H,Q,Na,Ya,da,Ca,X,ga,w,t,ea,bb,mb,aa)}}else{"open"==l&&(la=N);"high"==l&&(la=ta);"low"==l&&(la=ra);F=d.fitToBounds(F,0,Fa);N=d.fitToBounds(N,0,Fa);ra=d.fitToBounds(ra,0,Fa);ta=d.fitToBounds(ta,0,Fa);if(0===F&&0===N&&0===ra&&0===ta)continue;if(F==Fa&&N==Fa&&ra==Fa&&ta==Fa)continue;S=E-k/2;R=N+da/2;J=k;S+J>p&&(J=p-S);0>S&&(J+=S,S=0);ba=F-N;if(S<p&&0<J){Bb&&W>=ua&&(Va=0);var va=new d.Cuboid(h,J,ba,H,Q,Na,Va,da,Ca,X,ga,w,t,ea,bb,mb,aa),Gb,Hb;W>ua?(Gb=[F,ta],Hb=[N,ra]):(Gb=[N,ta],Hb=[F,ra]);!isNaN(ta)&&!isNaN(ra)&&E<p&&0<E&&(Xa=d.line(h,[E,E],Gb,Ca,X,da),cb=d.line(h,[E,E],Hb,Ca,X,da),d.setCN(a,Xa,this.bcn+"line-high"),v.className&&d.setCN(a,Xa,v.className,!0),d.setCN(a,cb,this.bcn+"line-low"),v.className&&d.setCN(a,cb,v.className,!0))}}va&&(za=va.set,v.columnGraphics=za,fa.push(za),za.translate(S,R-da/2),(v.url||this.showHandOnHover)&&za.setAttr("cursor","pointer"),Xa&&(fa.push(Xa),fa.push(cb)),I||(v.x=t?R+J/2:S+J/2,this.animateColumns(va,L,E,O,F,N),this.addListeners(za,v),void 0!==this.tabIndex&&za.setAttr("tabindex",this.tabIndex)))}break;case"ohlc":if(!(isNaN(ua)||isNaN(zb)||isNaN(Ab)||isNaN(W))){var Sb=h.set();fa.push(Sb);W<ua&&(v.isNegative=!0,void 0!=Ja&&(Ha=Ja));void 0!=v.lineColor&&(Ha=v.lineColor);var pb,qb,rb;if(t){la=F;ka=E;"open"==l&&(ka=O);"high"==l&&(ka=sa);"low"==l&&(ka=qa);qa=d.fitToBounds(qa,0,pa);sa=d.fitToBounds(sa,0,pa);if(0===E&&0===O&&0===qa&&0===sa)continue;if(E==pa&&O==pa&&qa==pa&&sa==pa)continue;var Ib=F-k/2,Ib=d.fitToBounds(Ib,0,q),Tb=d.fitToBounds(F,0,q),Jb=F+k/2,Jb=d.fitToBounds(Jb,0,q);0<=O&&O<=pa&&(qb=d.line(h,[O,O],[Ib,Tb],Ha,X,da,ea));0<F&&F<q&&(pb=d.line(h,[qa,sa],[F,F],Ha,X,da,ea));0<=E&&E<=pa&&(rb=d.line(h,[E,E],[Tb,Jb],Ha,X,da,ea))}else{la=F;"open"==l&&(la=N);"high"==l&&(la=ta);"low"==l&&(la=ra);var ka=E,ra=d.fitToBounds(ra,0,Fa),ta=d.fitToBounds(ta,0,Fa),Kb=E-k/2,Kb=d.fitToBounds(Kb,0,p),Ub=d.fitToBounds(E,0,p),Lb=E+k/2,Lb=d.fitToBounds(Lb,0,p);0<=N&&N<=Fa&&(qb=d.line(h,[Kb,Ub],[N,N],Ha,X,da,ea));0<E&&E<p&&(pb=d.line(h,[E,E],[ra,ta],Ha,X,da,ea));0<=F&&F<=Fa&&(rb=d.line(h,[Ub,Lb],[F,F],Ha,X,da,ea))}fa.push(qb);fa.push(pb);fa.push(rb);d.setCN(a,qb,this.bcn+"stroke-open");d.setCN(a,rb,this.bcn+"stroke-close");d.setCN(a,pb,this.bcn+"stroke");v.className&&d.setCN(a,Sb,v.className,!0);ya=E;Ea=F}}if(!I&&!isNaN(W)){var Vb=this.hideBulletsCount;if(this.end-this.start<=Vb||0===Vb){var Wb=this.createBullet(v,ka,la,L),Xb=this.labelText;if(Xb&&!isNaN(ya)&&!isNaN(ya)){var gc=this.createLabel(v,Xb),Yb=0;Wb&&(Yb=Wb.size);this.positionLabel(v,ya,Ea,gc,Yb)}if("regular"==M||"100%"==M){var Zb=f.totalText;if(Zb){var Oa=this.createLabel(v,Zb,f.totalTextColor);d.setCN(a,Oa,this.bcn+"label-total");this.allBullets.push(Oa);if(Oa){var $b=Oa.getBBox(),ac=$b.width,bc=$b.height,db,eb,sb=f.totalTextOffset,cc=f.totals[L];cc&&cc.remove();var fb=0;"column"!=g&&(fb=this.bulletSize);t?(eb=Ea,db=0>W?E-ac/2-2-fb-sb:E+ac/2+3+fb+sb):(db=ya,eb=0>W?F+bc/2+fb+sb:F-bc/2-3-fb-sb);Oa.translate(db,eb);f.totals[L]=Oa;t?(0>eb||eb>q)&&Oa.remove():(0>db||db>p)&&Oa.remove()}}}}}}}this.lastDataItem=v;if("line"==g||"step"==g||"smoothedLine"==g)"smoothedLine"==g?this.drawSmoothedGraph(x,u,T,U):this.drawLineGraph(x,u,T,U),I||this.launchAnimation();this.bulletsHidden&&this.hideBullets();this.customBulletsHidden&&this.hideCustomBullets()},animateColumns:function(a,b){var c=this,e=c.chart.startDuration;0<e&&!c.animationPlayed&&(c.seqAn?(a.set.hide(),c.animationArray.push(a),e=setTimeout(function(){c.animate.call(c)},e/(c.end-c.start+1)*(b-c.start)*1E3),c.timeOuts.push(e)):c.animate(a),c.chart.animatable.push(a))},createLabel:function(a,b,c){var e=this.chart,h=a.labelColor;h||(h=this.color);h||(h=e.color);c&&(h=c);c=this.fontSize;void 0===c&&(this.fontSize=c=e.fontSize);var f=this.labelFunction;b=e.formatString(b,a);b=d.cleanFromEmpty(b);f&&(b=f(a,b));if(void 0!==b&&""!==b)return a=d.text(this.container,b,h,e.fontFamily,c),a.node.style.pointerEvents="none",d.setCN(e,a,this.bcn+"label"),this.bulletSet.push(a),a},positiveClip:function(a){a.clipRect(this.pmx,this.pmy,this.pmw,this.pmh)},negativeClip:function(a){a.clipRect(this.nmx,this.nmy,this.nmw,this.nmh)},drawLineGraph:function(a,b,c,e){var h=this;if(1<a.length){var f=h.noRounding,g=h.set,k=h.chart,l=h.container,m=l.set(),p=l.set();g.push(p);g.push(m);var q=h.lineAlpha,n=h.lineThickness,g=h.fillAlphas,t=h.lineColorR,r=h.negativeLineAlpha;isNaN(r)&&(r=q);var w=h.lineColorSwitched;w&&(t=w);var w=h.fillColorsR,z=h.fillColorsSwitched;z&&(w=z);var x=h.dashLength;(z=h.dashLengthSwitched)&&(x=z);var z=h.negativeLineColor,u=h.negativeFillColors,A=h.negativeFillAlphas,y=h.baseCoord;0!==h.negativeBase&&(y=h.valueAxis.getCoordinate(h.negativeBase,f),y>h.height&&(y=h.height),0>y&&(y=0));q=d.line(l,a,b,t,q,n,x,!1,!0,f);q.node.setAttribute("stroke-linejoin","round");d.setCN(k,q,h.bcn+"stroke");m.push(q);m.click(function(a){h.handleGraphEvent(a,"clickGraph")}).mouseover(function(a){h.handleGraphEvent(a,"rollOverGraph")}).mouseout(function(a){h.handleGraphEvent(a,"rollOutGraph")}).touchmove(function(a){h.chart.handleMouseMove(a)}).touchend(function(a){h.chart.handleTouchEnd(a)});void 0===z||h.useNegativeColorIfDown||(n=d.line(l,a,b,z,r,n,x,!1,!0,f),n.node.setAttribute("stroke-linejoin","round"),d.setCN(k,n,h.bcn+"stroke"),d.setCN(k,n,h.bcn+"stroke-negative"),p.push(n));if(0<g||0<A)if(n=a.join(";").split(";"),r=b.join(";").split(";"),q=k.type,"serial"==q||"radar"==q?0<c.length?(c.reverse(),e.reverse(),n=a.concat(c),r=b.concat(e)):"radar"==q?(r.push(0),n.push(0)):h.rotate?(r.push(r[r.length-1]),n.push(y),r.push(r[0]),n.push(y),r.push(r[0]),n.push(n[0])):(n.push(n[n.length-1]),r.push(y),n.push(n[0]),r.push(y),n.push(a[0]),r.push(r[0])):"xy"==q&&(b=h.fillToAxis)&&(d.isString(b)&&(b=k.getValueAxisById(b)),"H"==b.orientation?(y="top"==b.position?0:b.height,n.push(n[n.length-1]),r.push(y),n.push(n[0]),r.push(y),n.push(a[0]),r.push(r[0])):(y="left"==b.position?0:b.width,r.push(r[r.length-1]),n.push(y),r.push(r[0]),n.push(y),r.push(r[0]),n.push(n[0]))),a=h.gradientRotation,0<g&&(b=d.polygon(l,n,r,w,g,1,"#000",0,a,f),b.pattern(h.pattern,NaN,k.path),d.setCN(k,b,h.bcn+"fill"),m.push(b)),u||void 0!==z)isNaN(A)&&(A=g),u||(u=z),f=d.polygon(l,n,r,u,A,1,"#000",0,a,f),d.setCN(k,f,h.bcn+"fill"),d.setCN(k,f,h.bcn+"fill-negative"),f.pattern(h.pattern,NaN,k.path),p.push(f),p.click(function(a){h.handleGraphEvent(a,"clickGraph")}).mouseover(function(a){h.handleGraphEvent(a,"rollOverGraph")}).mouseout(function(a){h.handleGraphEvent(a,"rollOutGraph")}).touchmove(function(a){h.chart.handleMouseMove(a)}).touchend(function(a){h.chart.handleTouchEnd(a)});h.applyMask(p,m)}},applyMask:function(a,b){var c=a.length();"serial"!=this.chart.type||this.scrollbar||(this.positiveClip(b),0<c&&this.negativeClip(a))},drawSmoothedGraph:function(a,b,c,e){if(1<a.length){var h=this.set,f=this.chart,g=this.container,k=g.set(),l=g.set();h.push(l);h.push(k);var m=this.lineAlpha,p=this.lineThickness,h=this.dashLength,q=this.fillAlphas,n=this.lineColorR,t=this.fillColorsR,r=this.negativeLineColor,w=this.negativeFillColors,z=this.negativeFillAlphas,x=this.baseCoord,u=this.lineColorSwitched;u&&(n=u);(u=this.fillColorsSwitched)&&(t=u);var A=this.negativeLineAlpha;isNaN(A)&&(A=m);u=this.getGradRotation();m=new d.Bezier(g,a,b,n,m,p,t,0,h,void 0,u);d.setCN(f,m,this.bcn+"stroke");k.push(m.path);void 0!==r&&(p=new d.Bezier(g,a,b,r,A,p,t,0,h,void 0,u),d.setCN(f,p,this.bcn+"stroke"),d.setCN(f,p,this.bcn+"stroke-negative"),l.push(p.path));0<q&&(p=a.join(";").split(";"),m=b.join(";").split(";"),n="",0<c.length?(c.push("M"),e.push("M"),c.reverse(),e.reverse(),p=a.concat(c),m=b.concat(e)):(this.rotate?(n+=" L"+x+","+b[b.length-1],n+=" L"+x+","+b[0]):(n+=" L"+a[a.length-1]+","+
x,n+=" L"+a[0]+","+x),n+=" L"+a[0]+","+b[0]),a=new d.Bezier(g,p,m,NaN,0,0,t,q,h,n,u),d.setCN(f,a,this.bcn+"fill"),a.path.pattern(this.pattern,NaN,f.path),k.push(a.path),w||void 0!==r)&&(z||(z=q),w||(w=r),g=new d.Bezier(g,p,m,NaN,0,0,w,z,h,n,u),g.path.pattern(this.pattern,NaN,f.path),d.setCN(f,g,this.bcn+"fill"),d.setCN(f,g,this.bcn+"fill-negative"),l.push(g.path));this.applyMask(l,k)}},launchAnimation:function(){var a=this,b=a.chart.startDuration;if(0<b&&!a.animationPlayed){var c=a.set,e=a.bulletSet;d.VML||(c.attr({opacity:a.startAlpha}),e.attr({opacity:a.startAlpha}));c.hide();e.hide();a.seqAn?(b=setTimeout(function(){a.animateGraphs.call(a)},a.index*b*1E3),a.timeOuts.push(b)):a.animateGraphs()}},animateGraphs:function(){var a=this.chart,b=this.set,c=this.bulletSet,e=this.x,d=this.y;b.show();c.show();var f=a.startDuration,g=a.startEffect;b&&(this.rotate?(b.translate(-1E3,d),c.translate(-1E3,d)):(b.translate(e,-1E3),c.translate(e,-1E3)),b.animate({opacity:1,translate:e+","+d},f,g),c.animate({opacity:1,translate:e+","+d},f,g),a.animatable.push(b))},animate:function(a){var b=this.chart,c=this.animationArray;!a&&0<c.length&&(a=c[0],c.shift());c=d[d.getEffect(b.startEffect)];b=b.startDuration;a&&(this.rotate?a.animateWidth(b,c):a.animateHeight(b,c),a.set.show())},legendKeyColor:function(){var a=this.legendColor,b=this.lineAlpha;void 0===a&&(a=this.lineColorR,0===b&&(b=this.fillColorsR)&&(a="object"==typeof b?b[0]:b));return a},legendKeyAlpha:function(){var a=this.legendAlpha;void 0===a&&(a=this.lineAlpha,this.fillAlphas>a&&(a=this.fillAlphas),0===a&&(a=this.bulletAlpha),0===a&&(a=1));return a},createBullet:function(a,b,c){if(!isNaN(b)&&!isNaN(c)&&("none"!=this.bullet||this.customBullet||a.bullet||a.customBullet)){var e=this.chart,h=this.container,f=this.bulletOffset,g=this.bulletSize;isNaN(a.bulletSize)||(g=a.bulletSize);var k=a.values.value,l=this.maxValue,m=this.minValue,p=this.maxBulletSize,q=this.minBulletSize;isNaN(l)||(isNaN(k)||(g=(k-m)/(l-m)*(p-q)+q),m==l&&(g=p));l=g;this.bulletAxis&&(g=a.values.error,
isNaN(g)||(k=g),g=this.bulletAxis.stepWidth*k);g<this.minBulletSize&&(g=this.minBulletSize);this.rotate?b=a.isNegative?b-f:b+f:c=a.isNegative?c+f:c-f;q=this.bulletColorR;a.lineColor&&void 0===this.bulletColor&&(this.bulletColorSwitched=a.lineColor);this.bulletColorSwitched&&(q=this.bulletColorSwitched);a.isNegative&&void 0!==this.bulletColorNegative&&(q=this.bulletColorNegative);void 0!==a.color&&(q=a.color);var n;"xy"==e.type&&this.valueField&&(n=this.pattern,a.pattern&&(n=a.pattern));f=this.bullet;a.bullet&&(f=a.bullet);var k=this.bulletBorderThickness,m=this.bulletBorderColorR,p=this.bulletBorderAlpha,t=this.bulletAlpha;m||(m=q);this.useLineColorForBulletBorder&&(m=this.lineColorR,a.isNegative&&this.negativeLineColor&&(m=this.negativeLineColor),this.lineColorSwitched&&(m=this.lineColorSwitched));var r=a.alpha;isNaN(r)||(t=r);n=d.bullet(h,f,g,q,t,k,m,p,l,0,n,e.path);l=this.customBullet;a.customBullet&&(l=a.customBullet);l&&(n&&n.remove(),"function"==typeof l?(l=new l,l.chart=e,a.bulletConfig&&(l.availableSpace=c,l.graph=this,l.graphDataItem=a,l.bulletY=c,a.bulletConfig.minCoord=this.minCoord-c,l.bulletConfig=a.bulletConfig),l.write(h),n&&l.showBullet&&l.set.push(n),a.customBulletGraphics=l.cset,n=l.set):(n=h.set(),l=h.image(l,0,0,g,g),n.push(l),this.centerCustomBullets&&l.translate(-g/2,-g/2)));if(n){(a.url||this.showHandOnHover)&&n.setAttr("cursor","pointer");if("serial"==e.type||"gantt"==e.type)if(-.5>b||b>this.width||c<-g/2||c>this.height)n.remove(),n=null;n&&(this.bulletSet.push(n),n.translate(b,c),this.addListeners(n,a),this.allBullets.push(n));a.bx=b;a.by=c;d.setCN(e,n,this.bcn+"bullet");a.className&&d.setCN(e,n,a.className,!0)}if(n){n.size=g||0;if(e=this.bulletHitAreaSize)h=d.circle(h,e,"#FFFFFF",.001,0),h.translate(b,c),a.hitBullet=h,this.bulletSet.push(h),this.addListeners(h,a);a.bulletGraphics=n;void 0!==this.tabIndex&&n.setAttr("tabindex",this.tabIndex)}else n={size:0};n.graphDataItem=a;return n}},showBullets:function(){var a=this.allBullets,b;this.bulletsHidden=!1;for(b=0;b<a.length;b++)a[b].show()},hideBullets:function(){var a=this.allBullets,b;this.bulletsHidden=!0;for(b=0;b<a.length;b++)a[b].hide()},showCustomBullets:function(){var a=this.allBullets,b;this.customBulletsHidden=!1;for(b=0;b<a.length;b++){var c=a[b].graphDataItem;c&&c.customBulletGraphics&&c.customBulletGraphics.show()}},hideCustomBullets:function(){var a=this.allBullets,b;this.customBulletsHidden=!0;for(b=0;b<a.length;b++){var c=a[b].graphDataItem;c&&c.customBulletGraphics&&c.customBulletGraphics.hide()}},addListeners:function(a,b){var c=this;a.mouseover(function(a){c.handleRollOver(b,a)}).mouseout(function(a){c.handleRollOut(b,a)}).touchend(function(a){c.handleRollOver(b,a);c.chart.panEventsEnabled&&c.handleClick(b,a)}).touchstart(function(a){c.handleRollOver(b,a)}).click(function(a){c.handleClick(b,a)}).dblclick(function(a){c.handleDoubleClick(b,a)}).contextmenu(function(a){c.handleRightClick(b,a)});var e=c.chart;if(e.accessible&&c.accessibleLabel){var d=e.formatString(c.accessibleLabel,b);e.makeAccessible(a,d)}},handleRollOver:function(a,b){this.handleGraphEvent(b,"rollOverGraph");if(a){var c=this.chart;a.bulletConfig&&(c.isRolledOverBullet=!0);var e={type:"rollOverGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire(e);c.fire(e);clearTimeout(c.hoverInt);(c=c.chartCursor)&&c.valueBalloonsEnabled||this.showGraphBalloon(a,"V",!0)}},handleRollOut:function(a,b){var c=this.chart;if(a){var e={type:"rollOutGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire(e);c.fire(e);c.isRolledOverBullet=!1}this.handleGraphEvent(b,"rollOutGraph");(c=c.chartCursor)&&c.valueBalloonsEnabled||this.hideBalloon()},handleClick:function(a,b){if(!this.chart.checkTouchMoved()&&this.chart.checkTouchDuration(b)){if(a){var c={type:"clickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire(c);this.chart.fire(c);d.getURL(a.url,this.urlTarget)}this.handleGraphEvent(b,"clickGraph")}},handleGraphEvent:function(a,b){var c={type:b,graph:this,target:this,chart:this.chart,event:a};this.fire(c);this.chart.fire(c)},handleRightClick:function(a,b){if(a){var c={type:"rightClickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire(c);this.chart.fire(c)}},handleDoubleClick:function(a,b){if(a){var c={type:"doubleClickGraphItem",item:a,index:a.index,graph:this,target:this,chart:this.chart,event:b};this.fire(c);this.chart.fire(c)}},zoom:function(a,b){this.start=a;this.end=b;this.draw()},changeOpacity:function(a){var b=this.set;b&&b.setAttr("opacity",a);if(b=this.ownColumns){var c;for(c=0;c<b.length;c++){var e=b[c].set;e&&e.setAttr("opacity",a)}}(b=this.bulletSet)&&b.setAttr("opacity",a)},destroy:function(){d.remove(this.set);d.remove(this.bulletSet);var a=this.timeOuts;if(a){var b;for(b=0;b<a.length;b++)clearTimeout(a[b])}this.timeOuts=[]},createBalloon:function(){var a=this.chart;this.balloon?this.balloon.destroy&&this.balloon.destroy():this.balloon={};var b=this.balloon;d.extend(b,a.balloon,!0);b.chart=a;b.mainSet=a.plotBalloonsSet;b.className=this.id},hideBalloon:function(){var a=this,b=a.chart;b.chartCursor?b.chartCursor.valueBalloonsEnabled||b.hideBalloon():b.hideBalloon();clearTimeout(a.hoverInt);a.hoverInt=setTimeout(function(){a.hideBalloonReal.call(a)},b.hideBalloonTime)},hideBalloonReal:function(){this.balloon&&this.balloon.hide();this.fixBulletSize()},fixBulletSize:function(){if(d.isModern){var a=this.resizedDItem;if(a){var b=a.bulletGraphics;if(b&&!b.doNotScale){b.translate(a.bx,a.by,1);var c=this.bulletAlpha;isNaN(a.alpha)||(c=a.alpha);b.setAttr("fill-opacity",c);b.setAttr("stroke-opacity",this.bulletBorderAlpha)}}this.resizedDItem=null}},showGraphBalloon:function(a,b,c,e,h){if(a){var f=this.chart,g=this.balloon,k=0,l=0,m=f.chartCursor,p=!0;m?m.valueBalloonsEnabled||(g=f.balloon,k=this.x,l=this.y,p=!1):(g=f.balloon,k=this.x,l=this.y,p=!1);clearTimeout(this.hoverInt);if(f.chartCursor&&(this.currentDataItem=a,"serial"==f.type&&f.isRolledOverBullet&&f.chartCursor.valueBalloonsEnabled)){this.hideBalloonReal();return}this.resizeBullet(a,e,h);if(g&&g.enabled&&this.showBalloon&&!this.hidden){var m=f.formatString(this.balloonText,a,!0),q=this.balloonFunction;q&&(m=q(a,a.graph));m&&(m=d.cleanFromEmpty(m));m&&""!==m?(e=f.getBalloonColor(this,a),g.drop||(g.pointerOrientation=b),b=a.x,h=a.y,f.rotate&&(b=a.y,h=a.x),b+=k,h+=l,isNaN(b)||isNaN(h)?this.hideBalloonReal():(a=this.width,q=this.height,p&&g.setBounds(k,l,a+k,q+l),g.changeColor(e),g.setPosition(b,h),g.fixPrevious(),g.fixedPosition&&(c=!1),!c&&"radar"!=f.type&&(b<k||b>a+k||h<l-.5||h>q+l)?(g.showBalloon(m),g.hide(0)):(g.followCursor(c),g.showBalloon(m)))):(this.hideBalloonReal(),g.hide(),this.resizeBullet(a,e,h))}else this.hideBalloonReal()}},resizeBullet:function(a,b,c){this.fixBulletSize();if(a&&d.isModern&&(1!=b||!isNaN(c))){var e=a.bulletGraphics;e&&!e.doNotScale&&(e.translate(a.bx,a.by,b),isNaN(c)||(e.setAttr("fill-opacity",c),e.setAttr("stroke-opacity",c)),this.resizedDItem=a)}}})})();(function(){var d=window.AmCharts;d.ChartCursor=d.Class({construct:function(a){this.cname="ChartCursor";this.createEvents("changed","zoomed","onHideCursor","onShowCursor","draw","selected","moved","panning","zoomStarted");this.enabled=!0;this.cursorAlpha=1;this.selectionAlpha=.2;this.cursorColor="#CC0000";this.categoryBalloonAlpha=1;this.color="#FFFFFF";this.type="cursor";this.zoomed=!1;this.zoomable=!0;this.pan=!1;this.categoryBalloonDateFormat="MMM DD, YYYY";this.categoryBalloonText="[[category]]";this.categoryBalloonEnabled=this.valueBalloonsEnabled=!0;this.rolledOver=!1;this.cursorPosition="middle";this.bulletsEnabled=this.skipZoomDispatch=!1;this.bulletSize=8;this.selectWithoutZooming=this.oneBalloonOnly=!1;this.graphBulletSize=1.7;this.animationDuration=.3;this.zooming=!1;this.adjustment=0;this.avoidBalloonOverlapping=!0;this.leaveCursor=!1;this.leaveAfterTouch=!0;this.valueZoomable=!1;this.balloonPointerOrientation="horizontal";this.hLineEnabled=this.vLineEnabled=!0;this.vZoomEnabled=this.hZoomEnabled=!1;d.applyTheme(this,a,this.cname)},draw:function(){this.destroy();var a=this.chart;a.panRequired=!0;var b=a.container;this.rotate=a.rotate;this.container=b;this.prevLineHeight=this.prevLineWidth=NaN;b=b.set();b.translate(this.x,this.y);this.set=b;a.cursorSet.push(b);this.createElements();d.isString(this.limitToGraph)&&(this.limitToGraph=d.getObjById(a.graphs,this.limitToGraph),this.fullWidth=!1,this.cursorPosition="middle");this.pointer=this.balloonPointerOrientation.substr(0,1).toUpperCase();this.isHidden=!1;this.hideLines();this.valueLineAxis||(this.valueLineAxis=a.valueAxes[0])},createElements:function(){var a=this,b=a.chart,c=b.dx,e=b.dy,h=a.width,f=a.height,g,k,l=a.cursorAlpha,m=a.valueLineAlpha;a.rotate?(g=m,k=l):(k=m,g=l);"xy"==b.type&&(k=l,void 0!==m&&(k=m),g=l);a.vvLine=d.line(a.container,[c,0,0],[e,0,f],a.cursorColor,g,1);d.setCN(b,a.vvLine,"cursor-line");d.setCN(b,a.vvLine,"cursor-line-vertical");a.hhLine=d.line(a.container,[0,h,h+c],[0,0,e],a.cursorColor,k,1);d.setCN(b,a.hhLine,"cursor-line");d.setCN(b,a.hhLine,"cursor-line-horizontal");a.vLine=a.rotate?a.vvLine:a.hhLine;a.set.push(a.vvLine);a.set.push(a.hhLine);a.set.node.style.pointerEvents="none";a.fullLines=a.container.set();b=b.cursorLineSet;b.push(a.fullLines);b.translate(a.x,a.y);b.clipRect(-1,-1,h+2,f+2);void 0!==a.tabIndex&&(b.setAttr("tabindex",a.tabIndex),b.keyup(function(b){a.handleKeys(b)}).focus(function(b){a.showCursor()}).blur(function(b){a.hideCursor()}));a.set.clipRect(0,0,h,f)},handleKeys:function(a){var b=this.prevIndex,c=this.chart;if(c){var e=c.chartData;e&&(isNaN(b)&&(b=e.length-1),37!=a.keyCode&&40!=a.keyCode||b--,39!=a.keyCode&&38!=a.keyCode||b++,b=d.fitToBounds(b,c.startIndex,c.endIndex),(a=this.chart.chartData[b])&&this.setPosition(a.x.categoryAxis),this.prevIndex=b)}},update:function(){var a=this.chart;if(a){var b=a.mouseX-this.x,c=a.mouseY-this.y;this.mouseX=b;this.mouseY=c;this.mouse2X=a.mouse2X-this.x;this.mouse2Y=a.mouse2Y-this.y;var e;if(a.chartData&&0<a.chartData.length){this.mouseIsOver()?(this.hideGraphBalloons=!1,this.rolledOver=e=!0,this.updateDrawing(),this.vvLine&&isNaN(this.fx)&&(a.rotate||!this.limitToGraph)&&this.vvLine.translate(b,0),!this.hhLine||!isNaN(this.fy)||a.rotate&&this.limitToGraph||this.hhLine.translate(0,c),isNaN(this.mouse2X)?this.dispatchMovedEvent(b,c):e=!1):this.forceShow||this.hideCursor();if(this.zooming){if(!isNaN(this.mouse2X)){isNaN(this.mouse2X0)||this.dispatchPanEvent();return}if(this.pan){this.dispatchPanEvent();return}(this.hZoomEnabled||this.vZoomEnabled)&&this.zooming&&this.updateSelection()}e&&this.showCursor()}}},updateDrawing:function(){this.drawing&&this.chart.setMouseCursor("crosshair");if(this.drawingNow&&(d.remove(this.drawingLine),1<Math.abs(this.drawStartX-this.mouseX)||1<Math.abs(this.drawStartY-this.mouseY))){var a=this.chart,b=a.marginTop,a=a.marginLeft;this.drawingLine=d.line(this.container,[this.drawStartX+a,this.mouseX+a],[this.drawStartY+b,this.mouseY+b],this.cursorColor,1,1)}},fixWidth:function(a){if(this.fullWidth&&this.prevLineWidth!=a){var b=this.vvLine,c=0;b&&(b.remove(),c=b.x);b=this.container.set();b.translate(c,0);c=d.rect(this.container,a,this.height,this.cursorColor,this.cursorAlpha,this.cursorAlpha,this.cursorColor);d.setCN(this.chart,c,"cursor-fill");c.translate(-a/2-1,0);b.push(c);this.vvLine=b;this.fullLines.push(b);this.prevLineWidth=a}},fixHeight:function(a){if(this.fullWidth&&this.prevLineHeight!=a){var b=this.hhLine,c=0;b&&(b.remove(),c=b.y);b=this.container.set();b.translate(0,c);c=d.rect(this.container,this.width,a,this.cursorColor,this.cursorAlpha);c.translate(0,-a/2);b.push(c);this.fullLines.push(b);this.hhLine=b;this.prevLineHeight=a}},fixVLine:function(a,b){if(!isNaN(a)){if(isNaN(this.prevLineX)){var c=0,e=this.mouseX;if(this.limitToGraph){var d=this.chart.categoryAxis;d&&(this.chart.rotate||(c="bottom"==d.position?this.height:-this.height),e=a)}this.vvLine.translate(e,c)}else this.prevLineX!=a&&this.vvLine.translate(this.prevLineX,this.prevLineY);this.fx=a;this.prevLineX!=a&&(c=this.animationDuration,this.zooming&&(c=0),this.vvLine.stop(),this.vvLine.animate({translate:a+","+b},c,"easeOutSine"),this.prevLineX=a,this.prevLineY=b)}},fixHLine:function(a,b){if(!isNaN(a)){if(isNaN(this.prevLineY)){var c=0,e=this.mouseY;if(this.limitToGraph){var d=this.chart.categoryAxis;d&&(this.chart.rotate&&(c="right"==d.position?this.width:-this.width),e=a)}this.hhLine.translate(c,e)}else this.prevLineY!=a&&this.hhLine.translate(this.prevLineX,this.prevLineY);this.fy=a;this.prevLineY!=a&&(c=this.animationDuration,this.zooming&&(c=0),this.hhLine.stop(),this.hhLine.animate({translate:b+","+a},c,"easeOutSine"),this.prevLineY=a,this.prevLineX=b)}},hideCursor:function(a){this.forceShow=!1;this.chart.wasTouched&&this.leaveAfterTouch||this.isHidden||this.leaveCursor||(this.hideCursorReal(),a?this.chart.handleCursorHide():this.fire({target:this,chart:this.chart,type:"onHideCursor"}),this.chart.setMouseCursor("auto"))},hideCursorReal:function(){this.hideLines();this.isHidden=!0;this.index=this.prevLineY=this.prevLineX=this.mouseY0=this.mouseX0=this.fy=this.fx=NaN},hideLines:function(){this.vvLine&&this.vvLine.hide();this.hhLine&&this.hhLine.hide();this.fullLines&&this.fullLines.hide();this.isHidden=!0;this.chart.handleCursorHide()},showCursor:function(a){!this.drawing&&this.enabled&&(this.vLineEnabled&&this.vvLine&&this.vvLine.show(),this.hLineEnabled&&this.hhLine&&this.hhLine.show(),this.isHidden=!1,this.updateFullLine(),a||this.fire({target:this,chart:this.chart,type:"onShowCursor"}),this.pan&&this.chart.setMouseCursor("move"))},updateFullLine:function(){this.zooming&&this.fullWidth&&this.selection&&(this.rotate?0<this.selection.height&&this.hhLine.hide():0<this.selection.width&&this.vvLine.hide())},updateSelection:function(){if(!this.pan&&this.enabled){var a=this.mouseX,b=this.mouseY;isNaN(this.fx)||(a=this.fx);isNaN(this.fy)||(b=this.fy);this.clearSelection();var c=this.mouseX0,e=this.mouseY0,h=this.width,f=this.height,a=d.fitToBounds(a,0,h),b=d.fitToBounds(b,0,f),g;a<c&&(g=a,a=c,c=g);b<e&&(g=b,b=e,e=g);this.hZoomEnabled?h=a-c:c=0;this.vZoomEnabled?f=b-e:e=0;isNaN(this.mouse2X)&&0<Math.abs(h)&&0<Math.abs(f)&&(a=this.chart,b=d.rect(this.container,h,f,this.cursorColor,this.selectionAlpha),d.setCN(a,b,"cursor-selection"),b.width=h,b.height=f,b.translate(c,e),this.set.push(b),this.selection=b);this.updateFullLine()}},mouseIsOver:function(){var a=this.mouseX,b=this.mouseY;if(this.justReleased)return this.justReleased=!1,!0;if(this.mouseIsDown)return!0;if(!this.chart.mouseIsOver)return this.handleMouseOut(),!1;if(0<a&&a<this.width&&0<b&&b<this.height)return!0;this.handleMouseOut()},fixPosition:function(){this.prevY=this.prevX=NaN},handleMouseDown:function(){this.update();if(this.mouseIsOver())if(this.mouseIsDown=!0,this.mouseX0=this.mouseX,this.mouseY0=this.mouseY,this.mouse2X0=this.mouse2X,this.mouse2Y0=this.mouse2Y,this.drawing)this.drawStartY=this.mouseY,this.drawStartX=this.mouseX,this.drawingNow=!0;else if(this.dispatchMovedEvent(this.mouseX,this.mouseY),!this.pan&&isNaN(this.mouse2X0)&&(isNaN(this.fx)||(this.mouseX0=this.fx),isNaN(this.fy)||(this.mouseY0=this.fy)),this.hZoomEnabled||this.vZoomEnabled){this.zooming=!0;var a={chart:this.chart,target:this,type:"zoomStarted"};a.x=this.mouseX/this.width;a.y=this.mouseY/this.height;this.index0=a.index=this.index;this.timestamp0=this.timestamp;this.fire(a)}},registerInitialMouse:function(){},handleReleaseOutside:function(){this.mouseIsDown=!1;if(this.drawingNow){this.drawingNow=!1;d.remove(this.drawingLine);var a=this.drawStartX,b=this.drawStartY,c=this.mouseX,e=this.mouseY,h=this.chart;(2<Math.abs(a-c)||2<Math.abs(b-e))&&this.fire({type:"draw",target:this,chart:h,initialX:a,initialY:b,finalX:c,finalY:e})}this.zooming&&(this.zooming=!1,this.selectWithoutZooming?this.dispatchZoomEvent("selected"):(this.hZoomEnabled||this.vZoomEnabled)&&this.dispatchZoomEvent("zoomed"),this.rolledOver&&this.dispatchMovedEvent(this.mouseX,this.mouseY));this.mouse2Y0=this.mouse2X0=this.mouseY0=this.mouseX0=NaN},dispatchZoomEvent:function(a){if(!this.pan){var b=this.selection;if(b&&3<Math.abs(b.width)&&3<Math.abs(b.height)){var c=Math.min(this.index,this.index0),e=Math.max(this.index,this.index0),d=c,f=e,g=this.chart,k=g.chartData,l=g.categoryAxis;l&&l.parseDates&&!l.equalSpacing&&(d=k[c]?k[c].time:Math.min(this.timestamp0,this.timestamp),f=k[e]?g.getEndTime(k[e].time):Math.max(this.timestamp0,this.timestamp));var b={type:a,chart:this.chart,target:this,end:f,start:d,startIndex:c,endIndex:e,selectionHeight:b.height,selectionWidth:b.width,selectionY:b.y,selectionX:b.x},m;this.hZoomEnabled&&4<Math.abs(this.mouseX0-
this.mouseX)&&(b.startX=this.mouseX0/this.width,b.endX=this.mouseX/this.width,m=!0);this.vZoomEnabled&&4<Math.abs(this.mouseY0-this.mouseY)&&(b.startY=1-this.mouseY0/this.height,b.endY=1-this.mouseY/this.height,m=!0);m&&(this.prevY=this.prevX=NaN,this.fire(b),"selected"!=a&&this.clearSelection());this.hideCursor()}}},dispatchMovedEvent:function(a,b,c,e){a=Math.round(a);b=Math.round(b);if(!this.isHidden&&(a!=this.prevX||b!=this.prevY||"changed"==c)){c||(c="moved");var d=this.fx,f=this.fy;isNaN(d)&&(d=a);isNaN(f)&&(f=b);var g=!1;this.zooming&&this.pan&&(g=!0);g={hidden:this.isHidden,type:c,chart:this.chart,target:this,x:a,y:b,finalX:d,finalY:f,zooming:this.zooming,panning:g,mostCloseGraph:this.mostCloseGraph,index:this.index,skip:e,hideBalloons:this.hideGraphBalloons};this.prevIndex=this.index;this.rotate?(g.position=b,g.finalPosition=f):(g.position=a,g.finalPosition=d);this.prevX=a;this.prevY=b;e?this.chart.handleCursorMove(g):(this.fire(g),"changed"==c&&this.chart.fire(g))}},dispatchPanEvent:function(){if(this.mouseIsDown){var a=d.roundTo((this.mouseX-this.mouseX0)/this.width,3),b=d.roundTo((this.mouseY-this.mouseY0)/this.height,3),c=d.roundTo((this.mouse2X-this.mouse2X0)/this.width,3),e=d.roundTo((this.mouse2Y-this.mouse2Y0)/this.height,2),h=!1;0!==Math.abs(a)&&0!==Math.abs(b)&&(h=!0);if(this.prevDeltaX==a||this.prevDeltaY==b)h=!1;isNaN(c)||isNaN(e)||(0!==Math.abs(c)&&0!==Math.abs(e)&&(h=!0),this.prevDelta2X!=c&&this.prevDelta2Y!=e)||(h=!1);h&&(this.hideLines(),this.fire({type:"panning",chart:this.chart,target:this,deltaX:a,
deltaY:b,delta2X:c,delta2Y:e,index:this.index}),this.prevDeltaX=a,this.prevDeltaY=b,this.prevDelta2X=c,this.prevDelta2Y=e)}},clearSelection:function(){var a=this.selection;a&&(a.width=0,a.height=0,a.remove())},destroy:function(){this.clear();d.remove(this.selection);this.selection=null;clearTimeout(this.syncTO);d.remove(this.set)},clear:function(){},setTimestamp:function(a){this.timestamp=a},setIndex:function(a,b){a!=this.index&&(this.index=a,b||this.isHidden||this.dispatchMovedEvent(this.mouseX,this.mouseY,"changed"))},handleMouseOut:function(){this.enabled&&this.rolledOver&&(this.leaveCursor||this.setIndex(void 0),this.forceShow=!1,this.hideCursor(),this.rolledOver=!1)},showCursorAt:function(a){var b=this.chart.categoryAxis;b&&this.setPosition(b.categoryToCoordinate(a),a)},setPosition:function(a,b){var c=this.chart,e=c.categoryAxis;if(e){var d,f;void 0===b&&(b=e.coordinateToValue(a));e.showBalloonAt(b,a);this.forceShow=!0;e.stickBalloonToCategory?c.rotate?this.fixHLine(a,0):this.fixVLine(a,0):(this.showCursor(),c.rotate?this.hhLine.translate(0,a):this.vvLine.translate(a,0));c.rotate?d=a:f=a;c.rotate?(this.vvLine&&this.vvLine.hide(),this.hhLine&&this.hhLine.show()):(this.hhLine&&this.hhLine.hide(),this.vvLine&&this.vvLine.show());this.updateFullLine();this.isHidden=!1;this.dispatchMovedEvent(f,d,"moved",!0)}},enableDrawing:function(a){this.enabled=!a;this.hideCursor();this.drawing=a},syncWithCursor:function(a,b){clearTimeout(this.syncTO);a&&(a.isHidden?this.hideCursor(!0):this.syncWithCursorReal(a,b))},isZooming:function(a){this.zooming=a},syncWithCursorReal:function(a,b){var c=a.vvLine,e=a.hhLine;this.index=a.index;this.forceShow=!0;this.zooming&&this.pan||this.showCursor(!0);this.hideGraphBalloons=b;this.justReleased=a.justReleased;this.zooming=a.zooming;this.index0=a.index0;this.mouseX0=a.mouseX0;this.mouseY0=a.mouseY0;this.mouse2X0=a.mouse2X0;this.mouse2Y0=a.mouse2Y0;this.timestamp0=a.timestamp0;this.prevDeltaX=a.prevDeltaX;this.prevDeltaY=a.prevDeltaY;this.prevDelta2X=a.prevDelta2X;this.prevDelta2Y=a.prevDelta2Y;this.fx=a.fx;this.fy=a.fy;a.zooming&&this.updateSelection();var d=a.mouseX,f=a.mouseY;this.rotate?(d=NaN,this.vvLine&&this.vvLine.hide(),this.hhLine&&e&&(isNaN(a.fy)?this.hhLine.translate(0,a.mouseY):this.fixHLine(a.fy,0))):(f=NaN,this.hhLine&&this.hhLine.hide(),this.vvLine&&c&&(isNaN(a.fx)?this.vvLine.translate(a.mouseX,0):this.fixVLine(a.fx,0)));this.dispatchMovedEvent(d,f,"moved",!0)}})})();(function(){var d=window.AmCharts;d.SimpleChartScrollbar=d.Class({construct:function(a){this.createEvents("zoomed","zoomStarted","zoomEnded");this.backgroundColor="#D4D4D4";this.backgroundAlpha=1;this.selectedBackgroundColor="#EFEFEF";this.scrollDuration=this.selectedBackgroundAlpha=1;this.resizeEnabled=!0;this.hideResizeGrips=!1;this.scrollbarHeight=20;this.updateOnReleaseOnly=!1;9>document.documentMode&&(this.updateOnReleaseOnly=!0);this.dragIconHeight=this.dragIconWidth=35;this.dragIcon="dragIconRoundBig";this.dragCursorHover="cursor: move; cursor: grab; cursor: -moz-grab; cursor: -webkit-grab;";this.dragCursorDown="cursor: move; cursor: grab; cursor: -moz-grabbing; cursor: -webkit-grabbing;";this.vResizeCursor="ns-resize";this.hResizeCursor="ew-resize";this.enabled=!0;this.percentStart=this.offset=0;this.percentEnd=1;d.applyTheme(this,a,"SimpleChartScrollbar")},getPercents:function(){var a=this.getDBox(),b=a.x,c=a.y,e=a.width,a=a.height;this.rotate?(b=1-c/this.height,c=1-(c+a)/this.height):(c=b/this.width,
b=(b+e)/this.width);this.percentStart=c;this.percentEnd=b},draw:function(){var a=this;a.destroy();if(a.enabled){var b=a.chart.container,c=a.rotate,e=a.chart;e.panRequired=!0;var h=b.set();a.set=h;c?d.setCN(e,h,"scrollbar-vertical"):d.setCN(e,h,"scrollbar-horizontal");e.scrollbarsSet.push(h);var f,g;c?(f=a.scrollbarHeight,g=e.plotAreaHeight):(g=a.scrollbarHeight,f=e.plotAreaWidth);a.width=f;if((a.height=g)&&f){var k=d.rect(b,f,g,a.backgroundColor,a.backgroundAlpha,1,a.backgroundColor,a.backgroundAlpha);
d.setCN(e,k,"scrollbar-bg");a.bg=k;h.push(k);k=d.rect(b,f,g,"#000",.005);h.push(k);a.invisibleBg=k;k.click(function(){a.handleBgClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()}).touchend(function(){a.handleBgClick()});k=d.rect(b,f,g,a.selectedBackgroundColor,a.selectedBackgroundAlpha);d.setCN(e,k,"scrollbar-bg-selected");a.selectedBG=k;h.push(k);f=d.rect(b,f,g,"#000",.005);a.dragger=f;h.push(f);f.mousedown(function(b){a.handleDragStart(b)}).mouseup(function(){a.handleDragStop()}).mouseover(function(){a.handleDraggerOver()}).mouseout(function(){a.handleMouseOut()}).touchstart(function(b){a.handleDragStart(b)}).touchend(function(){a.handleDragStop()});g=e.pathToImages;var l,k=a.dragIcon.replace(/\.[a-z]*$/i,"");d.isAbsolute(k)&&(g="");c?(l=g+k+"H"+e.extension,g=a.dragIconWidth,c=a.dragIconHeight):(l=g+k+e.extension,c=a.dragIconWidth,g=a.dragIconHeight);k=b.image(l,0,0,c,g);d.setCN(e,k,"scrollbar-grip-left");l=b.image(l,0,0,c,g);d.setCN(e,l,"scrollbar-grip-right");var m=10,p=20;e.panEventsEnabled&&(m=25,p=a.scrollbarHeight);var q=d.rect(b,m,p,"#000",.005),n=d.rect(b,m,p,"#000",.005);n.translate(-(m-c)/2,-(p-g)/2);q.translate(-(m-c)/2,-(p-g)/2);
c=b.set([k,n]);b=b.set([l,q]);a.iconLeft=c;h.push(a.iconLeft);a.iconRight=b;h.push(b);a.updateGripCursor(!1);e.makeAccessible(c,a.accessibleLabel);e.makeAccessible(b,a.accessibleLabel);e.makeAccessible(f,a.accessibleLabel);c.setAttr("role","menuitem");b.setAttr("role","menuitem");f.setAttr("role","menuitem");void 0!==a.tabIndex&&(c.setAttr("tabindex",a.tabIndex),c.keyup(function(b){a.handleKeys(b,1,0)}));void 0!==a.tabIndex&&(f.setAttr("tabindex",a.tabIndex),f.keyup(function(b){a.handleKeys(b,1,1)}));void 0!==a.tabIndex&&(b.setAttr("tabindex",a.tabIndex),b.keyup(function(b){a.handleKeys(b,0,1)}));c.mousedown(function(){a.leftDragStart()}).mouseup(function(){a.leftDragStop()}).mouseover(function(){a.iconRollOver()}).mouseout(function(){a.iconRollOut()}).touchstart(function(){a.leftDragStart()}).touchend(function(){a.leftDragStop()});b.mousedown(function(){a.rightDragStart()}).mouseup(function(){a.rightDragStop()}).mouseover(function(){a.iconRollOver()}).mouseout(function(){a.iconRollOut()}).touchstart(function(){a.rightDragStart()}).touchend(function(){a.rightDragStop()});d.ifArray(e.chartData)?h.show():h.hide();a.hideDragIcons();a.clipDragger(!1)}h.translate(a.x,a.y);h.node.style.msTouchAction="none";h.node.style.touchAction="none"}},handleKeys:function(a,b,c){this.getPercents();var e=this.percentStart,d=this.percentEnd;if(this.rotate)var f=d,d=e,e=f;if(37==a.keyCode||40==a.keyCode)e-=.02*b,d-=.02*c;if(39==a.keyCode||38==a.keyCode)e+=.02*b,d+=.02*c;this.rotate&&(a=d,d=e,e=a);isNaN(d)||isNaN(e)||this.percentZoom(e,d,!0)},updateScrollbarSize:function(a,b){if(!isNaN(a)&&!isNaN(b)){a=Math.round(a);b=Math.round(b);var c=this.dragger,e,d,f,g,k;this.rotate?(e=0,d=a,f=this.width+1,g=b-a,c.setAttr("height",b-a),c.setAttr("y",d)):(e=a,d=0,f=b-a,g=this.height+1,k=b-a,c.setAttr("x",e),c.setAttr("width",k));this.clipAndUpdate(e,d,f,g)}},update:function(){var a,b=!1,c,e,d=this.x,f=this.y,g=this.dragger,k=this.getDBox();if(k){c=k.x+d;e=k.y+f;var l=k.width,k=k.height,m=this.rotate,p=this.chart,q=this.width,n=this.height,t=p.mouseX,p=p.mouseY;a=this.initialMouse;this.forceClip&&this.clipDragger(!0);if(this.dragging){var r=this.initialCoord;m?(a=r+(p-a),0>a&&(a=0),r=n-k,a>r&&(a=r),g.setAttr("y",a)):(a=r+(t-a),0>a&&(a=0),r=q-l,a>r&&(a=r),g.setAttr("x",a));this.clipDragger(!0)}if(this.resizingRight){if(m)if(a=p-e,!isNaN(this.maxHeight)&&a>this.maxHeight&&(a=this.maxHeight),a+e>n+f&&(a=n-e+f),0>a)this.resizingRight=!1,b=this.resizingLeft=!0;else{if(0===a||isNaN(a))a=.1;g.setAttr("height",a)}else if(a=t-c,!isNaN(this.maxWidth)&&a>this.maxWidth&&(a=this.maxWidth),a+c>q+d&&(a=q-c+d),0>a)this.resizingRight=!1,b=this.resizingLeft=!0;else{if(0===a||isNaN(a))a=.1;g.setAttr("width",a)}this.clipDragger(!0)}if(this.resizingLeft){if(m)if(c=e,e=p,e<f&&(e=f),isNaN(e)&&(e=f),e>n+f&&(e=n+f),a=!0===b?c-e:k+c-e,!isNaN(this.maxHeight)&&a>this.maxHeight&&(a=this.maxHeight,e=c),0>a)this.resizingRight=!0,this.resizingLeft=!1,g.setAttr("y",c+k-f);else{if(0===a||isNaN(a))a=.1;g.setAttr("y",e-f);g.setAttr("height",a)}else if(e=t,e<d&&(e=d),isNaN(e)&&(e=d),e>q+d&&(e=q+d),a=!0===b?c-e:l+c-e,!isNaN(this.maxWidth)&&a>this.maxWidth&&(a=this.maxWidth,e=c),0>a)this.resizingRight=!0,this.resizingLeft=!1,g.setAttr("x",c+l-d);else{if(0===a||isNaN(a))a=.1;g.setAttr("x",e-d);g.setAttr("width",a)}this.clipDragger(!0)}}},stopForceClip:function(){this.animating=this.forceClip=!1},clipDragger:function(a){var b=this.getDBox();if(b){var c=b.x,e=b.y,d=b.width,b=b.height,f=!1;if(this.rotate){if(c=0,d=this.width+1,this.clipY!=e||this.clipH!=b)f=!0}else if(e=0,b=this.height+1,this.clipX!=c||this.clipW!=d)f=!0;f&&(this.clipAndUpdate(c,e,d,b),a&&(this.updateOnReleaseOnly||this.dispatchScrollbarEvent()))}},maskGraphs:function(){},clipAndUpdate:function(a,b,c,d){this.clipX=a;this.clipY=b;this.clipW=c;this.clipH=d;this.selectedBG.setAttr("width",c);this.selectedBG.setAttr("height",d);this.selectedBG.translate(a,b);this.updateDragIconPositions();this.maskGraphs(a,b,c,d)},dispatchScrollbarEvent:function(){if(this.skipEvent)this.skipEvent=!1;else{var a=this.chart;a.hideBalloon();var b=this.getDBox(),c=b.x,d=b.y,h=b.width,b=b.height;this.getPercents();this.rotate?(c=d,h=this.height/b):h=this.width/h;this.fire({type:"zoomed",position:c,chart:a,target:this,multiplier:h,relativeStart:this.percentStart,relativeEnd:this.percentEnd})}},updateDragIconPositions:function(){var a=this.getDBox(),b=a.x,c=a.y,d=this.iconLeft,h=this.iconRight,f,g,k=this.scrollbarHeight;this.rotate?(f=this.dragIconWidth,g=this.dragIconHeight,d.translate((k-g)/2,c-f/2),h.translate((k-g)/2,c+a.height-f/2)):(f=this.dragIconHeight,
g=this.dragIconWidth,d.translate(b-g/2,(k-f)/2),h.translate(b-g/2+a.width,(k-f)/2))},showDragIcons:function(){this.resizeEnabled&&(this.iconLeft.show(),this.iconRight.show())},hideDragIcons:function(){if(!this.resizingLeft&&!this.resizingRight&&!this.dragging){if(this.hideResizeGrips||!this.resizeEnabled)this.iconLeft.hide(),this.iconRight.hide();this.removeCursors()}},removeCursors:function(){this.chart.setMouseCursor("auto")},fireZoomEvent:function(a){this.fire({type:a,chart:this.chart,target:this})},
percentZoom:function(a,b,c){a=d.fitToBounds(a,0,b);b=d.fitToBounds(b,a,1);if(this.dragger&&this.enabled){this.dragger.stop();isNaN(a)&&(a=0);isNaN(b)&&(b=1);var e,h;this.rotate?(e=this.height,b=e-e*b,h=e-e*a):(e=this.width,h=e*b,b=e*a);this.updateScrollbarSize(b,h);this.clipDragger(!1);this.getPercents();c&&this.dispatchScrollbarEvent()}},destroy:function(){this.clear();d.remove(this.set);d.remove(this.iconRight);d.remove(this.iconLeft)},clear:function(){},handleDragStart:function(){if(this.enabled){this.fireZoomEvent("zoomStarted");var a=this.chart;this.dragger.stop();this.removeCursors();d.isModern&&this.dragger.node.setAttribute("style",this.dragCursorDown);this.dragging=!0;var b=this.getDBox();this.rotate?(this.initialCoord=b.y,this.initialMouse=a.mouseY):(this.initialCoord=b.x,this.initialMouse=a.mouseX)}},handleDragStop:function(){this.updateOnReleaseOnly&&(this.update(),this.skipEvent=!1,this.dispatchScrollbarEvent());this.dragging=!1;this.mouseIsOver&&this.removeCursors();d.isModern&&this.dragger.node.setAttribute("style",this.dragCursorHover);this.update();this.fireZoomEvent("zoomEnded")},handleDraggerOver:function(){this.handleMouseOver();d.isModern&&this.dragger.node.setAttribute("style",this.dragCursorHover)},leftDragStart:function(){this.fireZoomEvent("zoomStarted");this.dragger.stop();this.resizingLeft=!0;this.updateGripCursor(!0)},updateGripCursor:function(a){d.isModern&&(a=this.rotate?a?this.vResizeCursorDown:this.vResizeCursorHover:a?this.hResizeCursorDown:this.hResizeCursorHover)&&(this.iconRight&&this.iconRight.node.setAttribute("style",a),this.iconLeft&&this.iconLeft.node.setAttribute("style",a))},leftDragStop:function(){this.resizingLeft&&(this.resizingLeft=!1,this.mouseIsOver||this.removeCursors(),this.updateOnRelease(),this.fireZoomEvent("zoomEnded"));this.updateGripCursor(!1)},rightDragStart:function(){this.fireZoomEvent("zoomStarted");this.dragger.stop();this.resizingRight=!0;this.updateGripCursor(!0)},rightDragStop:function(){this.resizingRight&&(this.resizingRight=!1,this.mouseIsOver||this.removeCursors(),this.updateOnRelease(),this.fireZoomEvent("zoomEnded"));this.updateGripCursor(!1)},iconRollOut:function(){this.removeCursors()},iconRollOver:function(){this.rotate?this.vResizeCursor&&this.chart.setMouseCursor(this.vResizeCursor):this.hResizeCursor&&this.chart.setMouseCursor(this.hResizeCursor);this.handleMouseOver()},getDBox:function(){if(this.dragger)return this.dragger.getBBox()},handleBgClick:function(){var a=this;if(!a.resizingRight&&!a.resizingLeft){a.zooming=!0;var b,c,e=a.scrollDuration,h=a.dragger;b=a.getDBox();var f=b.height,g=b.width;c=a.chart;var k=a.y,l=a.x,m=a.rotate;m?(b="y",c=c.mouseY-f/2-k,c=d.fitToBounds(c,0,a.height-f)):(b="x",c=c.mouseX-g/2-l,c=d.fitToBounds(c,0,a.width-g));a.updateOnReleaseOnly?(a.skipEvent=!1,h.setAttr(b,c),a.dispatchScrollbarEvent(),a.clipDragger()):(a.animating=!0,c=Math.round(c),m?h.animate({y:c},e,">"):h.animate({x:c},e,">"),a.forceClip=!0,clearTimeout(a.forceTO),a.forceTO=setTimeout(function(){a.stopForceClip.call(a)},5E3*e))}},updateOnRelease:function(){this.updateOnReleaseOnly&&(this.update(),this.skipEvent=!1,this.dispatchScrollbarEvent())},handleReleaseOutside:function(){if(this.set){if(this.resizingLeft||this.resizingRight||this.dragging)this.dragging=this.resizingRight=this.resizingLeft=!1,this.updateOnRelease(),this.removeCursors();this.animating=this.mouseIsOver=!1;this.hideDragIcons();this.update()}},handleMouseOver:function(){this.mouseIsOver=!0;this.showDragIcons()},handleMouseOut:function(){this.mouseIsOver=!1;this.hideDragIcons();this.removeCursors()}})})();(function(){var d=window.AmCharts;d.ChartScrollbar=d.Class({inherits:d.SimpleChartScrollbar,construct:function(a){this.cname="ChartScrollbar";d.ChartScrollbar.base.construct.call(this,a);this.graphLineColor="#BBBBBB";this.graphLineAlpha=0;this.graphFillColor="#BBBBBB";this.graphFillAlpha=1;this.selectedGraphLineColor="#888888";this.selectedGraphLineAlpha=0;this.selectedGraphFillColor="#888888";this.selectedGraphFillAlpha=1;this.gridCount=0;this.gridColor="#FFFFFF";this.gridAlpha=.7;this.skipEvent=this.autoGridCount=!1;this.color="#FFFFFF";this.scrollbarCreated=!1;this.oppositeAxis=!0;this.accessibleLabel="Zoom chart using cursor arrows";d.applyTheme(this,a,this.cname)},init:function(){var a=this.categoryAxis,b=this.chart,c=this.gridAxis;a||("CategoryAxis"==this.gridAxis.cname?(this.catScrollbar=!0,a=new d.CategoryAxis,a.id="scrollbar"):(a=new d.ValueAxis,a.data=b.chartData,a.id=c.id,a.type=c.type,a.maximumDate=c.maximumDate,a.minimumDate=c.minimumDate,a.minPeriod=c.minPeriod,a.minMaxField=c.minMaxField),this.categoryAxis=a);a.chart=b;var e=b.categoryAxis;e&&(a.firstDayOfWeek=e.firstDayOfWeek);a.dateFormats=c.dateFormats;a.markPeriodChange=c.markPeriodChange;a.boldPeriodBeginning=c.boldPeriodBeginning;a.labelFunction=c.labelFunction;a.axisItemRenderer=d.RecItem;a.axisRenderer=d.RecAxis;a.guideFillRenderer=d.RecFill;a.inside=!0;a.fontSize=this.fontSize;a.tickLength=0;a.axisAlpha=0;d.isString(this.graph)&&(this.graph=d.getObjById(b.graphs,this.graph));(a=this.graph)&&this.catScrollbar&&(c=this.valueAxis,c||(this.valueAxis=c=new d.ValueAxis,c.visible=!1,c.scrollbar=!0,c.axisItemRenderer=d.RecItem,c.axisRenderer=d.RecAxis,c.guideFillRenderer=d.RecFill,c.labelsEnabled=!1,c.chart=b),b=this.unselectedGraph,b||(b=new d.AmGraph,b.scrollbar=!0,this.unselectedGraph=b,b.negativeBase=a.negativeBase,b.noStepRisers=a.noStepRisers),b=this.selectedGraph,b||(b=new d.AmGraph,b.scrollbar=!0,this.selectedGraph=b,b.negativeBase=a.negativeBase,b.noStepRisers=a.noStepRisers));this.scrollbarCreated=!0},draw:function(){var a=this;d.ChartScrollbar.base.draw.call(a);if(a.enabled){a.scrollbarCreated||a.init();var b=a.chart,c=b.chartData,e=a.categoryAxis,h=a.rotate,f=a.x,g=a.y,k=a.width,l=a.height,m=a.gridAxis,p=a.set;e.setOrientation(!h);e.parseDates=m.parseDates;"ValueAxis"==a.categoryAxis.cname&&(e.rotate=!h);e.equalSpacing=m.equalSpacing;e.minPeriod=m.minPeriod;e.startOnAxis=m.startOnAxis;e.width=k-1;e.height=l;e.gridCount=a.gridCount;e.gridColor=a.gridColor;e.gridAlpha=a.gridAlpha;e.color=a.color;e.tickLength=0;e.axisAlpha=0;e.autoGridCount=a.autoGridCount;e.parseDates&&!e.equalSpacing&&e.timeZoom(b.firstTime,b.lastTime);e.minimum=a.gridAxis.fullMin;e.maximum=a.gridAxis.fullMax;e.strictMinMax=!0;e.zoom(0,c.length-1);if((m=a.graph)&&a.catScrollbar){var q=a.valueAxis,n=m.valueAxis;q.id=n.id;q.rotate=h;q.setOrientation(h);q.width=k;q.height=l;q.dataProvider=c;q.reversed=n.reversed;q.logarithmic=n.logarithmic;q.gridAlpha=0;q.axisAlpha=0;p.push(q.set);h?(q.y=g,q.x=0):(q.x=f,q.y=0);var f=Infinity,g=-Infinity,t;for(t=0;t<c.length;t++){var r=c[t].axes[n.id].graphs[m.id].values,w;for(w in r)if(r.hasOwnProperty(w)&&"percents"!=w&&"total"!=w){var z=r[w];z<f&&(f=z);z>g&&(g=z)}}Infinity!=f&&(q.minimum=f);-Infinity!=g&&(q.maximum=g+.1*(g-f));f==g&&(--q.minimum,q.maximum+=1);void 0!==a.minimum&&(q.minimum=a.minimum);void 0!==a.maximum&&(q.maximum=a.maximum);q.zoom(0,c.length-1);w=a.unselectedGraph;w.id=m.id;w.bcn="scrollbar-graph-";w.rotate=h;w.chart=b;w.data=c;w.valueAxis=q;w.chart=m.chart;w.categoryAxis=a.categoryAxis;w.periodSpan=m.periodSpan;w.valueField=m.valueField;w.openField=m.openField;w.closeField=m.closeField;w.highField=m.highField;w.lowField=m.lowField;w.lineAlpha=a.graphLineAlpha;w.lineColorR=a.graphLineColor;w.fillAlphas=a.graphFillAlpha;w.fillColorsR=a.graphFillColor;w.connect=m.connect;w.hidden=m.hidden;w.width=k;w.height=l;w.pointPosition=m.pointPosition;w.stepDirection=m.stepDirection;w.periodSpan=m.periodSpan;n=a.selectedGraph;n.id=m.id;n.bcn=w.bcn+"selected-";n.rotate=h;n.chart=b;n.data=c;n.valueAxis=q;n.chart=m.chart;n.categoryAxis=e;n.periodSpan=m.periodSpan;n.valueField=m.valueField;n.openField=m.openField;n.closeField=m.closeField;n.highField=m.highField;n.lowField=m.lowField;n.lineAlpha=a.selectedGraphLineAlpha;n.lineColorR=a.selectedGraphLineColor;n.fillAlphas=a.selectedGraphFillAlpha;n.fillColorsR=a.selectedGraphFillColor;n.connect=m.connect;n.hidden=m.hidden;n.width=k;n.height=l;n.pointPosition=m.pointPosition;n.stepDirection=m.stepDirection;n.periodSpan=m.periodSpan;b=a.graphType;b||(b=m.type);w.type=b;n.type=b;c=c.length-1;w.zoom(0,c);n.zoom(0,c);n.set.click(function(){a.handleBackgroundClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()});w.set.click(function(){a.handleBackgroundClick()}).mouseover(function(){a.handleMouseOver()}).mouseout(function(){a.handleMouseOut()});p.push(w.set);p.push(n.set)}p.push(e.set);p.push(e.labelsSet);a.bg.toBack();a.invisibleBg.toFront();a.dragger.toFront();a.iconLeft.toFront();a.iconRight.toFront()}},timeZoom:function(a,b,c){this.startTime=a;this.endTime=b;this.timeDifference=b-a;this.skipEvent=!d.toBoolean(c);this.zoomScrollbar();this.dispatchScrollbarEvent()},zoom:function(a,b){this.start=a;this.end=b;this.skipEvent=!0;this.zoomScrollbar()},dispatchScrollbarEvent:function(){if(this.categoryAxis&&"ValueAxis"==this.categoryAxis.cname)d.ChartScrollbar.base.dispatchScrollbarEvent.call(this);else if(this.skipEvent)this.skipEvent=!1;else{var a=this.chart.chartData,b,c,e=this.dragger.getBBox();b=e.x;var h=e.y,f=e.width,e=e.height,g=this.chart;this.rotate?(b=h,c=e):c=f;f={type:"zoomed",target:this};f.chart=g;var k=this.categoryAxis,l=this.stepWidth,h=g.minSelectedTime,e=g.maxSelectedTime,m=!1;if(k.parseDates&&!k.equalSpacing){if(a=g.lastTime,g=g.firstTime,k=Math.round(b/l)+g,b=this.dragging?k+this.timeDifference:Math.round((b+c)/l)+g,k>b&&(k=b),0<h&&b-k<h&&(b=Math.round(k+(b-k)/2),m=Math.round(h/2),k=b-m,b+=m,m=!0),0<e&&b-k>e&&(b=Math.round(k+(b-k)/2),m=Math.round(e/2),k=b-m,b+=m,m=!0),b>a&&(b=
a),b-h<k&&(k=b-h),k<g&&(k=g),k+h>b&&(b=k+h),k!=this.startTime||b!=this.endTime)this.startTime=k,this.endTime=b,f.start=k,f.end=b,f.startDate=new Date(k),f.endDate=new Date(b),this.fire(f)}else{k.startOnAxis||(b+=l/2);c-=this.stepWidth/2;h=k.xToIndex(b);b=k.xToIndex(b+c);if(h!=this.start||this.end!=b)k.startOnAxis&&(this.resizingRight&&h==b&&b++,this.resizingLeft&&h==b&&(0<h?h--:b=1)),this.start=h,this.end=this.dragging?this.start+this.difference:b,f.start=this.start,f.end=this.end,k.parseDates&&(a[this.start]&&(f.startDate=new Date(a[this.start].time)),a[this.end]&&(f.endDate=new Date(a[this.end].time))),this.fire(f);this.percentStart=h;this.percentEnd=b}m&&this.zoomScrollbar(!0)}},zoomScrollbar:function(a){if((!(this.dragging||this.resizingLeft||this.resizingRight||this.animating)||a)&&this.dragger&&this.enabled){var b,c,d=this.chart;a=d.chartData;var h=this.categoryAxis;h.parseDates&&!h.equalSpacing?(a=h.stepWidth,c=d.firstTime,b=a*(this.startTime-c),c=a*(this.endTime-c)):(a[this.start]&&(b=a[this.start].x[h.id]),a[this.end]&&(c=a[this.end].x[h.id]),a=h.stepWidth,h.startOnAxis||(d=a/2,b-=d,c+=d));this.stepWidth=a;isNaN(b)||isNaN(c)||this.updateScrollbarSize(b,c)}},maskGraphs:function(a,b,c,d){var h=this.selectedGraph;h&&h.set.clipRect(a,b,c,d)},handleDragStart:function(){d.ChartScrollbar.base.handleDragStart.call(this);this.difference=this.end-this.start;this.timeDifference=this.endTime-this.startTime;0>this.timeDifference&&(this.timeDifference=0)},handleBackgroundClick:function(){d.ChartScrollbar.base.handleBackgroundClick.call(this);this.dragging||(this.difference=this.end-this.start,this.timeDifference=this.endTime-this.startTime,0>this.timeDifference&&(this.timeDifference=0))}})})();(function(){var d=window.AmCharts;d.AmBalloon=d.Class({construct:function(a){this.cname="AmBalloon";this.enabled=!0;this.fillColor="#FFFFFF";this.fillAlpha=.8;this.borderThickness=2;this.borderColor="#FFFFFF";this.borderAlpha=1;this.cornerRadius=0;this.maxWidth=220;this.horizontalPadding=8;this.verticalPadding=4;this.pointerWidth=6;this.pointerOrientation="V";this.color="#000000";this.adjustBorderColor=!0;this.show=this.follow=this.showBullet=!1;this.bulletSize=3;this.shadowAlpha=.4;this.shadowColor="#000000";this.fadeOutDuration=this.animationDuration=.3;this.fixedPosition=!0;this.offsetY=6;this.offsetX=1;this.textAlign="center";this.disableMouseEvents=!0;this.deltaSignX=this.deltaSignY=1;d.isModern||(this.offsetY*=1.5);this.sdy=this.sdx=0;d.applyTheme(this,a,this.cname)},draw:function(){var a=this.pointToX,b=this.pointToY;d.isModern||(this.drop=!1);var c=this.chart;d.VML&&(this.fadeOutDuration=0);this.xAnim&&c.stopAnim(this.xAnim);this.yAnim&&c.stopAnim(this.yAnim);this.sdy=this.sdx=0;if(!isNaN(a)){var e=this.follow,h=c.container,f=this.set;d.remove(f);this.removeDiv();f=h.set();f.node.style.pointerEvents="none";this.set=f;this.mainSet?(this.mainSet.push(this.set),this.sdx=this.mainSet.x,this.sdy=this.mainSet.y):c.balloonsSet.push(f);if(this.show){var g=this.l,k=this.t,l=this.r,m=this.b,p=this.balloonColor,q=this.fillColor,n=this.borderColor,t=q;void 0!=p&&(this.adjustBorderColor?t=n=p:q=p);var r=this.horizontalPadding,w=this.verticalPadding,z=this.pointerWidth,x=this.pointerOrientation,u=this.cornerRadius,A=c.fontFamily,y=this.fontSize;void 0==y&&(y=c.fontSize);var p=document.createElement("div"),B=c.classNamePrefix;p.className=B+"-balloon-div";this.className&&(p.className=p.className+" "+B+"-balloon-div-"+this.className);B=p.style;this.disableMouseEvents&&(B.pointerEvents="none");B.position="absolute";var D=this.minWidth,C="";isNaN(D)||(C="min-width:"+(D-2*r)+"px; ");p.innerHTML='<div style="text-align:'+this.textAlign+"; "+C+"max-width:"+this.maxWidth+"px; font-size:"+y+"px; color:"+this.color+"; font-family:"+
A+'">'+this.text+"</div>";c.chartDiv.appendChild(p);this.textDiv=p;var K=p.offsetWidth,H=p.offsetHeight;p.clientHeight&&(K=p.clientWidth,H=p.clientHeight);A=H+2*w;C=K+2*r;!isNaN(D)&&C<D&&(C=D);window.opera&&(A+=2);var Q=!1,y=this.offsetY;c.handDrawn&&(y+=c.handDrawScatter+2);"H"!=x?(D=a-C/2,b<k+A+10&&"down"!=x?(Q=!0,e&&(b+=y),y=b+z,this.deltaSignY=-1):(e&&(b-=y),y=b-A-z,this.deltaSignY=1)):(2*z>A&&(z=A/2),y=b-A/2,a<g+(l-g)/2?(D=a+z,this.deltaSignX=-1):(D=a-C-z,this.deltaSignX=1));y+A>=m&&(y=m-A);
y<k&&(y=k);D<g&&(D=g);D+C>l&&(D=l-C);var k=y+w,m=D+r,M=this.shadowAlpha,P=this.shadowColor,r=this.borderThickness,ia=this.bulletSize,I,w=this.fillAlpha,aa=this.borderAlpha;this.showBullet&&(I=d.circle(h,ia,t,w),f.push(I));this.drop?(g=C/1.6,l=0,"V"==x&&(x="down"),"H"==x&&(x="left"),"down"==x&&(D=a+1,y=b-g-g/3),"up"==x&&(l=180,D=a+1,y=b+g+g/3),"left"==x&&(l=270,D=a+g+g/3+2,y=b),"right"==x&&(l=90,D=a-g-g/3+2,y=b),k=y-H/2+1,m=D-K/2-1,q=d.drop(h,g,l,q,w,r,n,aa)):0<u||0===z?(0<M&&(a=d.rect(h,C,A,q,0,r+
1,P,M,u),d.isModern?a.translate(1,1):a.translate(4,4),f.push(a)),q=d.rect(h,C,A,q,w,r,n,aa,u)):(t=[],u=[],"H"!=x?(g=a-D,g>C-z&&(g=C-z),g<z&&(g=z),t=[0,g-z,a-D,g+z,C,C,0,0],u=Q?[0,0,b-y,0,0,A,A,0]:[A,A,b-y,A,A,0,0,A]):(x=b-y,x>A-z&&(x=A-z),x<z&&(x=z),u=[0,x-z,b-y,x+z,A,A,0,0],t=a<g+(l-g)/2?[0,0,D<a?0:a-D,0,0,C,C,0]:[C,C,D+C>a?C:a-D,C,C,0,0,C]),0<M&&(a=d.polygon(h,t,u,q,0,r,P,M),a.translate(1,1),f.push(a)),q=d.polygon(h,t,u,q,w,r,n,aa));this.bg=q;f.push(q);q.toFront();d.setCN(c,q,"balloon-bg");this.className&&
d.setCN(c,q,"balloon-bg-"+this.className);h=1*this.deltaSignX;m+=this.sdx;k+=this.sdy;B.left=m+"px";B.top=k+"px";f.translate(D-h,y,1,!0);q=q.getBBox();this.bottom=y+A+1;this.yPos=q.y+y;I&&I.translate(this.pointToX-D+h,b-y);b=this.animationDuration;0<this.animationDuration&&!e&&!isNaN(this.prevX)&&(f.translate(this.prevX,this.prevY,NaN,!0),f.animate({translate:D-h+","+y},b,"easeOutSine"),p&&(B.left=this.prevTX+"px",B.top=this.prevTY+"px",this.xAnim=c.animate({node:p},"left",this.prevTX,m,b,"easeOutSine","px"),this.yAnim=c.animate({node:p},"top",this.prevTY,k,b,"easeOutSine","px")));this.prevX=D-h;this.prevY=y;this.prevTX=m;this.prevTY=k}}},fixPrevious:function(){this.rPrevX=this.prevX;this.rPrevY=this.prevY;this.rPrevTX=this.prevTX;this.rPrevTY=this.prevTY},restorePrevious:function(){this.prevX=this.rPrevX;this.prevY=this.rPrevY;this.prevTX=this.rPrevTX;this.prevTY=this.rPrevTY},followMouse:function(){if(this.follow&&this.show){var a=this.chart.mouseX-this.offsetX*this.deltaSignX-this.sdx,b=this.chart.mouseY-
this.sdy;this.pointToX=a;this.pointToY=b;if(a!=this.previousX||b!=this.previousY)if(this.previousX=a,this.previousY=b,0===this.cornerRadius)this.draw();else{var c=this.set;if(c){var d=c.getBBox(),a=a-d.width/2,h=b-d.height-10;a<this.l&&(a=this.l);a>this.r-d.width&&(a=this.r-d.width);h<this.t&&(h=b+10);c.translate(a,h);b=this.textDiv.style;b.left=a+this.horizontalPadding+"px";b.top=h+this.verticalPadding+"px"}}}},changeColor:function(a){this.balloonColor=a},setBounds:function(a,b,c,d){this.l=a;this.t=b;this.r=c;this.b=d;this.destroyTO&&clearTimeout(this.destroyTO)},showBalloon:function(a){if(this.text!=a||this.positionChanged)this.text=a,this.isHiding=!1,this.show=!0,this.destroyTO&&clearTimeout(this.destroyTO),a=this.chart,this.fadeAnim1&&a.stopAnim(this.fadeAnim1),this.fadeAnim2&&a.stopAnim(this.fadeAnim2),this.draw(),this.positionChanged=!1},hide:function(a){var b=this;b.text=void 0;isNaN(a)&&(a=b.fadeOutDuration);var c=b.chart;if(0<a&&!b.isHiding){b.isHiding=!0;b.destroyTO&&clearTimeout(b.destroyTO);b.destroyTO=setTimeout(function(){b.destroy.call(b)},1E3*a);b.follow=!1;b.show=!1;var d=b.set;d&&(d.setAttr("opacity",b.fillAlpha),b.fadeAnim1=d.animate({opacity:0},a,"easeInSine"));b.textDiv&&(b.fadeAnim2=c.animate({node:b.textDiv},"opacity",1,0,a,"easeInSine",""))}else b.show=!1,b.follow=!1,b.destroy()},setPosition:function(a,b){if(a!=this.pointToX||b!=this.pointToY)this.previousX=this.pointToX,this.previousY=this.pointToY,this.pointToX=a,this.pointToY=b,this.positionChanged=!0},followCursor:function(a){var b=this;b.follow=a;clearInterval(b.interval);var c=b.chart.mouseX-b.sdx,d=b.chart.mouseY-b.sdy;!isNaN(c)&&a&&(b.pointToX=c-b.offsetX*b.deltaSignX,b.pointToY=d,b.followMouse(),b.interval=setInterval(function(){b.followMouse.call(b)},40))},removeDiv:function(){if(this.textDiv){var a=this.textDiv.parentNode;a&&a.removeChild(this.textDiv)}},destroy:function(){clearInterval(this.interval);d.remove(this.set);this.removeDiv();this.set=null}})})();(function(){var d=window.AmCharts;d.AmCoordinateChart=d.Class({inherits:d.AmChart,construct:function(a){d.AmCoordinateChart.base.construct.call(this,a);this.theme=a;this.createEvents("rollOverGraphItem","rollOutGraphItem","clickGraphItem","doubleClickGraphItem","rightClickGraphItem","clickGraph","rollOverGraph","rollOutGraph");this.startAlpha=1;this.startDuration=0;this.startEffect="elastic";this.sequencedAnimation=!0;this.colors="#FF6600 #FCD202 #B0DE09 #0D8ECF #2A0CD0 #CD0D74 #CC0000 #00CC00 #0000CC #DDDDDD #999999 #333333 #990000".split(" ");this.balloonDateFormat="MMM DD, YYYY";this.valueAxes=[];this.graphs=[];this.guides=[];this.gridAboveGraphs=!1;d.applyTheme(this,a,"AmCoordinateChart")},initChart:function(){d.AmCoordinateChart.base.initChart.call(this);this.drawGraphs=!0;var a=this.categoryAxis;a&&(this.categoryAxis=d.processObject(a,d.CategoryAxis,this.theme));this.processValueAxes();this.createValueAxes();this.processGraphs();this.processGuides();d.VML&&(this.startAlpha=1);this.setLegendData(this.graphs);this.gridAboveGraphs&&(this.gridSet.toFront(),this.bulletSet.toFront(),this.balloonsSet.toFront())},createValueAxes:function(){if(0===this.valueAxes.length){var a=new d.ValueAxis;this.addValueAxis(a)}},parseData:function(){this.processValueAxes();this.processGraphs()},parseSerialData:function(a){this.chartData=[];if(a)if(0<this.processTimeout){1>this.processCount&&(this.processCount=1);var b=a.length/this.processCount;this.parseCount=Math.ceil(b)-1;for(var c=0;c<b;c++)this.delayParseSerialData(a,c)}else this.parseCount=0,this.parsePartSerialData(a,0,a.length,0);else this.onDataUpdated()},delayParseSerialData:function(a,b){var c=this,d=c.processCount;setTimeout(function(){c.parsePartSerialData.call(c,a,b*d,(b+1)*d,b)},c.processTimeout)},parsePartSerialData:function(a,b,c,e){c>a.length&&(c=a.length);var h=this.graphs,f={},g=this.seriesIdField;g||(g=this.categoryField);var k=!1,l,m=this.categoryAxis,p,q,n;m&&(k=m.parseDates,p=m.forceShowField,n=m.classNameField,q=m.labelColorField,l=m.categoryFunction);var t,r,w={},z;k&&(t=d.extractPeriod(m.minPeriod),r=t.period,t=t.count,z=d.getPeriodDuration(r,t));var x={};this.lookupTable=x;var u,A=this.dataDateFormat,y={};for(u=b;u<c;u++){var B={},D=a[u];b=D[this.categoryField];B.dataContext=D;B.category=l?l(b,D,m):String(b);p&&(B.forceShow=D[p]);n&&(B.className=D[n]);q&&(B.labelColor=D[q]);x[D[g]]=B;if(k&&(m.categoryFunction?b=m.categoryFunction(b,D,m):(!A||b instanceof Date||(b=b.toString()+" |"),b=d.getDate(b,A,m.minPeriod)),b=d.resetDateToMin(b,r,t,m.firstDayOfWeek),B.category=b,B.time=b.getTime(),isNaN(B.time)))continue;var C=this.valueAxes;B.axes={};B.x={};var K;for(K=0;K<C.length;K++){var H=C[K].id;B.axes[H]={};B.axes[H].graphs={};var Q;for(Q=0;Q<h.length;Q++){b=h[Q];var M=b.id,P=1.1;isNaN(b.gapPeriod)||(P=b.gapPeriod);var ia=b.periodValue;if(b.valueAxis.id==H){B.axes[H].graphs[M]={};var I={};I.index=u;var aa=D;b.dataProvider&&(aa=f);I.values=this.processValues(aa,b,ia);if(!b.connect||b.forceGap&&!isNaN(b.gapPeriod))if(y&&y[M]&&0<P&&B.time-w[M]>=z*P&&(y[M].gap=!0),b.forceGap){var P=0,ma;for(ma in I.values)P++;0<P&&(w[M]=B.time,y[M]=I)}else w[M]=B.time,y[M]=I;this.processFields(b,I,aa);I.category=B.category;I.serialDataItem=B;I.graph=b;B.axes[H].graphs[M]=I}}}this.chartData[u]=B}if(this.parseCount==e){for(a=0;a<h.length;a++)b=h[a],b.dataProvider&&this.parseGraphData(b);this.dataChanged=!1;this.dispatchDataUpdated=!0;this.onDataUpdated()}},processValues:function(a,b,c){var e={},h,f=!1;"candlestick"!=b.type&&"ohlc"!=b.type||""===c||(f=!0);for(var g="value error open close low high".split(" "),k=0;k<g.length;k++){var l=g[k];"value"!=l&&"error"!=l&&f&&(c=l.charAt(0).toUpperCase()+l.slice(1));var m=a[b[l+"Field"]+c];null!==m&&(h=Number(m),isNaN(h)||(e[l]=h),"date"==b.valueAxis.type&&void 0!==m&&(h=d.getDate(m,b.chart.dataDateFormat),e[l]=h.getTime()))}return e},parseGraphData:function(a){var b=a.dataProvider,c=a.seriesIdField;c||(c=this.seriesIdField);c||(c=this.categoryField);var d;for(d=0;d<b.length;d++){var h=b[d],f=this.lookupTable[String(h[c])],g=a.valueAxis.id;f&&(g=f.axes[g].graphs[a.id],g.serialDataItem=f,g.values=this.processValues(h,a,a.periodValue),this.processFields(a,g,h))}},addValueAxis:function(a){a.chart=this;this.valueAxes.push(a);this.validateData()},removeValueAxesAndGraphs:function(){var a=this.valueAxes,b;for(b=a.length-1;-1<b;b--)this.removeValueAxis(a[b])},removeValueAxis:function(a){var b=this.graphs,c;for(c=b.length-1;0<=c;c--){var d=b[c];d&&d.valueAxis==a&&this.removeGraph(d)}b=this.valueAxes;for(c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1);this.validateData()},addGraph:function(a){this.graphs.push(a);this.chooseGraphColor(a,this.graphs.length-1);this.validateData()},removeGraph:function(a){var b=this.graphs,c;for(c=b.length-1;0<=c;c--)b[c]==a&&(b.splice(c,1),a.destroy());this.validateData()},handleValueAxisZoom:function(){},processValueAxes:function(){var a=this.valueAxes,b;for(b=0;b<a.length;b++){var c=a[b],c=d.processObject(c,d.ValueAxis,this.theme);a[b]=c;c.chart=this;c.init();this.listenTo(c,"axisIntZoomed",this.handleValueAxisZoom);c.id||(c.id="valueAxisAuto"+b+"_"+(new Date).getTime());void 0===c.usePrefixes&&(c.usePrefixes=this.usePrefixes)}},processGuides:function(){var a=this.guides,b=this.categoryAxis;if(a)for(var c=0;c<a.length;c++){var e=a[c];(void 0!==e.category||void 0!==e.date)&&b&&b.addGuide(e);e.id||(e.id="guideAuto"+c+"_"+(new Date).getTime());var h=e.valueAxis;h?(d.isString(h)&&(h=this.getValueAxisById(h)),h?h.addGuide(e):this.valueAxes[0].addGuide(e)):isNaN(e.value)||this.valueAxes[0].addGuide(e)}},processGraphs:function(){var a=this.graphs,b;this.graphsById={};for(b=0;b<a.length;b++){var c=a[b],c=d.processObject(c,d.AmGraph,this.theme);a[b]=c;this.chooseGraphColor(c,b);c.chart=this;c.init();d.isString(c.valueAxis)&&(c.valueAxis=this.getValueAxisById(c.valueAxis));c.valueAxis||(c.valueAxis=this.valueAxes[0]);c.id||(c.id="graphAuto"+b+"_"+(new Date).getTime());this.graphsById[c.id]=c}},formatString:function(a,b,c){var e=b.graph,h=e.valueAxis;h.duration&&b.values.value&&(h=d.formatDuration(b.values.value,h.duration,"",h.durationUnits,h.maxInterval,h.numberFormatter),a=a.split("[[value]]").join(h));a=d.massReplace(a,{"[[title]]":e.title,"[[description]]":b.description});a=c?d.fixNewLines(a):d.fixBrakes(a);return a=d.cleanFromEmpty(a)},getBalloonColor:function(a,b,c){var e=a.lineColor,h=a.balloonColor;c&&(h=e);c=a.fillColorsR;"object"==typeof c?e=c[0]:void 0!==c&&(e=c);b.isNegative&&(c=a.negativeLineColor,a=a.negativeFillColors,"object"==typeof a?c=a[0]:void 0!==a&&(c=a),void 0!==c&&(e=c));void 0!==b.color&&(e=b.color);void 0!==b.lineColor&&(e=b.lineColor);b=b.fillColors;void 0!==b&&(e=b,d.ifArray(b)&&(e=b[0]));void 0===h&&(h=e);return h},getGraphById:function(a){return d.getObjById(this.graphs,a)},getValueAxisById:function(a){return d.getObjById(this.valueAxes,a)},processFields:function(a,b,c){if(a.itemColors){var e=a.itemColors,h=b.index;b.color=h<e.length?e[h]:d.randomColor()}e="lineColor color alpha fillColors description bullet customBullet bulletSize bulletConfig url labelColor dashLength pattern gap className columnIndex".split(" ");for(h=0;h<e.length;h++){var f=e[h],g=a[f+"Field"];g&&(g=c[g],d.isDefined(g)&&(b[f]=g))}b.dataContext=c},chooseGraphColor:function(a,b){if(a.lineColor)a.lineColorR=a.lineColor;else{var c;c=this.colors.length>b?this.colors[b]:a.lineColorR?a.lineColorR:d.randomColor();a.lineColorR=c}a.fillColorsR=a.fillColors?a.fillColors:a.lineColorR;a.bulletBorderColorR=a.bulletBorderColor?a.bulletBorderColor:a.useLineColorForBulletBorder?a.lineColorR:a.bulletColor;a.bulletColorR=a.bulletColor?a.bulletColor:a.lineColorR;if(c=this.patterns)a.pattern=c[b]},handleLegendEvent:function(a){var b=a.type;if(a=a.dataItem){var c=a.hidden,d=a.showBalloon;switch(b){case"clickMarker":this.textClickEnabled&&(d?this.hideGraphsBalloon(a):this.showGraphsBalloon(a));break;case"clickLabel":d?this.hideGraphsBalloon(a):this.showGraphsBalloon(a);break;case"rollOverItem":c||this.highlightGraph(a);break;case"rollOutItem":c||this.unhighlightGraph();break;case"hideItem":this.hideGraph(a);break;case"showItem":this.showGraph(a)}}},highlightGraph:function(a){var b=this.graphs;if(b){var c,d=.2;this.legend&&(d=this.legend.rollOverGraphAlpha);if(1!=d)for(c=0;c<b.length;c++){var h=b[c];h!=a&&h.changeOpacity(d)}}},unhighlightGraph:function(){var a;this.legend&&(a=this.legend.rollOverGraphAlpha);if(1!=a){a=this.graphs;var b;for(b=0;b<a.length;b++)a[b].changeOpacity(1)}},showGraph:function(a){a.switchable&&(a.hidden=!1,this.dataChanged=!0,"xy"!=this.type&&(this.marginsUpdated=!1),this.chartCreated&&this.initChart())},hideGraph:function(a){a.switchable&&(this.dataChanged=!0,"xy"!=this.type&&(this.marginsUpdated=!1),a.hidden=!0,this.chartCreated&&this.initChart())},hideGraphsBalloon:function(a){a.showBalloon=!1;this.updateLegend()},showGraphsBalloon:function(a){a.showBalloon=!0;this.updateLegend()},updateLegend:function(){this.legend&&this.legend.invalidateSize()},resetAnimation:function(){var a=this.graphs;if(a){var b;for(b=0;b<a.length;b++)a[b].animationPlayed=!1}},animateAgain:function(){this.resetAnimation();this.validateNow()}})})();(function(){var d=window.AmCharts;d.TrendLine=d.Class({construct:function(a){this.cname="TrendLine";this.createEvents("click","rollOver","rollOut");this.isProtected=!1;this.dashLength=0;this.lineColor="#00CC00";this.lineThickness=this.lineAlpha=1;d.applyTheme(this,a,this.cname)},draw:function(){var a=this;a.destroy();var b=a.chart,c=b.container,e,h,f,g,k=a.categoryAxis,l=a.initialDate,m=a.initialCategory,p=a.finalDate,q=a.finalCategory,n=a.valueAxis,t=a.valueAxisX,r=a.initialXValue,w=a.finalXValue,z=a.initialValue,x=a.finalValue,u=n.recalculateToPercents,A=b.dataDateFormat;k&&(l&&(l=d.getDate(l,A,"fff"),a.initialDate=l,e=k.dateToCoordinate(l)),m&&(e=k.categoryToCoordinate(m)),p&&(p=d.getDate(p,A,"fff"),a.finalDate=p,h=k.dateToCoordinate(p)),q&&(h=k.categoryToCoordinate(q)));t&&!u&&(isNaN(r)||(e=t.getCoordinate(r)),isNaN(w)||(h=t.getCoordinate(w)));n&&!u&&(isNaN(z)||(f=n.getCoordinate(z)),isNaN(x)||(g=n.getCoordinate(x)));if(!(isNaN(e)||isNaN(h)||isNaN(f)||isNaN(f))){b.rotate?(k=[f,g],g=[e,h]):(k=[e,h],g=[f,g]);l=a.lineColor;f=d.line(c,k,g,l,a.lineAlpha,a.lineThickness,a.dashLength);e=k;h=g;q=k[1]-k[0];n=g[1]-g[0];0===q&&(q=.01);0===n&&(n=.01);m=q/Math.abs(q);p=n/Math.abs(n);n=90*Math.PI/180-Math.asin(q/(q*n/Math.abs(q*n)*Math.sqrt(Math.pow(q,2)+Math.pow(n,2))));q=Math.abs(5*Math.cos(n));n=Math.abs(5*Math.sin(n));e.push(k[1]-m*n,k[0]-m*n);h.push(g[1]+p*q,g[0]+p*q);g=d.polygon(c,e,h,l,.005,0);c=c.set([g,f]);c.translate(b.marginLeftReal,b.marginTopReal);b.trendLinesSet.push(c);d.setCN(b,f,"trend-line");d.setCN(b,f,"trend-line-"+a.id);a.line=f;a.set=c;if(f=a.initialImage)f=d.processObject(f,d.Image,a.theme),f.chart=b,f.draw(),f.translate(e[0]+f.offsetX,h[0]+f.offsetY),c.push(f.set);if(f=a.finalImage)f=d.processObject(f,d.Image,a.theme),f.chart=b,f.draw(),f.translate(e[1]+f.offsetX,h[1]+f.offsetY),c.push(f.set);g.mouseup(function(){a.handleLineClick()}).mouseover(function(){a.handleLineOver()}).mouseout(function(){a.handleLineOut()});g.touchend&&g.touchend(function(){a.handleLineClick()});c.clipRect(0,0,b.plotAreaWidth,b.plotAreaHeight)}},handleLineClick:function(){this.fire({type:"click",trendLine:this,chart:this.chart})},handleLineOver:function(){var a=this.rollOverColor;void 0!==a&&this.line.attr({stroke:a});this.balloonText&&(clearTimeout(this.chart.hoverInt),a=this.line.getBBox(),this.chart.showBalloon(this.balloonText,this.lineColor,!0,this.x+a.x+a.width/2,this.y+a.y+a.height/2));this.fire({type:"rollOver",trendLine:this,chart:this.chart})},handleLineOut:function(){this.line.attr({stroke:this.lineColor});this.balloonText&&this.chart.hideBalloon();this.fire({type:"rollOut",trendLine:this,chart:this.chart})},destroy:function(){d.remove(this.set)}})})();(function(){var d=window.AmCharts;d.Image=d.Class({construct:function(a){this.cname="Image";this.height=this.width=20;this.rotation=this.offsetY=this.offsetX=0;this.balloonColor=this.color="#000000";this.opacity=1;d.applyTheme(this,a,this.cname)},draw:function(){var a=this;a.set&&a.set.remove();var b=a.chart.container;a.set=b.set();var c,d;a.url?(c=b.image(a.url,0,0,a.width,a.height),d=1):a.svgPath&&(c=b.path(a.svgPath),c.setAttr("fill",a.color),c.setAttr("stroke",a.outlineColor),b=c.getBBox(),d=Math.min(a.width/b.width,a.height/b.height));c&&(c.setAttr("opacity",a.opacity),a.set.rotate(a.rotation),c.translate(-a.width/2,-a.height/2,d),a.balloonText&&c.mouseover(function(){a.chart.showBalloon(a.balloonText,a.balloonColor,!0)}).mouseout(function(){a.chart.hideBalloon()}).touchend(function(){a.chart.hideBalloon()}).touchstart(function(){a.chart.showBalloon(a.balloonText,a.balloonColor,!0)}),a.set.push(c))},translate:function(a,b){this.set&&this.set.translate(a,b)}})})();(function(){var d=window.AmCharts;d.circle=function(a,b,c,e,h,f,g,k,l){0>=b&&(b=.001);if(void 0==h||0===h)h=.01;void 0===f&&(f="#000000");void 0===g&&(g=0);e={fill:c,stroke:f,"fill-opacity":e,"stroke-width":h,"stroke-opacity":g};a=isNaN(l)?a.circle(0,0,b).attr(e):a.ellipse(0,0,b,l).attr(e);k&&a.gradient("radialGradient",[c,d.adjustLuminosity(c,-.6)]);return a};d.text=function(a,b,c,e,h,f,g,k){f||(f="middle");"right"==f&&(f="end");"left"==f&&(f="start");isNaN(k)&&(k=1);void 0!==b&&(b=String(b),d.isIE&&!d.isModern&&(b=b.replace("&amp;","&"),b=b.replace("&","&amp;")));c={fill:c,"font-family":e,"font-size":h+"px",opacity:k};!0===g&&(c["font-weight"]="bold");c["text-anchor"]=f;return a.text(b,c)};d.polygon=function(a,b,c,e,h,f,g,k,l,m,p){isNaN(f)&&(f=.01);isNaN(k)&&(k=h);var q=e,n=!1;"object"==typeof q&&1<q.length&&(n=!0,q=q[0]);void 0===g&&(g=q);h={fill:q,stroke:g,"fill-opacity":h,"stroke-width":f,"stroke-opacity":k};void 0!==p&&0<p&&(h["stroke-dasharray"]=p);p=d.dx;f=d.dy;a.handDrawn&&(c=d.makeHD(b,c,a.handDrawScatter),b=c[0],c=c[1]);g=Math.round;m&&(b[t]=d.roundTo(b[t],5),c[t]=d.roundTo(c[t],5),g=Number);k="M"+(g(b[0])+p)+","+(g(c[0])+f);for(var t=1;t<b.length;t++)m&&(b[t]=d.roundTo(b[t],5),c[t]=d.roundTo(c[t],5)),k+=" L"+(g(b[t])+p)+","+(g(c[t])+f);a=a.path(k+" Z").attr(h);n&&a.gradient("linearGradient",e,l);return a};d.rect=function(a,b,c,e,h,f,g,k,l,m,p){if(isNaN(b)||isNaN(c))return a.set();isNaN(f)&&(f=0);void 0===l&&(l=0);void 0===m&&(m=270);isNaN(h)&&(h=0);var q=e,n=!1;"object"==typeof q&&(q=q[0],n=!0);void 0===g&&(g=q);void 0===k&&(k=h);b=Math.round(b);c=Math.round(c);var t=0,r=0;0>b&&(b=Math.abs(b),t=-b);0>c&&(c=Math.abs(c),r=-c);t+=d.dx;r+=d.dy;h={fill:q,stroke:g,"fill-opacity":h,"stroke-opacity":k};void 0!==p&&0<p&&(h["stroke-dasharray"]=p);a=a.rect(t,r,b,c,l,f).attr(h);n&&a.gradient("linearGradient",e,m);return a};d.bullet=function(a,b,c,e,h,f,g,k,l,m,p,q,n){var t;"circle"==b&&(b="round");switch(b){case"round":t=d.circle(a,c/2,e,h,f,g,k);break;case"square":t=d.polygon(a,[-c/
2,c/2,c/2,-c/2],[c/2,c/2,-c/2,-c/2],e,h,f,g,k,m-180,void 0,n);break;case"rectangle":t=d.polygon(a,[-c,c,c,-c],[c/2,c/2,-c/2,-c/2],e,h,f,g,k,m-180,void 0,n);break;case"diamond":t=d.polygon(a,[-c/2,0,c/2,0],[0,-c/2,0,c/2],e,h,f,g,k);break;case"triangleUp":t=d.triangle(a,c,0,e,h,f,g,k);break;case"triangleDown":t=d.triangle(a,c,180,e,h,f,g,k);break;case"triangleLeft":t=d.triangle(a,c,270,e,h,f,g,k);break;case"triangleRight":t=d.triangle(a,c,90,e,h,f,g,k);break;case"bubble":t=d.circle(a,c/2,e,h,f,g,k,!0);break;case"line":t=d.line(a,[-c/2,c/2],[0,0],e,h,f,g,k);break;case"yError":t=a.set();t.push(d.line(a,[0,0],[-c/2,c/2],e,h,f));t.push(d.line(a,[-l,l],[-c/2,-c/2],e,h,f));t.push(d.line(a,[-l,l],[c/2,c/2],e,h,f));break;case"xError":t=a.set(),t.push(d.line(a,[-c/2,c/2],[0,0],e,h,f)),t.push(d.line(a,[-c/2,-c/2],[-l,l],e,h,f)),t.push(d.line(a,[c/2,c/2],[-l,l],e,h,f))}t&&t.pattern(p,NaN,q);return t};d.triangle=function(a,b,c,d,h,f,g,k){if(void 0===f||0===f)f=1;void 0===g&&(g="#000");void 0===k&&(k=0);d={fill:d,stroke:g,"fill-opacity":h,"stroke-width":f,"stroke-opacity":k};b/=2;var l;0===c&&(l=" M"+-b+","+b+" L0,"+-b+" L"+b+","+b+" Z");180==c&&(l=" M"+-b+","+-b+" L0,"+b+" L"+b+","+-b+" Z");90==c&&(l=" M"+-b+","+-b+" L"+b+",0 L"+-b+","+b+" Z");270==c&&(l=" M"+-b+",0 L"+b+","+b+" L"+b+","+-b+" Z");return a.path(l).attr(d)};d.line=function(a,b,c,e,h,f,g,k,l,m,p){if(a.handDrawn&&!p)return d.handDrawnLine(a,b,c,e,h,f,g,k,l,m,p);f={fill:"none","stroke-width":f};void 0!==g&&0<g&&(f["stroke-dasharray"]=g);isNaN(h)||(f["stroke-opacity"]=h);e&&(f.stroke=e);e=Math.round;m&&(e=Number,b[0]=d.roundTo(b[0],5),c[0]=d.roundTo(c[0],5));m=d.dx;h=d.dy;g="M"+(e(b[0])+m)+","+(e(c[0])+h);for(k=1;k<b.length;k++)b[k]=d.roundTo(b[k],5),c[k]=d.roundTo(c[k],5),g+=" L"+(e(b[k])+m)+","+(e(c[k])+h);if(d.VML)return a.path(g,void 0,!0).attr(f);l&&(g+=" M0,0 L0,0");return a.path(g).attr(f)};d.makeHD=function(a,b,c){for(var d=[],h=[],f=1;f<a.length;f++)for(var g=Number(a[f-1]),k=Number(b[f-1]),l=Number(a[f]),m=Number(b[f]),p=Math.round(Math.sqrt(Math.pow(l-g,2)+Math.pow(m-k,2))/50)+1,l=(l-g)/p,m=(m-k)/p,q=0;q<=p;q++){var n=k+q*m+Math.random()*c;d.push(g+q*l+Math.random()*c);h.push(n)}return[d,h]};d.handDrawnLine=function(a,b,c,e,h,f,g,k,l,m){var p,q=a.set();for(p=1;p<b.length;p++)for(var n=[b[p-1],b[p]],t=[c[p-1],c[p]],t=d.makeHD(n,t,a.handDrawScatter),n=t[0],t=t[1],r=1;r<n.length;r++)q.push(d.line(a,[n[r-1],n[r]],[t[r-1],t[r]],e,h,f+Math.random()*a.handDrawThickness-a.handDrawThickness/2,g,k,l,m,!0));return q};d.doNothing=
function(a){return a};d.drop=function(a,b,c,d,h,f,g,k){var l=1/180*Math.PI,m=c-20,p=Math.sin(m*l)*b,q=Math.cos(m*l)*b,n=Math.sin((m+40)*l)*b,t=Math.cos((m+40)*l)*b,r=.8*b,w=-b/3,z=b/3;0===c&&(w=-w,z=0);180==c&&(z=0);90==c&&(w=0);270==c&&(w=0,z=-z);c={fill:d,stroke:g,"stroke-width":f,"stroke-opacity":k,"fill-opacity":h};b="M"+p+","+q+" A"+b+","+b+",0,1,1,"+n+","+t+(" A"+r+","+r+",0,0,0,"+(Math.sin((m+20)*l)*b+z)+","+(Math.cos((m+20)*l)*b+w));b+=" A"+r+","+r+",0,0,0,"+p+","+q;return a.path(b,void 0,void 0,"1000,1000").attr(c)};d.wedge=function(a,b,c,e,h,f,g,k,l,m,p,q,n,t){var r=Math.round;f=r(f);g=r(g);k=r(k);var w=r(g/f*k),z=d.VML,x=359.5+f/100;359.94<x&&(x=359.94);h>=x&&(h=x);var u=1/180*Math.PI,x=b+Math.sin(e*u)*k,A=c-Math.cos(e*u)*w,y=b+Math.sin(e*u)*f,B=c-Math.cos(e*u)*g,D=b+Math.sin((e+h)*u)*f,C=c-Math.cos((e+h)*u)*g,K=b+Math.sin((e+h)*u)*k,u=c-Math.cos((e+h)*u)*w,H={fill:d.adjustLuminosity(m.fill,-.2),"stroke-opacity":0,"fill-opacity":m["fill-opacity"]},Q=0;180<Math.abs(h)&&(Q=1);e=a.set();var M;z&&(x=r(10*x),y=r(10*y),D=r(10*D),K=r(10*K),A=r(10*A),B=r(10*B),C=r(10*C),u=r(10*u),b=r(10*b),l=r(10*l),c=r(10*c),f*=10,g*=10,k*=10,w*=10,1>Math.abs(h)&&1>=Math.abs(D-y)&&1>=Math.abs(C-B)&&(M=!0));h="";var P;q&&(H["fill-opacity"]=0,H["stroke-opacity"]=m["stroke-opacity"]/2,H.stroke=m.stroke);if(0<l){P=" M"+x+","+(A+l)+" L"+y+","+(B+l);z?(M||(P+=" A"+(b-f)+","+(l+c-g)+","+(b+f)+","+(l+c+g)+","+y+","+(B+l)+","+D+","+(C+l)),P+=" L"+K+","+(u+l),0<k&&(M||(P+=" B"+(b-k)+","+(l+c-w)+","+(b+k)+","+
(l+c+w)+","+K+","+(l+u)+","+x+","+(l+A)))):(P+=" A"+f+","+g+",0,"+Q+",1,"+D+","+(C+l)+" L"+K+","+(u+l),0<k&&(P+=" A"+k+","+w+",0,"+Q+",0,"+x+","+(A+l)));P+=" Z";var ia=l;z&&(ia/=10);for(var I=0;I<ia;I+=10){var aa=a.path(P,void 0,void 0,"1000,1000").attr(H);e.push(aa);aa.translate(0,-I)}P=a.path(" M"+x+","+A+" L"+x+","+(A+l)+" L"+y+","+(B+l)+" L"+y+","+B+" L"+x+","+A+" Z",void 0,void 0,"1000,1000").attr(H);l=a.path(" M"+D+","+C+" L"+D+","+(C+l)+" L"+K+","+(u+l)+" L"+K+","+u+" L"+D+","+C+" Z",void 0,void 0,"1000,1000").attr(H);e.push(P);e.push(l)}z?(M||(h=" A"+r(b-f)+","+r(c-g)+","+r(b+f)+","+r(c+g)+","+r(y)+","+r(B)+","+r(D)+","+r(C)),g=" M"+r(x)+","+r(A)+" L"+r(y)+","+r(B)+h+" L"+r(K)+","+r(u)):g=" M"+x+","+A+" L"+y+","+B+(" A"+f+","+g+",0,"+Q+",1,"+D+","+C)+" L"+K+","+u;0<k&&(z?M||(g+=" B"+(b-k)+","+(c-w)+","+(b+k)+","+(c+w)+","+K+","+u+","+x+","+A):g+=" A"+k+","+w+",0,"+Q+",0,"+x+","+A);a.handDrawn&&(k=d.line(a,[x,y],[A,B],m.stroke,m.thickness*Math.random()*a.handDrawThickness,m["stroke-opacity"]),e.push(k));a=a.path(g+" Z",void 0,void 0,"1000,1000").attr(m);if(p){k=[];for(w=0;w<p.length;w++)k.push(d.adjustLuminosity(m.fill,p[w]));"radial"!=t||d.isModern||(k=[]);0<k.length&&a.gradient(t+"Gradient",k)}d.isModern&&"radial"==t&&a.grad&&(a.grad.setAttribute("gradientUnits","userSpaceOnUse"),a.grad.setAttribute("r",f),a.grad.setAttribute("cx",b),a.grad.setAttribute("cy",c));a.pattern(q,NaN,n);e.wedge=a;e.push(a);return e};d.rgb2hex=function(a){return(a=a.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i))&&4===a.length?"#"+("0"+parseInt(a[1],10).toString(16)).slice(-2)+("0"+parseInt(a[2],10).toString(16)).slice(-2)+("0"+parseInt(a[3],10).toString(16)).slice(-2):""};d.adjustLuminosity=function(a,b){a&&-1!=a.indexOf("rgb")&&(a=d.rgb2hex(a));a=String(a).replace(/[^0-9a-f]/gi,"");6>a.length&&(a=String(a[0])+String(a[0])+String(a[1])+String(a[1])+String(a[2])+String(a[2]));b=b||0;var c="#",e,h;for(h=0;3>h;h++)e=parseInt(a.substr(2*h,2),16),e=Math.round(Math.min(Math.max(0,e+e*b),255)).toString(16),c+=("00"+
e).substr(e.length);return c}})();(function(){var d=window.AmCharts;d.Bezier=d.Class({construct:function(a,b,c,e,h,f,g,k,l,m,p){var q=a.chart,n=d.bezierX,t=d.bezierY;isNaN(q.bezierX)||(n=q.bezierX);isNaN(q.bezierY)||(t=q.bezierY);isNaN(n)&&(q.rotate?(n=20,t=4):(t=20,n=4));var r,w;"object"==typeof g&&1<g.length&&(w=!0,r=g,g=g[0]);"object"==typeof k&&(k=k[0]);0===k&&(g="none");f={fill:g,"fill-opacity":k,"stroke-width":f};void 0!==l&&0<l&&(f["stroke-dasharray"]=l);isNaN(h)||(f["stroke-opacity"]=h);e&&(f.stroke=e);e="M"+Math.round(b[0])+","+Math.round(c[0])+" ";h=[];for(l=0;l<b.length;l++)isNaN(b[l])||isNaN(c[l])?(e+=this.drawSegment(h,n,t),l<b.length-1&&(e+="L"+b[l+1]+","+c[l+1]+" "),h=[]):h.push({x:Number(b[l]),y:Number(c[l])});e+=this.drawSegment(h,n,t);m?e+=m:d.VML||(e+="M0,0 L0,0");this.path=a.path(e).attr(f);this.node=this.path.node;w&&this.path.gradient("linearGradient",r,p)},drawSegment:function(a,b,c){var d="";if(2<a.length)for(var h=0;h<a.length-1;h++){var f=[],g=a[h-1],k=a[h],l=a[h+1],m=a[h+2];0===h?(f.push({x:k.x,y:k.y}),f.push({x:k.x,y:k.y}),f.push({x:l.x,y:l.y}),f.push({x:m.x,y:m.y})):h>=a.length-2?(f.push({x:g.x,y:g.y}),f.push({x:k.x,y:k.y}),f.push({x:l.x,y:l.y}),f.push({x:l.x,y:l.y})):(f.push({x:g.x,y:g.y}),f.push({x:k.x,y:k.y}),f.push({x:l.x,y:l.y}),f.push({x:m.x,y:m.y}));g=[];k=Math.round;g.push({x:k(f[1].x),y:k(f[1].y)});g.push({x:k((-f[0].x+b*f[1].x+f[2].x)/b),y:k((-f[0].y+c*f[1].y+f[2].y)/c)});g.push({x:k((f[1].x+b*f[2].x-f[3].x)/b),y:k((f[1].y+c*f[2].y-f[3].y)/c)});g.push({x:k(f[2].x),y:k(f[2].y)});d+="C"+
g[1].x+","+g[1].y+","+g[2].x+","+g[2].y+","+g[3].x+","+g[3].y+" "}else 1<a.length&&(d+="L"+a[1].x+","+a[1].y);return d}})})();(function(){var d=window.AmCharts;d.AmDraw=d.Class({construct:function(a,b,c,e){d.SVG_NS="http://www.w3.org/2000/svg";d.SVG_XLINK="http://www.w3.org/1999/xlink";d.hasSVG=!!document.createElementNS&&!!document.createElementNS(d.SVG_NS,"svg").createSVGRect;1>b&&(b=10);1>c&&(c=10);this.div=a;this.width=b;this.height=c;this.rBin=document.createElement("div");d.hasSVG?(d.SVG=!0,b=this.createSvgElement("svg"),a.appendChild(b),this.container=b,this.addDefs(e),this.R=new d.SVGRenderer(this)):d.isIE&&d.VMLRenderer&&(d.VML=!0,d.vmlStyleSheet||(document.namespaces.add("amvml","urn:schemas-microsoft-com:vml"),31>document.styleSheets.length?(b=document.createStyleSheet(),b.addRule(".amvml","behavior:url(#default#VML); display:inline-block; antialias:true"),d.vmlStyleSheet=b):document.styleSheets[0].addRule(".amvml","behavior:url(#default#VML); display:inline-block; antialias:true")),this.container=a,this.R=new d.VMLRenderer(this,e),this.R.disableSelection(a))},createSvgElement:function(a){return document.createElementNS(d.SVG_NS,a)},circle:function(a,b,c,e){var h=new d.AmDObject("circle",this);h.attr({r:c,cx:a,cy:b});this.addToContainer(h.node,e);return h},ellipse:function(a,b,c,e,h){var f=new d.AmDObject("ellipse",this);f.attr({rx:c,ry:e,cx:a,cy:b});this.addToContainer(f.node,h);return f},setSize:function(a,b){0<a&&0<b&&(this.container.style.width=a+"px",this.container.style.height=b+"px")},rect:function(a,b,c,e,h,f,g){var k=new d.AmDObject("rect",this);d.VML&&(h=Math.round(100*h/Math.min(c,e)),c+=2*f,e+=2*f,k.bw=f,k.node.style.marginLeft=-f,k.node.style.marginTop=-f);1>c&&(c=1);1>e&&(e=1);k.attr({x:a,y:b,width:c,height:e,rx:h,ry:h,"stroke-width":f});this.addToContainer(k.node,g);return k},image:function(a,b,c,e,h,f){var g=new d.AmDObject("image",this);g.attr({x:b,y:c,width:e,height:h});this.R.path(g,a);this.addToContainer(g.node,f);return g},addToContainer:function(a,b){b||(b=this.container);b.appendChild(a)},text:function(a,b,c){return this.R.text(a,b,c)},path:function(a,b,c,e){var h=new d.AmDObject("path",this);e||(e="100,100");h.attr({cs:e});c?h.attr({dd:a}):h.attr({d:a});this.addToContainer(h.node,b);return h},set:function(a){return this.R.set(a)},remove:function(a){if(a){var b=this.rBin;b.appendChild(a);b.innerHTML=""}},renderFix:function(){var a=this.container,b=a.style;b.top="0px";b.left="0px";try{var c=a.getBoundingClientRect(),d=c.left-Math.round(c.left),h=c.top-Math.round(c.top);d&&(b.left=d+"px");h&&(b.top=h+"px")}catch(f){}},update:function(){this.R.update()},addDefs:function(a){if(d.hasSVG){var b=this.createSvgElement("desc"),c=this.container;c.setAttribute("version","1.1");c.style.position="absolute";this.setSize(this.width,this.height);if(a.accessibleTitle){var e=this.createSvgElement("text");c.appendChild(e);e.innerHTML=a.accessibleTitle;e.style.opacity=0}d.rtl&&(c.setAttribute("direction","rtl"),c.style.left="auto",c.style.right="0px");a&&(a.addCodeCredits&&b.appendChild(document.createTextNode("JavaScript chart by amCharts "+a.version)),c.appendChild(b),a.defs&&(b=this.createSvgElement("defs"),c.appendChild(b),d.parseDefs(a.defs,b),this.defs=b))}}})})();(function(){var d=window.AmCharts;d.AmDObject=d.Class({construct:function(a,b){this.D=b;this.R=b.R;this.node=this.R.create(this,a);this.y=this.x=0;this.scale=1},attr:function(a){this.R.attr(this,a);return this},getAttr:function(a){return this.node.getAttribute(a)},setAttr:function(a,b){this.R.setAttr(this,a,b);return this},clipRect:function(a,b,c,d){this.R.clipRect(this,a,b,c,d)},translate:function(a,b,c,d){d||(a=Math.round(a),b=Math.round(b));this.R.move(this,a,b,c);this.x=a;this.y=b;this.scale=c;this.angle&&this.rotate(this.angle)},rotate:function(a,b){this.R.rotate(this,a,b);this.angle=a},animate:function(a,b,c){for(var e in a)if(a.hasOwnProperty(e)){var h=e,f=a[e];c=d.getEffect(c);this.R.animate(this,h,f,b,c)}},push:function(a){if(a){var b=this.node;b.appendChild(a.node);var c=a.clipPath;c&&b.appendChild(c);(a=a.grad)&&b.appendChild(a)}},text:function(a){this.R.setText(this,a)},remove:function(){this.stop();this.R.remove(this)},clear:function(){var a=this.node;if(a.hasChildNodes())for(;1<=a.childNodes.length;)a.removeChild(a.firstChild)},hide:function(){this.setAttr("visibility","hidden")},show:function(){this.setAttr("visibility","visible")},getBBox:function(){return this.R.getBBox(this)},toFront:function(){var a=this.node;if(a){this.prevNextNode=a.nextSibling;var b=a.parentNode;b&&b.appendChild(a)}},toPrevious:function(){var a=this.node;a&&this.prevNextNode&&(a=a.parentNode)&&a.insertBefore(this.prevNextNode,null)},toBack:function(){var a=this.node;if(a){this.prevNextNode=a.nextSibling;var b=a.parentNode;if(b){var c=b.firstChild;c&&b.insertBefore(a,c)}}},mouseover:function(a){this.R.addListener(this,"mouseover",a);return this},mouseout:function(a){this.R.addListener(this,"mouseout",a);return this},click:function(a){this.R.addListener(this,"click",a);return this},dblclick:function(a){this.R.addListener(this,"dblclick",a);return this},mousedown:function(a){this.R.addListener(this,"mousedown",a);return this},mouseup:function(a){this.R.addListener(this,"mouseup",a);return this},touchmove:function(a){this.R.addListener(this,"touchmove",a);return this},touchstart:function(a){this.R.addListener(this,"touchstart",a);return this},touchend:function(a){this.R.addListener(this,"touchend",a);return this},keyup:function(a){this.R.addListener(this,"keyup",a);return this},focus:function(a){this.R.addListener(this,"focus",a);return this},blur:function(a){this.R.addListener(this,"blur",a);return this},contextmenu:function(a){this.node.addEventListener?this.node.addEventListener("contextmenu",a,!0):this.R.addListener(this,"contextmenu",a);return this},stop:function(){d.removeFromArray(this.R.animations,this.an_translate);d.removeFromArray(this.R.animations,this.an_y);d.removeFromArray(this.R.animations,this.an_x)},length:function(){return this.node.childNodes.length},gradient:function(a,b,c){this.R.gradient(this,a,b,c)},pattern:function(a,b,c){a&&this.R.pattern(this,a,b,c)}})})();(function(){var d=window.AmCharts;d.VMLRenderer=d.Class({construct:function(a,b){this.chart=b;this.D=a;this.cNames={circle:"oval",ellipse:"oval",rect:"roundrect",path:"shape"};this.styleMap={x:"left",y:"top",width:"width",height:"height","font-family":"fontFamily","font-size":"fontSize",visibility:"visibility"}},create:function(a,b){var c;if("group"==b)c=document.createElement("div"),a.type="div";else if("text"==b)c=document.createElement("div"),a.type="text";else if("image"==b)c=document.createElement("img"),a.type="image";else{a.type="shape";a.shapeType=this.cNames[b];c=document.createElement("amvml:"+this.cNames[b]);var d=document.createElement("amvml:stroke");c.appendChild(d);a.stroke=d;var h=document.createElement("amvml:fill");c.appendChild(h);a.fill=h;h.className="amvml";d.className="amvml";c.className="amvml"}c.style.position="absolute";c.style.top=0;c.style.left=0;return c},path:function(a,b){a.node.setAttribute("src",b)},setAttr:function(a,b,c){if(void 0!==c){var e;8===document.documentMode&&(e=!0);var h=a.node,f=a.type,g=h.style;"r"==b&&(g.width=2*c,g.height=2*c);"oval"==a.shapeType&&("rx"==b&&(g.width=2*c),"ry"==b&&(g.height=2*c));"roundrect"==a.shapeType&&("width"!=b&&"height"!=b||--c);"cursor"==b&&(g.cursor=c);"cx"==b&&(g.left=c-d.removePx(g.width)/2);"cy"==b&&(g.top=c-d.removePx(g.height)/2);var k=this.styleMap[b];"width"==k&&0>c&&(c=0);void 0!==k&&(g[k]=c);"text"==f&&("text-anchor"==b&&(a.anchor=c,k=h.clientWidth,"end"==c&&(g.marginLeft=-k+"px"),"middle"==c&&(g.marginLeft=-(k/2)+
"px",g.textAlign="center"),"start"==c&&(g.marginLeft="0px")),"fill"==b&&(g.color=c),"font-weight"==b&&(g.fontWeight=c));if(g=a.children)for(k=0;k<g.length;k++)g[k].setAttr(b,c);if("shape"==f){"cs"==b&&(h.style.width="100px",h.style.height="100px",h.setAttribute("coordsize",c));"d"==b&&h.setAttribute("path",this.svgPathToVml(c));"dd"==b&&h.setAttribute("path",c);f=a.stroke;a=a.fill;"stroke"==b&&(e?f.color=c:f.setAttribute("color",c));"stroke-width"==b&&(e?f.weight=c:f.setAttribute("weight",c));"stroke-opacity"==b&&(e?f.opacity=c:f.setAttribute("opacity",c));"stroke-dasharray"==b&&(g="solid",0<c&&3>c&&(g="dot"),3<=c&&6>=c&&(g="dash"),6<c&&(g="longdash"),e?f.dashstyle=g:f.setAttribute("dashstyle",g));if("fill-opacity"==b||"opacity"==b)0===c?e?a.on=!1:a.setAttribute("on",!1):e?a.opacity=c:a.setAttribute("opacity",c);"fill"==b&&(e?a.color=c:a.setAttribute("color",c));"rx"==b&&(e?h.arcSize=c+"%":h.setAttribute("arcsize",c+"%"))}}},attr:function(a,b){for(var c in b)b.hasOwnProperty(c)&&this.setAttr(a,c,b[c])},text:function(a,b,c){var e=new d.AmDObject("text",this.D),h=e.node;h.style.whiteSpace="pre";h.innerHTML=a;this.D.addToContainer(h,c);this.attr(e,b);return e},getBBox:function(a){return this.getBox(a.node)},getBox:function(a){var b=a.offsetLeft,c=a.offsetTop,d=a.offsetWidth,h=a.offsetHeight,f;if(a.hasChildNodes()){var g,k,l;for(l=0;l<a.childNodes.length;l++){f=this.getBox(a.childNodes[l]);var m=f.x;isNaN(m)||(isNaN(g)?g=m:m<g&&(g=m));var p=f.y;isNaN(p)||(isNaN(k)?k=p:p<k&&(k=p));m=f.width+m;isNaN(m)||(d=Math.max(d,m));f=f.height+p;isNaN(f)||(h=Math.max(h,f))}0>g&&(b+=g);0>k&&(c+=k)}return{x:b,y:c,width:d,height:h}},setText:function(a,b){var c=a.node;c&&(c.innerHTML=b);this.setAttr(a,"text-anchor",a.anchor)},addListener:function(a,b,c){a.node["on"+b]=c},move:function(a,b,c){var e=a.node,h=e.style;"text"==a.type&&(c-=d.removePx(h.fontSize)/2-1);"oval"==a.shapeType&&(b-=d.removePx(h.width)/2,c-=d.removePx(h.height)/2);a=a.bw;isNaN(a)||(b-=a,c-=a);isNaN(b)||isNaN(c)||(e.style.left=b+"px",e.style.top=
c+"px")},svgPathToVml:function(a){var b=a.split(" ");a="";var c,d=Math.round,h;for(h=0;h<b.length;h++){var f=b[h],g=f.substring(0,1),f=f.substring(1),k=f.split(","),l=d(k[0])+","+d(k[1]);"M"==g&&(a+=" m "+l);"L"==g&&(a+=" l "+l);"Z"==g&&(a+=" x e");if("Q"==g){var m=c.length,p=c[m-1],q=k[0],n=k[1],l=k[2],t=k[3];c=d(c[m-2]/3+2/3*q);p=d(p/3+2/3*n);q=d(2/3*q+l/3);n=d(2/3*n+t/3);a+=" c "+c+","+p+","+q+","+n+","+l+","+t}"C"==g&&(a+=" c "+k[0]+","+k[1]+","+k[2]+","+k[3]+","+k[4]+","+k[5]);"A"==g&&(a+=" wa "+
f);"B"==g&&(a+=" at "+f);c=k}return a},animate:function(a,b,c,d,h){var f=a.node,g=this.chart;a.animationFinished=!1;if("translate"==b){b=c.split(",");c=b[1];var k=f.offsetTop;g.animate(a,"left",f.offsetLeft,b[0],d,h,"px");g.animate(a,"top",k,c,d,h,"px")}},clipRect:function(a,b,c,d,h){a=a.node;0===b&&0===c?(a.style.width=d+"px",a.style.height=h+"px",a.style.overflow="hidden"):a.style.clip="rect("+c+"px "+(b+d)+"px "+(c+h)+"px "+b+"px)"},rotate:function(a,b,c){if(0!==Number(b)){var e=a.node;a=e.style;c||(c=this.getBGColor(e.parentNode));a.backgroundColor=c;a.paddingLeft=1;c=b*Math.PI/180;var h=Math.cos(c),f=Math.sin(c),g=d.removePx(a.left),k=d.removePx(a.top),l=e.offsetWidth,e=e.offsetHeight;b/=Math.abs(b);a.left=g+l/2-l/2*Math.cos(c)-b*e/2*Math.sin(c)+3;a.top=k-b*l/2*Math.sin(c)+b*e/2*Math.sin(c);a.cssText=a.cssText+"; filter:progid:DXImageTransform.Microsoft.Matrix(M11='"+h+"', M12='"+-f+"', M21='"+f+"', M22='"+h+"', sizingmethod='auto expand');"}},getBGColor:function(a){var b="#FFFFFF";if(a.style){var c=a.style.backgroundColor;""!==c?b=c:a.parentNode&&(b=this.getBGColor(a.parentNode))}return b},set:function(a){var b=new d.AmDObject("group",this.D);this.D.container.appendChild(b.node);if(a){var c;for(c=0;c<a.length;c++)b.push(a[c])}return b},gradient:function(a,b,c,d){var h="";"radialGradient"==b&&(b="gradientradial",c.reverse());"linearGradient"==b&&(b="gradient");var f;for(f=0;f<c.length;f++)h+=Math.round(100*f/(c.length-1))+"% "+c[f],f<c.length-1&&(h+=",");a=a.fill;90==d?d=0:270==d?d=180:180==d?d=90:0===d&&(d=270);8===document.documentMode?(a.type=b,a.angle=d):(a.setAttribute("type",b),a.setAttribute("angle",d));h&&(a.colors.value=h)},remove:function(a){a.clipPath&&this.D.remove(a.clipPath);this.D.remove(a.node)},disableSelection:function(a){a.onselectstart=function(){return!1};a.style.cursor="default"},pattern:function(a,b,c,e){c=a.node;a=a.fill;var h="none";b.color&&(h=b.color);c.fillColor=h;b=b.url;d.isAbsolute(b)||(b=e+b);8===document.documentMode?(a.type="tile",a.src=b):(a.setAttribute("type","tile"),a.setAttribute("src",b))},update:function(){}})})();(function(){var d=window.AmCharts;d.SVGRenderer=d.Class({construct:function(a){this.D=a;this.animations=[]},create:function(a,b){return document.createElementNS(d.SVG_NS,b)},attr:function(a,b){for(var c in b)b.hasOwnProperty(c)&&this.setAttr(a,c,b[c])},setAttr:function(a,b,c){void 0!==c&&a.node.setAttribute(b,c)},animate:function(a,b,c,e,h){a.animationFinished=!1;var f=a.node;a["an_"+b]&&d.removeFromArray(this.animations,a["an_"+b]);"translate"==b?(f=(f=f.getAttribute("transform"))?String(f).substring(10,f.length-1):"0,0",f=f.split(", ").join(" "),f=f.split(" ").join(","),0===f&&(f="0,0")):f=Number(f.getAttribute(b));c={obj:a,frame:0,attribute:b,from:f,to:c,time:e,effect:h};this.animations.push(c);a["an_"+b]=c},update:function(){var a,b=this.animations;for(a=b.length-1;0<=a;a--){var c=b[a],e=c.time*d.updateRate,h=c.frame+1,f=c.obj,g=c.attribute,k,l,m;if(h<=e){c.frame++;if("translate"==g){k=c.from.split(",");g=Number(k[0]);k=Number(k[1]);isNaN(k)&&(k=0);l=c.to.split(",");m=Number(l[0]);l=Number(l[1]);m=0===m-g?m:Math.round(d[c.effect](0,h,g,m-g,e));c=0===l-k?l:Math.round(d[c.effect](0,h,k,l-k,e));g="transform";if(isNaN(m)||isNaN(c))continue;c="translate("+m+","+c+")"}else l=Number(c.from),k=Number(c.to),m=k-l,c=d[c.effect](0,h,l,m,e),isNaN(c)&&(c=k),0===m&&this.animations.splice(a,1);this.setAttr(f,g,c)}else"translate"==g?(l=c.to.split(","),m=Number(l[0]),l=Number(l[1]),f.translate(m,l)):(k=Number(c.to),this.setAttr(f,g,k)),f.animationFinished=!0,this.animations.splice(a,1)}},getBBox:function(a){if(a=a.node)try{return a.getBBox()}catch(b){}return{width:0,height:0,x:0,y:0}},path:function(a,b){a.node.setAttributeNS(d.SVG_XLINK,"xlink:href",b)},clipRect:function(a,b,c,e,h){var f=a.node,g=a.clipPath;g&&this.D.remove(g);var k=f.parentNode;k&&(f=document.createElementNS(d.SVG_NS,"clipPath"),g=d.getUniqueId(),f.setAttribute("id",g),this.D.rect(b,c,e,h,0,0,f),k.appendChild(f),b="#",d.baseHref&&!d.isIE&&(b=this.removeTarget(window.location.href)+b),this.setAttr(a,"clip-path","url("+b+g+")"),this.clipPathC++,a.clipPath=f)},text:function(a,b,c){var e=new d.AmDObject("text",this.D);a=String(a).split("\n");var h=d.removePx(b["font-size"]),f;for(f=0;f<a.length;f++){var g=this.create(null,"tspan");g.appendChild(document.createTextNode(a[f]));g.setAttribute("y",(h+2)*f+Math.round(h/2));g.setAttribute("x",0);e.node.appendChild(g)}e.node.setAttribute("y",Math.round(h/2));this.attr(e,b);this.D.addToContainer(e.node,c);return e},setText:function(a,b){var c=a.node;c&&(c.removeChild(c.firstChild),c.appendChild(document.createTextNode(b)))},move:function(a,b,c,d){isNaN(b)&&(b=0);isNaN(c)&&(c=0);b="translate("+b+","+c+")";d&&(b=b+" scale("+d+")");this.setAttr(a,"transform",b)},rotate:function(a,b){var c=a.node.getAttribute("transform"),d="rotate("+b+")";c&&(d=c+" "+d);this.setAttr(a,"transform",d)},set:function(a){var b=new d.AmDObject("g",this.D);this.D.container.appendChild(b.node);if(a){var c;for(c=0;c<a.length;c++)b.push(a[c])}return b},addListener:function(a,b,c){a.node["on"+b]=c},gradient:function(a,b,c,e){var h=a.node,f=a.grad;f&&this.D.remove(f);b=document.createElementNS(d.SVG_NS,b);f=d.getUniqueId();b.setAttribute("id",f);if(!isNaN(e)){var g=0,k=0,l=0,m=0;90==e?l=100:270==e?m=100:180==e?g=100:0===e&&(k=100);b.setAttribute("x1",g+"%");b.setAttribute("x2",k+"%");b.setAttribute("y1",l+"%");b.setAttribute("y2",m+"%")}for(e=0;e<c.length;e++)g=document.createElementNS(d.SVG_NS,"stop"),k=100*e/(c.length-1),0===e&&(k=0),g.setAttribute("offset",k+"%"),g.setAttribute("stop-color",c[e]),b.appendChild(g);h.parentNode.appendChild(b);c="#";d.baseHref&&!d.isIE&&(c=this.removeTarget(window.location.href)+c);h.setAttribute("fill","url("+c+f+")");a.grad=b},removeTarget:function(a){return a.split("#")[0]},pattern:function(a,b,c,e){var h=a.node;isNaN(c)&&(c=1);var f=a.patternNode;f&&this.D.remove(f);var f=document.createElementNS(d.SVG_NS,"pattern"),g=d.getUniqueId(),k=b;b.url&&(k=b.url);d.isAbsolute(k)||-1!=k.indexOf("data:image")||(k=e+k);e=Number(b.width);isNaN(e)&&(e=4);var l=Number(b.height);isNaN(l)&&(l=4);e/=c;l/=c;c=b.x;isNaN(c)&&(c=0);var m=-Math.random()*Number(b.randomX);isNaN(m)||(c=m);m=b.y;isNaN(m)&&(m=0);var p=-Math.random()*Number(b.randomY);isNaN(p)||(m=p);f.setAttribute("id",g);f.setAttribute("width",e);f.setAttribute("height",l);f.setAttribute("patternUnits","userSpaceOnUse");f.setAttribute("xlink:href",k);b.color&&(p=document.createElementNS(d.SVG_NS,"rect"),p.setAttributeNS(null,"height",e),p.setAttributeNS(null,"width",l),p.setAttributeNS(null,"fill",b.color),f.appendChild(p));this.D.image(k,0,0,e,l,f).translate(c,m);k="#";d.baseHref&&!d.isIE&&(k=this.removeTarget(window.location.href)+k);h.setAttribute("fill","url("+k+g+")");a.patternNode=f;h.parentNode.appendChild(f)},remove:function(a){a.clipPath&&this.D.remove(a.clipPath);a.grad&&this.D.remove(a.grad);a.patternNode&&this.D.remove(a.patternNode);this.D.remove(a.node)}})})();(function(){var d=window.AmCharts;d.AmLegend=d.Class({construct:function(a){this.enabled=!0;this.cname="AmLegend";this.createEvents("rollOverMarker","rollOverItem","rollOutMarker","rollOutItem","showItem","hideItem","clickMarker","clickLabel");this.position="bottom";this.borderColor=this.color="#000000";this.borderAlpha=0;this.markerLabelGap=5;this.verticalGap=10;this.align="left";this.horizontalGap=0;this.spacing=10;this.markerDisabledColor="#AAB3B3";this.markerType="square";this.markerSize=16;this.markerBorderThickness=this.markerBorderAlpha=1;this.marginBottom=this.marginTop=0;this.marginLeft=this.marginRight=20;this.autoMargins=!0;this.valueWidth=50;this.switchable=!0;this.switchType="x";this.switchColor="#FFFFFF";this.rollOverColor="#CC0000";this.reversedOrder=!1;this.labelText="[[title]]";this.valueText="[[value]]";this.accessibleLabel="[[title]]";this.useMarkerColorForLabels=!1;this.rollOverGraphAlpha=1;this.textClickEnabled=!1;this.equalWidths=!0;this.backgroundColor="#FFFFFF";this.backgroundAlpha=0;this.useGraphSettings=!1;this.showEntries=!0;this.labelDx=0;d.applyTheme(this,a,this.cname)},setData:function(a){this.legendData=a;this.invalidateSize()},invalidateSize:function(){this.destroy();this.entries=[];this.valueLabels=[];var a=this.legendData;this.enabled&&(d.ifArray(a)||d.ifArray(this.data))&&this.drawLegend()},drawLegend:function(){var a=this.chart,b=this.position,c=this.width,e=a.divRealWidth,h=a.divRealHeight,f=this.div,g=this.legendData;this.data&&(g=this.combineLegend?this.legendData.concat(this.data):this.data);isNaN(this.fontSize)&&(this.fontSize=a.fontSize);this.maxColumnsReal=this.maxColumns;if("right"==b||"left"==b)this.maxColumnsReal=1,this.autoMargins&&(this.marginLeft=this.marginRight=10);else if(this.autoMargins){this.marginRight=a.marginRight;this.marginLeft=a.marginLeft;var k=a.autoMarginOffset;"bottom"==b?(this.marginBottom=k,this.marginTop=0):(this.marginTop=k,this.marginBottom=0)}c=void 0!==c?d.toCoordinate(c,e):"right"!=b&&"left"!=b?a.realWidth:0<this.ieW?this.ieW:a.realWidth;"outside"==b?(c=f.offsetWidth,h=f.offsetHeight,f.clientHeight&&(c=f.clientWidth,h=f.clientHeight)):(isNaN(c)||(f.style.width=c+"px"),f.className="amChartsLegend "+a.classNamePrefix+"-legend-div");this.divWidth=c;(b=this.container)?(b.container.innerHTML="",f.appendChild(b.container),b.width=c,b.height=h,b.setSize(c,h),b.addDefs(a)):b=new d.AmDraw(f,c,h,a);this.container=b;this.lx=0;this.ly=8;h=this.markerSize;h>this.fontSize&&(this.ly=h/2-1);0<h&&(this.lx+=h+this.markerLabelGap);this.titleWidth=0;if(h=this.title)h=d.text(this.container,h,this.color,a.fontFamily,this.fontSize,"start",!0),d.setCN(a,h,"legend-title"),h.translate(this.marginLeft,this.marginTop+this.verticalGap+this.ly+1),a=h.getBBox(),this.titleWidth=a.width+15,this.titleHeight=a.height+6;this.index=this.maxLabelWidth=0;if(this.showEntries){for(a=0;a<g.length;a++)this.createEntry(g[a]);for(a=this.index=0;a<g.length;a++)this.createValue(g[a])}this.arrangeEntries();this.updateValues()},arrangeEntries:function(){var a=this.position,b=this.marginLeft+
this.titleWidth,c=this.marginRight,e=this.marginTop,h=this.marginBottom,f=this.horizontalGap,g=this.div,k=this.divWidth,l=this.maxColumnsReal,m=this.verticalGap,p=this.spacing,q=k-c-b,n=0,t=0,r=this.container;this.set&&this.set.remove();var w=r.set();this.set=w;var z=r.set();w.push(z);var x=this.entries,u,A;for(A=0;A<x.length;A++){u=x[A].getBBox();var y=u.width;y>n&&(n=y);u=u.height;u>t&&(t=u)}var y=t=0,B=f,D=0,C=0;for(A=0;A<x.length;A++){var K=x[A];this.reversedOrder&&(K=x[x.length-A-1]);u=K.getBBox();var H;this.equalWidths?H=y*(n+p+this.markerLabelGap):(H=B,B=B+u.width+f+p);H+u.width>q&&0<A&&0!==y&&(t++,H=y=0,B=H+u.width+f+p,D=D+C+m,C=0);u.height>C&&(C=u.height);K.translate(H,D);y++;!isNaN(l)&&y>=l&&(y=0,t++,D=D+C+m,B=f,C=0);z.push(K)}u=z.getBBox();l=u.height+2*m-1;"left"==a||"right"==a?(p=u.width+2*f,k=p+b+c,g.style.width=k+"px",this.ieW=k):p=k-b-c-1;c=d.polygon(this.container,[0,p,p,0],[0,0,l,l],this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);d.setCN(this.chart,c,"legend-bg");w.push(c);w.translate(b,e);c.toBack();b=f;if("top"==a||"bottom"==a||"absolute"==a||"outside"==a)"center"==this.align?b=f+(p-u.width)/2:"right"==this.align&&(b=f+p-u.width);z.translate(b,m+1);this.titleHeight>l&&(l=this.titleHeight);e=l+e+h+1;0>e&&(e=0);"absolute"!=a&&"outside"!=a&&e>this.chart.divRealHeight&&(g.style.top="0px");g.style.height=Math.round(e)+"px";r.setSize(this.divWidth,e)},createEntry:function(a){if(!1!==a.visibleInLegend&&!a.hideFromLegend){var b=this,c=b.chart,e=b.useGraphSettings,
h=a.markerType;h&&(e=!1);a.legendEntryWidth=b.markerSize;h||(h=b.markerType);var f=a.color,g=a.alpha;a.legendKeyColor&&(f=a.legendKeyColor());a.legendKeyAlpha&&(g=a.legendKeyAlpha());var k;!0===a.hidden&&(k=f=b.markerDisabledColor);var l=a.pattern,m,p=a.customMarker;p||(p=b.customMarker);var q=b.container,n=b.markerSize,t=0,r=0,w=n/2;if(e){e=a.type;b.switchType=void 0;if("line"==e||"step"==e||"smoothedLine"==e||"ohlc"==e)m=q.set(),a.hidden||(f=a.lineColorR,k=a.bulletBorderColorR),t=d.line(q,[0,2*n],[n/2,n/2],f,a.lineAlpha,a.lineThickness,a.dashLength),d.setCN(c,t,"graph-stroke"),m.push(t),a.bullet&&(a.hidden||(f=a.bulletColorR),t=d.bullet(q,a.bullet,a.bulletSize,f,a.bulletAlpha,a.bulletBorderThickness,k,a.bulletBorderAlpha))&&(d.setCN(c,t,"graph-bullet"),t.translate(n+1,n/2),m.push(t)),w=0,t=n,r=n/3;else{a.getGradRotation&&(m=a.getGradRotation(),0===m&&(m=180));t=a.fillColorsR;!0===a.hidden&&(t=f);if(m=b.createMarker("rectangle",t,a.fillAlphas,a.lineThickness,f,a.lineAlpha,m,l,a.dashLength))w=n,m.translate(w,n/2);t=n}d.setCN(c,m,"graph-"+e);d.setCN(c,m,"graph-"+a.id)}else if(p)m=q.image(p,0,0,n,n);else{var z;isNaN(b.gradientRotation)||(z=180+b.gradientRotation);(m=b.createMarker(h,f,g,void 0,void 0,void 0,z,l))&&m.translate(n/2,n/2)}d.setCN(c,m,"legend-marker");b.addListeners(m,a);q=q.set([m]);b.switchable&&a.switchable&&q.setAttr("cursor","pointer");void 0!==a.id&&d.setCN(c,q,"legend-item-"+a.id);d.setCN(c,q,a.className,!0);k=b.switchType;var x;k&&"none"!=k&&0<n&&("x"==k?(x=b.createX(),x.translate(n/2,n/2)):x=b.createV(),x.dItem=a,!0!==a.hidden?"x"==k?x.hide():x.show():"x"!=k&&x.hide(),b.switchable||x.hide(),b.addListeners(x,a),a.legendSwitch=x,q.push(x),d.setCN(c,x,"legend-switch"));k=b.color;a.showBalloon&&b.textClickEnabled&&void 0!==b.selectedColor&&(k=b.selectedColor);b.useMarkerColorForLabels&&!l&&(k=f);!0===a.hidden&&(k=b.markerDisabledColor);f=d.massReplace(b.labelText,{"[[title]]":a.title});void 0!==b.tabIndex&&(q.setAttr("tabindex",b.tabIndex),q.setAttr("role","menuitem"),q.keyup(function(c){13==c.keyCode&&b.clickMarker(a,c)}));c.accessible&&b.accessibleLabel&&(l=d.massReplace(b.accessibleLabel,{"[[title]]":a.title}),c.makeAccessible(q,l));l=b.fontSize;m&&(n<=l&&(n=n/2+b.ly-l/2+(l+2-n)/2-r,m.translate(w,n),x&&x.translate(x.x,n)),a.legendEntryWidth=m.getBBox().width);var u;f&&(f=d.fixBrakes(f),a.legendTextReal=f,u=b.labelWidth,u=isNaN(u)?d.text(b.container,f,k,c.fontFamily,l,"start"):d.wrappedText(b.container,f,k,c.fontFamily,l,"start",!1,u,0),d.setCN(c,u,"legend-label"),
u.translate(b.lx+t,b.ly),q.push(u),b.labelDx=t,c=u.getBBox().width,b.maxLabelWidth<c&&(b.maxLabelWidth=c));b.entries[b.index]=q;a.legendEntry=b.entries[b.index];a.legendMarker=m;a.legendLabel=u;b.index++}},addListeners:function(a,b){var c=this;a&&a.mouseover(function(a){c.rollOverMarker(b,a)}).mouseout(function(a){c.rollOutMarker(b,a)}).click(function(a){c.clickMarker(b,a)})},rollOverMarker:function(a,b){this.switchable&&this.dispatch("rollOverMarker",a,b);this.dispatch("rollOverItem",a,b)},rollOutMarker:function(a,b){this.switchable&&this.dispatch("rollOutMarker",a,b);this.dispatch("rollOutItem",a,b)},clickMarker:function(a,b){this.switchable&&(!0===a.hidden?this.dispatch("showItem",a,b):this.dispatch("hideItem",a,b));this.dispatch("clickMarker",a,b)},rollOverLabel:function(a,b){a.hidden||this.textClickEnabled&&a.legendLabel&&a.legendLabel.attr({fill:this.rollOverColor});this.dispatch("rollOverItem",a,b)},rollOutLabel:function(a,b){if(!a.hidden&&this.textClickEnabled&&a.legendLabel){var c=this.color;void 0!==this.selectedColor&&a.showBalloon&&(c=this.selectedColor);this.useMarkerColorForLabels&&(c=a.lineColor,void 0===c&&(c=a.color));a.legendLabel.attr({fill:c})}this.dispatch("rollOutItem",a,b)},clickLabel:function(a,b){this.textClickEnabled?a.hidden||this.dispatch("clickLabel",a,b):this.switchable&&(!0===a.hidden?this.dispatch("showItem",a,b):this.dispatch("hideItem",a,b))},dispatch:function(a,b,c){a={type:a,dataItem:b,target:this,event:c,chart:this.chart};this.chart&&this.chart.handleLegendEvent(a);this.fire(a)},createValue:function(a){var b=this,c=b.fontSize,e=b.chart;if(!1!==a.visibleInLegend&&!a.hideFromLegend){var h=b.maxLabelWidth;b.forceWidth&&(h=b.labelWidth);b.equalWidths||(b.valueAlign="left");"left"==b.valueAlign&&a.legendLabel&&(h=a.legendLabel.getBBox().width);var f=h;if(b.valueText&&0<b.valueWidth){var g=b.color;b.useMarkerColorForValues&&(g=a.color,a.legendKeyColor&&(g=a.legendKeyColor()));!0===a.hidden&&(g=b.markerDisabledColor);var k=b.valueText,h=h+b.lx+b.labelDx+b.markerLabelGap+
b.valueWidth,l="end";"left"==b.valueAlign&&(h-=b.valueWidth,l="start");g=d.text(b.container,k,g,b.chart.fontFamily,c,l);d.setCN(e,g,"legend-value");g.translate(h,b.ly);b.entries[b.index].push(g);f+=b.valueWidth+2*b.markerLabelGap;g.dItem=a;b.valueLabels.push(g)}b.index++;e=b.markerSize;e<c+7&&(e=c+7,d.VML&&(e+=3));c=b.container.rect(a.legendEntryWidth,0,f,e,0,0).attr({stroke:"none",fill:"#fff","fill-opacity":.005});c.dItem=a;b.entries[b.index-1].push(c);c.mouseover(function(c){b.rollOverLabel(a,c)}).mouseout(function(c){b.rollOutLabel(a,c)}).click(function(c){b.clickLabel(a,c)})}},createV:function(){var a=this.markerSize;return d.polygon(this.container,[a/5,a/2,a-a/5,a/2],[a/3,a-a/5,a/5,a/1.7],this.switchColor)},createX:function(){var a=(this.markerSize-4)/2,b={stroke:this.switchColor,"stroke-width":3},c=this.container,e=d.line(c,[-a,a],[-a,a]).attr(b),a=d.line(c,[-a,a],[a,-a]).attr(b);return this.container.set([e,a])},createMarker:function(a,b,c,e,h,f,g,k,l){var m=this.markerSize,p=this.container;h||(h=this.markerBorderColor);h||
(h=b);isNaN(e)&&(e=this.markerBorderThickness);isNaN(f)&&(f=this.markerBorderAlpha);return d.bullet(p,a,m,b,c,e,h,f,m,g,k,this.chart.path,l)},validateNow:function(){this.invalidateSize()},updateValues:function(){var a=this.valueLabels,b=this.chart,c,e=this.data;if(a)for(c=0;c<a.length;c++){var h=a[c],f=h.dItem;f.periodDataItem=void 0;f.periodPercentDataItem=void 0;var g=" ";if(e)f.value?h.text(f.value):h.text("");else{var k=null;if(void 0!==f.type){var k=f.currentDataItem,l=this.periodValueText;f.legendPeriodValueText&&(l=f.legendPeriodValueText);f.legendPeriodValueTextR&&(l=f.legendPeriodValueTextR);k?(g=this.valueText,f.legendValueText&&(g=f.legendValueText),g=b.formatString(g,k)):l&&b.formatPeriodString&&(l=d.massReplace(l,{"[[title]]":f.title}),g=b.formatPeriodString(l,f))}else g=b.formatString(this.valueText,f);l=f;k&&(l=k);var m=this.valueFunction;m&&(g=m(l,g,b.periodDataItem));var p;this.useMarkerColorForLabels&&!k&&f.lastDataItem&&(k=f.lastDataItem);k?p=b.getBalloonColor(f,k):f.legendKeyColor&&(p=f.legendKeyColor());f.legendColorFunction&&(p=f.legendColorFunction(l,g,f.periodDataItem,f.periodPercentDataItem));h.text(g);if(!f.pattern&&(this.useMarkerColorForValues&&h.setAttr("fill",p),this.useMarkerColorForLabels)){if(h=f.legendMarker)h.setAttr("fill",p),h.setAttr("stroke",p);(f=f.legendLabel)&&f.setAttr("fill",p)}}}},renderFix:function(){if(!d.VML&&this.enabled){var a=this.container;a&&a.renderFix()}},destroy:function(){this.div.innerHTML="";d.remove(this.set)}})})();(function(){var d=window.AmCharts;d.formatMilliseconds=function(a,b){if(-1!=a.indexOf("fff")){var c=b.getMilliseconds(),d=String(c);10>c&&(d="00"+c);10<=c&&100>c&&(d="0"+c);a=a.replace(/fff/g,d)}return a};d.extractPeriod=function(a){var b=d.stripNumbers(a),c=1;b!=a&&(c=Number(a.slice(0,a.indexOf(b))));return{period:b,count:c}};d.getDate=function(a,b,c){return a instanceof Date?d.newDate(a,c):b&&isNaN(a)?d.stringToDate(a,b):new Date(a)};d.daysInMonth=function(a){return(new Date(a.getYear(),a.getMonth()+
1,0)).getDate()};d.newDate=function(a,b){return b&&-1==b.indexOf("fff")?new Date(a):new Date(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours(),a.getMinutes(),a.getSeconds(),a.getMilliseconds())};d.resetDateToMin=function(a,b,c,e){void 0===e&&(e=1);var h,f,g,k,l,m,p;d.useUTC?(h=a.getUTCFullYear(),f=a.getUTCMonth(),g=a.getUTCDate(),k=a.getUTCHours(),l=a.getUTCMinutes(),m=a.getUTCSeconds(),p=a.getUTCMilliseconds(),a=a.getUTCDay()):(h=a.getFullYear(),f=a.getMonth(),g=a.getDate(),k=a.getHours(),l=a.getMinutes(),m=a.getSeconds(),p=a.getMilliseconds(),a=a.getDay());switch(b){case"YYYY":h=Math.floor(h/c)*c;f=0;g=1;p=m=l=k=0;break;case"MM":f=Math.floor(f/c)*c;g=1;p=m=l=k=0;break;case"WW":g=a>=e?g-a+e:g-(7+a)+e;p=m=l=k=0;break;case"DD":p=m=l=k=0;break;case"hh":k=Math.floor(k/c)*c;p=m=l=0;break;case"mm":l=Math.floor(l/c)*c;p=m=0;break;case"ss":m=Math.floor(m/c)*c;p=0;break;case"fff":p=Math.floor(p/c)*c}d.useUTC?(a=new Date,a.setUTCFullYear(h,f,g),a.setUTCHours(k,l,m,p)):a=new Date(h,f,g,k,l,m,p);return a};d.getPeriodDuration=function(a,b){void 0===b&&(b=1);var c;switch(a){case"YYYY":c=316224E5;break;case"MM":c=26784E5;break;case"WW":c=6048E5;break;case"DD":c=864E5;break;case"hh":c=36E5;break;case"mm":c=6E4;break;case"ss":c=1E3;break;case"fff":c=1}return c*b};d.intervals={s:{nextInterval:"ss",contains:1E3},ss:{nextInterval:"mm",contains:60,count:0},mm:{nextInterval:"hh",contains:60,count:1},hh:{nextInterval:"DD",contains:24,count:2},DD:{nextInterval:"",contains:Infinity,count:3}};d.getMaxInterval=function(a,b){var c=d.intervals;return a>=c[b].contains?(a=Math.round(a/c[b].contains),b=c[b].nextInterval,d.getMaxInterval(a,b)):"ss"==b?c[b].nextInterval:b};d.dayNames="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");d.shortDayNames="Sun Mon Tue Wed Thu Fri Sat".split(" ");d.monthNames="January February March April May June July August September October November December".split(" ");d.shortMonthNames="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");d.getWeekNumber=function(a){a=new Date(a);a.setHours(0,0,0);a.setDate(a.getDate()+4-(a.getDay()||7));var b=new Date(a.getFullYear(),0,1);return Math.ceil(((a-b)/864E5+1)/7)};d.stringToDate=function(a,b){var c={},e=[{pattern:"YYYY",period:"year"},{pattern:"YY",period:"year"},{pattern:"MM",period:"month"},{pattern:"M",period:"month"},{pattern:"DD",period:"date"},{pattern:"D",period:"date"},{pattern:"JJ",period:"hours"},{pattern:"J",period:"hours"},{pattern:"HH",period:"hours"},{pattern:"H",period:"hours"},
{pattern:"KK",period:"hours"},{pattern:"K",period:"hours"},{pattern:"LL",period:"hours"},{pattern:"L",period:"hours"},{pattern:"NN",period:"minutes"},{pattern:"N",period:"minutes"},{pattern:"SS",period:"seconds"},{pattern:"S",period:"seconds"},{pattern:"QQQ",period:"milliseconds"},{pattern:"QQ",period:"milliseconds"},{pattern:"Q",period:"milliseconds"}],h=!0,f=b.indexOf("AA");-1!=f&&(a.substr(f,2),"pm"==a.toLowerCase&&(h=!1));var f=b,g,k,l;for(l=0;l<e.length;l++)k=e[l].period,c[k]=0,"date"==k&&(c[k]=1);for(l=0;l<e.length;l++)if(g=e[l].pattern,k=e[l].period,-1!=b.indexOf(g)){var m=d.getFromDateString(g,a,f);b=b.replace(g,"");if("KK"==g||"K"==g||"LL"==g||"L"==g)h||(m+=12);c[k]=m}d.useUTC?(e=new Date,e.setUTCFullYear(c.year,c.month,c.date),e.setUTCHours(c.hours,c.minutes,c.seconds,c.milliseconds)):e=new Date(c.year,c.month,c.date,c.hours,c.minutes,c.seconds,c.milliseconds);return e};d.getFromDateString=function(a,b,c){if(void 0!==b)return c=c.indexOf(a),b=String(b),b=b.substr(c,a.length),"0"==b.charAt(0)&&(b=b.substr(1,b.length-1)),b=Number(b),isNaN(b)&&(b=0),-1!=a.indexOf("M")&&b--,b};d.formatDate=function(a,b,c){c||(c=d);var e,h,f,g,k,l,m,p,q=d.getWeekNumber(a);d.useUTC?(e=a.getUTCFullYear(),h=a.getUTCMonth(),f=a.getUTCDate(),g=a.getUTCDay(),k=a.getUTCHours(),l=a.getUTCMinutes(),m=a.getUTCSeconds(),p=a.getUTCMilliseconds()):(e=a.getFullYear(),h=a.getMonth(),f=a.getDate(),g=a.getDay(),k=a.getHours(),l=a.getMinutes(),m=a.getSeconds(),p=a.getMilliseconds());var n=String(e).substr(2,2),t="0"+g;b=b.replace(/W/g,q);q=k;24==q&&(q=0);var r=q;10>r&&(r="0"+r);b=b.replace(/JJ/g,r);b=b.replace(/J/g,q);r=k;0===r&&(r=24,-1!=b.indexOf("H")&&(f--,0===f&&(e=new Date(a),e.setDate(e.getDate()-1),h=e.getMonth(),f=e.getDate(),e=e.getFullYear())));a=h+1;9>h&&(a="0"+a);q=f;10>f&&(q="0"+f);var w=r;10>w&&(w="0"+w);b=b.replace(/HH/g,w);b=b.replace(/H/g,r);r=k;11<r&&(r-=12);w=r;10>w&&(w="0"+w);b=b.replace(/KK/g,w);b=b.replace(/K/g,r);r=k;0===r&&(r=12);12<r&&(r-=12);w=r;10>w&&(w="0"+w);b=b.replace(/LL/g,w);b=b.replace(/L/g,r);r=l;10>r&&(r="0"+r);b=b.replace(/NN/g,r);b=b.replace(/N/g,l);l=m;10>l&&(l="0"+l);b=b.replace(/SS/g,l);b=b.replace(/S/g,m);m=p;10>m?m="00"+m:100>m&&(m="0"+m);l=p;10>l&&(l="00"+l);b=b.replace(/A/g,"@A@");b=b.replace(/QQQ/g,m);b=b.replace(/QQ/g,l);b=b.replace(/Q/g,p);b=b.replace(/YYYY/g,"@IIII@");b=b.replace(/YY/g,"@II@");b=b.replace(/MMMM/g,"@XXXX@");b=b.replace(/MMM/g,"@XXX@");b=b.replace(/MM/g,"@XX@");b=b.replace(/M/g,"@X@");b=b.replace(/DD/g,"@RR@");b=b.replace(/D/g,"@R@");b=b.replace(/EEEE/g,"@PPPP@");b=b.replace(/EEE/g,"@PPP@");b=b.replace(/EE/g,"@PP@");b=b.replace(/E/g,"@P@");b=b.replace(/@IIII@/g,e);b=b.replace(/@II@/g,n);b=b.replace(/@XXXX@/g,c.monthNames[h]);b=b.replace(/@XXX@/g,c.shortMonthNames[h]);b=b.replace(/@XX@/g,a);b=b.replace(/@X@/g,h+1);b=b.replace(/@RR@/g,q);b=b.replace(/@R@/g,f);b=b.replace(/@PPPP@/g,c.dayNames[g]);b=b.replace(/@PPP@/g,c.shortDayNames[g]);b=b.replace(/@PP@/g,t);b=b.replace(/@P@/g,g);return b=12>k?b.replace(/@A@/g,c.amString):b.replace(/@A@/g,c.pmString)};d.changeDate=function(a,b,c,e,h){if(d.useUTC)return d.changeUTCDate(a,b,c,e,h);var f=-1;void 0===e&&(e=!0);void 0===h&&(h=!1);!0===e&&(f=1);switch(b){case"YYYY":a.setFullYear(a.getFullYear()+c*f);e||h||a.setDate(a.getDate()+1);break;case"MM":b=a.getMonth();a.setMonth(a.getMonth()+c*f);a.getMonth()>b+c*f&&a.setDate(a.getDate()-1);e||h||a.setDate(a.getDate()+1);break;case"DD":a.setDate(a.getDate()+c*f);break;case"WW":a.setDate(a.getDate()+c*f*7);break;case"hh":a.setHours(a.getHours()+c*f);break;case"mm":a.setMinutes(a.getMinutes()+
c*f);break;case"ss":a.setSeconds(a.getSeconds()+c*f);break;case"fff":a.setMilliseconds(a.getMilliseconds()+c*f)}return a};d.changeUTCDate=function(a,b,c,d,h){var f=-1;void 0===d&&(d=!0);void 0===h&&(h=!1);!0===d&&(f=1);switch(b){case"YYYY":a.setUTCFullYear(a.getUTCFullYear()+c*f);d||h||a.setUTCDate(a.getUTCDate()+1);break;case"MM":b=a.getUTCMonth();a.setUTCMonth(a.getUTCMonth()+c*f);a.getUTCMonth()>b+c*f&&a.setUTCDate(a.getUTCDate()-1);d||h||a.setUTCDate(a.getUTCDate()+1);break;case"DD":a.setUTCDate(a.getUTCDate()+
c*f);break;case"WW":a.setUTCDate(a.getUTCDate()+c*f*7);break;case"hh":a.setUTCHours(a.getUTCHours()+c*f);break;case"mm":a.setUTCMinutes(a.getUTCMinutes()+c*f);break;case"ss":a.setUTCSeconds(a.getUTCSeconds()+c*f);break;case"fff":a.setUTCMilliseconds(a.getUTCMilliseconds()+c*f)}return a}})();
(function(){var f=window.AmCharts;f.AmRectangularChart=f.Class({inherits:f.AmCoordinateChart,construct:function(a){f.AmRectangularChart.base.construct.call(this,a);this.theme=a;this.createEvents("zoomed","changed");this.marginRight=this.marginBottom=this.marginTop=this.marginLeft=20;this.depth3D=this.angle=0;this.plotAreaFillColors="#FFFFFF";this.plotAreaFillAlphas=0;this.plotAreaBorderColor="#000000";this.plotAreaBorderAlpha=0;this.maxZoomFactor=20;this.zoomOutButtonImageSize=19;this.zoomOutButtonImage="lens";this.zoomOutText="Show all";this.zoomOutButtonColor="#e5e5e5";this.zoomOutButtonAlpha=0;this.zoomOutButtonRollOverAlpha=1;this.zoomOutButtonPadding=8;this.trendLines=[];this.autoMargins=!0;this.marginsUpdated=!1;this.autoMarginOffset=10;f.applyTheme(this,a,"AmRectangularChart")},initChart:function(){f.AmRectangularChart.base.initChart.call(this);this.updateDxy();!this.marginsUpdated&&this.autoMargins&&(this.resetMargins(),this.drawGraphs=!1);this.processScrollbars();this.updateMargins();this.updatePlotArea();this.updateScrollbars();this.updateTrendLines();this.updateChartCursor();this.updateValueAxes();this.scrollbarOnly||this.updateGraphs()},drawChart:function(){f.AmRectangularChart.base.drawChart.call(this);this.drawPlotArea();if(f.ifArray(this.chartData)){var a=this.chartCursor;a&&a.draw()}},resetMargins:function(){var a={},b;if("xy"==this.type){var c=this.xAxes,d=this.yAxes;for(b=0;b<c.length;b++){var g=c[b];g.ignoreAxisWidth||(g.setOrientation(!0),g.fixAxisPosition(),a[g.position]=!0)}for(b=0;b<d.length;b++)c=d[b],c.ignoreAxisWidth||(c.setOrientation(!1),c.fixAxisPosition(),a[c.position]=!0)}else{d=this.valueAxes;for(b=0;b<d.length;b++)c=d[b],c.ignoreAxisWidth||(c.setOrientation(this.rotate),c.fixAxisPosition(),a[c.position]=!0);(b=this.categoryAxis)&&!b.ignoreAxisWidth&&(b.setOrientation(!this.rotate),b.fixAxisPosition(),b.fixAxisPosition(),a[b.position]=!0)}a.left&&(this.marginLeft=0);a.right&&(this.marginRight=0);a.top&&(this.marginTop=0);a.bottom&&(this.marginBottom=0);this.fixMargins=a},measureMargins:function(){var a=this.valueAxes,b,c=this.autoMarginOffset,d=this.fixMargins,g=this.realWidth,h=this.realHeight,e=c,f=c,k=g;b=h;var m;for(m=0;m<a.length;m++)a[m].handleSynchronization(),b=this.getAxisBounds(a[m],e,k,f,b),e=Math.round(b.l),k=Math.round(b.r),f=Math.round(b.t),b=Math.round(b.b);if(a=this.categoryAxis)b=this.getAxisBounds(a,e,k,f,b),e=Math.round(b.l),k=Math.round(b.r),f=Math.round(b.t),b=Math.round(b.b);d.left&&e<c&&(this.marginLeft=Math.round(-e+c),!isNaN(this.minMarginLeft)&&this.marginLeft<this.minMarginLeft&&(this.marginLeft=this.minMarginLeft));d.right&&k>=g-c&&(this.marginRight=Math.round(k-g+c),!isNaN(this.minMarginRight)&&this.marginRight<this.minMarginRight&&(this.marginRight=this.minMarginRight));d.top&&f<c+this.titleHeight&&(this.marginTop=Math.round(this.marginTop-f+c+this.titleHeight),!isNaN(this.minMarginTop)&&this.marginTop<this.minMarginTop&&(this.marginTop=this.minMarginTop));d.bottom&&b>h-c&&(this.marginBottom=Math.round(this.marginBottom+b-h+c),!isNaN(this.minMarginBottom)&&this.marginBottom<this.minMarginBottom&&(this.marginBottom=this.minMarginBottom));this.initChart()},getAxisBounds:function(a,b,c,d,g){if(!a.ignoreAxisWidth){var h=a.labelsSet,e=a.tickLength;a.inside&&(e=0);if(h)switch(h=a.getBBox(),a.position){case"top":a=h.y;d>a&&(d=a);break;case"bottom":a=h.y+h.height;g<a&&(g=a);break;case"right":a=h.x+h.width+e+3;c<a&&(c=a);break;case"left":a=h.x-e,b>a&&(b=a)}}return{l:b,t:d,r:c,b:g}},drawZoomOutButton:function(){var a=this;if(!a.zbSet){var b=a.container.set();a.zoomButtonSet.push(b);var c=a.color,d=a.fontSize,g=a.zoomOutButtonImageSize,h=a.zoomOutButtonImage.replace(/\.[a-z]*$/i,""),e=a.langObj.zoomOutText||a.zoomOutText,l=a.zoomOutButtonColor,k=a.zoomOutButtonAlpha,m=a.zoomOutButtonFontSize,p=a.zoomOutButtonPadding;isNaN(m)||(d=m);(m=a.zoomOutButtonFontColor)&&(c=m);var m=a.zoomOutButton,n;m&&(m.fontSize&&(d=m.fontSize),m.color&&(c=m.color),m.backgroundColor&&(l=m.backgroundColor),isNaN(m.backgroundAlpha)||(a.zoomOutButtonRollOverAlpha=m.backgroundAlpha));var u=m=0,u=a.pathToImages;if(h){if(f.isAbsolute(h)||void 0===u)u="";n=a.container.image(u+h+a.extension,0,0,g,g);f.setCN(a,n,"zoom-out-image");b.push(n);n=n.getBBox();m=n.width+5}void 0!==e&&(c=f.text(a.container,e,c,a.fontFamily,d,"start"),f.setCN(a,c,"zoom-out-label"),d=c.getBBox(),u=n?n.height/2-3:d.height/2,c.translate(m,u),b.push(c));n=b.getBBox();c=1;f.isModern||(c=0);l=f.rect(a.container,n.width+2*p+5,n.height+2*p-2,l,1,1,l,c);l.setAttr("opacity",k);l.translate(-p,-p);f.setCN(a,l,"zoom-out-bg");b.push(l);l.toBack();a.zbBG=l;n=l.getBBox();b.translate(a.marginLeftReal+a.plotAreaWidth-n.width+p,a.marginTopReal+p);b.hide();b.mouseover(function(){a.rollOverZB()}).mouseout(function(){a.rollOutZB()}).click(function(){a.clickZB()}).touchstart(function(){a.rollOverZB()}).touchend(function(){a.rollOutZB();a.clickZB()});for(k=0;k<b.length;k++)b[k].attr({cursor:"pointer"});void 0!==a.zoomOutButtonTabIndex&&(b.setAttr("tabindex",a.zoomOutButtonTabIndex),b.setAttr("role","menuitem"),b.keyup(function(b){13==b.keyCode&&a.clickZB()}));a.zbSet=b}},rollOverZB:function(){this.rolledOverZB=!0;this.zbBG.setAttr("opacity",this.zoomOutButtonRollOverAlpha)},rollOutZB:function(){this.rolledOverZB=!1;this.zbBG.setAttr("opacity",this.zoomOutButtonAlpha)},clickZB:function(){this.rolledOverZB=!1;this.zoomOut()},zoomOut:function(){this.zoomOutValueAxes()},drawPlotArea:function(){var a=this.dx,b=this.dy,c=this.marginLeftReal,d=this.marginTopReal,g=this.plotAreaWidth-1,h=this.plotAreaHeight-1,e=this.plotAreaFillColors,l=this.plotAreaFillAlphas,k=this.plotAreaBorderColor,m=this.plotAreaBorderAlpha;"object"==typeof l&&(l=l[0]);e=f.polygon(this.container,[0,g,g,0,0],[0,0,h,h,0],e,l,1,k,m,this.plotAreaGradientAngle);f.setCN(this,e,"plot-area");e.translate(c+a,d+b);this.set.push(e);0!==a&&0!==b&&(e=this.plotAreaFillColors,"object"==typeof e&&(e=e[0]),e=f.adjustLuminosity(e,-.15),g=f.polygon(this.container,[0,a,g+a,g,0],[0,b,b,0,0],e,l,1,k,m),f.setCN(this,g,"plot-area-bottom"),g.translate(c,d+h),this.set.push(g),a=f.polygon(this.container,[0,0,a,a,0],[0,h,h+b,b,0],e,l,1,k,m),f.setCN(this,a,"plot-area-left"),a.translate(c,d),this.set.push(a));(c=this.bbset)&&this.scrollbarOnly&&c.remove()},updatePlotArea:function(){var a=this.updateWidth(),b=this.updateHeight(),c=this.container;this.realWidth=a;this.realWidth=b;c&&this.container.setSize(a,b);var c=this.marginLeftReal,d=this.marginTopReal,a=a-c-this.marginRightReal-this.dx,b=b-d-this.marginBottomReal;1>a&&(a=1);1>b&&(b=1);this.plotAreaWidth=Math.round(a);this.plotAreaHeight=Math.round(b);this.plotBalloonsSet.translate(c,d)},updateDxy:function(){this.dx=Math.round(this.depth3D*Math.cos(this.angle*Math.PI/180));this.dy=Math.round(-this.depth3D*Math.sin(this.angle*Math.PI/180));this.d3x=Math.round(this.columnSpacing3D*Math.cos(this.angle*Math.PI/180));this.d3y=Math.round(-this.columnSpacing3D*Math.sin(this.angle*Math.PI/180))},updateMargins:function(){var a=this.getTitleHeight();this.titleHeight=a;this.marginTopReal=this.marginTop-this.dy;this.fixMargins&&!this.fixMargins.top&&(this.marginTopReal+=a);this.marginBottomReal=this.marginBottom;this.marginLeftReal=this.marginLeft;this.marginRightReal=this.marginRight},updateValueAxes:function(){var a=this.valueAxes,b;for(b=0;b<a.length;b++){var c=a[b];this.setAxisRenderers(c);this.updateObjectSize(c)}},setAxisRenderers:function(a){a.axisRenderer=f.RecAxis;a.guideFillRenderer=f.RecFill;a.axisItemRenderer=f.RecItem;a.marginsChanged=!0},updateGraphs:function(){var a=this.graphs,b;for(b=0;b<a.length;b++){var c=a[b];c.index=b;c.rotate=this.rotate;this.updateObjectSize(c)}},updateObjectSize:function(a){a.width=this.plotAreaWidth-1;a.height=this.plotAreaHeight-1;a.x=this.marginLeftReal;a.y=this.marginTopReal;a.dx=this.dx;a.dy=this.dy},updateChartCursor:function(){var a=this.chartCursor;a&&(a=f.processObject(a,f.ChartCursor,this.theme),this.updateObjectSize(a),this.addChartCursor(a),a.chart=this)},processScrollbars:function(){var a=this.chartScrollbar;a&&(a=f.processObject(a,f.ChartScrollbar,this.theme),this.addChartScrollbar(a))},updateScrollbars:function(){},removeChartCursor:function(){f.callMethod("destroy",[this.chartCursor]);this.chartCursor=null},zoomTrendLines:function(){var a=this.trendLines,b;for(b=0;b<a.length;b++){var c=a[b];c.valueAxis.recalculateToPercents?c.set&&c.set.hide():(c.x=this.marginLeftReal,c.y=this.marginTopReal,c.draw())}},handleCursorValueZoom:function(){},addTrendLine:function(a){this.trendLines.push(a)},zoomOutValueAxes:function(){for(var a=this.valueAxes,b=0;b<a.length;b++)a[b].zoomOut()},removeTrendLine:function(a){var b=this.trendLines,c;for(c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1)},adjustMargins:function(a,b){var c=a.position,d=a.scrollbarHeight+a.offset;a.enabled&&("top"==c?b?this.marginLeftReal+=d:this.marginTopReal+=d:b?this.marginRightReal+=d:this.marginBottomReal+=d)},getScrollbarPosition:function(a,b,c){var d="bottom",g="top";a.oppositeAxis||(g=d,d="top");a.position=b?"bottom"==c||"left"==c?d:g:"top"==c||"right"==c?d:g},updateChartScrollbar:function(a,b){if(a){a.rotate=b;var c=this.marginTopReal,d=this.marginLeftReal,g=a.scrollbarHeight,h=this.dx,e=this.dy,f=a.offset;"top"==a.position?b?(a.y=c,a.x=d-g-f):(a.y=c-g+e-f,a.x=d+h):b?(a.y=c+e,a.x=d+this.plotAreaWidth+h+f):(a.y=c+this.plotAreaHeight+f,a.x=this.marginLeftReal)}},showZB:function(a){var b=this.zbSet;a&&(b=this.zoomOutText,""!==b&&b&&this.drawZoomOutButton());if(b=this.zbSet)this.zoomButtonSet.push(b),a?b.show():b.hide(),this.rollOutZB()},handleReleaseOutside:function(a){f.AmRectangularChart.base.handleReleaseOutside.call(this,a);(a=this.chartCursor)&&a.handleReleaseOutside&&a.handleReleaseOutside()},handleMouseDown:function(a){f.AmRectangularChart.base.handleMouseDown.call(this,a);var b=this.chartCursor;b&&b.handleMouseDown&&!this.rolledOverZB&&b.handleMouseDown(a)},update:function(){f.AmRectangularChart.base.update.call(this);this.chartCursor&&this.chartCursor.update&&this.chartCursor.update()},handleScrollbarValueZoom:function(a){this.relativeZoomValueAxes(a.target.valueAxes,a.relativeStart,a.relativeEnd);this.zoomAxesAndGraphs()},zoomValueScrollbar:function(a){if(a&&a.enabled){var b=a.valueAxes[0],c=b.relativeStart,d=b.relativeEnd;b.reversed&&(d=1-c,c=1-b.relativeEnd);a.percentZoom(c,d)}},zoomAxesAndGraphs:function(){if(!this.scrollbarOnly){var a=this.valueAxes,b;for(b=0;b<a.length;b++)a[b].zoom(this.start,this.end);a=this.graphs;for(b=0;b<a.length;b++)a[b].zoom(this.start,this.end);(b=this.chartCursor)&&b.clearSelection();this.zoomTrendLines()}},handleValueAxisZoomReal:function(a,b){var c=a.relativeStart,d=a.relativeEnd;if(c>d)var g=c,c=d,d=g;this.relativeZoomValueAxes(b,c,d);this.updateAfterValueZoom()},updateAfterValueZoom:function(){this.zoomAxesAndGraphs();this.zoomScrollbar()},relativeZoomValueAxes:function(a,b,c){this.hideBalloonReal();b=f.fitToBounds(b,0,1);c=f.fitToBounds(c,0,1);if(b>c){var d=b;b=c;c=d}var d=1/this.maxZoomFactor,g=f.getDecimals(d)+4;c-b<d&&(c=b+(c-b)/2,b=c-d/2,c+=d/2,1<c&&(b-=c-1,c=1),0>b&&(b=0,c=d));b=f.roundTo(b,g);c=f.roundTo(c,g);d=!1;if(a){for(g=0;g<a.length;g++){var h=a[g].zoomToRelativeValues(b,c,!0);h&&(d=h)}this.showZB()}return d},addChartCursor:function(a){f.callMethod("destroy",
[this.chartCursor]);a&&(this.listenTo(a,"moved",this.handleCursorMove),this.listenTo(a,"zoomed",this.handleCursorZoom),this.listenTo(a,"zoomStarted",this.handleCursorZoomStarted),this.listenTo(a,"panning",this.handleCursorPanning),this.listenTo(a,"onHideCursor",this.handleCursorHide));this.chartCursor=a},handleCursorChange:function(){},handleCursorMove:function(a){var b,c=this.valueAxes;for(b=0;b<c.length;b++)if(!a.panning){var d=c[b];d&&d.showBalloon&&d.showBalloon(a.x,a.y)}},handleCursorZoom:function(a){if(this.skipZoomed)this.skipZoomed=!1;else{var b=this.startX0,c=this.endX0,d=this.endY0,g=this.startY0,h=a.startX,e=a.endX,f=a.startY,k=a.endY;this.startX0=this.endX0=this.startY0=this.endY0=NaN;this.handleCursorZoomReal(b+h*(c-b),b+e*(c-b),g+f*(d-g),g+k*(d-g),a)}},handleCursorHide:function(){var a,b=this.valueAxes;for(a=0;a<b.length;a++)b[a].hideBalloon();b=this.graphs;for(a=0;a<b.length;a++)b[a].hideBalloonReal()}})})();(function(){var f=window.AmCharts;f.AmSerialChart=f.Class({inherits:f.AmRectangularChart,construct:function(a){this.type="serial";f.AmSerialChart.base.construct.call(this,a);this.cname="AmSerialChart";this.theme=a;this.columnSpacing=5;this.columnSpacing3D=0;this.columnWidth=.8;var b=new f.CategoryAxis(a);b.chart=this;this.categoryAxis=b;this.zoomOutOnDataUpdate=!0;this.mouseWheelZoomEnabled=this.mouseWheelScrollEnabled=this.rotate=this.skipZoom=!1;this.minSelectedTime=0;f.applyTheme(this,a,this.cname)},initChart:function(){f.AmSerialChart.base.initChart.call(this);this.updateCategoryAxis(this.categoryAxis,this.rotate,"categoryAxis");if(this.dataChanged)this.parseData();else this.onDataUpdated();this.drawGraphs=!0},onDataUpdated:function(){var a=this.countColumns(),b=this.chartData,c=this.graphs,d;for(d=0;d<c.length;d++){var g=c[d];g.data=b;g.columnCount=a}0<b.length&&(this.firstTime=this.getStartTime(b[0].time),this.lastTime=this.getEndTime(b[b.length-1].time));this.drawChart();this.autoMargins&&!this.marginsUpdated?(this.marginsUpdated=!0,this.measureMargins()):this.dispDUpd()},syncGrid:function(){if(this.synchronizeGrid){var a=this.valueAxes,b,c;if(0<a.length){var d=0;for(c=0;c<a.length;c++)b=a[c],d<b.gridCountReal&&(d=b.gridCountReal);var g=!1;for(c=0;c<a.length;c++)if(b=a[c],b.gridCountReal<d){var h=(d-b.gridCountReal)/2,e=g=h;0!==h-Math.round(h)&&(g-=.5,e+=.5);0<=b.min&&0>b.min-g*b.step&&(e+=g,g=0);0>=b.max&&0<b.max+e*b.step&&(g+=e,e=0);h=f.getDecimals(b.step);b.minimum=f.roundTo(b.min-
g*b.step,h);b.maximum=f.roundTo(b.max+e*b.step,h);b.setStep=b.step;g=b.strictMinMax=!0}g&&this.updateAfterValueZoom();for(c=0;c<a.length;c++)b=a[c],b.minimum=NaN,b.maximum=NaN,b.setStep=NaN,b.strictMinMax=!1}}},handleWheelReal:function(a,b){if(!this.wheelBusy){var c=this.categoryAxis,d=c.parseDates,g=c.minDuration(),h=1,e=1;this.mouseWheelZoomEnabled?b||(h=-1):b&&(h=-1);var f=this.chartCursor;if(f){var k=f.mouseX,f=f.mouseY;h!=e&&(k=this.rotate?f/this.plotAreaHeight:k/this.plotAreaWidth,h*=k,e*=1-
k);k=.05*(this.end-this.start);d&&(k=.05*(this.endTime-this.startTime)/g);1>k&&(k=1);h*=k;e*=k;if(!d||c.equalSpacing)h=Math.round(h),e=Math.round(e)}f=this.chartData.length;c=this.lastTime;k=this.firstTime;0>a?d?(f=this.endTime-this.startTime,d=this.startTime+h*g,g=this.endTime+e*g,0<e&&0<h&&g>=c&&(g=c,d=c-f),this.zoomToDates(new Date(d),new Date(g))):(0<e&&0<h&&this.end>=f-1&&(h=e=0),d=this.start+h,g=this.end+e,this.zoomToIndexes(d,g)):d?(f=this.endTime-this.startTime,d=this.startTime-h*g,g=this.endTime-
e*g,0<e&&0<h&&d<=k&&(d=k,g=k+f),this.zoomToDates(new Date(d),new Date(g))):(0<e&&0<h&&1>this.start&&(h=e=0),d=this.start-h,g=this.end-e,this.zoomToIndexes(d,g))}},validateData:function(a){this.marginsUpdated=!1;this.zoomOutOnDataUpdate&&!a&&(this.endTime=this.end=this.startTime=this.start=NaN);f.AmSerialChart.base.validateData.call(this)},drawChart:function(){if(0<this.realWidth&&0<this.realHeight){f.AmSerialChart.base.drawChart.call(this);var a=this.chartData;if(f.ifArray(a)){var b=this.chartScrollbar;!b||!this.marginsUpdated&&this.autoMargins||b.draw();(b=this.valueScrollbar)&&b.draw();var b=a.length-1,c,d;c=this.categoryAxis;if(c.parseDates&&!c.equalSpacing){if(c=this.startTime,d=this.endTime,isNaN(c)||isNaN(d))c=this.firstTime,d=this.lastTime}else{c=this.start;d=this.end;if(isNaN(c)||isNaN(d))d=c=NaN;isNaN(c)&&(isNaN(this.startTime)||(c=this.getClosestIndex(a,"time",this.startTime,!0,0,a.length)));isNaN(d)&&(isNaN(this.endTime)||(d=this.getClosestIndex(a,"time",this.endTime,!1,0,a.length)));if(isNaN(c)||isNaN(d))c=0,d=b}this.endTime=this.startTime=this.end=this.start=void 0;this.zoom(c,d)}}else this.cleanChart()},cleanChart:function(){f.callMethod("destroy",[this.valueAxes,this.graphs,this.categoryAxis,this.chartScrollbar,this.chartCursor,this.valueScrollbar])},updateCategoryAxis:function(a,b,c){a.chart=this;a.id=c;a.rotate=b;a.setOrientation(!this.rotate);a.init();this.setAxisRenderers(a);this.updateObjectSize(a)},updateValueAxes:function(){f.AmSerialChart.base.updateValueAxes.call(this);var a=this.valueAxes,b;for(b=0;b<a.length;b++){var c=a[b],d=this.rotate;c.rotate=d;c.setOrientation(d);d=this.categoryAxis;if(!d.startOnAxis||d.parseDates)c.expandMinMax=!0}},getStartTime:function(a){var b=this.categoryAxis;return f.resetDateToMin(new Date(a),b.minPeriod,1,b.firstDayOfWeek).getTime()},getEndTime:function(a){var b=f.extractPeriod(this.categoryAxis.minPeriod);return f.changeDate(new Date(a),b.period,b.count,!0).getTime()-1},updateMargins:function(){f.AmSerialChart.base.updateMargins.call(this);var a=this.chartScrollbar;a&&(this.getScrollbarPosition(a,this.rotate,this.categoryAxis.position),this.adjustMargins(a,this.rotate));if(a=this.valueScrollbar)this.getScrollbarPosition(a,!this.rotate,this.valueAxes[0].position),this.adjustMargins(a,!this.rotate)},updateScrollbars:function(){f.AmSerialChart.base.updateScrollbars.call(this);this.updateChartScrollbar(this.chartScrollbar,this.rotate);this.updateChartScrollbar(this.valueScrollbar,!this.rotate)},zoom:function(a,b){var c=this.categoryAxis;c.parseDates&&!c.equalSpacing?(this.timeZoom(a,b),isNaN(a)&&this.zoomOutValueAxes()):this.indexZoom(a,b);(c=this.chartCursor)&&(c.pan||c.hideCursorReal());this.updateLegendValues()},timeZoom:function(a,b){var c=this.maxSelectedTime;isNaN(c)||(b!=this.endTime&&b-a>c&&(a=b-c),a!=this.startTime&&b-a>c&&(b=a+c));var d=this.minSelectedTime;if(0<d&&b-a<d){var g=Math.round(a+(b-a)/2),d=Math.round(d/2);a=g-d;b=g+d}d=this.chartData;g=this.categoryAxis;if(f.ifArray(d)&&(a!=this.startTime||b!=this.endTime)){var h=
g.minDuration(),e=this.firstTime,l=this.lastTime;a||(a=e,isNaN(c)||(a=l-c));b||(b=l);a>l&&(a=l);b<e&&(b=e);a<e&&(a=e);b>l&&(b=l);b<a&&(b=a+h);b-a<h/5&&(b<l?b=a+h/5:a=b-h/5);this.startTime=a;this.endTime=b;c=d.length-1;h=this.getClosestIndex(d,"time",a,!0,0,c);d=this.getClosestIndex(d,"time",b,!1,h,c);g.timeZoom(a,b);g.zoom(h,d);this.start=f.fitToBounds(h,0,c);this.end=f.fitToBounds(d,0,c);this.zoomAxesAndGraphs();this.zoomScrollbar();this.fixCursor();this.showZB();this.syncGrid();this.updateColumnsDepth();this.dispatchTimeZoomEvent()}},showZB:function(){var a,b=this.categoryAxis;b&&b.parseDates&&!b.equalSpacing&&(this.startTime>this.firstTime&&(a=!0),this.endTime<this.lastTime&&(a=!0));0<this.start&&(a=!0);this.end<this.chartData.length-1&&(a=!0);if(b=this.valueAxes)b=b[0],isNaN(b.relativeStart)||(0!==f.roundTo(b.relativeStart,3)&&(a=!0),1!=f.roundTo(b.relativeEnd,3)&&(a=!0));f.AmSerialChart.base.showZB.call(this,a)},updateAfterValueZoom:function(){f.AmSerialChart.base.updateAfterValueZoom.call(this);this.updateColumnsDepth()},indexZoom:function(a,b){var c=this.maxSelectedSeries,d=!1;isNaN(c)||(b!=this.end&&b-a>c&&(a=b-c,d=!0),a!=this.start&&b-a>c&&(b=a+c,d=!0));if(d&&(d=this.chartScrollbar)&&d.dragger){var g=d.dragger.getBBox();d.maxWidth=g.width;d.maxHeight=g.height}if(a!=this.start||b!=this.end)d=this.chartData.length-1,isNaN(a)&&(a=0,isNaN(c)||(a=d-c)),isNaN(b)&&(b=d),b<a&&(b=a),b>d&&(b=d),a>d&&(a=d-1),0>a&&(a=0),this.start=a,this.end=b,this.categoryAxis.zoom(a,b),this.zoomAxesAndGraphs(),this.zoomScrollbar(),this.fixCursor(),0!==a||b!=this.chartData.length-1?this.showZB(!0):this.showZB(!1),this.syncGrid(),this.updateColumnsDepth(),this.dispatchIndexZoomEvent()},updateGraphs:function(){f.AmSerialChart.base.updateGraphs.call(this);var a=this.graphs,b;for(b=0;b<a.length;b++){var c=a[b];c.columnWidthReal=this.columnWidth;c.categoryAxis=this.categoryAxis;f.isString(c.fillToGraph)&&(c.fillToGraph=this.graphsById[c.fillToGraph])}},zoomAxesAndGraphs:function(){f.AmSerialChart.base.zoomAxesAndGraphs.call(this);this.updateColumnsDepth()},updateColumnsDepth:function(){if(0!==this.depth3D||0!==this.angle){var a,b=this.graphs,c;this.columnsArray=[];for(a=0;a<b.length;a++){c=b[a];var d=c.columnsArray;if(d){var g;for(g=0;g<d.length;g++)this.columnsArray.push(d[g])}}this.columnsArray.sort(this.compareDepth);b=this.columnsSet;if(0<this.columnsArray.length){d=this.container.set();this.columnSet.push(d);for(a=0;a<this.columnsArray.length;a++)d.push(this.columnsArray[a].column.set);c&&d.translate(c.x,c.y);this.columnsSet=d}f.remove(b)}},compareDepth:function(a,b){return a.depth>b.depth?1:-1},zoomScrollbar:function(){var a=this.chartScrollbar,b=this.categoryAxis;if(a){if(!this.zoomedByScrollbar){var c=a.dragger;c&&c.stop()}this.zoomedByScrollbar=!1;b.parseDates&&!b.equalSpacing?a.timeZoom(this.startTime,this.endTime):a.zoom(this.start,this.end)}this.zoomValueScrollbar(this.valueScrollbar)},updateTrendLines:function(){var a=this.trendLines,b;for(b=0;b<a.length;b++){var c=a[b],c=f.processObject(c,f.TrendLine,this.theme);a[b]=c;c.chart=this;c.id||(c.id="trendLineAuto"+b+"_"+(new Date).getTime());f.isString(c.valueAxis)&&(c.valueAxis=this.getValueAxisById(c.valueAxis));c.valueAxis||(c.valueAxis=this.valueAxes[0]);c.categoryAxis=this.categoryAxis}},countColumns:function(){var a=0,b=this.valueAxes.length,c=this.graphs.length,d,g,f=!1,e,l;for(l=0;l<b;l++){g=this.valueAxes[l];var k=g.stackType,m=0;if("100%"==k||"regular"==k)for(f=!1,e=0;e<c;e++)d=this.graphs[e],d.tcc=1,d.valueAxis==g&&"column"==d.type&&(!f&&d.stackable&&(a++,f=!0),(!d.stackable&&d.clustered||d.newStack&&0!==m)&&a++,d.columnIndex=a-1,d.clustered||(d.columnIndex=0),m++);if("none"==k||"3d"==k){f=!1;for(e=0;e<c;e++)d=this.graphs[e],d.valueAxis==g&&"column"==d.type&&(d.clustered?(d.tcc=1,d.newStack&&(a=0),d.hidden||(d.columnIndex=a,a++)):d.hidden||(f=!0,d.tcc=1,d.columnIndex=0));f&&0===a&&(a=1)}if("3d"==k){g=1;for(l=0;l<c;l++)d=this.graphs[l],d.newStack&&g++,d.depthCount=g,d.tcc=a;a=g}}return a},parseData:function(){f.AmSerialChart.base.parseData.call(this);this.parseSerialData(this.dataProvider)},getCategoryIndexByValue:function(a){var b=this.chartData,c;for(c=0;c<b.length;c++)if(b[c].category==a)return c},handleScrollbarZoom:function(a){this.zoomedByScrollbar=!0;this.zoom(a.start,a.end)},dispatchTimeZoomEvent:function(){if(this.drawGraphs&&(this.prevStartTime!=this.startTime||this.prevEndTime!=this.endTime)){var a={type:"zoomed"};a.startDate=new Date(this.startTime);a.endDate=new Date(this.endTime);a.startIndex=this.start;a.endIndex=this.end;this.startIndex=this.start;this.endIndex=this.end;this.startDate=a.startDate;this.endDate=a.endDate;this.prevStartTime=this.startTime;this.prevEndTime=this.endTime;var b=this.categoryAxis,c=f.extractPeriod(b.minPeriod).period,b=b.dateFormatsObject[c];a.startValue=f.formatDate(a.startDate,b,this);a.endValue=f.formatDate(a.endDate,b,this);a.chart=this;a.target=this;this.fire(a)}},dispatchIndexZoomEvent:function(){if(this.drawGraphs&&(this.prevStartIndex!=this.start||this.prevEndIndex!=this.end)){this.startIndex=this.start;this.endIndex=this.end;var a=this.chartData;if(f.ifArray(a)&&!isNaN(this.start)&&!isNaN(this.end)){var b={chart:this,target:this,type:"zoomed"};b.startIndex=this.start;b.endIndex=this.end;b.startValue=a[this.start].category;b.endValue=a[this.end].category;this.categoryAxis.parseDates&&(this.startTime=a[this.start].time,this.endTime=a[this.end].time,b.startDate=new Date(this.startTime),b.endDate=new Date(this.endTime));this.prevStartIndex=this.start;this.prevEndIndex=this.end;this.fire(b)}}},updateLegendValues:function(){this.legend&&this.legend.updateValues()},getClosestIndex:function(a,b,c,d,g,f){0>g&&(g=0);f>a.length-1&&(f=a.length-1);var e=g+Math.round((f-g)/2),l=a[e][b];return c==l?e:1>=f-g?d?g:Math.abs(a[g][b]-c)<Math.abs(a[f][b]-c)?g:f:c==l?e:c<l?this.getClosestIndex(a,b,c,d,g,e):this.getClosestIndex(a,b,c,d,e,f)},zoomToIndexes:function(a,b){var c=this.chartData;if(c){var d=c.length;0<d&&(0>a&&(a=0),b>d-1&&(b=d-1),d=this.categoryAxis,d.parseDates&&!d.equalSpacing?this.zoom(c[a].time,this.getEndTime(c[b].time)):this.zoom(a,
b))}},zoomToDates:function(a,b){var c=this.chartData;if(c)if(this.categoryAxis.equalSpacing){var d=this.getClosestIndex(c,"time",a.getTime(),!0,0,c.length);b=f.resetDateToMin(b,this.categoryAxis.minPeriod,1);c=this.getClosestIndex(c,"time",b.getTime(),!1,0,c.length);this.zoom(d,c)}else this.zoom(a.getTime(),b.getTime())},zoomToCategoryValues:function(a,b){this.chartData&&this.zoom(this.getCategoryIndexByValue(a),this.getCategoryIndexByValue(b))},formatPeriodString:function(a,b){if(b){b.periodDataItem={};b.periodPercentDataItem={};var c=["value","open","low","high","close"],d="value open low high close average sum count".split(" "),g=b.valueAxis,h=this.chartData,e=b.numberFormatter;e||(e=this.nf);for(var l=0;l<c.length;l++){for(var k=c[l],m=0,p=0,n=0,u=0,v,x,E,t,r,B,q,w,y,C,F=this.start;F<=this.end;F++){var D=h[F];if(D){var A=D.axes[g.id].graphs[b.id];if(A){if(A.values){var z=A.values[k],D=D.x.categoryAxis;if(this.rotate){if(0>D||D>A.graph.height)z=NaN}else if(0>D||D>A.graph.width)z=NaN;if(!isNaN(z)){isNaN(v)&&(v=z);x=z;if(isNaN(E)||E>z)E=z;if(isNaN(t)||t<z)t=z;r=f.getDecimals(m);D=f.getDecimals(z);m+=z;m=f.roundTo(m,Math.max(r,D));p++;r=m/p}}if(A.percents&&(A=A.percents[k],!isNaN(A))){isNaN(B)&&(B=A);q=A;if(isNaN(w)||w>A)w=A;if(isNaN(y)||y<A)y=A;C=f.getDecimals(n);z=f.getDecimals(A);n+=A;n=f.roundTo(n,Math.max(C,z));u++;C=n/u}}}}m={open:v,close:x,high:t,low:E,average:r,sum:m,count:p};n={open:B,close:q,high:y,low:w,average:C,sum:n,count:u};a=f.formatValue(a,m,d,e,k+"\\.",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=f.formatValue(a,n,d,this.pf,"percents\\."+k+"\\.");b.periodDataItem[k]=m;b.periodPercentDataItem[k]=n}}return a=f.cleanFromEmpty(a)},formatString:function(a,b,c){if(b){var d=b.graph;if(void 0!==a){if(-1!=a.indexOf("[[category]]")){var g=b.serialDataItem.category;if(this.categoryAxis.parseDates){var h=this.balloonDateFormat,e=this.chartCursor;e&&e.categoryBalloonDateFormat&&(h=e.categoryBalloonDateFormat);h=f.formatDate(g,h,this);-1!=h.indexOf("fff")&&(h=f.formatMilliseconds(h,g));g=h}a=a.replace(/\[\[category\]\]/g,String(g.replace("$","$$$")))}g=d.numberFormatter;g||(g=this.nf);h=b.graph.valueAxis;(e=h.duration)&&!isNaN(b.values.value)&&(e=f.formatDuration(b.values.value,e,"",h.durationUnits,h.maxInterval,g),a=a.replace(RegExp("\\[\\[value\\]\\]","g"),e));"date"==h.type&&(h=f.formatDate(new Date(b.values.value),d.dateFormat,this),e=RegExp("\\[\\[value\\]\\]","g"),a=a.replace(e,h),h=f.formatDate(new Date(b.values.open),d.dateFormat,this),e=RegExp("\\[\\[open\\]\\]","g"),a=a.replace(e,h));d="value open low high close total".split(" ");h=this.pf;a=f.formatValue(a,b.percents,d,h,"percents\\.");a=f.formatValue(a,b.values,d,g,"",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=f.formatValue(a,b.values,["percents"],h);-1!=a.indexOf("[[")&&(a=f.formatDataContextValue(a,b.dataContext));-1!=a.indexOf("[[")&&b.graph.customData&&(a=f.formatDataContextValue(a,b.graph.customData));a=f.AmSerialChart.base.formatString.call(this,a,b,c)}return a}},updateChartCursor:function(){f.AmSerialChart.base.updateChartCursor.call(this);var a=this.chartCursor,b=this.categoryAxis;if(a){var c=a.categoryBalloonAlpha,d=a.categoryBalloonColor,g=a.color;void 0===d&&(d=a.cursorColor);var h=a.valueZoomable,e=a.zoomable,l=a.valueLineEnabled;this.rotate?(a.vLineEnabled=l,a.hZoomEnabled=h,a.vZoomEnabled=e):(a.hLineEnabled=l,a.vZoomEnabled=h,a.hZoomEnabled=e);if(a.valueLineBalloonEnabled)for(l=0;l<this.valueAxes.length;l++)h=this.valueAxes[l],(e=h.balloon)||(e={}),e=f.extend(e,this.balloon,!0),e.fillColor=d,e.balloonColor=d,e.fillAlpha=c,e.borderColor=d,e.color=g,h.balloon=e;else for(e=0;e<this.valueAxes.length;e++)h=this.valueAxes[e],h.balloon&&(h.balloon=null);b&&(b.balloonTextFunction=a.categoryBalloonFunction,a.categoryLineAxis=b,b.balloonText=a.categoryBalloonText,a.categoryBalloonEnabled&&((e=b.balloon)||(e={}),e=f.extend(e,this.balloon,!0),e.fillColor=d,e.balloonColor=d,e.fillAlpha=c,e.borderColor=d,e.color=g,b.balloon=e),b.balloon&&(b.balloon.enabled=a.categoryBalloonEnabled))}},addChartScrollbar:function(a){f.callMethod("destroy",[this.chartScrollbar]);a&&(a.chart=this,this.listenTo(a,"zoomed",this.handleScrollbarZoom));this.rotate?void 0===a.width&&(a.width=a.scrollbarHeight):void 0===a.height&&(a.height=a.scrollbarHeight);a.gridAxis=this.categoryAxis;this.chartScrollbar=a},addValueScrollbar:function(a){f.callMethod("destroy",[this.valueScrollbar]);a&&(a.chart=this,this.listenTo(a,"zoomed",this.handleScrollbarValueZoom),this.listenTo(a,"zoomStarted",this.handleCursorZoomStarted));var b=a.scrollbarHeight;this.rotate?void 0===a.height&&(a.height=b):void 0===a.width&&(a.width=b);a.gridAxis||(a.gridAxis=this.valueAxes[0]);a.valueAxes=this.valueAxes;this.valueScrollbar=a},removeChartScrollbar:function(){f.callMethod("destroy",[this.chartScrollbar]);this.chartScrollbar=null},removeValueScrollbar:function(){f.callMethod("destroy",[this.valueScrollbar]);this.valueScrollbar=null},handleReleaseOutside:function(a){f.AmSerialChart.base.handleReleaseOutside.call(this,a);f.callMethod("handleReleaseOutside",[this.chartScrollbar,this.valueScrollbar])},update:function(){f.AmSerialChart.base.update.call(this);this.chartScrollbar&&this.chartScrollbar.update&&this.chartScrollbar.update();this.valueScrollbar&&this.valueScrollbar.update&&this.valueScrollbar.update()},processScrollbars:function(){f.AmSerialChart.base.processScrollbars.call(this);var a=this.valueScrollbar;a&&(a=f.processObject(a,f.ChartScrollbar,this.theme),a.id="valueScrollbar",this.addValueScrollbar(a))},handleValueAxisZoom:function(a){this.handleValueAxisZoomReal(a,this.valueAxes)},zoomOut:function(){f.AmSerialChart.base.zoomOut.call(this);this.zoom();this.syncGrid()},getNextItem:function(a){var b=a.index,c=this.chartData,d=a.graph;if(b+1<c.length)for(b+=1;b<c.length;b++)if(a=c[b])if(a=a.axes[d.valueAxis.id].graphs[d.id],!isNaN(a.y))return a},handleCursorZoomReal:function(a,b,c,d,g){var f=g.target,e,l;this.rotate?(isNaN(a)||isNaN(b)||this.relativeZoomValueAxes(this.valueAxes,a,b)&&this.updateAfterValueZoom(),f.vZoomEnabled&&(e=g.start,l=g.end)):(isNaN(c)||isNaN(d)||this.relativeZoomValueAxes(this.valueAxes,c,d)&&this.updateAfterValueZoom(),f.hZoomEnabled&&(e=g.start,l=g.end));isNaN(e)||isNaN(l)||(a=this.categoryAxis,a.parseDates&&!a.equalSpacing?this.zoomToDates(new Date(e),new Date(l)):this.zoomToIndexes(e,l))},handleCursorZoomStarted:function(){var a=this.valueAxes;if(a){var a=a[0],b=a.relativeStart,c=a.relativeEnd;a.reversed&&(b=1-a.relativeEnd,c=1-a.relativeStart);this.rotate?(this.startX0=b,this.endX0=c):(this.startY0=b,this.endY0=c)}this.categoryAxis&&(this.start0=this.start,this.end0=this.end,this.startTime0=this.startTime,this.endTime0=this.endTime)},fixCursor:function(){this.chartCursor&&this.chartCursor.fixPosition();this.prevCursorItem=null},handleCursorMove:function(a){f.AmSerialChart.base.handleCursorMove.call(this,a);var b=a.target,c=this.categoryAxis;if(a.panning)this.handleCursorHide(a);else if(this.chartData&&!b.isHidden){var d=this.graphs;if(d){var g;g=c.xToIndex(this.rotate?a.y:a.x);if(g=this.chartData[g]){var h,e,l,k;if(b.oneBalloonOnly&&b.valueBalloonsEnabled){var m=Infinity;for(h=d.length-1;0<=h;h--)if(e=d[h],e.balloon.enabled&&e.showBalloon&&!e.hidden){l=e.valueAxis.id;l=g.axes[l].graphs[e.id];if(b.showNextAvailable&&isNaN(l.y)&&(l=this.getNextItem(l),!l))continue;l=l.y;"top"==e.showBalloonAt&&(l=0);"bottom"==e.showBalloonAt&&(l=this.height);var p=b.mouseX,n=b.mouseY;l=this.rotate?Math.abs(p-l):Math.abs(n-l);l<m&&(m=l,k=e)}b.mostCloseGraph=k}if(this.prevCursorItem!=g||k!=this.prevMostCloseGraph){m=[];for(h=0;h<d.length;h++){e=d[h];l=e.valueAxis.id;l=g.axes[l].graphs[e.id];if(b.showNextAvailable&&isNaN(l.y)&&(l=this.getNextItem(l),!l&&e.balloon)){e.balloon.hide();continue}k&&e!=k?(e.showGraphBalloon(l,b.pointer,!1,b.graphBulletSize,b.graphBulletAlpha),e.balloon.hide(0)):b.valueBalloonsEnabled?(e.balloon.showBullet=b.bulletsEnabled,e.balloon.bulletSize=b.bulletSize/2,a.hideBalloons||(e.showGraphBalloon(l,b.pointer,!1,b.graphBulletSize,b.graphBulletAlpha),e.balloon.set&&m.push({balloon:e.balloon,y:e.balloon.pointToY}))):(e.currentDataItem=l,e.resizeBullet(l,b.graphBulletSize,b.graphBulletAlpha))}b.avoidBalloonOverlapping&&this.arrangeBalloons(m);this.prevCursorItem=g}this.prevMostCloseGraph=k}}c.showBalloon(a.x,a.y,b.categoryBalloonDateFormat,a.skip);this.updateLegendValues()}},handleCursorHide:function(a){f.AmSerialChart.base.handleCursorHide.call(this,a);a=this.categoryAxis;this.prevCursorItem=null;this.updateLegendValues();a&&a.hideBalloon();a=this.graphs;var b;for(b=0;b<a.length;b++)a[b].currentDataItem=null},handleCursorPanning:function(a){var b=a.target,c,d=a.deltaX,g=a.deltaY,h=a.delta2X,e=a.delta2Y;a=!1;if(this.rotate){isNaN(h)&&(h=d,a=!0);var l=this.endX0;c=this.startX0;var k=l-c,l=l-k*h,m=k;a||(m=0);a=f.fitToBounds(c-k*d,0,1-m)}else isNaN(e)&&(e=g,a=!0),l=this.endY0,c=this.startY0,k=l-c,l+=k*g,m=k,a||(m=0),a=f.fitToBounds(c+k*e,0,1-m);c=f.fitToBounds(l,m,1);var p;b.valueZoomable&&(p=this.relativeZoomValueAxes(this.valueAxes,a,c));var n;c=this.categoryAxis;this.rotate&&(d=g,h=e);a=!1;isNaN(h)&&(h=d,a=!0);if(b.zoomable&&(0<Math.abs(d)||0<Math.abs(h)))if(c.parseDates&&!c.equalSpacing){if(e=this.startTime0,g=this.endTime0,c=g-e,h*=c,k=this.firstTime,l=this.lastTime,m=c,a||(m=0),a=Math.round(f.fitToBounds(e-c*d,k,l-m)),h=Math.round(f.fitToBounds(g-h,k+m,l)),this.startTime!=a||this.endTime!=h)n={chart:this,target:b,type:"zoomed",start:a,end:h},this.skipZoomed=!0,b.fire(n),this.zoom(a,h),n=!0}else if(e=this.start0,g=this.end0,c=g-e,d=Math.round(c*d),h=Math.round(c*h),k=this.chartData.length-1,a||(c=0),a=f.fitToBounds(e-d,0,k-c),c=f.fitToBounds(g-h,c,k),this.start!=a||this.end!=c)this.skipZoomed=!0,b.fire({chart:this,target:b,type:"zoomed",start:a,end:c}),this.zoom(a,c),n=!0;!n&&p&&this.updateAfterValueZoom()},arrangeBalloons:function(a){var b=this.plotAreaHeight;a.sort(this.compareY);var c,d,f,h=this.plotAreaWidth,e=a.length;for(c=0;c<e;c++)d=a[c].balloon,d.setBounds(0,0,h,b),d.restorePrevious(),d.draw(),b=d.yPos-3;a.reverse();for(c=0;c<e;c++){d=a[c].balloon;var b=d.bottom,l=d.bottom-d.yPos;0<c&&b-l<f+3&&d.setBounds&&(d.setBounds(0,f+3,h,f+l+3),d.restorePrevious(),d.draw());d.set&&d.set.show();f=d.bottom}},compareY:function(a,b){return a.y<b.y?1:-1}})})();(function(){var f=window.AmCharts;f.Cuboid=f.Class({construct:function(a,b,c,d,f,h,e,l,k,m,p,n,u,v,x,E,t){this.set=a.set();this.container=a;this.h=Math.round(c);this.w=Math.round(b);this.dx=d;this.dy=f;this.colors=h;this.alpha=e;this.bwidth=l;this.bcolor=k;this.balpha=m;this.dashLength=v;this.topRadius=E;this.pattern=x;this.rotate=u;this.bcn=t;u?0>b&&0===p&&(p=180):0>c&&270==p&&(p=90);this.gradientRotation=p;0===d&&0===f&&(this.cornerRadius=n);this.draw()},draw:function(){var a=this.set;a.clear();var b=this.container,c=b.chart,d=this.w,g=this.h,h=this.dx,e=this.dy,l=this.colors,k=this.alpha,m=this.bwidth,p=this.bcolor,n=this.balpha,u=this.gradientRotation,v=this.cornerRadius,x=this.dashLength,E=this.pattern,t=this.topRadius,r=this.bcn,B=l,q=l;"object"==typeof l&&(B=l[0],q=l[l.length-1]);var w,y,C,F,D,A,z,L,M,Q=k;E&&(k=0);var G,H,I,J,K=this.rotate;if(0<Math.abs(h)||0<Math.abs(e))if(isNaN(t))z=q,q=f.adjustLuminosity(B,-.2),q=f.adjustLuminosity(B,-.2),w=f.polygon(b,[0,h,d+h,d,0],[0,e,e,0,0],q,k,1,p,0,u),0<n&&(M=f.line(b,[0,h,d+h],[0,e,e],p,n,m,x)),y=f.polygon(b,[0,0,d,d,0],[0,g,g,0,0],q,k,1,p,0,u),y.translate(h,e),0<n&&(C=f.line(b,[h,h],[e,e+g],p,n,m,x)),F=f.polygon(b,[0,0,h,h,0],[0,g,g+e,e,0],q,k,1,p,0,u),D=f.polygon(b,[d,d,d+h,d+h,d],[0,g,g+e,e,0],q,k,1,p,0,u),0<n&&(A=f.line(b,[d,d+h,d+h,d],[0,e,g+e,g],p,n,m,x)),q=f.adjustLuminosity(z,.2),z=f.polygon(b,[0,h,d+h,d,0],[g,g+e,g+e,g,g],q,k,1,p,0,u),0<n&&(L=f.line(b,[0,h,d+h],[g,g+e,g+e],p,n,m,x));else{var N,O,P;K?(N=g/2,q=h/2,P=g/2,O=d+h/2,H=Math.abs(g/2),G=Math.abs(h/2)):(q=d/2,N=e/2,O=d/2,P=g+e/2+1,G=Math.abs(d/2),H=Math.abs(e/2));I=G*t;J=H*t;.1<G&&.1<G&&(w=f.circle(b,G,B,k,m,p,n,!1,H),w.translate(q,N));.1<I&&.1<I&&(z=f.circle(b,I,f.adjustLuminosity(B,.5),k,m,p,n,!1,J),z.translate(O,P))}k=Q;1>Math.abs(g)&&(g=0);1>Math.abs(d)&&(d=0);!isNaN(t)&&(0<Math.abs(h)||0<Math.abs(e))?(l=[B],l={fill:l,stroke:p,"stroke-width":m,"stroke-opacity":n,"fill-opacity":k},K?(k="M0,0 L"+d+","+(g/2-g/2*t),m=" B",0<d&&(m=" A"),f.VML?(k+=m+Math.round(d-
I)+","+Math.round(g/2-J)+","+Math.round(d+I)+","+Math.round(g/2+J)+","+d+",0,"+d+","+g,k=k+(" L0,"+g)+(m+Math.round(-G)+","+Math.round(g/2-H)+","+Math.round(G)+","+Math.round(g/2+H)+",0,"+g+",0,0")):(k+="A"+I+","+J+",0,0,0,"+d+","+(g-g/2*(1-t))+"L0,"+g,k+="A"+G+","+H+",0,0,1,0,0"),G=90):(m=d/2-d/2*t,k="M0,0 L"+m+","+g,f.VML?(k="M0,0 L"+m+","+g,m=" B",0>g&&(m=" A"),k+=m+Math.round(d/2-I)+","+Math.round(g-J)+","+Math.round(d/2+I)+","+Math.round(g+J)+",0,"+g+","+d+","+g,k+=" L"+d+",0",k+=m+Math.round(d/
2+G)+","+Math.round(H)+","+Math.round(d/2-G)+","+Math.round(-H)+","+d+",0,0,0"):(k+="A"+I+","+J+",0,0,0,"+(d-d/2*(1-t))+","+g+"L"+d+",0",k+="A"+G+","+H+",0,0,1,0,0"),G=180),b=b.path(k).attr(l),b.gradient("linearGradient",[B,f.adjustLuminosity(B,-.3),f.adjustLuminosity(B,-.3),B],G),K?b.translate(h/2,0):b.translate(0,e/2)):b=0===g?f.line(b,[0,d],[0,0],p,n,m,x):0===d?f.line(b,[0,0],[0,g],p,n,m,x):0<v?f.rect(b,d,g,l,k,m,p,n,v,u,x):f.polygon(b,[0,0,d,d,0],[0,g,g,0,0],l,k,m,p,n,u,!1,x);d=isNaN(t)?0>g?[w,M,y,C,F,D,A,z,L,b]:[z,L,y,C,F,D,w,M,A,b]:K?0<d?[w,b,z]:[z,b,w]:0>g?[w,b,z]:[z,b,w];f.setCN(c,b,r+"front");f.setCN(c,y,r+"back");f.setCN(c,z,r+"top");f.setCN(c,w,r+"bottom");f.setCN(c,F,r+"left");f.setCN(c,D,r+"right");for(w=0;w<d.length;w++)if(y=d[w])a.push(y),f.setCN(c,y,r+"element");E&&b.pattern(E,NaN,c.path)},width:function(a){isNaN(a)&&(a=0);this.w=Math.round(a);this.draw()},height:function(a){isNaN(a)&&(a=0);this.h=Math.round(a);this.draw()},animateHeight:function(a,b){var c=this;c.animationFinished=!1;c.easing=b;c.totalFrames=a*f.updateRate;c.rh=c.h;c.frame=0;c.height(1);setTimeout(function(){c.updateHeight.call(c)},1E3/f.updateRate)},updateHeight:function(){var a=this;a.frame++;var b=a.totalFrames;a.frame<=b?(b=a.easing(0,a.frame,1,a.rh-1,b),a.height(b),window.requestAnimationFrame?window.requestAnimationFrame(function(){a.updateHeight.call(a)}):setTimeout(function(){a.updateHeight.call(a)},1E3/f.updateRate)):(a.height(a.rh),a.animationFinished=!0)},animateWidth:function(a,b){var c=this;c.animationFinished=!1;c.easing=b;c.totalFrames=a*f.updateRate;c.rw=c.w;c.frame=0;c.width(1);setTimeout(function(){c.updateWidth.call(c)},1E3/f.updateRate)},updateWidth:function(){var a=this;a.frame++;var b=a.totalFrames;a.frame<=b?(b=a.easing(0,a.frame,1,a.rw-1,b),a.width(b),window.requestAnimationFrame?window.requestAnimationFrame(function(){a.updateWidth.call(a)}):setTimeout(function(){a.updateWidth.call(a)},1E3/f.updateRate)):(a.width(a.rw),a.animationFinished=!0)}})})();(function(){var f=window.AmCharts;f.CategoryAxis=f.Class({inherits:f.AxisBase,construct:function(a){this.cname="CategoryAxis";f.CategoryAxis.base.construct.call(this,a);this.minPeriod="DD";this.equalSpacing=this.parseDates=!1;this.position="bottom";this.startOnAxis=!1;this.gridPosition="middle";this.safeDistance=30;this.stickBalloonToCategory=!1;f.applyTheme(this,a,this.cname)},draw:function(){f.CategoryAxis.base.draw.call(this);this.generateDFObject();var a=this.chart.chartData;this.data=a;this.labelRotationR=this.labelRotation;this.type=null;if(f.ifArray(a)){var b,c=this.chart;"scrollbar"!=this.id?(f.setCN(c,this.set,"category-axis"),f.setCN(c,this.labelsSet,"category-axis"),f.setCN(c,this.axisLine.axisSet,"category-axis")):this.bcn=this.id+"-";var d=this.start,g=this.labelFrequency,h=0,e=this.end-d+1,l=this.gridCountR,k=this.showFirstLabel,m=this.showLastLabel,p,n="",n=f.extractPeriod(this.minPeriod),u=f.getPeriodDuration(n.period,n.count),v,x,E,t,r,B=this.rotate,q=this.firstDayOfWeek,w=this.boldPeriodBeginning;b=f.resetDateToMin(new Date(a[a.length-1].time+1.05*u),this.minPeriod,1,q).getTime();this.firstTime=c.firstTime;this.endTime>b&&(this.endTime=b);r=this.minorGridEnabled;x=this.gridAlpha;var y=0,C=0;if(this.widthField)for(b=this.start;b<=this.end;b++)if(t=this.data[b]){var F=Number(this.data[b].dataContext[this.widthField]);isNaN(F)||(y+=F,t.widthValue=F)}if(this.parseDates&&!this.equalSpacing)this.lastTime=a[a.length-1].time,this.maxTime=f.resetDateToMin(new Date(this.lastTime+1.05*u),this.minPeriod,1,q).getTime(),this.timeDifference=this.endTime-this.startTime,this.parseDatesDraw();else if(!this.parseDates){if(this.cellWidth=this.getStepWidth(e),e<l&&(l=e),h+=this.start,this.stepWidth=this.getStepWidth(e),0<l)for(q=Math.floor(e/l),t=this.chooseMinorFrequency(q),e=h,e/2==Math.round(e/2)&&e--,0>e&&(e=0),w=0,this.widthField&&(e=this.start),this.end-e+1>=this.autoRotateCount&&(this.labelRotationR=this.autoRotateAngle),b=e;b<=this.end+2;b++){l=!1;0<=b&&b<this.data.length?(v=this.data[b],n=v.category,l=v.forceShow):n="";if(r&&!isNaN(t))if(b/t==Math.round(b/t)||l)b/q==Math.round(b/q)||l||(this.gridAlpha=this.minorGridAlpha,n=void 0);else continue;else if(b/q!=Math.round(b/q)&&!l)continue;e=this.getCoordinate(b-h);l=0;"start"==this.gridPosition&&(e-=this.cellWidth/2,l=this.cellWidth/2);p=!0;E=l;"start"==this.tickPosition&&(E=0,p=!1,l=0);if(b==d&&!k||b==this.end&&!m)n=void 0;Math.round(w/g)!=w/g&&(n=void 0);w++;a=this.cellWidth;B&&(a=NaN,this.ignoreAxisWidth||!c.autoMargins)&&(a="right"==this.position?c.marginRight:c.marginLeft,a-=this.tickLength+10);this.labelFunction&&v&&(n=this.labelFunction(n,v,this));n=f.fixBrakes(n);u=!1;this.boldLabels&&(u=!0);b>this.end&&"start"==this.tickPosition&&(n=" ");this.rotate&&this.inside&&(l-=2);isNaN(v.widthValue)||(v.percentWidthValue=v.widthValue/y*100,a=this.rotate?this.height*v.widthValue/y:this.width*v.widthValue/y,e=C,C+=a,l=a/2);p=new this.axisItemRenderer(this,e,n,p,a,l,void 0,u,E,!1,v.labelColor,v.className);p.serialDataItem=v;this.pushAxisItem(p);this.gridAlpha=x}}else if(this.parseDates&&this.equalSpacing){h=this.start;this.startTime=this.data[this.start].time;this.endTime=this.data[this.end].time;this.timeDifference=this.endTime-this.startTime;b=this.choosePeriod(0);g=b.period;v=b.count;b=f.getPeriodDuration(g,v);b<u&&(g=n.period,v=n.count,b=u);x=g;"WW"==x&&(x="DD");this.currentDateFormat=this.dateFormatsObject[x];this.stepWidth=this.getStepWidth(e);l=Math.ceil(this.timeDifference/b)+1;n=f.resetDateToMin(new Date(this.startTime-b),g,v,q).getTime();this.cellWidth=this.getStepWidth(e);e=Math.round(n/b);d=-1;e/2==Math.round(e/2)&&(d=-2,n-=b);e=this.start;e/2==Math.round(e/2)&&e--;0>e&&(e=0);C=this.end+2;C>=this.data.length&&(C=this.data.length);a=!1;a=!k;this.previousPos=-1E3;20<this.labelRotationR&&(this.safeDistance=5);F=e;if(this.data[e].time!=f.resetDateToMin(new Date(this.data[e].time),g,v,q).getTime()){var u=0,D=n;for(b=e;b<C;b++)t=this.data[b].time,this.checkPeriodChange(g,v,t,D)&&(u++,2<=u&&(F=b,b=C),D=t)}r&&1<v&&(t=this.chooseMinorFrequency(v),f.getPeriodDuration(g,t));if(0<this.gridCountR)for(b=e;b<C;b++)if(t=this.data[b].time,this.checkPeriodChange(g,v,t,n)&&b>=F){e=this.getCoordinate(b-this.start);r=!1;this.nextPeriod[x]&&(r=this.checkPeriodChange(this.nextPeriod[x],1,t,n,x))&&f.resetDateToMin(new Date(t),this.nextPeriod[x],1,q).getTime()!=t&&(r=!1);u=!1;r&&this.markPeriodChange?(r=this.dateFormatsObject[this.nextPeriod[x]],u=!0):r=this.dateFormatsObject[x];n=f.formatDate(new Date(t),r,c);if(b==d&&!k||b==l&&!m)n=" ";a?a=!1:(w||(u=!1),e-this.previousPos>this.safeDistance*Math.cos(this.labelRotationR*Math.PI/180)&&(this.labelFunction&&(n=this.labelFunction(n,new Date(t),this,g,v,E)),this.boldLabels&&(u=!0),p=new this.axisItemRenderer(this,e,n,void 0,void 0,void 0,void 0,u),r=p.graphics(),this.pushAxisItem(p),r=r.getBBox().width,f.isModern||(r-=e),this.previousPos=e+r));E=n=t}}for(b=k=0;b<this.data.length;b++)if(t=this.data[b])this.parseDates&&!this.equalSpacing?(m=t.time,d=this.cellWidth,"MM"==this.minPeriod&&(d=864E5*f.daysInMonth(new Date(m))*this.stepWidth,t.cellWidth=d),m=Math.round((m-this.startTime)*this.stepWidth+d/2)):m=this.getCoordinate(b-h),t.x[this.id]=m;if(this.widthField)for(b=this.start;b<=this.end;b++)t=this.data[b],d=t.widthValue,t.percentWidthValue=d/y*100,this.rotate?(m=this.height*d/y/2+k,k=this.height*d/y+k):(m=this.width*d/y/2+k,k=this.width*d/y+k),t.x[this.id]=m;y=this.guides.length;for(b=0;b<y;b++)if(k=this.guides[b],q=q=q=r=d=NaN,m=k.above,k.toCategory&&(q=c.getCategoryIndexByValue(k.toCategory),isNaN(q)||(d=this.getCoordinate(q-h),k.expand&&(d+=this.cellWidth/2),p=new this.axisItemRenderer(this,d,"",!0,NaN,NaN,k),this.pushAxisItem(p,m))),k.category&&(q=c.getCategoryIndexByValue(k.category),isNaN(q)||(r=this.getCoordinate(q-h),k.expand&&(r-=this.cellWidth/2),q=(d-r)/2,p=new this.axisItemRenderer(this,r,k.label,!0,NaN,q,k),this.pushAxisItem(p,m))),w=c.dataDateFormat,k.toDate&&(!w||k.toDate instanceof Date||(k.toDate=k.toDate.toString()+" |"),k.toDate=f.getDate(k.toDate,w),this.equalSpacing?(q=c.getClosestIndex(this.data,"time",k.toDate.getTime(),
!1,0,this.data.length-1),isNaN(q)||(d=this.getCoordinate(q-h))):d=(k.toDate.getTime()-this.startTime)*this.stepWidth,p=new this.axisItemRenderer(this,d,"",!0,NaN,NaN,k),this.pushAxisItem(p,m)),k.date&&(!w||k.date instanceof Date||(k.date=k.date.toString()+" |"),k.date=f.getDate(k.date,w),this.equalSpacing?(q=c.getClosestIndex(this.data,"time",k.date.getTime(),!1,0,this.data.length-1),isNaN(q)||(r=this.getCoordinate(q-h))):r=(k.date.getTime()-this.startTime)*this.stepWidth,q=(d-r)/2,p=!0,k.toDate&&
(p=!1),p="H"==this.orientation?new this.axisItemRenderer(this,r,k.label,p,2*q,NaN,k):new this.axisItemRenderer(this,r,k.label,!1,NaN,q,k),this.pushAxisItem(p,m)),p&&(q=p.label)&&this.addEventListeners(q,k),0<d||0<r){q=!1;if(this.rotate){if(d<this.height||r<this.height)q=!0}else if(d<this.width||r<this.width)q=!0;q&&(d=new this.guideFillRenderer(this,r,d,k),r=d.graphics(),this.pushAxisItem(d,m),k.graphics=r,r.index=b,this.addEventListeners(r,k))}if(c=c.chartCursor)B?c.fixHeight(this.cellWidth):(c.fixWidth(this.cellWidth),c.fullWidth&&this.balloon&&(this.balloon.minWidth=this.cellWidth));this.previousHeight=A}this.axisCreated=!0;this.set.translate(this.x,this.y);this.labelsSet.translate(this.x,this.y);this.labelsSet.show();this.positionTitle();(B=this.axisLine.set)&&B.toFront();var A=this.getBBox().height;2<A-this.previousHeight&&this.autoWrap&&!this.parseDates&&(this.axisCreated=this.chart.marginsUpdated=!1)},xToIndex:function(a){var b=this.data,c=this.chart,d=c.rotate,g=this.stepWidth,h;if(this.parseDates&&!this.equalSpacing)a=this.startTime+Math.round(a/g)-this.minDuration()/2,h=c.getClosestIndex(b,"time",a,!1,this.start,this.end+1);else if(this.widthField)for(c=Infinity,g=this.start;g<=this.end;g++){var e=this.data[g];e&&(e=Math.abs(e.x[this.id]-a),e<c&&(c=e,h=g))}else this.startOnAxis||(a-=g/2),h=this.start+Math.round(a/g);h=f.fitToBounds(h,0,b.length-1);var l;b[h]&&(l=b[h].x[this.id]);d?l>this.height+1&&h--:l>this.width+1&&h--;0>l&&h++;return h=f.fitToBounds(h,0,b.length-1)},dateToCoordinate:function(a){return this.parseDates&&
!this.equalSpacing?(a.getTime()-this.startTime)*this.stepWidth:this.parseDates&&this.equalSpacing?(a=this.chart.getClosestIndex(this.data,"time",a.getTime(),!1,0,this.data.length-1),this.getCoordinate(a-this.start)):NaN},categoryToCoordinate:function(a){if(this.chart){if(this.parseDates)return this.dateToCoordinate(new Date(a));a=this.chart.getCategoryIndexByValue(a);if(!isNaN(a))return this.getCoordinate(a-this.start)}else return NaN},coordinateToDate:function(a){return this.equalSpacing?(a=this.xToIndex(a),new Date(this.data[a].time)):new Date(this.startTime+a/this.stepWidth)},coordinateToValue:function(a){a=this.xToIndex(a);if(a=this.data[a])return this.parseDates?a.time:a.category},getCoordinate:function(a){a*=this.stepWidth;this.startOnAxis||(a+=this.stepWidth/2);return Math.round(a)},formatValue:function(a,b){b||(b=this.currentDateFormat);this.parseDates&&(a=f.formatDate(new Date(a),b,this.chart));return a},showBalloonAt:function(a,b){void 0===b&&(b=this.parseDates?this.dateToCoordinate(new Date(a)):this.categoryToCoordinate(a));return this.adjustBalloonCoordinate(b)},formatBalloonText:function(a,b,c){var d="",g="",h=this.chart,e=this.data[b];if(e)if(this.parseDates)d=f.formatDate(e.category,c,h),b=f.changeDate(new Date(e.category),this.minPeriod,1),g=f.formatDate(b,c,h),-1!=d.indexOf("fff")&&(d=f.formatMilliseconds(d,e.category),g=f.formatMilliseconds(g,b));else{var l;this.data[b+1]&&(l=this.data[b+1]);d=f.fixNewLines(e.category);l&&(g=f.fixNewLines(l.category))}a=a.replace(/\[\[category\]\]/g,String(d));return a=a.replace(/\[\[toCategory\]\]/g,String(g))},adjustBalloonCoordinate:function(a,b){var c=this.xToIndex(a),d=this.chart.chartCursor;if(this.stickBalloonToCategory){var f=this.data[c];f&&(a=f.x[this.id]+1);this.stickBalloonToStart&&(a-=this.cellWidth/2);var h=0;if(d){var e=d.limitToGraph;if(e){var l=e.valueAxis.id;e.hidden||(h=f.axes[l].graphs[e.id].y)}this.rotate?("left"==this.position?(e&&(h-=d.width),0<h&&(h=0)):0>h&&(h=0),d.fixHLine(a,h)):("top"==this.position?(e&&(h-=d.height),0<h&&(h=0)):0>h&&(h=0),d.fixVLine(a,h))}}d&&!b&&(d.setIndex(c),this.parseDates&&d.setTimestamp(this.coordinateToDate(a).getTime()));return a}})})();
(function(){var e=window.AmCharts;e.AmStockChart=e.Class({construct:function(a){this.type="stock";this.cname="AmStockChart";e.addChart(this);this.version="3.21.1";this.theme=a;this.createEvents("buildStarted","zoomed","rollOverStockEvent","rollOutStockEvent","clickStockEvent","panelRemoved","dataUpdated","init","rendered","drawn","resized");this.colors="#FF6600 #FCD202 #B0DE09 #0D8ECF #2A0CD0 #CD0D74 #CC0000 #00CC00 #0000CC #DDDDDD #999999 #333333 #990000".split(" ");this.firstDayOfWeek=1;this.glueToTheEnd=!1;this.dataSetCounter=-1;this.zoomOutOnDataSetChange=!1;this.panels=[];this.dataSets=[];this.chartCursors=[];this.comparedDataSets=[];this.classNamePrefix="amcharts";this.categoryAxesSettings=new e.CategoryAxesSettings(a);this.valueAxesSettings=new e.ValueAxesSettings(a);this.panelsSettings=new e.PanelsSettings(a);this.chartScrollbarSettings=new e.ChartScrollbarSettings(a);this.chartCursorSettings=new e.ChartCursorSettings(a);this.stockEventsSettings=new e.StockEventsSettings(a);this.legendSettings=new e.LegendSettings(a);this.balloon=new e.AmBalloon(a);this.previousEndDate=new Date(0);this.previousStartDate=new Date(0);this.dataSetCount=this.graphCount=0;this.chartCreated=!1;this.processTimeout=0;this.autoResize=this.extendToFullPeriod=!0;this.langObj={};e.applyTheme(this,a,this.cname)},write:function(a){var b=this;if(b.listeners)for(var c in b.listeners){var d=b.listeners[c];b.addListener(d.event,d.method)}b.fire({type:"buildStarted",chart:b});b.afterWriteTO&&clearTimeout(b.afterWriteTO);0<b.processTimeout?b.afterWriteTO=setTimeout(function(){b.afterWrite.call(b,a)},b.processTimeout):b.afterWrite(a)},afterWrite:function(a){var b=this.theme;window.AmCharts_path&&(this.path=window.AmCharts_path);void 0===this.path&&(this.path=e.getPath());void 0===this.path&&(this.path="amcharts/");this.path=e.normalizeUrl(this.path);void 0===this.pathToImages&&(this.pathToImages=this.path+"images/");this.initHC||(e.callInitHandler(this),this.initHC=!0);e.applyLang(this.language,this);this.chartCursors=[];var c=this.exportConfig;c&&e.AmExport&&!this.AmExport&&(this.AmExport=new e.AmExport(this,c));this.amExport&&e.AmExport&&(this.AmExport=e.extend(this.amExport,new e.AmExport(this),!0));this.AmExport&&this.AmExport.init();this.chartRendered=!1;a="object"!=typeof a?document.getElementById(a):a;this.zoomOutOnDataSetChange&&(this.endDate=this.startDate=void 0);this.categoryAxesSettings=e.processObject(this.categoryAxesSettings,e.CategoryAxesSettings,b);this.valueAxesSettings=e.processObject(this.valueAxesSettings,e.ValueAxesSettings,b);this.chartCursorSettings=e.processObject(this.chartCursorSettings,e.ChartCursorSettings,b);this.chartScrollbarSettings=e.processObject(this.chartScrollbarSettings,e.ChartScrollbarSettings,b);this.legendSettings=e.processObject(this.legendSettings,e.LegendSettings,b);this.panelsSettings=e.processObject(this.panelsSettings,e.PanelsSettings,b);this.stockEventsSettings=e.processObject(this.stockEventsSettings,e.StockEventsSettings,b);this.dataSetSelector&&(this.dataSetSelector=e.processObject(this.dataSetSelector,e.DataSetSelector,b));this.periodSelector&&(this.periodSelector=e.processObject(this.periodSelector,e.PeriodSelector,b));a.innerHTML="";this.div=a;this.measure();this.createLayout();this.updateDataSets();this.addDataSetSelector();this.addPeriodSelector();this.addPanels();this.updatePanels();this.addChartScrollbar();this.updateData();this.skipDefault||this.setDefaultPeriod();this.skipEvents=!1},setDefaultPeriod:function(){var a=this.periodSelector;a&&(this.animationPlayed=!1,a.setDefaultPeriod())},validateSize:function(){this.measurePanels()},updateDataSets:function(){var a=this.mainDataSet,b=this.dataSets,c;for(c=0;c<b.length;c++){var d=b[c],d=e.processObject(d,e.DataSet);b[c]=d;d.id||(this.dataSetCount++,d.id="ds"+this.dataSetCount);void 0===d.color&&(d.color=this.colors.length-1>c?this.colors[c]:e.randomColor())}!a&&e.ifArray(b)&&(this.mainDataSet=this.dataSets[0]);this.getSelections()},getLastDate:function(a){var b=e.getDate(a,this.dataDateFormat,"fff");a=this.categoryAxesSettings.minPeriod;var c=e.extractPeriod(a),b=e.changeDate(b,c.period,1*c.count,!0).getTime();-1==a.indexOf("fff")&&--b;return new Date(b)},getFirstDate:function(a){a=e.getDate(a,this.dataDateFormat,"fff");var b=e.extractPeriod(this.categoryAxesSettings.minPeriod);return new Date(e.resetDateToMin(a,b.period,1*b.count,this.firstDayOfWeek))},updateData:function(){var a=this,b=a.mainDataSet;if(b){a.parsingData=!1;var c=a.categoryAxesSettings;-1==e.getItemIndex(c.minPeriod,c.groupToPeriods)&&c.groupToPeriods.unshift(c.minPeriod);var d=b.dataProvider;if(e.ifArray(d)){var k=b.categoryField;a.firstDate=a.getFirstDate(d[0][k]);a.lastDate=a.getLastDate(d[d.length-1][k]);a.periodSelector&&a.periodSelector.setRanges(a.firstDate,a.lastDate);b.dataParsed||(a.parsingData=!0,0<a.processTimeout?setTimeout(function(){a.parseStockData.call(a,b,c.minPeriod,c.groupToPeriods,a.firstDayOfWeek,a.dataDateFormat)},a.processTimeout):a.parseStockData(b,c.minPeriod,c.groupToPeriods,a.firstDayOfWeek,a.dataDateFormat));this.updateComparingData()}else a.firstDate=void 0,a.lastDate=void 0;a.fixGlue();if(!a.parsingData)a.onDataUpdated()}},fixGlue:function(){if(this.glueToTheEnd&&this.startDate&&this.endDate&&this.lastDate){this.startDate=new Date(this.startDate.getTime()+(this.lastDate.getTime()-this.endDate.getTime())+1);var a=e.extractPeriod(this.categoryAxesSettings.minPeriod);this.startDate=e.resetDateToMin(this.startDate,a.period,a.count,this.firstDayOfWeek);this.endDate=this.lastDate;this.updateScrollbar=!0}},isDataParsed:function(){if(this.mainDataSet){for(var a=!0,b=0;b<this.comparedDataSets.length;b++)this.comparedDataSets[b].dataParsed||(a=!1);if(this.mainDataSet.dataParsed&&a)return!0}return!1},onDataUpdated:function(){this.isDataParsed()&&(this.updatePanelsWithNewData(),this.skipEvents||this.fire({type:"dataUpdated",chart:this}))},updateComparingData:function(){var a=this.comparedDataSets,b=this.categoryAxesSettings,c;for(c=0;c<a.length;c++){var d=a[c];d.dataParsed||(this.parsingData=!0,0<this.processTimeout?this.delayedParseStockData(c,d):this.parseStockData(d,b.minPeriod,b.groupToPeriods,this.firstDayOfWeek,this.dataDateFormat))}},delayedParseStockData:function(a,b){var c=this,d=c.categoryAxesSettings;setTimeout(function(){c.parseStockData.call(c,b,d.minPeriod,d.groupToPeriods,c.firstDayOfWeek,c.dataDateFormat)},c.processTimeout*a)},parseStockData:function(a,b,c,d,k){var f=this,l={},h=a.dataProvider,n=a.categoryField;if(n){var g=e.getItemIndex(b,c),m=c.length,q,t=h.length,p,y={};for(q=g;q<m;q++)p=c[q],l[p]=[];var v={},A=a.fieldMappings,E=A.length;for(q=0;q<t;q++){var B=h[q],D=e.getDate(B[n],k,b),C=D.getTime(),r={},z;for(z=0;z<E;z++)r[A[z].toField]=B[A[z].fromField];for(z=g;z<m;z++){p=c[z];var u=e.extractPeriod(p),F=u.period,G=u.count,w,x;if(z==g||C>=y[p]||!y[p]){v[p]={};v[p].amCategoryIdField=String(e.resetDateToMin(D,F,G,d).getTime());var H;for(H=0;H<E;H++)u=A[H].toField,w=v[p],null!==r[u]&&(x=Number(r[u]),w[u+"Count"]=0,isNaN(x)||(w[u+"Open"]=x,w[u+"Sum"]=x,w[u+"High"]=x,w[u+"AbsHigh"]=x,w[u+"Low"]=x,w[u+"Close"]=x,w[u+"Count"]=1,w[u+"Average"]=x));w.dataContext=B;w.rawData=[];w.rawData.push(B);l[p].push(v[p]);z>g&&(u=e.newDate(D,b),u=e.changeDate(u,F,G,!0),u=e.resetDateToMin(u,F,G,d),y[p]=u.getTime());if(z==g)for(var I in B)B.hasOwnProperty(I)&&(v[p][I]=B[I]);v[p][n]=e.newDate(D,b)}else for(w=v[p],w.rawData&&w.rawData.push(B),p=0;p<E;p++)u=A[p].toField,q==t-1&&(w[n]=e.newDate(D,b)),null!==r[u]&&(x=Number(r[u]),isNaN(x)||(isNaN(w[u+"Low"])&&(w[u+"Low"]=x),x<w[u+"Low"]&&(w[u+"Low"]=x),isNaN(w[u+"High"])&&(w[u+"High"]=x),x>w[u+"High"]&&(w[u+"High"]=x),isNaN(w[u+"AbsHigh"])&&(w[u+"AbsHigh"]=x),Math.abs(x)>w[u+"AbsHigh"]&&(w[u+"AbsHigh"]=x),w[u+"Close"]=x,F=e.getDecimals(w[u+"Sum"]),G=e.getDecimals(x),isNaN(w[u+"Sum"])&&(w[u+"Sum"]=0),w[u+"Sum"]+=x,w[u+"Sum"]=e.roundTo(w[u+"Sum"],Math.max(F,G)),w[u+"Count"]++,w[u+"Average"]=w[u+"Sum"]/w[u+"Count"]))}}}a.agregatedDataProviders=l;e.ifArray(a.stockEvents)?0<f.processTimeout?setTimeout(function(){f.parseEvents.call(f,a,f.panels,f.stockEventsSettings,f.firstDayOfWeek,f,f.dataDateFormat)},f.processTimeout):f.parseEvents(a,f.panels,f.stockEventsSettings,f.firstDayOfWeek,f,f.dataDateFormat):(a.dataParsed=!0,f.onDataUpdated())},parseEvents:function(a,b,c,d,k,f){d=a.stockEvents;var l=a.agregatedDataProviders,h=b.length,n,g,m,q,t,p;for(n=0;n<h;n++){p=b[n];t=p.graphs;m=t.length;for(g=0;g<m;g++)q=t[g],q.customBulletField="amCustomBullet"+q.id+"_"+p.id,q.bulletConfigField="amCustomBulletConfig"+q.id+"_"+p.id,q.chart=p;for(g=0;g<d.length;g++)m=d[g],q=m.graph,e.isString(q)&&(q=e.getObjById(t,q))&&(m.graph=q),q&&(m.panel=q.chart)}for(var y in l)if(l.hasOwnProperty(y))for(b=l[y],h=e.extractPeriod(y),n=b.length,g=0;g<d.length;g++){m=d[g];q=m.date instanceof Date;f&&!q&&(m.date=e.stringToDate(m.date,f));q=m.date.getTime();var v=this.getEventDataItem(q,b,a,0,n,h);v&&(q=m.graph,p=m.panel,q&&(t="amCustomBullet"+q.id+"_"+p.id,q="amCustomBulletConfig"+q.id+"_"+p.id,v[q]?p=v[q]:(p={},p.eventDispatcher=k,p.eventObjects=[],p.letters=[],p.descriptions=[],p.shapes=[],p.backgroundColors=[],p.backgroundAlphas=[],p.borderColors=[],p.borderAlphas=[],p.colors=[],p.rollOverColors=[],p.showOnAxis=[],p.values=[],p.showAts=[],p.fontSizes=[],p.showBullets=[],v[t]=e.StackedBullet,v[q]=p),p.eventObjects.push(m),p.letters.push(m.text),p.descriptions.push(m.description),m.type?p.shapes.push(m.type):p.shapes.push(c.type),void 0!==m.backgroundColor?p.backgroundColors.push(m.backgroundColor):p.backgroundColors.push(c.backgroundColor),isNaN(m.backgroundAlpha)?p.backgroundAlphas.push(c.backgroundAlpha):p.backgroundAlphas.push(m.backgroundAlpha),isNaN(m.borderAlpha)?p.borderAlphas.push(c.borderAlpha):p.borderAlphas.push(m.borderAlpha),void 0!==m.borderColor?p.borderColors.push(m.borderColor):p.borderColors.push(c.borderColor),void 0!==m.rollOverColor?p.rollOverColors.push(m.rollOverColor):p.rollOverColors.push(c.rollOverColor),void 0!==m.showAt?p.showAts.push(m.showAt):p.showAts.push(c.showAt),void 0!==m.fontSize&&p.fontSizes.push(m.fontSize),p.colors.push(m.color),p.values.push(m.value),p.showOnAxis.push(m.showOnAxis),p.showBullets.push(m.showBullet),p.date=new Date(m.date)))}a.dataParsed=!0;this.onDataUpdated()},getEventDataItem:function(a,b,c,d,k,f){var l=f.period,h=f.count,n=Math.floor(d+(k-d)/2),g=b[n],m=g[c.categoryField],q=this.dataDateFormat,t=m instanceof Date;q&&!t&&(m=e.stringToDate(m,q));q=m.getTime();"YYYY"==l&&(q=e.resetDateToMin(new Date(m),l,h,this.firstDayOfWeek).getTime());l="fff"==l?m.getTime()+1:e.resetDateToMin(e.changeDate(new Date(m),f.period,f.count),l,h,this.firstDayOfWeek).getTime();if(a>=q&&a<l)return g;if(!(1>=k-d))return a<
q?this.getEventDataItem(a,b,c,d,n,f):this.getEventDataItem(a,b,c,n,k,f)},createLayout:function(){var a=this.div,b,c,d=this.classNamePrefix,e=document.createElement("div");e.style.position="relative";this.containerDiv=e;e.className=d+"-stock-div";a.appendChild(e);if(a=this.periodSelector)b=a.position;if(a=this.dataSetSelector)c=a.position;if("left"==b||"left"==c)a=document.createElement("div"),a.className=d+"-left-div",a.style.cssFloat="left",a.style.styleFloat="left",a.style.width="0px",a.style.position="absolute",e.appendChild(a),this.leftContainer=a;if("right"==b||"right"==c)b=document.createElement("div"),b.className=d+"-right-div",b.style.cssFloat="right",b.style.styleFloat="right",b.style.width="0px",e.appendChild(b),this.rightContainer=b;b=document.createElement("div");b.className=d+"-center-div";e.appendChild(b);this.centerContainer=b;e=document.createElement("div");e.className=d+"-panels-div";b.appendChild(e);this.panelsContainer=e},addPanels:function(){this.measurePanels(!0);for(var a=this.panels,b=0;b<a.length;b++){var c=a[b],c=e.processObject(c,e.StockPanel,this.theme,!0);a[b]=c;this.addStockPanel(c,b)}this.panelsAdded=!0},measurePanels:function(a){this.measure();var b=this.chartScrollbarSettings,c=this.divRealHeight,d=this.divRealWidth;if(this.div){var e=this.panelsSettings.panelSpacing;b.enabled&&(c-=b.height);(b=this.periodSelector)&&!b.vertical&&(b=b.offsetHeight,c-=b+e);(b=this.dataSetSelector)&&!b.vertical&&(b=b.offsetHeight,c-=b+e);a||c==this.prevPH&&this.prevPW==d||this.fire({type:"resized",chart:this});this.prevPW!=d&&(this.prevPW=d);if(c!=this.prevPH){a=this.panels;0<c&&(this.panelsContainer.style.height=c+"px");for(var d=0,f,b=0;b<a.length;b++)if(f=a[b]){var l=f.percentHeight;isNaN(l)&&(l=100/a.length,f.percentHeight=l);d+=l}this.panelsHeight=Math.max(c-e*(a.length-1),0);for(b=0;b<a.length;b++)if(f=a[b])f.percentHeight=f.percentHeight/d*100,f.panelBox&&(f.panelBox.style.height=Math.round(f.percentHeight*this.panelsHeight/100)+"px");this.prevPH=c}}},addStockPanel:function(a,b){var c=this.panelsSettings,d=document.createElement("div");0<b&&!this.panels[b-1].showCategoryAxis&&(d.style.marginTop=c.panelSpacing+"px");a.hideBalloonReal();a.panelBox=d;a.stockChart=this;a.langObj=this.langObj;a.id||(a.id="stockPanel"+b);d.className="amChartsPanel "+this.classNamePrefix+"-stock-panel-div "+this.classNamePrefix+"-stock-panel-div-"+a.id;a.pathToImages=this.pathToImages;a.path=this.path;d.style.height=Math.round(a.percentHeight*this.panelsHeight/100)+"px";d.style.width="100%";this.panelsContainer.appendChild(d);0<c.backgroundAlpha&&(d.style.backgroundColor=c.backgroundColor);if(d=a.stockLegend)d=e.processObject(d,e.StockLegend,this.theme),d.container=void 0,d.title=a.title,d.marginLeft=c.marginLeft,d.marginRight=c.marginRight,d.verticalGap=3,d.position="top",e.copyProperties(this.legendSettings,d),a.addLegend(d,d.divId);a.zoomOutText="";this.addCursor(a)},enableCursors:function(a){var b=this.chartCursors,c;for(c=0;c<b.length;c++)b[c].enabled=a},updatePanels:function(){var a=this.panels,b;for(b=0;b<a.length;b++)this.updatePanel(a[b]);this.mainDataSet&&this.updateGraphs();this.currentPeriod=void 0},updatePanel:function(a){a.seriesIdField="amCategoryIdField";a.dataProvider=[];a.chartData=[];a.graphs=[];var b=a.categoryAxis,c=this.categoryAxesSettings;e.copyProperties(this.panelsSettings,a);e.copyProperties(c,b);b.parseDates=!0;a.addClassNames=this.addClassNames;a.classNamePrefix=this.classNamePrefix;a.zoomOutOnDataUpdate=!1;void 0!==this.mouseWheelScrollEnabled&&(a.mouseWheelScrollEnabled=this.mouseWheelScrollEnabled);void 0!==this.mouseWheelZoomEnabled&&(a.mouseWheelZoomEnabled=this.mouseWheelZoomEnabled);a.dataDateFormat=this.dataDateFormat;a.language=this.language;a.showCategoryAxis?"top"==b.position?a.marginTop=c.axisHeight:a.marginBottom=c.axisHeight:(a.categoryAxis.labelsEnabled=!1,a.chartCursor&&(a.chartCursor.categoryBalloonEnabled=!1));var c=a.valueAxes,d=c.length,k;0===d&&(k=new e.ValueAxis(this.theme),a.addValueAxis(k));b=new e.AmBalloon(this.theme);e.copyProperties(this.balloon,b);a.balloon=b;c=a.valueAxes;d=c.length;for(b=0;b<d;b++)k=c[b],e.copyProperties(this.valueAxesSettings,k);a.listenersAdded=!1;a.write(a.panelBox)},zoom:function(a,b){this.zoomChart(a,b)},zoomOut:function(){this.zoomChart(this.firstDate,this.lastDate)},updatePanelsWithNewData:function(){var a=this.mainDataSet,b=this.scrollbarChart;this.updateGraphs();if(a){var c=this.panels;this.currentPeriod=void 0;var d;for(d=0;d<c.length;d++){var k=c[d];k.categoryField=a.categoryField;0===a.dataProvider.length&&(k.dataProvider=[]);k.scrollbarChart=b}if(b){c=this.categoryAxesSettings;d=c.minPeriod;b.categoryField=a.categoryField;k=b.dataProvider;if(0<a.dataProvider.length){var f=this.chartScrollbarSettings.usePeriod;if(f){var l=a.agregatedDataProviders[d],h=a.categoryField,n=this.getFirstDate(l[0][h]).getTime();this.getLastDate(l[l.length-1][h]).getTime()-n<e.getPeriodDuration(f)&&(f=d);b.dataProvider=a.agregatedDataProviders[f]}else b.dataProvider=a.agregatedDataProviders[d]}else b.dataProvider=[];f=b.categoryAxis;f.minPeriod=d;f.firstDayOfWeek=this.firstDayOfWeek;f.equalSpacing=c.equalSpacing;f.axisAlpha=0;f.markPeriodChange=c.markPeriodChange;b.bbsetr=!0;k!=b.dataProvider&&b.validateData();c=this.panelsSettings;b.maxSelectedTime=c.maxSelectedTime;b.minSelectedTime=c.minSelectedTime}0<a.dataProvider.length&&(this.fixGlue(),this.zoomChart(this.startDate,this.endDate))}this.panelDataInvalidated=!1},addChartScrollbar:function(){var a=this.chartScrollbarSettings,b=this.scrollbarChart;b&&(b.clear(),b.destroy());if(a.enabled){var c=this.panelsSettings,d=this.categoryAxesSettings,b=new e.AmSerialChart(this.theme);b.svgIcons=c.svgIcons;b.language=this.language;b.pathToImages=this.pathToImages;b.autoMargins=!1;b.addClassNames=!0;this.scrollbarChart=b;b.id="scrollbarChart";b.scrollbarOnly=!0;b.zoomOutText="";c.fontFamily&&(b.fontFamily=c.fontFamily);isNaN(c.fontSize)||(b.fontSize=c.fontSize);b.marginLeft=c.marginLeft;b.marginRight=c.marginRight;b.marginTop=0;b.marginBottom=0;var c=d.dateFormats,k=b.categoryAxis;k.boldPeriodBeginning=d.boldPeriodBeginning;c&&(k.dateFormats=d.dateFormats);k.labelsEnabled=!1;k.parseDates=!0;d=a.graph;if(e.isString(d)){c=this.panels;for(k=0;k<c.length;k++){var f=e.getObjById(c[k].stockGraphs,a.graph);f&&(d=f)}a.graph=d}var l;d&&(l=new e.AmGraph(this.theme),l.valueField=d.valueField,l.periodValue=d.periodValue,l.type=d.type,l.connect=d.connect,l.minDistance=a.minDistance,b.addGraph(l));d=new e.ChartScrollbar(this.theme);b.addChartScrollbar(d);e.copyProperties(a,d);d.scrollbarHeight=a.height;d.graph=l;this.listenTo(d,"zoomed",this.handleScrollbarZoom);l=document.createElement("div");l.className=this.classNamePrefix+"-scrollbar-chart-div";l.style.height=a.height+"px";d=this.periodSelectorContainer;c=this.periodSelector;k=this.centerContainer;"bottom"==a.position?c?"bottom"==c.position?k.insertBefore(l,d):k.appendChild(l):k.appendChild(l):c?"top"==c.position?k.insertBefore(l,d.nextSibling):k.insertBefore(l,k.firstChild):k.insertBefore(l,k.firstChild);b.write(l)}},handleScrollbarZoom:function(a){if(this.skipScrollbarEvent)this.skipScrollbarEvent=!1;else{var b=a.endDate,c={};c.startDate=a.startDate;c.endDate=b;this.updateScrollbar=!1;this.handleZoom(c)}},addPeriodSelector:function(){var a=this.periodSelector;if(a){var b=this.categoryAxesSettings.minPeriod;a.minDuration=e.getPeriodDuration(b);a.minPeriod=b;a.chart=this;var c=this.dataSetSelector,d,b=this.dssContainer;c&&(d=c.position);var c=this.panelsSettings.panelSpacing,k=document.createElement("div");this.periodSelectorContainer=k;var f=this.leftContainer,l=this.rightContainer,h=this.centerContainer,n=this.panelsContainer,g=a.width+2*c+"px";switch(a.position){case"left":f.style.width=a.width+"px";f.appendChild(k);h.style.paddingLeft=g;break;case"right":h.style.marginRight=g;l.appendChild(k);l.style.width=a.width+"px";break;case"top":n.style.clear="both";h.insertBefore(k,n);k.style.paddingBottom=c+"px";k.style.overflow="hidden";break;case"bottom":k.style.marginTop=c+"px","bottom"==d?h.insertBefore(k,b):h.appendChild(k)}this.listenTo(a,"changed",this.handlePeriodSelectorZoom);a.write(k)}},addDataSetSelector:function(){var a=this.dataSetSelector;if(a){a.chart=this;a.dataProvider=this.dataSets;var b=a.position,c=this.panelsSettings.panelSpacing,d=document.createElement("div");this.dssContainer=d;var e=this.leftContainer,f=this.rightContainer,l=this.centerContainer,h=this.panelsContainer,c=a.width+2*c+"px";switch(b){case"left":e.style.width=a.width+"px";e.appendChild(d);l.style.paddingLeft=c;break;case"right":l.style.marginRight=c;f.appendChild(d);f.style.width=a.width+"px";break;case"top":h.style.clear="both";l.insertBefore(d,h);d.style.overflow="hidden";break;case"bottom":l.appendChild(d)}a.write(d)}},handlePeriodSelectorZoom:function(a){var b=this.scrollbarChart;b&&(b.updateScrollbar=!0);a.predefinedPeriod?(this.predefinedStart=a.startDate,this.predefinedEnd=a.endDate):this.predefinedEnd=this.predefinedStart=null;this.zoomOutValueAxes();this.zoomChart(a.startDate,a.endDate)},zoomOutValueAxes:function(){var a=this.panels;if(this.panelsSettings.zoomOutAxes)for(var b=0;b<a.length;b++){var c=a[b].valueAxes;if(c)for(var d=0;d<c.length;d++){var e=c[d];e.minZoom=NaN;e.maxZoom=NaN}}},addCursor:function(a){var b=this.chartCursorSettings;if(b.enabled){var c=new e.ChartCursor(this.theme);e.copyProperties(b,c);var d=b.categoryBalloonFunction;a.chartCursor&&(e.copyProperties(a.chartCursor,c),a.chartCursor.categoryBalloonFunction&&(d=a.chartCursor.categoryBalloonFunction));c.categoryBalloonFunction=d;a.removeChartCursor();a.addChartCursor(c);"mouse"==b.cursorPosition?this.listenTo(c,"moved",this.handleCursorChange):this.listenTo(c,"changed",this.handleCursorChange);this.listenTo(c,"onHideCursor",this.handleCursorChange);this.listenTo(c,"zoomStarted",this.handleCursorChange);this.listenTo(c,"zoomed",this.handleCursorZoom);this.chartCursors.push(c)}},handleCursorChange:function(a){a=a.target;var b=this.chartCursors,c;for(c=0;c<b.length;c++){var d=b[c];d!=a&&d.syncWithCursor(a,this.chartCursorSettings.onePanelOnly)}},handleCursorZoom:function(a){var b=this.scrollbarChart;b&&(b.updateScrollbar=!0);var b={},c,d;if(this.categoryAxesSettings.equalSpacing){d=this.mainDataSet.categoryField;var e=this.mainDataSet.agregatedDataProviders[this.currentPeriod];c=new Date(e[a.start][d]);d=new Date(e[a.end][d])}else c=new Date(a.start),d=new Date(a.end);b.startDate=c;b.endDate=d;this.handleZoom(b);this.handleCursorChange(a)},handleZoom:function(a){this.zoomChart(a.startDate,a.endDate)},zoomChart:function(a,b){var c=this;a||(a=c.firstDate);var d=e.newDate(a),k=c.firstDate,f=c.lastDate,l=c.currentPeriod,h=c.categoryAxesSettings,n=h.minPeriod,g=c.panelsSettings,m=c.periodSelector,q=c.panels,t=c.comparedGraphs,p=c.scrollbarChart,y=c.firstDayOfWeek;if(k&&f){a||(a=k);b||(b=f);if(l){var v=e.extractPeriod(l);a.getTime()==b.getTime()&&v!=n&&(b=e.changeDate(b,v.period,v.count),b.setTime(b.getTime()-1))}a.getTime()<k.getTime()&&(a=k);a.getTime()>f.getTime()&&(a=f);b.getTime()<k.getTime()&&(b=k);b.getTime()>f.getTime()&&(b=f);n=e.getItemIndex(n,h.groupToPeriods);h=l;l=c.choosePeriod(n,a,b);c.currentPeriod=l;var n=e.extractPeriod(l),A=e.getPeriodDuration(n.period,n.count);1>b.getTime()-a.getTime()&&(a=new Date(b.getTime()-1));v=e.newDate(a);c.extendToFullPeriod&&(v.getTime()-k.getTime()<.1*A&&(v=e.resetDateToMin(a,n.period,n.count,y)),f.getTime()-b.getTime()<.1*A&&(b=e.resetDateToMin(f,n.period,n.count,y),b=e.changeDate(b,n.period,n.count,!0)));for(k=0;k<q.length;k++)f=q[k],f.chartCursor&&f.chartCursor.panning&&(v=d);for(k=0;k<q.length;k++){f=q[k];d=!1;if(l!=h){for(d=0;d<t.length;d++)A=t[d].graph,A.dataProvider=A.dataSet.agregatedDataProviders[l];d=f.categoryAxis;d.firstDayOfWeek=y;d.minPeriod=l;f.dataProvider=c.mainDataSet.agregatedDataProviders[l];if(d=f.chartCursor)d.categoryBalloonDateFormat=c.chartCursorSettings.categoryBalloonDateFormat(n.period),f.showCategoryAxis||(d.categoryBalloonEnabled=!1);f.startTime=v.getTime();f.endTime=b.getTime();f.start=NaN;f.validateData(!0);d=!0}f.chartCursor&&f.chartCursor.panning&&(d=!0);d||(f.startTime=void 0,f.endTime=void 0,f.zoomToDates(v,b));0<g.startDuration&&c.animationPlayed&&!d?(f.startDuration=0,f.animateAgain()):0<g.startDuration&&!d&&f.animateAgain()}c.animationPlayed=!0;g=e.newDate(b);p&&c.updateScrollbar&&(p.zoomToDates(a,g),c.skipScrollbarEvent=!0,setTimeout(function(){c.resetSkip.call(c)},100));c.updateScrollbar=!0;c.startDate=a;c.endDate=b;m&&m.zoom(a,b);c.skipEvents||a.getTime()==c.previousStartDate.getTime()&&b.getTime()==c.previousEndDate.getTime()||(m={type:"zoomed"},m.startDate=a,m.endDate=b,m.chart=c,m.period=l,c.fire(m),c.previousStartDate=e.newDate(a),c.previousEndDate=e.newDate(b))}c.eventsHidden&&c.showHideEvents(!1);c.dispDUpd()},dispDUpd:function(){this.skipEvents||(this.chartCreated||(this.chartCreated=!0,this.fire({type:"init",chart:this})),this.chartRendered||(this.chartRendered=!0,this.fire({type:"rendered",chart:this})),this.fire({type:"drawn",chart:this}));this.animationPlayed=this.chartCreated=!0},resetSkip:function(){this.skipScrollbarEvent=!1},updateGraphs:function(){this.getSelections();if(0<this.dataSets.length){var a=this.panels;this.comparedGraphs=[];var b;for(b=0;b<a.length;b++){var c=a[b],d=c.valueAxes,k;for(k=0;k<d.length;k++){var f=d[k];f.prevLog&&(f.logarithmic=f.prevLog);f.recalculateToPercents="always"==c.recalculateToPercents?!0:!1}d=this.mainDataSet;k=this.comparedDataSets;f=c.stockGraphs;c.graphs=[];var l,h,n;for(l=0;l<f.length;l++){var g=f[l],g=e.processObject(g,e.StockGraph,this.theme);f[l]=g;if(!g.title||g.resetTitleOnDataSetChange)g.title=d.title,g.resetTitleOnDataSetChange=!0;g.useDataSetColors&&(g.lineColor=d.color,g.fillColors=void 0,g.bulletColor=void 0);var m=!1,q=d.fieldMappings;for(h=0;h<q.length;h++){n=q[h];var t=g.valueField;t&&n.toField==t&&(m=!0);(t=g.openField)&&n.toField==t&&(m=!0);(t=g.closeField)&&n.toField==t&&(m=!0);(t=g.lowField)&&n.toField==t&&(m=!0)}c.graphs.push(g);c.processGraphs();g.hideFromLegend=m?!1:!0;t=!1;"always"==c.recalculateToPercents&&(t=!0);var p=c.stockLegend,y,v,A,E;p&&(p=e.processObject(p,e.StockLegend,this.theme),c.stockLegend=p,y=p.valueTextComparing,v=p.valueTextRegular,A=p.periodValueTextComparing,E=p.periodValueTextRegular);if(g.comparable){var B=k.length;if(g.valueAxis){0<B&&g.valueAxis.logarithmic&&"never"!=c.recalculateToPercents&&(g.valueAxis.logarithmic=!1,g.valueAxis.prevLog=!0);0<B&&"whenComparing"==c.recalculateToPercents&&(g.valueAxis.recalculateToPercents=!0);p&&g.valueAxis&&!0===g.valueAxis.recalculateToPercents&&(t=!0);var D;for(D=0;D<B;D++){var C=k[D],r=g.comparedGraphs[C.id];r||(r=new e.AmGraph(this.theme),r.id="comparedGraph_"+g.id+"_"+C.id);g.compareGraphType&&(r.type=g.compareGraphType);g.compareGraph&&e.copyProperties(g.compareGraph,r);r.periodValue=g.periodValue;r.recalculateValue=g.recalculateValue;r.dataSet=C;r.behindColumns=g.behindColumns;g.comparedGraphs[C.id]=r;r.seriesIdField="amCategoryIdField";r.connect=g.connect;r.clustered=g.clustered;r.showBalloon=g.showBalloon;this.passFields(g,r);var z=g.compareField;z||(z=g.valueField);r.customBulletsHidden=!g.showEventsOnComparedGraphs;m=!1;q=C.fieldMappings;for(h=0;h<q.length;h++)n=q[h],n.toField==z&&(m=!0);if(m){r.valueField=z;r.title=C.title?C.title:g.title;r.lineColor=C.color;g.compareGraphLineColor&&(r.lineColor=g.compareGraphLineColor);h=g.compareGraphLineThickness;isNaN(h)||(r.lineThickness=h);h=g.compareGraphDashLength;isNaN(h)||(r.dashLength=h);h=g.compareGraphLineAlpha;isNaN(h)||(r.lineAlpha=h);h=g.compareGraphCornerRadiusTop;isNaN(h)||(r.cornerRadiusTop=h);h=g.compareGraphCornerRadiusBottom;isNaN(h)||(r.cornerRadiusBottom=h);h=g.compareGraphBalloonColor;isNaN(h)||(r.balloonColor=h);h=g.compareGraphBulletColor;isNaN(h)||(r.bulletColor=h);if(h=g.compareGraphFillColors)r.fillColors=h;if(h=g.compareGraphNegativeFillColors)r.negativeFillColors=h;if(h=g.compareGraphFillAlphas)r.fillAlphas=h;if(h=g.compareGraphNegativeFillAlphas)r.negativeFillAlphas=h;if(h=g.compareGraphBullet)r.bullet=h;if(h=g.compareGraphNumberFormatter)r.numberFormatter=h;h=g.compareGraphPrecision;isNaN(h)||(r.precision=h);if(h=g.compareGraphBalloonText)r.balloonText=h;h=g.compareGraphBulletSize;isNaN(h)||(r.bulletSize=h);h=g.compareGraphBulletAlpha;isNaN(h)||(r.bulletAlpha=h);h=g.compareGraphBulletBorderAlpha;isNaN(h)||(r.bulletBorderAlpha=h);if(h=g.compareGraphBulletBorderColor)r.bulletBorderColor=h;h=g.compareGraphBulletBorderThickness;isNaN(h)||(r.bulletBorderThickness=h);r.visibleInLegend=g.compareGraphVisibleInLegend;r.balloonFunction=g.compareGraphBalloonFunction;r.hideBulletsCount=g.hideBulletsCount;r.valueAxis=g.valueAxis;p&&(t&&y?(r.legendValueTextR=y,r.legendPeriodValueTextR=A):(v&&(r.legendValueTextR=v),r.legendPeriodValueTextR=E));c.showComparedOnTop?c.graphs.push(r):c.graphs.unshift(r);this.comparedGraphs.push({graph:r,dataSet:C})}}}}p&&(t&&y?(g.legendValueTextR=y,g.legendPeriodValueTextR=A):(v&&(g.legendValueTextR=v),g.legendPeriodValueTextR=E))}}}},passFields:function(a,b){for(var c="lineColor color alpha fillColors description bullet customBullet bulletSize bulletConfig url labelColor dashLength pattern gap className".split(" "),d=0;d<c.length;d++){var e=c[d];b[e+"Field"]=a[e+"Field"]}},choosePeriod:function(a,b,c){var d=this.categoryAxesSettings,k=d.groupToPeriods,f=k[a],l=k[a+1],h=e.extractPeriod(f),h=e.getPeriodDuration(h.period,h.count),n=b.getTime(),g=c.getTime(),m=d.maxSeries;d.alwaysGroup&&f==d.minPeriod&&(f=1<k.length?k[1]:k[0]);return(g-n)/h>m&&0<m&&l?this.choosePeriod(a+1,b,c):f},getSelections:function(){var a=[],b=this.dataSets,c;for(c=0;c<b.length;c++){var d=b[c];d.compared&&a.push(d)}this.comparedDataSets=a;b=this.panels;for(c=0;c<b.length;c++)d=b[c],d.hideDrawingIcons&&("never"!=d.recalculateToPercents&&0<a.length?d.hideDrawingIcons(!0):d.drawingIconsEnabled&&
d.hideDrawingIcons(!1))},addPanel:function(a){this.panels.push(a);this.prevPH=void 0;e.removeChart(a);e.addChart(a)},addPanelAt:function(a,b){this.panels.splice(b,0,a);this.prevPH=void 0;e.removeChart(a);e.addChart(a)},removePanel:function(a){var b=this.panels;this.prevPH=void 0;var c;for(c=b.length-1;0<=c;c--)b[c]==a&&(this.fire({type:"panelRemoved",panel:a,chart:this}),b.splice(c,1),a.destroy(),a.clear())},validateData:function(a){var b=this;b.validateDataTO&&clearTimeout(b.validateDataTO);b.validateDataTO=setTimeout(function(){b.validateDataReal.call(b,a)},100)},validateDataReal:function(a){a||this.resetDataParsed();this.updateDataSets();this.mainDataSet.compared=!1;this.updateData();(a=this.dataSetSelector)&&a.write(a.div)},resetDataParsed:function(){var a=this.dataSets,b;for(b=0;b<a.length;b++)a[b].dataParsed=!1},validateNow:function(a,b){this.skipDefault=!0;this.chartRendered=!1;this.prevPH=void 0;this.skipEvents=b;this.clear(!0);this.initTO&&clearTimeout(this.initTO);a&&this.resetDataParsed();this.write(this.div)},hideStockEvents:function(){this.showHideEvents(!1);this.eventsHidden=!0},showStockEvents:function(){this.showHideEvents(!0);this.eventsHidden=!1},showHideEvents:function(a){var b=this.panels,c;for(c=0;c<b.length;c++){var d=b[c].graphs,e;for(e=0;e<d.length;e++){var f=d[e];!0===a?f.showCustomBullets(!0):f.hideCustomBullets(!0)}}},invalidateSize:function(){var a=this;clearTimeout(a.validateTO);var b=setTimeout(function(){a.validateNow()},5);a.validateTO=b},measure:function(){var a=this.div;if(a){var b=a.offsetWidth,c=a.offsetHeight;a.clientHeight&&(b=a.clientWidth,c=a.clientHeight);this.divRealWidth=b;this.divRealHeight=c}},handleResize:function(){var a=this,b=setTimeout(function(){a.validateSizeReal()},150);a.initTO=b},validateSizeReal:function(){this.previousWidth=this.divRealWidth;this.previousHeight=this.divRealHeight;this.measure();if(this.divRealWidth!=this.previousWidth||this.divRealHeight!=this.previousHeight)0<this.divRealWidth&&0<this.divRealHeight&&this.fire({type:"resized",chart:this}),this.divRealHeight!=this.previousHeight&&this.validateNow()},clear:function(a){var b=this.panels,c;if(b)for(c=0;c<b.length;c++){var d=b[c];a||(d.cleanChart(),d.destroy());d.clear(a)}(b=this.scrollbarChart)&&b.clear();this.validateDataTO&&clearTimeout(this.validateDataTO);if(b=this.div)b.innerHTML="";a||(e.removeChart(this),this.div=null,e.deleteObject(this))}});e.StockEvent=e.Class({construct:function(){}})})();(function(){var e=window.AmCharts;e.DataSet=e.Class({construct:function(){this.cname="DataSet";this.fieldMappings=[];this.dataProvider=[];this.agregatedDataProviders=[];this.stockEvents=[];this.compared=!1;this.showInCompare=this.showInSelect=!0}})})();(function(){var e=window.AmCharts;e.PeriodSelector=e.Class({construct:function(a){this.cname="PeriodSelector";this.theme=a;this.createEvents("changed");this.inputFieldsEnabled=!0;this.position="bottom";this.width=180;this.fromText="From: ";this.toText="to: ";this.periodsText="Zoom: ";this.accessibilityText="Select a timeframe to show chart data";this.periods=[];this.inputFieldWidth=100;this.dateFormat="DD-MM-YYYY";this.hideOutOfScopePeriods=!0;e.applyTheme(this,a,this.cname)},zoom:function(a,b){var c=this.chart;this.inputFieldsEnabled&&(this.startDateField.value=e.formatDate(a,this.dateFormat,c),this.endDateField.value=e.formatDate(b,this.dateFormat,c));this.markButtonAsSelected()},write:function(a){var b=this,c=b.chart,d=c.classNamePrefix;a.className="amChartsPeriodSelector "+d+"-period-selector-div";var k=b.width,f=b.position;b.width=void 0;b.position=void 0;e.applyStyles(a.style,b);b.width=k;b.position=f;b.div=a;a.innerHTML='<fieldset style="border: none; padding:0"><legend style="display: none;">'+
(c.langObj.periodSelectorAccessibilityText||b.accessibilityText)+"</legend></fieldset>";var l=a.firstChild;a=b.theme;k=b.position;k="top"==k||"bottom"==k?!1:!0;b.vertical=k;var h=f=0;if(b.inputFieldsEnabled){var n=document.createElement("div");l.appendChild(n);var g=document.createTextNode(c.langObj.fromText||b.fromText);n.appendChild(g);k?e.addBr(n):(n.style.styleFloat="left",n.style.display="inline");var m=document.createElement("input");m.setAttribute("aria-label",c.langObj.fromText||b.fromText);m.className="amChartsInputField "+d+"-start-date-input";a&&e.applyStyles(m.style,a.PeriodInputField);m.style.textAlign="center";m.onblur=function(a){b.handleCalChange(a)};e.isNN&&m.addEventListener("keypress",function(a){b.handleCalendarChange.call(b,a)},!0);e.isIE&&m.attachEvent("onkeypress",function(a){b.handleCalendarChange.call(b,a)});n.appendChild(m);b.startDateField=m;if(k)g=b.width-6+"px",e.addBr(n);else{var g=b.inputFieldWidth+"px",q=document.createTextNode(" ");n.appendChild(q)}m.style.width=g;m=document.createTextNode(c.langObj.toText||b.toText);n.appendChild(m);k&&e.addBr(n);m=document.createElement("input");m.setAttribute("aria-label",c.langObj.toText||b.toText);m.className="amChartsInputField "+d+"-end-date-input";a&&e.applyStyles(m.style,a.PeriodInputField);m.style.textAlign="center";m.onblur=function(){b.handleCalChange()};e.isNN&&m.addEventListener("keypress",function(a){b.handleCalendarChange.call(b,a)},!0);e.isIE&&m.attachEvent("onkeypress",function(a){b.handleCalendarChange.call(b,a)});n.appendChild(m);b.endDateField=m;k?e.addBr(n):f=m.offsetHeight+2;g&&(m.style.width=g)}n=b.periods;if(e.ifArray(n)){g=document.createElement("div");k||(g.style.cssFloat="right",g.style.styleFloat="right",g.style.display="inline");l.appendChild(g);k&&e.addBr(g);c=document.createTextNode(c.langObj.periodsText||b.periodsText);g.appendChild(c);b.periodContainer=g;for(var t,c=0;c<n.length;c++)l=n[c],t=document.createElement("input"),t.type="button",t.value=l.label,t.period=l.period,t.count=l.count,t.periodObj=l,t.className="amChartsButton "+d+"-period-input",a&&e.applyStyles(t.style,a.PeriodButton),k&&(t.style.width=b.width-1+"px"),t.style.boxSizing="border-box",g.appendChild(t),b.addEventListeners(t),l.button=t;!k&&t&&(h=t.offsetHeight)}b.offsetHeight=Math.max(f,h)},addEventListeners:function(a){var b=this;e.isNN&&a.addEventListener("click",function(a){b.handlePeriodChange.call(b,a)},!0);e.isIE&&a.attachEvent("onclick",function(a){b.handlePeriodChange.call(b,a)})},getPeriodDates:function(){var a=this.periods,b;for(b=0;b<a.length;b++)this.selectPeriodButton(a[b],!0)},handleCalendarChange:function(a){13==a.keyCode&&this.handleCalChange(a)},handleCalChange:function(a){var b=this.dateFormat,c=e.stringToDate(this.startDateField.value,b),b=this.chart.getLastDate(e.stringToDate(this.endDateField.value,b));try{this.startDateField.blur(),this.endDateField.blur()}catch(k){}if(c&&b){var d={type:"changed"};d.startDate=c;d.endDate=b;d.chart=this.chart;d.event=a;this.fire(d)}},handlePeriodChange:function(a){this.selectPeriodButton((a.srcElement?a.srcElement:a.target).periodObj,!1,a)},setRanges:function(a,b){this.firstDate=a;this.lastDate=b;this.getPeriodDates()},selectPeriodButton:function(a,b,c){var d=a.button,k=d.count,f=d.period,l=this.chart,h,n,g=this.firstDate,m=this.lastDate,q,t=this.theme;h=this.selectFromStart;g&&m&&("MAX"==f?(h=g,n=m):"YTD"==f?(h=new Date,h.setMonth(0,1),h.setHours(0,0,0,0),0===k&&h.setDate(h.getDate()-1),n=this.lastDate):"YYYY"==f||"MM"==f?h?(h=g,n=new Date(g),"YYYY"==f&&(k*=12),n.setMonth(n.getMonth()+k)):(h=new Date(m),"YYYY"==f&&(f="MM",k*=12),"MM"==f&&(h=e.resetDateToMin(h,"DD")),e.changeDate(h,f,k,!1),n=m):"fff"==f?(e.getPeriodDuration(f,k),q=e.getPeriodDuration(f,k),h?(h=g,n.setMilliseconds(g.getMilliseconds()-q+1)):(h=new Date(m.getTime()),h.setMilliseconds(h.getMilliseconds()-q+1),n=this.lastDate)):(q=e.getPeriodDuration(f,k),h?(h=g,n=new Date(g.getTime()+q-1)):(h=new Date(m.getTime()-q+1),n=m)),a.startTime=h.getTime(),this.hideOutOfScopePeriods&&(b&&a.startTime<g.getTime()?d.style.display="none":d.style.display="inline"),h.getTime()>m.getTime()&&(q=e.getPeriodDuration("DD",1),h=new Date(m.getTime()-q)),h.getTime()<g.getTime()&&(h=g),"YTD"==f&&(a.startTime=h.getTime(),m.getFullYear()<(new Date).getFullYear()&&(d.style.display="none")),a.endTime=n.getTime(),b||(this.skipMark=!0,this.unselectButtons(),d.className="amChartsButtonSelected "+l.classNamePrefix+"-period-input-selected",t&&e.applyStyles(d.style,t.PeriodButtonSelected),a={type:"changed"},a.startDate=h,a.endDate=n,a.predefinedPeriod=f,a.chart=this.chart,a.count=k,a.event=c,this.fire(a)))},markButtonAsSelected:function(){if(!this.skipMark){var a=this.chart,b=this.periods,c=a.startDate.getTime(),d=a.endDate.getTime(),k=this.lastDate.getTime();d>k&&(d=k);k=this.theme;this.unselectButtons();var f;for(f=b.length-1;0<=f;f--){var l=b[f],h=l.button;l.startTime&&l.endTime&&c==l.startTime&&d==l.endTime&&(this.unselectButtons(),h.className="amChartsButtonSelected "+a.classNamePrefix+"-period-input-selected",k&&e.applyStyles(h.style,k.PeriodButtonSelected))}}this.skipMark=!1},unselectButtons:function(){var a=this.chart,b=this.periods,c,d=this.theme;for(c=b.length-1;0<=c;c--){var k=b[c].button;k.className="amChartsButton "+a.classNamePrefix+"-period-input";d&&e.applyStyles(k.style,d.PeriodButton)}},setDefaultPeriod:function(){var a=this.periods,b;if(this.chart.chartCreated)for(b=0;b<a.length;b++){var c=a[b];c.selected&&this.selectPeriodButton(c)}}})})();(function(){var e=window.AmCharts;e.StockGraph=e.Class({inherits:e.AmGraph,construct:function(a){e.StockGraph.base.construct.call(this,a);this.cname="StockGraph";this.useDataSetColors=!0;this.periodValue="Close";this.compareGraphType="line";this.compareGraphVisibleInLegend=!0;this.comparable=this.resetTitleOnDataSetChange=!1;this.comparedGraphs={};this.showEventsOnComparedGraphs=!1;e.applyTheme(this,a,this.cname)}})})();(function(){var e=window.AmCharts;e.StockPanel=e.Class({inherits:e.AmSerialChart,construct:function(a){e.StockPanel.base.construct.call(this,a);this.cname="StockPanel";this.theme=a;this.showCategoryAxis=this.showComparedOnTop=!0;this.recalculateToPercents="whenComparing";this.panelHeaderPaddingBottom=this.panelHeaderPaddingLeft=this.panelHeaderPaddingRight=this.panelHeaderPaddingTop=0;this.trendLineAlpha=1;this.trendLineColor="#00CC00";this.trendLineColorHover="#CC0000";this.trendLineThickness=2;this.trendLineDashLength=0;this.stockGraphs=[];this.drawingIconsEnabled=!1;this.iconSize=38;this.autoMargins=this.allowTurningOff=this.eraseAll=this.erasingEnabled=this.drawingEnabled=!1;e.applyTheme(this,a,this.cname)},initChart:function(a){e.StockPanel.base.initChart.call(this,a);this.drawingIconsEnabled&&this.createDrawIcons();(a=this.chartCursor)&&this.listenTo(a,"draw",this.handleDraw)},addStockGraph:function(a){this.stockGraphs.push(a);return a},handleCursorZoom:function(a){a.start=NaN;a.end=NaN;e.StockPanel.base.handleCursorZoom.call(this,a)},removeStockGraph:function(a){var b=this.stockGraphs,c;for(c=b.length-1;0<=c;c--)b[c]==a&&b.splice(c,1)},createDrawIcons:function(){var a=this,b=a.iconSize,c=a.container,d=a.pathToImages,k=a.realWidth-2*b-1-a.marginRight,f=e.rect(c,b,b,"#000",.005),l=e.rect(c,b,b,"#000",.005);l.translate(b+1,0);var h=c.image(d+"pencilIcon"+a.extension,0,0,b,b);e.setCN(a,h,"pencil");a.pencilButton=h;l.setAttr("cursor","pointer");f.setAttr("cursor","pointer");f.mouseup(function(){a.handlePencilClick()});var n=c.image(d+"pencilIconH"+a.extension,0,0,b,b);e.setCN(a,n,"pencil-pushed");a.pencilButtonPushed=n;a.drawingEnabled||n.hide();var g=c.image(d+"eraserIcon"+a.extension,b+1,0,b,b);e.setCN(a,g,"eraser");a.eraserButton=g;l.mouseup(function(){a.handleEraserClick()});f.touchend&&(f.touchend(function(){a.handlePencilClick()}),l.touchend(function(){a.handleEraserClick()}));b=c.image(d+"eraserIconH"+a.extension,b+1,0,b,b);e.setCN(a,b,"eraser-pushed");a.eraserButtonPushed=b;a.erasingEnabled||b.hide();c=c.set([h,n,g,b,f,l]);e.setCN(a,c,"drawing-tools");c.translate(k,1);this.hideIcons&&c.hide()},handlePencilClick:function(){var a=!this.drawingEnabled;this.disableDrawing(!a);this.erasingEnabled=!1;var b=this.eraserButtonPushed;b&&b.hide();b=this.pencilButtonPushed;a?b&&b.show():(b&&b.hide(),this.setMouseCursor("auto"))},disableDrawing:function(a){this.drawingEnabled=!a;var b=this.chartCursor;this.stockChart&&(this.stockChart.enableCursors(a),b&&b.enableDrawing(!a))},handleEraserClick:function(){this.disableDrawing(!0);var a=this.pencilButtonPushed;a&&a.hide();a=this.eraserButtonPushed;if(this.eraseAll){var a=this.trendLines,b;for(b=a.length-1;0<=b;b--){var c=a[b];c.isProtected||this.removeTrendLine(c)}this.validateNow()}else(this.erasingEnabled=b=!this.erasingEnabled)?(a&&a.show(),this.setTrendColorHover(this.trendLineColorHover),this.setMouseCursor("auto")):(a&&a.hide(),this.setTrendColorHover())},setTrendColorHover:function(a){var b=this.trendLines,c;for(c=b.length-1;0<=c;c--){var d=b[c];d.isProtected||(d.rollOverColor=a);this.listenTo(d,"click",this.handleTrendClick)}},handleDraw:function(a){var b=this.drawOnAxis;e.isString(b)&&(b=this.getValueAxisById(b));b||(b=this.valueAxes[0]);this.drawOnAxis=b;var c=this.categoryAxis,d=a.initialX,k=a.finalX,f=a.initialY;a=a.finalY;var l=new e.TrendLine(this.theme);l.initialDate=c.coordinateToDate(d);l.finalDate=c.coordinateToDate(k);l.initialValue=b.coordinateToValue(f);l.finalValue=b.coordinateToValue(a);l.lineAlpha=this.trendLineAlpha;l.lineColor=this.trendLineColor;l.lineThickness=this.trendLineThickness;l.dashLength=this.trendLineDashLength;l.valueAxis=b;l.categoryAxis=c;this.addTrendLine(l);this.listenTo(l,"click",this.handleTrendClick);this.validateNow()},hideDrawingIcons:function(a){(this.hideIcons=a)&&this.disableDrawing(a)},handleTrendClick:function(a){this.erasingEnabled&&(a=a.trendLine,this.eraseAll||a.isProtected||this.removeTrendLine(a),this.validateNow())},handleWheelReal:function(a,b){var c=this.scrollbarChart;if(!this.wheelBusy&&c){var d=1,e=1;this.mouseWheelZoomEnabled?b||(d=-1):b&&(d=-1);if(d!=e)var f=this.mouseX/this.plotAreaWidth,d=d*f,e=e*(1-f);if(c=c.chartScrollbar)c.getPercents(),f=.05*(c.percentEnd-c.percentStart),.005>f&&(f=.005),0>a?(d=c.percentStart+d*f,e=c.percentEnd+e*f):(d=c.percentStart-d*f,e=c.percentEnd-e*f),e>d&&c.percentZoom(d,e,!0)}}})})();(function(){var e=window.AmCharts;e.CategoryAxesSettings=e.Class({construct:function(a){this.cname="CategoryAxesSettings";this.minPeriod="DD";this.equalSpacing=!1;this.axisHeight=28;this.tickLength=this.axisAlpha=0;this.gridCount=10;this.maxSeries=150;this.groupToPeriods="ss 10ss 30ss mm 10mm 30mm hh DD WW MM YYYY".split(" ");this.markPeriodChange=this.autoGridCount=!0;e.applyTheme(this,a,this.cname)}})})();(function(){var e=window.AmCharts;e.ChartCursorSettings=e.Class({construct:function(a){this.cname="ChartCursorSettings";this.enabled=!0;this.bulletsEnabled=this.valueBalloonsEnabled=!1;this.graphBulletSize=1;this.onePanelOnly=!1;this.categoryBalloonDateFormats=[{period:"YYYY",format:"YYYY"},{period:"MM",format:"MMM, YYYY"},{period:"WW",format:"MMM DD, YYYY"},{period:"DD",format:"MMM DD, YYYY"},{period:"hh",format:"JJ:NN"},{period:"mm",format:"JJ:NN"},{period:"ss",format:"JJ:NN:SS"},{period:"fff",format:"JJ:NN:SS"}];e.applyTheme(this,a,this.cname)},categoryBalloonDateFormat:function(a){var b=this.categoryBalloonDateFormats,c,d;for(d=0;d<b.length;d++)b[d].period==a&&(c=b[d].format);return c}})})();(function(){var e=window.AmCharts;e.ChartScrollbarSettings=e.Class({construct:function(a){this.cname="ChartScrollbarSettings";this.height=40;this.enabled=!0;this.color="#FFFFFF";this.updateOnReleaseOnly=this.autoGridCount=!0;this.hideResizeGrips=!1;this.position="bottom";this.minDistance=1;e.applyTheme(this,a,this.cname)}})})();(function(){var e=window.AmCharts;e.LegendSettings=e.Class({construct:function(a){this.cname="LegendSettings";this.marginBottom=this.marginTop=0;this.usePositiveNegativeOnPercentsOnly=!0;this.positiveValueColor="#00CC00";this.negativeValueColor="#CC0000";this.autoMargins=this.equalWidths=this.textClickEnabled=!1;e.applyTheme(this,a,this.cname)}})})();(function(){var e=window.AmCharts;e.PanelsSettings=e.Class({construct:function(a){this.cname="PanelsSettings";this.marginBottom=this.marginTop=this.marginRight=this.marginLeft=0;this.backgroundColor="#FFFFFF";this.backgroundAlpha=0;this.panelSpacing=8;this.panEventsEnabled=!0;this.creditsPosition="top-right";this.svgIcons=this.zoomOutAxes=!0;e.applyTheme(this,a,this.cname)}})})();(function(){var e=window.AmCharts;e.StockEventsSettings=e.Class({construct:function(a){this.cname="StockEventsSettings";this.type="sign";this.backgroundAlpha=1;this.backgroundColor="#DADADA";this.borderAlpha=1;this.borderColor="#888888";this.balloonColor=this.rollOverColor="#CC0000";e.applyTheme(this,a,this.cname)}})})();(function(){var e=window.AmCharts;e.ValueAxesSettings=e.Class({construct:function(a){this.cname="ValueAxesSettings";this.tickLength=0;this.showFirstLabel=this.autoGridCount=this.inside=!0;this.showLastLabel=!1;this.axisAlpha=0;e.applyTheme(this,a,this.cname)}})})();(function(){var e=window.AmCharts;e.getItemIndex=function(a,b){var c=-1,d;for(d=0;d<b.length;d++)a==b[d]&&(c=d);return c};e.addBr=function(a){a.appendChild(document.createElement("br"))};e.applyStyles=function(a,b){if(b&&a)for(var c in a){var d=c,e=b[d];if(void 0!==e)try{a[d]=e}catch(f){}}}})();(function(){var e=window.AmCharts;e.StockLegend=e.Class({inherits:e.AmLegend,construct:function(a){e.StockLegend.base.construct.call(this,a);this.cname="StockLegend";this.valueTextComparing="[[percents.value]]%";this.valueTextRegular="[[value]]";e.applyTheme(this,a,this.cname)},drawLegend:function(){var a=this;e.StockLegend.base.drawLegend.call(a);var b=a.chart;if(b.allowTurningOff){var c=a.container,d=c.image(b.pathToImages+"xIcon"+b.extension,b.realWidth-19,3,19,19),b=c.image(b.pathToImages+"xIconH"+
b.extension,b.realWidth-19,3,19,19);b.hide();a.xButtonHover=b;d.mouseup(function(){a.handleXClick()}).mouseover(function(){a.handleXOver()});b.mouseup(function(){a.handleXClick()}).mouseout(function(){a.handleXOut()})}},handleXOver:function(){this.xButtonHover.show()},handleXOut:function(){this.xButtonHover.hide()},handleXClick:function(){var a=this.chart,b=a.stockChart;b.removePanel(a);b.validateNow()}})})();(function(){var e=window.AmCharts;e.DataSetSelector=e.Class({construct:function(a){this.cname="DataSetSelector";this.theme=a;this.createEvents("dataSetSelected","dataSetCompared","dataSetUncompared");this.position="left";this.selectText="Select:";this.comboBoxSelectText="Select...";this.compareText="Compare to:";this.width=180;this.dataProvider=[];this.listHeight=150;this.listCheckBoxSize=14;this.rollOverBackgroundColor="#b2e1ff";this.selectedBackgroundColor="#7fceff";e.applyTheme(this,a,this.cname)},write:function(a){var b=this,c,d=b.theme,k=b.chart;a.className="amChartsDataSetSelector "+k.classNamePrefix+"-data-set-selector-div";var f=b.width;c=b.position;b.width=void 0;b.position=void 0;e.applyStyles(a.style,b);b.div=a;b.width=f;b.position=c;a.innerHTML="";var f=b.position,l;l="top"==f||"bottom"==f?!1:!0;b.vertical=l;var h;l&&(h=b.width+"px");var f=b.dataProvider,n,g;if(1<b.countDataSets("showInSelect")){c=document.createTextNode(k.langObj.selectText||b.selectText);a.appendChild(c);l&&e.addBr(a);var m=document.createElement("select");h&&(m.style.width=h);b.selectCB=m;d&&e.applyStyles(m.style,d.DataSetSelect);m.className=k.classNamePrefix+"-data-set-select";a.appendChild(m);e.isNN&&m.addEventListener("change",function(a){b.handleDataSetChange.call(b,a)},!0);e.isIE&&m.attachEvent("onchange",function(a){b.handleDataSetChange.call(b,a)});for(c=0;c<f.length;c++)if(n=f[c],!0===n.showInSelect){g=document.createElement("option");g.className=k.classNamePrefix+"-data-set-select-option";g.text=n.title;g.value=c;n==b.chart.mainDataSet&&(g.selected=!0);try{m.add(g,null)}catch(q){m.add(g)}}b.offsetHeight=m.offsetHeight}if(0<b.countDataSets("showInCompare")&&1<f.length)if(l?(e.addBr(a),e.addBr(a)):(c=document.createTextNode(" "),a.appendChild(c)),c=document.createTextNode(k.langObj.compareText||b.compareText),a.appendChild(c),g=b.listCheckBoxSize,l){e.addBr(a);h=document.createElement("div");a.appendChild(h);h.className="amChartsCompareList "+k.classNamePrefix+"-compare-div";d&&e.applyStyles(h.style,d.DataSetCompareList);h.style.overflow="auto";h.style.overflowX="hidden";h.style.width=b.width-2+"px";h.style.maxHeight=b.listHeight+"px";for(c=0;c<f.length;c++)n=f[c],!0===n.showInCompare&&n!=b.chart.mainDataSet&&(d=document.createElement("div"),d.style.padding="4px",d.style.position="relative",d.name="amCBContainer",d.className=k.classNamePrefix+"-compare-item-div",d.dataSet=n,d.style.height=g+"px",n.compared&&(d.style.backgroundColor=b.selectedBackgroundColor),h.appendChild(d),l=document.createElement("div"),l.style.width=g+"px",l.style.height=g+"px",l.style.position="absolute",l.style.backgroundColor=n.color,d.appendChild(l),l=document.createElement("div"),l.style.width="100%",l.style.position="absolute",l.style.left=g+10+"px",d.appendChild(l),n=document.createTextNode(n.title),l.style.whiteSpace="nowrap",l.style.cursor="default",l.appendChild(n),b.addEventListeners(d));e.addBr(a);e.addBr(a)}else{d=document.createElement("select");b.compareCB=d;h&&(d.style.width=h);a.appendChild(d);e.isNN&&d.addEventListener("change",function(a){b.handleCBSelect.call(b,a)},!0);e.isIE&&d.attachEvent("onchange",function(a){b.handleCBSelect.call(b,a)});g=document.createElement("option");g.text=k.langObj.comboBoxSelectText||b.comboBoxSelectText;try{d.add(g,null)}catch(q){d.add(g)}for(c=0;c<f.length;c++)if(n=f[c],!0===n.showInCompare&&n!=b.chart.mainDataSet){g=document.createElement("option");g.text=n.title;g.value=c;n.compared&&(g.selected=!0);try{d.add(g,null)}catch(q){d.add(g)}}b.offsetHeight=d.offsetHeight}},addEventListeners:function(a){var b=this;e.isNN&&(a.addEventListener("mouseover",function(a){b.handleRollOver.call(b,a)},!0),a.addEventListener("mouseout",function(a){b.handleRollOut.call(b,a)},!0),a.addEventListener("click",function(a){b.handleClick.call(b,a)},!0));e.isIE&&(a.attachEvent("onmouseout",function(a){b.handleRollOut.call(b,a)}),a.attachEvent("onmouseover",function(a){b.handleRollOver.call(b,a)}),a.attachEvent("onclick",function(a){b.handleClick.call(b,a)}))},handleDataSetChange:function(){var a=this.selectCB,a=this.dataProvider[a.options[a.selectedIndex].value],b=this.chart;b.mainDataSet=a;b.zoomOutOnDataSetChange&&(b.startDate=void 0,b.endDate=void 0);b.validateData(!0);this.fire({type:"dataSetSelected",dataSet:a,chart:this.chart})},handleRollOver:function(a){a=this.getRealDiv(a);a.dataSet.compared||(a.style.backgroundColor=this.rollOverBackgroundColor)},handleRollOut:function(a){a=this.getRealDiv(a);a.dataSet.compared||(a.style.removeProperty&&a.style.removeProperty("background-color"),a.style.removeAttribute&&a.style.removeAttribute("backgroundColor"))},handleCBSelect:function(a){var b=this.compareCB,c=this.dataProvider,d,e;for(d=0;d<c.length;d++)e=c[d],e.compared&&(a={type:"dataSetUncompared",dataSet:e}),e.compared=!1;c=b.selectedIndex;0<c&&(e=this.dataProvider[b.options[c].value],e.compared||(a={type:"dataSetCompared",dataSet:e}),e.compared=!0);b=this.chart;b.validateData(!0);a.chart=b;this.fire(a)},handleClick:function(a){a=this.getRealDiv(a).dataSet;!0===a.compared?(a.compared=!1,a={type:"dataSetUncompared",dataSet:a}):(a.compared=!0,a={type:"dataSetCompared",dataSet:a});var b=this.chart;b.validateData(!0);a.chart=b;this.fire(a)},getRealDiv:function(a){a||(a=window.event);a=a.currentTarget?a.currentTarget:a.srcElement;"amCBContainer"==a.parentNode.name&&(a=a.parentNode);return a},countDataSets:function(a){var b=this.dataProvider,c=0,d;for(d=0;d<b.length;d++)!0===b[d][a]&&c++;return c}})})();(function(){var e=window.AmCharts;e.StackedBullet=e.Class({construct:function(){this.stackDown=!1;this.mastHeight=8;this.shapes=[];this.backgroundColors=[];this.backgroundAlphas=[];this.borderAlphas=[];this.borderColors=[];this.colors=[];this.rollOverColors=[];this.showOnAxiss=[];this.values=[];this.showAts=[];this.textColor="#000000";this.nextY=0;this.size=16},parseConfig:function(){var a=this.bulletConfig;this.eventObjects=a.eventObjects;this.letters=a.letters;this.shapes=a.shapes;this.backgroundColors=a.backgroundColors;this.backgroundAlphas=a.backgroundAlphas;this.borderColors=a.borderColors;this.borderAlphas=a.borderAlphas;this.colors=a.colors;this.rollOverColors=a.rollOverColors;this.date=a.date;this.showOnAxiss=a.showOnAxis;this.axisCoordinate=a.minCoord;this.showAts=a.showAts;this.values=a.values;this.fontSizes=a.fontSizes;this.showBullets=a.showBullets},write:function(a){this.parseConfig();this.container=a;this.bullets=[];this.fontSize=this.chart.fontSize;if(this.graph){var b=this.graph.fontSize;b&&(this.fontSize=b)}b=this.letters.length;(this.mastHeight+2*(this.fontSize/2+2))*b>this.availableSpace&&(this.stackDown=!0);this.set=a.set();this.cset=a.set();this.set.push(this.cset);this.set.doNotScale=!0;a=0;var c;for(c=0;c<b;c++){this.shape=this.shapes[c];this.backgroundColor=this.backgroundColors[c];this.backgroundAlpha=this.backgroundAlphas[c];this.borderAlpha=this.borderAlphas[c];this.borderColor=this.borderColors[c];this.rollOverColor=this.rollOverColors[c];this.showOnAxis=this.showOnAxiss[c];this.showBullet=this.showBullets[c];this.color=this.colors[c];this.value=this.values[c];this.showAt=this.showAts[c];var d=this.fontSizes[c];isNaN(d)||(this.fontSize=d);this.addLetter(this.letters[c],a,c);this.showOnAxis||a++}},addLetter:function(a,b,c){var d=this.container;b=d.set();var k=-1,f=this.stackDown,l=this.graph.valueAxis;this.showOnAxis&&(this.stackDown=l.reversed?!0:!1);this.stackDown&&(k=1);var h=0,n=0,g=0,m,q=this.fontSize,t=this.mastHeight,p=this.shape,y=this.textColor;void 0!==this.color&&(y=this.color);void 0===a&&(a="");a=e.fixBrakes(a);a=e.text(d,a,y,this.chart.fontFamily,this.fontSize);a.node.style.pointerEvents="none";d=a.getBBox();this.labelWidth=y=d.width;this.labelHeight=d.height;var v,d=0;switch(p){case"sign":v=this.drawSign(b);h=t+4+q/2;d=t+q+4;1==k&&(h-=4);break;case"flag":v=this.drawFlag(b);n=y/2+3;h=t+4+q/2;d=t+q+4;1==k&&(h-=4);break;case"pin":v=this.drawPin(b);h=6+q/2;d=q+8;break;case"triangleUp":v=this.drawTriangleUp(b);h=-q-1;d=q+4;k=-1;break;case"triangleDown":v=this.drawTriangleDown(b);h=q+1;d=q+4;k=-1;break;case"triangleLeft":v=this.drawTriangleLeft(b);n=q;d=q+4;k=-1;break;case"triangleRight":v=this.drawTriangleRight(b);n=-q;k=-1;d=q+4;break;case"arrowUp":v=this.drawArrowUp(b);a.hide();break;case"arrowDown":v=this.drawArrowDown(b);a.hide();d=q+4;break;case"text":k=-1;v=this.drawTextBackground(b,a);h=this.labelHeight+3;d=q+10;break;case"round":v=this.drawCircle(b)}this.bullets[c]=v;this.showOnAxis?(m=isNaN(this.nextAxisY)?this.axisCoordinate:this.nextY,g=h*k,this.nextAxisY=m+k*d):this.value?(m=this.value,l.recalculateToPercents&&(m=m/l.recBaseValue*100-100),m=l.getCoordinate(m)-this.bulletY,g=h*k):this.showAt?(v=this.graphDataItem.values,l.recalculateToPercents&&(v=this.graphDataItem.percents),v&&(m=l.getCoordinate(v[this.showAt])-this.bulletY,g=h*k)):(m=this.nextY,g=h*k);a.translate(n,g);b.push(a);b.translate(0,m);this.addEventListeners(b,c);this.nextY=m+k*d;this.stackDown=f},addEventListeners:function(a,b){var c=this;a.click(function(){c.handleClick(b)}).mouseover(function(){c.handleMouseOver(b)}).touchend(function(){c.handleMouseOver(b,!0);c.handleClick(b);setTimeout(function(){c.handleMouseOut.call(c,b)},200)}).mouseout(function(){c.handleMouseOut(b)}).touchstart(function(){c.handleMouseOver(b)})},drawPin:function(a){var b=-1;this.stackDown&&(b=1);var c=this.fontSize+4;return this.drawRealPolygon(a,[0,c/2,c/2,-c/2,-c/2,0],[0,b*c/4,b*(c+c/4),b*(c+c/4),b*c/4,0])},drawSign:function(a){var b=-1;this.stackDown&&(b=1);var c=this.mastHeight*b,d=this.fontSize/2+2,k=e.line(this.container,[0,0],[0,c],this.borderColor,this.borderAlpha,1),f=e.circle(this.container,d,this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);f.translate(0,c+d*b);a.push(k);a.push(f);this.cset.push(a);return f},drawFlag:function(a){var b=-1;this.stackDown&&(b=1);var c=this.fontSize+4,d=this.labelWidth+6,k=this.mastHeight,b=1==b?b*k:b*k-c,k=e.line(this.container,[0,0],[0,b],this.borderColor,this.borderAlpha,1),c=e.polygon(this.container,[0,d,d,0],[0,0,c,c],this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);c.translate(0,b);a.push(k);a.push(c);this.cset.push(a);return c},drawTriangleUp:function(a){var b=this.fontSize+7;return this.drawRealPolygon(a,[0,b/2,-b/2,0],[0,b,b,0])},drawArrowUp:function(a){var b=this.size,c=b/2,d=b/4;return this.drawRealPolygon(a,[0,c,d,d,-d,-d,-c,0],[0,c,c,b,b,c,c,0])},drawArrowDown:function(a){var b=this.size,c=b/2,d=b/4;return this.drawRealPolygon(a,[0,c,d,d,-d,-d,-c,0],[0,-c,-c,-b,-b,-c,-c,0])},drawTriangleDown:function(a){var b=this.fontSize+7;return this.drawRealPolygon(a,[0,b/2,-b/2,0],[0,-b,-b,0])},drawTriangleLeft:function(a){var b=this.fontSize+7;return this.drawRealPolygon(a,[0,b,b,0],[0,-b/2,b/2,0])},drawTriangleRight:function(a){var b=this.fontSize+7;return this.drawRealPolygon(a,[0,-b,-b,0],[0,-b/2,b/2,0])},drawRealPolygon:function(a,b,c){b=e.polygon(this.container,b,c,this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);a.push(b);this.cset.push(a);return b},drawCircle:function(a){var b=e.circle(this.container,this.fontSize/2,this.backgroundColor,this.backgroundAlpha,1,this.borderColor,this.borderAlpha);a.push(b);this.cset.push(a);return b},drawTextBackground:function(a,b){var c=b.getBBox(),d=-c.width/2-5,e=c.width/2+5,c=-c.height-12;return this.drawRealPolygon(a,[d,-5,0,5,e,e,d,d],[-5,-5,0,-5,-5,c,c,-5])},handleMouseOver:function(a,b){b||this.bullets[a].attr({fill:this.rollOverColors[a]});var c=this.eventObjects[a],d={type:"rollOverStockEvent",eventObject:c,graph:this.graph,date:this.date},k=this.bulletConfig.eventDispatcher;d.chart=k;k.fire(d);c.url&&this.bullets[a].setAttr("cursor","pointer");d=this.chart;d.showBalloon(e.fixNewLines(c.description),k.stockEventsSettings.balloonColor,!0);c=d.graphs;for(k=0;k<c.length;k++)c[k].hideBalloon()},handleClick:function(a){a=this.eventObjects[a];var b={type:"clickStockEvent",eventObject:a,graph:this.graph,date:this.date},c=this.bulletConfig.eventDispatcher;b.chart=c;c.fire(b);b=a.urlTarget;b||(b=c.stockEventsSettings.urlTarget);e.getURL(a.url,b)},handleMouseOut:function(a){this.bullets[a].attr({fill:this.backgroundColors[a]});a={type:"rollOutStockEvent",eventObject:this.eventObjects[a],graph:this.graph,date:this.date};var b=this.bulletConfig.eventDispatcher;a.chart=b;this.chart.hideBalloonReal();b.fire(a)}})})();
//chartdiv
var chartData = [];
generateChartData();

function generateChartData() {
    var firstDate = new Date( 2012, 0, 1 );
    firstDate.setDate( firstDate.getDate() - 500 );
    firstDate.setHours( 0, 0, 0, 0 );

    for ( var i = 0; i < 500; i++ ) {
        var newDate = new Date( firstDate );
        newDate.setDate( newDate.getDate() + i );

        var a = Math.round( Math.random() * ( 40 + i ) ) + 100 + i;
        var b = Math.round( Math.random() * 100000000 );

        chartData.push( {
            "date": newDate,
            "value": a,
            "volume": b
        } );
    }
}

var chart = AmCharts.makeChart( "chartdiv", {
    "type": "stock",
    "theme": "light",
    "dataSets": [ {
        "color": "#b0de09",
        "fieldMappings": [ {
            "fromField": "value",
            "toField": "value"
        }, {
            "fromField": "volume",
            "toField": "volume"
        } ],
        "dataProvider": chartData,
        "categoryField": "date",
        // EVENTS
        "stockEvents": [ {
            "date": new Date( 2010, 8, 19 ),
            "type": "sign",
            "backgroundColor": "#85CDE6",
            "graph": "g1",
            "text": "S",
            "description": "This is description of an event"
        }, {
            "date": new Date( 2010, 10, 19 ),
            "type": "flag",
            "backgroundColor": "#FFFFFF",
            "backgroundAlpha": 0.5,
            "graph": "g1",
            "text": "F",
            "description": "Some longer\ntext can also\n be added"
        }, {
            "date": new Date( 2010, 11, 10 ),
            "showOnAxis": true,
            "backgroundColor": "#85CDE6",
            "type": "pin",
            "text": "X",
            "graph": "g1",
            "description": "This is description of an event"
        }, {
            "date": new Date( 2010, 11, 26 ),
            "showOnAxis": true,
            "backgroundColor": "#85CDE6",
            "type": "pin",
            "text": "Z",
            "graph": "g1",
            "description": "This is description of an event"
        }, {
            "date": new Date( 2011, 0, 3 ),
            "type": "sign",
            "backgroundColor": "#85CDE6",
            "graph": "g1",
            "text": "U",
            "description": "This is description of an event"
        }, {
            "date": new Date( 2011, 1, 6 ),
            "type": "sign",
            "graph": "g1",
            "text": "D",
            "description": "This is description of an event"
        }, {
            "date": new Date( 2011, 3, 5 ),
            "type": "sign",
            "graph": "g1",
            "text": "L",
            "description": "This is description of an event"
        }, {
            "date": new Date( 2011, 3, 5 ),
            "type": "sign",
            "graph": "g1",
            "text": "R",
            "description": "This is description of an event"
        }, {
            "date": new Date( 2011, 5, 15 ),
            "type": "arrowUp",
            "backgroundColor": "#00CC00",
            "graph": "g1",
            "description": "This is description of an event"
        }, {
            "date": new Date( 2011, 6, 25 ),
            "type": "arrowDown",
            "backgroundColor": "#CC0000",
            "graph": "g1",
            "description": "This is description of an event"
        }, {
            "date": new Date( 2011, 8, 1 ),
            "type": "text",
            "graph": "g1",
            "text": "Longer text can\nalso be displayed",
            "description": "This is description of an event"
        } ]
    } ],


    "panels": [ {
        "title": "Value",
        "stockGraphs": [ {
            "id": "g1",
            "valueField": "value"
        } ],
        "stockLegend": {
            "valueTextRegular": " ",
            "markerType": "none"
        }
    } ],

    "chartScrollbarSettings": {
        "graph": "g1"
    },

    "chartCursorSettings": {
        "valueBalloonsEnabled": true,
        "graphBulletSize": 1,
        "valueLineBalloonEnabled": true,
        "valueLineEnabled": true,
        "valueLineAlpha": 0.5
    },

    "periodSelector": {
        "periods": [ {
            "period": "DD",
            "count": 10,
            "label": "10 days"
        }, {
            "period": "MM",
            "count": 1,
            "label": "1 month"
        }, {
            "period": "YYYY",
            "count": 1,
            "label": "1 year"
        }, {
            "period": "YTD",
            "label": "YTD"
        }, {
            "period": "MAX",
            "label": "MAX"
        } ]
    },

    "panelsSettings": {
        "usePrefixes": true
    },
    "export": {
        "enabled": true
    }
} );