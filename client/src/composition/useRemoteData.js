import APIrequest from '@/request';
import { reactive, toRefs } from '@vue/composition-api'

function useRemoteData(path, options={}) {
    const data = reactive({
        response: [],
        errors: [],
        isLoading: false
    })
    const { method, ..._options } = options
    const _method = method.toLowerCase() || 'get';

    async function request(payload={}, callback=[]) {
        let _payload
        //TODO handle other dataTypes
        if (typeof payload == 'string' || typeof payload == 'number' || Array.isArray(payload)) {
            _payload = { data: payload }
        } else {
            _payload = Object.assign({}, payload)
        }
        let _callback = typeof callback == 'function' ? [callback] : callback
        try {
            data.isLoading = true
            const requestOptions = Object.assign(_options, _payload)
            const response = await APIrequest[_method](path, requestOptions)
            data.response = response.data;
            if (_callback.length) {
                _callback.forEach(cb => cb())
            }
        } catch (err){
            if (_callback.length) {
                _callback.forEach(cb => cb(err))
            }
            data.errors = err
        } finally {
            data.isLoading = false
        }
    }

    return {
        data,
        ...toRefs(data),
        request,
    }
}

export default useRemoteData;