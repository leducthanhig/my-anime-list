import PageNavigator from "./PageNavigator";

export default function GridList({ title, data }) {
    return (
        <div className="grid-container">
            <h2 className="grid-container-title">{title}</h2>
            <div className="grid-container-body">{data.items}</div>
            <PageNavigator totalPage={data.totalPage} />
        </div>
    );
};