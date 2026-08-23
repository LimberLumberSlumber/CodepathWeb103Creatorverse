function CreatorCard({ creator }) {
    return (
        <div className="creator-card">
            <h3>{creator.name}</h3>
            <p>{creator.description}</p>
            <a href={creator.url} target="_blank">View Channel</a>
        </div>
    );
}
export default CreatorCard;