import json
import logging
import boto3
import os

def lambda_handler(event, context):
    
    translate = boto3.client(service_name='translate', region_name='us-west-2', use_ssl=True)
    mapping = {'English': 'en', 'Italian': 'it', 'Romanian': 'ro', 'Czech': 'cs', 'Hungarian': 'hu', 'Spanish': 'es', 'German': 'de'}
    
    try:
        source_language = event['queryStringParameters']['source_language']
        source_language = mapping[source_language]
    except:
        source_language = 'auto'
    
    try:
        target_language = event['queryStringParameters']['target_language']
        target_language = mapping[target_language]
    except:
        target_language = 'it'
    
    try:
        text_input = event['queryStringParameters']['text_input']
    except:
        text_input = 'My name is Tejas'
    
    result = translate.translate_text(Text=text_input, SourceLanguageCode=source_language, TargetLanguageCode=target_language)
    # transText = result.get('TranslatedText')
    # open('result.txt', 'wb').write(transText.content)
    # textFile = open('result.txt', 'rb')
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(result.get('TranslatedText'))
    }
    