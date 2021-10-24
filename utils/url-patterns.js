const urlPattern = /^https?:\/\/(www.)?[a-z0-9-]+\.[a-z]+[/]*[a-z0-9\-._~:/?#[\]@!$&()*,;=+]*$/;
const urlPatternForJoi = '^https?://(www.)?[a-z0-9-]+\\.[a-z]+[/]*[a-z0-9-._~:/?#[\\]@!$&()*,;=+]*$';

module.exports = { urlPattern, urlPatternForJoi };
