const Session = require('../models/session');

async function createSession(req, res) {
  try {
    const { code } = req.body;
    const existing = await Session.findOne({ code });
    if (existing) return res.status(400).json({ message: 'Code already exists' });

    const session = new Session({
      code,
      owner: req.user.userId,
      participants: [req.user.userId]
    });

    await session.save();
    res.json({ message: 'Session created', session });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getSessionByCode(req, res) {
  try {
    const { code } = req.params;
    const session = await Session.findOne({ code }).populate('participants', 'name email');
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { createSession, getSessionByCode };
