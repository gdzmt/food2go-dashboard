const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

const API_URL = '';
const API_KEY = '';
const API_SECRET = '';

function extractKeys(input) {
  const regex = /`([^`]*)`/g;
  let matches = [];
  let match;
  
  while ((match = regex.exec(input)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}

function getReqConfig() {
  return {
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${btoa(API_KEY + ':' + API_SECRET)}`,
      'Content-Type': 'application/json'
    }
  };
}

function formatResponse(data, sortBy = 'COUNT') {
  const keys = extractKeys(data[0].header.schema);
  return data.slice(1).map((o) => {
    let x = {};
    keys.forEach((k, i) => { x[k] = o.row.columns[i]; });
    return x;
  }).sort((a, b) => b[sortBy] - a[sortBy]);
}

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/trendingProducts', async (req, res) => {
  const response = await axios.post(API_URL, { ksql: "SELECT * from ORDERCOUNTBYPRODUCT;" }, getReqConfig())
  res.status(200).json(formatResponse(response?.data).slice(0, 5));
});

app.get('/trendingCustomers', async (req, res) => {
  const response = await axios.post(API_URL, { ksql: "SELECT * from ORDERTOTALBYCUSTOMER;" }, getReqConfig())
  res.status(200).json(formatResponse(response?.data).slice(0, 5));
});

app.get('/trendingCities', async (req, res) => {
  const response = await axios.post(API_URL, { ksql: "SELECT * from ORDERTOTALBYCITY;" }, getReqConfig())
  res.status(200).json(formatResponse(response?.data).slice(0, 5));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
