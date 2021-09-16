# Go-Hiking

Docker
```
    docker container stop mongo; docker run --name mongo -p 27017:27017 -v $HOME/mongo:/data/db --rm -it mongo
    docker exec -it mongo sh -c 'exec mongo'
    db.createUser({ user: "mongoadmin" , pwd: "mongoadmin", roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", readWriteAnyDatabase"]})
```