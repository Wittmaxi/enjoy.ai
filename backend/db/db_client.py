from math import e
from flask import app
import psycopg2
import time
from db.config import *
from util.generate_audio import generate_audio


class Db_Client:
    def __init__(self):
        self.params = config()
        self.isCon = False

    def connect(self):
        while True:
            try:
                self.con = psycopg2.connect(**self.params)
                self.con.autocommit = True
                break
            except:
                print('Could not connect to db, trying again...')
                time.sleep(5)
        self.cursor = self.con.cursor()
        self.cursor.execute('''
CREATE TABLE IF NOT EXISTS audio_files (
    mood TEXT PRIMARY KEY,
    path_to_song TEXT
);''')

        self.cursor.execute('''
CREATE TABLE IF NOT EXISTS uuid_mood (
    uuid TEXT PRIMARY KEY,
    mood TEXT
);''')

        self.cursor.execute('''
INSERT INTO audio_files (mood, path_to_song) VALUES ('ABC', '/app/soundfiles/CREMEBRULEE.wav') ON CONFLICT DO NOTHING
        ''')

        self.cursor.execute('select * from audio_files;')
        self.con.commit()
        self.isCon = True

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
        self.isCon = True
        print("DB connection closed af")

    def add_client_mood(self, UUID, mood_v):
        if self.isCon:
            self.cursor.execute("INSERT INTO uuid_mood (uuid, mood) VALUES (%s, %s) ON CONFLICT (uuid) DO UPDATE SET uuid = %s", (UUID, mood_v, UUID))
            self.cursor.execute("SELECT uuid, mood FROM uuid_mood WHERE uuid = %s", (UUID,))
            return self.cursor.fetchone()
        else:
            return "No Connection"
    
    def get_client_mood(self, UUID):
        if self.isCon:
            self.cursor.execute("SELECT mood FROM uuid_mood WHERE uuid = %s", (UUID,))
            return self.cursor.fetchone()
        else:
            return "No Connection"
    
    def get_path_for_client(self, UUID):
        if self.isCon:
            self.cursor.execute("SELECT mood FROM uuid_mood WHERE uuid = %s", (UUID,))
            mood = self.cursor.fetchone()
            if mood is None:
                return 'No record'
            
            self.cursor.execute("SELECT path_to_song FROM audio_files WHERE mood = %s", (mood[0],))
            path = self.cursor.fetchone()

            return path
        else:
            return "No Connection" 
            
    def add_generated_audio(self, mood_v, path):
        if self.isCon:
            self.cursor.execute("INSERT INTO audio_files (mood, path_to_song) VALUES (%s, %s) ON CONFLICT (mood) DO UPDATE SET path_to_song = %s", (mood_v, path, path))
        else:
            return "No Connection"

