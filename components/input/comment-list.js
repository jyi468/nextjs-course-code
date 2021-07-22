import {useState} from 'react';

import classes from './comment-list.module.css';

function CommentList(props) {
    return (
        <ul className={classes.comments}>
            {props.comments.map(comment =>
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <div>
                        By <address>{comment.name}</address>
                    </div>
                </li>
            )}
        </ul>
    );
}

export default CommentList;