# C2 Ladders

C2Ladders is rating wise list of Codeforces problems which were solved by many people who have had stable rating increase.
It's a reconstruction of old a2oj Ladders with new and updated problemset.

It's live at: https://c2-ladders.com/

Script for creation of ladders is available here: https://github.com/prince776/scripts-yt/tree/master/ladder

# How to build

To build this, you have to worry about `backend/` and `frontend/` folders only, the files outside are mainly concerned with deployment on azure.
I've also created a staging database which you can use while development.

Credentials are open, please don't misuse (it has incomplete data):

username = test

password = 0XP0V69Lvhwu9wbo

## Backend

Inside `backend/` folder

In `src/index.ts`:
Change the `mongoose.connect` line to: (keep this change locally only)

```
mongoose.connect(`mongodb+srv://${db.user}:${db.pass}@cluster0.robkk.mongodb.net/test?retryWrites=true&w=majority`);
```

Then to build and run:

```
$ npm install
$ DB_USER=test DB_PASS=0XP0V69Lvhwu9wbo npm run dev
```

## Frontend

Inside `frontend/` folder

To build and run:

```
$ npm install
$ npm start
```

## Deployment

In the main dir:

```
npm run build
npm run start # and specify all env variables mentioned in .env
```

`BASE_URL` env var is to specify the base address of the url the website will be hosted at.
