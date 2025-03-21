import React from 'react';
import ContactUs from '../component/pages/home/ContactUs';
import ContactBanner from '../component/pages/contact/ContactBanner';

const Contact = () => {
    return (
        <div className='mx-auto container'>
            {/* <h1>Contact</h1> */}
            <ContactBanner/>
            <ContactUs/>
        </div>
    );
};

export default Contact;