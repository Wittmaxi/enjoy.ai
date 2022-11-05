from __future__ import division
import random
import sys
from mido import Message, MetaMessage, MidiFile, MidiTrack, MAX_PITCHWHEEL, bpm2tempo
import fluidsynth
from midi2audio import FluidSynth


class AI_synth():
    def __init__(self) -> None:
        self.bpm = 120
        self.mean = 70
        self.bpm_target = 70
        self.mean_target = 120
        pass

    def update_bpm(self, bpm, force=False):
        self.bpm_target = bpm
        if force:
            self.bpm = bpm

    def update_tone(self, tone, force=False):
        self.mean_target = tone
        if force:
            self.mean = tone

    # create random midi, save file as 
    def ai_create_midi(self, duration: float, filename) -> None:
        notes = [x for x in range(50, 100)]

        outfile = MidiFile()

        track = MidiTrack()
        outfile.tracks.append(track)

        track.append(Message('program_change', program=12))

        delta = 300
        ticks_per_expr = int(sys.argv[1]) if len(sys.argv) > 1 else 20

        elapsed = 0
        while elapsed < duration:
            track.append(MetaMessage('set_tempo', tempo=bpm2tempo(self.bpm)))

            note = int(min(127, max(0, random.gauss(self.mean, 20))))
            vel = int(random.gauss(64, 10))
            track.append(Message('note_on', note=note, velocity=vel, time=delta))
            for j in range(delta // ticks_per_expr):
                pitch = MAX_PITCHWHEEL * j * ticks_per_expr // delta
                track.append(Message('pitchwheel', pitch=pitch, time=ticks_per_expr))
            track.append(Message('note_off', note=note, velocity=vel, time=0))

            # change bpm towards target
            bpm_diff = self.bpm_target - self.bpm
            self.bpm += min(1.1, max(-1.1, bpm_diff))
            mean_diff = self.mean_target - self.mean
            self.mean += min(0.5, max(-0.5, mean_diff))
            elapsed = outfile.length
        outfile.save(filename)
        return 

    def midi_to_wav(self, file, output_filename):
        fs = FluidSynth('/usr/share/soundfonts/FluidR3_GM.sf2')
        fs.midi_to_audio(file, output_filename)

    def ai_create_wav(self, duration, output_filename):
        tmp_name = 'tmp.mid'
        self.ai_create_midi(duration, tmp_name)
        self.midi_to_wav(tmp_name, output_filename)
    
if __name__=='__main__':
    synth = AI_synth()
    synth.update_bpm(150, force=True)
    synth.update_bpm(100)
    synth.update_tone(30, force=True)
    synth.update_tone(100)
    # midi_file = 'ai_output.mid'
    wav_file = 'ai_output.wav'
    synth.ai_create_wav(60, wav_file)
