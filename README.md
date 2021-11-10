#### 项目介绍

在学习了Typescript和Nestjs后，为了巩固学习的知识所创建的项目。

#### 项目技术栈

Typescript+Nestjs+Mysql+Jwt

#### 项目实现功能

基于RBAC实现权限控制

完成了用户、橘色、菜单、文章、分类、标签、评论的增删改查，为博客网站的前后台提供接口。

#### 项目使用

1、直接使用

在本地创建数据库

修改.env文件中数据库配置

```shell
npm i
npm run start:dev
```

2、使用docker启动

docker-compose.yml

```dockerfile
version: '3.9'
services:
    nodejs:
        container_name: nodejs
        build:
            context: ./images/nodejs
            dockerfile: Dockerfile
        restart: on-failure
        ports:
            - '3000:3000'
        depends_on:
            - mysql
        volumes:
            # 日志
            - ./data/nodejs/log:/home/sites/blog/logs
        networks:
            - app-network
    mysql:
        container_name: mysql
        build:
            context: ./images/mysql
            dockerfile: Dockerfile
        ports:
            - '3306:3306'
        restart: on-failure
        environment:
            - MYSQL_ROOT_PASSWORD=root #修改成你自己想要配置的密码
        volumes:
            # 日志
            - ./data/mysql/log:/var/log/mysql
            # 数据
            - ./data/mysql/data:/var/lib/mysql
        networks:
            - app-network

networks:
    app-network:
        driver: bridge

```

nodejs的Dockerfile

```dockerfile
FROM node:14
ADD server/ /home/sites/blog
WORKDIR /home/sites/blog
RUN npm i -g pm2 --registry=https://registry.npm.taobao.org && npm i --registry=https://registry.npm.taobao.org
RUN npm run build
CMD pm2-runtime start blog.json --env production
```

mysql的Dockerfile

```dockerfile
FROM mysql:5.7
COPY init.sql /docker-entrypoint-initdb.d #init.sql就是一些初始化的数据，后续再提交上来
```

#### TODO

- [ ] 编写归档功能接口
- [ ] 编写数据统计功能接口
- [ ] CI、CD