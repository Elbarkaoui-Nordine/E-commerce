import React, { Component } from 'react';

export default class Footer extends Component {


  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row justify-content-between">
            <div className="col-1 footer-link">
              <p>Shop</p>
              <a href='/'>
                New Arrivals
              </a>
              <a href='/'>
                Best Sellers
              </a>
              <a href='/'>
                Gift Guide
              </a>
              <a href='/'>
                Sales
              </a>
              <a href='/'>
                Visit Us
              </a>
            </div>

            <div className="col-1 footer-link">
              <p>Explore</p>
              <a href='/'>
                About Us
              </a>
              <a href='/'>
                Collaborations
              </a>
              <a href='/'>
                Product Care
              </a>
              <a href='/'>
                Stories
              </a>
              <a href='/'>
                Lookbooks
              </a>
            </div>

            <div className="col-1 footer-link">
              <p>More</p>
              <a href='/'>
                My Account
              </a>
              <a href='/'>
                Custom Orders
              </a>
              <a href='/'>
                Size Guide
              </a>
              <a href='/'>
                Careers
              </a>
              <a href='/'>
                Contact
              </a>
            </div>

            <div className="ml-auto col-5 text-center">
            <a class="twitter-timeline" data-width="500" data-height="400" data-theme="light" href="https://twitter.com/Timberland?ref_src=twsrc%5Etfw">Tweets by Timberland</a>
             </div>
          </div>
        </div>

        <div className="footer-link-sm my-2">
          <a href='/'>
            ©8-commerce 2020
          </a>
          <a href='/'>
            Terms of Service
          </a>
          <a href='/'>
            Privacy Policy
          </a>
          <a href='/'>
            Shipping and Returns
          </a>
          <a href='/'>
            FAQ
          </a>
        </div>
        </>
    )
  }
}
