# API CRUD Fronted y Backend usando Angular, NodeJS y MongoDB

*Nombre: Gonzalo*

*Apellidos: Rando Serna*


## Resumen
Aplicación Web diseñada para una empresa donde sus empleados quieren guardar información de los ordenadores y las ventas que realizan.

Proyecto programado en TypeScript, usando el framework Angular. Página con login, accedes a un menú con distintas opciones donde veremos los objetos de la base de datos, podrás modificarlos, buscar objetos en la base de datos y mostrar diferentes consultas.

En la base de datos tenemos distintas colecciones, una de ellas creada automáticamente.
Carpeta de ordenadores fronted, carpeta servidor backend.



## Funcionamiento
Al entrar a la página nos aparece un login donde nos deberemos de loguear con el usuario y contraseña administrador de la base de datos.

![LoginInicial](https://user-images.githubusercontent.com/103594582/197405972-30f15863-c67b-4b54-8c43-95088989e8b0.png)

Debemos poner obligatoriamente el usuario y contraseña, si no el formulario de inicio de sesión nos manda un error.

![LoginError](https://user-images.githubusercontent.com/103594582/197406083-df4933ec-c3c4-48aa-b090-1a93174ba868.png)

Nos logueamos con un usuario y contraseña válidos y accedemos a el menú principal donde podemos ver todos los ordenadores de la base de datos, las ventas, las marcas con las que trabajamos, realizar consultas útiles para nuestros empleados o desconectarnos de la base de datos.

![menu](https://user-images.githubusercontent.com/103594582/197406236-9ac4eeb7-30e2-444d-8b52-f31ddb0c5c19.png)



### Ordenadores
Al pulsar en ordenadores, veremos todos los ordenadores que hemos vendido, podremos editarlos, crear ordenadores nuevos, eliminarlos, o filtrar por ID.

![OrdenadoresMenu](https://user-images.githubusercontent.com/103594582/197406376-27ed978f-893c-4bb0-a001-9bb8dad0091f.png)

La estructura de los documentos de ordenadores es la siguiente:
<pre>
 idVenta,
 idOrdenador,
 caracteristicas:{
        placa:{
            socket,
            marca,
            puertos
        },
        memoria: {
            capacidad,
            tipo
        },
        procesador:{
            marca,
            modelo,
            generacion
        },
        tarjeta_grafica:{
            tipo,
            marca,
            modelo
        },
        caja:{
            color,
            dimensiones:{
                h,
                w
            },
            usb
        },
        fuente,
        disco:[{
            tipo,
            capacidad,
        }],
        sistema_operativo,
        fecha_fabricacion
    },
 perifericos,
 precio
</pre>

Filtrado de ordenadores por el id 43.

![OrdenadorFilter](https://user-images.githubusercontent.com/103594582/197406995-11dabea7-d121-4fea-b315-5fd00a48b663.png)

Para añadir un nuevo ordenador debemos rellenar el siguiente formulario y debe existir la venta a la que pertenece.

![OrdenadorForm](https://user-images.githubusercontent.com/103594582/197407094-9cbe3811-2844-4804-863b-5c5c20bc4076.png)



### Ventas
Al pulsar en ventas veremos la misma información que anteriormente, pero ahora referente a las ventas.

![VentasMenu](https://user-images.githubusercontent.com/103594582/197407181-b6d307de-0b29-4411-933c-4bf9b85bf1e1.png)

La estructura de los documentos de las ventas es la siguiente:

<pre>
 {
  idVenta,
  vendedor,
  comprador,
  fechaVenta
 }
</pre>

Vamos a crear una nueva venta, para ello pulsamos el botón de nueva venta y rellenamos el formulario

![VentaForm](https://user-images.githubusercontent.com/103594582/197407340-638fa6ce-eda7-403e-903e-fb5461fd8be1.png)

Vemos la venta ya creada.

![VentaCreada](https://user-images.githubusercontent.com/103594582/197407434-dd655cfd-8f80-463c-9d7e-e6fd99b638d3.png)

Editamos la venta cambiando al comprador.

![VentaEditada](https://user-images.githubusercontent.com/103594582/197416156-62bae94c-f78d-4b55-af97-d74fb7802592.png)

Venta actualizada correctamente.

![VentaActualizada](https://user-images.githubusercontent.com/103594582/197419175-487c563d-80f2-4ca0-84a5-e49c6dadceea.png)



### Ventas, artículos y marcas
Al pulsar en ventas, artículos y marcas, podremos ver todas las ventas con todos los artículos vendidos y sus respectivas marcas.

![VentasMarcasArticulos](https://user-images.githubusercontent.com/103594582/197419298-0a1bb23e-f108-4433-ae72-46b7b6c8a729.png)

Estos datos llegan mediante la siguiente consulta:

<pre>
Venta.aggregate([{
      $lookup:{
          from: 'ordenadores',
          localField: 'idVenta',
          foreignField: 'idVenta',
          as: 'equipo'
      }
  },
  {
      $unwind: {
          path:"$equipo"
      }
  },
  {
      $lookup:{
          from: 'marcas',
          localField: 'equipo.idOrdenador',
          foreignField: 'ordenadores',
          as: 'equipo.marcas'
      }
  },
  {
      $project:{
          idVenta: 1,
          vendedor: 1,
          comprador: 1,
          fechaVenta: 1,
          equipo: {
              idVenta: 1,
              idOrdenador: 1,
              socket: "$equipo.caracteristicas.placa.socket",
              marcaPlaca: "$equipo.caracteristicas.placa.marca",
              puertos: "$equipo.caracteristicas.placa.puertos",
              capacidadMem: "$equipo.caracteristicas.memoria.capacidad",
              tipoMem: "$equipo.caracteristicas.memoria.tipo",
              marcaProc: "$equipo.caracteristicas.procesador.marca",
              modeloProc: "$equipo.caracteristicas.procesador.modelo",
              generacion: "$equipo.caracteristicas.procesador.generacion",
              tarjetaGrafica: "$equipo.caracteristicas.tarjeta_grafica",
              color: "$equipo.caracteristicas.caja.color",
              alto: "$equipo.caracteristicas.caja.dimensiones.h",
              ancho: "$equipo.caracteristicas.caja.dimensiones.w",
              usb: "$equipo.caracteristicas.caja.usb",
              fuente: "$equipo.caracteristicas.fuente",
              discos: "$equipo.caracteristicas.disco",
              sistemaOperativo: "$equipo.caracteristicas.sistema_operativo",
              fechaFabricacion: "$equipo.caracteristicas.fecha_fabricacion",
              perifericos: "$equipo.perifericos",
              precio: "$equipo.precio",
              marcas: 1
          }
      }
  },
  {
      $group: {
          _id: "$idVenta",
          comprador: { $first: "$comprador" },
          vendedor: { $first: "$vendedor" },
          fechaVenta: { $first: "$fechaVenta" },
          ordenadores: {
              $addToSet: "$equipo"
          }
      }
  },
  {
      $sort:{
          _id:-1
      }
  }
])
</pre>



### Marcas
Al pulsar en el botón de marcas accedemos a una colección que se genera automáticamente extrayendo las marcas de los componentes de cada ordenador de la base de datos, se guarda el nombre de la marca, el número de provisiones y los ordenadores que la contienen.

![marcas](https://user-images.githubusercontent.com/103594582/197419511-74f9248a-eb91-4fd5-83ed-73ac89201eaa.png)

Se ejecuta la siguiente consulta cada vez que accedemos a la colección, de esa forma la colección se mantiene actualizada.

<pre>
Ordenador.aggregate([{
        $project: {
            name: [
              "$caracteristicas.placa.marca",
              "$caracteristicas.procesador.marca",
              "$caracteristicas.tarjeta_grafica.marca"
            ],
            ordenador: "$idOrdenador"
        }
    },
    {
        $unwind: {
            path: "$name"
        }
    },
    {
        $group: {
            _id: "$name",
            ordenadores: {
                $addToSet: "$ordenador"
            },
            noProvisiones: {
              $sum: 1
            }
        }
    },
    {
      $match : { "_id": { $ne: null } }
    },
    {
      $match : { "_id": { $ne: "" } }
    },
    {
      $merge : { 
        into: "marcas", 
        on: "_id", 
        whenMatched: "replace", 
        whenNotMatched: "insert" 
      }
    }
  ])

</pre>



### Consultas
En el apartado de consultas encontramos distintas consultas que solemos utilizar.

![consultasMenu](https://user-images.githubusercontent.com/103594582/197419780-431eb554-d885-45c1-bfbb-cbfd9fde5c90.png)

La primera consulta muestra los ordenadores de Informática Sur, a los que se les aplica un descuento del 15% si superan los 1500€, en la consulta observamos el id del ordenador, si este tiene el descuento aplicado y el precio.

![informaticaSur](https://user-images.githubusercontent.com/103594582/197419855-cd15e6e7-2e30-4197-98df-f0fe2be9d321.png)

El código de la consulta es el siguiente:

<pre>
 Venta.aggregate([{
          $lookup:{
              from: 'ordenadores',
              localField: 'idVenta',
              foreignField: 'idVenta',
              as: 'equipo'
          }
      },
      {
          $unwind: {
              path:"$equipo"
          }
      },
      {
          $match: {
              "vendedor": "Informatica Sur"
          }
      },
      {
         $project: {
              _id: 0,
              precio: "$equipo.precio",
              idOrdenador:"$equipo.idOrdenador",
              precioDescuento: {
                  $let: {
                      vars: {
                          descuento: { 
                              $cond: { 
                                  if: {
                                      $gt:[
                                          "$equipo.precio",
                                          1500
                                      ]
                                  }, 
                                  then: 0.85, 
                                  else: 1 
                              } 
                          }
                      },
                      in: { 
                          $multiply: [ 
                              "$equipo.precio", 
                              "$$descuento" 
                          ] 
                      }
                  }
              }
          }
      },
      {
          $addFields: {
              applyDiscount:{
                  $cond: {
                      if:{
                          $gte: [
                              "$precio",
                              1500
                          ]
                      },
                      then: "Aplicado",
                      else: "No aplicado"
                  }
              }
          }
      },
      {
          $project:{
              idOrdenador: 1,
              applyDiscount: 1,
              price: "$precioDescuento"
          }
      },
      {
          $sort:{
              price:-1
          }
      }
  ])
</pre>

La siguiente consulta muestra todos los compradores ordenados por mayor a menor dinero gastado.

![compradores](https://user-images.githubusercontent.com/103594582/197420013-b89555cb-3f46-489f-b8a5-10e2f2abbc78.png)

El código de la consulta es el siguiente:

<pre>
Venta.aggregate([{
          $lookup: {
              from: 'ordenadores',
              localField: 'idVenta',
              foreignField: 'idVenta',
              as: 'productos'
          }
      },
      {
          $project:{
              _id: 0,
              comprador: 1,
              precioCompras: "$productos.precio",
          }
      },
      {
          $unwind: {
              path:"$precioCompras"
          }
      },
      {
          $group:{
              _id:"$comprador",
              precioCompras: {
                  $sum: "$precioCompras"
              }
          }
      },
      {
          $project:{
              _id: 1,
              precioCompras: {
                  $round: [
                      "$precioCompras",
                      0
                  ]
              },
          }
      },
      {
          $sort:{
              precioCompras:-1
          }
      }
  ])
</pre>

La tercera consulta muestra el precio solo de los componentes de cada ordenador, restándose el del sistema operativo instalado si este lo tiene.

![componentes](https://user-images.githubusercontent.com/103594582/197420130-bf12a225-f6cd-45c0-82d7-ab2ee7f18586.png)

El código de la consulta es el siguiente:

<pre>
Ordenador.aggregate([{
          $project: {
               _id: 0,
               idOrdenador:1,
               precio: 1,
               precioSinSistema: {
                   $let: {
                       vars: {
                           price: { 
                               $cond: { 
                                   if: '$caracteristicas.sistema_operativo', 
                                   then: 150, 
                                   else: 0 
                               } 
                           }
                       },
                       in: { 
                           $subtract: [ 
                               "$precio", 
                               "$$price" 
                           ] 
                       }
                   }
               }
           }
       }
  ])
</pre>

La siguiente consulta muestra el ordenador más caro y el más barato vendidos en 2021.

![2021](https://user-images.githubusercontent.com/103594582/197420209-4ab08622-6bd4-4c56-a3c4-1832068cc208.png)

El código de la consulta es el siguiente:

<pre>
const precio = await Ordenador.aggregate([{
        $match : { 
            "caracteristicas.fecha_fabricacion": { 
                $gte: new Date("2021-01-01"), 
                $lt: new Date("2022-01-01") 
              } 
          }
      },
      {
        $group : {
           _id : null,
           ordenadorMasCaro: { 
               $max: "$precio"
              },
           ordenadorMasBarato: { 
               $min: "$precio" 
              },
          }
      }
])

const caro = precio[0].ordenadorMasCaro
const barato = precio[0].ordenadorMasBarato

let ordenadorCaro = await Ordenador.findOne(
    { precio : { $eq: caro } }
)
let ordenadorBarato = await Ordenador.findOne(
    { precio : { $eq: barato } }
)

const ordenadorBaratoTipo = {
    ordenador: ordenadorBarato,
    tipo: "Barato"
}
const ordenadorCaroTipo = {
    ordenador: ordenadorCaro,
    tipo: "Caro"
}

const query = [ordenadorCaroTipo, ordenadorBaratoTipo]
</pre>

La última consulta muestra las marcas usadas en cada venta.

![marcasVenta](https://user-images.githubusercontent.com/103594582/197420312-197339d7-9886-4323-a7c0-d05cd62855a2.png)

El código de la consulta es el siguiente:

<pre>
Venta.aggregate([{
          $lookup: {
              from: 'ordenadores',
              localField: 'idVenta',
              foreignField: 'idVenta',
              as: 'productos'
          }
      },
      {
          $lookup: {
              from: 'marcas',
              localField: 'productos.idOrdenador',
              foreignField: 'ordenadores',
              as: 'marcas'
          }
      },
      {
          $project:{
              idVenta: 1,
              marcas:{_id: 1}
          }
      },
      {
          $unwind: {
              path: "$marcas"
          }
      },
      {
          $group:{
              _id: "$idVenta",
              marcas: {
                  $addToSet: "$marcas._id"
              }
          }
      },
      {
          $sort:{
              _id:1
          }
      }
  ])
</pre>



### Desconectar
Si pulsamos en desconectar volveremos a la pantalla de login donde tendremos que loguearnos otra vez, si usas un usuario o una contraseña incorrectos salta un error en la pantalla.

![loginMsg](https://user-images.githubusercontent.com/103594582/197420459-4e07b52b-ad54-405a-b8bd-213260a48958.png)

