import requests

class Streaming_client:
    def __init__(self):
        self.FORMAT = pyaudio.paInt16
        self.CHANNELS = 2
        self.RATE = 44100
        self.CHUNK = 1024
        self.RECORD_SECONDS = 5
        self.audio1 = pyaudio.PyAudio()

    def generate(song_path):
        with open(song_path, "rb") as fwav:
            data = fwav.read(1024)
            while data:
                yield data
                data = fwav.read(1024)
        return Response(generate(), mimetype="audio/x-wav")

            