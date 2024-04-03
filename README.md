# Go-Hiking
Run
```
docker-compose up --build
```

Add DB user
```
docker exec -it mongo sh -c 'exec mongosh'
use admin
db.createUser({ user: "mongoadmin" , pwd: "mongoadmin", roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]})
```
