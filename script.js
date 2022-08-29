const fs = require("fs");
const productos = [
    {
        title:'Taladro',
        price:150,
        thumnail:'https://firebasestorage.googleapis.com/v0/b/ferrimac-react.appspot.com/o/taladro1.webp?alt=media&token=4dd0feae-c65b-456b-92d5-92e361173aa9',
        id:1
    },
    {
        title:'Compresor',
        price:200,
        thumnail:'https://firebasestorage.googleapis.com/v0/b/ferrimac-react.appspot.com/o/compresor1.webp?alt=media&token=d1996503-db56-4e80-8f36-1092ec97bbb0',
        id:2
    },
      {
        title:'Hidrolavadora',
        price:300.45,
        thumnail:'https://firebasestorage.googleapis.com/v0/b/ferrimac-react.appspot.com/o/hidro1.webp?alt=media&token=6aa2891b-7f0e-4707-942b-61ce7b70278c',
        id:3
    }
      
]

class Contenedor{
    async save(producto){
        try{
            await fs.promises.writeFile('./productos.txt',JSON.stringify(producto,null,2),"utf-8" )
        }
        catch(e){
            console.log(e);            
        }
   }
   async getAll() {
       try{
           const contenido = await fs.promises.readFile('./productos.txt',"utf-8")
           console.log(contenido);
           return JSON.parse(contenido);
       }
       catch(error){}
   }
   async saveNew (productoNuevo) {
       const contenido = await this.getAll();
       const indice = contenido.sort((a,b)=>b.id -a.id)[0].id;
       productoNuevo.id = indice + 1;
       contenido.push(productoNuevo);
       this.save(contenido)
   }
   async getById(id){
       const contenido = await this.getAll();
       const productoBuscado = contenido.filter(producto=>producto.id == id)
       console.log(productoBuscado);
   }
   async deleteById(id){
    const contenido = await this.getAll();
    const contenidoNuevo = contenido.filter(producto=>producto.id !== id)
    console.log(contenidoNuevo);

   }
   async deleteAll(){
    await fs.promises.writeFile('./productos.txt',"","utf-8" )
   }
}

const contenedor = new Contenedor();
contenedor.save(productos)
contenedor.getAll();

const productoN = {
    title: "Soldadora",
    price: 340,
    thumnail: "https://firebasestorage.googleapis.com/v0/b/ferrimac-react.appspot.com/o/soldadorain.webp?alt=media&token=e932bcba-43bb-4d45-a464-6e7410dbd658",
  }

  contenedor.saveNew(productoN);
  contenedor.getById(1);
  contenedor.deleteById(2);
  contenedor.deleteAll();