function UserProfilePage(props) {
    return <h1>{props.username}</h1>
}

export default UserProfilePage;

// Called for every incoming request.
// Only executes after deployment, no pre-rendering. And also must be triggered by user
export async function getServerSideProps(context) {
    return {
        props: {
            username: 'Josh'
        }
    }
}
