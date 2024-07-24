require('dotenv').config();
const nodemailer = require('nodemailer');
const brevoTransport = require('nodemailer-brevo-transport');

// Create a transporter using Brevo (Sendinblue) settings
const transporter = nodemailer.createTransport(
  new brevoTransport({ apiKey: process.env.API_BREVO})
);

const sendEmailController = async (req, res) => {
  try {
    // Destructure the request body
    const { name, email, msg } = req.body;

    // Validation
    if (!name || !email || !msg) {
      return res.status(400).send({
        success: false,
        message: 'Please provide all fields',
      });
    }

    // Email options
    const mailOptions = {
      to: process.env.BREVO_EMAIL,
      from: process.env.BREVO_EMAIL,
      subject: 'Regarding Portfolio App',
      html: `
        <h5>Detail Information</h5>
        <ul>
          <li><p>Name: ${name}</p></li>
          <li><p>Email: ${email}</p></li>
          <li><p>Message: ${msg}</p></li>
        </ul>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).send({
      success: true,
      message: 'Your message send successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Send email API error',
      error,
    });
  }
};

module.exports = { sendEmailController };
