import React from 'react'
import "../styles/Footer.css"

function Footer() {
    return (
        <div className="footer">
            <div className="footer-logo">
                <p>author: </p>
                <a
                    target="_blank"
                    href="https://www.linkedin.com/in/harshitchauhan05/"
                >
                    <h1>h_Chauhan</h1>
                </a>
            </div>

            <div className="footer-content">
                <h4 className="footer-title">
                    Book Your Movie Tickets Online ©2024 TicketHub
                </h4>
                <p className="footer-description">
                    Disclaimer: This website is for demonstration/Learning purposes only.
                </p>
            </div>
        </div>
    )
}

export default Footer