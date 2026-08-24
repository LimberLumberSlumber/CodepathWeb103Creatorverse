import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

function EditCreator() {
    const { id } = useParams(); // Get id from url
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        description: '',
        imageURL: ''
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Get creator data when component mounts
    useEffect(() => {
        const fetchCreator = async () => {
            try {
                const { data, error } = await supabase
                    .from('creators')
                    .select('*');

                if (error) {
                    console.error('Error fetching creator:', error.message);
                    setError(error.message);
                } else {
                    const filtered = data.filter(creator => creator.id == id);
                    if (filtered.length > 0) {
                        setFormData(filtered[0]);
                    }
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const { error } = await supabase
                .from('creators')
                .update(formData)
                .eq('id', id);

            if (error) {
                console.error('Error updating creator:', error.message);
                setError(error.message);
            } else {
                navigate(`/creators/${id}`); // Redirect to creator page
            }
        } catch (err) {
            console.error('Unexpected error:', err.message);
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this creator?');
        
        if (!confirmDelete) return;

        setSubmitting(true);
        setError(null);

        try {
            const { error } = await supabase
                .from('creators')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting creator:', error.message);
                setError(error.message);
            } else {
                navigate('/'); // Redirect to homepage after deletion
            }
        } catch (err) {
            console.error('Unexpected error:', err.message);
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-creator-page">
            <h1>Edit Creator</h1>
        
            {error && <div className="error-message">{error}</div>}
        
            <form onSubmit={handleSubmit} className="creator-form">
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="url">URL (Channel Link) *</label>
                    <input
                        type="url"
                        id="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageURL">Image URL (Optional)</label>
                    <input
                        type="url"
                        id="imageURL"
                        name="imageURL"
                        value={formData.imageURL}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={submitting}>
                        {submitting ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button 
                        type="button" 
                        onClick={handleDelete} 
                        disabled={submitting}
                        className="delete-btn"
                    >
                        {submitting ? 'Deleting...' : 'Delete Creator'}
                    </button>
                    <Link to={`/creators/${id}`}>Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export default EditCreator;