from typing import List
from Usuario import Usuario
from Cita import Cita
from datetime import date
from datetime import time
from Servicio import Servicio
from agenda import Agenda

class Clinica:
    def __init__(self, usuarios : list[Usuario] , citas : list[Cita], agenda : Agenda, servicios: list[Servicio] ):
        self.__usuarios = usuarios
        self.__citas = citas
        self.__agenda = agenda
        self.__servicios = servicios

    def getUsuarios(self):
        return self.__usuarios
    
    def getCitas(self):
        return self.__citas
    
    def getAgenda(self):
        return self.__agenda
    
    def getServicios(self):
        return self.__servicios
    
    def registrarse(self, nuevoUsuario):
        
