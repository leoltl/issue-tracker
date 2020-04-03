import Request from '@/request';
import { reactive, toRefs } from '@vue/composition-api'

function useRemoteData(path, options={}) {
    const data = reactive({
        response: [],
        errors: [],
        isLoading: false
    })
    const { method, ..._options } = options
    const _method = method.toLowerCase() || 'get';

    async function request(payload={}, callback=null) {
        let _payload
        //TODO handle other dataTypes
        if (typeof payload == 'string' || typeof payload == 'number' || Array.isArray(payload)) {
            _payload = { data: payload }
        } else {
            _payload = Object.assign({}, payload)
        }
        try {
            data.isLoading = true
            const response = await Request[_method](path, Object.assign(_options, _payload))
            data.response = response.data;
            callback && callback()
        } catch (e){
            callback && callback(e)
            data.errors = e
        } finally {
            data.isLoading = false
        }
    }

    return {
        ...toRefs(data),
        request,
    }
}

export default useRemoteData;