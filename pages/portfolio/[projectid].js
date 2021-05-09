import {useRouter} from 'next/router';  // use withRouter for class based

function PortfolioProjectPage() {
    const router = useRouter();

    console.log(router.pathname);
    console.log(router.query);  // gives us data from path (projectid)
    // Can send request to backend server
    // Fetch data with id of router.query.projectid

    return (
        <div>
            <h1>The Portfolio Project Page</h1>
        </div>
    );
}

export default PortfolioProjectPage;
