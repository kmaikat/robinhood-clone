from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Asset(db.Model):
    __tablename__ = "assets"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey(add_prefix_for_prod("users.id")),
                        nullable=False)
    symbol = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    avg_price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)
    user = db.relationship("User", back_populates="assets")

    if environment == "production":
        __table_args__ = (
            db.UniqueConstraint("user_id", "symbol"), {
                "schema": SCHEMA,
            })
    else:
        __table_args__ = (
            db.UniqueConstraint("user_id", "symbol"),
        )

    def to_dict(self):
        return {
            "symbol": self.symbol,
            "name": self.name,
            "quantity": self.quantity,
            "avgPrice": self.avg_price
        }
