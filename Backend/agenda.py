from Cita import Cita
from datetime import date
from datetime import time
from typing import List
from Usuario import Usuario
from Servicio import Servicio
class Agenda:

    def __init__(self, citas: list[Cita], fechasDisponibles: list[date], horasDisponibles: list[time] ):
        self.__citas = citas
        self.__fechasDisponibles = fechasDisponibles
        self.__horasDisponibles = horasDisponibles

    def getCitas(self):
        return self.__citas
    
    def getFechasDisponibles(self):
        return self.__fechasDisponibles
    
    def getHorasDisponibles(self):
        return self.__horasDisponibles
    
    def mostrarFechas(self):
        if self.__fechasDisponibles == None:
            print("No hay Fechas registradas a esta agenda")
        else:
            for i in self.__fechasDisponibles:
                
               print(i)

    def mostrarHoras(self):
        if self.__horasDisponibles == None:
            print("No hay Fechas registradas a esta agenda")
        else:
            for i in self.__horasDisponibles:
                
               print(i)

fechas = [date]
fechas.append(date(2026, 4, 14))
fechas.append(date(2026, 4, 15))
fechas.append(date(2026, 4, 16))

citas = [Cita]

usuario = Usuario("juan", "C:C", 1111, "1234", "name@gmail")
servicio = Servicio("lavado dental", "se lavan los dientes", 50000)
citas.append(Cita(date(2026, 4, 13), time(11, 26, 0), usuario, servicio, 1 ))
citas.append(Cita(date(2026, 4, 13), time(11, 26, 0), usuario, servicio, 2 ))

horas = [time]

horas.append(time(2, 22, 0))
horas.append(time(1, 22, 0))
horas.append(time(1, 50, 0))


agenda = Agenda(citas, fechas, horas)

print(agenda.getCitas())
print(agenda.mostrarFechas())

print(agenda.mostrarHoras())