const $ = (id) => document.getElementById(id)

const dialogBtn = $('dialogBtn')
const dialog = $('dialog')

const dialogModalBtn = $('dialogModalBtn')
const dialogModal = $('dialogModal')

dialogBtn.onclick = () => {
    dialog.show()
}
dialogModalBtn.onclick = () => {
    dialogModal.showModal()
}
