from werkzeug.datastructures import FileStorage
import os
import boto3

s3 = boto3.client(
    's3',
    aws_access_key_id = os.environ.get('S3_KEY'),
    aws_secret_access_key = os.environ.get('S3_SECRET')
)

def upload_file(file: FileStorage) -> str:
    s3.upload_fileobj(
        file,
        os.environ.get('S3_BUCKET'),
        'profile-image/' + file.filename,
        ExtraArgs = {
            "ContentType": file.content_type
        }
    )

    return f"{os.environ.get('S3_LOCATION')}/{file.filename}"
