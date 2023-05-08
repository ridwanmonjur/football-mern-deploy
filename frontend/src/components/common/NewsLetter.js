import React, { Component } from 'react';
import './NewsLetter.css'
import { toast } from 'react-toastify';
class Newsletter extends Component {

    constructor() {
        super()

        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            isSubmit: false, error: false
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();

        const myForm = event.target;
        const formData = new FormData(myForm);

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        })
            .then(() => {
                this.setState({ isSubmit: true, error: false })
            })
            .catch((error) => {
                this.setState({ isSubmit: false, error: true })
                toast.error(`${error.response?.status || ""} Error: ${error.response?.error || error.message}`)
            });
    };
    render() {
        return (
            <div className='newsletter-container'>
                {
                    !this.state.isSubmit && !this.state.error &&
                    <form name="contact" method="post" onSubmit={this.handleSubmit}>
                        <input type="hidden" name="form-name" value="contact" />
                        <span className='d-inline'>
                            <input type="text" id="name" className='form-control border-warning' name="name" required placeholder='Enter your name...' />
                        </span>
                        <br  /> <br  />
                        <span className='d-inline'>
                            <input type="email" id="email" className='mt-4 form-control border-warning' name="email" required placeholder='Enter your email...' />
                        </span>
                        <br  /> <br  />
                        <span className=''>
                            <textarea id="message" className='form-control mt-4 border-warning' name="message" required placeholder='Enter your message...'></textarea>
                        </span>
                        <br  /> <br  />
                        <span className='form-outline'>
                            <input type="submit" className='btn btn-warning' value="Submit message" />
                        </span>
                    </form>
                }
                {
                    this.state.isSubmit &&
                    <p>Successfully submitted your response</p>
                }
                {
                    this.state.error &&
                    <p>Failed to submit your response</p>
                }
            </div>
        )
    }
}

export default Newsletter;