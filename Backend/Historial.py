from typing import List
from Usuario import Usuario
from Cita import Cita
from datetime import date
from datetime import time
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

usuario = Usuario("juan", "C:C", 1111, "1234", "name@gmail")
cita1 = Cita(date(2026, 4, 13), time(11, 26, 0), usuario, 1 )
cita2 = Cita(date(2026, 4, 13), time(11, 26, 0), usuario, 1 )

historial = Historial(usuario, [cita1, cita2], "hola")

print(historial.getCitas()[0].getDia())

# Importante no se pq pero al poner un solo objeto en la lista de citas si se intenta imprimir da error
"""
historial2 = Historial(usuario, cita1, "hola")

print(historial2.getCitas())
"""