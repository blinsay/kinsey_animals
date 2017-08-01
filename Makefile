.PHONY: setup test package

setup:
	npm install && npm install -g node-lambda

run-once:
	node-lambda run -f deploy.env

deploy-lambda:
	node-lambda deploy \
		-f deploy.env \
		-e production \
		--role arn:aws:iam::731224166193:role/lambda_basic_execution \
		--handler index.handler \
		--eventSourceFile schedule.json

