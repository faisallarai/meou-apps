## Author: Issaka Faisal

## Getting Started.

<a name="One"></a>

## Design

![alt text](https://lucid.app/publicSegments/view/18ea80c3-8e4c-4c31-95b7-27b836c5f01c/image.png)

<a name="Two"></a>

## Prerequisite:

1. docker
2. yarn
3. npm

<a name="Three"></a>

### S3 Bucket:

1. Create Bucket.

   - `aws s3api create-bucket --bucket meou-images --region us-east-1`

2. Add Bucket Policy to Bucket.

   - `{ "Version": "2008-10-17", "Statement": [ { "Sid": "AllowPublicRead", "Effect": "Allow", "Principal": { "AWS": "*" }, "Action": "s3:GetObject", "Resource": "arn:aws:s3:::meou-api/*" } ] }`

3. Upload Sample Images and take note of the image id.

<a name="Four"></a>

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
