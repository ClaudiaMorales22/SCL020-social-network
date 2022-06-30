import { creatingNewPost, gettingAllPublications, updatingPublications } from '../firebase-doc/firestore.js';
import { logOut } from '../firebase-doc/authentication.js';
import { auth, getDocs, collection, db } from '../firebase-doc/firebase.js';
import { changeRoute } from '../lib/router.js';

export const wall = () => {
  const wallP = 
  `
<div class="wallView">
      <header>
          <img src = "Social-Images/logoWall.png">
          <a href="#/bullyingForm" id="bForm"><strong>Te Escuchamos</strong></a>
          <button class= "logOutWall" id="logOut"><strong>Cerrar Sesión</strong></button>
      </header>
     <div class="publication-area">
     <textarea placeholder="Ingrese su publicación" cols="40" rows="5" id="publication"></textarea>
     <button class="publish" id="publish" type="submit"><strong>PUBLICAR</strong></button>
     </div>
     <div class= "wall" id="wall">

     </div>
      </div>
      `;
    const container = document.createElement('div');
    container.innerHTML = wallP;
    container.className = "wallViewContainer";
    
    const publishButton = container.querySelector('#publish');

    publishButton.addEventListener('click', async () => {
      const commentContainer = container.querySelector('#publication');
      const comment = commentContainer.value;
      try { await creatingNewPost ( comment );
      commentContainer.value = '';
      console.log('prueba')
      return creatingNewPost;
    } catch (error) { return console.log('error')}
    });

    const allPublications = async () => {
    let publicationsContainer = container.querySelector('#wall');
    let publicationFrame = '';
    /*let publications = doc.Data();
    console.log(doc.Data())*/
    gettingAllPublications().then(data => {
      console.log(data)
      data.forEach((doc) => {
      publicationFrame += `
      <div class="post">
        <div class='post-header'>
          <p class='user-info'><img class="user-photo" src="${doc?.Photo}">
          <span class="user-name">${doc?.Name} </span> </p>
          <p class="date">${doc?.Time.toDate().toLocaleString()}</p>
          <button class="btn-edit" id = "editButton" data-id="${doc.id}">
          <img src = "../Social-Images/edit-icon.png">
          </button>
        </div>
        <div class = "middleSection">
        <p class="comment">${doc?.Comment}</p>
        </div>
        <div class="post-footer">
          <button class="btn-like" data-id="${doc.id}">
          </button>
        </div>
      </div>
      `;

    })
    updatingPublications(publicationFrame);
    console.log(publicationFrame);
    publicationsContainer.innerHTML = publicationFrame;
  });
    return allPublications;
  }
  allPublications();

  // const editButton = container.querySelector('#editButton');
  // editButton.addEventListener('click', async () =>{
  //   try { await editingPublication(doc, id)
  //   } catch (error) {
  //     return console.log('error')
  //   }
  // });
  
    const buttonLogOut = container.querySelector('#logOut');
    buttonLogOut.addEventListener('click', async () => {
      try { await logOut(auth);
        changeRoute('#/home');
        return logOut;
      } catch (error) {
        return console.log('error')
      }
    });
  
  return container;
};



