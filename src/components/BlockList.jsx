export default function BlockList({ url, title, data }) {
    return (
        <div className="block-container">
            <div className="container-header">
                <h3>{title}</h3>
                <a href={url}>View all</a>
            </div>
            <ul>{data}</ul>
        </div>
    );
};