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

It is possible to launch each application one by one or all at once with the command from root folder
```bash
npm run start:all
```


