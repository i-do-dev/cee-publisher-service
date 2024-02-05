const { ApiKey, ClientRole } = require('../../../models');

const keyAuthenticateMiddleware = async (req, res, next) => {
  const apiKey = req.get('Authorization');
  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }

  const keyRecord = await ApiKey.findOne({
    where: { key: apiKey },
    include: ClientRole,
  });
  if (!keyRecord) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  req.clientRole = keyRecord.ClientRole.name;
  next();
};

module.exports = keyAuthenticateMiddleware;