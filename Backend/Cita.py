import Usuario
class Cita:

    def __init__(self, fecha, hora, usuario, id = None):
        self.__fecha = fecha
        self.__hora = hora
        self.__usuario = Usuario(usuario)
        self.__id = id

    def getDia(self):
        return self.__fecha
    
    def getHora(self):
        return self.__hora
    
    def getUsuario(self):
        return self.__usuario
    
    def getId(self):
        return self.__id