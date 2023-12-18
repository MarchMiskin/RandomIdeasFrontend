import ideasApi from "../services/ideasApi";
import IdeaList from "./IdeaList";

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector("#form-modal");
    this._formModel = this._formModal.firstElementChild;
    this._formModal.removeChild(this._formModel);
    this._ideaList = new IdeaList();
  }

  addEventListeners() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();
    // console.log("SUBMIT");

    const idea = {
      text: this._form.elements.text.value,
      // After the element comes the name of the element
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };

    // console.log(idea);

    // Add idea to server
    const newIdea = await ideasApi.createIdea(idea);

    // Add idea to list
    this._ideaList.addIdeaToList(newIdea.data.data);

    // Clear fields
    this._form.elements.text.value =
      this._form.elements.tag.value =
      this._form.elements.username.value =
        "";

    document.dispatchEvent(new Event("closemodal"));
  }

  render() {
    // this._formModal.innerHTML =
    this._formModal.appendChild(this._formModel.cloneNode(true));
    this._form = this._formModal.querySelector("#idea-form");
    this.addEventListeners();
  }
}

// Why are we doing this?  I don't know!
// Granted, I'm doing it differently than he did; he just chopped it out
// of the HTML file entirely and stuck it all in a string in the
// render function, but... what's the point of that?
// I think I'd rather have the HTML in the HTML file...

export default IdeaForm;
