from pydub import AudioSegment
from pydub.playback import play

# Overlays multiple audio sources and writes them to the file located at out_file_name
# Will loop any audio source that is not long enough
#
# in_sources: Array of Strings containing names of files
# out_file_name: String with name of output file
#
def merge_audio (in_sources, out_file_name, time_duration=60000):
    base_source = AudioSegment.silent(duration=time_duration)

    for source_name in in_sources:
        source_object = AudioSegment.from_file (source_name)
        
        sound_length = len (source_object)
        caret = 0

        while caret < time_duration:
            base_source = base_source.overlay (source_object, position = caret)
            caret += sound_length

    base_source.export(out_file_name, format="wav")