import datetime as dt
from fmiopendata.wfs import download_stored_query



def get_temperature(location):
    observations = download_stored_query("fmi::observations::weather::multipointcoverage", 
                            args=['bbox=24,59,26,60.5',
                            'timeseries=True'])
    data = observations.data[location]
    return data['t2m']['values'][-1] # temperature, last observation

if __name__=='__main__':
    print(get_temperature('Espoo Tapiola'))
    
