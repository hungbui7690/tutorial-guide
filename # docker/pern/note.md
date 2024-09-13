### Write a Simple Dockerfile Smartly
`Choose a Base Image`: Start with an appropriate base image that suits your application`s requirements. Use official images whenever possible, as they are usually well-maintained and secure.
`Use a Minimal Base Image`: Opt for a minimal base image to reduce the size of your final Docker image. For example, instead of using a full operating system, consider using Alpine Linux as it`s lightweight.
`Copy Only Necessary Files`: Only copy the necessary files into the Docker image. Use a `.dockerignore` file to exclude unnecessary files and directories.
`Combine Steps`: Minimize the number of layers in your image by combining multiple commands into a single `RUN` instruction.


### Docker Compose File
1. On the `docker-compose.yml` file define the services which services we want to use using the `services` keyword.
2. Then we define which services we want to use like `server`, `client`, `mongodb`.
3. Then select the `Dockerfile` location and `file name`.
4. We can also define the container name using the `container_name` keyword.
5. Also, `ports ` are used for port forwarding between the `host machine port` and `container port`.
6. Which services are run first then other services are run is defined using the `depends_on` keyword.
7. Set environment variable on a `.env` file and this file set using the `env_file` keyword.
8. The `volumes` keyword is used for backup data from the container to the host machine because if the container is `dead` we can `backup `our important data. it's most important in database services.
9. Finally, define the `volumes` that we want to use.
10. We use a `default ` network so, we can not discuss `Docker Network`. If you are interested go here to learn more about this. otherwise, we discuss another article.
11. Here `docker-compose up -d`, the `-d` command in docker is a shorthand for the ` — detach` option. when you run a container with the `-d` flag, it starts the container in the background and immediately returns you to the command prompt without blocking the terminal.

### Run
Create and run 3 containers: `backend`, `frontend` and `mongodb_server`

Method 1
```bash
docker-compose up -d
```
 


Method 2: 
```bash
docker compose -f compose.yml build
docker compose -f compose.yml up
```

After run the previous command, go to Docker Desktop to see if these containers are running or not 


