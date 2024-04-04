# docker-compose build

kind create cluster --config kind.yaml

kind load docker-image auth
kind load docker-image post
kind load docker-image geo
kind load docker-image ui

kubectl apply -k ./deployment/