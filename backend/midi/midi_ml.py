from __future__ import division
import random
import sys
from mido import Message, MidiFile, MidiTrack, MAX_PITCHWHEEL
import fluidsynth
from midi2audio import FluidSynth

def fs_create_ai():
    pass
    
# create random midi, save file as 
def ai_create_midi(filename) -> None:
    notes = [x for x in range(50, 100)]

    outfile = MidiFile()

    track = MidiTrack()
    outfile.tracks.append(track)

    track.append(Message('program_change', program=12))

    delta = 300
    ticks_per_expr = int(sys.argv[1]) if len(sys.argv) > 1 else 20
    for i in range(100):
        # note = random.choice(notes)
        note = notes[i % len(notes)]
        vel = random.randint(10, 127)
        track.append(Message('note_on', note=note, velocity=vel, time=delta))
        for j in range(delta // ticks_per_expr):
            pitch = MAX_PITCHWHEEL * j * ticks_per_expr // delta
            track.append(Message('pitchwheel', pitch=pitch, time=ticks_per_expr))
        track.append(Message('note_off', note=note, velocity=vel, time=0))
    outfile.save(filename)
    return 

def midi_to_wav(file, output_filename):
    fs = FluidSynth('/usr/share/soundfonts/FluidR3_GM.sf2')
    fs.midi_to_audio(file, output_filename)

def ai_create_wav(output_filename):
    tmp_name = 'tmp.mid'
    ai_create_midi(tmp_name)
    midi_to_wav(tmp_name, output_filename)
    
if __name__=='__main__':
    midi_file = 'ai_output.mid'
    wav_file = 'ai_output.wav'
    ai_create_midi(midi_file)
    midi_to_wav(midi_file, wav_file)
