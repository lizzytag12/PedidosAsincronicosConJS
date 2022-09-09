sessionStorage.setItem('urlBase', "http://localhost:3031")


window.onload = async () => {

      const app = document.getElementById("root");
      const container = document.createElement("div");
      container.setAttribute("class", "container");
      app.appendChild(container);
      console.log("succsess");

      // Aqui debemos agregar nuestro fetch

    try {

      let response = await fetch (sessionStorage.getItem('urlBase') + '/api/movies')
      let peliculas = await response.json(); // parseamos la info que nos viene
    
      let data = peliculas.data;

      data.forEach((movie) => {
        const card = document.createElement("div"); // creamos elemento
        card.setAttribute("class", "card"); // le damos atributos 

        const h1 = document.createElement("h1");
        h1.textContent = movie.title; // leasignamos el valor del titulo

        const p = document.createElement("p"); // creamos elemento
        p.textContent = `Rating: ${movie.rating}`;// le pasamos el valor

        const duracion = document.createElement("p");
        duracion.textContent = `Duración: ${movie.length}`;

        container.appendChild(card);
        card.appendChild(h1);
        card.appendChild(p);
        if (movie.genre !== null) { // si viene geero de pelicula
          const genero = document.createElement("p"); // creo el elemento
          genero.textContent = `Genero: ${movie.genre.name}`; //le paso el contenido
          card.appendChild(genero);
        }
        card.appendChild(duracion);
        //creacion del boton que me va a permitir EDITAR la pelicula
        const buttonEdit = document.createElement('a');
        buttonEdit.setAttribute('href', 'formulario.html?id='+movie.id);// le paso el query string
        buttonEdit.setAttribute('class', 'botonAgregar')
        buttonEdit.textContent = "Editar pelicula"
        card.appendChild(buttonEdit)

        //creacion del boton que me va a permitir ELIMINAR la pelicula
        const buttonDelete = document.createElement('button');
        buttonDelete.setAttribute('class', 'botonBorrar');
        buttonDelete.setAttribute('id',movie.id)
        buttonDelete.textContent = "Eliminar pelicula"
        card.appendChild(buttonDelete)
      });
      
    } catch (error) {
      console.log(error);
      
    }

    container.addEventListener('click',(e)=>{
      console.log(e.target);
    })

      
   
};
