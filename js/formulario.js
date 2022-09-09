
window.onload = async () => {


    console.log('form.js success');
    let query = new URLSearchParams(location.search)

    if(query.has('id')){ // si obtengo el id en el url params

         document.querySelector('#botonEdit').hidden = false

        try {
            let response =  await fetch(sessionStorage.getItem('urlBase')+'/api/movies/'+query.get('id'))
           
            let result = await response.json();

            let  movie = result.data;

           //capturo los elementos para asignarle el valor correspondiente
           document.querySelector('#title').value = movie.title
           document.querySelector('#rating').value = movie.rating
           document.querySelector('#awards').value = movie.awards
           document.querySelector('#release_date').value = moment(movie.release_date).format('YYYY-MM-DD')//uso moment para dar el formato a la fecha
           document.querySelector('#length').value = movie.length 

        } catch (error) {

            console.log(error);
            
        }


        // capturo el form
        document.querySelector('#form').addEventListener('submit',async (e) => {
             e.preventDefault();
        

            let bodyForm = {
 
                title :  document.querySelector('#title').value,
                raing  :  document.querySelector('#rating').value,
                awards :   document.querySelector('#awards').value,
                release_date :document.querySelector('#release_date').value,
                length : document.querySelector('#length').value ,


            }

              try {
           
                 let response = await fetch(`${sessionStorage.getItem('urlBase')}/api/movies/update/${query.get('id')}`,{

                method: 'PUT',
                body: JSON.stringify(bodyForm),
                headers: {
                    'content-Type' : 'application/json'
                }

                 });
                 let result = await response.json();
                 console.log(result);
           
            
             } catch (error) {
                console.error          
            }
        })

    }else{

        document.querySelector('#botonAgregar').hidden = false


    }

  

}