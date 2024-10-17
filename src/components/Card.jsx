export default function Card({ url, image_url, title }) {
    return (
        <a className="card" href={url} title={title}>
            <form>
                <button title="Save to favorite list" type="submit">
                    <i className="fa fa-bookmark-o" aria-hidden="true"></i>
                </button>
            </form>
            <img className="thumbnail" src={image_url}></img>
            <h3 className="title">{title}</h3>
        </a>
    );
};