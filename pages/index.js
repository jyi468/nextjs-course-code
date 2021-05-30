import path from 'path';
import fs from 'fs/promises';

function HomePage(props) {
    const {products} = props;
    return (
        <ul>
            {products.map(product =>
                <li key={product.id}>{product.title}</li>
            )}
        </ul>
    );
}

export async function getStaticProps() {
    // cwd will be root folder after build not pages
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    return {
        props: {
            products: data.products
        },
        revalidate: 10 // recreated every 10 seconds
    };
}

export default HomePage;
