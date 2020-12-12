import React from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import StripeCheckout from 'react-stripe-checkout';

import CardSection from "./CardSection";

class CheckoutForm extends React.Component {
  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: token,
    }).then(data => {
        alert(`We are in business, ${data.email}`);
      });
   
  }


  handleSubmit = async event => {
    
    event.preventDefault();
 

    const { stripe, elements } = this.props;
    
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token);
    }
    
  };

  render() {
    return (
      <div>
        <div class="product-info">
          <h3 className="product-title">Apple MacBook Pro</h3>
          <h4 className="product-price">$999</h4>
        </div>
        <StripeCheckout
        amount="500"
        billingAddress
        description="Lignite"
      
        locale="auto"
        name="usman.live"
        stripeKey=""
        token={this.onToken}
        zipCode
      />
        <form onSubmit={this.handleSubmit}>
          <CardSection 
         
          
          />
          <button disabled={!this.props.stripe} className="btn-pay">
            Buy Now
          </button>
          
        </form>
      </div>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
// export default CheckoutForm;
