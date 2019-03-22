import axios from 'axios';

export default (endpoint: string, data?: any) => {
    const baseUrl = '/.netlify/functions';
    const slug = 'sharer-link-cache-' + endpoint + JSON.stringify(data);
    return new Promise((resolve, reject) => {
        if (localStorage.getItem(slug)) {
            resolve(JSON.parse(localStorage.getItem(slug) as any));
        } else {
            axios.get('https://cors-anywhere.herokuapp.com/' + endpoint, {
                headers: {
                    'x-requested-with': 'sharer.link',
                },
            }).then((response: any) => {
                localStorage.setItem(slug, JSON.stringify(response.data.results));
                resolve(response.data.results);
            }).catch((error) => {
                reject(error);
            });
        }
    });
};
