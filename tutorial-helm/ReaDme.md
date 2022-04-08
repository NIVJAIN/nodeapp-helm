###
```
values.yaml file
kv:
  KEY1: V1
  KEY2: V2
  KEY3: v3

  
volumesAndMounts:
  volumes:
  - name: nodejs-env-file
    configMap:
      name: dd-configmap
  - name: nodejs-env-file2
    configMap:
      name: dd-configmap
  volumesMounts:
    - name: nodejs-env-file
      mountPath: /app/.env
    - name: nodejs-env-file2
      mountPath: /app/.env2
```