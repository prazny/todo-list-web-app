class Base:
    id: int

    def __tablename__(cls) -> str:
        return cls.__name__.lower()
