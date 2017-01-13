// get all links that open modals in page
const links = document.querySelectorAll('.modal-link');

// for each link, set click handler to show associated modal
Array.prototype.slice.call(links).forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()

    // hide other open modals
    hideAllModals();

    // get id for modal based on path
    const href = e.target.href.split("/");
    const modalId = href.pop()
    let modal = document.getElementById(modalId);
    
    // if modal hasn't been created, create it
    if(modal === null){
      modal = document.createElement('div')
      modal.innerHTML = `hi this is ${modalId} modal`
      modal.id = modalId
      modal.classList.add('modal')
      document.body.appendChild(modal)
    }

    // show the modal
    modal.classList.remove('hide')

    // push history state of modal state
    document.title = `${document.title.split('-').shift()} - ${modalId}`
    history.pushState({modalId: modalId}, document.title , e.target.href)
  })
})

// when state is popped, either from the back/forward button
window.addEventListener('popstate', (e) => {
  console.log(e.state, history.state)

  // hide all open modals first
  hideAllModals()

  // if there was a modal state, show the modal that was open
  if(e.state !== null){
    const modal = document.getElementById(e.state.modalId);
    console.log(e.state.modalId)

    if(modal) {
      modal.classList.remove('hide')
    }
  }
})

// finds all modals and hides em
function hideAllModals(){
  const modals = document.querySelectorAll('.modal');
  console.log(modals)
  Array.prototype.slice.call(modals).forEach((modal) => {
    modal.classList.add('hide')
  })
}