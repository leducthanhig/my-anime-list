import { useEffect, useState } from "react";
import { getItems } from "../handlers/getItems";
import InlineList from "../components/InlineList";
import BlockList from "../components/BlockList";

export default function Home() {
    const [titles, setTitles] = useState(Array(3).fill(''));
    const [data, setData] = useState(Array(3).fill([]));
    const [urls, setUrls] = useState(Array(3).fill(''));

    useEffect(() => {
        Promise.all([
            getItems.getCurrentSeason(),
            getItems.getUpcomingSeason(),
            getItems.getTopByFilter('airing', 1, 5)
        ])
        .then(res => {
            setTitles([res[0].seasonName, 'upcoming season', 'top airing']);
            setData(res.map(res => res.data));
            setUrls(['/season', `/season/${res[1].seasonName.split(' ').reverse().join('/')}`, '/top?filter=airing']);
        });
    }, []);
    
    return (<>
        <div className="col">
            <InlineList title={titles[0]} data={data[0]} url={urls[0]} />
            <InlineList title={titles[1]} data={data[1]} url={urls[1]} />
        </div>
        <div className="col">
            <BlockList title={titles[2]} data={data[2]} url={urls[2]} />
        </div>
    </>);
};