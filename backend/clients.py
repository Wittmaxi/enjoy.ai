from datetime import datetime
from db.db_client import Db_Client
import uuid

class Clients:
    def __init__(self, db_client):
        self.active_clients = {}
        self.db = db_client
    
    def add_client(self):
        new_uuid = str(uuid.uuid4())
        self.active_clients[new_uuid] = datetime.now()

        
        return new_uuid
    
    def add_client_mood(self, UUID, mood_v):
        return self.db.add_client_mood(UUID, mood_v)

    def get_client_mood(self, UUID):
        return self.db.get_client_mood(UUID)

    def remove_client(self, UUID):
        del self.active_clients[UUID]
    
    def is_user_active(self, UUID):
        return UUID in self.active_clients.keys()
