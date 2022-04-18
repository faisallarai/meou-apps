## Author: Issaka Faisal

## Getting Started.

<a name="One"></a>

### Prerequisite:

1. docker
2. yarn
3. npm

<a name="Two"></a>

### Pushing Images to Registry:

1. Push meou-api image to registry.

   - `cd api `
   - `docker build -t meou-api .`
   - `docker tag meou-api:latest faisallarai/meou-api:1.0.5`
   - `docker push faisallarai/meou-api:1.0.5`

2. Push meou-client image to registry.

   - `cd client `
   - `docker build -t meou-client .`
   - `docker tag meou-client:latest faisallarai/meou-client:1.0.5`
   - `docker push faisallarai/meou-client:1.0.5`

## Improvement

### This can be added to github / gitlab ci which will trigger pushing images to registry
