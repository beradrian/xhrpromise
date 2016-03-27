export default class XhrPromise {
	static create(options) {
		return new XhrPromise(options);
	}

	constructor(options) {
		this.options = options;
		this.promise = new Promise(this.executor.bind(this));
	}

	executor(resolve, reject) {
		var xhr = new XMLHttpRequest();
		this.xhr = xhr;
		xhr.open(this.options.method, this.options.url);
		for (var h in this.options.headers) {
			if (this.options.headers.hasOwnProperty(h)) {
				xhr.setRequestHeader(h, this.options.headers[h]);
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
		xhr.onreadystatechange = function() {
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

	cancel() {
		this.abort();
	};

	abort() {
		this.xhr.abort();
	};

	then(a, b) {
		return this.promise.then(a, b);
	}

	static get REJECT_RESPONSE() {
		return {
			status: -1,
			statusText: "Canceled"
		};
	}

}
