// function ShowCreators() {
//     return <h1>All Creators</h1>;
// }
// export default ShowCreators;



// mock data test version below
// import CreatorCard from '../components/CreatorCard';

// function ShowCreators() {
//     const testCreator = {
//         id: 1,
//         name: 'Test Creator',
//         url: 'https://youtube.com/test',
//         description: 'This is a test description',
//         imageURL: 'https://www.codepath.org/hubfs/codepath-1x1_solid-dark-1.png'
//     };

//     return (
//         <div>
//                 <h1>All Creators</h1>
//                 <CreatorCard creator={testCreator}/>
//         </div>
//     );
// }

// export default ShowCreators;




import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import CreatorCard from '../components/CreatorCard';

function ShowCreators() {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchCreators = async () => {
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

    fetchCreators();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading creators: {error}</div>;
    }

    return (
    <div className="show-creators-page">
        <h1>My Creatorverse</h1>
        
        <Link to="/add" className="add-creator-button">+ Add New Creator</Link>

        {creators.length === 0 ? (
        <p>No content creators added yet.</p>
        ) : (
        <div className="creators-list">
            {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
            ))}
        </div>
        )}
    </div>
    );
}

export default ShowCreators;