import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../client';

function ViewCreator() {
    const { id } = useParams(); // Get id from url
    const [creators, setCreators] = useState([]);
    const [selectedCreator, setSelectedCreator] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllCreators = async () => {
        try {
            const { data, error } = await supabase
                .from('creators')
                .select('*');

            if (error) {
                console.error('Error fetching creators:', error.message);
                setError(error.message);
            } else {
                setCreators(data || []);
            }
        } catch (err) {
            console.error('Unexpected error:', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        fetchAllCreators();
    }, []);

    // Use filter() to find the specific creator by id
    useEffect(() => {
        if (creators.length > 0 && id) {
            const filtered = creators.filter(creator => creator.id == id);
        if (filtered.length > 0) {
            setSelectedCreator(filtered[0]);
        } else {
            setSelectedCreator(null);
        }
        }
    }, [id, creators]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading creators: {error}</div>;
    }

    if (!selectedCreator) {
        return <div>Creator not found. <Link to="/">Return Home</Link></div>;
    }

    return (
        <div className="view-creator-page">
            <h1>{selectedCreator.name}</h1>
            
            {selectedCreator.imageURL && (
                <img
                    src={selectedCreator.imageURL}
                    alt={selectedCreator.name}
                    className="creator-detail-image"
                />
            )}
            
            <p><strong>Description:</strong> {selectedCreator.description}</p>
            <p>
                <strong>Channel:</strong>{' '}
                <a href={selectedCreator.url} target="_blank" rel="noopener noreferrer">
                    {selectedCreator.url}
                </a>
            </p>
            
            <div className="creator-actions">
                <Link to="/">Back to All Creators</Link>
                <span> | </span>
                <Link to={`/edit/${selectedCreator.id}`}>Edit Creator</Link>
            </div>
        </div>
    );
}

export default ViewCreator;