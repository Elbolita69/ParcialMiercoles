
import PySimpleGUI as sg
import cv2
import requests
import csv
import os
import time
from datetime import datetime


def leer_placa(img):
    regions = ['us', 'mx']  
    with open(img, 'rb') as fp:
        response = requests.post(
            'https://api.platerecognizer.com/v1/plate-reader/',
            data=dict(regions=regions),
            files=dict(upload=fp),
            headers={'Authorization': 'Token 94e38f36dce5e23afbea8d2b194b67a99a326215'}
        )
    return response.json()


def guardar_datos_placa(data, csv_file='placas_registradas.csv'):
    if not os.path.exists(csv_file):
        with open(csv_file, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(["Fecha", "Hora", "Placa", "Confianza"])

    with open(csv_file, mode='a', newline='') as file:
        writer = csv.writer(file)
        for result in data['results']:
            plate = result['plate']
            confidence = result['score']
            now = datetime.now()
            fecha = now.strftime("%Y-%m-%d")
            hora = now.strftime("%H:%M:%S")
            writer.writerow([fecha, hora, plate, confidence])


sg.theme('DarkGrey6')
layout = [
    [sg.Text('Placas EVC PARKING', size=(40, 1), justification='center', font='Helvetica 20')],
    [sg.Image(filename='', key='image')],
    [sg.Button('Salir', size=(10, 1), font='Helvetica 14')]
]


window = sg.Window('Aplicación - Lectura Automática de Placas', layout, location=(800, 400))


cap = cv2.VideoCapture(0)


intervalo_captura = 2  
ultimo_tiempo = time.time() 

while True:
    event, values = window.read(timeout=20)
    if event == 'Salir' or event is None:
        break

    ret, frame = cap.read()
    if ret:
        imgbytes = cv2.imencode('.png', frame)[1].tobytes()
        window['image'].update(data=imgbytes)

       
        if time.time() - ultimo_tiempo >= intervalo_captura:
            foto = "temp.jpg"
            cv2.imwrite(foto, frame)  
            data = leer_placa(foto) 

            if data and 'results' in data and data['results']:
                guardar_datos_placa(data)  
                sg.popup_auto_close('Placa detectada y guardada', title='Éxito', auto_close_duration=1)

            ultimo_tiempo = time.time()  


window.close()
cap.release()
cv2.destroyAllWindows()