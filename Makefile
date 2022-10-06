build-dev:
	docker build -t kerbb-main-dev -f Dockerfile.dev .

build-local:
	docker build \
		-t kerbb-main-production:local \
		-f Dockerfile.production .

build-production:
	docker build \
		-t kerbb-main-production:production \
		-f Dockerfile.production .
