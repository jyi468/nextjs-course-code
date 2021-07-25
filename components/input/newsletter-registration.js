import {useRef,useContext} from 'react';

import classes from './newsletter-registration.module.css';
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
    const inputRef = useRef();
    const notificationCtx = useContext(NotificationContext);

    function registrationHandler(event) {
        event.preventDefault();

        // fetch user input (state or refs)
        const email = inputRef.current.value;

        notificationCtx.showNotification({
            title: 'Signing Up...',
            message: 'Registering for newsletter.',
            status: 'pending'
        });

        // optional: validate input
        // send valid data to API
        fetch('/api/newsletter', {
            method: 'POST',
            body: JSON.stringify({email}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                // This is necessary because catch block won't trigger from HTTP response codes
                // We have to manually throw an error so the catch block executes
                return response.json().then(data => {
                    throw new Error(data.message || 'Something went wrong!');
                });
            })
            .then(data => {
                notificationCtx.showNotification({
                    title: 'Success!',
                    message: 'Successfully registered for newsletter!',
                    status: 'status'
                });
            })
            .catch(error => {
                notificationCtx.showNotification({
                    title: 'Error!',
                    message: error.message || 'Something went wrong!',
                    status: 'error'
                });
            });
    }

    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        type='email'
                        id='email'
                        placeholder='Your email'
                        aria-label='Your email'
                        ref={inputRef}
                    />
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
}

export default NewsletterRegistration;
