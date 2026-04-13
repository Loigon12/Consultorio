from Usuario import Usuario
from datetime import date
from datetime import time
class Cita:

    def __init__(self, fecha : date, hora : time, usuario : Usuario, id = None):
        self.__fecha = fecha
        self.__hora = hora
        self.__usuario = usuario
        self.__id = id

    def getDia(self):
        return self.__fecha
    
    def getHora(self):
        return self.__hora
    
    def getUsuario(self):
        return self.__usuario
    
    def getId(self):
        return self.__id


"""
usuario = Usuario("juan", "C:C", 1111, "1234", "name@gmail",)
cita1 = Cita(date(2026, 4, 13), time(11, 26, 0), usuario, 1 )

print(cita1.getDia())
print(cita1.getUsuario().getNombre())
"""