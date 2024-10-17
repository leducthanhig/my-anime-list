import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    const navigate = new useNavigate();
    
    const formSubmit = (e) => {
        e.preventDefault();
        const searchValue = e.currentTarget.firstChild.value.trim();
        
        if (searchValue) {
            e.currentTarget.firstChild.value = '';
            navigate(`/search?q=${searchValue}`);
        }
    }
    
    return (<>
        <form id="form" onSubmit={formSubmit}>
            <input type="search" id="query" name="q" list="search-history" placeholder="Search..." spellCheck="false"></input>
            <button type="submit" id="submit-button">
                <i className="fa fa-search"></i>
            </button>
            <datalist id="search-history"></datalist>
        </form>
    </>);
};