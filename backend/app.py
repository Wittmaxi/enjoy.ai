import os
from flask import Flask, Response, current_app, jsonify
from flask import request
from db.db_client import Db_Client
from clients import Clients
from util.generate_audio import generate_audio
from util.merge_audio import merge_audio
from weather import get_temperature
from midi.midi_ml import AI_synth
import math
from mood_gen_ml import generate_mood
import time
app = Flask(__name__)

db = Db_Client()
db.connect()

clients = Clients(db)

"""
|   Requesting audio from the server.   
|   
|   Input: JSON with statistics from the application AND a UUID (User ID) if the FE has one
|   
|   Output: 
"""
@app.route('/request_audio', methods=['POST'])
def request_audio():
    json_ = request.json

    if "UUID" not in json_.keys():
        new_client = clients.add_client()
        mood = generate_mood(json_)
        clients.add_client_mood(new_client, str(mood)) 

        before = time.time_ns()
        generate_audio(mood, db)
        print(f'Generating audio took {(time.time_ns() - before) * 1e9}s')

        return jsonify({"UUID": new_client})
    else:
        uuid = json_["UUID"]
        del json_["UUID"]
        mood = generate_mood(json_)

        print(f"ADDING MOOD FOR UUID {uuid}", flush=True)
        
        clients.add_client_mood(uuid, str(mood))
        before = time.time_ns()
        generate_audio(mood, db)
        print(f'Generating audio took {(time.time_ns() - before) * 1e9}s')

        return jsonify({"UUID": uuid})

@app.route('/stream/<UUID>', methods=['GET'])
def stream(UUID):

    # Get path to song
    path = db.get_path_for_client(UUID)
    if path is None:
        path = "/app/soundfiles/CREMEBRULEE.wav"
    else:
        path = path[0]


    print(path, flush=True)
    def generate(song_path):
        with open(song_path, "rb") as fwav:
            data = fwav.read(1024)
            while True:
                yield data
                data = fwav.read(1024)
    return Response(generate(path), mimetype="audio/x-wav")

if __name__ == "__main__":
    app.run(debug=True)
