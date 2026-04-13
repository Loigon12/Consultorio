import Usuario
import Cita
class Historial:
    def __init__(self, usuario, citas, comentarios):
        self.__usuario = Usuario(usuario)
        self.__citas = Cita[citas]
        self.__comentarios = comentarios 
    
    def getUsuario(self):
        return self.__usuario
    
    def getCitas(self):
        return self.__citas
    
    def getComentarios(self):
        return self.__comentarios
    
    def añadirCita(self, nuevaCita):
        nueva = Cita(nuevaCita)

        self.__citas.appen(nueva)

usuario = Usuario("juan", "C:C", 1111, "1234", "name@gmail")
cita1 = Cita("1/1/2000", "1:50pm", usuario, 1 )

histprial = Historial(usuario, cita1, "hola")

print(histprial.getCitas)