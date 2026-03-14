const Request = require('../models/Request');
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

// POST /api/requests — Send a skill request
exports.createRequest = async (req, res) => {
    try {
        const sender = await getUserFromHeader(req);
        const { skillId } = req.body;

        if (!skillId) return res.status(400).json({ message: 'Skill ID is required' });

        // Find the skill and its owner
        const skill = await Skill.findById(skillId);
        if (!skill) return res.status(404).json({ message: 'Skill not found' });

        // Prevent requesting own skill
        if (skill.userId.toString() === sender._id.toString()) {
            return res.status(400).json({ message: 'You cannot request your own skill' });
        }

        // Check for duplicate request
        const existingRequest = await Request.findOne({
            senderId: sender._id,
            skillId: skill._id
        });
        if (existingRequest) {
            return res.status(400).json({ message: 'You have already requested this skill' });
        }

        const request = await Request.create({
            senderId: sender._id,
            receiverId: skill.userId,
            skillId: skill._id
        });

        res.status(201).json(request);
    } catch (error) {
        // Handle unique index violation
        if (error.code === 11000) {
            return res.status(400).json({ message: 'You have already requested this skill' });
        }
        res.status(400).json({ message: error.message });
    }
};

// GET /api/requests — Get requests involving the current user
exports.getRequests = async (req, res) => {
    try {
        const user = await getUserFromHeader(req);

        const requests = await Request.find({
            $or: [{ senderId: user._id }, { receiverId: user._id }]
        })
            .populate('senderId', 'name email')
            .populate('receiverId', 'name email')
            .populate('skillId', 'title level category')
            .sort({ createdAt: -1 });

        res.status(200).json(requests);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT /api/requests/:id — Update request status (accept/reject)
exports.updateRequest = async (req, res) => {
    try {
        const user = await getUserFromHeader(req);
        const { id } = req.params;
        const { status } = req.body;

        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Status must be accepted or rejected' });
        }

        const request = await Request.findById(id);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        // Only the receiver can accept/reject
        if (request.receiverId.toString() !== user._id.toString()) {
            return res.status(403).json({ message: 'Only the skill owner can update the request status' });
        }

        request.status = status;
        await request.save();

        res.status(200).json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
