export default function CardH({ url, image_url, title, type, score }) {
    return (
        <li className="card-h">
            <a href={url}>
                <img className="thumbnail" src={image_url}></img>
            </a>
            <div>
                <a href={url}>{title}</a>
                <p>{`${type || 'Unknown'}, scored ${score || 'N/A'}`}</p>
            </div>
            <button>
                <i className="fa fa-bookmark-o" aria-hidden="true"></i>
            </button>
        </li>
    );
};