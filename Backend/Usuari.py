class Usuario:

    def __init__(self, nombre, tipoDocumento, numeroDocumento, contraseña, correo, direccion = None, esAdmin = False):
        

        self.id = None
        self.__nombre = nombre
        self.__tipoDocumento = tipoDocumento
        self.__numeroDocumento = numeroDocumento
        self.__direccion = direccion
        self.__contraseña = contraseña
        self.__correo = correo
        self.esAdmin = esAdmin
    
    def cambiarContraseña(self, contraseña, nuevaContraseña):
        if contraseña == self.__contraseña:
            self.__contraseña = nuevaContraseña
            return "Contraseña cambiada"
        else:
            return "Eror contraseña incorrecta"
        
    def editarNombre(self, nuevoNombre):
        self.__nombre = nuevoNombre

    def editarDireccion(self, nuevaDireccion):
        self.__direccion = nuevaDireccion

        


prueba = Usuario("Juan", "C.C", 11111, "1234", "name@gmail.com", )

print(prueba.nombre)