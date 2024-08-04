const fetchStats = require('./fetchInfo');

fetchStats().then(() => {
  console.log('Stats fetched and stored successfully.');
}).catch(error => {
  console.error('Error fetching stats:', error);
});
