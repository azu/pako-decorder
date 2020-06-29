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
                const inputBody = vm.message;
                if (!inputBody) {
                    return "";
                }
                try {
                    const parsed = url.parse(inputBody, true);
                    const payload = parsed.query && parsed.query.d ? parsed.query.d : inputBody;
                    const decoded = pako.inflate(new Buffer(payload, 'base64'), { to: 'string' });
                    return JSON.stringify(JSON.parse(decoded), null, 4);
                } catch {
                    // try decode
                    const payload = decodeURIComponent(inputBody);
                    console.log(payload);
                    const decoded = pako.inflate(new Buffer(payload, 'base64'), { to: 'string' });
                    return JSON.stringify(JSON.parse(decoded), null, 4);
                }
            } catch (error) {
                console.error(error);
                return error;
            }
        }
    }
});
