create database egg_webpack;

use egg_webpack;

create table webpack(
    id int(10) not null auto_increment,
    userName text default null comment '用户名',
    env text default null comment '环境',
    branch text default null comment '分支',
    size int(10) default null comment '构建大小',
    buildTime int(10) default null comment '打包时长',
    createTime bigInt default null comment '创建时间',
    primary key(id)
)engine=InnoDB AUTO_INCREMENT=1 comment '打包概要表';

insert into webpack(userName, env, branch, size, buildTime, createTime)
values('xubin', 'dev', 'dev_0416', 4864, 26, 1586916637273);

