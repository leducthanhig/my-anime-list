import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItems } from "../handlers/getItems";
import GridList from "../components/GridList";

export default function Season() {
    const [title, setTitle] = useState('');
    const [data, setData] = useState({ items: '', totalPage: 0 });
    const { year, season } = useParams();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const page = Math.max(Number(params.get('page')), 1);
    const navigate = new useNavigate();

    const goToSeason = (e) => {
        e.preventDefault();
        navigate(`/season/${e.currentTarget.querySelector('input').value}/${e.currentTarget.querySelector('select').value.toLowerCase()}`);
    };

    useEffect(() => {
        if (year && season) {
            getItems.getSeason(year, season, page)
                .then(res => {
                    setTitle(season[0].toUpperCase() + season.slice(1) + ' ' + year);
                    if (res.data.length) {
                        setData({ items: res.data, totalPage: res.totalPage });
                    }
                    else {
                        setData({ items: <><br></br>Not found!</>, totalPage: 0 });
                    }
                });
        }
        else {
            getItems.getCurrentSeason(page)
                .then(res => {
                    setTitle(res.seasonName[0].toUpperCase() + res.seasonName.slice(1));
                    if (res.data.length) {
                        setData({ items: res.data, totalPage: res.totalPage });
                    }
                    else {
                        setData({ items: <><br></br>Not found!</>, totalPage: 0 });
                    }
                });
        }
    }, [year, season, page]);

    return <>
        <form className="season-options" onSubmit={goToSeason}>
            <label>Jump to</label>
            <select>
                <option>Winter</option>
                <option>Spring</option>
                <option>Summer</option>
                <option>Fall</option>
            </select>
            <input type="number" min={1917} max={2100} placeholder="Year"></input>
            <button type="submit">Go</button>
        </form>
        <GridList title={title} data={data} />
    </>;
};