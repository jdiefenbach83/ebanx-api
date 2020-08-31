import eventService from '../services/eventService.js';

function process(req, res) {
  try {
    const result = eventService.process(req.body);

    if (!!!result.success) {
      return res.status(404).send(result.message);
    }

    return res.status(201).send(result.message);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
}

export default { process };
