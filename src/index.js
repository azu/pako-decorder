const pako = require("pako");
const url = require("url");
new Vue({
    el: '#js-main',
    data: {
        message: "",
    },
    computed: {
        compiled: vm => {
            try {
                const urlString = vm.message;
                const parsed = url.parse(urlString, true);
                const d = parsed.query && parsed.query.d ? parsed.query.d : urlString;
                const decoded = pako.inflate(new Buffer(d, 'base64'), {to: 'string'});
                return JSON.stringify(JSON.parse(decoded), null, 4);
            } catch (error) {
                console.error(error);
                return error;
            }
        }
    }
});
