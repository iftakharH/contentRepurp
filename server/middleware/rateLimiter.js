const rateLimit = require("express-rate-limit");

// 5 requests per hour limit per user
const repurposeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP/user to 5 requests per `windowMs`
  message: {
    message: "You have reached your limit of 5 repurposing requests per hour. Please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  
  // Important: We want to rate limit by user ID, not just IP, since they are logged in
  keyGenerator: (req) => {
    return req.user ? req.user._id.toString() : req.ip;
  },
});

module.exports = { repurposeLimiter };
