Link: https://www.youtube.com/watch?v=nQdyiK7-VlQ&t=920s


#### Setup EC2 Instance 
- go to amazon EC2 
- start instance 
- choose ubuntu VM 
- get ssh key 
- connect to ubuntu (server) from our machine with ssh key 
- run these commands to update ubuntu to latest version
	sudo apt update
	sudo apt upgrade



#### Install Node.js 
install NodeJS on server
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

sudo apt-get install -y nodejs
```


#### rsync 
copy our project files from local to server 
normally, we use `scp`
but if we use `rsync`, it will copy everything the 1st time. then the next time, it just copy the files that have changed

```bash
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.env' -e "ssh -i ~/.ssh/your-key.pem" . ubuntu@ip-address:~/app
```


##### Install Database 
`postgres`
```bash
	sudo apt install postgresql postgresql-contrib

	sudo systemctl start postgresql
	sudo systemctl enable postgresql

	sudo -i -u postgres
```

`mysql`
```bash
	sudo apt install mysql-server

	sudo systemctl start mysql
	sudo systemctl enable mysql

	sudo mysql -u root
```

##### Create DB User
need to run these command using DB Client

`postgres`
```sql
	CREATE DATABASE my_app;
	CREATE ROLE my_app_role WITH LOGIN PASSWORD 'some_password';
	GRANT ALL PRIVILEGES ON DATABASE "my_app" TO my_app_role;
```

`mysql`
```sql
	CREATE DATABASE my_app;
	CREATE USER 'my_app_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'MyNewPass1!';
	GRANT ALL PRIVILEGES ON my_app.* TO 'my_app_user'@'localhost';
```




##### systemd 
`Step 1`: Create the Environment File
`systemd` is a way to make our app run in the background in Ubuntu. It will work for every projects run in linux machine


1. create app.env
```bash
sudo vim /etc/app.env
```
	
2. in Vim, add your variables in the format VARIABLE=value. For example:`	
```bash
DB_PASSWORD=your_secure_password
```
	
3. save the file

4. restrict file permissions
```bash
sudo chmod 600 /etc/app.env
sudo chown ubuntu:ubuntu /etc/app.env
```
	

`Step 2`: Create the systemd Service File

1.  create new service file
```bash
sudo vim /etc/systemd/system/myapp.service
```
	
2. Define the service settings. Add the following content in Vim, modifying as needed for your application:
```bash
	[Unit]
	Description=Node.js App
	After=network.target multi-user.target

	[Service]
	User=ubuntu
	WorkingDirectory=/home/ubuntu/app
	ExecStart=/usr/bin/npm start
	Restart=always
	Environment=NODE_ENV=production
	EnvironmentFile=/etc/app.env
	StandardOutput=syslog
	StandardError=syslog
	SyslogIdentifier=myapp

	[Install]
	WantedBy=multi-user.target
```

3. Reload systemd and start your service.
```bash
sudo systemctl daemon-reload
sudo systemctl enable myapp.service
sudo systemctl start myapp.service
```
	

4. verify that the service is running properly.
```bash
sudo systemctl status myapp.service
```
	
	
