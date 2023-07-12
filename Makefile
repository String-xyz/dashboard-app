export
AWS_PROFILE=${env}-string
dev_S3_BUCKET=dashboard.dev.string-api.xyz
sandbox_S3_BUCKET=sandbox.string.xyz
prod_S3_BUCKET=dashboard.string.xyz
sandbox_DISTRIBUTION_ID=E1HI9GV7FII5CL
dev_DISTRIBUTION_ID=E15ATFGWUQ4174
prod_DISTRIBUTION_ID=EEUK6SHP8PI0I
# include .${env}.env

test-envvars:
	@[ "${env}" ] || ( echo "env var is not set"; exit 1 )

build: test-envvars
	npm run build

build-sandbox: test-envvars
	npm run build-sandbox

build-prod: test-envvars
	npm run build-prod

all: build
	aws s3 cp --recursive build/ s3://${${env}_S3_BUCKET} && aws cloudfront create-invalidation \
	--distribution-id ${${env}_DISTRIBUTION_ID} \
	--paths "/*"

all-sandbox: build-sandbox
	aws s3 cp --recursive build/ s3://${${env}_S3_BUCKET} && aws cloudfront create-invalidation \
	--distribution-id ${${env}_DISTRIBUTION_ID} \
	--paths "/*"

all-prod: build-prod
	aws s3 cp --recursive build/ s3://${${env}_S3_BUCKET} && aws cloudfront create-invalidation \
	--distribution-id ${${env}_DISTRIBUTION_ID} \
	--paths "/*"