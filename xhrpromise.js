"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var XhrPromise = function () {
	_createClass(XhrPromise, null, [{
		key: "create",
		value: function create(options) {
			return new XhrPromise(options);
		}
	}]);

	function XhrPromise(options) {
		_classCallCheck(this, XhrPromise);

		var p = this;
		this.promise = new Promise(function (resolve, reject) {
			p.executor(resolve, reject);
		});
	}

	_createClass(XhrPromise, [{
		key: "executor",
		value: function executor(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open(options.method, options.url);
			for (var h in options.headers) {
				if (options.headers.hasOwnProperty(h)) {
					xhr.setRequestHeader(h, options.headers[h]);
				}
			}
			xhr.onload = function () {
				if (this.readyState != 4) {
					return;
				}
				if (this.status >= 200 && this.status < 300) {
					resolve(this.responseText);
				} else {
					reject({
						status: this.status,
						statusText: this.statusText
					});
				}
			};
			xhr.onreadystatechange = function () {
				if (this.status == 0) {
					reject(REJECT_RESPONSE);
				};
			};
			xhr.onerror = function () {
				reject({
					status: this.status,
					statusText: this.statusText
				});
			};
			xhr.onabort = function () {
				reject(REJECT_RESPONSE);
			};
			xhr.send();
		}
	}, {
		key: "cancel",
		value: function cancel() {
			this.abort();
		}
	}, {
		key: "abort",
		value: function abort() {
			this.xhr.abort();
		}
	}, {
		key: "then",
		value: function then(a, b) {
			return this.promise.then(a, b);
		}
	}], [{
		key: "REJECT_RESPONSE",
		get: function get() {
			return {
				status: -1,
				statusText: "Canceled"
			};
		}
	}]);

	return XhrPromise;
}();

exports.default = XhrPromise;
module.exports = exports['default'];
