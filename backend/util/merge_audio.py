from pydub import AudioSegment
from pydub.playback import play

# Overlays multiple audio sources and writes them to the file located at out_file_name
# Will loop any audio source that is not long enough
# Will default to one minute duration of sound
#
# in_sources: Array of Strings containing names of files
# out_file_name: String with name of output file
#
def merge_audio (in_sources, out_file_name, gain={}, time_duration=60000):
    base_source = AudioSegment.silent(duration=time_duration)

    for source_name in in_sources:
        source_object = AudioSegment.from_file (source_name)

        # if source_name in gain:
        #     source_object += gain[source_name]
        # else:
        #     source_object -= 100

        sound_length = len (source_object)
        caret = 0

        while caret < time_duration:
            base_source = base_source.overlay (source_object, position = caret)
            caret += sound_length

    base_source.export(out_file_name, format="wav")

# if __name__=='__main__':
#     wav_file = 'midi/ai_output.wav'
#
#     merge_audio(
#         [wav_file, 'soundfiles/nature/rustling_leaves.mp3', 'soundfiles/binaural/binaural_low.wav'],
#         'merged.wav'
#     )
#
