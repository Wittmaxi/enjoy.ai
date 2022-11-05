import os
from flask import Flask, Response, current_app, jsonify
from flask import request
from db.db_client import Db_Client
from clients import Clients
from util.merge_audio import merge_audio
from weather import Weather_model
from midi.midi_ml import AI_synth
import math
from backend.mood_gen_ml import generate_mood
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

    def generate_audio(uuid, mood):
        partial_waveforms = []

        curr_weather = Weather_model().get_temperature('Espoo Tapiola')

        AI_synth().ai_create_wav(
            duration=60,
            bpm=(
                    10 * curr_weather['temperature']**0.9
                    + 15 * curr_weather['wind_speed']
                    - 100 * curr_weather['rain'] ** 0.5
            ),
            tone=(math.sqrt(mood) * 13.4 - curr_weather['rain'] * math.pi),
            filename=f'{uuid}/synth.wav'
        )
        partial_waveforms.append(f'{uuid}/synth.wav')

        if mood > 2:
            partial_waveforms.append('soundfiles/binaural/binaural_high.wav')
        else:
            partial_waveforms.append('soundfiles/binaural/binaural_low.wav')
    
        nature_sounds = [f'soundfiles/nature/{x}' for x in os.listdir('soundfiles/nature')]
        if curr_weather['rain'] > 0.0:
            partial_waveforms.append('soundfiles/nature/waves.wav')
        else:
            partial_waveforms.append(nature_sounds[int(mood**3 - curr_weather['wind_speed'] * math.e) % 6])

        merge_audio(
            in_sources=partial_waveforms, 
            out_file_name=f'songs/{uuid}',
            time_duration=60000
        )

    if "UUID" not in json_.keys():
        new_client = clients.add_client()
        mood = generate_mood(json_)
        clients.add_client_mood(new_client, str(mood)) 
        

        # generating personalized audio for client
        generate_audio(new_client, mood)

        return jsonify({"UUID": new_client})
    else:
        uuid = json_["UUID"]
        del json_["UUID"]
        mood = generate_mood(json_)

        print("ADDING MOOD FOR UUID {uuid}", flush=True)
        
        clients.add_client_mood(uuid, str(mood))

        # generating personalized audio for client
        generate_audio(new_client, mood)

        return jsonify({"UUID": uuid})

@app.route('/stream/<UUID>', methods=['GET'])
def stream(UUID):

    # Get path to song
    path = db.get_path_for_client(UUID)

    print(path)

    def generate(song_path):
        with open(song_path, "rb") as fwav:
            data = fwav.read(1024)
            while True:
                # if data == b'':
                #     fwav.seek(0)
                # else:
                yield data
                data = fwav.read(1024)
    return Response(generate("/app/songs/CREMEBRULEE.wav"), mimetype="audio/x-wav")

if __name__ == "__main__":
    app.run(debug=True)
