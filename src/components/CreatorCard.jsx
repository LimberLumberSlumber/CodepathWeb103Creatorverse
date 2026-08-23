import { Link } from 'react-router-dom';

function CreatorCard({ creator }) {
    return (
        <div className="creator-card">
            {creator.imageURL && (
                <img
                src={creator.imageURL}
                alt={creator.name}
                className="creator-image"
                />
            )}
            <h3>{creator.name}</h3>
            <p>{creator.description}</p>
            <a href={creator.url} target="_blank" rel="noopener noreferrer">
                Visit Channel
            </a>
            <br/>
            <Link to={`/creators/${creator.id}`}>
                View Details
            </Link>
        </div>
    );
}
export default CreatorCard;