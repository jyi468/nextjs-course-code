import {useState} from 'react';

import {buildFeedbackPath, extractFeedback} from "../api/feedback";

function FeedbackPage(props) {
    const [feedbackData, setFeedbackData] = useState();
    function loadFeedbackHandler(id) {
        fetch(`/api/${id}`)// /api/some-feedback-id
            .then(response => response.json())
            .then(data => {
                setFeedbackData(data.feedback);
            });
    }

    return (
        <>
            {feedbackData && <p>{feedbackData.email}</p>}
            <ul>
                {props.feedbackItems.map((item) => (
                    <li key={item.id}>
                        {item.text}{' '}
                        <button onClick={() => loadFeedbackHandler(item.id)}>Show Details</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export async function getStaticProps() {
    // Use only for external apis. We don't need to send a request to feedback API route because all code is running
    // in the same place.
    // getStaticProps and imports are not in the static bundle.
    // If it is only in the client side React code, it possibly could be
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    return {
        props: {
            feedbackItems: data
        }
    }
}

export default FeedbackPage;
