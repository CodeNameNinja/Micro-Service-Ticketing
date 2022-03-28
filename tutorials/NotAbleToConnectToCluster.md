 #### Troubleshooting.

 install Ingress
 ```
 kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.2/deploy/static/provider/cloud/deploy.yaml
 ```

 Delete Validation Hook
 ```
 kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission
 ```