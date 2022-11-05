from midi.midi_ml import AI_synth
import os, math
from util.merge_audio import merge_audio

def generate_audio(mood, db):
    song_path = '/generated_songs'
    output_path = f'{song_path}/{mood}.wav' 

    if not os.path.exists(song_path):
        os.mkdir(song_path)
        os.mkdir(f'{song_path}/tmp')
    partial_waveforms = []

    AI_synth().ai_create_wav(
        duration=60,
        bpm=25.3 * mood,
        tone=math.pi * mood ** 0.8,
        filename=f'{song_path}/tmp/{mood}_synth.wav'
    )
    partial_waveforms.append(f'{song_path}/tmp/{mood}_synth.wav')

    if mood > math.pi ** 2:
        partial_waveforms.append('soundfiles/binaural/binaural_high.wav')
    else:
        partial_waveforms.append('soundfiles/binaural/binaural_low.wav')

    nature_sounds = [f'/app/soundfiles/nature/{x}' for x in os.listdir('soundfiles/nature')]
    partial_waveforms.append(nature_sounds[int(mood * 6 // 25)])

    merge_audio(
        in_sources=partial_waveforms, 
        out_file_name=output_path,
        time_duration=60000
    )

    db.add_generated_audio(mood, output_path)

