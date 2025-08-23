build:
	yarn run build

image:
	docker build -t registry.cn-guangzhou.aliyuncs.com/scutrobot/rm-search-heroui:latest --platform linux/amd64 .

push:
	docker push registry.cn-guangzhou.aliyuncs.com/scutrobot/rm-search-heroui:latest
