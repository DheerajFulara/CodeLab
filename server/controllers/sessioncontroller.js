const Session = require('../models/session');
const generateSessionId = require('../utils/generateSessionId');

async function handleCreateSession(req, res) {
//   console.log('✅ handleCreateSession called');
  const userId = req.user.userId;

  try {
    let uniqueId;
    let isUnique = false;

    while (!isUnique) {
      uniqueId = generateSessionId();
      const existing = await Session.findOne({ sessionId: uniqueId, isActive: true });
      if (!existing) isUnique = true;
    }

    const newSession = new Session({
      sessionId: uniqueId,
      createdBy: userId,
    });

    await newSession.save();

    const frontendURL = process.env.FRONTEND_URL;
    const sessionLink = `${frontendURL}/session/${uniqueId}`;

    res.json({
      message: 'Session created successfully',
      link: sessionLink
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

console.log('✅ Exporting handleCreateSession');
module.exports = handleCreateSession ;
