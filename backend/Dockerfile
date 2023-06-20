FROM node:16.18 AS Production

ENV DB_USER=i_pranav DB_PASS=HcMhHz8E5EumvEVm
WORKDIR /usr/src/backend

COPY package.json .
COPY package-lock.json .

RUN npm install 
COPY . .    

# RUN npm run build 

CMD ["sh","-c","npm start"]  