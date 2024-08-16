#!/bin/bash

export KUBECONFIG=~/kubeconfig-k8s-uebungsverwaltung.yaml
kubectl delete deployment uebungsverwaltung-node uebungsverwaltung-frontend uebungsverwaltung-mongo
kubectl delete svc nginx-service node-service mongo-service
kubectl apply -f ./mongo-config.yaml
kubectl apply -f ./mongovolume.yaml
kubectl apply -f ./mongo.yaml
kubectl apply -f ./frontend-deployment.yaml
kubectl apply -f ./backend-deployment.yaml
kubectl get pods
kubectl get svc --watch
echo "done"