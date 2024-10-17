import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import SwitchButton from "./SwitchButton";

export default function Header({ title }) {
    const routes = ['top', 'season', 'reviews', 'recommendations', 'favorites'].map((route, idx) => <AnchorRoute key={idx} name={route} />);

    return (
        <header>
            <a id="homepage" href="/">{title}</a>
            <div id="nav-container">
                <ul id="nav">{routes}</ul>
                <SearchBar />
                <SwitchButton />
            </div>
            <div id="toggle-menu">
                <input type="checkbox"></input>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </header>
    );
};

function AnchorRoute({ name }) {
    const pathname = useLocation().pathname.split('/')[1];
    return <li><a className={pathname == name ? 'active' : ''} href={`/${name}`}>{name[0].toUpperCase() + name.slice(1)}</a></li>
}