const { ApiKey, ClientRole } = require('./../../../models');

const keyAuthenticateMiddleware = async (req, res, next) => {
  const authorizationVal = req.get('Authorization').split(' ');
  if ( authorizationVal.length === 0 || authorizationVal[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid authorization' });
  }

  const apiKey = authorizationVal[1];
  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }

  const keyRecord = await ApiKey.findOne({
    where: { key: apiKey },
    include: {
      model: ClientRole,
      as: 'ClientRole', // Specify the alias for the association
    },
  });
  
  if (!keyRecord) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  req.clientRole = keyRecord.ClientRole.name;
  next();
};

module.exports = keyAuthenticateMiddleware;