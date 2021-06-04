function UserIdPage(props) {
    return <h1>{props.id}</h1>
}

export default UserIdPage;

export async function getServerSideProps(context) {
    const {params} = context;

    // We don't need to use getStaticPaths because this always runs on the server and we don't need pre-generation of pages
    const userId = params.uid;

    return {
        props: {
            id: 'uiserid-' + userId
        }
    }
}