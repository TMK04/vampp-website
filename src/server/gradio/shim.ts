/* eslint-disable @typescript-eslint/no-explicit-any */
import _EventSource from "eventsource";

/**
 * Creates a new EventSource object
 *
 * @param {String} url the URL to which to connect
 * @param {Object} [eventSourceInitDict] extra init params. See README for details.
 * @api public
 **/
function EventSource(url: string, eventSourceInitDict: any) {
	return new _EventSource(url.toString(), eventSourceInitDict);
}
for (const key in _EventSource) {
	Object.defineProperty(EventSource, key, {
		enumerable: true,
		value: _EventSource[key as keyof typeof _EventSource]
	});
}

Object.defineProperty(globalThis, "EventSource", {
	enumerable: true,
	writable: true,
	configurable: true,
	value: EventSource
});
