export default function InlineList({ url, title, data }) {
    return (
        <div className="inline-container">
            <div className="container-header">
                <h3>{title}</h3>
                <a href={url}>View all</a>
            </div>
            <div className="inline-container-list">
                {data}
                <button className="scroll-to-right" onClick={(e) => { e.currentTarget.parentElement.scrollLeft -= e.currentTarget.parentElement.clientWidth }}></button>
                <button className="scroll-to-left" onClick={(e) => { e.currentTarget.parentElement.scrollLeft += e.currentTarget.parentElement.clientWidth }}></button>
            </div>
        </div>
    );
};