import datetime as dt
from fmiopendata.wfs import download_stored_query



def get_temperature(location):
    observations = download_stored_query("fmi::observations::weather::multipointcoverage", 
                            args=['bbox=24,59,26,60.5',
                            'timeseries=True'])
    data = observations.data[location]
    print(data.keys())

    # times timestamp
    # t2m temperature
    # ws_10min wind speed
    # wg_10min
    # rh rain
    # td dew point?
    # r_1h rain 1h
    # ri_10min rain instant
    # snow_aws snow amount
    # p_sea pressure
    # vis meters

    temp = data['t2m']['values'][-1]
    wind_speed = data['ws_10min']['values'][-1]
    rain = data['ri_10min']['values'][-1]


    # if rain == 0.0:
    #     if temp < 5 or wind_speed > 10:
    #         return 'cold'
    #     elif wind_speed > 15:
    #         return 'intense'
    #     elif temp > 17:
    #         return 'pleasant'
    #     else:
    #         return ''
    #        
    #        
    #
    #    
    # else:
    #     if temp < 10:
    #         if wind_speed > 10:
    #             return 'intense'
    #         else:
    #             return 'gloomy'
    #     else:
    #         if wind_speed > 10:
    #             return 
        



    # data['t2m']['values'][-1] # temperature, last observation
    return {'temperature': temp, 'wind': wind_speed, 'rain': rain}
