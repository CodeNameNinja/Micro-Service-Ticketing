The command to creating a `Secret` Object in our Kubernets Pod is the following:

```bash
> kubectl create secret generic jwt-secret --from-literal=secret=JWT_KEY=asdf
secret/jwt-secret created
```

#### Update your Deployment file

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-depl
spec:
  replicas: 1
  selector:
    matchLabels:
      app: auth
  template:
    metadata:
      labels:
        app: auth
    spec:
      containers:
        - name: auth
          image: codenameninja/auth
          env:
            - name: JWT_KEY
              valueFrom:
                secretKeyRef:
                  name: jwt-secret
                  key: JWT_KEY

---
apiVersion: v1
kind: Service
metadata:
  name: auth-srv
spec:
  selector:
    app: auth
  ports:
    - name: auth
      protocol: TCP
      port: 3000
      targetPort: 3000
```
#### If you are having an issue with your secrets
Try this:
```bash

kubectl describe secret jwt-secret

You should see JWT_KEY under "Data".

If not, you'll want to delete the key and create it again.

kubectl delete secret jwt-secret

kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

```