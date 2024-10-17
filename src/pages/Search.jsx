import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItems } from "../handlers/getItems";
import GridList from "../components/GridList";

export default function Search() {
    const [title, setTitle] = useState('');
    const [data, setData] = useState({ items: <><br></br>Searching...</>, totalPage: 0 });
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const query = params.get('q');
    const page = Math.max(Number(params.get('page')), 1);

    useEffect(() => {
        getItems.getSearchResults(query || '', page)
            .then(res => {
                if (query) setTitle(`Search results for "${query}"`);
                if (res.data.length) {
                    setData({ items: res.data, totalPage: res.totalPage });
                }
                else {
                    setData({ items: <><br></br>Not found!</>, totalPage: 0 });
                }
            });
    }, [query, page]);

    return <GridList title={title} data={data} />;
};