import React, { Component } from 'react';
import './NewsLetter.css'
class Newsletter extends Component {
    
    constructor(){
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
            this.setState({isSubmit: true, error: false})
          })
          .catch((error) => {
            this.setState({isSubmit: false, error: true})
          });
      };
    render() {
        return (
            <div className='newsletter-container'>
                {
                !this.state.isSubmit && !this.state.error && 
                <form name="contact" method="post" onSubmit={this.handleSubmit}>
                    <input type="hidden" name="form-name" value="contact" />
                    <p>
                        <input type="text" id="name" name="name" required placeholder='Enter your name...' />
                        <input type="email" id="email" name="email" required placeholder='Enter your email...' />
                    </p>
                   
                    <p>
                        <textarea id="message" name="message" required placeholder='Enter your message...'></textarea>
                    </p>
                    <p>
                        <input type="submit" value="Submit message" />
                    </p>
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