# Integración de Azure Bot a un cliente web
En este proyecto conectamos un Azure Bot desarrollado en C# a un cliente web mediante el canal de Direct Line.

## Clonar este repositorio
En el terminal ejecutar el siguiente comando:
  ```bash
  git clone https://github.com/jbenatem/gc-asistentes-virtuales-sesion6.git
  ```

## Aprovisionar el servicio de Azure Bot Service
Para crear un nuevo recurso de Bot primero debe contar con una subscripción de Azure. En este [enlace](https://docs.microsoft.com/en-us/azure/bot-service/abs-quickstart?view=azure-bot-service-4.0&tabs=csharp) puede hay una guía para poder crear este recurso desde el [portal](https://portal.azure.com).

## Activar el canal de Direct Line
Luego de aprovisionar su recurso de Bot deberá habilitar el canal de Direct Line y guardar el Direct Line secret. Para realizar esta tarea ingrese a la siguiente [guía](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-channel-connect-directline?view=azure-bot-service-4.0).

## Guardar Direct Line Secret en la configuración del Bot
En appsettings.json, registrar el secret de Direct Line.
  ```json
{
    "MicrosoftAppId": "",
    "MicrosoftAppPassword": "",
    "DirectLineSecret": "INGRESAR DIRECT LINE SECRET"
}
  ```

## Actualizar endpoint del servicio de generación de Direct Line tokens
En index.js, ubicar el método generateDirectLineToken y actualizar la url del token controller.
  ```js
async function generateDirectLineToken() {
    const response = await fetch('INGRESAR URL DE TOKEN CONTROLLER', {
        method: 'POST'
    })
    const { token } = await response.json();
    return token;
}
  ```

## Desplegar Bot a Azure
Para aprender más sobre el despliegue de un bot a Azure, revise la siguiente [documentación](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-deploy-az-cli?view=azure-bot-service-4.0&tabs=csharp).
