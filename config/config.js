module.exports = {
    // Email configuration for password reset
    emailConfig: {
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PSWRD
      }
    },
    
    // Base URL for password reset links
    baseUrl: process.env.NODE_ENV === 'production' 
      ? 'https://goruplist.onrender.com'
      : 'http://localhost:3000'
  };