import sys
from dotenv import load_dotenv, dotenv_values
from starlette.responses import JSONResponse
from starlette.requests import Request
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr, BaseModel
from typing import List
from fastapi_mail.email_utils import DefaultChecker


class EmailSchema(BaseModel):
    email: List[EmailStr]


config = dotenv_values()


async def send_activation_mail(email, activate_token):
    html = """
    <p>Hi! Activate your account and manage your projects!</p><br>
    http://localhost:3000/authentication/sign-in?activation_token={token}
    """.format(token=activate_token)

    message = MessageSchema(
        subject="Activate your account",
        recipients=[email],
        body=html,
        subtype="html"
    )

    conf = ConnectionConfig(
        MAIL_USERNAME=config['MAIL_USERNAME'],
        MAIL_PASSWORD=config['MAIL_PASSWORD'],
        MAIL_FROM=config['MAIL_FROM'],
        MAIL_PORT=config['MAIL_PORT'],
        MAIL_SERVER=config['MAIL_SERVER'],
        MAIL_FROM_NAME=config['MAIL_FROM_NAME'],
        MAIL_TLS=config['MAIL_TLS'],
        MAIL_SSL=config['MAIL_SSL'],
        USE_CREDENTIALS=config['USE_CREDENTIALS'],
        VALIDATE_CERTS=config['VALIDATE_CERTS']

    )

    fm = FastMail(conf)
    await fm.send_message(message)

