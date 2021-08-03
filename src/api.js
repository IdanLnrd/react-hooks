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
    const get = async (path, query = '') => {
        const res = await fetch(`${host}/${path}?${query}`);
        return await res.json();
    }

    const del = async path => {
        const res = await fetch(`${host}/${path}`, { method: 'delete' });
        return await res.json();
    }

    const write = async data => {
        console.log('[write] data:', data);
        const result = await post('write/skilleval', data);
        console.log('[write] result:', result);
        return result;
    }

    const read = async query => {
        console.log('read: ', query);
        const { tags } = query;
        const qs = `${tags && tags.length > 0 ? 'tags=' + tags.join(',') : ''}`;
        const result = await get(`read/skillevals`, qs);
        return result;
    }

    const delSkill = async id => {
        if(!id) { return; }
        const result = await del('delete/skillevals/' + id);
        return result; 
    }

    return {
        create: async skilleval => {
          return await write({ skilleval });
        },
        delete: async id => {
            return await delSkill(id);
        },
        update: async skilleval => {
            return await write({ skilleval });
        },
        read: async (query) => {
            return await read(query);
        },
        data: async () => {
            const res = await fetch('http://localhost:4000/SearchTermsTable.json');
            return await res.json();
        }
    };
})();

export default api;