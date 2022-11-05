import os
from flask import Flask, Response, jsonify
from flask import request
from db.db_client import Db_Client
from clients import Clients
app = Flask(__name__)

db = Db_Client()
db.connect()

clients = Clients(db)



@app.route('/request_audio', methods=['POST'])
def request_audio():
    json_ = request.json

    if "UUID" not in json_.keys():
        new_client = clients.add_client()
        clients.add_client_mood(new_client, "ABC") 
        return jsonify(new_client)
    else:
        uuid = json_["UUID"]
        print("ADDING MOOD FOR UUID {uuid}", flush=True)
        clients.add_client_mood(uuid, "HEJ")
        return jsonify(clients)

@app.route('/stream/<UUID>', methods=['GET'])
def stream(UUID):

    # Get path to song
    path = db.get_path_for_client(UUID)

    print(path)

    # def generate(song_path):
    #     with open(song_path, "rb") as fwav:
    #         data = fwav.read(1024)
    #         while True:
    #             # if data == b'':
    #             #     fwav.seek(0)
    #             # else:
    #             yield data
    #             data = fwav.read(1024)
    # return Response(generate(song_path), mimetype="audio/x-wav")
    return jsonify(path)


if __name__ == "__main__":
    app.run(debug=True)