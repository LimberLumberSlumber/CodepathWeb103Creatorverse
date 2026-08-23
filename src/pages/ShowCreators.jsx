// function ShowCreators() {
//     return <h1>All Creators</h1>;
// }
// export default ShowCreators;



// mock data test version below
import CreatorCard from '../components/CreatorCard';

function ShowCreators() {
    const testCreator = {
        id: 1,
        name: 'Test Creator',
        url: 'https://youtube.com/test',
        description: 'This is a test description',
        imageURL: 'https://www.codepath.org/hubfs/codepath-1x1_solid-dark-1.png'
    };

    return (
        <div>
                <h1>All Creators</h1>
                <CreatorCard creator={testCreator}/>
        </div>
    );
}

export default ShowCreators;