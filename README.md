# E-commerce-ticketing

Micro-service online ticketing web application built with Kubernetes and NATS-streaming

Connection URL: Kubernetes Load Balancer IP (local enviornment: [127.0.0.1](127.0.0.1))

Enviornment: 
  - node, npm
  - Kubernetes Desktop
  - or GKE
  - or any Kubernetes Cloud

Development steps:
1. Clone the project: ```git clone https://github.com/berlincho/e-commerce-ticketing.git```
2. Create the secrets for ```JWT_KEY``` and ```STRIPE_KEY```:
  ```
  kubectl create secret generic jwt-secret --from-literal=<JWT_KEY=12345>
  ```
  ```
  kubectl create secret generic stripe-secret --from-literal=<STRIPE_KEY=12345>
  ```
3. Install ingress-nginx: https://kubernetes.github.io/ingress-nginx/deploy/
- e.g. for Kubernetes-Desktop 
```sh 
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.46.0/deploy/static/provider/cloud/deploy.yaml
```
4. (Optional) Install dependencies in ```/auth```, ```/orders```, ```/tickets```, ```/payments```, ```/client```, ```/expiration```
  ```
  npm install
  ```
5. Execute the skaffold pipelines
```
skaffold dev
```
6. Clean up
```
skaffold delete
```

Test steps:
  1. Install dependencies in ```/auth```, ```/orders```, ```/tickets```, ```/payments```, ```/client```, ```/expiration```
  ```
  npm install
  ```
  2. enter ```/auth```, ```/orders```, ```/tickets```, ```/payments```
  ```
  npm run test
  ```
