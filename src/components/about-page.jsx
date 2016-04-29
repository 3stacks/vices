import React from 'react';

export const AboutPage = function(props) {
    return (
        <div>
            <p>
                Vices was made by Luke Boyle. I made this app because I was spending way too much money
                on iced coffee and I needed a way to motivate myself to quit.
            </p>
            <dl>
                For more information about the project:
                <dt>
                    See the Github repo
                </dt>
                <dd>
                    <a href="https://github.com/3stacks/vices">
                        https://github.com/3stacks/vices
                    </a>
                </dd>
                <dt>
                    Read my blog post about it
                </dt>
                <dd>
                    Coming soon
                </dd>
            </dl>
            <dl>
                For more information about me:
                <dt>
                    See my website
                </dt>
                <dd>
                    <a href="https://lukeboyle.com">
                        https://lukeboyle.com
                    </a>
                </dd>
            </dl>
        </div>
    );
};

export default AboutPage;