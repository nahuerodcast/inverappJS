// Seleccionamos moneda a utilizar, en este caso pesos argentinos
const formatter = new Intl.NumberFormat('es-AR',{style: 'currency', currency: 'ARS'})

// Definimos saldo líquido inicial y manipulamos DOM
const initialValue = 100000;
if (localStorage.getItem('saldo')===null) {
    localStorage.setItem('saldo', initialValue)
}

const saldo =  document.getElementsByClassName('saldo');
for (let item of saldo) {
    console.log(item.innerHTML= formatter.format((localStorage.getItem("saldo"))));
}

// Definimos saldo Inversiones inicial 0 y manipulamos DOM
const initialValueInversiones = 0;
if (localStorage.getItem('inversiones')===null) {
    localStorage.setItem('inversiones', initialValueInversiones)
}

const inversiones =  document.getElementsByClassName('inversiones');
for (let item of inversiones) {
    console.log(item.innerHTML= formatter.format((localStorage.getItem("inversiones"))));
}

// Captura valores para las órdenes en la tickerbox
function Pedido(producto, precio, cantidad, comisiones = 0.005) { 
    this.producto = producto;
    this.precio = formatter.format(precio);
    this.cantidad = cantidad;
    this.comisiones = comisiones;
    this.total = calcularTotal(precio, cantidad, comisiones);
}

const calcularTotal = (precio, cantidad, comisiones) => {
    let calcularSubtotal = precio * cantidad;
    let calcularCometa = calcularSubtotal * comisiones;
    let saldoAImprimir = localStorage.getItem('saldo');
    const total = calcularSubtotal + calcularCometa;
    if (confirm('Confirmar orden')) {
        if (total<initialValue) {
            let calculoFinal = saldoAImprimir - total;
             if (typeof localStorage.getItem('saldo')!=='undefined'){
                 localStorage.setItem('saldo', (localStorage.getItem('saldo') - total))
              }else{
                  localStorage.setItem('saldo', calculoFinal)
                }
             if (typeof localStorage.getItem('inversiones')!=='undefined'){
                 localStorage.setItem('inversiones', total + Number.parseFloat(localStorage.getItem('inversiones')) )
              }else{
                  localStorage.setItem('inversiones', total + Number.parseFloat(localStorage.getItem('inversiones')) )
                }
                document.getElementById('total1').innerHTML = "Total: " + formatter.format(total);
                document.getElementById('confirmed-order').classList.add('show')
                document.getElementById('card-body').classList.remove('show')
                document.getElementById('card-body').classList.add('collapse')
            return formatter.format(total)
        }else{
            document.getElementById('denied-order').classList.add('show')
            document.getElementById('card-body').classList.remove('show')
            document.getElementById('card-body').classList.add('collapse')
        }
    }
}

const capturarOnClick = () => {
    // Obtenemos valores
    let tickerInput = document.getElementById("producto").value;
    let capturarPrecio = document.getElementById("precio").value;
    let capturarCantidad = document.getElementById("cantidad").value;
    const miPedido = new Pedido (tickerInput, capturarPrecio, capturarCantidad)
    console.log(`Producto: ${miPedido.producto}, Cantidad: ${miPedido.cantidad}, Precio: ${miPedido.precio}, Comisiones: ${miPedido.comisiones}, Total: ${miPedido.total}`)

    // Guardo string en localStorage
    const orden = {ordenes: [{producto: miPedido.producto, precio: miPedido.precio, cantidad: miPedido.cantidad, comisiones: miPedido.comisiones, total: miPedido.total}]}

    if (!miPedido.producto || !miPedido.precio || !miPedido.cantidad ){
        alert('Error en la orden, falta completar uno o más campos')
        return
    }else{
        if (miPedido.total == undefined) {
            return
        }
    }

    // Obtengo string y se pasa a objeto
    let ordenes = JSON.parse(localStorage.getItem('ordenes'))
    if (ordenes) {
        ordenes.ordenes.push(orden.ordenes[0])
        localStorage.setItem('ordenes', JSON.stringify(ordenes))
    }else{
        localStorage.setItem('ordenes', JSON.stringify(orden))
    }
}

const jquery = JSON.parse(localStorage.getItem('ordenes'))

// Utilizamos jQuery para inyectar órdenes creadas
jquery.ordenes.forEach(item => {
    $('.nahue').prepend(
        `
        <ul class="account-main-list">
        <li>${item.producto}
        <li>${item.precio}
        <li>${item.cantidad}
        <li class='text-success'>${'Operada'}
        <li>${item.total}
        </ul>`
     );
});

const jquery2 = JSON.parse(localStorage.getItem('ordenes'))

const arrayDeValores = jquery2.ordenes.map(function(orden){
    return orden.producto
})

console.log(arrayDeValores)

let modifiedArray = arrayDeValores.reduce((acc, curr) => {
    if (!acc.length) {
      acc.push([curr, 1]);
    } else {
      let lastPushedArray = acc[acc.length-1];
      if (lastPushedArray[0] === curr) {
        acc[acc.length-1][1]++;
      } else {
        acc.push([curr, 1]);
      }
    }
    return acc;
  }, []);
  
  console.log(modifiedArray);

// for (let i = 0; i < modifiedArray.length; i++) {
//     const element = modifiedArray[i];
//     for (let index = 0; index < element.length; index++) {
//         const element2 = element[index];
//         console.log(element2)
//     }
// }

// Utilizamos jQuery para inyectar órdenes creadas
jquery2.ordenes.forEach(item => {
    $('.portfolio').prepend(
        `
        <ul class="account-main-list">
        <li>${item.cantidad}
        <li>${item.producto}
        <li>${item.precio}
        <li>${item.total}
        </ul>`
     );
});
