import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';

function AddCreator() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        description: '',
        imageURL: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from('creators')
                .insert([formData])
                .select();

            if (error) {
                console.error('Error adding creator:', error.message);
                setError(error.message);
            } else {
                console.log('Creator added:', data);
                navigate('/'); // redirects to homepage after successful add
            }
        } catch (err) {
            console.error('Unexpected error:', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-creator-page">
            <h1>Add New Creator</h1>
        
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
                    <button type="submit" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Creator'}
                    </button>
                    <Link to="/">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export default AddCreator;