export
AWS_PROFILE=dev-string
dev_S3_BUCKET=dashboard.dev.string-api.xyz
dev_DISTRIBUTION_ID=

test-envvars:
	@[ "${env}" ] || ( echo "env var is not set"; exit 1 )

build: test-envvars
	npm run build

all: build
	aws s3 cp --recursive dist/ s3://${${env}_S3_BUCKET} && aws cloudfront create-invalidation \
	--distribution-id ${${env}_DISTRIBUTION_ID} \
	--paths "/*"