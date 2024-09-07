## Hosting
#### EC2 - Elastic Compute Cloud
- hosting service
	- instance as a server

#### Elastic Load Balancing
- distribute traffic across multiple instances 

#### Cloud Watch 
- collect logs and metrics 
- data will be passed to ```auto scaling``` 
	- auto create instances if they become needed based on the traffic 

#### Elastic Beanstalk 
- no need to config too much 
- if we want to deploy ruby on rail app -> there are templates that allow us to do that easily

#### Lambda 
- serverless 
- upload code to server -> choose when we want to run our code 
- pay as everytime code runs

#### Serverless Repo
- if we don't want to write code -> choose from here

#### ECR - Container Registry 
- define container (docker) here 

#### ECS - Container Service 
- manage container 
	- run / stop / allocating virtual machine to our containers
	- connect to other products like load balancers

#### EKS - Kubernetes Service
- if we want more control over how the app scale


#### App Runner
- if we have our app that is already containerize -> just use this service

## Storage
#### S3 - Simple Storage Service 
- can store any type of file 

#### Glacier 
- higher latency since files will be zipped 
- use for files that rarely used 
- much lower cost 

#### Elastic Block Storage
- fast 
- use for intensive data processing requirement 
- more manual configuration 

#### Elastic File System
- fast and fully managed 
- higher cost than ```Block Storage```

## Database 
#### Simple DB
- no sql db 

#### Dynamo DB 
- document DB 
- easy to scale horizontally 
- fast
- cheap
- no good at model relational data 
	- no joins 
	- limited queries 

#### Document DB 
- similar to MongoDB

#### Elastic Search 
- use if we want to build something like a ```full text search engine```

#### RDS
- PostgreSQL
- MySQL
- MariaDB
- Oracle 
- SQL Server

#### Aurora
- relational db from Amazon
- compatible with postgres, mysql
- 5x faster than mysql with lower cost


#### Neptune 
- graph db 
- good for highly connected data sets like social graph or recommendation engine 

#### Elastic Cache 
- similar to redis 

#### Timestream 
- Time Series DB 
- use for something like stock 

