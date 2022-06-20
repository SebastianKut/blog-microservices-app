const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
// To get to these enpoints when running kubernetes we have to figure out our node ip by running "kubectl get services" command
// and check the port of the type NodePort (this is a port that allows communication from outside kubernetes cluster in local development.
// In our case the domain will be http://localhost:31086/posts
app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  //addres for the event bus that is deployed in kubernetes will be te name of event-bus cluster ip service insode kubernetes
  // it can be retrieved with "kubectl get services" command
  await axios
    .post('http://event-bus-srv:4005/events', {
      type: 'PostCreated',
      data: {
        id,
        title,
      },
    })
    .catch((err) => console.log(err.message));
  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Event received', req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('v2');
  console.log('Listening on 4000');
});
