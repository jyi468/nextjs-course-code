import {Fragment} from "react";
import path from 'path';
import fs from 'fs/promises';

function ProductDetailPage(props) {
    const {loadedProduct} = props;
    // Pure react way is to use useEffect to make an API call but then page is not there when page initially rendered
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

    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    const product = data.products.find(product => product.id === productId);
    return {
        props: {
            loadedProduct: product
        }
    };
}

export async function getStaticPaths() {
    return {
        paths: [
            {params: { pid: 'p1'}},
            {params: { pid: 'p2'}},
            {params: { pid: 'p3'}},
        ],
        fallback: false
    }
}

export default ProductDetailPage;
