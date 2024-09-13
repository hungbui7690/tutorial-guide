# Deploy MERN App on AWS EC2
- In this example, we deploy `server` and `client` to `2 repositories` in Github. So that, we don't use `docker-compose`


### Github Secrets 
Go to `Settings`, `Secrets & Variables`, `Actions`, `New repository secret`

Ddd `env` vars here

List of `env vars`: 
- AWS_ACCESS_KEY
- AWS_SECRET_ACCESS_KEY
- AZURE_WEBAPP_PUBLISH_PROFILE
- DOCKER_PASSWORD
- DOCKER_USERNAME
- MONGO_PASSWORD


### EC2
Connect to ubuntu machine, and run these commands: 
```bash
sudo apt-get update
sudo apt-get install docker.io -y
sudo systemctl start docker
sudo docker run hello-world
docker ps

# grant permission, otherwise, cannot use docker commands
sudo chmod 666 /var/run/docker.sock
sudo systemctl enable docker
docker --version
```


### Setup Github Runners on EC2
Go to Settings, `Actions`, `Runners`, `New self-hosted runner`

```bash
# Create folders for nodejs and react apps
$ mkdir actions-runner-node && cd actions-runner-node
$ mkdir actions-runner-react && cd actions-runner-react


# Download the latest runner package
$ curl -o actions-runner-linux-x64-2.319.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.319.1/actions-runner-linux-x64-2.319.1.tar.gz

# Optional: Validate the hash
$ echo "3f6efb7488a183e291fc2c62876e14c9ee732864173734facc85a1bfb1744464  actions-runner-linux-x64-2.319.1.tar.gz" | shasum -a 256 -c

# Extract the installer
$ tar xzf ./actions-runner-linux-x64-2.319.1.tar.gz

# Create the runner and start the configuration experience
$ ./config.sh --url https://github.com/hungbui7690/twitter-app-clone --token AOUHPGE67MPWJNPEGONJTGLG4PHZS

# Last step, run it!
$ ./run.sh
```

###### Configuring the self-hosted runner application as a service
[Link](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/configuring-the-self-hosted-runner-application-as-a-service?platform=linux)

Install and Start the Service on both folders
```bash
sudo ./svc.sh install
sudo ./svc.sh start
```


### Dockerfile
NodeJS
```dockerfile
FROM node:alpine3.18
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "start" ]
```

React
```dockerfile
FROM node:alpine3.18 as build

# docker run -d -p 3000:80 --name reactContainer -e REACT_APP_NODE_ENV='production' -e REACT_APP_SERVER_BASE_URL='http://localhost:5000' username/react-app
# Declare build time environment variables
ARG REACT_APP_NODE_ENV
ARG REACT_APP_SERVER_BASE_URL

# Set default values for environment variables
ENV REACT_APP_NODE_ENV=$REACT_APP_NODE_ENV
ENV REACT_APP_SERVER_BASE_URL=$REACT_APP_SERVER_BASE_URL

# Build App
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
```

### .github/workflows/cicd.yaml

NodeJS
```yaml
name: Deploy Node Application

on:
  push:
    branches:
      - mern-ec2-docker

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # This action checks-out your repository under $GITHUB_WORKSPACE, so your workflow can access it.
      - name: Checkout Source
        uses: actions/checkout@v4
      - name: Login to docker hub
        run: docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }}
      - name: Build Docker Image
        run: docker build -t hungbui7690/nodejs-app  .
      - name: Publish Image to docker hub
        run: docker push hungbui7690/nodejs-app:latest

  deploy:
    needs: build
    runs-on: self-hosted
    steps:
      - name: Pull image from docker hub
        run: docker pull hungbui7690/nodejs-app:latest
      - name: Delete old container
        run: docker rm -f nodejs-app-container
      - name: Run Docker Container
        run: docker run -d -p 5000:5000 --name nodejs-app-container -e MONGO_PASSWORD='${{ secrets.MONGO_PASSWORD }}' hungbui7690/nodejs-app

```

ReactJS

```yaml
name: Deploy Node Application

on:
  push:
    branches:
      - mern-ec2-docker

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source
        uses: actions/checkout@v4
      - name: Login to docker hub
        run: docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }}
      - name: Build Docker Image
        run: docker build -t hungbui7690/reactjs-app --build-arg REACT_APP_NODE_ENV='production' --build-arg REACT_APP_SERVER_BASE_URL='${{ secrets.REACT_APP_SERVER_BASE_URL }}'  .
      - name: Publish Image to docker hub
        run: docker push hungbui7690/reactjs-app:latest

  deploy:
    needs: build
    runs-on: self-hosted
    steps:
      - name: Pull image from docker hub
        run: docker pull hungbui7690/reactjs-app:latest
      - name: Delete old container
        run: docker rm -f reactjs-app-container
      - name: Run Docker Container
        run: docker run -d -p 3000:80 --name reactjs-app-container hungbui7690/reactjs-app

```


### EC2 Security Groups
Inbound Rules
- Type =`Custom TCP` 
- Source =`Anywhere-IPv4` 
- `0.0.0.0/0` 
- Port Range = 5000
- Port Range = 3000


### Push 
- after push, check Actions tab




```bash
# Run Node
docker run -d 5000:5000 --name mern-node-example-container -e MONGO_PASSWORD='test@123' mern-node-example

# Run React
docker run -d -p 3000:80 --name reactContainer -e REACT_APP_NODE_ENV='production' -e REACT_APP_SERVER_BASE_URL='http://localhost:5000' username/react-app


```