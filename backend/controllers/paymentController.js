const paypal = require('paypal-rest-sdk');

// Configure PayPal SDK with sandbox credentials
paypal.configure({
  mode: 'sandbox', // Set to 'live' for production
  client_id:'AWo_TIwBj9Pd3XR61XeK-hxYw-r9LntijahzlXJOQFUBDUqq0cdv-ZUCNQad5FV5G59c2ODK3MJxi3aU',
  client_secret: 'ELmuLXymBP7jYYj4zTQEkmVUHDqibOVXLjJqyAfosJAYlxS7oOMpEamcW3YbgomxbKlmSpD52j0cLJ7B'
});

// Function to initiate a PayPal payment
exports.initiatePayPalPayment = async (req, res) => {
  const paymentData = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: 'http://localhost:2024/success', // URL to redirect user after payment
      cancel_url: 'http://localhost:2024/cancel'    // URL to redirect user if payment is canceled
    },
    transactions: [{
      amount: {
        total: '10.00',  // Total amount of the transaction
        currency: 'USD'  // Currency code (e.g., USD, EUR)
      },
      description: 'Payment for Course Enrollment'
    }]
  };

  // Create PayPal payment
  paypal.payment.create(paymentData, (error, payment) => {
    if (error) {
      console.error('Error creating PayPal payment:', error);
      res.status(500).json({ error: 'Failed to initiate payment' });
    } else {
      // Redirect user to PayPal for payment approval
      const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;
      console.log(approvalUrl);
      res.redirect(approvalUrl);
    }
  });
};

// Callback route to handle payment execution after user approval
exports.executePayPalPayment = async (req, res) => {
  const paymentId = req.query.paymentId;
  const payerId = { payer_id: req.query.PayerID };

  // Execute PayPal payment
  paypal.payment.execute(paymentId, payerId, (error, payment) => {
    if (error) {
      console.error('Error executing PayPal payment:', error);
      res.redirect('/error');
    } else {
      // Payment successful, handle accordingly
      console.log('Payment executed successfully:', payment);
      res.send('Payment successful!');
    }
  });
};
