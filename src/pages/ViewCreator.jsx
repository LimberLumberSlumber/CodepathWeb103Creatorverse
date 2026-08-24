import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

function ViewCreator() {
    const { id } = useParams(); // get id from url
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchCreator = async () => {
        try {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching creator:', error.message);
                setError(error.message);
            } else {
                setCreator(data);
            }
        } catch (err) {
            console.error('Unexpected error:', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchCreator();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !creator) {
        return <div>Creator not found or error: {error}</div>;
    }

    return (
        <div className="view-creator-page">
            <h1>{creator.name}</h1>
            
            {creator.imageURL && (
                <img
                    src={creator.imageURL}
                    alt={creator.name}
                    className="creator-detail-image"
                />
            )}
            
            <p><strong>Description:</strong> {creator.description}</p>
            <p>
                <strong>Channel:</strong>{' '}
                <a href={creator.url} target="_blank" rel="noopener noreferrer">
                    {creator.url}
                </a>
            </p>
            
            <div className="creator-actions">
                <Link to="/">Back to All Creators</Link>
                <span> | </span>
                <Link to={`/edit/${creator.id}`}>Edit Creator</Link>
            </div>
        </div>
    );
}

export default ViewCreator;