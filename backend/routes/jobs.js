import express from 'express';
import JobRequest from '../models/jobRequest.js';

const router = express.Router();

// GET /api/jobs — list all, optional ?category= and ?status= filters
router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.status)   filter.status   = req.query.status;

    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    next(err);
  }
});

// GET /api/jobs/:id — single job
router.get('/:id', async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    next(err);
  }
});

// POST /api/jobs — create job
router.post('/', async (req, res, next) => {
  try {
    const { title, description, category, location, contactName, contactEmail, urgency } = req.body;

    if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }

    const job = await JobRequest.create({
      title, description, category, location, contactName, contactEmail, urgency
    });

    res.status(201).json(job);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/jobs/:id — update status only
router.patch('/:id', async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['Open', 'In Progress', 'Closed'];

    if (!status || !allowed.includes(status)) {
      return res.status(400).json({ message: `Status must be one of: ${allowed.join(', ')}` });
    }

    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: 'after' }
    );

    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/jobs/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;