const Skill = require('../models/Skill');
const User = require('../models/User');

// Helper to get user from header
const getUserFromHeader = async (req) => {
    const email = req.headers['user-email'];
    if (!email) throw new Error('Unauthorized: user-email header is missing');
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    return user;
};

// POST /api/skills — Create a new skill
exports.createSkill = async (req, res) => {
    try {
        const user = await getUserFromHeader(req);
        const { title, level, category, description } = req.body;

        if (!title) return res.status(400).json({ message: 'Skill title is required' });

        const skill = await Skill.create({
            title,
            level: level || 'Beginner',
            category: category || 'General',
            description: description || '',
            userId: user._id
        });

        res.status(201).json(skill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET /api/skills — Return all skills except the current user's
exports.getAllSkills = async (req, res) => {
    try {
        const user = await getUserFromHeader(req);

        const skills = await Skill.find({ userId: { $ne: user._id } })
            .populate('userId', 'name email location')
            .sort({ createdAt: -1 });

        res.status(200).json(skills);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET /api/skills/search?query=react — Search skills by title, category, or description
exports.searchSkills = async (req, res) => {
    try {
        const user = await getUserFromHeader(req);
        const { query } = req.query;

        if (!query) return res.status(200).json([]);

        const regex = new RegExp(query, 'i');

        const skills = await Skill.find({
            userId: { $ne: user._id },
            $or: [
                { title: regex },
                { category: regex },
                { description: regex }
            ]
        })
            .populate('userId', 'name email location')
            .sort({ createdAt: -1 });

        res.status(200).json(skills);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
