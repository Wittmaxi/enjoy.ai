from datetime import datetime
import uuid

class Clients:
    def __init__(self):
        self.active_clients = {}
    
    def add_client(self) -> str:
        new_uuid = str(uuid.uuid4())
        self.active_clients[new_uuid] = datetime.now()
        return new_uuid
    
    def remove_client(self, UUID):
        del self.active_clients[UUID]
    
    def is_user_active(self, UUID):
        return UUID in self.active_clients.keys()
