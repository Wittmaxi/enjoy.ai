import psycopg2
from db.config import *

class Db_client:
    def __init__(self):
        self.params = config()
        print(self.params)

    def connect(self):
        self.con = psycopg2.connect(**self.params)
        self.cursor = self.con.cursor()

    def query(self, query):
        return_val = {}
        try:
            return_val["success"] = self.cursor.execute(query) 
        except (Exception, psycopg2.DatabaseError) as error:
            return_val["error"] = error
        
        return return_val

    def close(self):
        self.cursor.close()
        self.con.close()
        print("DB connection closed af")

            