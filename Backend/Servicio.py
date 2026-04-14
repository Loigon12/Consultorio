class Servicio:
    def __init__(self, nombre, descripcion, precio):
        self.__nombre = nombre
        self.__descripcion = descripcion
        self.__precio = precio

    def getNombre(self):
        return self.__nombre
    
    def getDescripcion(self):
        return self.__descripcion
    
    def getPrecio(self):
        return self.__precio