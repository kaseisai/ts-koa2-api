rm -rf node_modules
rm -f package.json

npm i typescript koa axios bluebird koa-body koa-bodyparser koa-compress koa-router koa-static winston momnet md5 sequelize-typescript sequelize nodemon gulp-cli gulp winston-daily-rotate-file mysql mysql2 fast-safe-stringify ioredis joi jsonwebtoken bcrypt --save

npx tsc --init
