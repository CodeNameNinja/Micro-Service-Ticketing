## MongoDb

```bash
npm install mongoose
```

in our `auth` directory

### Create a new Instance of MongoDB

> infra>k8s>auth-mongo-delp.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-mongo-depl
spec:
  replicas: 1
  selector:
    matchLabels:
      app: auth-mongo
  template:
    metadata:
      labels:
        app: auth-mongo
    spec:
      containers:
        - name: auth-mongo
          image: mongo

---
apiVersion: v1
kind: Service
metadata:
  name: auth-mongo-svc
spec:
  type: ClusterIP
  selector:
    app: auth-mongo
  ports:
    - name: db
      protocol: TCP
      port: 27017 #Default Port for MongoDb
      targetPort: 27017
```

then in

> auth/src/index.ts

```js
import mongoose from "mongoose";
```

and to get it to work with `TS`

```bash
npm i @types/mongoose
```
