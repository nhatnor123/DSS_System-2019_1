import json

#---------------------------------------------START BUS_INFO------------------------------------------------------
with open('businfo.json','r',encoding='utf-8') as json_file:
    data = json.load(json_file)
    buses_info = []
    stations_GoRoute = []
    stations_ReRoute = []
    for p in data:
        businfo = dict()
        businfo['BusCode'] = str(p['BusCode'])
        businfo['Name'] = str(p['Name'])
        businfo['TicketPrice'] = str(p['TicketPrice'])

        list_go = []
        list_re = []
        for st in p['GoRoute']:
            for key, value in st.items():
                list_go.append(key)
                stations_GoRoute.append(key)

        for st in p['ReRoute']:
            for key, value in st.items():
                list_re.append(key)
                stations_ReRoute.append(key)
        businfo['GoRoute'] = list_go
        businfo['ReRoute'] = list_re

        buses_info.append(businfo)

stations_GoRoute = set(stations_GoRoute)
stations_ReRoute = set(stations_ReRoute)
stations = set(stations_GoRoute).union(stations_ReRoute)
stations = sorted(list(stations))
#-------------------------------------END BUS_INFO------------------------------------------------------------


#-------------------------------------START BUSSES---------------------------------------------------------------
with open('busses.json','r',encoding='utf-8') as json_file:
    data_bus = json.load(json_file)
    busses = []
    for p in data_bus:
        bus = dict()
        bus['BusCode'] = str(p['BusCode'])
        bus['BusID'] = str(p['BusID'])
        bus['IsGoRouter'] = p['IsGoRouter']
        bus['Route'] = p['Route']
        busses.append(bus)
#-------------------------------------END BUSSES------------------------------------------------------------

stations_info = []
for i,station in enumerate(stations):
    station_info = dict()
    station_info['StationID'] = i
    station_info['Name'] = station
    station_info['FleetOver'] = []
    station_info['ComingBusCode'] = []
    station_info['ComingBus'] = []

    for bus_info in buses_info:
        if station in bus_info['GoRoute'] or station in bus_info['ReRoute']:
            station_info['FleetOver'].append(bus_info['BusCode'])

    for bus in busses:
        bus_coming = dict()
        for route in bus['Route']:
            check = False
            for key,value in route.items():
                if (station == key and value['distance'] != None):
                    if bus['BusCode'] not in station_info['ComingBusCode']:
                        station_info['ComingBusCode'].append(bus['BusCode'])

                    bus_coming['BusCode'] = bus['BusCode']
                    bus_coming['BusID'] = bus['BusID']
                    bus_coming['IsGoRouter'] = bus['IsGoRouter']
                    bus_coming['distance'] = value['distance']
                    bus_coming['time'] = value['time']
                    station_info['ComingBus'].append(bus_coming)
                    check = True
            if(check):
                break
    stations_info.append(station_info)

with open('stations.json', 'w') as outfile:
    json.dump(stations_info, outfile)
