import psycopg2
from db.config import *

class Db_Client:
    def __init__(self):
        self.params = config()

    def connect(self):
        self.con = psycopg2.connect(**self.params)
        self.cursor = self.con.cursor()

    def query(self, query):
        return_val = {}
        try:
            self.cursor.execute(query)
            return_val["success"] = self.cursor.fetchone()
        except (Exception, psycopg2.DatabaseError) as error:
            return_val["error"] = error
        
        return return_val

    def close(self):
        self.cursor.close()
        self.con.close()
        print("DB connection closed af")

            