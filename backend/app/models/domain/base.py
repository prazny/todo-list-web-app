from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

from sqlalchemy.types import VARCHAR
from sqlalchemy import func


class HashColumn(VARCHAR):

    def bind_expression(self, bindvalue):
        # convert the bind's type from String to HEX encoded
        return func.HEX(bindvalue)

    def column_expression(self, col):
        # convert select value from HEX encoded to String
        return func.UNHEX(col)
