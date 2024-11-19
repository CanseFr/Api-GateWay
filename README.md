Verify all .env of all service who need

First of all it is necessary to create the database by performing a migration
```bash
cd auth-service
npx prisma migrate dev --name "init"
```

Then run the migration
```bash
cd auth-service
npx prisma db seed
```


Do the same with product:
```bash
cd product-service
npx prisma migrate dev --name "init"
npx prisma db seed
```

It is possible to launch each application one by one or all at once with the command from root folder
```bash
npm run start:all
```


# Run rabitMq
```bash
 docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:4.0-management
```

