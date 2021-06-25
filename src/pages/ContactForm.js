import{ init } from 'emailjs-com';
import React from 'react';
import emailjs from 'emailjs-com';
init("user_P9JQXi4GJwv2t181GWQ45");

export default function ContactForm() {

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm('service_cgwttis', 'template_fkcld87', e.target)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    return (
        <form className="card" onSubmit={sendEmail}>
            <input type="hidden" name="contact_number" />
            <label>Name: </label>
            <br/>
            <input type="text" name="from_name" id="from_name" />
            <br/>
            <label>Email: </label>
            <br/>
            <input type="email" name="user_email" />
            <br/>
            <label>Message: </label>
            <br/>
            <textarea name="message"  id="message"/>
            <br/>
            <input type="submit" value="Send" />
        </form>
    );
}