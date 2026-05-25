from typing import List
from Usuario import Usuario
from Cita import Cita
from datetime import date
from datetime import time
from Servicio import Servicio
class Historial:
    def __init__(self, usuario : Usuario, citas : list[Cita], comentarios):
        self.__usuario = usuario
        self.__citas = citas
        self.__comentarios = comentarios 
    
    def getUsuario(self):
        return self.__usuario
    
    def getCitas(self):
        return self.__citas
    
    def getComentarios(self):
        return self.__comentarios
    
    def añadirCita(self, nueva : Cita):

        self.__citas.append(nueva)

    def mostrarCitas(self):

        if self.__citas == None:
            print("No hay citas registradas a este paciente")
        else:
            for i in self.__citas:
                
                print(f"Fecha: {i.getDia()}, Hora: {i.getHora()}, Usuario: {i.getUsuario().getNombre()}, Servicio: {i.getServicio().getNombre()}, Id: {i.getId()}")
                
                

usuario = Usuario("juan", "C:C", 1111, "1234", "name@gmail")
servicio = Servicio("lavado dental", "se lavan los dientes", 50000)
cita1 = Cita(date(2026, 4, 13), time(11, 26, 0), usuario, servicio, 1 )
cita2 = Cita(date(2026, 4, 13), time(11, 26, 0), usuario, servicio, 2 )

historial = Historial(usuario, [cita1, cita2], "hola")

print(historial.getCitas()[0].getDia())
print(historial.getCitas()[1].getServicio().getNombre())

cita3 = Cita(date(2026, 4, 14), time(12, 21, 0), usuario, servicio, 3)

historial.añadirCita(cita3)

print(historial.getCitas())

historial.mostrarCitas()
# Importante no se pq pero al poner un solo objeto en la lista de citas si se intenta imprimir da error
"""
historial2 = Historial(usuario, cita1, "hola")

print(historial2.getCitas())
"""