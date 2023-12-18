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

    if (
      !this._form.elements.text.value ||
      !this._form.elements.tag.value ||
      !this._form.elements.username.value
    ) {
      alert("Please enter all fields");
    }
    // console.log("1");
    else {
      // Save user to local storage
      localStorage.setItem("username", this._form.elements.username.value);

      const idea = {
        text: this._form.elements.text.value,
        // After the element comes the name of the element
        tag: this._form.elements.tag.value,
        username: this._form.elements.username.value,
      };
      // console.log("2");

      // console.log(idea);

      // Add idea to server

      const newIdea = await ideasApi.createIdea(idea);
      // console.log("3");

      // Add idea to list
      this._ideaList.addIdeaToList(newIdea.data.data);
    }
    // console.log("4");

    // Clear fields
    this._form.elements.text.value =
      this._form.elements.tag.value =
      this._form.elements.username.value =
        "";

    this.render();
    // console.log("5");

    document.dispatchEvent(new Event("closemodal"));
    // console.log("6");
  }

  render() {
    // this._formModal.innerHTML =
    const newForm = this._formModel.cloneNode(true);
    // console.log(newForm.querySelector("#username"));
    // console.log(localStorage.getItem("username"));
    newForm.querySelector("#username").value = localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "";
    if (this._formModal.firstElementChild)
      this._formModal.removeChild(this._formModal.firstElementChild);
    // console.log(newForm.querySelector("#username"));
    this._formModal.appendChild(newForm);
    this._form = this._formModal.querySelector("#idea-form");
    this.addEventListeners();
  }
}

export default IdeaForm;
