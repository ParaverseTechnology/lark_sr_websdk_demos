import axios from 'axios';
import store from '../store';

const CODE_SUCCESS = 1000;

class Fetch {
    /**
     * get data
     * @api string api base without host.
     * @data object data
     * @header object header
     */
    async Get(api, data) {
        const res = await axios.get(store.state.Host + "/" + api, { params: data });
        if (res.data) {
            if (res.data.code == CODE_SUCCESS) {
                return res.data.result;
            } else {
                throw res.data.message;
            }
        } else {
            throw res;
        }
    }
    /**
     * post data
     * @api string api base without host.
     * @data object data
     * @header object header
     */
     async asyncPost(api, data) {
        const requUrl = store.state.Host + "/" + api;
        const res = await axios.post(requUrl, data);
        if (res.data) {
            if (res.data.code == CODE_SUCCESS) {
                return res.data.result;
            } else {
                throw res.data.message;
            }
        } else {
            throw res;
        }
    }
    ToWebClientUrl(params) {
        return encodeURIComponent(store.state.Host + "/webclient?" + joinParam(params));
    }

}

function joinParam(params) {
    var res = '';
    for (const i in params) {
        if (i) {
            res += i + '=' + params[i] + '&';
        }
    }
    return res;
}

const FetchInstance = new Fetch();
export default FetchInstance;