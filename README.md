# VF Translation Application

This project was intended to translate text files of one language to the other. Hosted on AWS S3 as a static webpage hosting here at [Translation Application](http://dlp-translation-app.s3-website-us-west-2.amazonaws.com).

## Backend

AWS API Gateway acts as a backend along with Lambda functions handling those APIs. Code for Lambda is in the branch "lambda".
Lambda internally calls the AWS Translate to perform the translation.

## Solution Architecture

Below diagram represents the solution architecture in AWS.
