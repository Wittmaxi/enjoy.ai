import os
from flask import Flask, Response
from flask import request
from db.db_client import Db_client
app = Flask(__name__)

db = Db_client()
db.connect()




@app.route('/request_audio', methods=['POST'])
def request_audio():
    print(request.get_json())
    return '<h1>Hello from Flask & Docker</h2>'

@app.route('/stream/<song_path>', methods=['GET'])
def stream(song_path):
    def generate(song_path):
        with open(song_path, "rb") as fwav:
            data = fwav.read(1024)
            while True:
                if data == b'':
                    fwav.seek(0)
                else:
                    yield data
                data = fwav.read(1024)
    return Response(generate(song_path), mimetype="audio/x-wav")

@app.route('/stop_stream/<UUID>', methods=['POST'])
def stop_stream(UUID):
    print(UUID)
    return UUID

if __name__ == "__main__":
    app.run(debug=True)