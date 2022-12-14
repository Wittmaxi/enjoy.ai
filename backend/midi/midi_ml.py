from __future__ import division
import random
from mido import Message, MetaMessage, MidiFile, MidiTrack, MAX_PITCHWHEEL, bpm2tempo
import fluidsynth
from midi2audio import FluidSynth

soundfont_dir = '/app/FluidR3_GM.sf2'

class AI_synth():
    def ai_create_midi(self, duration: float, bpm: float, tone: float, filename) -> None:
        outfile = MidiFile()
        track = MidiTrack()
        outfile.tracks.append(track)

        track.append(Message('program_change', program=12))

        delta = 300
        ticks_per_expr = 20

        while outfile.length < duration:
            track.append(MetaMessage('set_tempo', tempo=bpm2tempo(bpm)))

            note = int(min(127, max(0, random.gauss(tone, 20))))
            # vel = min(127, int(random.gauss(200, 10)))
            vel = 127
            track.append(Message('note_on', note=note, velocity=vel, time=delta))
            for j in range(delta // ticks_per_expr):
                pitch = MAX_PITCHWHEEL * j * ticks_per_expr // delta
                track.append(Message('pitchwheel', pitch=pitch, time=ticks_per_expr))
            track.append(Message('note_off', note=note, velocity=vel, time=0))
        outfile.save(filename)
        return 

    def midi_to_wav(self, file, output_filename):
        fs = FluidSynth(soundfont_dir)
        fs.midi_to_audio(file, output_filename)

    def ai_create_wav(self, duration: float, bpm: float, tone: float, filename) -> None:
        tmp_name = 'tmp.mid'
        self.ai_create_midi(duration, bpm, tone, tmp_name)
        self.midi_to_wav(tmp_name, filename)
    
# if __name__=='__main__':
#     soundfont_dir = './midi/FluidR3_GM.sf2'
#     synth = AI_synth()
#     # midi_file = 'ai_output.mid'
#     wav_file = 'ai_output.wav'
#     mood = 12
#     synth.ai_create_wav(
#         duration=60,
#         bpm=25.3 * mood,
#         tone=3.14 * mood ** 1.2, 
#         filename=wav_file)
#
