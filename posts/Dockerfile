FROM node:16-alpine

# Set up working directory inside container
WORKDIR /app

# Copy package.json into working directory of the container
COPY package.json ./

# Install dependencies
RUN npm install

# Copy rest of the files so we dont run npm install everytime we change something inside js files
COPY ./ ./

# Run starting commmand
CMD ["npm", "start"]