import Card from "../components/Card";
import CardH from "../components/CardH";

const APIURL = 'https://api.jikan.moe/v4';
const LIMIT = 24;

export const getItems = {
    getCurrentSeason: async (page = 1, limit = LIMIT) => {
        const response = await fetch(`${APIURL}/seasons/now?sfw&page=${page}&limit=${limit}`);
        const response_json = await response.json();
        return {
            seasonName: getSeasonName(response_json.data),
            data: response_json.data.map((item, idx) => <Card url={item.url} image_url={item.images.webp.large_image_url} title={item.titles[0].title} key={idx} />),
            totalPage: response_json.pagination.last_visible_page
        };
    },
    
    getUpcomingSeason: async (page = 1, limit = LIMIT) => {
        const response = await fetch(`${APIURL}/seasons/upcoming?sfw&page=${page}&limit=${limit}`);
        const response_json = await response.json();
        return {
            seasonName: getSeasonName(response_json.data),
            data: response_json.data.map((item, idx) => <Card url={item.url} image_url={item.images.webp.large_image_url} title={item.titles[0].title} key={idx} />),
            totalPage: response_json.pagination.last_visible_page
        };
    },
    
    getSeason: async (year, season, page = 1, limit = LIMIT) => {
        const response = await fetch(`${APIURL}/seasons/${year}/${season}?sfw&page=${page}&limit=${limit}`);
        const response_json = await response.json();
        return {
            data: response_json.data.map((item, idx) => <Card url={item.url} image_url={item.images.webp.large_image_url} title={item.titles[0].title} key={idx} />),
            totalPage: response_json.pagination.last_visible_page
        };
    },
    
    getTopByFilter: async (filter = 'bypopularity', page = 1, limit = LIMIT) => {
        const response = await fetch(`${APIURL}/top/anime?sfw&filter=${filter}&page=${page}&limit=${Math.min(25, limit + 16)}`);
        const response_json = await response.json();
        const data = response_json.data.filter(item => !['CM', 'PV', 'Music'].includes(item.type)).slice(0, limit);
        return {
            data: data.map((item, idx) => <CardH url={item.url} image_url={item.images.webp.large_image_url} title={item.titles[0].title} type={item.type} score={item.score} key={idx} />),
            totalPage: response_json.pagination.last_visible_page
        };
    },

    getSearchResults: async (query, page = 1, limit = LIMIT) => {
        const response = await fetch(`${APIURL}/anime?sfw&q=${query}&page=${page}&limit=${limit}`);
        const response_json = await response.json();
        return {
            data: response_json.data.map((item, idx) => <Card url={item.url} image_url={item.images.webp.large_image_url} title={item.titles[0].title} key={idx} />),
            totalPage: response_json.pagination.last_visible_page
        };
    }
};

function getSeasonName(data) {
    const item = data.filter(item => item.season != null && item.year != null)[0];
    return item.season + ' ' + item.year;
}