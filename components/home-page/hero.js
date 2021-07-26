import Image from 'next/image';

import classes from './hero.module.css';

const Hero = () => {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src="/images/site/josh.jpg"
                    alt="An image showing Josh"
                    width={221}
                    height={294}
                />
            </div>
            <h1>Hi, I'm Josh</h1>
            <p>I blog about web development - especially frontend frameworks like Angular or React.</p>
        </section>
    );
};

export default Hero;
