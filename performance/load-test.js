import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 150 },
    { duration: '2m', target: 300 },
    { duration: '2m', target: 450 },
    { duration: '5m', target: 450 },
    { duration: '2m', target: 0 },
  ],

  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<2000'],
  },
};

export default function () {
  const response = http.get('http://127.0.0.1:8081/app/');

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response received': (r) => r.body && r.body.length > 0,
  });

  sleep(1);
}