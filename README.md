# Go-Hiking

Build
```
cd Go-Hiking
mvn clean install
cd web-ui
npm i
ng build --prod
```

Run
```
cd Go-Hiking
docker-compose up --build
```

Add DB user
```
docker exec -it mongo sh -c 'exec mongosh'
db.createUser({ user: "mongoadmin" , pwd: "mongoadmin", roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", readWriteAnyDatabase"]})
```
