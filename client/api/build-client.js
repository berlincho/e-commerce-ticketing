import axios from 'axios';

export default function buildClient({ req }) {
  if (typeof window === 'undefined') {
    // we are on the server!
    // requests should be made to http://<service_nam>.<namespace_name>...laksdjfk
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });

    return data;
  } else {
    // we are on the browser!
    // requests can be made with a base url of ''
    return axios.create({
      baseURL: '/',
    })
  }
}