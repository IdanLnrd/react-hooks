const api = (function() {
    const host = 'http://localhost:4000/api';
    const postReq = {
        headers: { 'Content-Type' : 'application/json' },
        method: 'post'
    };
    const post = async (path, data) => {
        const body = JSON.stringify(data);
        const res = await fetch(`${host}/${path}`, { ...postReq, body });
        return await res.json();
    }
    const get = async (path, query) => {
        const res = await fetch(`${host}/${path}?${query}`);
        return await res.json();
    }

    const write = async data => {
        const result = await post('write/skilleval', data);
        return result;
    }

    const read = async data => {
        const result = await get('read/skillevals', '');
        return result;
    }

    return {
        create: async newskill => {
          return await write(newskill);
        },
        delete: async id => {

        },
        update: async skill => {
            return await write(skill);
        },
        read: async id => {
            return await read(id ? { id } : {});
        }
    };
})();

export default api;