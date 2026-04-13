class Usuario:

    def __init__(self, nombre, tipoDocumento, numeroDocumento, contraseña, correo, direccion = None, esAdmin = False, id = None):
        

        self.__id = id
        self.__nombre = nombre
        self.__tipoDocumento = tipoDocumento
        self.__numeroDocumento = numeroDocumento
        self.__direccion = direccion
        self.__contraseña = contraseña
        self.__correo = correo
        self.__esAdmin = esAdmin

    def getId(self):
        return self.__id

    def getNombre(self):
        return self.__nombre
    
    def getTipoDocumento(self):
        return self.__tipoDocumento
    
    def getNumeroDocumento(self):
        return self.__numeroDocumento

    def getDireccion(self):
        return self.__direccion

    def getCorreo(self):
        return self.__correo
    
    def getEsAdmin(self):
        return self.__esAdmin
    
    
    def __cambiarContraseña(self, contraseña, nuevaContraseña):
        if contraseña == self.__contraseña:
            self.__contraseña = nuevaContraseña
            return "Contraseña cambiada"
        else:
            return "Eror contraseña incorrecta"
        
    def editarNombre(self, nuevoNombre):
        self.__nombre = nuevoNombre

    def editarDireccion(self, nuevaDireccion):
        self.__direccion = nuevaDireccion

    

"""""       
prueba = Usuario("juan", "C:C", 1111, "1234", "name@gmail")

print(prueba.getCorreo)

prueba.__esAdmin = True

print(prueba.__esAdmin)
"""