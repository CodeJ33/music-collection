import axios from 'axios';

const API_URL = 'https://api.discogs.com';
const API_KEY = process.env.REACT_APP_DISCOGS_API_KEY;

const getCollection = async (username, page = 1, per_page = 50) => {
    try {
        const response = await axios.get(`${API_URL}/users/${username}/collection/folders/0/releases`, {
            headers: {
                'Authorization': `Discogs token=${API_KEY}`
            },
            params: {
                page: page,
                per_page: per_page
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from Discogs API', error);
        throw error;
    }
};

const discogsService = {
    getCollection
};

export default discogsService;
