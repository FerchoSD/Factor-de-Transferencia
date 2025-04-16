# Guía de Git™: Implementación

**Última modificación:** 13 de noviembre de 2024

## Descripción general
La función de Control de Versiones de Git™ le permite implementar sus repositorios administrados por cPanel. Generalmente, la implementación envía el código terminado a producción. Puede usar diferentes configuraciones para implementar los cambios de forma automática (implementación push) o manual (implementación pull).

Por ejemplo, podría usar la implementación para realizar cambios en su sitio web localmente. Luego, se enviarán automáticamente a un directorio en su cuenta de cPanel.

- Para obtener más información sobre cómo implementar cambios, lea nuestra documentación de Control de versiones de Git™.
- Para obtener más información sobre cómo solucionar problemas con esta función, lea nuestra documentación de Configuración avanzada y solución de problemas.
- Para obtener más información sobre los comandos de Git, como git push, git pull, o git commit, lea nuestra documentación de comandos comunes de Git.

## Requisitos
Antes de la implementación, los repositorios deben cumplir los siguientes requisitos:
- Un archivo registrado válido `.cpanel.yml` en el directorio de nivel superior.
- Una o más sucursales locales o remotas.
- Un árbol de trabajo limpio.

Si un repositorio no cumple estos requisitos, el sistema no mostrará la información de implementación. Además, deshabilitará la función de implementación.

---

## El archivo YAML de implementación
El `.cpanel.yml` determina cómo y dónde se implementan los archivos modificados. Debe registrar un `.cpanel.yml` en el directorio principal para cada repositorio administrado por cPanel que implemente. Los archivos `.cpanel.yml` deben usar el formato de los ejemplos a continuación.

**Importante:**
- Los archivos a continuación son solo ejemplos. Debe actualizarlos según sus necesidades. Estos archivos no le permitirán implementar un repositorio correctamente.
- No utilice un carácter comodín, como un asterisco, para implementar todos los archivos. Esto podría implementar elementos como el `.git` y causar problemas graves.
- No utilice caracteres no válidos en archivos YAML. Para más información, consulte la sección "Caracteres de escape" de la Especificación YAML de yaml.org.

### Archivo .cpanel.yml real para este proyecto

A continuación se muestra el archivo `.cpanel.yml` configurado para desplegar el sitio web Factor de Transferencia Inmunomedi en la ruta de hosting `/home2/inmunovi/factor-de-transferencia/`.

```yaml
---
deployment:
  tasks:
    # Define el directorio de destino en tu cuenta de cPanel
    - export DEPLOYPATH=/home2/inmunovi/factor-de-transferencia/
    # Copia los archivos principales del sitio web
    - /bin/cp index.html $DEPLOYPATH
    - /bin/cp productos.html $DEPLOYPATH
    - /bin/cp carrito.html $DEPLOYPATH
    - /bin/cp contacto.html $DEPLOYPATH
    - /bin/cp nosotros.html $DEPLOYPATH
    - /bin/cp terminos.html $DEPLOYPATH
    - /bin/cp política\ de\ privacidad.html $DEPLOYPATH
    # Copia los archivos de estilos y scripts
    - /bin/cp styles.css $DEPLOYPATH
    - /bin/cp inmunomedi-premium.css $DEPLOYPATH
    - /bin/cp script.js $DEPLOYPATH
    - /bin/cp inmunomedi-particles.js $DEPLOYPATH
    # Copia el directorio de recursos (imágenes, etc.)
    - /bin/cp -R recursos $DEPLOYPATH
```

**Explicación:**
- Este archivo asegura que solo los archivos y carpetas necesarios para el funcionamiento del sitio web se copien al entorno de producción.
- La variable `DEPLOYPATH` apunta a la ruta real de tu hosting según la configuración de cPanel.
- Se copian todos los archivos HTML principales, hojas de estilo, scripts y el directorio de recursos.

> **Nota:** Si agregas nuevos archivos relevantes para el sitio, recuerda añadirlos en este archivo para que también se desplieguen.    - export DEPLOYPATH=/home/example/public_html/
    - /bin/cp -R images $DEPLOYPATH
```

---

## Implementación automática o push
La interfaz de control de versiones Git™ de cPanel agrega automáticamente un gancho posterior a la recepción a todos los repositorios administrados por cPanel.

Cuando envía cambios directamente a un repositorio administrado por cPanel que incluye un `.cpanel.yml`, el enlace implementa esos cambios automáticamente.

Con la implementación push, un solo `git push` envía los cambios desde su equipo local al repositorio administrado por cPanel. El sistema ejecuta automáticamente los comandos en su `.cpanel.yml`. Esta configuración enviará los cambios desde el repositorio administrado por cPanel a un directorio de producción (por ejemplo, al directorio que contiene los archivos públicos de su sitio web).

**Nota:** Puede utilizar la implementación manual para implementar su repositorio nuevamente sin realizar nuevos cambios.

---

## Despliegue manual o de tracción
Con la implementación de extracción, el `git push` envía cambios desde su computadora local a un repositorio remoto.

Al hacer clic en **Actualizar desde remoto** en la pestaña Extraer o Implementar de la sección Administrar de la interfaz de Control de versiones Git™ de cPanel, el sistema recupera los cambios del repositorio remoto y los aplica al repositorio administrado por cPanel.

Al hacer clic en **Implementar HEAD Commit**, el sistema ejecuta los comandos de su `.cpanel.yml` para enviar los cambios desde el repositorio administrado por cPanel a un directorio de producción.
