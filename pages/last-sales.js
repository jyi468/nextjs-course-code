import {useEffect, useState} from 'react';
import useSWR from 'swr';

function LastSalesPage(props) {
    const [sales, setSales] = useState(props.sales); // Use pre-rendered sales from the server
    // const [isLoading, setIsLoading] = useState(false);

    const {data, error} = useSWR('https://nextjs-course-f4281-default-rtdb.firebaseio.com/sales.json');

    useEffect(() => {
        if (data) {
            const transformedSales = [];
            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume
                })
            }

            setSales(transformedSales);
        }
    }, [data]);

    if (error) {
        return <p>Failed to load.</p>;
    }

    if (!data && !sales) {
        return <p>Loading...</p>;
    }

    return (
        <ul>
            {sales.map(sale => <li key={sale.id}>
                {sale.username} - ${sale.volume}
            </li>)}
        </ul>
    );
}

export async function getStaticProps() {
    // .json is required by firebase
    const response = await fetch('https://nextjs-course-f4281-default-rtdb.firebaseio.com/sales.json');
    const data = await response.json();
    const transformedSales = [];
    for (const key in data) {
        transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume
        })
    }

    return {props: {sales: transformedSales}, revalidate: 10};
}

export default LastSalesPage;
