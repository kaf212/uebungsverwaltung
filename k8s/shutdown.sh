#!/bin/bash

# Deletes all kubernetes cluster resources except the mongo volume

export KUBECONFIG=~/kubeconfig-k8s-uebungsverwaltung.yaml
kubectl delete deployment uebungsverwaltung-node uebungsverwaltung-frontend uebungsverwaltung-mongo
kubectl delete svc nginx-service node-service mongo-service kubernetes
echo "done"