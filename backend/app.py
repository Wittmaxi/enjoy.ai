import os
from flask import Flask, Response, jsonify
from flask import request
from db.db_client import Db_Client
from clients import Clients
app = Flask(__name__)

db = Db_Client()
db.connect()

clients = Clients()



@app.route('/request_audio', methods=['POST'])
def request_audio():
    json_ = request.json
    print(type(json_), flush=True)
    if "UUID" not in json_.keys():
        new_client = clients.add_client()
        return new_client
    else:
        print("DO COOL SHIT", flush=True) 

@app.route('/stream/<song_path>', methods=['GET'])
def stream(song_path):
    def generate(song_path):
        with open(song_path, "rb") as fwav:
            data = fwav.read(1024)
            while True:
                # if data == b'':
                #     fwav.seek(0)
                # else:
                yield data
                data = fwav.read(1024)
    return Response(generate(song_path), mimetype="audio/x-wav")

@app.route('/stop_stream/<UUID>', methods=['POST'])
def stop_stream(UUID):
    print(UUID)
    return UUID

if __name__ == "__main__":
    app.run(debug=True)