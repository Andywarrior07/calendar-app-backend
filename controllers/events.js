const Event = require('../schemas/Event');

const getEvents = async (req, res) => {
  const events = await Event.find().populate('user', 'name');

  return res.json(events);
};

const createEvent = async (req, res) => {
  const event = new Event({ ...req.body, user: req.user.uid });

  try {
    await event.save();

    return res.json({
      event,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ msg: 'Error server' });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { uid } = req.user;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ msg: 'Event does not exists' });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const newEvent = { ...req.body, user: uid };
    const updatedEvent = await Event.findByIdAndUpdate(id, newEvent, {
      new: true,
    });

    return res.json(updatedEvent);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Error server' });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const { uid } = req.user;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ msg: 'Event does not exists' });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    await Event.findByIdAndDelete(id);

    return res.json();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Error server' });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
