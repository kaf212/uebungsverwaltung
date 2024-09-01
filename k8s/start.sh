#!/bin/bash

# Creates all kubernetes resources after shutdown. Note: node-service takes a minute to actually serve data even though status is set to "ready" immediately.

export KUBECONFIG=~/kubeconfig-k8s-uebungsverwaltung.yaml
kubectl apply -f ./mongo-config.yaml
kubectl apply -f ./mongovolume.yaml
kubectl apply -f ./mongo.yaml
kubectl apply -f ./frontend-deployment.yaml
kubectl apply -f ./backend-deployment.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
kubectl get svc -n ingress-nginx --watch
echo "done"