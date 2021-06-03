import {Fragment} from "react";
import path from 'path';
import fs from 'fs/promises';

function ProductDetailPage(props) {
    const {loadedProduct} = props;
    // Pure react way is to use useEffect to make an API call but then page is not there when page initially rendered

/*    if (!loadedProduct) {
        return <p>Loading...</p>;
    }*/

    return <Fragment>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
    </Fragment>
}

export async function getStaticProps(context) {
    // params are keys for path
    // Could be extracted through useRouter but then would only be in the component and making calls through browser
    // For pre-rendering API calls, we need information here
    const {params} = context;

    const productId = params.pid;

    const data = await getData();

    const product = data.products.find(product => product.id === productId);
    return {
        props: {
            loadedProduct: product
        }
    };
}

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    return data;
}

export async function getStaticPaths() {
    const data = await getData();

    const ids = data.products.map(product => product.id);

    const pathsWithParams = ids.map(id => ({params:  {pid: id}}));

    return {
        paths: pathsWithParams,
        fallback: false
    }
}

export default ProductDetailPage;
